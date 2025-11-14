import { neon } from "https://esm.sh/@neondatabase/serverless";

const CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

export default async function handler(request, context) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: CORS_HEADERS
        });
    }

    const dbUrl = Deno.env.get("NETLIFY_DATABASE_URL");
    if (!dbUrl) {
        return new Response(JSON.stringify({ error: "Database configuration missing" }), {
            status: 500,
            headers: CORS_HEADERS
        });
    }

    const sql = neon(dbUrl);

    try {
        let body;
        try {
            body = await request.json();
        } catch (_) {
            return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: CORS_HEADERS });
        }

        const { mensaje_enviado } = body ?? {};
        if (typeof mensaje_enviado !== 'string') {
            return new Response(
                JSON.stringify({ error: "Invalid input: 'mensaje_enviado' must be a string." }),
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const text = mensaje_enviado.trim();
        if (text.length < 3) {
            return new Response(
                JSON.stringify({ error: "Message too short. Minimum 3 characters." }),
                { status: 400, headers: CORS_HEADERS }
            );
        }
        if (text.length > 500) {
            return new Response(
                JSON.stringify({ error: "Message too long. Maximum 500 characters." }),
                { status: 400, headers: CORS_HEADERS }
            );
        }

        const result = await sql`INSERT INTO mensaje_usuarios (mensaje_enviado) VALUES (${text}) RETURNING *`;
        const row = Array.isArray(result) ? result[0] : result;

        return new Response(JSON.stringify(row), {
            status: 201,
            headers: CORS_HEADERS
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: CORS_HEADERS }
        );
    }
}