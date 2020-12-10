import { format } from "winston";
import { getMeta } from "../logger-metastore";

/**
 * A formatter that applies addtional meta
 * to all future logging
 */
export const staticMetaFormatter = format((entry) => {
  return {
    ...entry,
    ...getMeta(),
  };
});
