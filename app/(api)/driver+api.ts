import { neon } from "@neondatabase/serverless";

export const GET = async () => {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        const response = await sql`
            SELECT * FROM drivers
        `;
        return new Response(JSON.stringify({
            data: response
        }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(`Error inserting user ${JSON.stringify(error)}`, { status: 500 });
    }
}