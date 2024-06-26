export default {
    allowedRegions: ['us', 'us3', 'us5', 'eu', 'ap1', 'gov'],
    dd_datacenter: {
        us: 'US1',
        us3: 'US3',
        us5: 'US5',
        eu: 'EU',
        ap1: 'AP1',
        gov: 'US1-FED'
    },
    dd_site: {
        us: 'datadoghq.com',
        us3: 'us3.datadoghq.com',
        us5: 'us5.datadoghq.com',
        eu: 'datadoghq.eu',
        ap1: 'ap1.datadoghq.com',
        gov: 'ddog-gov.com'
    },
    dd_full_site: {
        us: 'app.datadoghq.com',
        us3: 'us3.datadoghq.com',
        us5: 'us5.datadoghq.com',
        eu: 'app.datadoghq.eu',
        ap1: 'ap1.datadoghq.com',
        gov: 'app.ddog-gov.com'
    },
    dd_site_name: {
        us: 'US1',
        us3: 'US3',
        us5: 'US5',
        eu: 'EU',
        ap1: 'AP1',
        gov: 'US1-FED'
    },
    tcp_endpoint: {
        us: 'agent-intake.logs.datadoghq.com',
        us5: 'The US5 TCP endpoint is not supported.',
        eu: 'agent-intake.logs.datadoghq.eu',
        ap1: 'The AP1 endpoint is not supported.',
        gov: 'The GOV TCP endpoint is not supported.'
    },
    tcp_endpoint_port: {
        us: '10514',
        us5: 'The US5 TCP endpoint port is not supported.',
        eu: '1883',
        ap1: 'The AP1 endpoint is not supported.',
        gov: 'The GOV TCP endpoint port is not supported.'
    },
    tcp_endpoint_port_ssl: {
        us: '10516',
        us5: 'The US5 TCP endpoint port is not supported.',
        eu: '443',
        ap1: 'The AP1 endpoint is not supported.',
        gov: 'The GOV TCP endpoint port is not supported.'
    },
    web_integrations_endpoint: {
        us: 'intake.logs.datadoghq.com',
        us3: 'intake.logs.us3.datadoghq.com',
        us5: 'intake.logs.datadoghq.com',
        eu: 'tcp-intake.logs.datadoghq.eu',
        ap1: 'intake.logs.ap1.datadoghq.com',
        gov: 'The GOV web integrations endpoint port is not supported.'
    },
    web_integrations_port: {
        us: '10516',
        us3: '10516',
        us5: '10516',
        eu: '443',
        ap1: '443',
        gov: 'The GOV web integrations endpoint port is not supported.'
    },
    web_integrations_unencrypted_port: {
      us: '10514',
      us3: '10514',
      us5: '10514',
      eu: '1883',
      ap1: '10514',
      gov: 'The GOV web integrations endpoint port is not supported.'
    },
    agent_http_endpoint: {
      us: 'agent-http-intake.logs.datadoghq.com',
      us3: 'agent-http-intake.logs.us3.datadoghq.com',
      us5: 'agent-http-intake.logs.us5.datadoghq.com',
      eu: 'agent-http-intake.logs.datadoghq.eu',
      ap1: 'agent-http-intake.logs.ap1.datadoghq.com',
      gov: 'agent-http-intake.logs.ddog-gov.com'
    },
    agent_http_port: {
      us: '443',
      us3: '443',
      us5: '443',
      eu: '443',
      ap1: '443',
      gov: '443'
    },
    http_endpoint: {
      us: 'http-intake.logs.datadoghq.com',
      us3: 'http-intake.logs.us3.datadoghq.com',
      us5: 'http-intake.logs.us5.datadoghq.com',
      eu: 'http-intake.logs.datadoghq.eu',
      ap1: 'http-intake.logs.ap1.datadoghq.com',
      gov: 'http-intake.logs.ddog-gov.com'
    },
    http_port: {
      us: '443',
      us3: '443',
      us5: '443',
      eu: '443',
      ap1: '443',
      gov: '443'
    },
    lambda_endpoint: {
      us: 'lambda-intake.logs.datadoghq.com',
      us3: 'The US3 lambda endpoint is not supported.',
      us5: 'lambda endpoint not supported',
      eu: 'lambda-intake.logs.datadoghq.eu',
      ap1: 'The AP1 lambda endpoint is not supported.',
      gov: 'The GOV lambda endpoint is not supported.'
    },
    lambda_port: {
      us: '443',
      us3: 'The US3 lambda endpoint port is not supported.',
      us5: 'The US5 lambda endpoint port is not supported.',
      eu: '443',
      ap1: 'The AP1 lambda endpoint port is not supported.',
      gov: 'The GOV lambda endpoint port is not supported.'
    },
    lambda_http_endpoint: {
      us: 'lambda-http-intake.logs.datadoghq.com',
      us3: 'lambda-http-intake.logs.us3.datadoghq.com',
      us5: 'lambda-http-intake.logs.us5.datadoghq.com',
      eu: 'lambda-http-intake.logs.datadoghq.eu',
      ap1: 'lambda-http-intake.logs.ap1.datadoghq.com',
      gov: 'lambda-http-intake.logs.ddog-gov.com'
    },
    lambda_http_port: {
      us: '443',
      us3: '443',
      us5: '443',
      eu: '443',
      ap1: '443',
      gov: '443'
    },
    functions_endpoint: {
      us: 'functions-intake.logs.datadoghq.com',
      us3: 'The US3 functions endpoint is not supported.',
      us5: 'The US5 functions endpoint is not supported.',
      eu: 'The EU functions endpoint is not supported.',
      ap1: 'The AP1 functions endpoint is not supported.',
      gov: 'The GOV functions endpoint is not supported.'
    },
    functions_port: {
      us: '443',
      us3: 'The US3 functions endpoint port is not supported.',
      us5: 'The US5 functions endpoint port is not supported.',
      eu: 'The EU functions endpoint port is not supported.',
      ap1: 'The AP1 functions endpoint is not supported.',
      gov: 'The GOV functions endpoint port is not supported.'
    },
    browser_sdk_endpoint_domain: {
      us: 'browser-intake-datadoghq.com',
      us3: 'browser-intake-us3-datadoghq.com',
      us5: 'browser-intake-us5-datadoghq.com',
      eu: 'browser-intake-datadoghq.eu',
      ap1: 'browser-intake-ap1-datadoghq.com',
      gov: 'browser-intake-ddog-gov.com'
    },
    aws_region: {
      us: 'us-east-1',
      us3: 'N/A',
      us5: 'N/A',
      eu: 'N/A',
      ap1: 'ap-northeast-1',
      gov: 'N/A'
    },
    aws_private_link_api_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-008cd79a7a09e0a1e',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_containers_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-03ffd8d552f0d957d',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_logs_agent_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-03e139d1f2766685b',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_logs_user_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-08799aabff1cfd8a3',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_metrics_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-002d904d5e69340ad',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_process_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0e86b29a0dc2c8a26',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_profiling_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0d598057ecde10596',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_traces_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0a5d94b2e8f6e70fc',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_dbm_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0ce70d55ec4af8501',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0cc53180ae06bb977',
      gov: 'The private link service for GOV is not supported.'
    },
    aws_private_link_remote_config_service_name: {
      us: 'com.amazonaws.vpce.us-east-1.vpce-svc-01f21309e507e3b1d',
      us3: 'The private link service for US3 is not supported.',
      us5: 'The private link service for US5 is not supported.',
      eu: 'The private link service for EU is not supported.',
      ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-00e15ab206f23b98c',
      gov: 'The private link service for GOV is not supported.'
    },
    ip_ranges_url: {
      us: 'http://ip-ranges.datadoghq.com',
      us3: 'http://ip-ranges.us3.datadoghq.com',
      us5: 'http://ip-ranges.us5.datadoghq.com',
      eu: 'http://ip-ranges.datadoghq.eu',
      ap1: 'http://ip-ranges.ap1.datadoghq.com',
      gov: 'http://ip-ranges.ddog-gov.com'
    }
};
