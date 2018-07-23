let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { PerfMonMemoryPersistence } from 'pip-services-perfmon-node';
import { PerfMonController } from 'pip-services-perfmon-node';
import { PerfMonHttpServiceV1 } from 'pip-services-perfmon-node';
import { HttpPerfMon } from '../../src/perfmon/HttpPerfmon';
import { PerfMonFixture } from './PerfMonFixture';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('PerfMonHttpClientV1', ()=> {
    let service: PerfMonHttpServiceV1;
    let logger: HttpPerfMon;
    let fixture: PerfMonFixture;

    suiteSetup((done) => {
        let consolePerfMon = new ConsoleLogger();
        let persistence = new PerfMonMemoryPersistence();
        let controller = new PerfMonController();

        service = new PerfMonHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), consolePerfMon,
            new Descriptor('pip-services-perfmon', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-perfmon', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-perfmon', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        logger = new HttpPerfMon();
        logger.configure(httpConfig);

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
