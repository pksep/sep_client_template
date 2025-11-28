import { sha256 } from 'js-sha256';

/**
 * Функция для кэширования ответа на один и тот же запрос с одними и теме же данными
 * @param calle
 * @returns
 *
 * @example
 * ```ts
 *  const hashedGetUnicUserTabel = cacheedDecorator(userStore.getUnicUserTabel);
 *
 *  await hashedGetUnicUserTabel({
 *     tabel: user.value.tabel
 *   }); // fetch data
 *
 *  await hashedGetUnicUserTabel({
 *     tabel: user.value.tabel
 *   }); // cache data
 *
 * ```
 */
const cacheedDecorator = <T extends (...args: any) => Promise<any>>(
  calle: T
): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) => {
  const hashedValue: Map<string, Awaited<ReturnType<T>>> = new Map();

  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const hash = sha256(JSON.stringify(args));

    if (hashedValue.get(hash)) {
      return hashedValue.get(hash);
    }

    hashedValue.set(hash, await calle(...args));

    return hashedValue.get(hash);
  };
};

export default cacheedDecorator;
