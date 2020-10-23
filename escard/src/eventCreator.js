const {CARD_REPAID, CARD_WITHDRAWN, LIMIT_ASSIGNED} = require("./eventTypes");

module.exports = function cardEventCreator(now, card_id) {
    return {
        cardRepaid(amount) {
            return {type: CARD_REPAID, amount, card_id, date: now().toJSON()};
        },
        cardWithdrawn(amount) {
            return {type: CARD_WITHDRAWN, amount, card_id, date: now().toJSON()};
        },
        limitAssigned(amount) {
            return {type: LIMIT_ASSIGNED, amount, card_id, date: now().toJSON()};
        }
    };
}