import { myErrorFormatter } from "./error-formatters";
import { LoggerFacade, WinstonLoggerFactory } from "./logging";

LoggerFacade.configure({
  factory: new WinstonLoggerFactory({
    // prepends myErrorFormatter before other formats
    formats: (formats) => [myErrorFormatter(), ...formats],
  }),
});
