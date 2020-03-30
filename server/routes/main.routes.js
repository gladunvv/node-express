const {Router} = require('express')

IndexController = require('../controllers/index.controller')

const router = Router()

router.get('/', IndexController.getIndex)
router.post('/', IndexController.sendMessage)

module.exports = router;