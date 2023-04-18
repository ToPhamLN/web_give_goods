const User = require('../models/User');
const bcrypt = require('bcrypt');

const AdminController = {
    // [GET] /admin         :Get home for admin
    index: async (req, res, next) => {
        res.status(200).json({
            message: 'Welcome to Admin Page',
        });
    },

    // [GET] /admin/users       : Get all user for admin    
    getAllUser: async (req, res, next) => {
        try{
            const user = await User.find();
            res.status(200).json(user);
        }catch(err){
            return res.status(500).json(err);
        }
    },

    // [GET] /admin/blogs       : Get all blog for admin
    getAllBlog: async (req, res, next) => {
        res.status(200).json({
            message: 'Welcome to Users Page',
        });
    },
}

module.exports = AdminController;