"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractPerfMon_1 = require("./AbstractPerfMon");
const PerfMonHttpClientV1_1 = require("../version1/PerfMonHttpClientV1");
class HttpPerfMon extends AbstractPerfMon_1.AbstractPerfMon {
    constructor() {
        super(new PerfMonHttpClientV1_1.PerfMonHttpClientV1());
    }
}
exports.HttpPerfMon = HttpPerfMon;
//# sourceMappingURL=HttpPerfMon.js.map