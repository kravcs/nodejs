const bookControllerFactory = require("../../src/book/bookController");
const assert = require("assert");

describe("Book controller", function() {
    it("create or update happy path", async function() {
        // given
        const req = {
            body: {
                isbn: "ISBN"
            }
        };
        const res = {
            redirect(path) {
                res.redirect.invokedWith = path;
            }
        };
        const bookService = {
            async createOrUpdate() {

            }
        };
        const bookController = bookControllerFactory({bookService});

        // when
        await bookController.createOrUpdate(req, res);

        // then
        assert.equal(res.redirect.invokedWith, "/book/ISBN");
    });

    it("create or update error", async function() {
        // given
        const req = {body: {}};
        const bookService = {
            async createOrUpdate() {
                throw new Error("sth bad happened");
            }
        };
        function next(error) {
            next.invokedWith = error;
        }
        const bookController = bookControllerFactory({bookService});

        // when
        await bookController.createOrUpdate(req, null, next);

        // then
        assert.deepEqual(next.invokedWith, new Error("sth bad happened"));
    });
});