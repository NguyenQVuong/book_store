// co the su dung query-string de su dung trong phan trang va tim kiem san pham
const { db } = require('../models/book');
const Book = require('../models/book')
// const faker = require('faker')
class BooksController {
    // ./san-pham
    async index(req, res){
        db.collection('books').find({}).toArray(function(err, items) {
            if(err) {
                return res.send(err)
            }
            else {
                res.render('home.ejs', {
                    items: items
                })

            }
        })
    

    }

    async pagination(req, res) {
        const page = req.query.page;
        console.log(page);
        if(page == 0) {
            return page = 1;
        }
        const pageSize = 2;
        const skip = (page - 1) * pageSize
        Book.find({}).skip(skip).limit(pageSize).sort({_id: -1}).then(data => {
            Book.countDocuments({}).then((total) => {
                let totalPage = Math.ceil(total/pageSize);
                res.render('home.ejs',{
                    data,totalPage, total
                })
            })
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
        const {image} = req.file;
        const books = new Book({
                book_title: book_title, author: author, 
                book_publish: book_publish, category: category, 
                image: image,price: price, 
                description: description, condition: condition
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
    // async fakaData(req, res, next) {
    //     for(let i = 0; i< 100; i++) {
    //         const newprd = new Book();
    //         newprd.book_title = faker.commerce.book_title()
    //         newprd.author = faker.name.author()
    //         newprd.book_publish = faker.name.book_publish()
    //         newprd.category = faker.name.category()
    //         newprd.price = faker.commerce.price()
    //         newprd.description = faker.lorem.description()
    //         newprd.condition = faker.name.condition()
    //         newprd.image = faker.image.imageUrl()

    //         newprd.save((err) => {
    //             if(err) {return next(err);}
    //         })
    //     }
    // res.send(newprd)}

}

module.exports = new BooksController;