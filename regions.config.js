export default {
    allowedRegions: ['us', 'eu', 'gov'],
    dd_datacenter: {
        us: 'US',
        eu: 'EU',
        gov: 'US1-FED'
    },
    dd_site: {
        us: 'datadoghq.com',
        eu: 'datadoghq.eu',
        gov: 'ddog-gov.com'
    },
    dd_full_site: {
        us: 'app.datadoghq.com',
        eu: 'app.datadoghq.eu',
        gov: 'app.ddog-gov.com'
    },
    tcp_endpoint: {
        us: 'agent-intake.logs.datadoghq.com',
        eu: 'agent-intake.logs.datadoghq.eu',
        gov: 'not supported'
    },
    tcp_endpoint_port: {
        us: '10514',
        eu: '443',
        gov: 'not supported'
    },
    tcp_endpoint_port_ssl: {
        us: '10516',
        eu: '1883',
        gov: 'not supported'
    }
};
