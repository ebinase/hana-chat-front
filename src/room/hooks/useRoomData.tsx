'use client';

import useSWRImmutable from 'swr/immutable';
import { RoomData } from '../../share/types/API/rooms/detail';

type Result = {
  roomData: RoomData;
  isLoading: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useRoomData = (uniqueKey: string): Result => {
  const { data, isLoading } = useSWRImmutable(`http://localhost:8080/rooms/${uniqueKey}/detail`, fetcher);
  return {
    roomData: data ?? [],
    isLoading,
  };
};

export default useRoomData;
