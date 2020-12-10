import { LogEntry, LogWriter, LoggerFactory } from "./Logger";
import { LoggerMixin } from "./LoggerMixin";

class ConsoleLogWriter implements LogWriter {
  constructor(private name: string) {}

  log(entry: LogEntry): void {
    const { level, message, error, ...rest } = entry;
    const line = [
      new Date().toISOString(),
      level,
      this.name,
      message,
      error,
      ...Object.values(rest),
    ].filter((f) => f);
    console.log(...line);
  }
}

const FullConsoleLogger = LoggerMixin(ConsoleLogWriter);

export class ConsoleLoggerFactory implements LoggerFactory {
  get(name: string) {
    return new FullConsoleLogger(name);
  }
}
