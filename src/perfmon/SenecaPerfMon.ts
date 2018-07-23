import { AbstractPerfMon } from './AbstractPerfMon';
import { PerfMonSenecaClientV1 } from '../version1/PerfMonSenecaClientV1';

export class SenecaPerfMon extends AbstractPerfMon {
    public constructor() {
        super(new PerfMonSenecaClientV1());
    }
}