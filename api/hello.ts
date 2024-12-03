import { pongoClient } from '@event-driven-io/pongo';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const runtime = 'nodejs';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pongo = pongoClient(process.env.DATABASE_URL, { connectionOptions: { pooled:false } });

  const users = pongo.db().collection("cloudflare");

  const now = new Date().toISOString();

  const {insertedId } = await users.insertOne({_id: now, name: `test-${now}`});

  // Test query
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {_version, ...user } = await users.findOne({_id: insertedId!});

  console.log(JSON.stringify(user));

  res.status(200).json({ user });
}