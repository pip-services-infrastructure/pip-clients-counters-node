import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CounterV1 } from './CounterV1';
import { ICountersClientV1 } from './ICountersClientV1';

export class CountersNullClientV1 implements ICountersClientV1 {
    constructor(config?: any) {}
        
    public readCounters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<CounterV1>) => void): void {
        callback(null, new DataPage<CounterV1>([], 0));
    }

    public writeCounter(correlationId: string, counter: CounterV1, 
        callback?: (err: any, counter: CounterV1) => void): void {
        if (callback) callback(null, counter);
    }

    public writeCounters(correlationId: string, counters: CounterV1[], 
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        if (callback) callback(null);
    }
}
