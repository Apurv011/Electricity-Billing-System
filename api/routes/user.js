const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.get('/',  UserController.getAllUsers);

router.post('/signup', UserController.signUp);

router.post('/login', UserController.logIn);

router.get('/:userId',  UserController.getOneUser);

router.patch('/:userId', UserController.editUser);

router.patch('/pass/:userId', UserController.editUserPass);

router.delete('/:userId', UserController.deleteUser);

router.post('/sendMail', UserController.sendMail);

module.exports = router;
