const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);

db.defaults({
  products: [],
  user: {},
  skills: [
    {
      id: 'age',
      number: 0,
      text: 'Возраст начала занятий на скрипке',
    },
    {
      id: 'concerts',
      number: 0,
      text: 'Концертов отыграл',
    },
    {
      id: 'cities',
      number: 0,
      text: 'Максимальное число городов в туре',
    },
    {
      id: 'years',
      number: 0,
      text: 'Лет на сцене в качестве скрипача',
    },
  ],
}).write();

module.exports = db;
