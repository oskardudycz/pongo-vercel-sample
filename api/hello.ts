import { pongoClient } from '@event-driven-io/pongo';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pongo = pongoClient(process.env.DATABASE_URL, { connectionOptions: { pooled:false } });

  res.status(200).json({
    message: 'Hello world!',
    cookies: req.cookies,
    envVar: process.env.API_KEY,
  });
}