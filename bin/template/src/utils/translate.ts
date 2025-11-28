import i18n from '@/langs/config';

export const $tt = (mainKey, subKey = ''): string => {
  const fullKey = subKey ? `${mainKey}.${subKey.toLowerCase()}` : mainKey;
  const translite = i18n.global.t(fullKey);
  // ЧТОбы избежать дублежа слов для английского
  if (translite === fullKey && subKey) {
    return subKey;
  }
  return translite;
};

export const transformToClasses = (
  str: string,
  part: Array<string>
): string => {
  const parts = str.split('.');
  if (parts.length < 3) return str;
  parts[0] = part[0];
  parts[1] = part[1];
  return `${parts[0]}-${parts[1]}__th-${parts[2]}`;
};
