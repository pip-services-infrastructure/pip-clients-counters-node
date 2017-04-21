import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';
export declare class CountersClientFactory extends Factory {
    static Descriptor: Descriptor;
    static DirectCountersDescriptor: Descriptor;
    static HttpCountersDescriptor: Descriptor;
    static SenecaCountersDescriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static HttpClientV1Descriptor: Descriptor;
    static SenecaClientV1Descriptor: Descriptor;
    constructor();
}
