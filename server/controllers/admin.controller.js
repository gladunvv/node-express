const formidable = require('formidable');
const path = require('path');
const db = require('../models/db');
const fs = require('fs');

module.exports = {
  skillsData: function (req, res) {
    try {
      let { age, concerts, cities, years } = req.body;
      db.get('skills')
        .find({ id: 'age' })
        .assign({ number: age || 0 })
        .write();

      db.get('skills')
        .find({ id: 'concerts' })
        .assign({ number: concerts || 0 })
        .write();

      db.get('skills')
        .find({ id: 'cities' })
        .assign({ number: cities || 0 })
        .write();

      db.get('skills')
        .find({ id: 'years' })
        .assign({ number: years || 0 })
        .write();

      res.redirect('/admin');
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
  uploadData: function (req, res, next) {
    const form = new formidable.IncomingForm();
    const upload = path.join('./public', 'upload');
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      const fileName = path.join(upload, files.photo.name);
      fs.rename(files.photo.path, fileName, (err) => {
        if (err) {
          console.log(err.message);
          return;
        }
      });
      res.redirect('/admin');
    });
  },
  getAdmin: function (req, res) {
    res.render('admin', { title: 'Админ панель' });
  },
};
