import { format, transports, createLogger, Logger } from "winston";
import { Format } from "logform";

import { LogEntry, LogWriter, LoggerFactory, LogLevel } from "../Logger";
import { LoggerMixin } from "../LoggerMixin";
import { staticMetaFormatter } from "./static-meta-formatter";
import { scopedMetaFormatter } from "./scoped-meta-formatter";

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
  const error = entry?.error;
  if (error instanceof Error) {
    entry.error = {
      message: error.message,
      stack: error.stack,
      name: error.name,
    };
  }
  return entry;
});

export const defaultFormatters = [
  staticMetaFormatter(),
  scopedMetaFormatter(),
  formatError(),
  json(),
];

class WinstonLogWriter implements LogWriter {
  private logger: Logger;
  constructor(private name: string, options?: WinstonLoggerFactoryOptions) {
    const level = process.env?.LOG_LEVEL?.toLowerCase() || "info";
    let formats = defaultFormatters.slice();
    if (options?.formats) {
      formats = options.formats(formats);
    }
    this.logger = createLogger({
      format: combine(...formats),
      defaultMeta: {
        name,
      },
      transports: [new transports.Console({ level, stderrLevels: ["error"] })],
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

export interface WinstonLoggerFactoryOptions {
  /**
   * If specified, modify the default formats.
   */
  formats?: (formats: Format[]) => Format[];
}

export class WinstonLoggerFactory implements LoggerFactory {
  constructor(private options?: WinstonLoggerFactoryOptions) {}

  get(name: string) {
    return new WinstonLogger(name, this.options);
  }
}
