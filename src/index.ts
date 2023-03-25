import express from 'express';
import { Mw, Controller, Get } from './decorators';
import Expr from './express';

Expr.addControllers();

const app = express();
app.listen(3000);

async function mw1(req: any, res: any, next: any) {
  console.log('one');
  next();
}

function mw2(req: any, res: any, next: any) {
  console.log('two');
  next();
}

@Controller('/users')
class Cont {
  @Get('/get')
  @Mw(mw1)
  @Mw(mw2)
  async say(req: any, res: any) {
    // throw 'errrrroooorrrr&&&&';
    res.send('these are users');
  }
}

app.controllers('/api', [Cont], { catchAsync: false });
