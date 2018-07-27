import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { IPerfMonClientV1 } from './IPerfMonClientV1';
import { IPerfMonController } from 'pip-services-perfmon-node';
import { CounterV1 } from './CounterV1';

export class PerfMonDirectClientV1 extends DirectClient<any> implements IPerfMonClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-perfmon", "controller", "*", "*", "*"))
    }

    public readCounters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<CounterV1>) => void): void {
        let timing = this.instrument(correlationId, 'perfmon.read_counters');
        this._controller.readCounters(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public writeCounter(correlationId: string, counter: CounterV1, 
        callback?: (err: any, counter: CounterV1) => void): void {
        let timing = this.instrument(correlationId, 'perfmon.write_counter');
        this._controller.writeCounter(correlationId, counter, (err, counter) => {
            timing.endTiming();
            if (callback) callback(err, counter);
        });
    }

    public writeCounters(correlationId: string, counters: CounterV1[], 
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'perfmon.write_counters');
        this._controller.writeCounters(correlationId, counters, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'perfmon.clear');
        this._controller.clear(correlationId, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

}