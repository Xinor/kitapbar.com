import {query, body} from 'express-validator';
import {Router} from 'express';
import {validateRequest} from 'middlewares';
import {checkDisk} from 'helpers';
import {Disk} from 'models';
import {CONSTANTS} from 'config';

const router = Router();

router.get('/',
  query('offset').isInt({allow_leading_zeroes: false, min: 0, max: 3000}).withMessage('sayı lazım..'),
  validateRequest,
  async (req, res) => {

    const offset = Number(req.query.offset);

    const [total, disks] = await Promise.all([
      Disk.count(),
      Disk.find().sort({createdAt: -1}).skip(offset).limit(CONSTANTS.LINK_PER_PAGE)
    ]);

    res.json({
      ok: true,
      payload: {
        total,
        disks,
        limit: CONSTANTS.LINK_PER_PAGE
      }
    });
  });

router.post('/',
  body('link').trim()
    .isURL().withMessage('Geçersiz yandexdisk linki. Arama yapıyorsanız lütfen anasayfadan yapın.')
    .matches(/^https?:\/\/(?:yadi\.sk|disk\.yandex(?:\.ru|\.com(?:\.tr)?))\/[di]\/[_\-A-Za-z\d]{5,200}$/).withMessage('Geçersiz yandexdisk linki.'),
  validateRequest,
  async (req, res) => {

    const link = req.body.link as string;

    const linkDisk = await checkDisk(encodeURI(link));
    if (linkDisk === null) {
      return res.json({ok: false, error: 'link uçmuş'});
    }
    const {public_key, public_url, name, created, modified, _embedded, owner: {display_name}, type} = linkDisk;

    if (type !== 'dir')
      return res.json({ok: false, error: 'lütfen kitabı bir klasöre kopyalayıp klasörü paylaşın'});

    if (_embedded.total === 0)
      return res.json({ok: false, error: 'lütfen boş klasör paylaşmayın'});

    if (await Disk.findOne({public_key}))
      return res.json({ok: false, error: 'link zaten var. üzgünüm..'});

    await Disk.create({
      public_url,
      public_key,
      name,
      created,
      modified,
      owner: display_name
    });
    res.json({ok: true, message: 'Link kaydedildi! Taranıcak..'});
  });

export default router;
