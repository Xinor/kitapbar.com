import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import authRouter from 'routes/auth';
import userRouter from 'routes/user';
import linkRouter from 'routes/link';
import bookRouter from 'routes/book';

const app = express();
app.set('trust proxy', true);
app.set('PORT', process.env.HTTP_PORT);
app.disable('x-powered-by');
app.use(express.json());
app.use(cors({
  exposedHeaders: ['ratelimit-reset', 'Content-Disposition']
}));
app.use(mongoSanitize());

// routes
app.use('/yandex/auth', authRouter);
app.use('/yandex/user', userRouter);
app.use('/yandex/link', linkRouter);
app.use('/yandex/book', bookRouter);

// health check
app.get('/yandex/ping', (req: Request, res: Response) => {
  res.sendStatus(204);
});

// error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    return res.json({ok: false, error: 'lütfen giriş yapın.'});
  }
  res.json({ok: false, error: 'bi şeyler yanlış gitti'});
});

export default app;
