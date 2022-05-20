import axios from 'entities/axios';
import {QueryFunctionContext} from 'react-query';

type Response = {
  ok: true;
  user: {
    id: string;
    email: string;
  }
} | ErrResponse;

export async function me({}: QueryFunctionContext<['me']>) {
  const token = localStorage.getItem('__token__');
  if (token === null) return;
  try {
    const res = await axios.get<Response>('/user/me', {
      headers: {
        authorization: `Bearer ${token}`
      },
    });
    if (res.data.ok) return res.data.user;
    else return;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
