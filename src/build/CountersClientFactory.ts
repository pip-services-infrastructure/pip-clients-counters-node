import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { DirectCounters } from '../counters/DirectCounters';
import { HttpCounters } from '../counters/HttpCounters';
import { SenecaCounters } from '../counters/SenecaCounters';

import { CountersNullClientV1 } from '../version1/CountersNullClientV1';
import { CountersDirectClientV1 } from '../version1/CountersDirectClientV1';
import { CountersHttpClientV1 } from '../version1/CountersHttpClientV1';
import { CountersSenecaClientV1 } from '../version1/CountersSenecaClientV1';

export class CountersClientFactory extends Factory {
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

		this.registerAsType(CountersClientFactory.DirectCountersDescriptor, DirectCounters);
		this.registerAsType(CountersClientFactory.HttpCountersDescriptor, HttpCounters);
		this.registerAsType(CountersClientFactory.SenecaCountersDescriptor, SenecaCounters);

		this.registerAsType(CountersClientFactory.NullClientV1Descriptor, CountersNullClientV1);
		this.registerAsType(CountersClientFactory.DirectClientV1Descriptor, CountersDirectClientV1);
		this.registerAsType(CountersClientFactory.HttpClientV1Descriptor, CountersHttpClientV1);
		this.registerAsType(CountersClientFactory.SenecaClientV1Descriptor, CountersSenecaClientV1);
	}
	
}
