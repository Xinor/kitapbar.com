import Link from "next/link";
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {FaUser, FaUserCheck} from 'react-icons/fa';
import {Modal} from 'components';
import {About, Security, Donate, Contact, User, Sign} from 'modals';
import * as API from 'API';

export function Header() {

  const {route} = useRouter();
  const [refAbout, openAbout] = Modal.useModal();
  const [refSecurity, openSecurity] = Modal.useModal();
  const [refDonate, openDenate] = Modal.useModal();
  const [refContact, openContact] = Modal.useModal();
  const [refUser, openUser] = Modal.useModal();

  const {data: user} = useQuery(['me'], API.me);

  const UserIcon = user === undefined ? FaUser : FaUserCheck;

  return (
    <div className='w-full px-4 lg:px-10 xl:px-32 2xl:px-40 flex items-stretch flex-col lg:flex-row pt-1 lg:pt-0 lg:h-14 border-b-2 border-bgs'>
      <div className='flex self-center flex-row lg:flex-col space-x-1 mt-1 lg:space-x-0 lg:mt-0'>
        <span className='text-primary leading-none text-sm lg:text-2xl lg:font-normal self-end lg:self-auto lg:tracking-wide'>KİTAPBAR.com</span>
        <span className='text-secondary leading-none text-[8px] lg:text-[9px] self-end lg:self-auto'>e-kitap arama motoru</span>
      </div>
      <nav className='flex flex-col-reverse lg:flex-row mt-1 lg:mt-0 lg:ml-auto'>
        <div className='flex justify-center items-center'>
          <Link href='/'>
            <div className={`menu-item flex-1 order-2 md:order-1 ${route === '/' ? 'text-primary' : ''}`}>
              ANASAYFA
            </div>
          </Link>
          <Link href='/share' prefetch={false}>
            <div className={`menu-item flex-1 order-1 md:order-2 ${route === '/share' ? 'text-primary' : ''}`}>
              DİSK PAYLAŞIMI
            </div>
          </Link>
          <div className='menu-item flex-1 order-3' onClick={openAbout}>HAKKINDA</div>
        </div>
        <div className='flex justify-center items-center space-x-2'>
          <div className='menu-item' onClick={openSecurity}>GÜVENLİK</div>
          <div className='menu-item' onClick={openDenate}>DESTEK OL</div>
          <div className='menu-item' onClick={openContact}>İLETİŞİM</div>
          <UserIcon onClick={openUser} className={`cursor-pointer text-secondary`} />
        </div>
      </nav>
      <Modal.Container title='📖 HAKKINDA' ref={refAbout} Component={About}/>
      <Modal.Container title='🛡 GÜVENLİK' ref={refSecurity} Component={Security}/>
      <Modal.Container title='🍉 DESTEK OL' ref={refDonate} Component={Donate}/>
      <Modal.Container title='🤙 İLETİŞİM' ref={refContact} Component={Contact}/>
      <Modal.Container title='👤 KULLANICI' ref={refUser} Component={user === undefined ? Sign : User} locked/>
    </div>
  );
}
