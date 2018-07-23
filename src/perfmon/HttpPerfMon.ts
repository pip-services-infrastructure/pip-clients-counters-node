import { AbstractPerfMon } from './AbstractPerfMon';
import { PerfMonHttpClientV1 } from '../version1/PerfMonHttpClientV1';

export class HttpPerfMon extends AbstractPerfMon {
    public constructor() {
        super(new PerfMonHttpClientV1());
    }
}