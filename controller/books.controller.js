// co the su dung query-string de su dung trong phan trang va tim kiem san pham
const Book = require('../models/book')

class BooksController {
    //get all products
    // ./san-pham
    index(req, res) {
        // const page = Number.parseInt(req.query.page);
        // const limit = Number.parseInt(req.query.limit || '3');
        // const skip = Number.parseInt(req.query.skip || '3');
        Book.find({})
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.status(500).json("Loi API")
        })

    };
    
    searchBook(req, res) {
        
    }

    // ./san-pham/:slug
    detailBook (req, res, next) {
        Book.find({ slug: req.params.slug }).then(data => {
            res.json(data)
        })
        .catch(next);
    };

    // ./san-pham/admin/them-san-pham
    async addBook (req, res) {
        const {book_title, author, book_publish, category, price,description, condition} = req.body;
        const books = new Book({
                book_title: book_title, author: author, 
                book_publish: book_publish, category: category, 
                price: price, description: description, condition: condition
            });
        try {
            books.save( function(err, saveBook) {
                if(err) { 
                    return res.send(err)
                }
                else {
                    return res.json(saveBook)
                }
            })
        }
        catch(e) {
            res.status(400).send("unable to save to database");
        }

    }

    updateBook(req, res) {

    }

    deleteBook(req, res) {
        
    }
}

module.exports = new BooksController;