import { format } from "winston";
import { getScopedMeta } from "../logger-metastore";

/**
 * A formatter that applies addtional meta
 * with the current logging scope
 */
export const scopedMetaFormatter = format((entry) => {
  return {
    ...entry,
    ...getScopedMeta(),
  };
});
