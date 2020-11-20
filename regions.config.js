export default {
    allowedRegions: ['us', 'us3', 'eu'],
    dd_site: {
        us: 'datadoghq.com',
        us3: 'us3.datadoghq.com',
        eu: 'datadoghq.eu'
    },
    dd_full_site: {
        us: 'app.datadoghq.com',
        us3: 'us3.datadoghq.com',
        eu: 'app.datadoghq.eu'
    },
    tcp_endpoint: {
        us: 'agent-intake.logs.datadoghq.com',
        us3: 'agent-intake.logs.us3.datadoghq.com',
        eu: 'agent-intake.logs.datadoghq.eu'
    },
    tcp_endpoint_port: {
        us: '10514',
        us3: '10514',
        eu: '443'
    },
    tcp_endpoint_port_ssl: {
        us: '10516',
        us3: '10516',
        eu: '1883'
    }
};
