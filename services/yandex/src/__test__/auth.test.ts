import request from 'supertest';
import app from '../server';
import {User, Verification} from 'models';

describe('register an email', () => {

  const email = 'kitapbar@yandex.com';
  let code: string;
  it('must be true', async () => {
    const response = await request(app).post('/yandex/auth/register').send({email});
    expect(response.body).toMatchObject({
      ok: true,
      message: 'aktivasyon kodu gönderildi.'
    });
    const verification = await Verification.findOne({email});
    expect(verification).not.toBeNull();
    code = verification!.code;
    expect(verification).toMatchObject({
      email,
      code: expect.stringMatching(/^\d{6}$/)
    });
  });

  describe('activate an email', () => {
    let password: string;
    it('must be true', async () => {
      const response = await request(app).post('/yandex/auth/activate').send({email, code});
      expect(response.body).toMatchObject({
        ok: true,
        message: 'email aktive edildi.',
        payload: {
          password: expect.stringMatching(/^[\dA-Za-z]+$/)
        }
      });
      password = response.body.payload.password;
      const user = await User.findOne({email});
      expect(user).toMatchObject({
        email
      });
    });

    describe('login', () => {
      it('it must be true', async () => {
        const response = await request(app).post('/yandex/auth/login').send({email, password});
        expect(response.body).toMatchObject({
          ok: true,
          message: 'giriş başarılı'
        });
        expect(typeof response.body.payload.token).toEqual('string');
      });
    });
  })

});
