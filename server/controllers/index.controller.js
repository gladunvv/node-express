const db = require('../models/db');
const config = require('config')
const nodemailer = require('nodemailer')


module.exports.sendMessage = (req, res) => {
  try {
    let { name, email, message } = req.body;
    if (!name || !email || !message) {
      req.flash('msgemail', 'Все поля нужно заполнить!');
      res.redirect('/')
      // return res.json({ msg: 'Все поля нужно заполнить!', status: 'Error' });
    }
    db.get('messages').push(req.body).write();
    const mailConfig = config.get('mail')
    const transporter = nodemailer.createTransport(mailConfig.smtp);
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: mailConfig.smtp.auth.user,
      subject: mailConfig.subject,
      text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({
          msg: `При отправке письма произошла ошибка!: ${error}`,
          status: 'Error',
        });
      }
      // res.json({ msg: '', status: 'Ok' });
    });
    req.flash('msgemail', 'Письмо успешно отправлено!');
    res.redirect('/');
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...', error: e.message});
  }
};

module.exports.getIndex = (req, res) => {
  let msgemail = req.flash('msgemail')[0];
  let skills = db.get('skills').value();
  let products = db.get('products').value();
  res.render('index', { title: 'Главная', skills, products, msgemail });
};
