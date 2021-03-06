export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export interface LogEntry extends Record<string, any> {
  level: LogLevel;
  message: string;
  error?: Error;
}

export interface LogWriter {
  log(entry: LogEntry): void;
}

export interface Logger extends LogWriter {
  debug(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
  warning(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
  error(error: Error, message: string, meta?: object): void;
}

export interface LoggerFactory {
  get(name: string): Logger;
}
