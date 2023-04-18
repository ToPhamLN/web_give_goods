const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const { response } = require('express');


const BlogController = {
    // [GET] /blog/
    getAllBlog: async (req, res, next) => {
        try {
            const blog = await Blog.find({});
            res.status(200).json(blog);
        } catch(err) {
            return res.status(500).json(err);
        };
    },
    
    // [GET] /blog/store/:_id
    getBlog: async (req, res, next) => {
        try {
            const blog = await Blog.findOne({ _id : req.params._id });
            res.status(200).json(blog);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // [GET] /blog/create
    getCreateBlog: async (req, res, next) => {
        res.status(200).json({ message: 'Welcome to create blog'});
    },
    // [POST] /blog/create
    postBlog: async (req, res, next) => {        
        try {                      
            // create a new blog
            const newBlog = await new Blog({
                title: req.body.title,
                description: req.body.description,
                content: req.body.content,                
                authorId: req.user.userID,
            })
            //save a new blog
            const blog = await newBlog.save();
            res.status(200).json(blog);
        } catch(err) {
            return res.status(500).json(err);
        }
    },

    // [DELETE] blog/store/_id
    deleteBlog: async (req, res, next) => {
        try {
            const blog =await new Blog.findOne({ _id: req.params._id });
            res.status(200).json({message: 'Blog deleted'});
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // [GET] blog/store/_id/edit
    getEditBlog: async (req, res, next) => {
        res.status(200).json({message: 'Welcome to edit blog'});
    },

    // [PUT] blog/store/_id
    putBlog: async (req, res, next) => {
        try {} catch {}
    },
};

module.exports = BlogController;