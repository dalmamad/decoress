import request from 'supertest';
import express, { Express } from 'express';
import { Mw, Get, Controller, setControllers } from '../src/index';

let app: Express;

beforeAll(() => {
  app = express();

  async function mw(req: any, res: any, next: any) {
    req.mw = true;
    next();
  }

  @Controller('/users')
  class Cont {
    @Get('/get')
    @Mw(mw)
    async getUsers(req: any, res: any) {
      console.log(req.mw);
      if (!req.mw) throw new Error('no middleware');
      res.json({ status: 200 });
    }
  }

  setControllers(app, { controllers: [Cont], pathPrefix: '/api' });
});

describe('User controllers', () => {
  test('Get all users', async () => {
    console.log(app);
    const res = await request(app).get('/api/users/get');
    expect(res.body.status).toEqual(200);
  });
});
