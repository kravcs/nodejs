const express = require("express");
const compression = require("compression");
const chalk = require("chalk");

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const home = require("./controllers/home");

app
  .use(compression({ level: 9 }))
  .set("views", "views")
  .set("view engine", "pug")
  .use("/public", express.static("public"))

  /*
   * @routes
   **/
  .get("/", (req, res) => {
    res.render("default", {
      content: JSON.stringify(process.env, "", "\t"),
    });
  })
  .get("/test1/:params", home);

const server = app.listen(PORT, () => {
  console.log(chalk.blueBright(`App listening at http://${HOST}:${PORT}`));
});
