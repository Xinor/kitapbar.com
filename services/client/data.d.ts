interface ErrResponse {
  ok: false;
  error: string;
}

interface YaDiskBook {
  id: string;
  name: string;
  public_key: string;
  path: string;
  mediaType: string;
  antivirusStatus: string;
  size: number;             // File size.
  mimeType: string;
  fileType: string;
  createdAt: Date;          // The date and time when the resource was created, in ISO 8601 format.
}
