import {useForm} from 'react-hook-form';
import {useMutation, useQuery} from 'react-query';
import {Button, Input, Textarea} from 'components';
import * as API from 'API';

function Contact() {

  const {data: user} = useQuery(['me'], API.me);
  const {register, handleSubmit} = useForm<{ title: string, message: string }>({});
  const contact = useMutation(API.contact);

  const onSubmit = handleSubmit(({title, message}) => {
    contact.mutate({title, message});
  });

  return (
    <div className='w-[280px] md:w-[500px] space-y-4 pb-4 p-3.5'>
      <div>
        <p className='font-medium text-center text-md'>iletişim adresi: <span className='text-primary'>info@kitapbar.com</span></p>
      </div>
      <form className='space-y-2' onSubmit={onSubmit}>
        <p className='text-xs text-right'>{user ? user.email : 'formu göndermek için lütfen giriş yapın'}</p>
        <Input {...register('title')}>
          <span className='text-sm'>başlık:</span>
        </Input>
        <Textarea {...register('message')} className='h-32' placeholder='mesajınız..' />
        <Button className='ml-auto mt-4 w-32 h-8' onClick={onSubmit} loading={contact.isLoading}>Gönder</Button>
      </form>
    </div>
  );
}

export default Contact;
