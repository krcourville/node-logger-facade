import { Logger, LoggerFactory, LogLevel } from "./Logger";

export interface LoggerFacadeConfig {
  factory: LoggerFactory;
}

export class LoggerFacade {
  private static config: LoggerFacadeConfig;

  private static meta = {};

  static configure(config: LoggerFacadeConfig) {
    LoggerFacade.config = config;
  }

  static getLogger(name: string): Logger {
    if (!LoggerFacade.config) {
      throw new Error(`LoggerFacade must be configured first`);
    }
    return LoggerFacade.config.factory.get(name);
  }

  static getLogLevel(): LogLevel {
    return process.env.LOG_LEVEL as LogLevel;
  }

  private constructor() {}
}
