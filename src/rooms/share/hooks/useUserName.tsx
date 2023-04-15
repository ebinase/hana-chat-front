'use client';

import { useState } from 'react';
import { useCookies } from 'react-cookie';

const useUserName = () => {
  const [cookies, setCookie] = useCookies(['name']);

  const [value, setValue] = useState<string>(cookies.name);

  const setName = (name: string) => {
    setCookie('name', name);
    setValue(name);
  };

  return { name: value, setName };
};

export default useUserName;
