const {Ok, Error} = require('folktale/result');

Error("error").map(x => x + " K").map(x => x + " II").map(console.log)

function valueOrError() {
    if(__) {
        return Ok("test");
    } else {
        return Error("error");
    }
}



// map, chain, getOrElse, matchWith, equals, toString

// console.log(Nothing().toJSON());

// Just("name").chain(x => Just(x + "123")).map(console.log);
// const result = Just("name").map(x => x + "123");
// Nothing().map(x => x + "123").map(console.log);

// const extracted = result.matchWith({
//     Just: ({ value }) => `Found: ${value}`,
//     Nothing: () => 'Nothing was found'
// });
// console.log(extracted);

// List
// Error => Result
// null => Maybe
// Promise => Task

// const {Ok, Error} = require('folktale/result');