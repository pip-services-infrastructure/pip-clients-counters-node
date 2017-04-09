"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
class CountersNullClientV1 {
    constructor(config) { }
    readCounters(correlationId, filter, paging, callback) {
        callback(null, new pip_services_commons_node_1.DataPage([], 0));
    }
    writeCounter(correlationId, counter, callback) {
        if (callback)
            callback(null, counter);
    }
    writeCounters(correlationId, counters, callback) {
        if (callback)
            callback(null);
    }
    clear(correlationId, callback) {
        if (callback)
            callback(null);
    }
}
exports.CountersNullClientV1 = CountersNullClientV1;
//# sourceMappingURL=CountersNullClientV1.js.map