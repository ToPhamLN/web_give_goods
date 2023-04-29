const {default: mongoose} = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');
const {response} = require('express');
const cloudinary = require('cloudinary').v2;
const {ChangeToSlug} = require('../../util/ConvertSlug');

const BlogController = {
  // [GET] /blog/
  getAllBlog: async (req, res, next) => {
    try {
      const blog = await Blog.find({}).sort([['createdAt', -1]]);
      res.status(200).json(blog);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // [POST] /blog/search
  searchBlog: async (req, res, next) => {
    try {
      const q = req.query.q;
      console.log(q);
      let keyBlog = undefined;
      if (q !== '') {
        keyUser = new RegExp(ChangeToSlug(q));
      } else {
        return res.status(404).json({
          status: false,
          message: 'Please enter keywords',
        });
      }
      console.log(keyBlog);
      const blog = await Blog.find({
        slug: {$regex: keyBlog, $options: 'i'},
      });
      res.status(200).json(blog);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // [GET] /blog/store/:_id
  getBlog: async (req, res, next) => {
    try {
      const blog = await Blog.findOne({_id: req.params._id});
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // [GET] /blog/create
  getCreateBlog: async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.user.userID});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // [POST] /blog/create
  postBlog: async (req, res, next) => {
    try {
      // create a new blog
      const user = await User.findOne({_id: req.user.userID});
      console.log(req.file, req.user);
      const newBlog = new Blog({
        title: req.body.title,
        description: req.body.description,
        numberPhone: req.body.numberPhone,
        image: req.file.path,
        public: req.file.filename,
        address: req.body.address,
        city: req.body.city,
        slug: ChangeToSlug(req.body.title + req.body.description),
        author: user.username,
        authorID: user._id,
      });
      //save a new blog
      const blog = await newBlog.save();
      res.status(200).json(blog);
    } catch (err) {
      if (req.file) cloudinary.uploader.destroy(req.file.filename);
      return res.status(500).json(err);
    }
  },

  // [DELETE] blog/store/:_id
  deleteBlog: async (req, res, next) => {
    try {
      const blog = await Blog.findOne({_id: req.params._id});
      if (!blog) {
        return res.status(404).json({
          status: false,
          message: 'No blog found',
        });
      }
      if (blog.authorID === req.user.userID || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
      const delPublic = blog.public;
      const blogD = await Blog.findOneAndDelete({_id: req.params._id});
      const delImg = cloudinary.uploader.destroy(delPublic);
      res.status(200).json({
        message: 'Blog deleted',
        blogD,
        delImg,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] blog/store/:_id/edit
  getEditBlog: async (req, res, next) => {
    try {
      console.log(req.user);
      const blog = await Blog.findOne({_id: req.params._id});
      if (!blog) {
        return res.status(404).json({
          status: false,
          message: 'No blog found',
        });
      }
      if (blog.authorID === req.user.userID || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
      res.status(200).json(blog);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // [PUT] blog/store/:_id/edit
  putBlog: async (req, res, next) => {
    try {
      const user = await User.findOne({_id: req.user.userID});
      const blog = await Blog.findOne({_id: req.params._id});
      if (!blog) {
        return res.status(404).json({
          status: false,
          message: 'No blog found',
        });
      }
      if (blog.authorID === req.user.userID || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
      const delPublic = blog.public;
      const newBlog = {
        title: req.body.title,
        description: req.body.description,
        numberPhone: req.body.numberPhone,
        image: req.file.path,
        public: req.file.filename,
        address: req.body.address,
        city: req.body.city,
        slug: ChangeToSlug(req.body.title + req.body.title),
        author: user.username,
        author: user._id,
      };
      console.log(user, blog, delPublic, newBlog);
      const blogN = await Blog.updateOne({_id: req.params._id}, {$set: newBlog});
      const delImg = await cloudinary.uploader.destroy(delPublic);
      res.status(200).json({
        message: 'Updated successfully',
        blogN,
        delImg,
      });
    } catch (err) {
      if (req.file) cloudinary.uploader.destroy(req.file.filename);
      return res.status(500).json(err);
    }
  },
};

module.exports = BlogController;
