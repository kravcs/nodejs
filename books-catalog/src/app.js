module.exports = function(db) {
    const express = require("express");
    const app = express();

    const bookRoutes = require("./book/bookRoutes")(db);
    const {error, notFound} = require("./error");
    const logger = require("./logger");
    const path = require("path");

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "hbs");

    app.use(express.json());
    app.use(logger);
    app.use(bookRoutes);

    app.use(notFound);
    app.use(error);

    return app;
};


// why is node running