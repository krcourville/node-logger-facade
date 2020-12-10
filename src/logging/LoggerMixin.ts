import { LogLevel, LogWriter } from "./Logger";

type GConstructor<T = {}> = new (...args: any[]) => T;

type LoggerMixinable = GConstructor<LogWriter>;

export function LoggerMixin<TBase extends LoggerMixinable>(Base: TBase) {
  return class LoggerMixin extends Base {
    info(message: string, meta: object = {}) {
      this.log({
        level: LogLevel.INFO,
        message,
        ...meta,
      });
    }

    error(error: Error, message: string, meta?: object): void;
    error(message: string, meta?: object): void;
    error(arg1: string | Error, arg2: string | object, arg3?: object) {
      if (arg1 instanceof Error) {
        this.log({
          level: LogLevel.ERROR,
          message: arg2 as string,
          error: arg1,
          ...arg3,
        });
      } else {
        this.log({
          level: LogLevel.ERROR,
          message: arg1,
          ...(arg2 as object),
        });
      }
    }
  };
}
