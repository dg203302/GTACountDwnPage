import { neon } from '@netlify/neon';
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
