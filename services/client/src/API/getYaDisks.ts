import axios from 'entities/axios';
import {QueryFunctionContext} from 'react-query';

interface Response {
  ok: boolean;
  payload: {
    total: number;
    limit: number;
    disks: {
      _id: string;
      public_url: string;
      public_key: string;
      name: string;
      created: Date;
      modified: Date;
      owner: string;
      createdAt: Date;
    }[];
  }
}

export async function getYaDisks({queryKey: [, {offset}]}: QueryFunctionContext<['getYaDisks', { offset: number }]>) {
  const res = await axios.get<Response>('/link', {
    params: {offset}
  });
  return res.data.payload;
}
