import { pongoClient } from '@event-driven-io/pongo';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const runtime = 'nodejs';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pongo = pongoClient(process.env.DATABASE_URL);

  const users = pongo.db().collection("cloudflare");

  const now = new Date().toISOString();
  const existing = await users.findOne();

  if(existing)
    return res.status(200).json({ existing });

  const { insertedId } = await users.insertOne({_id: now, name: `test-${now}`});

  // Test query
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {_version, ...user } = await users.findOne({_id: insertedId!});

  console.log(JSON.stringify(user));

  res.status(200).json({ user });

//   res.status(200).json({
//     message: 'Hello world!',
//     cookies: req.cookies,
//     envVar: process.env.API_KEY,
//   });
}