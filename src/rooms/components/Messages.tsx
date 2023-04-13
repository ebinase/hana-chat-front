'use client';

import { useLayoutEffect, useRef } from 'react';
import Loading from '../../../app/loding';
import useChat from '../hooks/useChat';
import { MesssageData } from '../share/types/API/messages';

type Props = {
  messages: MesssageData[];
  dummy: boolean;
};

const Messages: React.FC<Props> = ({ messages, dummy }) => {
 const scrollBottomRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  }, [messages]);


  if (dummy) {
    return (
      <div className='flex flex-col gap-3 overflow-y-auto h-[650px]'>
        {[...Array(10)].map((_, index) => {
          const isMyMessage = index % 3 === 0;
          return (
            <div key={index} className={'w-full flex ' + (isMyMessage ? 'justify-end' :'justify-start')}>
              <div className='w-2/3'>
                <div className={'text-gray-700 rounded-lg px-1 py-5 text-left animate-pulse ' + (isMyMessage ? 'bg-violet-500/30' : 'bg-white/30')}>
                <p>
                  <br />
                </p>
              </div>
              <p className='text-right text-xs text-gray-500'>00:00</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3 overflow-y-auto h-[650px]'>
      {messages.map((message, index) => {
        const isMyMessage = index % 3 === 0;
        return (
          <div key={message.id} className={'w-full flex ' + (isMyMessage ? 'justify-end' :'justify-start')}>
            <div className='w-2/3'>
              <div className={'text-gray-800 rounded-lg px-1 py-5 text-left ' + (isMyMessage ? 'bg-violet-200/50' : 'bg-white/70')}>
              <p>{message.content}</p>
            </div>
            <p className='text-right text-xs text-gray-500'>00:00</p>
            </div>
            </div>
        );
      })}
      <div ref={scrollBottomRef}/>
    </div>
  );
};

export default Messages;
