const {bookLink} = require("../links");

module.exports = {
    details({book, layout}, res) {
        res.format({
            "text/html"() {
                res.render("book", {book, layout});
            },
            "application/json"() {
                res.json(book);
            },
            "default"() {
                res.json(book);
            }
        });
    },
    list({books, layout}, res) {
        res.format({
            "text/html"() {
                res.render("books", {books: books.map(book => ({...book, link: bookLink(book.isbn)})), layout});
            },
            "application/json"() {
                res.json(books);
            },
            "default"() {
                res.json(books);
            }
        });
    }
};