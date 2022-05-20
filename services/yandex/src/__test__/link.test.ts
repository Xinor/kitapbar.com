import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';
import {CONSTANTS} from 'config';

const healthyLink = 'https://disk.yandex.com.tr/d/RM_e3YsdTi6wLA';
const brokenLink = 'https://disk.yandex.com.tr/d/0vFAYeOAnx9Kvw';

jest.setTimeout(1000 * 10);

describe('/link', () => {
  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  describe('GET /link', () => {
    it('without offset', async () => {
      const response = await request(app).get('/yandex/link').query({});
      expect(response.body).toMatchObject({
        ok: false,
        error: 'sayı lazım..'
      })
    });

    it('numeric offset', async () => {
      await request(app).post('/yandex/link').send({ link: healthyLink });

      const response = await request(app).get('/yandex/link').query({ offset: 0 });
      expect(response.body).toMatchObject({
        ok: true,
        payload: {
          total: 1,
          limit: CONSTANTS.LINK_PER_PAGE,
          disks: expect.any(Array)
        }
      })
    });
  });

  describe('POST /yandex/link', () => {
    it('without yandexlink', async () => {
      const response = await request(app).post('/yandex/link').send({});
      expect(response.body).toMatchObject({
        ok: false,
        error: 'Geçersiz yandexdisk linki. Arama yapıyorsanız lütfen anasayfadan yapın.'
      })
    });

    it('broken yandex disk link', async () => {
      const response = await request(app).post('/yandex/link').send({ link: brokenLink });
      expect(response.body).toMatchObject({
        ok: false,
        error: 'link uçmuş'
      })
    });

    it('valid, healthy and "unstored" yandex link', async () => {
      const response = await request(app).post('/yandex/link').send({ link: healthyLink });
      expect(response.body).toMatchObject({
        ok: true,
        message: 'Link kaydedildi! Taranıcak..'
      })
    });

    it('valid, healthy and "stored" yandex link', async () => {
      await request(app).post('/yandex/link').send({ link: healthyLink });

      const response = await request(app).post('/yandex/link').send({ link: healthyLink });
      expect(response.body).toMatchObject({
        ok: false,
        error: 'link zaten var. üzgünüm..'
      });
    });
  });
});




