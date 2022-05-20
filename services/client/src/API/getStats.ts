import axios from 'entities/axios';
import {QueryFunctionContext} from 'react-query';

type Response = {
  ok: true;
  payload: {
    total: number;
  }
} | ErrResponse;

export async function getStats({}: QueryFunctionContext<['getStats']>) {
  const res = await axios.get<Response>('/book/stats');
  if (res.data.ok) return res.data.payload;
}
