import { neon } from "https://esm.sh/@neondatabase/serverless";

export default async function handler(request, context) {

    const sql = neon(Deno.env.get("NETLIFY_DATABASE_URL"));

    // Handle CORS preflight (OPTIONS) to allow POST with JSON
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        });
    }

    try {
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
                status: 405,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
        }

        let body;
        try {
            body = await request.json();
        } catch (_) {
            return new Response(JSON.stringify({ error: "Invalid JSON" }), {
                status: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
        }
        const { mensaje_enviado } = body ?? {};

        if (!mensaje_enviado || typeof mensaje_enviado !== "string") {
            return new Response(JSON.stringify({ error: "Invalid message" }), {
                status: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
        }

        const text = mensaje_enviado.trim();
        if (!text) {
            return new Response(JSON.stringify({ error: "Empty message" }), {
                status: 400,
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
            });
        }

        const [row] = await sql`
            INSERT INTO mensaje_usuarios (mensaje_enviado)
            VALUES (${text})
            RETURNING *
        `;

        return new Response(JSON.stringify(row), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}
