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
        us: 'intake.logs.datadoghq.com',
        us3: 'intake.logs.datadoghq.com',
        eu: 'tcp-intake.logs.datadoghq.eu'
    },
    tcp_endpoint_port: {
        us: '10514',
        us3: '10514',
        eu: '1883'
    }
};
