const
  path = require('path'),
  PORT = process.env.PORT || 7100,
  express = require('express'),
  Application = express();

const i18n = require('i18n');

i18n.configure({
  api: {
    __: 'translate'
  },
  defaultLocale: 'en-US',
  directory: './locales',
  locales: ['en-US', 'en', 'cs', 'ja'],
  queryParameter: 'lang'
});

Application.use(express.json());
Application.set('view engine', 'ejs');
Application.use(express.static(path.resolve(__dirname + '/public')));
Application.use((req, res, next) => {
  i18n.init(req, res);
  next();
});

Application.get('/interLoc', (req, res, next) => {
  // console.log(req.query); // Verify The Lang Code
  //let browserAcceptedLocales = req.header('Accept-Language');
  //res.status(200).json({browserAcceptedLocales, success: true});
  const
    rawDate = new Date(),
    time = rawDate.getHours(),
    timeOfDay = time < 12 ? 'morning' : (time > 12 && time < 17) ? 'afternoon' : 'evening';
  res.status(200).render('index.ejs', { timeOfDay });
});

Application.listen(PORT, () => console.log(`InterLoc Server Started and Running On Port: ${PORT}`));