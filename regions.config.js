export default {
    allowedRegions: ['us', 'us3', 'eu', 'gov'],
    dd_datacenter: {
        us: 'US',
        us3: 'US3',
        eu: 'EU',
        gov: 'US1-FED'
    },
    dd_site: {
        us: 'datadoghq.com',
        us3: 'us3.datadoghq.com',
        eu: 'datadoghq.eu',
        gov: 'ddog-gov.com'
    },
    dd_full_site: {
        us: 'app.datadoghq.com',
        us3: 'us3.datadoghq.com',
        eu: 'app.datadoghq.eu',
        gov: 'app.ddog-gov.com'
    },
    dd_site_name: {
        us: 'US',
        us3: 'US3',
        eu: 'EU',
        gov: 'Government'
    },
    tcp_endpoint: {
        us: 'agent-intake.logs.datadoghq.com',
        us3: 'agent-intake.logs.us3.datadoghq.com',
        eu: 'agent-intake.logs.datadoghq.eu',
        gov: 'not supported'
    },
    tcp_endpoint_port: {
        us: '10514',
        us3: '10514',
        eu: '443',
        gov: 'not supported'
    },
    tcp_endpoint_port_ssl: {
        us: '10516',
        us3: '10516',
        eu: '1883',
        gov: 'not supported'
    },
    web_integrations_endpoint: {
        us: 'intake.logs.datadoghq.com',
        us3: 'intake.logs.datadoghq.com',
        eu: 'tcp-intake.logs.datadoghq.eu',
        gov: 'not supported'
    },
    web_integrations_port: {
        us: '10516',
        us3: '10516',
        eu: '443',
        gov: 'not supported'
    }
};
