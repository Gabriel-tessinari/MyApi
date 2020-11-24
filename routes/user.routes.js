const router = require('express').Router();

const UserController = require('../controllers/UserController');

router.get('/', UserController.login);
router.post('/', UserController.registerNewUser);

module.exports = router;