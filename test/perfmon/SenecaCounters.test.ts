let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { PerfMonMemoryPersistence } from 'pip-services-perfmon-node';
import { PerfMonController } from 'pip-services-perfmon-node';
import { PerfMonSenecaServiceV1 } from 'pip-services-perfmon-node';
import { SenecaPerfMon } from '../../src/perfmon/SenecaPerfmon';
import { PerfMonFixture } from './PerfMonFixture';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('PerfMonSenecaClient', () => {
    let service: PerfMonSenecaServiceV1;
    let logger: SenecaPerfMon;
    let fixture: PerfMonFixture;

    suiteSetup((done) => {
        let consolePerfMon = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        service = new PerfMonSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consolePerfMon,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-perfmon', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-perfmon', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        logger = new SenecaPerfMon();
        logger.configure(senecaConfig);
        logger.setReferences(references);

        fixture = new PerfMonFixture(logger, controller);

        service.open(null, (err) => {
            logger.open(null, done);
        });
    });

    suiteTeardown((done) => {
        logger.close(null);
        service.close(null, done);
    });

    test('Simple perfmon', (done) => {
        fixture.testSimplePerfMon(done);
    });

});
