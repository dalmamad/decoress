/* eslint-disable no-unused-vars */
import express from 'express';
import Reflect from './reflects';
import { Data } from './interfaces';

declare global {
  namespace Express {
    export const cont: any;
    interface Application {
      controllers: Function;
    }
  }
}

const catchAsync = (fns: any[]) => {
  fns.forEach((fn, index) => {
    fns[index] = (req: any, res: any, next: any) => {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log('error: ', err);
        next(err);
      });
    };
  });
  return fns;
};

express.application.controllers = function (
  pathPrefix: string,
  controllers: any[]
) {
  controllers.forEach((controller) => {
    const target = controller.prototype;
    const data: Data = Reflect.getTargetData(target);
    data.noName.handlers.forEach((handlerData) => {
      const allPath =
        pathPrefix + handlerData.controllerPath + handlerData.path;
      const middlewares = Reflect.getMiddleWareData(
        target,
        handlerData.propertyKey
      );
      this[handlerData.method](
        allPath,
        catchAsync([...middlewares, handlerData.handler])
      );
    });
  });
};
