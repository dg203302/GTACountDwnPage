import { neon } from "https://esm.sh/@neondatabase/serverless";

export default async function handler(request) {

    //"postgresql://neondb_owner:npg_yhn1mPvNk8WS@ep-floral-hat-ae9ym9c9-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require"

    const sql = neon(Deno.env.get("NETLIFY_DATABASE_URL"));

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400});
    }
    const { mensaje_enviado } = body ?? {};
    if (typeof mensaje_enviado !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid message' }), { status: 400 });
    }
    const text = mensaje_enviado.trim();
    if (!text) {
        return new Response(JSON.stringify({ error: 'Empty message' }), { status: 400 });
    }

    try {
        const [row] = await sql`INSERT INTO mensaje_usuarios (mensaje_enviado) VALUES (${text}) RETURNING *`;
        return new Response(JSON.stringify(row), { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
    }
}
