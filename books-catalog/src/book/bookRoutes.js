const {BOOK, BOOK_COLLECTION} = require("../links").resources;

module.exports = function(db) {
    const router = require("express").Router();

    const bookRepository = require("./bookRepository")(db);
    const bookService = require("./bookService")(bookRepository);
    const {createOrUpdate, details, getList} = require("./bookController")({bookService, bookRepository});
    const validateBook = require("./validateBookMiddleware");

    router.post(BOOK_COLLECTION, validateBook, createOrUpdate);
    router.get(BOOK, details);
    router.get(BOOK_COLLECTION, getList);

    return router;
};