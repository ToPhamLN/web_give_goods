const {response} = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {ChangeToSlug} = require('../../util/ConvertSlug');
const cloudinary = require('cloudinary').v2;

const UserController = {
  // [GET] /user          :Get home for user
  indexUser: async (req, res, next) => {
    res.status(200).json({
      message: 'Welcome to User Page',
    });
  },

  // [GET] /admin         :Get home for admin
  indexAdmin: async (req, res, next) => {
    res.status(200).json({
      message: 'Welcome to Admin Page',
    });
  },

  // [GET] /admin/users       : Get all user for admin
  getAllUser: async (req, res, next) => {
    try {
      const user = await User.find().sort([['createdAt', -1]]);
      res.status(200).json({user});
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'no users',
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // [GET] /admin/users/search?
  searchUser: async (req, res, next) => {
    try {
      const q = req.query.q;
      console.log(q);
      let keyUser = undefined;
      if (q !== '') {
        keyUser = new RegExp(ChangeToSlug(q));
      } else {
        return res.status(404).json({
          status: false,
          message: 'Please enter keywords',
        });
      }
      console.log(keyUser);
      const user = await User.find({
        slug: {$regex: keyUser, $options: 'i'},
      });
      res.status(200).json(user);
    } catch (err) {
      return res.status(404).json({
        status: false,
        message: 'user not found',
      });
    }
  },

  // [GET] user/store/:_id           : Get a user information
  getUser: async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.params._id});
      res.status(200).json(user);
    } catch (err) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }
  },

  // [GET] /user/store/:_id/edit
  getEditUser: async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.params._id});
      console.log(req.req.user);
      res.status(200).json(user);
    } catch (err) {
      return res.status(404).json({
        status: false,
        message: 'user not found',
      });
    }
  },

  // [PUT] /user/store/:_id/edit
  putUser: async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.params._id});
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'user not found',
        });
      }
      const delPublic = user.public;

      const existedUser = await User.findOne({
        $or: [{username: req.body.username}, {email: req.body.email}],
      });
      if (existedUser) {
        return res.status(400).json({
          status: false,
          message: 'user existed',
        });
      }
      let newUser = {
        username: req.body.username,
        numberPhone: req.body.numberPhone,
        avatar: req.file.path,
        public: req.file.filename,
        email: req.body.email,
        slug: ChangeToSlug(req.body.username + req.body.numberPhone + req.body.email),
      };

      if (req.body.password) {
        const saltN = await bcrypt.genSalt(10);
        const hashedN = await bcrypt.hash(req.body.password, saltN);
        newUser.password = hashedN;
      }

      console.log(req.file, req.user, user, newUser, delPublic);
      const userN = await User.updateOne({_id: req.params._id}, {$set: newUser});
      if (delPublic) {
        const delAvt = await cloudinary.uploader.destroy(delPublic);
        console.log(delAvt);
      }
      res.status(200).json({
        message: 'Updated user successfully',
        userN,
      });
    } catch (err) {
      if (req.file) cloudinary.uploader.destroy(req.file.filename);
      return res.status(500).json(err);
    }
  },

  // [DELETE] /user/store/:_id       : Delete user
  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.params._id});
      if (!user) {
        return res.status(404).json({
          status: false,
          message: 'User not found',
        });
      }
      const delPublic = user.public;
      const userD = await User.findOneAndDelete({_id: req.params._id});
      const delAvt = await cloudinary.uploader.destroy(delPublic);
      res.status(200).json({
        message: 'Delete successfully!',
        userD,
        delAvt,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  text: async (req, res, next) => {
    try {
      console.log(req.file, req.user, req.body);
      const {error} = cloudinary.uploader.destroy('web_give_goods/l3csi10sbticpauh14j1');
      if (error) {
        res.json('not_found');
      }
      res.status(200).json({message: 'Updated user successfully'});
    } catch (err) {
      if (req.file) cloudinary.uploader.destroy(req.file.filename);
      return res.status(500).json(err);
    }
  },
};

module.exports = UserController;
