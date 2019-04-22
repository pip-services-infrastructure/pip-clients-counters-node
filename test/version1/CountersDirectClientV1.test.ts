let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PerfMonMemoryPersistence } from 'pip-services-perfmon-node';
import { PerfMonController } from 'pip-services-perfmon-node';
import { IPerfMonClientV1 } from '../../src/version1/IPerfMonClientV1';
import { PerfMonDirectClientV1 } from '../../src/version1/PerfMonDirectClientV1';
import { PerfMonClientFixtureV1 } from './PerfMonClientFixtureV1';

suite('PerfMonDirectClientV1', ()=> {
    let client: PerfMonDirectClientV1;
    let fixture: PerfMonClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-perfmon', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new PerfMonDirectClientV1();
        client.setReferences(references);

        fixture = new PerfMonClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
