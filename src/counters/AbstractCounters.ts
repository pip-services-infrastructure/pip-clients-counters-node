import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { Counter } from 'pip-services-commons-node';
import { CachedCounters } from 'pip-services-commons-node';

import { CounterV1 } from '../version1/CounterV1';
import { ICountersClientV1 } from '../version1/ICountersClientV1';

export abstract class AbstractCounters extends CachedCounters implements IReferenceable, IOpenable {
    protected _client: ICountersClientV1;

    public constructor(client: ICountersClientV1) {
        super();
        this._client = client;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        (this._client as any).configure(config);
    }
	
    public setReferences(references: IReferences): void {
        (this._client as any).setReferences(references);
    }

    public isOpened(): boolean {
        return (this._client as any).isOpened();
    }

    public open(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).open(correlationId, callback);
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).close(correlationId, callback);
    }

    public save(counters: Counter[]): void {
        this._client.writeCounters('counters', counters, (err) => {});
    }

}
