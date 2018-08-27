let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { PerfMonMemoryPersistence } from 'pip-services-perfmon-node';
import { PerfMonController } from 'pip-services-perfmon-node';
import { PerfMonSenecaServiceV1 } from 'pip-services-perfmon-node';
import { IPerfMonClientV1 } from '../../src/version1/IPerfMonClientV1';
import { PerfMonSenecaClientV1 } from '../../src/version1/PerfMonSenecaClientV1';
import { PerfMonClientFixtureV1 } from './PerfMonClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('PerfMonSenecaClient', () => {
    let service: PerfMonSenecaServiceV1;
    let client: PerfMonSenecaClientV1;
    let fixture: PerfMonClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        service = new PerfMonSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-perfmon', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-perfmon', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new PerfMonSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
