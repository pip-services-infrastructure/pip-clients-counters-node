"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const DirectCounters_1 = require("../counters/DirectCounters");
const HttpCounters_1 = require("../counters/HttpCounters");
const SenecaCounters_1 = require("../counters/SenecaCounters");
const CountersNullClientV1_1 = require("../version1/CountersNullClientV1");
const CountersDirectClientV1_1 = require("../version1/CountersDirectClientV1");
const CountersHttpClientV1_1 = require("../version1/CountersHttpClientV1");
const CountersSenecaClientV1_1 = require("../version1/CountersSenecaClientV1");
class CountersClientFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(CountersClientFactory.DirectCountersDescriptor, DirectCounters_1.DirectCounters);
        this.registerAsType(CountersClientFactory.HttpCountersDescriptor, HttpCounters_1.HttpCounters);
        this.registerAsType(CountersClientFactory.SenecaCountersDescriptor, SenecaCounters_1.SenecaCounters);
        this.registerAsType(CountersClientFactory.NullClientV1Descriptor, CountersNullClientV1_1.CountersNullClientV1);
        this.registerAsType(CountersClientFactory.DirectClientV1Descriptor, CountersDirectClientV1_1.CountersDirectClientV1);
        this.registerAsType(CountersClientFactory.HttpClientV1Descriptor, CountersHttpClientV1_1.CountersHttpClientV1);
        this.registerAsType(CountersClientFactory.SenecaClientV1Descriptor, CountersSenecaClientV1_1.CountersSenecaClientV1);
    }
}
CountersClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'factory', 'default', 'default', '1.0');
CountersClientFactory.DirectCountersDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'logger', 'direct', 'default', '1.0');
CountersClientFactory.HttpCountersDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'logger', 'http', 'default', '1.0');
CountersClientFactory.SenecaCountersDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'logger', 'seneca', 'default', '1.0');
CountersClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'null', 'default', '1.0');
CountersClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'direct', 'default', '1.0');
CountersClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'http', 'default', '1.0');
CountersClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-counters', 'client', 'seneca', 'default', '1.0');
exports.CountersClientFactory = CountersClientFactory;
//# sourceMappingURL=CountersClientFactory.js.map