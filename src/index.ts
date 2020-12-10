import { LoggerFacade, appendMeta, appendMetaInScope } from "./logging";

import { MyError } from "./errors/MyError";
import "./configure-logging";

const logger = LoggerFacade.getLogger("root");

export function handler(requestId: string) {
  appendMeta({ requestId });

  logger.debug("Starting handler()");
  logger.info("Strictly informational", {
    meta1: true,
  });
  logger.warning("This is a warning");
  logger.error(new Error("basic error"), "it broke");
  logger.error(new MyError("my error", true), "it broke again");

  appendMetaInScope({ scopedMeta: "this is scoped" }, () => {
    logger.info("you should see scopedMeta here...");
  });

  logger.info("you should NOT see scopedMeta here...");
}
