import axios from 'entities/axios';
import {QueryFunctionContext} from 'react-query';

interface Response {
  ok: true;
  payload: {
    total: number;
    limit: number;
    books: YaDiskBook[];
  }
}

export async function getBooks({queryKey: [, {search, offset}]}: QueryFunctionContext<['getBooks', { search: string, offset: number }]>) {
  const res = await axios.get<Response>('/book/search', {
    params: {search, offset}
  });
  return res.data.payload;
}

