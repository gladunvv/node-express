module.exports = {
  loginUser: function(req, res) {
    console.log('res :', res.body);
  },
  getLogin: function(req, res) {
    res.render('login', {title: 'Авторизация'});
  },
};
