import React from 'react';
import {useQuery} from 'react-query';
import {toast} from 'react-toastify';
import {Button} from 'components';
import * as API from 'API';

function User() {

  const {data: user, refetch, isFetching} = useQuery(['me'], API.me);
  const signOut = async () => {
    localStorage.removeItem('__token__');
    await refetch();
    toast.success('çıkış yapıldı.');
  }

  return (
    <div className='w-[280px] md:w-[520px] p-3.5'>
      <div className='flex justify-between items-center'>
        {user && <span className='text-sm'>{user.email}</span>}
        <Button onClick={signOut} loading={isFetching} className='px-4 py-1'>Çıkış yap</Button>
      </div>
      <hr className='my-2 border-bgs'/>
      <p className='text-xs'>
        Çıkış yapmadığınız sürece oturumunuz bu cihazda açık kalır. Aynı hesapla farklı cihazlarda oturum açabilirsiniz.
      </p>
    </div>
  )
}

export default User;
