import { LoggerFacade } from "./logging";

import { MyError } from "./errors/MyError";
import "./configure-logging";

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
