import {forever} from 'async';
import {diskCTL, sleep} from 'helpers';
import {Book, Disk} from 'models';

forever(async () => {
  await sleep(1000);
  const yaDisk = (await Disk.findOne({lastCheck: null})) || (await Disk.findOne().sort('lastCheck'));
  if (!yaDisk) return;

  const result = await diskCTL(yaDisk.public_key, 7000);
  if (result.notFound) {
    console.log(`silindi ----> ${yaDisk.public_url}`);
    await Book.updateMany({}, { $pull: { disks: { public_key: yaDisk.public_key} } });
    await Disk.findByIdAndRemove(yaDisk.id);
  } else {
    yaDisk.lastCheck = new Date();
    await yaDisk.save();
  }
}, console.log);
