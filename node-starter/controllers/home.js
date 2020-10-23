
module.exports = (req, res) => {
    console.log("params: ", req.params);
    console.log("header: ", req.headers);
    res.render("home", {
        content: JSON.stringify(req.params, "", "\t"),
    });
}

