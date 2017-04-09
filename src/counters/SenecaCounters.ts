import { AbstractCounters } from './AbstractCounters';
import { CountersSenecaClientV1 } from '../version1/CountersSenecaClientV1';

export class SenecaCounters extends AbstractCounters {
    public constructor() {
        super(new CountersSenecaClientV1());
    }
}