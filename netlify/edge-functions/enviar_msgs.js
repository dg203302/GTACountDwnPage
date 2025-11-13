import { neon } from "https://esm.sh/@neondatabase/serverless";

export default async function handler(request, context) {
    const sql = neon(Deno.env.get("NETLIFY_DATABASE_URL"));

    try{
        const { mensaje_enviado } = await request.json();
        if (!mensaje_enviado || typeof mensaje_enviado !== 'string') {
            return new Response(
                JSON.stringify({ error: "Invalid input: 'mensaje_enviado' is required and must be a string." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const result = await sql`INSERT INTO mensaje_usuarios (mensaje_enviado) VALUES (${mensaje_enviado}) RETURNING *`;

        return new Response(JSON.stringify(result[0]), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}