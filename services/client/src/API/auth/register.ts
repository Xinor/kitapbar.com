import axios from 'entities/axios';
import {toast} from 'react-toastify';

interface Data {
  email: string;
}
interface Response {
  ok: true;
  message: string;
}

export async function register({email}: Data) {
  const res = await axios.post<Response>('/auth/register', {
    email
  });
  toast.success(res.data.message);
}
