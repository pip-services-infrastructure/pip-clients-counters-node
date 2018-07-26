"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const CounterV1_1 = require("../version1/CounterV1");
class AbstractPerfMon extends pip_services_commons_node_1.CachedCounters {
    constructor(client) {
        super();
        // protected _cache: CounterV1[] = [];
        this.cache = [];
        this._interval = AbstractPerfMon._defaultInterval;
        this._client = client;
        this._dumpCurl = _.debounce(() => { this.dump(); }, this._interval);
    }
    configure(config) {
        super.configure(config);
        this._client.configure(config);
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._source = config.getAsStringWithDefault("source", this._source);
        this._dumpCurl = _.debounce(() => { this.dump(); }, this._interval);
    }
    setReferences(references) {
        this._client.setReferences(references);
        let contextInfo = references.getOneOptional(new pip_services_commons_node_2.Descriptor("pip-services", "context-info", "default", "*", "1.0"));
        if (contextInfo != null && this._source == null)
            this._source = contextInfo.name;
    }
    isOpened() {
        return this._client.isOpened();
    }
    open(correlationId, callback) {
        this._client.open(correlationId, callback);
    }
    close(correlationId, callback) {
        this._client.close(correlationId, callback);
        this.dump();
    }
    write(counterType, name, last, count, min, max, average) {
        let source = this._source || "unknown";
        let counter = new CounterV1_1.CounterV1(name, source, counterType, last, count, min, max, average);
        this.cache.push(counter);
        this._dumpCurl();
    }
    clear() {
        this.cache = [];
    }
    dump() {
        if (this.cache.length == 0)
            return;
        this._client.writeCounters('perfmon', this.cache, (err) => { });
        this.cache = [];
    }
    save(counters) {
        this._client.writeCounters('perfmon', counters, (err) => { });
    }
}
AbstractPerfMon._defaultInterval = 1000;
exports.AbstractPerfMon = AbstractPerfMon;
//# sourceMappingURL=AbstractPerfMon.js.map