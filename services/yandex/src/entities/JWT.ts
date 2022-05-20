import jwt from 'jsonwebtoken';
import { expressjwt as jwtM } from 'express-jwt';

const JWT_PRIVATE_KEY = process.env.JWT_KEY as string;

export function sign(payload: any) {
  return new Promise((res, rej) => {
    jwt.sign(payload, JWT_PRIVATE_KEY, {algorithm: 'HS256'}, (err, token) => {
      if (err) rej(err);
      res(token);
    });
  });
}

export function verify(token: string) {
  return new Promise((res, rej) => {
    jwt.verify(token, JWT_PRIVATE_KEY, function (err, decoded) {
      if (err) rej(err);
      res(decoded);
    });
  })
}

export const middleware = jwtM({
  secret: JWT_PRIVATE_KEY,
  algorithms: ['HS256'],
  requestProperty: 'user',
  credentialsRequired: true
});
