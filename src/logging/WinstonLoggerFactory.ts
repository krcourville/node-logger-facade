import winston from "winston";

import { LogEntry, LogWriter, LoggerFactory, LogLevel } from "./Logger";
import { LoggerMixin } from "./LoggerMixin";

const levelMap = new Map<LogLevel, string>([
  [LogLevel.DEBUG, "debug"],
  [LogLevel.INFO, "info"],
  [LogLevel.WARNING, "warn"],
  [LogLevel.ERROR, "error"],
]);

class WinstonLogWriter implements LogWriter {
  private logger: winston.Logger;
  constructor(private name: string) {
    this.logger = winston.createLogger();
  }

  log(entry: LogEntry): void {
    const { level, message, error, ...rest } = entry;
    const winstonLevel = levelMap.get(level);
    this.logger.log(winstonLevel, message, error, rest);
  }
}

const WinstonLogger = LoggerMixin(WinstonLogWriter);

export class WinstonLoggerFactory implements LoggerFactory {
  get(name: string) {
    return new WinstonLogger(name);
  }
}
