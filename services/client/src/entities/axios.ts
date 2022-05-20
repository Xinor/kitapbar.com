import Axios from 'axios';
import {toast} from 'react-toastify';

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_URL
});

axios.interceptors.request.use(function (config) {
  // before request is sent
  return config;
}, function (error) {
  // request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if (response.data.ok === false) {
    toast.warn(response.data.error, {toastId: 'op_fail'});
    throw new Error(response.data.error);
  }
  // response data
  return response;
}, function (error) {
  if (Axios.isAxiosError(error)) {
    if (error.response?.status === 429 && error.response.headers['ratelimit-reset']) {
      // @ts-ignore
      toast.error(error.response?.data.message, {autoClose: 4000, toastId: 'rate-limit'});
    } else if (error.response?.status === 503) {
      toast.error('sakin. 🍉', {autoClose: 2000, toastId: '429'});
    } else if (error.response?.status === 511) {
      toast.error('site kapandı 🍉. bu nedenle işleminiz gerçekleştirilemiyor.', {autoClose: 2000, toastId: '511'});
    }
  }
  return Promise.reject(error);
});

export default axios;
