module.exports = {
  sendMessage: function(req, res) {
    try {
      console.log('req :', req.body);
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
  getIndex: function(req, res) {
    res.render('index');
  },
};
