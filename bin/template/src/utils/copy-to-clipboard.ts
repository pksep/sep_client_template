import i18n from '@/langs/config';
import { showMessage } from '@/utils';

/**
 * Функция копирования текста в буфер обмена
 * @param {string} value Значение для копирования
 * @param {string} element Название копируемого элемента
 * @param {strign} message Сообщения копируемого элемента
 *
 * @example
 * ```ts
 * copyToClipboard('Копируемый текст', 'Наименование', 'было скопировано')
 * ```
 */
export const copyToClipboard = async (
  value: string,
  element?: string,
  message?: string
): Promise<void> => {
  const t = i18n.global.t;

  try {
    // Назначаем текст для сообщения
    // Если не передан, то используем текст по умолчанию
    const item = element || t('functions.copyToClipboard.element');
    const msg = message || t('functions.copyToClipboard.message');

    if (navigator.clipboard) {
      // копируем текст в буфер обмена
      await navigator.clipboard.writeText(value);
    } else {
      const innerText = value;

      // Создаём временный элемент для копирования
      const tempElement = document.createElement('textarea');
      tempElement.value = innerText;

      // Получаем все открытые диалоги
      const openDialogs = document.querySelectorAll('dialog[open]');

      // Получаем последний открытый диалог (если есть)
      const lastOpenedDialog = openDialogs.length
        ? openDialogs[openDialogs.length - 1]
        : null;

      if (lastOpenedDialog) {
        lastOpenedDialog.append(tempElement); // Добавляем tempElement в последний открытый диалог
      } else {
        document.body.append(tempElement); // Добавляем в <body>, если диалогов нет
      }

      // Выделяем текст во временном элементе
      tempElement.select();
      tempElement.setSelectionRange(0, 99999); // Для мобильных устройств

      // Копируем текст в буфер обмена
      document.execCommand('copy');

      // Удаляем временный элемент
      tempElement.remove();
    }

    showMessage('', `${item} ${msg}`, 'i');
  } catch {
    showMessage('', t('functions.copyToClipboard.error'), 'e');
  }
};
