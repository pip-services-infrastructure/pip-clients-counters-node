"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCounters_1 = require("./AbstractCounters");
const CountersSenecaClientV1_1 = require("../version1/CountersSenecaClientV1");
class SenecaCounters extends AbstractCounters_1.AbstractCounters {
    constructor() {
        super(new CountersSenecaClientV1_1.CountersSenecaClientV1());
    }
}
exports.SenecaCounters = SenecaCounters;
//# sourceMappingURL=SenecaCounters.js.map