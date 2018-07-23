import { YamlConfigReader } from 'pip-services-commons-node';
import { PerfMonClientFixtureV1 } from './PerfMonClientFixtureV1';
import { PerfMonLambdaClientV1 } from '../../src/version1/PerfMonLambdaClientV1';

suite('PerfMonLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: PerfMonLambdaClientV1;
    let fixture: PerfMonClientFixtureV1;

    setup((done) => {
        client = new PerfMonLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new PerfMonClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});