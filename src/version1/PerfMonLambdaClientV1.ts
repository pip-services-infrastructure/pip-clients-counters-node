import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';

import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';

export class PerfMonLambdaClientV1 extends CommandableLambdaClient implements IPerfMonClientV1 {

    constructor(config?: any) {
        super('perfmon');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public readCounters(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CounterV1>) => void) {
        this.callCommand(
            'read_counters',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public writeCounter(correlationId: string, counter: CounterV1,
        callback?: (err: any, counter: CounterV1) => void) {
        this.callCommand(
            'write_counter',
            correlationId,
            {
                counter: counter
            }, 
            callback
        );
    }

    public writeCounters(correlationId: string, counters: CounterV1[],
        callback?: (err: any) => void) {
        this.callCommand(
            'write_counters',
            correlationId,
            {
                counters: counters
            }, 
            callback
        );
    }

    public clear(correlationId: string, callback?: (err: any) => void) {
        this.callCommand(
            'clear',
            correlationId,
            null, 
            callback
        );
    }
}
