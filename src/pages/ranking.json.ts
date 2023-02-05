import pg from 'pg';
import type { APIRoute } from 'astro';

export const get: APIRoute = async () => {
  const client = new pg.Client({
    connectionString: import.meta.env.DB_URI,
  });

  await client.connect();

  try {
    const res = await client.query(`SELECT pokemon_id, 
      100.0 * sum(CASE WHEN vote THEN 1 ELSE 0 END) / count(*) AS votes_percentage
    FROM votes
    GROUP BY pokemon_id
    ORDER BY votes_percentage DESC;`);

    await client.end();

    return new Response(
      JSON.stringify({
        data: res,
      }),
      { status: 200 },
    );
  } catch (e) {
    console.error(e);

    client.end();

    return new Response(JSON.stringify({ message: 'Something went wrong!' }), {
      status: 400,
    });
  }
};
