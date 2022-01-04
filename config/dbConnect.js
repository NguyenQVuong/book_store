const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/book_shop', {
    useNewUrlParser: true, 
    useUnifiedTopology: true}, 
    function(err){
        if(err){
            console.log("Mongo connect error: " + err);
  }
        else{
            console.log("Mongo connect successfully");
  }
});

module.exports = mongoose;