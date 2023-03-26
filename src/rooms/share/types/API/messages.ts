export type RequestData = {
  uniqueKey: string;
  limit?: number;
  offset?: number;
};

export type MessageResponse =
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
