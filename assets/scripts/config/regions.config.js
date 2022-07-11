export default {
    allowedRegions: ['us', 'us3', 'us5', 'eu', 'gov'],
    dd_datacenter: {
        us: 'US',
        us3: 'US3',
        us5: 'US5',
        eu: 'EU',
        gov: 'US1-FED'
    },
    dd_site: {
        us: 'datadoghq.com',
        us3: 'us3.datadoghq.com',
        us5: 'us5.datadoghq.com',
        eu: 'datadoghq.eu',
        gov: 'ddog-gov.com'
    },
    dd_full_site: {
        us: 'app.datadoghq.com',
        us3: 'us3.datadoghq.com',
        us5: 'us5.datadoghq.com',
        eu: 'app.datadoghq.eu',
        gov: 'app.ddog-gov.com'
    },
    dd_site_name: {
        us: 'US',
        us3: 'US3',
        us5: 'US5',
        eu: 'EU',
        gov: 'Government'
    },
    tcp_endpoint: {
        us: 'agent-intake.logs.datadoghq.com',
        us5: 'The US5 TCP endpoint is not supported.',
        eu: 'agent-intake.logs.datadoghq.eu',
        gov: 'The GOV TCP endpoint is not supported.'
    },
    tcp_endpoint_port: {
        us: '10514',
        us5: 'The US5 TCP endpoint port is not supported.',
        eu: '1883',
        gov: 'The GOV TCP endpoint port is not supported.'
    },
    tcp_endpoint_port_ssl: {
        us: '10516',
        us5: 'The US5 TCP endpoint port is not supported.',
        eu: '443',
        gov: 'The GOV TCP endpoint port is not supported.'
    },
    web_integrations_endpoint: {
        us: 'intake.logs.datadoghq.com',
        us3: 'intake.logs.us3.datadoghq.com',
        us5: 'intake.logs.datadoghq.com',
        eu: 'tcp-intake.logs.datadoghq.eu',
        gov: 'The GOV web integrations endpoint port is not supported.'
    },
    web_integrations_port: {
        us: '10516',
        us3: '10516',
        us5: '10516',
        eu: '443',
        gov: 'The GOV web integrations endpoint port is not supported.'
    },
    web_integrations_unencrypted_port: {
      us: '10514',
      us3: '10514',
      us5: '10514',
      eu: '1883',
      gov: 'The GOV web integrations endpoint port is not supported.'
    },
    agent_http_endpoint: {
      us: 'agent-http-intake.logs.datadoghq.com',
      us3: 'agent-http-intake.logs.us3.datadoghq.com',
      us5: 'agent-http-intake.logs.us5.datadoghq.com',
      eu: 'agent-http-intake.logs.datadoghq.eu',
      gov: 'agent-http-intake.logs.ddog-gov.com'
    },
    agent_http_port: {
      us: '443',
      us3: '443',
      us5: '443',
      eu: '443',
      gov: '443'
    },
    http_endpoint: {
      us: 'http-intake.logs.datadoghq.com',
      us3: 'http-intake.logs.us3.datadoghq.com',
      us5: 'http-intake.logs.us5.datadoghq.com',
      eu: 'http-intake.logs.datadoghq.eu',
      gov: 'http-intake.logs.ddog-gov.com'
    },
    http_port: {
      us: '443',
      us3: '443',
      us5: '443',
      eu: '443',
      gov: '443'
    },
    lambda_endpoint: {
      us: 'lambda-intake.logs.datadoghq.com',
      us3: 'The US3 lambda endpoint is not supported.',
      us5: 'lambda endpoint not supported',
      eu: 'lambda-intake.logs.datadoghq.eu',
      gov: 'The GOV lambda endpoint is not supported.'
    },
    lambda_port: {
      us: '443',
      us3: 'The US3 lambda endpoint port is not supported.',
      us5: 'The US5 lambda endpoint port is not supported.',
      eu: '443',
      gov: 'The GOV lambda endpoint port is not supported.'
    },
    lambda_http_endpoint: {
      us: 'lambda-http-intake.logs.datadoghq.com',
      us3: 'lambda-http-intake.logs.us3.datadoghq.com',
      us5: 'lambda-http-intake.logs.us5.datadoghq.com',
      eu: 'lambda-http-intake.logs.datadoghq.eu',
      gov: 'lambda-http-intake.logs.ddog-gov.com'
    },
    lambda_http_port: {
      us: '443',
      us3: '443',
      us5: '443',
      eu: '443',
      gov: '443'
    },
    functions_endpoint: {
      us: 'functions-intake.logs.datadoghq.com',
      us3: 'The US3 functions endpoint is not supported.',
      us5: 'The US5 functions endpoint is not supported.',
      eu: 'The EU functions endpoint is not supported.',
      gov: 'The GOV functions endpoint is not supported.'
    },
    functions_port: {
      us: '443',
      us3: 'The US3 functions endpoint port is not supported.',
      us5: 'The US5 functions endpoint port is not supported.',
      eu: 'The EU functions endpoint port is not supported.',
      gov: 'The GOV functions endpoint port is not supported.'
    },
    browser_sdk_endpoint_domain: {
      us: 'browser-intake-datadoghq.com',
      us3: 'browser-intake-us3-datadoghq.com',
      us5: 'browser-intake-us5-datadoghq.com',
      eu: 'browser-intake-datadoghq.eu',
      gov: 'browser-intake-ddog-gov.com'
    }
};
