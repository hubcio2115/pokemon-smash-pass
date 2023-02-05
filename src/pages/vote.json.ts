import { Client } from 'pg';
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const client = new Client({
    connectionString: import.meta.env.DB_URI,
  });

  await client.connect();

  try {
    const { pokemon_id, vote } = await request.json();

    await client.query(
      `INSERT INTO votes (vote, pokemon_id) VALUES (${vote}, ${pokemon_id});`,
    );

    await client.end();

    return new Response(
      JSON.stringify({
        message: 'All good!',
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
