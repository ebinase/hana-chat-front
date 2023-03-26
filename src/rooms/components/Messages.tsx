'use client';

import Loading from '../../../app/loding';
import useChat from '../hooks/useChat';
import { MesssageData } from '../share/types/API/messages';

type Props = { messages: MesssageData[] };

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <div className='flex flex-col gap-3 overflow-auto scroll-smooth'>
      {messages.map((message) => {
        return (
          <div key={message.id} className='flex align-top gap-10'>
            <div className='bg-fuchsia-200 rounded-full w-8 h-8 text-center align-text-center text-white font-extrabold'>
              {message.authorName.charAt(0)}
            </div>
            <div className='flex-grow'>
              <p>{message.authorName}</p>
              <p className='bg-fuchsia-200 rounded-lg px-1 py-3'>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
