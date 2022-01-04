const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const bookSchema = mongoose.Schema({
    book_title: {
        type: String,
        required: [true, "Please fill in book title"]
    },
    author: {
        type: String,
        required: [true, "Please fill in author"]
    },
    book_publish: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        slug: ["book_title"],
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Must be at least 1, got {VALUE}']
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const book = mongoose.model('books', bookSchema);
module.exports = book;