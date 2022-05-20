import React from 'react';
import Link from 'next/link';
import { Modal } from 'components';
import {Acknowledgment, Theme} from 'modals';

export function Footer() {

  const [refAcknowledgment, openAcknowledgment] = Modal.useModal();
  const [refTheme, openTheme] = Modal.useModal();

  return (
    <div className='flex justify-between md:justify-start px-0.5 border-t border-bgs text-[8px] md:text-[10px] lg:text-[11px]'>
      <span className='py-0.5 px-1 flex items-center cursor-default text-secondary'>
        Copyright &copy; 2022 Kitapbar
      </span>
      <span className='py-0.5 text-secondary'>|</span>
      <Link href='/privacy' prefetch={false}>
        <span className='py-0.5 px-1 flex items-center cursor-pointer text-link'>
          Gizlilik Politikası
        </span>
      </Link>
      <span className='py-0.5 text-secondary text-xs'>|</span>
      <span className='py-0.5 px-1 flex items-center cursor-pointer text-link' onClick={openAcknowledgment}>
        Açık Kaynak
      </span>
      <span className='py-0.5 text-secondary'>|</span>
      <span className='py-0.5 px-1 flex items-center cursor-pointer text-link' onClick={openTheme}>
        Tema
      </span>
      <Modal.Container title='👏 AÇIK KAYNAK' ref={refAcknowledgment} Component={Acknowledgment} />
      <Modal.Container title='🌺 TEMA' ref={refTheme} Component={Theme} />
    </div>
  );
}
