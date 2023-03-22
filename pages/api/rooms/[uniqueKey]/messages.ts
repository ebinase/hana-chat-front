import type { NextApiRequest, NextApiResponse } from "next";

export type RequestData = {
  uniqueKey: string;
  limit?: number;
  offset?: number;
};

export type ResponseData =
  | {
      uniqueKey: string;
      totalCount: number;
      limit: number;
      offset: number;
      messages: Array<MesssageData>;
    }
  | { error: string };

export type MesssageData = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const messages: MesssageData[] = [...Array(5)].map((_, index) => {
  return {
    id: index,
    authorName: "門下生",
    content: "こんにちは",
    createdAt: "2023/03/21-00:00:00",
    updatedAt: "2023/03/21-00:00:00",
  };
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const uniqueKey = req.query.uniqueKey;
  if (uniqueKey === undefined || uniqueKey instanceof Array) {
    return res.status(403).json({ error: "invalid_key" });
  }

  return res.status(200).json({
    uniqueKey: uniqueKey,
    totalCount: messages.length,
    limit: 100,
    offset: 0,
    messages: messages,
  });
}
