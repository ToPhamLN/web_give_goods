const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { response } = require('express');
const cloudinary = require('cloudinary').v2;
const { ChangeToSlug } = require('../../Javascript/ConvertSlug');

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

    // [POST] /blog/search
    searchBlog: async(req, res, next) => {
        try {
        const q = req.query.q;
        console.log(q);
        let keyBlog = undefined;
        if (q !== '') keyBlog = new RegExp(ChangeToSlug(q));
        console.log(keyBlog);
        const blog = await Blog
            .find(
                { 'slug': { $regex: keyBlog, $options: 'i'} },                    
            )                
        res.status(200).json(blog);

        } catch (err) {
            return res.status(500).json(err);
        }
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
        try {
            const userData = req.user
            const user = await User.findOne({ _id: userData.userID });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // [POST] /blog/create
    postBlog: async (req, res, next) => {       
        try {                                 
            // create a new blog
            const fileData = req.file;
            const userData = req.user;            
            const user = await User.findOne({ _id: userData.userID });                       
            console.log(fileData, userData);
            const newBlog = new Blog({
                title: req.body.title,
                description: req.body.description,
                numberPhone: req.body.numberPhone,
                image: fileData.path,
                address: req.body.address,
                city: req.body.city,                
                slug: ChangeToSlug(req.body.title + req.body.description),
                author: user.username,
            })
            //save a new blog
            const blog = await newBlog.save();
            console.log(blog);
            res.status(200).json(blog);
        } catch (err) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename);
            return res.status(500).json(err);
        }
    },

    // [DELETE] blog/store/:_id
    deleteBlog: async (req, res, next) => {
        try {
            const blogData = await new Blog.findOne({ _id: req.params._id });
            const blog =await new Blog.findOneAndDelete({ _id: req.params._id });
            if (blog) cloudinary.uploader.destroy(blogData.image);
            res.status(200).json({message: 'Blog deleted'});
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // [GET] blog/store/:_id/edit
    getEditBlog: async (req, res, next) => {
        try {
            const blog = await Blog.findOne({ _id: req.params._id });
            res.status(200).json(blog);
        } catch(err) {
            return res.status(500).json(err);
        };
    },

    // [PUT] blog/store/:_id/edit
    putBlog: async (req, res, next) => {
        try {
            const fileData = req.file
            const userData = req.user
            const user = await User.findOne({_id:userData.userID});            
            console.log(fileData, userData, user);
            const newBlog = {
                title: req.body.title,
                description: req.body.description,
                numberPhone: req.body.numberPhone,
                image: fileData.path,
                address: req.body.address,
                city: req.body.city,                
                slug: ChangeToSlug(req.body.title + req.body.title),
                author: user.username,
            };
            // console.log(newBlog);
            const blog = await Blog.updateOne(
                { _id: req.body._id },
                { $set: newBlog },                
            );            
            res.status(200).json({ message: 'Updated successfully' });
        } catch(err) {
            // if (fileData) cloudinary.uploader.destroy(fileData.filename);
            return res.status(500).json(err);
        }
    },
};

module.exports = BlogController;