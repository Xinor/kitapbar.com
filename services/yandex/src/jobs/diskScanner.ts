import {forever} from 'async';
import {Disk, Book} from 'models';
import { DiskScanner } from 'entities';
import {checkDisk, isYaDiskBook, getChecksum} from 'helpers';

forever(async () => {
  const yaDisk = (await Disk.findOne({lastScan: null})) || (await Disk.findOne().sort('lastScan'));
  if (!yaDisk) return;

  yaDisk.lastScan = new Date();
  await yaDisk.save();

  if ((await checkDisk(yaDisk.public_key, 6000)) === null) return;

  const diskScanner = new DiskScanner(yaDisk.public_url);
  for await (const file of diskScanner) {
    console.log(`|| ${file.name} ||`);

    if (!isYaDiskBook(file)) continue;
    let sha256: string;

    try {
      console.log(`|| ${file.name} ||`);
      sha256 = await getChecksum(file.file);
    } catch (err) {
      console.log(err);
      continue;
    }

    const book = (await Book.findOne({sha256})) || new Book({
      mediaType: file.media_type,
      antivirusStatus: file.antivirus_status,
      size: file.size,
      mimeType: file.mime_type,
      fileType: null,
      sha256,
      md5: file.md5,
      disks: []
    });

    if (!Array.isArray(book.disks)) book.disks = [];

    if (!book.disks.find(disk => disk.public_key === yaDisk.public_key && disk.path === file.path)) {
      book.disks.push({ name: file.name, public_key: yaDisk.public_key, path: file.path });
      await book.save();
    }

    // if (book.fileType === null) {
    //   book.fileType = await getBookType(file.file);
    //   await book.save();
    // }
  }
}, console.log);
