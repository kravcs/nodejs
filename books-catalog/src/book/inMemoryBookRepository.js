module.exports = function bookRepositoryFactory() {
    const books = {};

    return {
        async createOrUpdate({title, slug, authors, isbn, description}) {
            books[isbn] = {title, slug, authors, isbn, description};
        },
        async findOne(isbn) {
            return books[isbn];
        }
    };
};