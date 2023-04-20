const express = require('express');
const router =  express.Router();

const userController = require('../app/controllers/UserController');
const token = require('../middleware/Token');

router.get('/', token.verifyToken, userController.indexUser);
router.get('/store/:_id', token.verifyToken, userController.getUser);
router.delete('/store/:_id', token.verifyTokenAndUserAuthorization, userController.deleteUser);
router.get('/store/:_id/edit', token.verifyTokenAndUserAuthorization, userController.getEditBlog);
router.put('/store/:_id/edit', token.verifyTokenAndUserAuthorization, userController.putBlog);

// router.put('store/:userID', token.verifyTokenAndUserAuthorization);
module.exports = router;