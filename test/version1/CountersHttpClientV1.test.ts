let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { CountersMemoryPersistence } from 'pip-services-counters-node';
import { CountersController } from 'pip-services-counters-node';
import { CountersHttpServiceV1 } from 'pip-services-counters-node';
import { ICountersClientV1 } from '../../src/version1/ICountersClientV1';
import { CountersHttpClientV1 } from '../../src/version1/CountersHttpClientV1';
import { CountersClientFixtureV1 } from './CountersClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('CountersHttpClientV1', ()=> {
    let service: CountersHttpServiceV1;
    let client: CountersHttpClientV1;
    let fixture: CountersClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new CountersMemoryPersistence();
        let controller = new CountersController();

        service = new CountersHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-counters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-counters', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-counters', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new CountersHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

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
