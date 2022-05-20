import React, {useCallback, useState, useEffect} from 'react';
import { useTheme } from 'next-themes';
import {Radio} from 'components';

type ThemeType = 'system' | 'light' | 'dark' | 'mystique' | 'stitch' | 'prime' | 'red';

function Theme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [ name, state, onChange, setState ] = Radio.useRadio<ThemeType>('theme', 'system');

  const changeHandler = useCallback<React.ChangeEventHandler<HTMLFormElement>>(e => {
    setTheme(e.target.value);
    onChange(e);
  }, []);
  useEffect(() => {
    setState(theme as ThemeType);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='w-[200px] md:w-[300px] p-3.5'>
      <Radio.Group className='flex flex-col' onChange={changeHandler}>
        <Radio.Item name={name} title='sistem' value='system' selected={state} />
        <Radio.Item name={name} title='açık' value='light' selected={state} />
        <Radio.Item name={name} title='koyu' value='dark' selected={state} />
        <Radio.Item name={name} title='turuncu' value='mystique' selected={state} />
        <Radio.Item name={name} title='kızıl mor' value='stitch' selected={state} />
        <Radio.Item name={name} title='kırmızı' value='red' selected={state} />
      </Radio.Group>
    </div>
  );
}

export default Theme;
