const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { ChangeToSlug } = require('../../Javascript/ConvertSlug');
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
        try{
            const user = await User
                .find()
                .sort([['createdAt', -1]]);                
            res.status(200).json({user});
        }catch(err){
            return res.status(500).json(err);
        }
    },

     // [GET] /admin/users/search?
    searchUser: async (req, res, next) => {
        try {
            const q = req.query.q;
            console.log(q);
            let keyUser = undefined;
            if (q !== '') keyUser = new RegExp(ChangeToSlug(q));
            console.log(keyUser);
            const user = await User
                .find(
                    { 'slug': { $regex: keyUser, $options: 'i'} },                    
                )                
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        };
    },

    // [GET] user/store/:_id           : Get a user information
    getUser: async (req, res, next) => {
        try{            
            const user = await User.findOne({ _id: req.params._id });
            res.status(200).json(user);            
        }catch(err){
            res.status(500).json(err);
        }
    },

    // [GET] /user/store/:_id/edit
    getEditUser: async (req, res, next) => {
        try{
            const user = await User.findOne({ _id: req.params._id });
            // req.userData = user;
            console.log(req.userData);
            res.status(200).json(user);            
        }catch(err){
            res.status(500).json(err);
        }
    },

    // [PUT] /user/store/:_id/edit
    putUser: async (req, res, next) => {
        try {           
            const userData = req.user;
            const fileData = req.file;
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);            
            console.log(fileData, userData, ChangeToSlug(req.body.username));                        
            const newUser = {
                username: req.body.username,
                numberPhone: req.body.numberPhone,
                avatar: fileData.path,
                email: req.body.email,
                password: hashed,
                slug: ChangeToSlug((req.body.username + req.body.numberPhone + req.body.email)),               
            };
            const user = await User.updateOne(
                { _id: req.params._id },
                { $set:  newUser }             
            );                          
            res.status(200).json({message: 'Updated user successfully'});            
        } catch (err) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename);
            return res.status(500).json(err);
        };
    },

    // [DELETE] /user/store/:_id       : Delete user
    deleteUser: async (req, res, next) => {
        try{
            // const userData = await User.findOne({ _id: req.params._id });
            // let imagePath = userData.avatar;
            // console.log(imagePath);
            const user = await User.findOneAndDelete({ _id: req.params._id });
            console.log(user);
            // if (user) cloudinary.uploader.destroy({ 'path': imagePath });
            res.status(200).json({message:'Delete successfully!'})
        }catch(err){
            return res.status(500).json(err);
        }
    },

    
        
};

module.exports = UserController;