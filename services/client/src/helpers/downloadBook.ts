import axios from 'axios';
import {toast} from 'react-toastify';

export async function downloadBook(book: YaDiskBook) {
  toast.success('bekleyin.', {toastId: 'down_book'});
  const { data: {href} } = await axios.get<{ href: string }>(`https://cloud-api.yandex.net:443/v1/disk/public/resources/download`, {
    params: {
      public_key: book.public_key,
      path: book.path
    },
    timeout: 7000
  });
  const link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('rel', 'noreferrer');
  link.setAttribute('href', href);
  link.setAttribute('referrerPolicy', 'no-referrer');
  link.setAttribute('download', book.name);

  if (typeof link.download === 'undefined') {
    link.setAttribute('target', '_blank');
  }

  document.body.appendChild(link);
  link.click();

  setTimeout(function () {
    document.body.removeChild(link);
  }, 200)
}
