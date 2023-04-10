'use client';

import Loading from '../../../app/loding';
import useSWRImmutable from 'swr/immutable';
import { MesssageData } from '../share/types/API/messages';
import Messages from './Messages';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Result = {
  data: MesssageData[];
  isLoading: boolean;
};

const useChat = (uniqueKey: string): Result => {
  const { data, isLoading } = useSWRImmutable(`/api/rooms/${uniqueKey}/messages`, fetcher);

  return {
    data: data?.messages ?? [],
    isLoading,
  };
};

type Props = { uniqueKey: string };

const ChatRoom: React.FC<Props> = ({ uniqueKey }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target.id === 'backGround') {
      router.push('/');
    }
  };

  const { data, isLoading } = useChat(uniqueKey);

  const [messages, setMessages] = useState<MesssageData[]>([]);

  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);

  // websocket周り
  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080/socket');
    console.log(socketRef);
    socketRef.current.onopen = function () {
      setIsConnected(true);
      console.log('Connected');
    };

    socketRef.current.onclose = function () {
      console.log('closed');
      setIsConnected(false);
    };

    return () => {
      if (socketRef.current == null) {
        return;
      }
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      console.log('有効なWebSocket接続がありません！');
      return;
    }

    // 受信時の処理
    socketRef.current.onmessage = (event: { data: string }) => {
    // socketRef.current.onmessage = (event: { data: MesssageData&{uniqueKey: string} }) => {
    //   if (event.data.uniqueKey !== uniqueKey) {
    //     return;
    //   }
      console.log('MessageRecieved!!');

      setMessages((old) => [
        ...old,
        {
          id: messages.length + 1,
          authorName: 'Server',
          content: event.data,
          createdAt: '2023/03/21-00:00:00',
          updatedAt: '2023/03/21-00:00:00',
        },
      ]);
    };
  }, [socketRef, messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();
    const content = event.target[0].value;
    console.log(content);
    if (!content) return;

    isConnected ? socketRef.current?.send(content) : console.log('WebSocketつながってないよ！');
    setMessages((old) => [
      ...old,
      {
        id: messages.length + 1,
        authorName: 'you',
        content,
        createdAt: '2023/03/21-00:00:00',
        updatedAt: '2023/03/21-00:00:00',
      },
    ]);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setMessages(data);
    }
  }, [isLoading, data]);

  return (
    <div
      id='backGround'
      className='h-screen w-full flex items-center justify-center'
      onClick={handleClick}
    >
      <div className='basis-[780px] shrink grow-0 flex flex-col text-center mx-4 bg-white/30 backdrop-blur-lg rounded-md border border-white/40 shadow-lg'>
        <header className='px-4 py-4 flex justify-between text-center'>
          <div className='basis-[20%] text-left shrink-0'>
            <Link href={'/'} className='text-white font-extrabold'>
              {'<'}
            </Link>
          </div>
          <div className='grow'>
            <h2 className='text-white font-extrabold text-2xl'>Sample Room</h2>
          </div>
          <div className='basis-[20%] text-right  shrink-0'>
          </div>
        </header>
        <main className='py-0 px-8 flex flex-col flex-grow'>
          <div className='flex-grow my-2 h-max'>
            {isLoading ? <Loading /> : <Messages messages={messages} />}
          </div>
          <div className='border-t-gray-400'>
             <form onSubmit={sendMessage}>
              <div className='py-4 flex justify-between gap-4'>
                <input className='grow p-3 bg-white/50 focus:outline-none focus:bg-white/90' type='text' />
                <button type='submit'>
                  送信
                </button>
              </div>
          </form>
         </div>
        </main>
      </div>
    </div>
  );
};

export default ChatRoom;
