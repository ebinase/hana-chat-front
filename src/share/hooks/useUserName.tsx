'use client';

import { useCookies } from 'react-cookie';

const useUserName = () => {
  const [cookies, setCookie] = useCookies(['name']);

  const setName = (name: string) => {
    setCookie('name', name);
  };

  return { name: cookies.name, setName };
};

export default useUserName;
