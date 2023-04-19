const User = require ('../models/User');
const Blog = require ('../models/Blog');

const SearchController = {    
    searchBlog : async (res, req, next) => {
        try {
            const p = req.query.p;
            const type = res.query.type;
            if (!p) {
                return res.status(404).json({message: 'You have not entered a keyword'});
            } else {
                if (type === 'more') {
                    const blog = await Blog.find({
                        title: /${p}/
                    }).sort(updatedAt);
                } else if (type === 'less') {
                    const blog = await Blog.find({
                        title: /${p}/
                    }).limit(5).sort('updatedAt');                
                }
                res.status(200).json(blog);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    searchUser: async (req, res, next) => {
        try {
            if (!p) {
                return res.status(404).json({ message: 'You have not entered a keyword' });
            } else {
                if (type === 'more') {
                    const user = await new User.find({
                        username: /${p}/
                    }).sort('updatedAt');
                } else if (type === 'less') {
                    const user = await new User.find({
                        username: /${p}/
                    }).sort('updatedAt').limit(5);
                }
                res.status(200).json(user);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};