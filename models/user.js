var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please fill in username"]
    },
    email: {
        type: String,
        required: [true, "Please fill in email"]
    },
    password: {
        type: String,
        required: [true, "Please fill in password"],
        min: 6
    }
}, {
    timestamps: {
        createdAt: 'createAt',
        updatedAt: 'updateAt'
    }
});

const user = mongoose.model('users', userSchema);
module.exports = user;