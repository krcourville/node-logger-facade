import { LoggerFacade, WinstonLoggerFactory } from "./logging";

LoggerFacade.configure({
  factory: new WinstonLoggerFactory(),
});

// const logger = LoggerFacade.getLogger(import.meta)

console.log("META", __filename);

export function handler() {
  console.log("hello");
}
