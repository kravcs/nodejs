const bookServiceFactory = require("../../src/book/bookService");
const bookRepositoryFactory = require("../../src/book/inMemoryBookRepository");
const assert = require("assert");

describe("Book service", function() {
    it("can create a book", async function() {
        // given
        const bookRepository = bookRepositoryFactory();
        const bookService = bookServiceFactory(bookRepository);
        const book = {title: "the title", authors: [], isbn: "ISBN", description: "desc"};

        // when
        await bookService.createOrUpdate(book);

        // then
        const bookFromDB = await bookRepository.findOne("ISBN");
        assert.deepEqual(bookFromDB, {slug: "the-title", ...book});
    });

});