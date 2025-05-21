import { dbPool } from "@/services/db";

export async function POST(req: Request) {
  const { name, email } = await req.json();

  //check if mail exists in db

  // add mail to db
  const query_addToDb = `INSERT INTO newsletter (username, email) VALUES ($1, $2)`;
  const query_checkIfAdded = `SELECT * FROM newsletter WHERE email=$1;`;

  try {
    const result_checkIfAdded = await dbPool.query(query_checkIfAdded, [email]);
    // if there is no such e-mail in the database
    if (result_checkIfAdded.rows.length < 1) {
      try {
        const result_addToDb = await dbPool.query(query_addToDb, [name, email]);
        return new Response(JSON.stringify({ message: "Subscribed!" }), {
          status: 200,
        });
      } catch (err) {
        console.error("error executing query:", err);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ message: "This e-mail has already subscribed!" }),
        {
          status: 502,
        }
      );
    }
  } catch (err) {
    console.error("Error executing query:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
