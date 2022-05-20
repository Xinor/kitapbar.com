import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useQuery} from 'react-query';
import {FaSearch} from 'react-icons/fa';
import {AiOutlineBook} from 'react-icons/ai';
import {TiTick} from 'react-icons/ti';
import {Button, Input, Page, Pagination, Table} from 'components';
import bytes from 'helpers/bytes';
import {downloadBook} from 'helpers/downloadBook';
import * as API from 'API';

export default function Home() {

  const {data: stats} = useQuery(['getStats'], API.getStats, { refetchOnWindowFocus: true, refetchInterval: 5000 });
  const [form, setForm] = useState({search: '', offset: 0});
  const getBooks = useQuery(['getBooks', {search: form.search, offset: form.offset}], API.getBooks, {
    refetchOnMount: false,
    initialData: {books: [], total: 0, limit: 0},
    onSuccess: () => {
      tableRef.current!.scrollTop();
    }
  });
  const data = getBooks.data!;
  const {register, handleSubmit} = useForm<{ search: string }>({});

  const tableRef = useRef<Table.ContainerMethods>(null);

  const onSubmit = handleSubmit(({search}) => {
    setForm({search, offset: 0});
  });

  const {books, total, limit} = data;

  return (
    <Page title='e-kitap ara' className='flex flex-col'>
      <form className='flex items-center justify-center mx-4 my-2 md:my-3' onSubmit={onSubmit}>
        <Input {...register('search',)} placeholder='...'>
          <FaSearch size={10}/>
        </Input>
        <Button type='submit' loading={getBooks.isFetching} className='ml-2 w-24 h-9'>Ara</Button>
      </form>
      <div className="flex-1 flex flex-col min-h-0 overflow-x-auto">
        <div className='flex items-center'>
          <div className='flex items-center ml-2 text-primary'>
            <AiOutlineBook className='mr-1' size={10}/>
            <div className={`text-[8px] md:text-[10px] transition transition-all duration-1000 overflow-hidden whitespace-nowrap ${stats ? 'max-w-sm' : 'max-w-0'}`}>
              {stats && stats.total.toLocaleString()}
            </div>
          </div>
          <Pagination step={limit} total={total} offset={form.offset} passive={getBooks.isFetching} className='ml-auto' onClickLeft={() => setForm({...form, offset: form.offset - limit})} onClickRight={() => setForm({...form, offset: form.offset + limit})}/>
        </div>
        <Table.Container ref={tableRef} className='flex-1 w-full'>
          <Table.Header>
            <Table.Row className='bg-bgs sticky top-0 z-50 border-b border-bgs'>
              <Table.Head className='min-w-[180px] w-6/12 text-left'>İsim</Table.Head>
              <Table.Head className='w-1/12 text-left'>Boyut</Table.Head>
              <Table.Head className='w-1/12 text-left'>İndekslenme</Table.Head>
              <Table.Head className='w-1/12 text-center'>Virüs Taraması</Table.Head>
              <Table.Head className='w-1/12 text-center'>Tür</Table.Head>
              <Table.Head className='w-2/12 text-left'>Mime Tipi</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              books.map(book => {
                const {id, name, size, createdAt, antivirusStatus, mediaType, mimeType} = book;
                return (
                  (
                    <Table.Row key={id}>
                      <Table.Data className='cursor-pointer text-link select-none' onClick={downloadBook.bind(null, book)}>{name}</Table.Data>
                      <Table.Data className='whitespace-nowrap'>{bytes(size)}</Table.Data>
                      <Table.Data>{new Date(createdAt).toLocaleDateString()}</Table.Data>
                      <Table.Data>{antivirusStatus === 'clean' ? <TiTick className='mx-auto'/> : 'uzak durun'}</Table.Data>
                      <Table.Data className='text-center'>{mediaType}</Table.Data>
                      <Table.Data className='whitespace-nowrap'>{mimeType}</Table.Data>
                    </Table.Row>
                  )
                )
              })
            }
          </Table.Body>
        </Table.Container>
      </div>
    </Page>
  )
}
