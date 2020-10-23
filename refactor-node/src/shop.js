const Normal = require("./normal");
const Brie = require("./brie");
const Backstage = require("./backstage");
const Conjured = require("./conjured");

const update = {
    "Aged Brie": Brie,
    "Sulfuras, Hand of Ragnaros": item => item,
    "Backstage passes to a TAFKAL80ETC concert": Backstage,
    "Conjured Mana Cake": Conjured
};

function updateItem(item) {
    return (update[item.name] || Normal)(item)
}

function updateQuality(items) {
    return items.map(updateItem);
}

module.exports = updateQuality;