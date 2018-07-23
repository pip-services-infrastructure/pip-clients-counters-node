"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class PerfMonHttpClientV1 extends pip_services_net_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/perfmon');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    readCounters(correlationId, filter, paging, callback) {
        this.callCommand('read_counters', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    writeCounter(correlationId, counter, callback) {
        this.callCommand('write_counter', correlationId, {
            counter: counter
        }, callback);
    }
    writeCounters(correlationId, counters, callback) {
        this.callCommand('write_counters', correlationId, {
            counters: counters
        }, callback);
    }
    clear(correlationId, callback) {
        this.callCommand('clear', correlationId, null, callback);
    }
}
exports.PerfMonHttpClientV1 = PerfMonHttpClientV1;
//# sourceMappingURL=PerfMonHttpClientV1.js.map