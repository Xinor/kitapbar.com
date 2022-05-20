import axios from 'axios';

const API_URL = 'https://cloud-api.yandex.net/v1/disk/public/resources';

export const checkDisk = async (public_key: string, timeout = 0): Promise<IYaDiskDir | null> => {
  try {
    const res = await axios.get<IYaDiskDir>(API_URL, { params: { public_key, limit: 0 }, timeout});
    return res.data;
  } catch (err) {
    return null;
  }
}
