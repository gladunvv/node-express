class LoginController {
    async loginUser(req, res) {
        console.log('res :', res.body);
    }
    getLogin(req, res) {
      res.render('login');
    }
  }
  
  module.exports = new LoginController();
  