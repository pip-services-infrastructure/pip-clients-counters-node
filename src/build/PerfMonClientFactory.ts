import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { DirectPerfMon } from '../perfmon/DirectPerfmon';
import { HttpPerfMon } from '../perfmon/HttpPerfmon';
import { SenecaPerfMon } from '../perfmon/SenecaPerfmon';

import { PerfMonNullClientV1 } from '../version1/PerfMonNullClientV1';
import { PerfMonDirectClientV1 } from '../version1/PerfMonDirectClientV1';
import { PerfMonHttpClientV1 } from '../version1/PerfMonHttpClientV1';
import { PerfMonSenecaClientV1 } from '../version1/PerfMonSenecaClientV1';

export class PerfMonClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-perfmon', 'factory', 'default', 'default', '1.0');
	public static DirectPerfMonDescriptor = new Descriptor('pip-services-perfmon', 'perfmon', 'direct', 'default', '1.0');
	public static HttpPerfMonDescriptor = new Descriptor('pip-services-perfmon', 'perfmon', 'http', 'default', '1.0');
	public static SenecaPerfMonDescriptor = new Descriptor('pip-services-perfmon', 'perfmon', 'seneca', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-perfmon', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-perfmon', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-perfmon', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-perfmon', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(PerfMonClientFactory.DirectPerfMonDescriptor, DirectPerfMon);
		this.registerAsType(PerfMonClientFactory.HttpPerfMonDescriptor, HttpPerfMon);
		this.registerAsType(PerfMonClientFactory.SenecaPerfMonDescriptor, SenecaPerfMon);

		this.registerAsType(PerfMonClientFactory.NullClientV1Descriptor, PerfMonNullClientV1);
		this.registerAsType(PerfMonClientFactory.DirectClientV1Descriptor, PerfMonDirectClientV1);
		this.registerAsType(PerfMonClientFactory.HttpClientV1Descriptor, PerfMonHttpClientV1);
		this.registerAsType(PerfMonClientFactory.SenecaClientV1Descriptor, PerfMonSenecaClientV1);
	}
	
}