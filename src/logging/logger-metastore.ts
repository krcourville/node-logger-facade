const staticMeta = {};

interface Block {
  (): void;
}
interface Metablock {
  meta: object;
  block: Block;
}

const metablocks: Metablock[] = [];

/**
 * Permanently apply meta to all future logging
 * @param meta
 */
export const appendMeta = (meta: object): void => {
  Object.assign(staticMeta, meta);
};

export const getMeta = () => staticMeta;

export const appendMetaInScope = (meta: object, block: Block): void => {
  const metablock = { meta, block };
  metablocks.push(metablock);
  block();
  metablocks.splice(metablocks.indexOf(metablock));
};

export const getScopedMeta = () =>
  metablocks.reduce((acc, next) => {
    return { ...acc, ...next };
  }, {});
