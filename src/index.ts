import { LoggerFacade, WinstonLoggerFactory } from "./logging";

LoggerFacade.configure({
  factory: new WinstonLoggerFactory(),
});

const logger = LoggerFacade.getLogger("root");

export function handler() {
  logger.debug("Starting handler()");
  logger.info("Strictly informational", {
    meta1: true,
  });
  logger.warning("This is a warning");
  logger.error(new Error("basic error"), "it broke");
}
