const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.get('/',  UserController.getAllUsers);

router.post('/signup', UserController.signUp);

router.post('/login', UserController.logIn);

router.post('/sendMail', UserController.sendMail);

router.patch('/pass/:userId', UserController.editUserPass);

router.get('/id/:uId',  UserController.getOneUserById);

router.get('/:userId',  UserController.getOneUser);

router.patch('/:userId', UserController.editUser);

router.delete('/:userId', UserController.deleteUser);


module.exports = router;
