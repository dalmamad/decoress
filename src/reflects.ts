import { HandlerData } from './interfaces';

const namelessProperty = 'noName';
const handlersKey = 'handlers';
const middlewaresKey = 'middlewares';

export default class Reflect {
  private static allData: Map<any, any> = new Map();

  public static getTargetData(target: any) {
    return this.allData.get(target);
  }

  public static addControllerData(controllerPath: string, target: any) {
    const handlersData: HandlerData[] = this.getData(handlersKey, target);
    handlersData.forEach((handlerData: HandlerData) => {
      handlerData.controllerPath = controllerPath;
    });
  }

  public static addHandlerData(newHandlerData: any, target: any) {
    if (!this.getData(handlersKey, target))
      this.setData(handlersKey, [], target);
    const handlersData: HandlerData[] = this.getData(handlersKey, target);
    handlersData.push(newHandlerData);
  }

  public static addMiddleWareData(
    newMiddlewareData: Function,
    target: any,
    propertyKey: string
  ) {
    if (!this.getData(middlewaresKey, target, propertyKey))
      this.setData(middlewaresKey, [], target, propertyKey);
    const middlewaresData = this.getData(middlewaresKey, target, propertyKey);
    middlewaresData.unshift(newMiddlewareData);
  }

  public static getMiddleWareData(target: any, propertyKey: string) {
    return this.getData(middlewaresKey, target, propertyKey);
  }

  public static setData(
    dataKey: string,
    data: any,
    target: any,
    propertyKey?: string
  ) {
    if (!propertyKey) propertyKey = namelessProperty;
    if (!this.allData.get(target)) this.allData.set(target, {});
    const targetValue = this.allData.get(target);
    if (!targetValue[propertyKey]) targetValue[propertyKey] = {};
    const propertyValue = targetValue[propertyKey];
    propertyValue[dataKey] = data;
    return this.allData;
  }

  public static getData(key: string, target: any, propertyKey?: string) {
    if (!propertyKey) propertyKey = namelessProperty;
    const targetData = this.allData.get(target);
    return targetData?.[propertyKey]?.[key];
  }
}
