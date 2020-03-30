class AdminController {
  async skillsData(req, res) {
    try {
      console.log('req :', req.body);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  }
  async uploadData(req, res) {
    try {
      console.log('req :', req.body);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  }
  getAdmin(req, res) {
    res.render('admin');
  }
}

module.exports = new AdminController();
