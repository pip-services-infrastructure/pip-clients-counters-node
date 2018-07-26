"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractPerfMon_1 = require("./AbstractPerfMon");
const PerfMonDirectClientV1_1 = require("../version1/PerfMonDirectClientV1");
class DirectPerfMon extends AbstractPerfMon_1.AbstractPerfMon {
    constructor() {
        super(new PerfMonDirectClientV1_1.PerfMonDirectClientV1());
    }
}
exports.DirectPerfMon = DirectPerfMon;
//# sourceMappingURL=DirectPerfmon.js.map