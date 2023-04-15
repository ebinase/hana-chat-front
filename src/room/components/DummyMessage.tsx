'use client';

type Props = {
  isMyMessage: boolean;
  width?: string;
};

const DummyMessage: React.FC<Props> = ({ isMyMessage, width }) => {
  return (
    <div className={width ?? 'w-2/3'}>
      <div
        className={
          'text-gray-700 rounded-lg px-1 py-5 text-left animate-pulse ' +
          (isMyMessage ? 'bg-violet-500/30' : 'bg-white/30')
        }
      >
        <p>
          <br />
        </p>
      </div>
      <p className='text-right text-xs text-gray-500'>00:00</p>
    </div>
  );
};

export default DummyMessage;
