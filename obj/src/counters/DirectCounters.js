"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCounters_1 = require("./AbstractCounters");
const CountersDirectClientV1_1 = require("../version1/CountersDirectClientV1");
class DirectCounters extends AbstractCounters_1.AbstractCounters {
    constructor() {
        super(new CountersDirectClientV1_1.CountersDirectClientV1());
    }
}
exports.DirectCounters = DirectCounters;
//# sourceMappingURL=DirectCounters.js.map