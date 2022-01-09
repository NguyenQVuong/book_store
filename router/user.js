var express = require('express');
var router = express.Router();
var usersController = require('../controller/user.controller');
var auth = require('../middlewares/authToken');

router.get('/dang-ki',usersController.register);
router.post('/dang-ki',usersController.registerUser);
router.post('/dang-nhap', usersController.loginUser);
router.get('/logout', auth ,usersController.logOut)
module.exports = router;