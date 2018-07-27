import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { CachedCounters } from 'pip-services-commons-node';
import { CounterV1 } from '../version1/CounterV1';
import { IPerfMonClientV1 } from '../version1/IPerfMonClientV1';
export declare abstract class AbstractPerfMon extends CachedCounters implements IReferenceable, IOpenable {
    protected _client: IPerfMonClientV1;
    constructor(client: IPerfMonClientV1);
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpened(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    save(counters: CounterV1[]): void;
}
