import type { NextApiRequest, NextApiResponse } from 'next';
import { MessageResponse, MesssageData } from '../../../../src/share/types/API/messages';

const messages: MesssageData[] = [...Array(5)].map((_, index) => {
  return {
    id: index,
    authorName: 'Sample User',
    content: 'こんにちは',
    createdAt: '2023/03/21-00:00:00',
    updatedAt: '2023/03/21-00:00:00',
  };
});

export default function handler(req: NextApiRequest, res: NextApiResponse<MessageResponse>) {
  setTimeout(() => {
    const uniqueKey = req.query.uniqueKey;
    if (uniqueKey === undefined || uniqueKey instanceof Array) {
      return res.status(403).json({ error: 'invalid_key' });
    }

    return res.status(200).json({
      uniqueKey: uniqueKey,
      totalCount: messages.length,
      limit: 100,
      offset: 0,
      messages: uniqueKey === 'f41ce51e-4c7e-8f57-ebeb-3e8091a9cb11' ? messages : [],
    });
  }, 2000);
}
