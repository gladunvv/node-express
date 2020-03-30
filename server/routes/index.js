const {Router} = require('express')

const router = Router()

router.use('/', require('./main.routes'))
router.use('/admin', require('./admin.routes'))
router.use('/login', require('./login.routes'))



module.exports = router;
