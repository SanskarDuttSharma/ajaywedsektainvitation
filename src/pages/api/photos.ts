import type { APIRoute } from 'astro';
import { list } from '@vercel/blob';

export const prerender = false;

export const GET: APIRoute = async () => {
  const token = import.meta.env.BLOB_READ_WRITE_TOKEN;
  const { blobs } = await list({ prefix: 'gallery/', token });
  const urls = blobs.filter(b => !b.pathname.endsWith('/')).map(b => b.url);
  return new Response(JSON.stringify(urls), {
    headers: { 'Content-Type': 'application/json' }
  });
};
