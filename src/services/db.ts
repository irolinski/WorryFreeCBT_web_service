// export const dbConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: true,
//     ca: process.env.CERT,
//   },
// };

// import { Client } from "pg";

// export const client = new Client(process.env.DATABASE_URL);

// (async () => {
//   await client.connect();
//   try {
//     const results = await client.query("SELECT NOW()");
//     console.log(results);
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     client.end();
//   }
// })();

// services/db/config.ts
import { Pool } from "pg";

export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
