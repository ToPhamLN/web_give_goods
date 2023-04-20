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
            const user = await User.find();
            res.status(200).json({user});
        }catch(err){
            return res.status(500).json(err);
        }
    }, 
    
    // [GET] /admin/users/search?
    getAllUserSS: async (req, res, next) => {
        let formData = [];
        let sort = {};
        let objectWhere = {};
        
        // console.log(req.query);
        formData.keyword = req.query.keyword;
        formData.sortBy = req.query.sortBy;
        formData.sortDir = req.query.sortDir;

        if(formData.keyword !== '') objectWhere.name = new RegExp(formData.keyword, 'i');
        if (formData.sortBy) sort[formData.sortBy] = formData.sortDir;
        const user = await User
            .find(objectWhere)
            .sort(sort)
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
            res.status(200).json(user);            
        }catch(err){
            res.status(500).json(err);
        }
    },

    // [PUT] /user/store/:_id/edit
    putUser: async (req, res, next) => {
        try {            
            // console.log(req.body);
            const newUser = {
                username: req.body.username,
                numberPhone: req.body.numberPhone,
                // avatar: req.body.avatar,
                email: req.body.email,
                password: req.body.password,                
            };
            const user = await User.updateOne(
                { _id: req.params._id },
                { $set:  newUser }             
            );           
            res.status(200).json({message: 'Updated user successfully'});            
        } catch (err) {
            return res.status(500).json(err);
        };
    },

    // [DELETE] /user/store/:_id       : Delete user
    deleteUser: async (req, res, next) => {
        try{
            const user = await User.findOneAndDelete({ _id: req.params._id });
            res.status(200).json({message:'Delete successfully!'})
        }catch(err){
            return res.status(500).json(err);
        }
    },

    
        
};

module.exports = UserController;