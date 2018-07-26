import { ConfigParams, CounterType } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { CachedCounters } from 'pip-services-commons-node';
import { CounterV1 } from '../version1/CounterV1';
import { IPerfMonClientV1 } from '../version1/IPerfMonClientV1';
export declare abstract class AbstractPerfMon extends CachedCounters implements IReferenceable, IOpenable {
    private static readonly _defaultInterval;
    protected _client: IPerfMonClientV1;
    protected cache: CounterV1[];
    protected _interval: number;
    protected _dumpCurl: any;
    protected _source: string;
    constructor(client: IPerfMonClientV1);
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpened(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    protected write(counterType: CounterType, name: string, last: number, count: number, min: number, max: number, average: number): void;
    clear(): void;
    dump(): void;
    save(counters: CounterV1[]): void;
}
