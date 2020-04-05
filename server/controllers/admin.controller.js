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
  uploadData: function(req, res) {
    try {
      let form = new formidable.IncomingForm();
      let upload = path.join('./public', 'assets', 'img', 'products');
      if (!fs.existsSync(upload)) {
        fs.mkdirSync(upload);
      }

      form.uploadDir = path.join(process.cwd(), upload);

      form.parse(req, function(err, fields, files) {
        const { name, price } = fields;
        console.log('files :', files);

        const fileName = path.join(upload, files.photo.name);

        fs.rename(files.photo.path, fileName, function(err) {
          if (err) {
            console.error(err.message);
            return;
          }
          let dir = fileName.substr(fileName.indexOf(path.sep));
          storage.addProduct(name, price, dir);
          req.flash('msgfile', 'Товар успешно добавлен');
          res.redirect('/admin');
        });
      });

      console.log('req :', req.body);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
  getAdmin: function(req, res) {
    res.render('admin', { title: 'Админ панель' });
  },
};
