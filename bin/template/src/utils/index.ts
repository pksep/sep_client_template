import { v4 } from 'uuid';
import { useNotificationsStore } from '@/stores/notifications';
import { areDatesEqual } from './date/default-date';
import { sha256 } from 'js-sha256';
import type { ModelUser } from '@pksep/zod-shared';
import type { OptionsObject } from '@pksep/yui';

const showMessage = (
  title: string,
  message: string,
  type = 'i',
  id = v4()
): void => {
  const notificationStore = useNotificationsStore();

  if (message) {
    let messageType: string;
    switch (type) {
      case 'w':
        messageType = 'Предупреждение';
        break;
      case 'e':
        messageType = 'Ошибка';
        break;
      case 's':
        messageType = 'Успешно';
        break;
      case 'i':
      default:
        messageType = 'Уведомление';
        break;
    }

    notificationStore.addUserActionNotified({
      title: title || messageType,
      message,
      type,
      id
    });
  }
};

const checkIsArrayExist = (arr: any[]): boolean =>
  arr.map(el => el?.length).reduce((acc, a) => acc + a, 0) > 0;

const unwrapTitle = (objectItems: ModelUser[]): OptionsObject[] =>
  objectItems.map(item => ({ key: item.login, value: item.login }));

const toPascalCase = (input: string): string => {
  return input
    .split(/[^a-zA-Z0-9]+/)
    .map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return '';
    })
    .join('');
};

const toShortText = (str: string, length = 100) => {
  if (str?.length > length) {
    return str.slice(0, length - 3) + '...';
  }

  return str;
};

const checkNameExistingHandleUtilit = async (
  name: string,
  hashObjet: any,
  checkFunction: any,
  entityId: number
): Promise<boolean> => {
  const hash = sha256(name);

  let entityWithSameNameId;

  if (Object.prototype.hasOwnProperty.call(hashObjet, hash)) {
    entityWithSameNameId = hashObjet[hash];
  } else {
    entityWithSameNameId = Number(await checkFunction());
    hashObjet[hash] = entityWithSameNameId;
  }

  const isDuplicateName =
    (entityId !== entityWithSameNameId || !entityId) && entityWithSameNameId;

  if (isDuplicateName) {
    showMessage('', 'Сущность с данным наименованием уже существует', 'w');
    return false;
  }

  return true;
};

const mergeAttributes = (original: any[], updates: any[]): any[] => {
  const byId = new Map();

  original.forEach(item => {
    if (item?.id !== undefined) byId.set(item.id, item);
  });

  updates.forEach(item => {
    if (item?.id !== undefined)
      byId.set(item.id, { ...byId.get(item.id), ...item });
  });

  return Array.from(byId.values());
};

export {
  showMessage,
  checkIsArrayExist,
  unwrapTitle,
  checkNameExistingHandleUtilit,
  areDatesEqual,
  toPascalCase,
  toShortText,
  mergeAttributes
};
