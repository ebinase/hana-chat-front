'use client';

import { MesssageData } from '../../share/types/API/messages';

type Props = {
  message: MesssageData;
  isMyMessage: boolean;
  width?: string;
};

const Message: React.FC<Props> = ({ message, isMyMessage, width }) => {
  return (
    <div className={width ?? 'w-2/3'}>
      <p className='text-left text-xs text-white/80 mb-1'>
        {!isMyMessage ? message.authorName : null}
      </p>
      <div
        className={
          'text-gray-800 rounded-lg px-1 py-5 text-left ' +
          (isMyMessage ? 'bg-violet-500/30' : 'bg-white/70')
        }
      >
        <p className='break-words'>{message.content}</p>
      </div>
      <p className='text-right text-xs text-gray-500'>{message.createdAt}</p>
    </div>
  );
};

export default Message;
