import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: { translation: { menu: { categories: 'Kategoriler', articles: 'Makaleler', team: 'Ekip Üyeleri', contacts: 'İletişim Kayıtları' } } },
  en: { translation: { menu: { categories: 'Categories', articles: 'Articles', team: 'Team Members', contacts: 'Contacts' } } },
  ru: { translation: { menu: { categories: 'Категории', articles: 'Статьи', team: 'Члены команды', contacts: 'Контакты' } } },
  ar: { translation: { menu: { categories: 'الفئات', articles: 'المقالات', team: 'أعضاء الفريق', contacts: 'جهات الاتصال' } } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'tr',
  fallbackLng: 'tr',
  interpolation: { escapeValue: false },
});

export default i18n;
