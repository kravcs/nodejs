const eventCreator = require("./eventCreator");
const eventTracker = require("./eventTracker");
const {CARD_REPAID, CARD_WITHDRAWN, LIMIT_ASSIGNED} = require("./eventTypes");
const ClientError = require("./ClientError");

module.exports = function cardModule(now) {
    function card(card_id) {

        let {cardRepaid, cardWithdrawn, limitAssigned} = eventCreator(now, card_id);
        let {applyWithRecord, ...tracker} = eventTracker(apply);
        let limit;
        let used = 0;

        // invariant
        function limitAlreadyAssigned() {
            return limit != null;
        }

        function notEnoughMoney(amount) {
            return amount > availableLimit();
        }

        function availableLimit() {
            return limit - used;
        }

        function apply(event) {
            if(event.type === LIMIT_ASSIGNED) {
                limit = event.amount;
            }
            if(event.type === CARD_WITHDRAWN) {
                used += event.amount;
            }
            if(event.type === CARD_REPAID) {
                used -= event.amount;
            }
        }

        return {
            ...tracker,
            uuid() {
              return card_id;
            },
            apply,
            assignLimit(amount) {
                if(limitAlreadyAssigned()) {
                    throw new ClientError('Cannot assign limit for the second time');
                }
                applyWithRecord(limitAssigned(amount));
            },
            availableLimit,
            withdraw(amount) {
                if(!limitAlreadyAssigned()) {
                    throw new ClientError('No limit assigned');
                }
                if (notEnoughMoney(amount)) {
                    throw new ClientError('Not enough money');
                }
                applyWithRecord(cardWithdrawn(amount));
            },
            repay(amount) {
                applyWithRecord(cardRepaid(amount));
            }
        };
    }

    function recreateFrom(card_id, events) {
        return events.reduce(function(card, event) {
            card.apply(event);
            return card;
        }, card(card_id));
    }

    return {card, recreateFrom}
};
