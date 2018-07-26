"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractPerfMon_1 = require("./AbstractPerfMon");
const PerfMonSenecaClientV1_1 = require("../version1/PerfMonSenecaClientV1");
class SenecaPerfMon extends AbstractPerfMon_1.AbstractPerfMon {
    constructor() {
        super(new PerfMonSenecaClientV1_1.PerfMonSenecaClientV1());
    }
}
exports.SenecaPerfMon = SenecaPerfMon;
//# sourceMappingURL=SenecaPerfmon.js.map