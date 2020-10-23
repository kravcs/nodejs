const test = require("tape");
const updateQuality = require("../src/shop");

function verify({itemName, sellIn, quality}) {
    return function (t) {
        // given
        const item = {name: itemName, sellIn: sellIn.before, quality: quality.before};
        // when
        const updatedItem = updateQuality([item])[0];

        // then
        t.equal(updatedItem.sellIn, sellIn.after);
        t.equal(updatedItem.quality, quality.after);
        t.end();
    };
}


// data-driven tests/tabular tests
// [
//     ["normal item...", "+5 Dext...", ["sellIn", 10, 9], ["quality", 20, 19]],
//     ["normal item...", "+5 Dext...", ["sellIn", 10, 9], ["quality", 20, 19]],
//     ["normal item...", "+5 Dext...", ["sellIn", 10, 9], ["quality", 20, 19]],
//     ["normal item...", "+5 Dext...", ["sellIn", 10, 9], ["quality", 20, 19]],
//     ["normal item...", "+5 Dext...", ["sellIn", 10, 9], ["quality", 20, 19]],
// ].forEach(([name, itemName, [_, sellInBefore, sellInAfter], [_, qualityBefore, qualityAfter]]) => {
//     test(name, verify({
//         itemName,
//         sellIn: {before: sellInBefore, after: sellInAfter},
//         quality: {before: qualityBefore, after: qualityAfter},
//     }));
// });

[
    ["normal item before sell date",                               "Elixir of the Mongoose",                   ["sellIn", 10, 9], ["quality", 20, 19]],
    ["normal item on sell date",                                   "+5 Dexterity Vest",                        ["sellIn", 1,  0], ["quality", 20, 19]],
    ["normal item after sell date with low quality",               "+5 Dexterity Vest",                        ["sellIn", 0, -1], ["quality", 1,   0]],
    ["normal item after sell date",                                "+5 Dexterity Vest",                        ["sellIn", 0, -1], ["quality", 20, 18]],
    ["normal item of zero quality never goes below zero",          "+5 Dexterity Vest",                        ["sellIn", 2,  1], ["quality",  0,  0]],
    ["brie increases in quality over time",                        "Aged Brie",                                ["sellIn", 1,  0], ["quality",  0,  1]],
    ["brie increases in quality up to 50",                         "Aged Brie",                                ["sellIn", 1,  0], ["quality", 49, 50]],
    ["brie never increases quality of 50",                         "Aged Brie",                                ["sellIn", 1,  0], ["quality", 50, 50]],
    ["brie increases quality faster past sellIn",                  "Aged Brie",                                ["sellIn",-1, -2], ["quality", 30, 32]],
    ["sulfuras never decrease in quality and sellIn never changes","Sulfuras, Hand of Ragnaros",               ["sellIn", 1,  1], ["quality", 10, 10]],
    ["backstage passes over 10 days to concert",                   "Backstage passes to a TAFKAL80ETC concert",["sellIn",11, 10], ["quality", 10, 11]],
    ["backstage passes with 10 days to concert",                   "Backstage passes to a TAFKAL80ETC concert",["sellIn",10,  9], ["quality", 10, 12]],
    ["backstage passes with  6 days to concert",                   "Backstage passes to a TAFKAL80ETC concert",["sellIn", 6,  5], ["quality", 10, 12]],
    ["backstage passes with  5 days to concert",                   "Backstage passes to a TAFKAL80ETC concert",["sellIn", 5,  4], ["quality", 10, 13]],
    ["backstage passes with  1 day  to concert",                   "Backstage passes to a TAFKAL80ETC concert",["sellIn", 1,  0], ["quality", 10, 13]],
    ["backstage passes with  0 days to concert",                   "Backstage passes to a TAFKAL80ETC concert",["sellIn", 0, -1], ["quality", 10,  0]],
    ["backstage passes with quality close to 50",                  "Backstage passes to a TAFKAL80ETC concert",["sellIn", 1,  0], ["quality", 48, 50]],
    ["backstage passes with quality close to 50",                  "Backstage passes to a TAFKAL80ETC concert",["sellIn", 1,  0], ["quality", 49, 50]],
    ["conjured item before sell date",                             "Conjured Mana Cake",                       ["sellIn", 2,  1], ["quality", 10,  8]],
    ["conjured item with small quality",                           "Conjured Mana Cake",                       ["sellIn", 2,  1], ["quality",  1,  0]],
    ["conjured item after sell date",                              "Conjured Mana Cake",                       ["sellIn", 0, -1], ["quality",  4,  0]],
    ["conjured item with zero quality",                            "Conjured Mana Cake",                       ["sellIn", 0, -1], ["quality",  0,  0]],
].forEach(([name, itemName, [_, sellInBefore, sellInAfter], [__, qualityBefore, qualityAfter]]) => {
    test(name, verify({
        itemName,
        sellIn: {before: sellInBefore, after: sellInAfter},
        quality: {before: qualityBefore, after: qualityAfter}
    }));
});