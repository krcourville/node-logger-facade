import { format, transports, createLogger, Logger } from "winston";

import { LogEntry, LogWriter, LoggerFactory, LogLevel } from "./Logger";
import { LoggerMixin } from "./LoggerMixin";

const { combine, json } = format;

const levelMap = new Map<LogLevel, string>([
  [LogLevel.DEBUG, "debug"],
  [LogLevel.INFO, "info"],
  [LogLevel.WARNING, "warn"],
  [LogLevel.ERROR, "error"],
]);

/**
 * Basic error formatter
 */
const formatError = format((entry) => {
  const error = entry?.error as Error;
  if (error) {
    entry.error = {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  }
  return entry;
});

class WinstonLogWriter implements LogWriter {
  private logger: Logger;
  constructor(private name: string) {
    this.logger = createLogger({
      format: combine(formatError(), json()),
      defaultMeta: {
        name,
      },
      transports: [new transports.Console({ stderrLevels: ["error"] })],
    });
  }

  log(entry: LogEntry): void {
    const { level, message, meta, error } = entry;
    const winstonLevel = levelMap.get(level);
    this.logger.log(winstonLevel, message, {
      error,
      ...meta,
    });
  }
}

const WinstonLogger = LoggerMixin(WinstonLogWriter);

export class WinstonLoggerFactory implements LoggerFactory {
  get(name: string) {
    return new WinstonLogger(name);
  }
}
