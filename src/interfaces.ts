export type Methods =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head'
  | 'all';

export interface HandlerData {
  path: string;
  controllerPath?: string;
  method: Methods;
  propertyKey: string;
  handler: any;
}

export interface Data {
  [key: string]:
    | {
        middlewares: Function[];
      }
    | {
        handlers: HandlerData[];
      };
  noName: {
    handlers: HandlerData[];
  };
}

export interface Options {
  catchAsync?: boolean;
}

export interface Ctrls {
  controllers: any[];
  pathPrefix?: string;
  options?: Options;
}
