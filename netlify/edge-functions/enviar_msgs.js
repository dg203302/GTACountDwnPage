import { neon } from "https://esm.sh/@neondatabase/serverless";

export default async function handler(request, context) {
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        });
    }

    if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    const sql = neon(Deno.env.get("NETLIFY_DATABASE_URL"));

    try {
        const body = await request.json();
        const { mensaje_enviado } = body ?? {};

        if (!mensaje_enviado || typeof mensaje_enviado !== "string") {
            return new Response(
                JSON.stringify({ error: "Invalid message" }),
                { status: 400 }
            );
        }

        const text = mensaje_enviado.trim();

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
