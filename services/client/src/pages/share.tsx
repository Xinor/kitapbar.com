import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {useForm} from 'react-hook-form';
import {FaYandexInternational} from 'react-icons/fa';
import {Button, Input, Modal, Page, Pagination, Table} from 'components';
import {Disk} from 'modals'
import * as API from 'API';

function Share() {

  const {register, handleSubmit, reset} = useForm<{ link: string }>({});
  const [ refDisk, openDisk ] = Modal.useModal();

  const [offset, setOffset] = useState<number>(0);
  const { isFetching, data, refetch } = useQuery(['getYaDisks', { offset }], API.getYaDisks, {initialData: { total: 0, disks: [], limit: 100}});
  const { total, limit, disks } = data!;

  const sendYaDisk = useMutation(API.sendYaDisk, {
    onSuccess: async () => {
      reset();
      await refetch();
    }
  });

  useEffect(() => {
    if (localStorage.getItem('__sendyadisk__useeffect__') === null) {
      setTimeout(() => { openDisk(); }, 300);
      localStorage.setItem('__sendyadisk__useeffect__', '1');
    }
  }, []);

  const onSubmit = handleSubmit(({link}) => {
    sendYaDisk.mutate({link});
  });

  return (
    <Page title='e-kitap ara' className='flex flex-col'>
      <form className='flex items-center justify-center mx-4 my-2 md:my-3' onSubmit={onSubmit}>
        <Input {...register('link',)} placeholder='disk adresi..'>
          <FaYandexInternational size={16}/>
        </Input>
        <Button type='submit' loading={sendYaDisk.isLoading} className='ml-2 w-32 h-9'>Gönder</Button>
        <div onClick={openDisk} className='animate-pulse pl-4 pr-2 cursor-pointer text-secondary'>?</div>
      </form>
      <div className='flex-1 flex flex-col min-h-0'>
        <Pagination step={limit} total={total} offset={offset} passive={isFetching} className='ml-auto' onClickLeft={() => setOffset(offset - limit)} onClickRight={() => setOffset(offset + limit)}/>
        <Table.Container className='flex-1'>
          <Table.Header>
            <Table.Row className='sticky top-0 z-50'>
              <Table.Head className='w-4/12 min-w-[160px] text-left'>İsim</Table.Head>
              <Table.Head className='w-3/12 min-w-[200px] text-left'>URL</Table.Head>
              <Table.Head className='w-1/12 text-left'>Oluşturulma</Table.Head>
              <Table.Head className='w-1/12 text-left'>Son Güncellenme</Table.Head>
              <Table.Head className='w-1/12 text-left'>Sisteme Kayıt</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              disks.map(disk => {
                const {_id, name, public_url, created, modified, createdAt} = disk;
                return (
                  <Table.Row key={_id}>
                    <Table.Data className='text-[12px] md:text-[13px]'>{name}</Table.Data>
                    <Table.Data className='text-xs cursor-pointer text-link'><a href={public_url} target='_blank'>{public_url}</a></Table.Data>
                    <Table.Data className='text-xs'>{new Date(created).toLocaleDateString()}</Table.Data>
                    <Table.Data className='text-xs'>{new Date(modified).toLocaleDateString()}</Table.Data>
                    <Table.Data className='text-xs'>{new Date(createdAt).toLocaleDateString()}</Table.Data>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table.Container>
      </div>
      <Modal.Container title='🙂 KATKI SAĞLA' ref={refDisk} Component={Disk} />
    </Page>
  )
}

export default Share;
