const i18n = require('i18n');

i18n.configure({
  api: {
    __: 'translate'
  },
  defaultLocale: 'en-US',
  directory: '../locales',
  locales: ['en-US', 'en', 'cs', 'ja'],
  queryParameter: 'lang'
});

module.exports.useI18N = (req, res, next) => {
  i18n.init(req, res);
  next();
};