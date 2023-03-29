# Decoress

A minimal package for creating express controllers using decorators in typescript.
you can use your express as before. this package tends to be lightweight and only add decorators to your controllers.

## Features

- very minimal and lightweight
- handling asynchronous functions
- makes your code cleaner

## Installation

1. install `express` and `decoress`:

```bash
npm install decoress express
```

2. in `tsconfig.json` set these options:

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Usage

1. first you need to import `Controller` and a method (for example `Get`) and add them to your class.
   you can also add your `middlewares` using `Mw` decorator.

   for example create `Data.controller.ts` file and add these code:

```typescript
import { Mw, Get, Post, Controller } from 'decoress';

function aMiddleware(req: any, res: any, next: any) {
  next();
}

@Controller('/data')
export class UserController {
  @Get('/get')
  @Mw(aMiddleware)
  async get(req: any, res: any) {
    res.send('...data');
  }

  @Post('/post')
  async post(req: any, res: any) {
    res.send('...data');
  }
}
```

2. then you need to pass your `controllers` to `setControllers`

for example create `app.ts` file and add these to it:

```typescript
import express from 'express';
import { setControllers } from 'decoress';
import { UserController } from './data.controller';

const app = express();

app.listen(3000);

setControllers(app, { controllers: [UserController] });
```

now if you open `http://localhost:3000/data/get` in your browser you should see the response.

## Settings

### pathPrefix

you can set `pathPrefix` in `setControllers`

```typescript
setControllers(app, { controllers: [UserController], pathPrefix: '/api' });
```

now you should see the response if you open `http://localhost:300/api/data/get` in your browser.

### options

- catchAsync

  by default `decoress` handles async functions in express and catch the error and send it to errorHandler with `next()` function.

  but you can **disable** it in `setControllers`:

```typescript
setControllers(app, {
  controllers: [UserController],
  options: { catchAsync: false },
});
```

## Inspired by

- [routing-controllers](https://github.com/typestack/routing-controllers)
- [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
