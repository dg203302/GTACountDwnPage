import { neon } from 'https://deno.land/x/netlify_neon@0.1.0/mod.ts';
export default async (request, context) => {
    const sql = neon();
    const [msgs] = await sql`SELECT * FROM mensaje_usuarios`;
    if (!msgs) {
        return new Response('Post not found', { status: 404 });
    }
    return new Response(JSON.stringify(msgs), {
        headers: { 'Content-Type': 'application/json' },status: 200,
    });
}
