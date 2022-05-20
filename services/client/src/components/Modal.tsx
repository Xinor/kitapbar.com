import {forwardRef, useImperativeHandle, useState, useRef, useCallback, PropsWithChildren, FunctionComponent, RefObject, memo, useLayoutEffect, MouseEventHandler} from 'react';
import { createPortal } from 'react-dom';

interface IMethods {
  open: () => void;
  close: () => void;
}

interface IProps {
  title: string;
  Component: FunctionComponent<PropsWithChildren<{ close: () => void }>>;
  className?: string;
  locked?: boolean;
}

const animEvents = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'];

export const Container = memo(forwardRef<IMethods, IProps>(({title, className = '', locked = false, Component}, ref) => {

  const [show, setShow] = useState(false);
  const showToFalse = useCallback(() => { setShow(false); }, []);
  const modalWrapper = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  const wrapperClickHandler = useCallback<MouseEventHandler>((e) => {
    //e.stopPropagation();
    if (e.target === e.currentTarget && !locked) {
      closeModal();
    }
  }, [locked]);
  const closeModal = useCallback(() => {
    modalWrapper.current!.classList.replace('animate-modalWrapper', "animate-modalWrapper_out");
    modal.current!.classList.replace('animate-modalBox', 'animate-modalBox_out');
    animEvents.forEach(e => {
      modal.current!.addEventListener(e, showToFalse, {once: true, passive: true});
    });
  }, []);

  useLayoutEffect(() => {
    if (show) {
      modalWrapper.current!.classList.add("animate-modalWrapper");
      modal.current!.classList.add('animate-modalBox');
    }
  }, [show]);

  useImperativeHandle(ref, () => ({
    open: () => setShow(true),
    close: closeModal
  }), []);

  if (!show) return null;
  return (
    createPortal(
      <div className='fixed z-[9999] inset-0 flex items-center justify-center' onClick={wrapperClickHandler} ref={modalWrapper}>
        <div className={`flex flex-col transform scale-0 rounded-md bg-bg overflow-hidden max-h-[80%] ${className}`} ref={modal}>
          <div className='p-3.5 flex justify-between items-center text-primary pb-2.5 border-b border-bgs'>
            <div className='text-xs md:text-sm flex-1 font-bold md:tracking-wide'>{title}</div>
            <svg xmlns='http://www.w3.org/2000/svg' onClick={closeModal} className='cursor-pointer w-6 h-6' baseProfile='tiny' version='1.2' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M17.414 6.586a2 2 0 00-2.828 0L12 9.172 9.414 6.586a2 2 0 10-2.828 2.828L9.171 12l-2.585 2.586a2 2 0 102.828 2.828L12 14.828l2.586 2.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586a2 2 0 000-2.828L14.829 12l2.585-2.586a2 2 0 000-2.828z'/>
            </svg>
          </div>
          <div className='flex-1 overflow-x-hidden overflow-y-auto scrollbar bg-bg text-secondary'>
            <Component close={closeModal}/>
          </div>
        </div>
      </div>,
      document.getElementById('__next')!
    )
  );
}));

export const useModal = (): [ref: RefObject<IMethods>, open: () => void] => {
  const ref = useRef<IMethods>(null);

  const open = useCallback(() => {
    ref.current!.open();
  }, []);

  return [ref, open];
}
