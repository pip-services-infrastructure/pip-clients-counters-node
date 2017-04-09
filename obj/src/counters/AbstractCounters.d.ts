import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { Counter } from 'pip-services-commons-node';
import { CachedCounters } from 'pip-services-commons-node';
import { ICountersClientV1 } from '../version1/ICountersClientV1';
export declare abstract class AbstractCounters extends CachedCounters implements IReferenceable, IOpenable {
    protected _client: ICountersClientV1;
    constructor(client: ICountersClientV1);
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpened(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    close(correlationId: string, callback?: (err: any) => void): void;
    save(counters: Counter[]): void;
}
