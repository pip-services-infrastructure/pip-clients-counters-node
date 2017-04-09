let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { CountersMemoryPersistence } from 'pip-services-counters-node';
import { CountersController } from 'pip-services-counters-node';
import { DirectCounters } from '../../src/counters/DirectCounters';
import { CountersFixture } from './CountersFixture';

suite('DirectCounters', ()=> {
    let logger: DirectCounters;
    let fixture: CountersFixture;

    suiteSetup((done) => {
        let consoleCounters = new ConsoleLogger();
        let persistence = new CountersMemoryPersistence();
        let controller = new CountersController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consoleCounters,
            new Descriptor('pip-services-counters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-counters', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        logger = new DirectCounters();
        logger.setReferences(references);

        fixture = new CountersFixture(logger, controller);

        logger.open(null, done);
    });
    
    suiteTeardown((done) => {
        logger.close(null, done);
    });

    test('Simple counters', (done) => {
        fixture.testSimpleCounters(done);
    });

});
