import React, { forwardRef } from 'react';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  className?: string;
  inputClass?: string;
  children?: any;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(({ className = '', inputClass = '', children, errorMessage, ...props }, ref) => {

  return (
    <div className='flex flex-col'>
      <div className={`h-9 flex rounded-md overflow-hidden shadow appearance-none ${className}`}>
        {children && <div className='self-stretch border-r border-bg bg-bgs text-secondary px-2.5 flex items-center justify-center'>{children}</div>}
        <input
          ref={ref}
          className={`w-full rounded-none py-1 px-4 bg-bgs text-secondary placeholder-third placeholder:text-xs md:placeholder:text-sm focus:outline-none text-sm ${inputClass}`}
          spellCheck={false}
          autoComplete='off'
          {...props}
        />
      </div>
      <small className='text-xs text-red-800'>{errorMessage || ''}</small>
    </div>
  )
});

export default Input;
