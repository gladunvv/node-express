const { Router } = require('express');
const AdminController = require('../controllers/admin.controller');

const router = Router();

router.get('/', AdminController.getAdmin);
router.post('/upload', AdminController.uploadData);
router.post('/skills', AdminController.skillsData);

module.exports = router;
