import {randomInt} from 'crypto';
import {Router} from 'express';
import {body} from 'express-validator';
import {validateRequest, rateLimiter} from 'middlewares';
import {BCRYPT, JWT, MAILER} from 'entities';
import {genPass} from 'helpers';
import {User, Verification} from 'models';

const router = Router();

router.use(
  rateLimiter(1000 * 60 * 60 * 24, 20),
  body('email')
    .isEmail({domain_specific_validation: true}).withMessage('lütfen geçerli bir email adresi girin')
    .matches(/.*@(?:yandex|gmail|icloud|hotmail|outlook|yahoo|aol|live|tutanota|protonmain)\..*/).withMessage('geçersiz sağlayıcı'),
  validateRequest
);

router.post('/register',
  async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({email});
    if (user !== null)
      return res.json({ok: false, error: 'e-posta kullanımda.'});

    const code = randomInt(100000, 999999);

    try {
      if (process.env.NODE_ENV !== 'test') await MAILER.sendCode(email, code);
      await Verification.create({email, code});
      res.json({ok: true, message: 'aktivasyon kodu gönderildi.'});
    } catch (err) {
      console.log(err);
      res.json({ok: false, error: 'bir sorun yaşandı. lütfen daha sonra tekrar deneyin.'});
    }
  });

router.post('/activate',
  body('code').isInt({allow_leading_zeroes: false, min: 100000, max: 999999}).withMessage('geçersiz kod'),
  validateRequest,
  async (req, res) => {

    const {email, code} = req.body;

    if (await User.findOne({email}) !== null)
      return res.json({ok: false, error: 'bu e-posta zaten aktive edildi'});

    const verification = await Verification.findOne({email}).sort('-createdAt');

    if (verification === null)
      return res.json({ok: false, error: 'bu e-posta bir aktivasyon kodu tanımlanmadı.'});
    else if (code !== verification.code)
      return res.json({ok: false, error: 'lütfen gönderilen son aktivasyon kodunu giriniz.'});

    const password = genPass();

    const hash = await BCRYPT.hash(password);

    try {
      await User.create({
        email,
        hash
      });
      res.json({ok: true, message: 'email aktive edildi.', payload: {password}});
    } catch (err) {
      return res.json({ok: false, error: 'hata'});
    }
  });

router.post('/login',
  body('password')
    .isLength({min: 6, max: 40}).withMessage('şifre 6 ile 40 karakter arasında olmalı')
    .matches(/^[\dA-Za-z]+$/).withMessage('geçersiz parola'),
  validateRequest,
  async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user === null)
      return res.json({ok: false, error: 'bu e-posta adresine kayıtlı bir kullanıcı yok.'});

    const result = await BCRYPT.compare(password, user.hash);

    if (result) {
      const token = await JWT.sign({id: user.id});
      res.json({ok: true, message: 'giriş başarılı', payload: {token}});
    } else {
      return res.json({ok: false, error: 'e-posta veya şifre yanlış'});
    }
  })

export default router;
