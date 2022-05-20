import axios, {AxiosResponse} from 'axios';

export class DiskScanner {
  private API_URL = 'https://cloud-api.yandex.net/v1/disk/public/resources';
  private path = '/';
  private offset = 0;
  private limit = 100;
  private timeout = 3000;
  public_url: string;
  constructor(public_url: string) {
    this.public_url = public_url;
  }

  async* [Symbol.asyncIterator](): AsyncIterator<IYaDiskFile> {
    let offset = this.offset;
    let res: AxiosResponse<IYaDiskDir> | undefined = undefined;
    try {
      res = await axios.get(this.API_URL, {
        params: {
          public_key: encodeURI(this.public_url),
          path: this.path,
          limit: this.limit,
          offset
        },
        timeout: this.timeout
      });
    } catch (err){
      return { done: true };
    }

    if (res === undefined) return;

    const total = res.data._embedded.total;

    for (let i = 0; i < res.data._embedded.items.length; i++) {
      const item = res.data._embedded.items[i];
      if (item.type === 'dir') {
        this.path = item.path;
        this.offset = 0;
        for await (const _item of this) {
          yield _item;
        }
      } else if (item.type === 'file') {
        yield item;
      }
    }
    this.path = res.data._embedded.path; // !!
    this.offset = offset; // !!
    if (this.offset + this.limit < total) {
      this.offset = this.offset + this.limit;
      for await (const _item of this) {
        yield _item;
      }
    }
  }
}
