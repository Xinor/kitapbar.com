import React, {useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useForm} from 'react-hook-form';
import {toast} from "react-toastify";
import {MdAlternateEmail} from 'react-icons/md';
import {RiLockPasswordFill} from 'react-icons/ri';
import {Input, Button, List} from 'components';
import copyToClipboard from 'helpers/copyToClipboard';
import * as API from 'API';

function Sign() {

  const [state, setState] = useState<'signup' | 'signin'>('signup');

  return (
    <div className='w-[280px] md:w-[520px] space-y-4 p-3.5 flex flex-col'>
      <div className='flex mt-2 mb-4'>
        <Button className={`flex-1 h-7 rounded ${state === 'signup' ? 'bg-bg' : ''}`} onClick={() => setState('signup')}>
          Kayıt
        </Button>
        <Button className={`flex-1 h-7 rounded ${state === 'signin' ? 'bg-bg' : ''}`} onClick={() => setState('signin')}>
          Giriş
        </Button>
      </div>
      {
        state === 'signup' ? <SignUp/> : <SignIn/>
      }
    </div>
  )
}

function SignUp() {

  const [state, setState] = useState({ registered: false, password: ''});
  const {register, handleSubmit} = useForm<{ email: string, code: string }>({});

  const {refetch: refetchMe} = useQuery(['me'], API.me);
  const registerUser = useMutation(API.register, {onSuccess: () => setState({...state, registered: true})});
  const activate = useMutation(API.activate, {onSuccess: (password) => setState({...state, password})});
  const login = useMutation(API.login, {
    onSuccess: async (token) => {
      localStorage.setItem('__token__', token);
      await refetchMe();
    }
  });
  const onSubmit = handleSubmit(({email, code}) => {
    if (state.password)
      login.mutate({email, password: state.password});
    else {
      if (state.registered)
        activate.mutate({email, code});
      else
        registerUser.mutate({email});
    }
  });

  const copyPass = async () => {
    await copyToClipboard(state.password);
    toast.success('şifreniz kopyalandı.');
  }

  const loading = registerUser.isLoading || activate.isLoading || login.isLoading;

  return (
    <div className='w-full flex-1 flex flex-col items-center'>
      <div className='w-full mb-2'>
        <p>İzin verilen sağlayıcılar</p>
        <List.Container>
          <List.Item>yandex</List.Item>
          <List.Item>gmail</List.Item>
          <List.Item>icloud</List.Item>
          <List.Item>hotmail</List.Item>
          <List.Item>outlook</List.Item>
          <List.Item>tutanota</List.Item>
          <List.Item>yahoo</List.Item>
          <List.Item>aol</List.Item>
          <List.Item>live</List.Item>
          <List.Item>protonmain</List.Item>
        </List.Container>
      </div>
      <form onSubmit={onSubmit} className='flex flex-col items-center'>
        <Input {...register('email')} type='email' placeholder='email..'>
          <MdAlternateEmail size={10}/>
        </Input>
        {
          state.password !== ''
            ? (
              <div className='mt-4'>
                <div className='flex items-center'>
                  <p className='text-sm'>Şifreniz: <span className='text-primary'>{state.password}</span></p>
                  <Button type='button' className='ml-4 px-6 py-1' onClick={copyPass}>Kopyala</Button>
                </div>
                <p className='mt-4 text-secondary text-xs'>Rastgele oluşturulan şifreniz anında silinir. Lütfen devam etmeden önce şifrenizi bir yere kaydedin.</p>
              </div>
            )
            : (
              <div className='my-2 flex flex-col items-center'>
                {state.registered && (
                  <div>
                    <Input {...register('code')} placeholder='aktivasyon kodu'/>
                    <small className='mt-1 text-[8px] md:text-[9px] text-secondary text-center'>e-postanıza aktivasyon kodu bazen geç gelebilir. lütfen bekleyin.</small>
                  </div>
                )}
              </div>
            )
        }
        <Button type='submit' loading={loading} className='mt-4 w-32 h-8'>Devam</Button>
      </form>
    </div>
  );
}

function SignIn() {

  const {register, handleSubmit} = useForm<{ email: string, password: string }>({});

  const {refetch: refetchMe} = useQuery(['me'], API.me);
  const login = useMutation(API.login, {
    onSuccess: (token) => {
      localStorage.setItem('__token__', token);
      refetchMe();
    }
  });

  const onSubmit = handleSubmit(({email, password}) => {
    login.mutate({email, password});
  });

  return (
    <form className='w-full flex-1 flex flex-col items-center' onSubmit={onSubmit}>
      <Input {...register('email')} type='email' placeholder='e-posta'>
        <MdAlternateEmail size={10}/>
      </Input>
      <Input {...register('password')} type='password' placeholder='şifre' className='mt-2'>
        <RiLockPasswordFill size={10}/>
      </Input>
      <Button type='submit' loading={login.isLoading} className='mt-4 w-32 h-8'>Giriş</Button>
    </form>
  );
}

export default Sign;
