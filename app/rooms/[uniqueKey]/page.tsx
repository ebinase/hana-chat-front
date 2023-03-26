'use client';

import { NextPage } from 'next';
import ChatRoom from '../../../src/rooms/components/ChatRoom';

type Pramas = { params: { uniqueKey: string } };

const Page: NextPage<Pramas> = ({ params }) => {
  return <ChatRoom uniqueKey={params.uniqueKey}></ChatRoom>;
};

export default Page;
