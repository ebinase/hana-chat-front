export type Request = {
  uniqueKey: string;
};

export type Response = RoomData | { error: string };

export type RoomData = {
  uniqueKey: string;
  roomName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
