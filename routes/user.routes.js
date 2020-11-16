const router = require('express').Router();

const {
    login,
    registerNewUser } = require('../controllers/user.controller');

router.get('/', login);
router.post('/', registerNewUser);

module.exports = router;