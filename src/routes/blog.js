const express = require('express');
const router = express.Router();

const token = require('../middleware/Token');
const blogController = require('../app/controllers/BlogController');
const uploadCloud = require('../middleware/Uploader');

router.get('/',token.verifyToken, blogController.getAllBlog);
router.get('/create', token.verifyToken, blogController.getCreateBlog);
router.post('/create', token.verifyToken, uploadCloud.single('image'), blogController.postBlog);
router.get('/store/:_id',token.verifyToken, blogController.getBlog);
router.delete('/store/:_id',token.verifyTokenAndUserAuthorization, blogController.deleteBlog);
router.get('/store/:_id/edit',token.verifyTokenAndUserAuthorization, blogController.getEditBlog)
router.put('/store/:_id/edit',token.verifyTokenAndUserAuthorization, uploadCloud.single('image'), blogController.putBlog);
router.post('/search',token.verifyToken, blogController.searchBlog);

module.exports = router;
