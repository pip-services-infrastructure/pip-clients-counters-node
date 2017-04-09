"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCounters_1 = require("./AbstractCounters");
const CountersHttpClientV1_1 = require("../version1/CountersHttpClientV1");
class HttpCounters extends AbstractCounters_1.AbstractCounters {
    constructor() {
        super(new CountersHttpClientV1_1.CountersHttpClientV1());
    }
}
exports.HttpCounters = HttpCounters;
//# sourceMappingURL=HttpCounters.js.map