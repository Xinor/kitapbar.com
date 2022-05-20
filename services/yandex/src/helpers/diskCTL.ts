import axios from "axios";

const API_URL = 'https://cloud-api.yandex.net/v1/disk/public/resources';

interface IDiskCTL {
  yaDiskDir: IYaDiskDir | null;
  timeoutExtended: boolean;
  notFound: boolean;
  unknown: boolean;
}

export const diskCTL = async (public_key: string, timeout: number): Promise<IDiskCTL> => {
  const result = {
    yaDiskDir: null,
    timeoutExtended: false,
    notFound: false,
    unknown: false
  };
  try {
    const res = await axios.get(API_URL, {params: {public_key, limit: 0}, timeout});
    result.yaDiskDir = res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.code === 'ECONNABORTED') {
        result.timeoutExtended = true;
      } else if (err.response?.status === 404) {
        result.notFound = true
      } else {
        result.unknown = true;
      }
    } else {
      result.unknown = true;
    }
  }
  return result;
};
