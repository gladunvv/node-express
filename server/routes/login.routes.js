const {Router} = require('express')

LoginController = require('../controllers/login.controller')

const router = Router()

router.get('/', LoginController.getLogin)
router.post('/', LoginController.loginUser)

module.exports = router;