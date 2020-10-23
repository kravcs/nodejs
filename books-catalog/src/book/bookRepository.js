module.exports = function bookRepositoryFactory(db) {
    const books = db.collection("books");

    async function findOne(isbn) {
        // const books = await booksPromise;
        const book = await books.findOne({isbn}, {projection: {_id: false}});
        return book;
    }

    async function createOrUpdate({title, slug, authors, isbn, description}) {
        // const books = await booksPromise;
        await books.updateOne(
            {isbn: isbn},
            {$set: {title, slug, authors, isbn, description}},
            {upsert: true}
        );
    }

    async function findAll() {
        // const books = await booksPromise;
        return books
            .find()
            .toArray();
    }

    return {createOrUpdate, findOne, findAll}
};