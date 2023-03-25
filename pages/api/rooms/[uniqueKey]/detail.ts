import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData =
  | {
      uniqueKey: string;
      name: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }
  | { error: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const uniqueKey = req.query.uniqueKey;
  if (uniqueKey === undefined || uniqueKey instanceof Array) {
    return res.status(403).json({ error: 'invalid_key' });
  }

  res.status(200).json({
    uniqueKey: uniqueKey,
    name: 'チャットルーム1',
    status: 'active',
    createdAt: '2023/03/21-00:00:00',
    updatedAt: '2023/03/21-00:00:00',
  });
}
