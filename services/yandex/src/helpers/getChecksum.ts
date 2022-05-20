import crypto from 'crypto';
import got from 'got';
import {bytes} from 'helpers';

export function getChecksum(url: string) {
  return new Promise<string>(function (resolve, reject) {
    const hash = crypto.createHash('sha256');
    const downloadStream = got.stream(url, {http2: true, retry: {limit: 0}});
    downloadStream
      .on("downloadProgress", ({ transferred, total, percent }) => {
        const percentage = Math.round(percent * 100);
        console.error(`progress: ${transferred}/${total} (${percentage}%) ${bytes(total)}`);
      })
      .on("error", (error) => {
        console.error(`Download failed: ${error.message}`);
      })
    downloadStream.on('error', reject);
    downloadStream.pipe(hash);
    hash.once('finish', () => {
      resolve(hash.read().toString('hex'));
    })
  });
}
