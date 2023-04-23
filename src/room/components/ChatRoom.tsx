'use client';

import MessageTimeline from './MessageTimeline';
import Link from 'next/link';
import InputArea from './InputArea';
import useChat from '../hooks/useChat';
import useRoomData from '../hooks/useRoomData';
import { useEffect } from 'react';
import useRoomHistory from '../../share/hooks/useRoomHistory';

type Props = { uniqueKey: string };

const ChatRoom: React.FC<Props> = ({ uniqueKey }) => {
  const { roomData, isLoading: isRoomDataLoading } = useRoomData(uniqueKey);
  const { messages, isLoading, sendMessage, hasError } = useChat(uniqueKey);

  const { add } = useRoomHistory();
  useEffect(() => {
    if (isRoomDataLoading || !roomData.roomName) return;
    console.log('history added');
    add(uniqueKey, roomData.roomName);
  }, [uniqueKey, isRoomDataLoading]);

  return (
    <div id='backGround' className='h-screen w-screen flex items-center justify-center'>
      <div className='basis-[780px] shrink grow-0 h-full md:h-auto flex flex-col text-center bg-white/30 backdrop-blur-lg rounded-md border border-white/40 shadow-lg'>
        <header className='px-4 py-4 flex justify-between text-center items-center'>
          <div className='basis-[20%] text-left shrink-0'>
            <Link href={'/'} className='text-white font-extrabold'>
              {'<'}
            </Link>
          </div>
          <div className='grow'>
            <h2 className='text-white font-extrabold text-2xl'>
              {isRoomDataLoading ? '・' : roomData.roomName}
            </h2>
          </div>
          <div className='basis-[20%] shrink-0 flex justify-end'>
            {hasError ? (
              <div className='bg-rose-500 text-white px-2 py-1 rounded-md'>OFFLINE</div>
            ) : (
              <div className='bg-emerald-500 text-white px-2 py-1 rounded-md'>ONLINE</div>
            )}
          </div>
        </header>
        <main className='px-8 flex flex-col flex-grow'>
          <div className='my-2'>
            <MessageTimeline messages={messages} isLoading={isLoading} hasError={hasError} />
          </div>
          <InputArea sendMessage={sendMessage} />
        </main>
      </div>
    </div>
  );
};

export default ChatRoom;
