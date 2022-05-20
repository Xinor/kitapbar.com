import axios from 'entities/axios';
import {toast} from 'react-toastify';

interface Data {
  email: string;
  code: string;
}

interface Response {
  ok: true;
  message: string;
  payload: {
    password: string;
  }
}

export async function activate({email, code}: Data) {
  const res = await axios.post<Response>('/auth/activate', {
    email,
    code
  });
  toast.success(res.data.message);
  return res.data.payload.password;
}
