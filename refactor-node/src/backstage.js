function update(originalItem) {
    const item = {...originalItem};

    item.quality += 1;
    if (item.sellIn <= 10) item.quality += 1;
    if (item.sellIn <= 5) item.quality += 1;
    if (item.quality > 50) item.quality = 50;
    if (item.sellIn <= 0) item.quality = 0;
    item.sellIn -= 1;

    return item;
}

module.exports = update;