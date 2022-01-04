const bookRouter = require('./books');
const userRouter = require('./user');

function route(app){
    app.use('/san-pham', bookRouter); 
    app.use('', userRouter);
}


module.exports = route;