let _ = require('lodash');
let os = require('os');

import { ConfigParams } from 'pip-services3-commons-node';
import { CounterType } from 'pip-services3-components-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { IOpenable } from 'pip-services3-commons-node';
import { Counter } from 'pip-services3-components-node';
import { CachedCounters } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';
import { ContextInfo } from 'pip-services3-components-node';
import { CompositeLogger } from 'pip-services3-components-node'
import { CompositeCounters } from 'pip-services3-components-node'

import { CounterV1 } from '../version1/CounterV1';
import { IPerfMonClientV1 } from '../version1/IPerfMonClientV1';

export abstract class AbstractPerfMon extends CachedCounters implements IReferenceable, IOpenable {
    
    protected _client: IPerfMonClientV1;
    protected _source: string;

    public constructor(client: IPerfMonClientV1) {
        super();
        this._client = client;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._source = config.getAsStringWithDefault("source", this._source);
        (this._client as any).configure(config);
    }
	
    public setReferences(references: IReferences): void {
        (this._client as any).setReferences(references);
        (this._client as any)._logger = new CompositeLogger();
        (this._client as any)._counters = new CompositeCounters();
        let contextInfo = references.getOneOptional<ContextInfo>(
            new Descriptor("pip-services", "context-info", "default", "*", "1.0"));
        if (contextInfo != null && this._source == null)
            this._source = contextInfo.name;
    }

    public isOpen(): boolean {
        return (this._client as any).isOpened();
    }

    public open(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).open(correlationId, callback);
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).close(correlationId, callback);
        this.dump();
    }

    public save(counters: CounterV1[]): void {
        counters.forEach(counter => {
            counter.source = counter.source || this._source || "unknown";
        });
        this._client.writeCounters('counters', counters, (err) => {});
    }

}
