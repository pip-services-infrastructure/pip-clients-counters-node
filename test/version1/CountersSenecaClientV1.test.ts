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
import { ICountersClientV1 } from '../../src/version1/ICountersClientV1';
import { CountersSenecaClientV1 } from '../../src/version1/CountersSenecaClientV1';
import { CountersClientFixtureV1 } from './CountersClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('CountersSenecaClient', () => {
    let service: CountersSenecaServiceV1;
    let client: CountersSenecaClientV1;
    let fixture: CountersClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new CountersMemoryPersistence();
        let controller = new CountersController();

        service = new CountersSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-counters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-counters', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-counters', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new CountersSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

        fixture = new CountersClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
