function update(originalItem) {
    const item = {...originalItem};

    if (item.sellIn > 0) item.quality += 1;
    if (item.sellIn <= 0) item.quality += 2;
    if (item.quality > 50) item.quality = 50;

    item.sellIn -= 1;

    return item;
}

module.exports = update;