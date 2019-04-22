"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_components_node_2 = require("pip-services3-components-node");
class PerfMonDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-perfmon", "controller", "*", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._logger = new pip_services3_components_node_1.CompositeLogger();
        this._counters = new pip_services3_components_node_2.CompositeCounters();
    }
    readCounters(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'counters.read_counters');
        this._controller.readCounters(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    writeCounter(correlationId, counter, callback) {
        let timing = this.instrument(correlationId, 'counters.write_counter');
        this._controller.writeCounter(correlationId, counter, (err, counter) => {
            timing.endTiming();
            if (callback)
                callback(err, counter);
        });
    }
    writeCounters(correlationId, counters, callback) {
        let timing = this.instrument(correlationId, 'counters.write_counters');
        this._controller.writeCounters(correlationId, counters, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    clear(correlationId, callback) {
        let timing = this.instrument(correlationId, 'counters.clear');
        this._controller.clear(correlationId, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
}
exports.PerfMonDirectClientV1 = PerfMonDirectClientV1;
//# sourceMappingURL=PerfMonDirectClientV1.js.map