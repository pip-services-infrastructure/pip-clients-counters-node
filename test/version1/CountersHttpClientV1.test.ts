let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { PerfMonMemoryPersistence } from 'pip-services-perfmon-node';
import { PerfMonController } from 'pip-services-perfmon-node';
import { PerfMonHttpServiceV1 } from 'pip-services-perfmon-node';
import { IPerfMonClientV1 } from '../../src/version1/IPerfMonClientV1';
import { PerfMonHttpClientV1 } from '../../src/version1/PerfMonHttpClientV1';
import { PerfMonClientFixtureV1 } from './PerfMonClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('PerfMonHttpClientV1', ()=> {
    let service: PerfMonHttpServiceV1;
    let client: PerfMonHttpClientV1;
    let fixture: PerfMonClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        service = new PerfMonHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-perfmon', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-perfmon', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new PerfMonHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new PerfMonClientFixtureV1(client);

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
