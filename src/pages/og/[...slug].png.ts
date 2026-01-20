import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
    const blog = await getCollection('blog');
    const projects = await getCollection('projects');
    const decisions = await getCollection('decisions');
    const notes = await getCollection('notes');

    const entries = [
        { params: { slug: 'home' }, props: { title: 'Creative Developer & Architect', type: 'Ryan Wolfe' } },
        ...blog.map(post => ({ params: { slug: `blog/${post.id}` }, props: { title: post.data.title, type: 'Blog' } })),
        ...projects.map(project => ({ params: { slug: `projects/${project.id}` }, props: { title: project.data.title, type: 'Project' } })),
        ...decisions.map(decision => ({ params: { slug: `decisions/${decision.id}` }, props: { title: decision.data.title, type: 'Decision' } })),
        ...notes.map(note => ({ params: { slug: `notes/${note.id}` }, props: { title: note.data.title, type: 'Note' } })),
    ];

    return entries;
}

export async function GET({ props }: { props: { title: string; type: string } }) {
    const { title, type } = props;

    // Load fonts
    const fontRegular = fs.readFileSync(path.resolve('./public/fonts/atkinson-regular.woff'));
    const fontBold = fs.readFileSync(path.resolve('./public/fonts/atkinson-bold.woff'));

    const svg = await satori(
        {
            type: 'div',
            props: {
                style: {
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    padding: '80px',
                    fontFamily: 'Atkinson Hyperlegible',
                    backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a1a 0%, #0a0a0a 100%)',
                },
                children: [
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '24px',
                            },
                            children: [
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            width: '4px',
                                            height: '24px',
                                            backgroundColor: '#0ea5e9',
                                            borderRadius: '2px',
                                        },
                                    },
                                },
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            fontSize: '24px',
                                            color: '#a1a1aa',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            fontWeight: 700,
                                        },
                                        children: type,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        type: 'div',
                        props: {
                            style: {
                                fontSize: '72px',
                                fontWeight: 700,
                                color: 'white',
                                lineHeight: 1.1,
                                marginBottom: '40px',
                                display: 'flex',
                            },
                            children: title,
                        },
                    },
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 'auto',
                                width: '100%',
                                justifyContent: 'space-between',
                            },
                            children: [
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            fontSize: '32px',
                                            fontWeight: 700,
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                        children: [
                                            {
                                                type: 'span',
                                                props: {
                                                    style: { color: '#0ea5e9' },
                                                    children: 'rwolfe',
                                                },
                                            },
                                            {
                                                type: 'span',
                                                props: {
                                                    style: { color: '#38bdf8' },
                                                    children: '.io',
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            fontSize: '20px',
                                            color: '#52525b',
                                        },
                                        children: 'Ryan Wolfe — Senior Software Engineer',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        } as any,
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Atkinson Hyperlegible',
                    data: fontRegular,
                    weight: 400,
                    style: 'normal',
                },
                {
                    name: 'Atkinson Hyperlegible',
                    data: fontBold,
                    weight: 700,
                    style: 'normal',
                },
            ],
        }
    );

    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer as any, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
