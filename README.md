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
npm install decoress --save-exact
npm install express
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

## Middlewares

you have two ways to implement middlewares:

1. as shown above you can use `Mw()` decorator. for example you have `validate()` function which you want to use as middleware:

```typescript
  @Get('/get')
  @Mw(validate(schema))
  async get(req: any, res: any) {
    res.send('...data');
  }
```

2. create a wrapper around `Mw()` decorator.
   if you use a middleware repeatedly, for example `validate()`, you may want to use `Validate(schema)` instead of `Mw(validate(schema))`:

```typescript
// in validateMw.ts file
import { Mw } from 'decoress';

// your wrapper
export function Validate(schema) {
  // your middleware
  function fn(req: any, res: any, next: any) {
    // ... do something with schema or whatever
    next();
  }
  // pass yuor middleware to Mw decorator and return it
  return Mw(fn);
}
```

then you can use it as decorator:

```typescript
// in your controller.ts file

import { Get, Controller } from 'decoress';
import { Validate } from './validateMw.ts';
import { schema } from './someFile.ts';

@Controller('/data')
export class UserController {
  @Get('/get')
  @Validate(schema)
  async get(req: any, res: any) {
    res.send('...data');
  }
}
```

## Inspired by

- [routing-controllers](https://github.com/typestack/routing-controllers)
- [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
