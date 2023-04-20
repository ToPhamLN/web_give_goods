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
    /////////////////////////////////////////////////////////
    search: async (res, res, next) => {
        try {
            let params = [];
            params.keyword = req.query.keyword;
            params.sortField = req.query.orderBy;
            params.sortType = req.query.orderDir;

            const data = await MainModel.listItems(params , {'task' : 'all'});
            res.status(200).json({
                message: "Success",
                data: data, 
            });

        } catch (err) {
            res.status(400).json({ message: 'Not Found'});
        }        
    },

    listItems: (params, options) => {
        let sort = {};
        let objectWhere = {};
        if (params.keyword !== '') objectWhere.name = new RegExp(params.keyword, 'i');

        if (params.sortField) sort[params.sortField] = params.sortType;
        // get all
        if (options.task === 'all') {
            return MainModel
                .find(objectWhere)
                .select('id name status')
                .sort(sort)                
        }
        //get one
        if (options.task === 'one') {
            return MainModel
                .find({_id : params._id})
                .select('id name status')
        }
    },

    createItem : (item) => {
        return new MainModel(item).save();
    },

    deleteItem : (params, option) => {
        if(option.task === 'one') {
            return MainModel.deleteOne({ id: params.id })
        }
    },

    editItem: (params, option) => {
        if(option.task === 'edit') {
            return MainModel.updateOne({ id: params.id }, params.body)
        }
    },
};