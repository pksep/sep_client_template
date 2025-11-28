import { createI18n } from 'vue-i18n';
import en from './en.js';
import ru from './ru.js';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
});

document.documentElement.lang = i18n.global.locale.value;

export default i18n;
