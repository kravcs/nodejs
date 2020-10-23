// top-level await
(async function() {
    const db = await require("./db"); // top-level await
    const app = require("./app")(db);

    app.listen(3000, function () {
        console.log("Example app listening on port 3000!");
    });
})();