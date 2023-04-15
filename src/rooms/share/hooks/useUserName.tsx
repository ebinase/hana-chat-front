'use client';

import { useCookies } from 'react-cookie';

const useUserName = () => {
  const [cookies, setCookie] = useCookies(['name']);

  return { name: cookies.name ?? '', setName: (name: string) => setCookie('name', name) };
};

export default useUserName;
