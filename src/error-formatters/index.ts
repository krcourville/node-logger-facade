import { MyError } from "../errors/MyError";
import { format } from "winston";
import { LoggerFacade, LogLevel } from "../logging";

/**
 * Custom formatter for MyError
 *
 * NOTE: isFlawed is only logged for DEBUG log level
 */
export const myError = format((entry) => {
  const { error } = entry;
  if (error instanceof MyError) {
    const { message, stack, name, isFlawed } = error;
    const errorMeta: any = {
      message,
      stack,
      name,
    };
    if (LoggerFacade.getLogLevel() === LogLevel.DEBUG) {
      errorMeta.isFlawed = isFlawed;
    }

    entry.error = errorMeta;
  }

  return entry;
});
