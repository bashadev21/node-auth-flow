const express = require('express');
const router = express.Router();
const {authValidation}=require('../../middlewares/auth_middleware')
const userController = require('../../controller/user_controller');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/profile', userController.profile);

module.exports = router;