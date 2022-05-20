import {Router} from 'express';
import {body} from 'express-validator';
import {validateRequest, rateLimiter} from 'middlewares';
import { JWT, MAILER } from 'entities';
import {User, ContactForm} from 'models';

const router = Router();

router.use(JWT.middleware);

router.get('/me', async (req, res) => {

  const user = await User.findById(req.user.id);
  if (user === null)
    return res.json({ok: false, error: 'böyle bir kullanıcı yok'});

  return res.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email
    }
  });
});

router.post('/contact',
  rateLimiter(1000 * 60 * 60 * 24, 3),
  body('title').trim().isLength({min: 5, max: 200}).escape().withMessage('başlık 5 ile 200 karakter arasında olmalı'),
  body('message').trim().isLength({min: 10, max: 3000}).escape().withMessage('mesaj 10 ile 3000 karakter arasında olmalı'),
  validateRequest,
  async (req, res) => {

    const user = await User.findById(req.user.id);
    if (user === null) return res.json({ok: false, error: 'böyle bir kullanıcı yok'});

    const {title, message} = req.body;

    try {
      await ContactForm.create({ userId: user.id, email: user.email, title, message });
      res.json({ok: true, message: 'iletişim formu başarıyla gönderildi'});
    } catch (e) {
      res.json({ok: false, error: 'bir sorun yaşandı. lütfen daha sonra tekrar deneyin'});
    }

    try {
      await MAILER.sendContactForm(user.email, title, message);
    } catch (e) {
      console.log(e);
    }

  });

export default router;
