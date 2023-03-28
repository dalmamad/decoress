/* eslint-disable no-unused-vars */
import Reflect from './reflects';
import { Data, Options, Ctrls } from './interfaces';

class DecoRoute {
  private static options: Options = {
    catchAsync: true,
  };

  private static catchAsync(fns: any[]) {
    if (this.options.catchAsync)
      fns.forEach((fn, index) => {
        fns[index] = (req: any, res: any, next: any) => {
          Promise.resolve(fn(req, res, next)).catch((err) => {
            next(err);
          });
        };
      });
    return fns;
  }

  private static handleOptions(options: Options): void {
    const optionKeys = Object.keys(options) as [keyof Options];
    optionKeys.forEach((option: keyof Options) => {
      this.options[option] = options[option];
    });
  }

  static setControllers(
    app: any,
    { pathPrefix, controllers, options }: Ctrls
  ): void {
    if (options) DecoRoute.handleOptions(options);

    controllers.forEach((controller) => {
      const target = controller.prototype;
      const data: Data = Reflect.getTargetData(target);
      data.noName.handlers.forEach((handlerData) => {
        const allPath = pathPrefix
          ? pathPrefix + handlerData.controllerPath + handlerData.path
          : handlerData.controllerPath + handlerData.path;
        const middlewares = Reflect.getMiddleWareData(
          target,
          handlerData.propertyKey
        );
        app[handlerData.method](
          allPath,
          DecoRoute.catchAsync([...middlewares, handlerData.handler])
        );
      });
    });
  }
}

export const { setControllers } = DecoRoute;
