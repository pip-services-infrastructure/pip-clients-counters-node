"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
class AbstractPerfMon extends pip_services_commons_node_1.CachedCounters {
    constructor(client) {
        super();
        this._client = client;
    }
    configure(config) {
        super.configure(config);
        this._client.configure(config);
    }
    setReferences(references) {
        this._client.setReferences(references);
    }
    isOpened() {
        return this._client.isOpened();
    }
    open(correlationId, callback) {
        this._client.open(correlationId, callback);
    }
    close(correlationId, callback) {
        this._client.close(correlationId, callback);
    }
    save(counters) {
        this._client.writeCounters('counters', counters, (err) => { });
    }
}
exports.AbstractPerfMon = AbstractPerfMon;
//# sourceMappingURL=AbstractPerfMon.js.map