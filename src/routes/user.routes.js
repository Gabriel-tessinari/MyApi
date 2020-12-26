const router = require('express').Router();

const TokenAuthenticator = require('../api/middleware/TokenAuthenticator');

const UserController = require('../api/controllers/UserController');

router.get('/', UserController.login);
router.post('/', UserController.registerNewUser);

router.use(TokenAuthenticator.authenticate);

router.delete('/:id', UserController.deleteAccount);

module.exports = router;