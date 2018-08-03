import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';
import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';
export declare class PerfMonLambdaClientV1 extends CommandableLambdaClient implements IPerfMonClientV1 {
    constructor(config?: any);
    setReferences(references: IReferences): void;
    readCounters(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CounterV1>) => void): void;
    writeCounter(correlationId: string, counter: CounterV1, callback?: (err: any, counter: CounterV1) => void): void;
    writeCounters(correlationId: string, counters: CounterV1[], callback?: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
