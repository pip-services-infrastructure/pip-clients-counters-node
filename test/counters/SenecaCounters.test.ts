let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { CountersMemoryPersistence } from 'pip-services-counters-node';
import { CountersController } from 'pip-services-counters-node';
import { CountersSenecaServiceV1 } from 'pip-services-counters-node';
import { SenecaCounters } from '../../src/counters/SenecaCounters';
import { CountersFixture } from './CountersFixture';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('CountersSenecaClient', () => {
    let service: CountersSenecaServiceV1;
    let logger: SenecaCounters;
    let fixture: CountersFixture;

    suiteSetup((done) => {
        let consoleCounters = new ConsoleLogger();
        let persistence = new CountersMemoryPersistence();
        let controller = new CountersController();

        service = new CountersSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consoleCounters,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-counters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-counters', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-counters', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        logger = new SenecaCounters();
        logger.configure(senecaConfig);
        logger.setReferences(references);

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
