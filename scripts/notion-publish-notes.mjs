#!/usr/bin/env node
/**
 * notion-publish-notes.mjs
 *
 * Semi-automate turning Notion Inbox items into published Notes in this repo.
 *
 * Flow:
 * - Find Notion data source titled "Inbox" (or use NOTION_INBOX_DS_ID)
 * - Ensure it has a Published checkbox property
 * - Query Triaged=false AND URL is not empty
 * - Generate src/content/notes/<slug>.md (type=bookmark)
 * - Create a new git branch, commit, push, open PR
 * - Mark Notion items Published=true and Triaged=true
 *
 * Safety:
 * - Default is --dry-run (no file writes, no notion writes, no git changes)
 * - Use --apply to actually do it
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(process.cwd());
const NOTES_DIR = path.join(ROOT, 'src/content/notes');

function parseArgs(argv) {
  const out = { apply: false, limit: 10, branchPrefix: 'notion-notes', verbose: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') out.apply = true;
    else if (a === '--dry-run') out.apply = false;
    else if (a === '--verbose') out.verbose = true;
    else if (a === '--limit') out.limit = Number(argv[++i] ?? out.limit);
    else if (a === '--branch-prefix') out.branchPrefix = argv[++i] ?? out.branchPrefix;
    else throw new Error(`Unknown arg: ${a}`);
  }
  return out;
}

function slugify(s) {
  return (s || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'note';
}

function hostname(u) {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function notionFetch(url, { method = 'GET', body } = {}) {
  const key = (await fs.readFile(path.join(process.env.HOME, '.config/notion/api_key'), 'utf8')).trim();
  if (!key) throw new Error('Missing Notion API key at ~/.config/notion/api_key');

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Notion HTTP ${res.status}: ${txt}`);
  }
  return res.json();
}

async function findInboxDataSourceId() {
  if (process.env.NOTION_INBOX_DS_ID) return process.env.NOTION_INBOX_DS_ID;
  const results = await notionFetch('https://api.notion.com/v1/search', {
    method: 'POST',
    body: { query: 'Inbox', page_size: 10 },
  });
  const ds = results.results.find((r) => r.object === 'data_source' && r.title?.[0]?.plain_text === 'Inbox');
  if (!ds) throw new Error('Could not find Notion data source titled "Inbox". Set NOTION_INBOX_DS_ID.');
  return ds.id;
}

async function ensurePublishedProperty(dsId) {
  const ds = await notionFetch(`https://api.notion.com/v1/data_sources/${dsId}`);
  if (ds.properties?.Published?.type === 'checkbox') return;
  await notionFetch(`https://api.notion.com/v1/data_sources/${dsId}`, {
    method: 'PATCH',
    body: { properties: { Published: { checkbox: {} } } },
  });
}

async function queryUntriaged(dsId, limit) {
  const q = await notionFetch(`https://api.notion.com/v1/data_sources/${dsId}/query`, {
    method: 'POST',
    body: {
      page_size: limit,
      filter: {
        and: [
          { property: 'Triaged', checkbox: { equals: false } },
          { property: 'URL', url: { is_not_empty: true } },
        ],
      },
      sorts: [{ property: 'Created time', direction: 'descending' }],
    },
  });
  return q.results;
}

function mdForItem({ title, url, source }) {
  const date = todayISO();
  const host = hostname(url);
  const inferredSource = source || host;

  const tags = ['bookmark'];
  if (/github\.com/.test(url)) tags.push('github');
  if (/\bagent\b|agents|mcp|llm|codex|claude/i.test(title)) tags.push('ai', 'agents');
  if (/hiring|1:1|feedback|management|leadership/i.test(title)) tags.push('leadership');

  const uniqTags = [...new Set(tags)];

  return `---\n` +
    `title: "${title.replace(/"/g, '\\"')}"\n` +
    `pubDate: ${date}\n` +
    `type: bookmark\n` +
    `tags: [${uniqTags.map((t) => `"${t}"`).join(', ')}]\n` +
    (inferredSource ? `source: "${inferredSource.replace(/"/g, '\\"')}"\n` : '') +
    `sourceUrl: "${url.replace(/"/g, '\\"')}"\n` +
    `relatedProjects: []\n` +
    `relatedPosts: []\n` +
    `---\n\n` +
    `TODO: Write a 3–6 sentence note (not a summary).\n` +
    `- What’s the punchline?\n` +
    `- Why does it matter?\n` +
    `- What’s the constraint/tradeoff?\n`;
}

async function git(cmd, args) {
  const { stdout } = await execFileAsync(cmd, args, { cwd: ROOT });
  return stdout.trim();
}

async function requireCleanTree() {
  const status = await git('git', ['status', '--porcelain']);
  if (status) throw new Error('Working tree not clean. Commit/stash changes before running.');
}

async function createBranch(branchName) {
  await git('git', ['fetch', 'origin']);
  await git('git', ['checkout', 'main']);
  await git('git', ['pull', '--ff-only']);
  await git('git', ['checkout', '-b', branchName]);
}

async function openPR(branchName, title) {
  // Uses gh auth already configured in this environment.
  await git('git', ['push', '-u', 'origin', branchName]);
  await execFileAsync('gh', [
    'pr',
    'create',
    '--base',
    'main',
    '--head',
    branchName,
    '--title',
    title,
    '--body',
    'Auto-generated notes from Notion Inbox. Review/edit before merging.',
  ], { cwd: ROOT });
}

async function markNotionPublished(pageId) {
  await notionFetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    body: {
      properties: {
        Published: { checkbox: true },
        Triaged: { checkbox: true },
      },
    },
  });
}

async function main() {
  const opts = parseArgs(process.argv);
  const dryRun = !opts.apply;

  const dsId = await findInboxDataSourceId();

  if (!dryRun) {
    await ensurePublishedProperty(dsId);
    await requireCleanTree();
  }

  const items = await queryUntriaged(dsId, opts.limit);
  if (items.length === 0) {
    console.log('No untriaged inbox items with URL.');
    return;
  }

  const date = todayISO().replace(/-/g, '');
  const time = new Date().toTimeString().slice(0, 5).replace(':', '');
  const branchName = `${opts.branchPrefix}-${date}-${time}`;

  console.log(`${dryRun ? '[DRY RUN] ' : ''}Found ${items.length} inbox item(s). Branch: ${branchName}`);

  const planned = [];
  for (const it of items) {
    const title = it.properties?.Title?.title?.[0]?.plain_text || '(untitled)';
    const url = it.properties?.URL?.url;
    const source = it.properties?.Source?.select?.name || '';
    const id = it.id;

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let outPath = path.join(NOTES_DIR, `${slug}.md`);

    // ensure unique filename
    for (let n = 2; ; n++) {
      try {
        await fs.access(outPath);
        slug = `${baseSlug}-${n}`;
        outPath = path.join(NOTES_DIR, `${slug}.md`);
      } catch {
        break;
      }
    }

    planned.push({ id, title, url, outPath });
  }

  planned.forEach((p) => console.log(`- ${p.title} -> ${path.relative(ROOT, p.outPath)}`));

  if (dryRun) return;

  await fs.mkdir(NOTES_DIR, { recursive: true });
  await createBranch(branchName);

  for (const p of planned) {
    const src = hostname(p.url);
    const md = mdForItem({ title: p.title, url: p.url, source: src });
    await fs.writeFile(p.outPath, md, 'utf8');
  }

  await git('git', ['add', 'src/content/notes']);
  await git('git', ['commit', '-m', `Publish notes from Notion Inbox (${planned.length})`]);
  await openPR(branchName, `Publish notes from Notion Inbox (${planned.length})`);

  for (const p of planned) {
    await markNotionPublished(p.id);
  }

  console.log(`Done. Created PR from ${branchName} and marked ${planned.length} item(s) Published.`);
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exit(1);
});
