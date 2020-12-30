const router = require('express').Router();

const TokenAuthenticator = require('../api/middleware/TokenAuthenticator');

const userController = require('../api/user/controllers/UserController');

router.get('/', userController.login);
router.post('/', userController.registerNewUser);

router.use(TokenAuthenticator.authenticate);

router.delete('/:id', userController.deleteAccount);
router.put('/', userController.updateUser);
router.put('/password', userController.changePassword);

module.exports = router;