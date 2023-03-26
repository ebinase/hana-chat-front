import type { NextApiRequest, NextApiResponse } from 'next';
import { MessageResponse, MesssageData } from '../../../../src/rooms/share/types/API/messages';

const messages: MesssageData[] = [...Array(5)].map((_, index) => {
  return {
    id: index,
    authorName: '門下生',
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
      messages: uniqueKey === 'abvd-egfa-888a-3267' ? messages : [],
    });
  }, 2000);
}
