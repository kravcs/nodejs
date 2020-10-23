const mapValues = require("lodash.mapvalues");
const responses = require("./responses");
const {bookLink} = require("../links");

function wrapWithTryCatch(fn) {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    }
}

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = function bookControllerFactory({bookService, bookRepository}) {
    async function createOrUpdate(req, res, next) {
        // HTTP - req
        const {title, authors, isbn, description} = req.body;

        // JS
        await bookService.createOrUpdate({title, authors, isbn, description});

        // HTTP - res
        res.redirect(bookLink(isbn));
    }

    async function details(req, res, next) {
        const isbn = req.params.isbn;

        const book = await bookRepository.findOne(isbn);

        responses.details({book, layout: "layout"}, res);

    }

    async function getList(req, res) {
        const books = await bookRepository.findAll();

        responses.list({books, layout: "layout"}, res);
    }

    return withErrorHandling({createOrUpdate, details, getList});
};