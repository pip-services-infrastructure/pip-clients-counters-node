let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { CountersMemoryPersistence } from 'pip-services-counters-node';
import { CountersController } from 'pip-services-counters-node';
import { CountersHttpServiceV1 } from 'pip-services-counters-node';
import { HttpCounters } from '../../src/counters/HttpCounters';
import { CountersFixture } from './CountersFixture';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('CountersHttpClientV1', ()=> {
    let service: CountersHttpServiceV1;
    let logger: HttpCounters;
    let fixture: CountersFixture;

    suiteSetup((done) => {
        let consoleCounters = new ConsoleLogger();
        let persistence = new CountersMemoryPersistence();
        let controller = new CountersController();

        service = new CountersHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consoleCounters,
            new Descriptor('pip-services-counters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-counters', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-counters', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        logger = new HttpCounters();
        logger.configure(httpConfig);

        fixture = new CountersFixture(logger, controller);

        service.open(null, (err) => {
            logger.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        logger.close(null);
        service.close(null, done);
    });

    test('Simple counters', (done) => {
        fixture.testSimpleCounters(done);
    });

});
