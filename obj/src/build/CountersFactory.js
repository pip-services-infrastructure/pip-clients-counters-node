"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
// import { DirectCounters } from '../log/DirectCounters';
// import { HttpCounters } from '../log/HttpCounters';
// import { SenecaCounters } from '../log/SenecaCounters';
const CountersNullClientV1_1 = require("../version1/CountersNullClientV1");
const CountersDirectClientV1_1 = require("../version1/CountersDirectClientV1");
const CountersHttpClientV1_1 = require("../version1/CountersHttpClientV1");
const CountersSenecaClientV1_1 = require("../version1/CountersSenecaClientV1");
class CountersFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        // this.registerAsType(CountersFactory.DirectCountersDescriptor, DirectCounters);
        // this.registerAsType(CountersFactory.HttpCountersDescriptor, HttpCounters);
        // this.registerAsType(CountersFactory.SenecaCountersDescriptor, SenecaCounters);
        this.registerAsType(CountersFactory.NullClientV1Descriptor, CountersNullClientV1_1.CountersNullClientV1);
        this.registerAsType(CountersFactory.DirectClientV1Descriptor, CountersDirectClientV1_1.CountersDirectClientV1);
        this.registerAsType(CountersFactory.HttpClientV1Descriptor, CountersHttpClientV1_1.CountersHttpClientV1);
        this.registerAsType(CountersFactory.SenecaClientV1Descriptor, CountersSenecaClientV1_1.CountersSenecaClientV1);
    }
}
CountersFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'factory', 'default', 'default', '1.0');
CountersFactory.DirectCountersDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'logger', 'direct', 'default', '1.0');
CountersFactory.HttpCountersDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'logger', 'http', 'default', '1.0');
CountersFactory.SenecaCountersDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'logger', 'seneca', 'default', '1.0');
CountersFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'null', 'default', '1.0');
CountersFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'direct', 'default', '1.0');
CountersFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'http', 'default', '1.0');
CountersFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'seneca', 'default', '1.0');
exports.CountersFactory = CountersFactory;
//# sourceMappingURL=CountersFactory.js.map