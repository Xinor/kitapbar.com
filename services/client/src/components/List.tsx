import {ReactElement} from "react";

interface IContainerProps {
  children: ReactElement<IItemProps> | ReactElement<IItemProps>[];
  title?: string;
  className?: string;
  headerClassName?: string;
}
export const Container = ({children, title, className = '', headerClassName = ''}: IContainerProps) => {
  return (
    <section className={className}>
      {title && <h2 className={headerClassName}>{title}</h2>}
      <ul className='flex flex-col'>
        {children}
      </ul>
    </section>
  )
}

interface IItemProps {
  className?: string;
  children: any;
}
export const Item = ({children, className = ''}: IItemProps) => {
  return (
    <li className={`text-[10px] md:text-sm ml-2 ${className}`}>
      ➵ {children}
    </li>
  )
}
