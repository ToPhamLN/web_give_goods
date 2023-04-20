const express = require('express');
const router = express.Router();

const Token = require('../middleware/Token');
const blogController = require('../app/controllers/BlogController');

router.get('/',Token.verifyToken, blogController.getAllBlog);
router.get('/create', Token.verifyToken, blogController.getCreateBlog);
router.post('/create', Token.verifyToken, blogController.postBlog);
router.get('/store/:_id',Token.verifyToken, blogController.getBlog);
router.delete('/store/:_id',Token.verifyTokenAndUserAuthorization, blogController.deleteBlog);
router.get('/store/:_id/edit',Token.verifyTokenAndUserAuthorization, blogController.getEditBlog)
router.put('/store/:_id/edit',Token.verifyTokenAndUserAuthorization, blogController.putBlog);

module.exports = router;
