import { CounterType } from 'pip-services3-components-node';

export class CounterV1 {
    public constructor(name: string, source:
        string, type: CounterType, last: number,
        count: number, min: number, max: number,
        average: number) {
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

    public name: string;
    public source: string;
    public type: CounterType;
    public last: number;
    public count: number;
    public min: number;
    public max: number;
    public average: number;
    public time: Date;
}