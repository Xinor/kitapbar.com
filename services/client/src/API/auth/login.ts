import axios from 'entities/axios';
import {toast} from 'react-toastify';

interface Data {
  email: string;
  password: string;
}

interface Response {
  ok: true;
  message: string;
  payload: {
    token: string;
  }
}

export async function login({email, password}: Data) {
  const res = await axios.post<Response>('/auth/login', {
    email,
    password
  });
  toast.success(res.data.message);
  return res.data.payload.token;
}
