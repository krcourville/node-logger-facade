const staticMeta = {};

/**
 * Permanently apply meta to all future logging
 * @param meta
 */
export const appendMeta = (meta: object): void => {
  Object.assign(staticMeta, meta);
};

export const getMeta = () => staticMeta;
