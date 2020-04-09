const { isAuth } = require('../lib/auth');

module.exports = {
  loginUser: function (req, res) {
    let { email, password } = req.body;
    if (isAuth(email, password)) {
      req.session.isAdmin = true;
      res.redirect('/admin');
    } else {
      res.render('login', {
        msglogin: 'Пользователь не найден',
      });
    }
  },
  getLogin: function (req, res) {
    if (req.session.isAdmin) {
      res.redirect('/admin');
      return;
    }
    res.render('login', { title: 'Авторизация' });
  },
};
