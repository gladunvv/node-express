const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = {
  skillsData: function(req, res) {
    try {
      console.log('req :', req.body);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
  uploadData: function(req, res, next) {
      const form = new formidable.IncomingForm()
      const upload = path.join('./public', 'upload')
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        const fileName = path.join(upload, files.photo.name)
        fs.rename(files.photo.path, fileName, err => {
          if (err) {
            console.log(err.message);
            return
          }
          res.redirect('/admin')
        })
        res.json({ fields, files });
      });
  },
  getAdmin: function(req, res) {
    res.render('admin', { title: 'Админ панель' });
  },
};
