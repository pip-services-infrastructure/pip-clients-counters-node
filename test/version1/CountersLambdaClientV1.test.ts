import { YamlConfigReader } from 'pip-services-commons-node';
import { CountersClientFixtureV1 } from './CountersClientFixtureV1';
import { CountersLambdaClientV1 } from '../../src/version1/CountersLambdaClientV1';

suite('CountersLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: CountersLambdaClientV1;
    let fixture: CountersClientFixtureV1;

    setup((done) => {
        client = new CountersLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new CountersClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Crud Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});