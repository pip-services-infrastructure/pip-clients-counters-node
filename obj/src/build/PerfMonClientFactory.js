"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const DirectPerfMon_1 = require("../perfmon/DirectPerfMon");
const HttpPerfMon_1 = require("../perfmon/HttpPerfMon");
const SenecaPerfMon_1 = require("../perfmon/SenecaPerfMon");
const PerfMonNullClientV1_1 = require("../version1/PerfMonNullClientV1");
const PerfMonDirectClientV1_1 = require("../version1/PerfMonDirectClientV1");
const PerfMonHttpClientV1_1 = require("../version1/PerfMonHttpClientV1");
const PerfMonSenecaClientV1_1 = require("../version1/PerfMonSenecaClientV1");
class PerfMonClientFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(PerfMonClientFactory.DirectPerfMonDescriptor, DirectPerfMon_1.DirectPerfMon);
        this.registerAsType(PerfMonClientFactory.HttpPerfMonDescriptor, HttpPerfMon_1.HttpPerfMon);
        this.registerAsType(PerfMonClientFactory.SenecaPerfMonDescriptor, SenecaPerfMon_1.SenecaPerfMon);
        this.registerAsType(PerfMonClientFactory.NullClientV1Descriptor, PerfMonNullClientV1_1.PerfMonNullClientV1);
        this.registerAsType(PerfMonClientFactory.DirectClientV1Descriptor, PerfMonDirectClientV1_1.PerfMonDirectClientV1);
        this.registerAsType(PerfMonClientFactory.HttpClientV1Descriptor, PerfMonHttpClientV1_1.PerfMonHttpClientV1);
        this.registerAsType(PerfMonClientFactory.SenecaClientV1Descriptor, PerfMonSenecaClientV1_1.PerfMonSenecaClientV1);
    }
}
PerfMonClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'factory', 'default', 'default', '1.0');
PerfMonClientFactory.DirectPerfMonDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'counters', 'direct', 'default', '1.0');
PerfMonClientFactory.HttpPerfMonDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'counters', 'http', 'default', '1.0');
PerfMonClientFactory.SenecaPerfMonDescriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'counters', 'seneca', 'default', '1.0');
PerfMonClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'client', 'null', 'default', '1.0');
PerfMonClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'client', 'direct', 'default', '1.0');
PerfMonClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'client', 'http', 'default', '1.0');
PerfMonClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-perfmon', 'client', 'seneca', 'default', '1.0');
exports.PerfMonClientFactory = PerfMonClientFactory;
//# sourceMappingURL=PerfMonClientFactory.js.map