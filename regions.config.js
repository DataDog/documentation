export default {
    allowedRegions: ['us', 'eu'],
    dd_site: {
        us: 'datadoghq.com',
        eu: 'datadoghq.eu'
    },
    dd_full_site: {
        us: 'app.datadoghq.com',
        eu: 'app.datadoghq.eu'
    },
    tcp_endpoint: {
        us: 'agent-intake.logs.datadoghq.com',
        eu: 'agent-intake.logs.datadoghq.eu'
    },
    tcp_endpoint_port: {
        us: '10514',
        eu: '443'
    },
    tcp_endpoint_port_ssl: {
        us: '10516',
        eu: '1883'
    }
};
