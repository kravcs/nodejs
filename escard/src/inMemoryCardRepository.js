const cardFactory = require('../src/card');

module.exports = function cardRepository(recreateFrom) {
let cards = {};

    return {
        async save(card) {
            const oldEvents = cards[card.uuid()] || [];
            const allEvents = [...oldEvents, ...card.pendingEvents()];
            card.flushEvents();
            cards[card.uuid()] = allEvents;
        },
        async load(uuid) {
            return recreateFrom(uuid, cards[uuid] || []);
        }
    }
}