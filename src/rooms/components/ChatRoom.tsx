'use client';

import Loading from '../../../app/loding';
import useSWR, { KeyedMutator } from 'swr';
import useSWRImmutable from 'swr/immutable'
import { MesssageData } from '../share/types/API/messages';
import Messages from './Messages';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Result = {
  data: MesssageData[];
  isLoading: boolean;
};

const useChat = (uniqueKey: string): Result => {
  // TODO: useSWRMutationも検討する
  const { data, isLoading } = useSWRImmutable(`/api/rooms/${uniqueKey}/messages`, fetcher);

  return {
    data: data?.messages ?? [],
    isLoading
  };
};

type Props = { uniqueKey: string };

const ChatRoom: React.FC<Props> = ({ uniqueKey }) => {
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

    // 受信時の処理
    socketRef.current.onmessage = function (event) {
      console.log('RecievedMessage!!');
      mutate(event.data);
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

  const sendMessage = (event: any) => {
    event.preventDefault();
    const content = event.target[0].value;
    if (!content) return

    isConnected ? socketRef.current?.send(content) : console.log('WebSocketつながってないよ！')
    setMessages((old) => [...old, {
      id: messages.length+1,
      authorName: 'you',
      content,
      createdAt: '2023/03/21-00:00:00',
    updatedAt: '2023/03/21-00:00:00',
    }])
  };

  if (!isLoading && data && messages.length === 0) {
    setMessages(data);
  }

  console.log(messages);

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-fuchsia-900 px-4 py-4 flex justify-between md-flex-col'>
        <div className='flex gap-3'>
          <Link href={'/'} className='text-white font-extrabold'>
            {'<'}
          </Link>
          <h1 className='text-xl text-white font-extrabold'>吉田チャット</h1>
          {uniqueKey}
        </div>
        <div className='text-white'>メニュー</div>
      </header>
      <main className='py-0 px-8 flex flex-col flex-grow'>
        <div className='flex-grow my-2'>
          {isLoading ? <Loading /> : <Messages messages={messages}/>}
        </div>
        <form onSubmit={sendMessage}>
          <div className='bg-slate-200 py-4 px-6 flex justify-between gap-4'>
            <input className='grow p-3' type='text' />
            <button type='submit' className={isConnected ? 'text-black' : 'text-red-700'}>
              送信
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ChatRoom;
