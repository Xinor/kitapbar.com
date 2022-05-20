import got from 'got';
import {fromStream} from 'file-type';

export async function getBookType(url: string) {
  try {
    const stream = got.stream(url, {http2: true, retry: {limit: 0}});
    const result = await fromStream(stream);
    if (result === undefined) return 'unknown';
    switch (result.ext) {
      case 'epub':
      case 'mobi':
      case 'pdf':
      case 'docx':
      case 'rtf':
        return result.ext;
      default:
        return 'unknown';
    }
  } catch (err) {
    return 'unknown';
  }
}
