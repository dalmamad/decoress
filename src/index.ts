// import express from 'express';
// import { Mw, Controller, Get } from './decorators';
// import './express';
//
// const app = express();
// app.listen(3000);
//
// async function mw1(req: any, res: any, next: any) {
//   console.log('one');
//   next();
// }
//
// function mw2(req: any, res: any, next: any) {
//   console.log('two');
//   next();
// }
//
// @Controller('/users')
// class Cont {
//   @Get('/get')
//   @Mw(mw1)
//   @Mw(mw2)
//   async say(req: any, res: any) {
//     throw 'errrrroooorrrr&&&&';
//     res.send('these are users');
//   }
// }
//
// app.controllers('/api', [Cont]);
//
// const catchAsync = (fn: any) => (req: any, res: any, next: any) => {
//   Promise.resolve(fn(req, res, next))
//     .then(() => {
//       console.log('no err');
//     })
//     .catch((err) => {
//       console.log('err: ', err);
//       next(err);
//     });
// };
