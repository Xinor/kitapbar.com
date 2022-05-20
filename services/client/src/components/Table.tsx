import React, { forwardRef, ReactElement, useImperativeHandle, useRef } from 'react';

export interface ContainerMethods {
  scrollTop: () => void;
}
interface ContainerProps {
  children: [ReactElement<HeaderProps>, ReactElement<BodyProps>];
  className?: string;
  tableClass?: string;
}

export const Container = forwardRef<ContainerMethods, ContainerProps>(({ children, className = '', tableClass = '' }, ref) => {

  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollTop: () => {
      containerRef.current!.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }), []);

  return (
    <div className={`overflow-auto scrollbar overflow-y-scroll scroll-smooth ${className}`} ref={containerRef} >
      <table className={`w-full ${tableClass}`}>
        {children}
      </table>
    </div>
  )
})

interface HeaderProps {
  children: ReactElement<RowProps>;
}
export function Header({ children }: HeaderProps) {
  return <thead>{children}</thead>;
}

interface HeadProps {
  children: string;
  className?: string;
}
export function Head({ children, className = '' }: HeadProps) {
  return <th className={`px-5 h-6 truncate md:h-10 bg-bgs text-secondary text-[9px] md:text-[10px] font-normal ${className}`}>{children.toLocaleUpperCase('tr')}</th>
}

interface BodyProps {
  children: ReactElement<RowProps>[];
}
export function Body({ children }: BodyProps) {
  return <tbody>{children}</tbody>;
}

interface DataProps {
  children: string | React.ReactElement<HTMLAnchorElement> | null;
  className?: string;
  onClick?: React.MouseEventHandler;
}
export function Data({ children, className = '', onClick }: DataProps) {
  return <td className={`px-5 py-2 text-[9px] md:text-[12px] border-b border-bgs text-secondary ${className}`} onClick={onClick}>{children}</td>
}

interface RowProps {
  children: ReactElement<HeadProps>[] | ReactElement<DataProps>[];
  className?: string;
}
export function Row({ children, className = '' }: RowProps) {
  return <tr className={className}>{children}</tr>
}
