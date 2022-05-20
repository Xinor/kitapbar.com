declare namespace Express {
  export interface Request {
    user: UserPayload
  }
}
interface UserPayload {
  id: string;
  email: string;
}

interface IYaDiskDir {
  public_url: string;
  public_key: string;
  _embedded: {
    sort: string;
    public_key: string;
    items: (IYaDiskSubDir | IYaDiskFile)[] ;
    limit: number;
    offset: number;
    path: string;
    total: number;
  };
  name: string;
  exif: object;
  resource_id: string;
  created: Date;
  modified: Date;
  owner: {
    login: string;
    display_name: string;
    uid: string;
  }
  path: string;
  comment_ids: {
    private_resource: string;
    public_resource: string;
  }
  type: 'dir';
  revision: number;
}
interface IYaDiskSubDir {
  public_key: string;
  name: string;
  exif: object;
  resource_id: string;
  created: Date;
  modified: Date;
  path: string;
  comment_ids: {
    private_resource: string;
    public_resource: string;
  }
  type: 'dir';
  revision: number;
}
interface IYaDiskFile {
  antivirus_status: string;
  public_key: string;
  comment_ids: {
    private_resource: string;
    public_resource: string;
  }
  name: string;
  exif: object;
  created: Date;
  modified: Date;
  size: number;
  resource_id: string;
  mime_type: string;
  file: string;
  media_type: 'audio' | 'backup' | 'book' | 'compressed' | 'data' | 'development' | 'diskimage' | 'document' | 'encoded' | 'executable' | 'flash' | 'font' | 'image' | 'settings' | 'spreadsheet' | 'text' | 'unknown' | 'video' | 'web';
  preview: string;
  path: string;
  sha256: string;
  type: 'file';
  md5: string;
  revision: number;
}
