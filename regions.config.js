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
    },
    web_integrations_unencrypted_port: {
      us: '10514',
      us3: '10514',
      eu: '1883',
      gov: 'not supported'
    },
    agent_http_endpoint: {
      us: 'agent-http-intake.logs.datadoghq.com',
      us3: 'agent-http-intake.logs.us3.datadoghq.com',
      eu: 'agent-http-intake.logs.datadoghq.eu',
      gov: 'agent-http-intake.logs.ddog-gov.com'
    },
    agent_http_port: {
      us: '443',
      us3: '443',
      eu: '443',
      gov: '443'
    },
    http_endpoint: {
      us: 'http-intake.logs.datadoghq.com',
      us3: 'http-intake.logs.us3.datadoghq.com',
      eu: 'http-intake.logs.datadoghq.eu',
      gov: 'http-intake.logs.ddog-gov.com'
    },
    http_port: {
      us: '443',
      us3: '443',
      eu: '443',
      gov: '443'
    },
    lambda_endpoint: {
      us: 'lambda-intake.logs.datadoghq.com',
      us3: 'not supported',
      eu: 'lambda-intake.logs.datadoghq.eu',
      gov: 'not supported'
    },
    lambda_port: {
      us: '443',
      us3: 'not supported',
      eu: '443',
      gov: 'not supported'
    },
    lambda_http_endpoint: {
      us: 'lambda-http-intake.logs.datadoghq.com',
      us3: 'lambda-http-intake.logs.us3.datadoghq.com',
      eu: 'lambda-http-intake.logs.datadoghq.eu',
      gov: 'lambda-http-intake.logs.ddog-gov.com'
    },
    lambda_http_port: {
      us: '443',
      us3: '443',
      eu: '443',
      gov: '443'
    },
    functions_endpoint: {
      us: 'functions-intake.logs.datadoghq.com',
      us3: 'not supported',
      eu: 'not supported',
      gov: 'not supported'
    },
    functions_port: {
      us: '443',
      us3: 'not supported',
      eu: 'not supported',
      gov: 'not supported'
    }
};
