import { AbstractCounters } from './AbstractCounters';
import { CountersHttpClientV1 } from '../version1/CountersHttpClientV1';

export class HttpCounters extends AbstractCounters {
    public constructor() {
        super(new CountersHttpClientV1());
    }
}