const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.index);
router.get('/signup', siteController.getSignup);
router.post('/signup', siteController.postSignup);
router.get('/login', siteController.getLogin);
router.post('/login', siteController.postLogin);
router.get('/refresh', siteController.requestRefreshToken);
router.get('/logout', siteController.logOut);

module.exports = router;
