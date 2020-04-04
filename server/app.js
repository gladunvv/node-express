const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;


app.set('views', path.join(__dirname, '../source/template/pages'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: true}));
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
