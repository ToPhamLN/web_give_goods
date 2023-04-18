const User = require('../models/User');
const bcrypt = require('bcrypt');

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
            const user = await User.find({});
            res.status(200).json({user});
        }catch(err){
            return res.status(500).json(err);
        }
    },    

    // [GET] user/store/:_id           : Get a user information
    getUser: async (req, res, next) => {
        try{
            const user = await User.findOne({
                _id: req.params._id,
            });
            res.status(200).json(user);            
        }catch(err){
            res.status(500).json(err);
        }
    },

    // [GET] /user/store/:_id/edit
    getEditBlog: async (req, res, next) => {
        res.status(200).json({message: 'Welcome to edit blog'});
    },

    // [PUT] /user/store/:_id/edit
    putBlog: async (req, res, next) => {
        try {} catch {}
    },

    // [DELETE] /user/store/:_id       : Delete user
    deleteUser: async (req, res, next) => {
        try{
            const user = await User.findOneAndDelete({
                _id: req.params._id});
            res.status(200).json({message:'Delete successfully!'})
        }catch(err){
            return res.status(500).json(err);
        }
    },

    
        
};

module.exports = UserController;