import { neon } from '@neondatabase/serverless';


export async function POST(request: Request) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
        return new Response('Missing required information', { status: 400 });
    }

    try {
        const result = await sql`
            INSERT INTO users (
                name, email, clerk_id
            ) VALUES (
                ${name}, ${email}, ${clerkId}
            )
        `;
        return new Response(JSON.stringify({
            data: result
        }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(`Error inserting user ${JSON.stringify(error)}`, { status: 500 });
    }
}