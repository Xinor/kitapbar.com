import rateLimit from 'express-rate-limit';

export const rateLimiter = (ms: number, max: number) => {
  return rateLimit({
    windowMs: ms,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
    handler: (request, response, next, options) => {
      // @ts-ignore
      const {resetTime} = request.rateLimit as { current: number, resetTime: Date };
      const remaining = Math.ceil((resetTime.getTime() - Date.now()) / (1000 * 60 * 60));
      const message = `işlem limiti aşıldı | kalan süre: ${remaining} saat`;
      response.status(options.statusCode).json({message});
    }
  });
}
