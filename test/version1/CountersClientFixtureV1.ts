let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { CounterType } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';

import { CounterV1 } from '../../src/version1/CounterV1';
import { ICountersClientV1 } from '../../src/version1/ICountersClientV1';

export class CountersClientFixtureV1 {
    private _client: ICountersClientV1;
    
    constructor(client: ICountersClientV1) {
        this._client = client;
    }
        
    testCrudOperations(done) {
         async.series([
            (callback) => {
                let counter = new CounterV1("counter1", CounterType.Statistics);
                counter.count = 1;
                counter.max = 10;
                counter.min = 1;
                counter.average = 5;

                this._client.writeCounter(
                    null, 
                    counter, 
                    (err, counter) => {
                        assert.isNull(err);
                        assert.isObject(counter);
                        callback(err);
                    }
                );
            },
            (callback) => {
                let counter1 = new CounterV1("counter1", CounterType.Statistics);
                counter1.count = 2;
                counter1.max = 7;
                counter1.min = 0;
                counter1.average = 5;

                let counter2 = new CounterV1("counter2", CounterType.Statistics);
                counter2.count = 1;

                this._client.writeCounters(
                    null,
                    [counter1, counter2],
                    (err) => {
                        assert.isNull(err);
                        callback(err);
                    }
                );
            },
            (callback) => {
                this._client.readCounters(
                    null, 
                    FilterParams.fromTuples("name", "counter1"), 
                    null,
                    (err, page) => {
                        assert.lengthOf(page.data, 1);

                        let counter = page.data[0];
                        assert.equal(3, counter.count);
                        assert.equal(0, counter.min);
                        assert.equal(10, counter.max);
                        assert.equal(5, counter.average);
                        
                        callback(err);
                    }
                );
            }
        ], done);
    }
}
