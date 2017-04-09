let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { CounterType } from 'pip-services-commons-node';
import { ICountersBusinessLogic } from 'pip-services-counters-node';
import { AbstractCounters } from '../../src/counters/AbstractCounters';

export class CountersFixture {
    private _counters: AbstractCounters;
    private _controller: ICountersBusinessLogic;

    public constructor(counters: AbstractCounters, controller: ICountersBusinessLogic) {
        this._counters = counters;
        this._controller = controller;
    }

    public testSimpleCounters(done) {
        this._counters.last("Test.LastValue", 123);
        this._counters.last("Test.LastValue", 123456);

        var counter = this._counters.get("Test.LastValue", CounterType.LastValue);
        assert.isNotNull(counter);
        assert.isNotNull(counter.last);
        assert.equal(counter.last, 123456, 3);

        this._counters.incrementOne("Test.Increment");
        this._counters.increment("Test.Increment", 3);

        counter = this._counters.get("Test.Increment", CounterType.Increment);
        assert.isNotNull(counter);
        assert.equal(counter.count, 4);

        this._counters.timestampNow("Test.Timestamp");
        this._counters.timestampNow("Test.Timestamp");

        counter = this._counters.get("Test.Timestamp", CounterType.Timestamp);
        assert.isNotNull(counter);
        assert.isNotNull(counter.time);

        this._counters.stats("Test.Statistics", 1);
        this._counters.stats("Test.Statistics", 2);
        this._counters.stats("Test.Statistics", 3);

        counter = this._counters.get("Test.Statistics", CounterType.Statistics);
        assert.isNotNull(counter);
        assert.equal(counter.average, 2, 3);

        this._counters.dump();

        // Check that something was written
        setTimeout(() => {
            this._controller.readCounters(
                null, null, null,
                (err, page) => {
                    assert.isNull(err);

                    assert.isObject(page);
                    assert.isTrue(page.data.length > 0);

                    done();
                }
            );
        }, 500);
    }
}