const db = require('../models/db');

module.exports = {
  sendMessage: async function(req, res) {
    try {
      console.log('req :', req.body);
      db.get('messages')
        .push(req.body)
        .write(); 
      res.redirect('/')
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова...' });
    }
  },
  getIndex: function(req, res) {
    res.render('index');
  },
};
