/**
 * POST /api/subscribe  ->  { email: string }
 *
 * One Vercel serverless function. Exists for one reason: a static site cannot
 * hold an API key, and every real provider needs one. This keeps the key
 * server-side and gives the form a proper JSON response to react to.
 *
 * Provider is switchable with env vars — no code change to move:
 *
 *   NEWSLETTER_PROVIDER=buttondown       (default)
 *     BUTTONDOWN_API_KEY=...
 *     Free to 100 subscribers. Handles confirmation, unsubscribe, sending and
 *     archives — i.e. it's the newsletter tool, not just storage. Recommended
 *     start: nothing else to build when you actually want to send.
 *
 *   NEWSLETTER_PROVIDER=resend
 *     RESEND_API_KEY=...  RESEND_AUDIENCE_ID=...
 *     Use if you'd rather keep it in the Resend account you already have.
 *     Note Resend Audiences stores contacts but you compose/send separately.
 *
 *   NEWSLETTER_PROVIDER=log
 *     No key needed. Validates and logs, stores nothing. For local testing only
 *     — never leave this on in production; it silently discards signups.
 *
 * Returns 200 {ok:true} on success, 4xx/5xx {error} otherwise. Never echoes the
 * provider's raw error to the client.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const config = { runtime: 'nodejs' };

export default async function handler(req: Request): Promise<Response> {
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    });

  if (req.method !== 'POST') return json(405, { error: 'method not allowed' });

  let email = '';
  try {
    const body = (await req.json()) as { email?: unknown };
    email = String(body?.email ?? '').trim().toLowerCase();
  } catch {
    return json(400, { error: 'invalid body' });
  }

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json(400, { error: 'invalid email' });
  }

  const provider = (process.env.NEWSLETTER_PROVIDER || 'buttondown').toLowerCase();

  try {
    if (provider === 'log') {
      console.log('[subscribe] would subscribe:', email);
      return json(200, { ok: true });
    }

    if (provider === 'buttondown') {
      const key = process.env.BUTTONDOWN_API_KEY;
      if (!key) return json(500, { error: 'not configured' });

      const res = await fetch('https://api.buttondown.com/v1/subscribers', {
        method: 'POST',
        headers: {
          Authorization: `Token ${key}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email_address: email }),
      });

      // Already subscribed is a success from the visitor's point of view.
      if (res.status === 409 || res.status === 400) {
        const text = await res.text();
        if (/already/i.test(text)) return json(200, { ok: true });
        console.error('[subscribe] buttondown rejected:', res.status, text);
        return json(400, { error: 'could not subscribe that address' });
      }
      if (!res.ok) {
        console.error('[subscribe] buttondown error:', res.status, await res.text());
        return json(502, { error: 'subscription service unavailable' });
      }
      return json(200, { ok: true });
    }

    if (provider === 'resend') {
      const key = process.env.RESEND_API_KEY;
      const audienceId = process.env.RESEND_AUDIENCE_ID;
      if (!key || !audienceId) return json(500, { error: 'not configured' });

      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${key}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        }
      );
      if (!res.ok) {
        console.error('[subscribe] resend error:', res.status, await res.text());
        return json(502, { error: 'subscription service unavailable' });
      }
      return json(200, { ok: true });
    }

    console.error('[subscribe] unknown provider:', provider);
    return json(500, { error: 'not configured' });
  } catch (err) {
    console.error('[subscribe] unexpected:', err);
    return json(500, { error: 'unexpected error' });
  }
}
