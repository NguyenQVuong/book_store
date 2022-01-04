var express = require('express');
var router = express.Router();
var usersController = require('../controller/user.controller');

router.get('/dang-ki',usersController.register);
router.post('/dang-ki',usersController.registerUser);
router.post('/dang-nhap', usersController.loginUser);
module.exports = router;