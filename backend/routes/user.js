const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signIn',userController.createUser);

module.exports = router;