import { AbstractCounters } from './AbstractCounters';
import { CountersDirectClientV1 } from '../version1/CountersDirectClientV1';

export class DirectCounters extends AbstractCounters {
    public constructor() {
        super(new CountersDirectClientV1());
    }
}