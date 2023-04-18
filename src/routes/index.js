const siteRouter = require('./site');
const userRouter = require('./user');
const adminRouter = require('./admin');
const blogRouter = require('./blog');


function route(app) {       
    app.use('/', siteRouter );
    app.use('/admin', adminRouter);
    app.use('/user',userRouter);
    app.use('/blog',blogRouter);   
}

module.exports = route;


