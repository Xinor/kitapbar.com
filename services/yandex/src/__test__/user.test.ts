import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';
import {User} from 'models';
import {BCRYPT} from 'entities';

// rand
const email = 'kitapbar@yandex.com';
const password = 'fffffffff';

describe('/user', () => {
  let token: string;

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    const hash = await BCRYPT.hash(password);
    await User.create({
      email,
      hash
    });
    const response = await request(app).post('/yandex/auth/login').send({email, password});
    token = response.body.payload.token;
  });

  it('me', async () => {
    const response = await request(app).get('/yandex/user/me').set('Authorization', `Bearer ${token}`);
    expect(response.body).toMatchObject({
      ok: true,
      user: {
        email
      }
    });
    expect(mongoose.Types.ObjectId.isValid(response.body.user.id)).toBeTruthy();
  })
})
