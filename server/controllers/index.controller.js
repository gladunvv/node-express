class IndexController {
  async sendMessage(req, res) {
    try {
      console.log('req :', req.body);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  }
  getIndex(req, res) {
    res.render('index');
  }
}

module.exports = new IndexController();
