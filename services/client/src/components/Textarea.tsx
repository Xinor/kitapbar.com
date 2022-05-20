import React, {forwardRef} from 'react';

interface IProps extends React.HTMLProps<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(({className = '', ...props}, ref) => {
  return (
    <textarea
      className={`w-full rounded-md appearance-none shadow py-1 px-4 bg-bgs text-secondary placeholder-secondary placeholder:text-xs md:placeholder:text-sm text-base focus:outline-none resize-none ${className}`}
      ref={ref}
      spellCheck={false}
    />
  )
});

export default Textarea;
