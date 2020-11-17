export default {
    allowedRegions: ['us', 'us3', 'eu'],
    dd_site: {
        us: 'datadoghq.com',
        us3: 'datadoghq.com',
        eu: 'datadoghq.eu'
    },
    dd_subdomain: {
        us: 'app',
        us3: 'us3',
        eu: 'app'
    },
    tcp_endpoint: {
        us: 'agent-intake.logs.datadoghq.com',
        us3: 'agent-intake.logs.datadoghq.com',
        eu: 'agent-intake.logs.datadoghq.eu'
    },
    tcp_endpoint_port: {
        us: '10516',
        us3: '10516',
        eu: '443'
    }
};
