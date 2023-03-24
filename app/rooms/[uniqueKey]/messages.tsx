import { MesssageData } from "../../../pages/api/rooms/[uniqueKey]/messages";

// see: https://zenn.dev/tfutada/articles/36ad71ab598019#typescript%E3%82%A8%E3%83%A9%E3%83%BC
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
    return fn as (arg: T) => R;
}

async function getMessages(): Promise<MesssageData[]> {
  const res = await fetch("http://localhost:3000/api/rooms/hoge/messages", {
  cache: "no-store",
});

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return data.messages as MesssageData[];
}

const Messages = asyncComponent(async () => {
    const messages = await getMessages()
    return (
        <>
        {messages.map((message) => {
            return (
              <div key={message.id} className='flex align-top gap-5'>
                <div className='bg-fuchsia-200 rounded-full w-8 h-8 text-center align-text-center text-white font-extrabold'>{message.authorName}</div>
                <div className='flex-grow bg-fuchsia-200 rounded-lg mt-4 px-1 py-3'>{message.content}</div>
              </div>
            );
        })}
        </>
    )
});

export default Messages;
