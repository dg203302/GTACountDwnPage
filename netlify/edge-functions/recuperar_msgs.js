import { neon } from "https://esm.sh/@neondatabase/serverless";

export default async function handler(request, context) {
    const sql = neon(Deno.env.get("NETLIFY_DATABASE_URL"));

    try {
        const msgs = await sql`SELECT * FROM mensaje_usuarios`;

        return new Response(JSON.stringify(msgs), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Database query failed", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
