const {Router} = require('express')

const router = Router()

router.get('/', async (req, res) => {
    res.render('index')
})

router.get('/admin', async (req, res) => {
    res.render('admin')
})

router.get('/login', async (req, res) => {
    res.render('login')
})

module.exports = router;