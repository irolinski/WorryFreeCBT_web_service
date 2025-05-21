import { dbPool } from "@/services/db";

export async function POST(req: Request) {
  const { name, email } = await req.json();

  const query = `INSERT INTO newsletter (username, email) VALUES ($1, $2)`;

  try {
    const result = await dbPool.query(query, [name, email]);
    return new Response(JSON.stringify({ message: "Subscribed!" }), {
      status: 200,
    });
  } catch (err) {
    console.error("error executing query:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
