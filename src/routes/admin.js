const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const token = require('../middleware/Token');

router.get('/', token.verifyTokenAndAdmin, userController.indexAdmin);
router.get('/users', token.verifyTokenAndAdmin, userController.getAllUser);
// router.get('/blogs', Token.verifyTokenAndAdmin, blogController.getAllBlog);


module.exports = router;