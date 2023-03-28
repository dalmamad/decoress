import request from 'supertest';
import express, { Express } from 'express';
import {
  Mw,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  All,
  Head,
  Controller,
  setControllers,
} from '../src/index';

let app: Express;

beforeAll(() => {
  app = express();

  async function mw(req: any, res: any, next: any) {
    req.mw = true;
    next();
  }

  @Controller('/data')
  class Cont {
    @Get('/get')
    @Mw(mw)
    async get(req: any, res: any) {
      if (!req.mw) throw new Error('no middleware');
      res.json({ status: 200 });
    }

    @Post('/post')
    @Mw(mw)
    async post(req: any, res: any) {
      if (!req.mw) throw new Error('no middleware');
      res.json({ status: 200 });
    }

    @Put('/put')
    @Mw(mw)
    async put(req: any, res: any) {
      if (!req.mw) throw new Error('no middleware');
      res.json({ status: 200 });
    }

    @Delete('/delete')
    @Mw(mw)
    async delete(req: any, res: any) {
      if (!req.mw) throw new Error('no middleware');
      res.json({ status: 200 });
    }

    @Patch('/patch')
    @Mw(mw)
    async patch(req: any, res: any) {
      if (!req.mw) throw new Error('no middleware');
      res.json({ status: 200 });
    }

    @All('/all')
    @Mw(mw)
    async all(req: any, res: any) {
      if (!req.mw) throw new Error('no middleware');
      res.json({ status: 200 });
    }

    @Head('/head')
    @Mw(mw)
    async head(req: any, res: any) {
      if (!req.mw) throw new Error('no middleware');
      res.set('status', '200');
      res.send('done');
    }
  }

  setControllers(app, { controllers: [Cont], pathPrefix: '/api' });
});

describe('User controllers', () => {
  test('Get data', async () => {
    const res = await request(app).get('/api/data/get');
    expect(res.body.status).toEqual(200);
  });
  test('Post data', async () => {
    const res = await request(app).post('/api/data/post');
    expect(res.body.status).toEqual(200);
  });
  test('Put data', async () => {
    const res = await request(app).put('/api/data/put');
    expect(res.body.status).toEqual(200);
  });
  test('Delete data', async () => {
    const res = await request(app).delete('/api/data/delete');
    expect(res.body.status).toEqual(200);
  });
  test('Patch data', async () => {
    const res = await request(app).patch('/api/data/patch');
    expect(res.body.status).toEqual(200);
  });
  test('All data', async () => {
    const res = await request(app).get('/api/data/all');
    expect(res.body.status).toEqual(200);
  });
  test('Head data', async () => {
    const res = await request(app).head('/api/data/head');
    expect(res.headers.status).toEqual('200');
  });
});
