import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';
import { CompositeLogger } from 'pip-services3-components-node'
import { CompositeCounters } from 'pip-services3-components-node'

import { CounterV1 } from './CounterV1';
import { IPerfMonClientV1 } from './IPerfMonClientV1';

export class PerfMonHttpClientV1 extends CommandableHttpClient implements IPerfMonClientV1 {

    constructor(config?: any) {
        super('v1/perfmon');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public setReferences(references: IReferences) {
        super.setReferences(references);
        this._logger = new CompositeLogger();
        this._counters = new CompositeCounters();
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
