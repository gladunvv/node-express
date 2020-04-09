const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes');
const flash = require('express-flash');
const config = require('config');

const app = express();

const PORT = config.get('port') || 5000;

app.set('views', path.join(__dirname, '../source/template/pages'));
app.set('view engine', 'pug');

app.use(
  session({
    secret: 'loftschool',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 6000 * 100,
    },
    saveUninitialized: false,
    resave: false,
  }),
);
app.use(flash());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log(`Server Error: ${e.message}`);
    process.exit(1);
  }
}

start();
