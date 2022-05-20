import axios from 'entities/axios';
import {toast} from 'react-toastify';

interface Data {
  link: string;
}
interface Response {
  ok: true;
  message: string;
}

export async function sendYaDisk({link}: Data) {
  const res = await axios.post<Response>('/link', {
    link
  });
  toast.success(res.data.message);
}
