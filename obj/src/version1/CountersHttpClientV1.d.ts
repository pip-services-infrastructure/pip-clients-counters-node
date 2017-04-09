import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableHttpClient } from 'pip-services-net-node';
import { CounterV1 } from './CounterV1';
import { ICountersClientV1 } from './ICountersClientV1';
export declare class CountersHttpClientV1 extends CommandableHttpClient implements ICountersClientV1 {
    constructor(config?: any);
    readCounters(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CounterV1>) => void): void;
    writeCounter(correlationId: string, counter: CounterV1, callback?: (err: any, counter: CounterV1) => void): void;
    writeCounters(correlationId: string, counters: CounterV1[], callback?: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
