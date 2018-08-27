let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { PerfMonMemoryPersistence } from 'pip-services-perfmon-node';
import { PerfMonController } from 'pip-services-perfmon-node';
import { DirectPerfMon } from '../../src/perfmon/DirectPerfmon';
import { PerfMonFixture } from './PerfMonFixture';

suite('DirectPerfMon', ()=> {
    let logger: DirectPerfMon;
    let fixture: PerfMonFixture;

    suiteSetup((done) => {
        let consolePerfMon = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), consolePerfMon,
            new Descriptor('pip-services-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-perfmon', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        logger = new DirectPerfMon();
        logger.setReferences(references);

        fixture = new PerfMonFixture(logger, controller);

        logger.open(null, done);
    });
    
    suiteTeardown((done) => {
        logger.close(null, done);
    });

    test('Simple perfmon', (done) => {
        fixture.testSimplePerfMon(done);
    });

});
