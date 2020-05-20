export default {
    allowedRegions: ['us', 'eu'],
    dd_site: {
        us: 'datadoghq.com',
        eu: 'datadoghq.eu'
    },
    dd_site_name: {
        us: 'US site',
        eu: 'EU site'
    },
    tcp_endpoint: {
        us: 'intake.logs.datadoghq.com',
        eu: 'tcp-intake.logs.datadoghq.eu'
    },
    tcp_endpoint_port: {
        us: '10514',
        eu: '1883'
    },
    intake_profile_endpoint: {
        us: 'https://intake.profile.datadoghq.com',
        eu: 'https://intake.profile.datadoghq.eu'
    },
    ip_ranges_endpoint: {
        us: 'https://ip-ranges.datadoghq.com',
        eu: 'https://ip-ranges.datadoghq.eu'
    }
};
