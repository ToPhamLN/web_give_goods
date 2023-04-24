const express = require('express');
const router =  express.Router();

const userController = require('../app/controllers/UserController');
const token = require('../middleware/Token');
const uploadCloud = require('../middleware/Uploader');

router.get('/', token.verifyToken, userController.indexUser);
router.get('/store/:_id', token.verifyToken, userController.getUser);
router.delete('/store/:_id', token.verifyTokenAndUserAuthorization, userController.deleteUser);
router.get('/store/:_id/edit', token.verifyTokenAndUserAuthorization, userController.getEditUser);
router.put('/store/:_id/edit', token.verifyTokenAndUserAuthorization, uploadCloud.single('avatar'), userController.putUser);
router.post('/search',token.verifyToken, userController.searchUser);

module.exports = router;