import { neon } from 'netlify/neon';

export default async (request, context) => {
    try {
        const sql = neon();
        const msgs = await sql`SELECT * FROM mensaje_usuarios`;

        if (!msgs || msgs.length === 0) {
            return new Response('No messages found', { status: 404 });
        }

        return new Response(JSON.stringify(msgs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
