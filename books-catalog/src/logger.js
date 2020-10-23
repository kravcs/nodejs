function logger(req, res, next) {
    const start = new Date();
    res.on('finish', function(){
        const end = new Date();
        console.log(end-start);
    })
    next();
}
module.exports = logger;