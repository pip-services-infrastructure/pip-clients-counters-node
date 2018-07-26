"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CounterV1 {
    constructor(name, source, type, last, count, min, max, average) {
        this.time = new Date();
        this.name = name;
        this.type = type;
        this.source = source;
        this.last = last;
        this.count = count;
        this.min = min;
        this.max = max;
        this.average = average;
    }
}
exports.CounterV1 = CounterV1;
//# sourceMappingURL=CounterV1.js.map