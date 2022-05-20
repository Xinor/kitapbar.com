import React, {Dispatch, SetStateAction, useCallback, useState} from 'react';

interface IGroup {
  onChange: React.ChangeEventHandler<HTMLFormElement>;
  className?: string;
  children: any;
}
export function Group({children, onChange, className = ''}: IGroup) {
  return (
    <form className={className} onChange={onChange}>
      {children}
    </form>
  )
}

interface IProps {
  name: string;
  title: string;
  value: string;
  selected: string;
  className?: string;
}

export function Item({name, title, value, selected, className = ''}: IProps) {
  const checked = selected === value;
  return (
    <label className={`block flex items-center cursor-pointer p-2 ${className}`}>
      <input
        type="radio" name={name} value={value} checked={checked} readOnly
        aria-labelledby={`${name}-${title}`} aria-describedby={`${name}-${title}`}
        className='h-4 w-4 text-primary cursor-pointer'
      />
      <span className={`text-xs font-medium ml-1 ${checked ? 'text-primary' : 'text-secondary'}`}>
        {title}
      </span>
    </label>
  );
}

export function useRadio<S extends string>(name: string, initialState: S): [string, S, React.ChangeEventHandler<HTMLFormElement>, Dispatch<SetStateAction<S>>] {

  const [state, setState] = useState<S>(initialState);

  const onChange = useCallback<React.ChangeEventHandler<HTMLFormElement>>(e => {
    setState(e.target.value);
  }, []);

  return [name, state, onChange, setState];
}
