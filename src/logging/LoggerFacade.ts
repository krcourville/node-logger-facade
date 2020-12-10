import { Logger, LoggerFactory } from "./Logger";

export interface LoggerFacadeConfig {
  factory: LoggerFactory;
}

export class LoggerFacade {
  private static config: LoggerFacadeConfig;

  static configure(config: LoggerFacadeConfig) {
    LoggerFacade.config = config;
  }

  static get(name: string): Logger {
    if (!LoggerFacade.config) {
      throw new Error(`LoggerFacade must be configured first`);
    }
    return LoggerFacade.config.factory.get(name);
  }

  private constructor(name: string) {}
}
