const formidable = require('formidable');
const path = require('path');
const db = require('../models/db');
const fs = require('fs');

module.exports.skillsData = (req, res) => {
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
};

module.exports.uploadData = (req, res, next) => {
  const form = new formidable.IncomingForm();
  const upload = path.join('./public', 'upload');
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    }
    const valid = validationUploadData(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      req.flash('msgfile', `${valid.status}`);
      return res.redirect('/admin');
    }

    const { name, price } = fields;
    const fileName = path.join(upload, files.photo.name);
    fs.rename(files.photo.path, fileName, (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
    });
    let src = fileName.substr(fileName.indexOf(path.sep));
    db.get('products').push({ name, price, src }).write();
    req.flash('msgfile', 'Данные успешно загруженны');
    res.redirect('/admin');
  });
};

module.exports.getAdmin = (req, res) => {
  let msgfile = req.flash('msgfile')[0];
  let skills = db.get('skills').value();
  res.render('admin', { title: 'Админ панель', msgfile, skills });
};

const validationUploadData = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true };
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true };
  }
  if (!fields.price) {
    return { status: 'Не указана цена!', err: true };
  }
  return { status: 'Ok', err: false };
};
