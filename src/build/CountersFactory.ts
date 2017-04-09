import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

// import { DirectCounters } from '../log/DirectCounters';
// import { HttpCounters } from '../log/HttpCounters';
// import { SenecaCounters } from '../log/SenecaCounters';

import { CountersNullClientV1 } from '../version1/CountersNullClientV1';
import { CountersDirectClientV1 } from '../version1/CountersDirectClientV1';
import { CountersHttpClientV1 } from '../version1/CountersHttpClientV1';
import { CountersSenecaClientV1 } from '../version1/CountersSenecaClientV1';

export class CountersFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-counters', 'factory', 'default', 'default', '1.0');
	public static DirectCountersDescriptor = new Descriptor('pip-services-counters', 'logger', 'direct', 'default', '1.0');
	public static HttpCountersDescriptor = new Descriptor('pip-services-counters', 'logger', 'http', 'default', '1.0');
	public static SenecaCountersDescriptor = new Descriptor('pip-services-counters', 'logger', 'seneca', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-counters', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-counters', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-counters', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-counters', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		// this.registerAsType(CountersFactory.DirectCountersDescriptor, DirectCounters);
		// this.registerAsType(CountersFactory.HttpCountersDescriptor, HttpCounters);
		// this.registerAsType(CountersFactory.SenecaCountersDescriptor, SenecaCounters);

		this.registerAsType(CountersFactory.NullClientV1Descriptor, CountersNullClientV1);
		this.registerAsType(CountersFactory.DirectClientV1Descriptor, CountersDirectClientV1);
		this.registerAsType(CountersFactory.HttpClientV1Descriptor, CountersHttpClientV1);
		this.registerAsType(CountersFactory.SenecaClientV1Descriptor, CountersSenecaClientV1);
	}
	
}
