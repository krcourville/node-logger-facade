import { LoggerFacade, LogLevel, WinstonLoggerFactory } from "./logging";

import { myErrorFormatter } from "./error-formatters";
import { MyError } from "./errors/MyError";

process.env.LOG_LEVEL = LogLevel.DEBUG;

LoggerFacade.configure({
  factory: new WinstonLoggerFactory({
    // prepends myErrorFormatter before other formats
    formats: (formats) => [myErrorFormatter(), ...formats],
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
