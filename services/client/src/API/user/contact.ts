import axios from 'entities/axios';
import {toast} from 'react-toastify';

interface Data {
  title: string;
  message: string;
}

interface Response {
  ok: true;
  message: string;
}

export async function contact({title, message}: Data) {
  const token = localStorage.getItem('__token__');
  if (token === null) return toast.error('iletişim formunu göndermek için giriş lütfen yapın.', {toastId: 'formautherr'});
  const res = await axios.post<Response>('/user/contact', {
    title,
    message
  }, {
    headers: {
      authorization: `bearer ${localStorage.getItem('__token__')}`
    }
  });
  toast.success(res.data.message);
}
