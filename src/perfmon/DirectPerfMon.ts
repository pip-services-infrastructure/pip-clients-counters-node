import { AbstractPerfMon } from './AbstractPerfMon';
import { PerfMonDirectClientV1 } from '../version1/PerfMonDirectClientV1';

export class DirectPerfMon extends AbstractPerfMon {
    public constructor() {
        super(new PerfMonDirectClientV1());
    }
}