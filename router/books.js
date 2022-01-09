const express = require('express');
const router = express.Router();
const booksController = require('../controller/books.controller');

router.get('/', booksController.index)
router.get('/:slug', booksController.detailBook);
router.get('',booksController.pagination);
router.get('/search/:slug', booksController.searchBook);
router.post('/them-san-pham', booksController.addBook);

module.exports = router;