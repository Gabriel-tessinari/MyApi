const router = require('express').Router();

const characterController = require('../api/character/controller/CharacterController');

router.post('/', characterController.create);

module.exports = router;