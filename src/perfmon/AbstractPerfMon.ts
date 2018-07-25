let _ = require('lodash');
let os = require('os');

import { ConfigParams, CounterType } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { Counter } from 'pip-services-commons-node';
import { CachedCounters } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ContextInfo } from 'pip-services-commons-node';

import { CounterV1 } from '../version1/CounterV1';
import { IPerfMonClientV1 } from '../version1/IPerfMonClientV1';

export abstract class AbstractPerfMon extends CachedCounters implements IReferenceable, IOpenable {
    private static readonly _defaultInterval: number = 1000;
    
    protected _client: IPerfMonClientV1;
    // protected _cache: CounterV1[] = [];
    protected cache: CounterV1[] = [];
    protected _interval: number = AbstractPerfMon._defaultInterval;
    protected _dumpCurl: any;
    protected _source: string;

    public constructor(client: IPerfMonClientV1) {
        super();
        this._client = client;
        this._dumpCurl = _.debounce(() => { this.dump() }, this._interval);
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        (this._client as any).configure(config);
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._source = config.getAsStringWithDefault("source", this._source);
        this._dumpCurl = _.debounce(() => { this.dump() }, this._interval);
    }
	
    public setReferences(references: IReferences): void {
        (this._client as any).setReferences(references);
        let contextInfo = references.getOneOptional<ContextInfo>(
            new Descriptor("pip-services", "context-info", "default", "*", "1.0"));
        if (contextInfo != null && this._source == null)
            this._source = contextInfo.name;
    }

    public isOpened(): boolean {
        return (this._client as any).isOpened();
    }

    public open(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).open(correlationId, callback);
    }

    public close(correlationId: string, callback?: (err: any) => void): void {
        (this._client as any).close(correlationId, callback);
        this.dump();
    }

    protected write(counterType: CounterType, name: string, last: number,
        count: number, min: number, max: number, average: number): void {
        let source: string = this._source || "unknown";
        let counter: CounterV1 = new CounterV1(name, source, counterType, last, 
            count, min, max, average);
		
        this.cache.push(counter);
		
        this._dumpCurl();
    }
    
    public clear(): void {
        this.cache = [];
    }

    public dump(): void {
        if (this.cache.length == 0) return;

        this._client.writeCounters('perfmon', this.cache, (err) => {});

        this.cache = [];
    }

    public save(counters: CounterV1[]): void {
        this._client.writeCounters('perfmon', counters, (err) => {});
    }

}
