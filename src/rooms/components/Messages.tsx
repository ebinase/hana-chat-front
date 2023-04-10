'use client';

import Loading from '../../../app/loding';
import useChat from '../hooks/useChat';
import { MesssageData } from '../share/types/API/messages';

type Props = { messages: MesssageData[] };

const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <div className='flex flex-col gap-3 overflow-auto scroll-smooth h-max'>
      {messages.map((message) => {
        return (
          <div key={message.id} className='w-2/3'>
            <div className='text-gray-800 bg-white/70 rounded-lg px-1 py-5 text-left'>
              <p>{message.content}</p>
            </div>
            <p className='text-right text-xs text-gray-500'>00:00:00</p>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
