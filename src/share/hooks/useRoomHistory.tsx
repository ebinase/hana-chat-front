'use client';

import { useCookies } from 'react-cookie';

const useRoomHistory = () => {
  const [cookies, setCookie] = useCookies(['room_history']);

  const history = cookies.room_history as [string, string][];

  const add = (uniqueKey: string, roomName: string) => {
    const map = new Map(history ?? []);
    map.set(uniqueKey, roomName);
    console.log(map, map.entries());

    setCookie('room_history', Array.from(map.entries()));
  };

  return {
    history: history,
    add,
    reset: () => {
      setCookie('room_history', []);
    },
  };
};

export default useRoomHistory;
