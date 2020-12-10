import { LoggerFacade, LogLevel, WinstonLoggerFactory } from "./logging";

import * as ErrorFormats from "./error-formatters";
import { MyError } from "./errors/MyError";

process.env.LOG_LEVEL = LogLevel.DEBUG;

LoggerFacade.configure({
  factory: new WinstonLoggerFactory({
    formats: (formats) => [ErrorFormats.myError(), ...formats],
  }),
});

const logger = LoggerFacade.getLogger("root");

export function handler() {
  logger.debug("Starting handler()");
  logger.info("Strictly informational", {
    meta1: true,
  });
  logger.warning("This is a warning");
  logger.error(new Error("basic error"), "it broke");
  logger.error(new MyError("my error", true), "it broke again");
}
