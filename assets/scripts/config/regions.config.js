export default {
  allowedRegions: ['us', 'us3', 'us5', 'eu', 'ap1', 'ap2', 'gov'],
  dd_datacenter: {
    us: 'US1',
    us3: 'US3',
    us5: 'US5',
    eu: 'EU',
    ap1: 'AP1',
    gov: 'US1-FED',
    ap2: 'AP2'
  },
  dd_site: {
    us: 'datadoghq.com',
    us3: 'us3.datadoghq.com',
    us5: 'us5.datadoghq.com',
    eu: 'datadoghq.eu',
    ap1: 'ap1.datadoghq.com',
    ap2: 'ap2.datadoghq.com',
    gov: 'ddog-gov.com'
  },
  dd_full_site: {
    us: 'app.datadoghq.com',
    us3: 'us3.datadoghq.com',
    us5: 'us5.datadoghq.com',
    eu: 'app.datadoghq.eu',
    ap1: 'ap1.datadoghq.com',
    ap2: 'ap2.datadoghq.com',
    gov: 'app.ddog-gov.com'
  },
  dd_api: {
    us: 'https://api.datadoghq.com',
    us3: 'https://api.us3.datadoghq.com',
    us5: 'https://api.us5.datadoghq.com',
    eu: 'https://api.datadoghq.eu',
    ap1: 'https://api.ap1.datadoghq.com',
    ap2: 'https://api.ap2.datadoghq.com',
    gov: 'https://api.ddog-gov.com'
  },
  dd_site_name: {
    us: 'US1',
    us3: 'US3',
    us5: 'US5',
    eu: 'EU',
    ap1: 'AP1',
    ap2: 'AP2',
    gov: 'US1-FED'
  },
  tcp_endpoint: {
    us: 'agent-intake.logs.datadoghq.com',
    us3: 'The US3 TCP endpoint is not supported.',
    us5: 'The US5 TCP endpoint is not supported.',
    eu: 'agent-intake.logs.datadoghq.eu',
    ap1: 'The AP1 endpoint is not supported.',
    ap2: 'The AP2 endpoint is not supported.',
    gov: 'The GOV TCP endpoint is not supported.'
  },
  tcp_endpoint_port: {
    us: '10514',
    us5: 'The US5 TCP endpoint port is not supported.',
    eu: '1883',
    ap1: 'The AP1 endpoint is not supported.',
    ap2: 'The AP2 endpoint is not supported.',
    gov: 'The GOV TCP endpoint port is not supported.'
  },
  tcp_endpoint_port_ssl: {
    us: '10516',
    us5: 'The US5 TCP endpoint port is not supported.',
    eu: '443',
    ap1: 'The AP1 endpoint is not supported.',
    ap2: 'The AP2 endpoint is not supported.',
    gov: 'The GOV TCP endpoint port is not supported.'
  },
  hipaa_logs_legacy: {
    us: '[Deprecated] `tcp-encrypted-intake.logs.datadoghq.com<br>lambda-tcp-encrypted-intake.logs.datadoghq.com<br>gcp-encrypted-intake.logs.datadoghq.com<br>http-encrypted-intake.logs.datadoghq.com',
    us3: '[Deprecated] lambda-tcp-encrypted-intake.logs.us3.datadoghq.com<br>gcp-encrypted-intake.logs.us3.datadoghq.com<br>http-encrypted-intake.logs.us3.datadoghq.com',
    us5: '[Deprecated] lambda-tcp-encrypted-intake.logs.us5.datadoghq.com<br>gcp-encrypted-intake.logs.us5.datadoghq.com<br>http-encrypted-intake.logs.us5.datadoghq.com',
    eu: '[Deprecated] tcp-encrypted-intake.logs.datadoghq.eu<br>lambda-tcp-encrypted-intake.logs.datadoghq.eu<br>gcp-encrypted-intake.logs.datadoghq.eu<br>http-encrypted-intake.logs.datadoghq.eu',
    ap1: 'N/A',
    ap2: 'N/A',
    gov: '[Deprecated] lambda-tcp-encrypted-intake.logs.ddog-gov.com<br>gcp-encrypted-intake.logs.ddog-gov.com<br>http-encrypted-intake.logs.ddog-gov.com'
  },
  web_integrations_endpoint: {
    us: 'intake.logs.datadoghq.com',
    us3: 'intake.logs.us3.datadoghq.com',
    us5: 'intake.logs.datadoghq.com',
    eu: 'tcp-intake.logs.datadoghq.eu',
    ap1: 'intake.logs.ap1.datadoghq.com',
    ap2: 'intake.logs.ap2.datadoghq.com',
    gov: 'The GOV web integrations endpoint port is not supported.'
  },
  web_integrations_port: {
    us: '10516',
    us3: '10516',
    us5: '10516',
    eu: '443',
    ap1: '443',
    ap2: '443',
    gov: 'The GOV web integrations endpoint port is not supported.'
  },
  web_integrations_unencrypted_port: {
    us: '10514',
    us3: '10514',
    us5: '10514',
    eu: '1883',
    ap1: '10514',
    ap2: '10514',
    gov: 'The GOV web integrations endpoint port is not supported.'
  },
  agent_http_endpoint: {
    us: 'agent-http-intake.logs.datadoghq.com',
    us3: 'agent-http-intake.logs.us3.datadoghq.com',
    us5: 'agent-http-intake.logs.us5.datadoghq.com',
    eu: 'agent-http-intake.logs.datadoghq.eu',
    ap1: 'agent-http-intake.logs.ap1.datadoghq.com',
    ap2: 'agent-http-intake.logs.ap2.datadoghq.com',
    gov: 'agent-http-intake.logs.ddog-gov.com'
  },
  agent_http_endpoint_private_link: {
    us: 'agent-http-intake.logs.datadoghq.com',
    us3: 'agent-http-intake.logs.us3.datadoghq.com',
    us5: 'agent-http-intake.logs.us5.datadoghq.com',
    eu: 'agent-http-intake.logs.datadoghq.eu',
    ap1: 'agent-http-intake.logs.ap1.datadoghq.com',
    ap2: 'gold.intake.ap2.datadoghq.com',
    gov: 'agent-http-intake.logs.ddog-gov.com'
  },
  agent_http_port: {
    us: '443',
    us3: '443',
    us5: '443',
    eu: '443',
    ap1: '443',
    ap2: '443',
    gov: '443'
  },
  http_endpoint: {
    us: 'http-intake.logs.datadoghq.com',
    us3: 'http-intake.logs.us3.datadoghq.com',
    us5: 'http-intake.logs.us5.datadoghq.com',
    eu: 'http-intake.logs.datadoghq.eu',
    ap1: 'http-intake.logs.ap1.datadoghq.com',
    ap2: 'http-intake.logs.ap2.datadoghq.com',
    gov: 'http-intake.logs.ddog-gov.com'
  },
  http_endpoint_private_link: {
    us: 'http-intake.logs.datadoghq.com',
    us3: 'http-intake.logs.us3.datadoghq.com',
    us5: 'http-intake.logs.us5.datadoghq.com',
    eu: 'http-intake.logs.datadoghq.eu',
    ap1: 'http-intake.logs.ap1.datadoghq.com',
    ap2: 'gold.intake.ap2.datadoghq.com',
    gov: 'http-intake.logs.ddog-gov.com'
  },
  http_endpoint_full: {
    us: 'https://http-intake.logs.datadoghq.com',
    us3: 'https://http-intake.logs.us3.datadoghq.com',
    us5: 'https://http-intake.logs.us5.datadoghq.com',
    eu: 'https://http-intake.logs.datadoghq.eu',
    ap1: 'https://http-intake.logs.ap1.datadoghq.com',
    ap2: 'https://http-intake.logs.ap2.datadoghq.com',
    gov: 'https://http-intake.logs.ddog-gov.com'
  },
  http_port: {
    us: '443',
    us3: '443',
    us5: '443',
    eu: '443',
    ap1: '443',
    ap2: '443',
    gov: '443'
  },
  lambda_endpoint: {
    us: 'lambda-intake.logs.datadoghq.com',
    us3: 'The US3 lambda endpoint is not supported.',
    us5: 'lambda endpoint not supported',
    eu: 'lambda-intake.logs.datadoghq.eu',
    ap1: 'The AP1 lambda endpoint is not supported.',
    ap2: 'The AP2 lambda endpoint is not supported.',
    gov: 'The GOV lambda endpoint is not supported.'
  },
  lambda_port: {
    us: '443',
    us3: 'The US3 lambda endpoint port is not supported.',
    us5: 'The US5 lambda endpoint port is not supported.',
    eu: '443',
    ap1: 'The AP1 lambda endpoint port is not supported.',
    ap2: 'The AP2 lambda endpoint port is not supported.',
    gov: 'The GOV lambda endpoint port is not supported.'
  },
  lambda_http_endpoint: {
    us: 'lambda-http-intake.logs.datadoghq.com',
    us3: 'lambda-http-intake.logs.us3.datadoghq.com',
    us5: 'lambda-http-intake.logs.us5.datadoghq.com',
    eu: 'lambda-http-intake.logs.datadoghq.eu',
    ap1: 'lambda-http-intake.logs.ap1.datadoghq.com',
    ap2: 'lambda-http-intake.logs.ap2.datadoghq.com',
    gov: 'lambda-http-intake.logs.ddog-gov.com'
  },
  lambda_http_port: {
    us: '443',
    us3: '443',
    us5: '443',
    eu: '443',
    ap1: '443',
    ap2: '443',
    gov: '443'
  },
  functions_endpoint: {
    us: 'functions-intake.logs.datadoghq.com',
    us3: 'The US3 functions endpoint is not supported.',
    us5: 'The US5 functions endpoint is not supported.',
    eu: 'The EU functions endpoint is not supported.',
    ap1: 'The AP1 functions endpoint is not supported.',
    ap2: 'The AP2 functions endpoint is not supported.',
    gov: 'The GOV functions endpoint is not supported.'
  },
  functions_port: {
    us: '443',
    us3: 'The US3 functions endpoint port is not supported.',
    us5: 'The US5 functions endpoint port is not supported.',
    eu: 'The EU functions endpoint port is not supported.',
    ap1: 'The AP1 functions endpoint port is not supported.',
    ap2: 'The AP2 functions endpoint port is not supported.',
    gov: 'The GOV functions endpoint port is not supported.'
  },
  browser_sdk_endpoint_domain: {
    us: 'browser-intake-datadoghq.com',
    us3: 'browser-intake-us3-datadoghq.com',
    us5: 'browser-intake-us5-datadoghq.com',
    eu: 'browser-intake-datadoghq.eu',
    ap1: 'browser-intake-ap1-datadoghq.com',
    ap2: 'browser-intake-ap2-datadoghq.com',
    gov: 'browser-intake-ddog-gov.com'
  },
  aws_region: {
    us: 'us-east-1',
    us3: 'N/A',
    us5: 'N/A',
    eu: 'N/A',
    ap1: 'ap-northeast-1',
    ap2: 'ap-southeast-2',
    gov: 'N/A'
  },
  aws_private_link_cross_region: {
    us: 'US East (N.Virginia) (us-east-1)',
    us3: 'N/A',
    us5: 'N/A',
    eu: 'N/A',
    ap1: 'Asia Pacific (Tokyo) (ap-northeast-1)',
    ap2: 'Asia Pacific (Sydney) (ap-southeast-2)',
    gov: 'N/A'
  },
  aws_private_link_api_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-064ea718f8d0ead77',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-008cd79a7a09e0a1e',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-06ec78b291ce8020a',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_containers_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0ad5fb9e71f85fe99',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-03ffd8d552f0d957d',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-031da3ffac78ef902',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_logs_agent_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-025a56b9187ac1f63',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-03e139d1f2766685b',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_logs_user_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0e36256cb6172439d',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-08799aabff1cfd8a3',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-06460db30a7cfdace',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_metrics_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-09a8006e245d1e7b8',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-002d904d5e69340ad',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-0c26ca335d93a68b5',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_process_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0ed1f789ac6b0bde1',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0e86b29a0dc2c8a26',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-0c26ca335d93a68b5',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_profiling_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-022ae36a7b2472029',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0d598057ecde10596',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d936da0e6a30d3cd',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_traces_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0355bb1880dfa09c2',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0a5d94b2e8f6e70fc',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-0f3e01f4180b2ae09',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_dbm_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-0ce70d55ec4af8501',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-0cc53180ae06bb977',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-094469ee7a178f448',
    gov: 'The private link service for GOV is not supported.'
  },
  aws_private_link_remote_config_service_name: {
    us: 'com.amazonaws.vpce.us-east-1.vpce-svc-01f21309e507e3b1d',
    us3: 'The private link service for US3 is not supported.',
    us5: 'The private link service for US5 is not supported.',
    eu: 'The private link service for EU is not supported.',
    ap1: 'com.amazonaws.vpce.ap-northeast-1.vpce-svc-00e15ab206f23b98c',
    ap2: 'com.amazonaws.vpce.ap-southeast-2.vpce-svc-01f8f80f4cb97bd10',
    gov: 'The private link service for GOV is not supported.'
  },
  ip_ranges_url: {
    us: 'https://ip-ranges.datadoghq.com',
    us3: 'https://ip-ranges.us3.datadoghq.com',
    us5: 'https://ip-ranges.us5.datadoghq.com',
    eu: 'https://ip-ranges.datadoghq.eu',
    ap1: 'https://ip-ranges.ap1.datadoghq.com',
    ap2: 'https://ip-ranges.ap2.datadoghq.com',
    gov: 'https://ip-ranges.ddog-gov.com'
  },
  otlp_trace_endpoint: {
    us: 'https://trace.agent.datadoghq.com/v1/traces',
    us3: 'https://trace.agent.us3.datadoghq.com/v1/traces',
    us5: 'https://trace.agent.us5.datadoghq.com/v1/traces',
    eu: 'https://trace.agent.datadoghq.eu/v1/traces',
    ap1: 'https://trace.agent.ap1.datadoghq.com/v1/traces',
    ap2: 'https://trace.agent.ap2.datadoghq.com/v1/traces'
  },
  otlp_metrics_endpoint: {
    us: 'https://otlp.datadoghq.com/v1/metrics',
    us3: 'https://otlp.us3.datadoghq.com/v1/metrics',
    us5: 'https://otlp.us5.datadoghq.com/v1/metrics',
    eu: 'https://otlp.datadoghq.eu/v1/metrics',
    ap1: 'https://otlp.ap1.datadoghq.com/v1/metrics',
    ap2: 'https://otlp.ap2.datadoghq.com/v1/metrics'
  },
  otlp_logs_endpoint: {
    us: 'https://otlp.datadoghq.com/v1/logs',
    us3: 'https://otlp.us3.datadoghq.com/v1/logs',
    us5: 'https://otlp.us5.datadoghq.com/v1/logs',
    eu: 'https://otlp.datadoghq.eu/v1/logs',
    ap1: 'https://otlp.ap1.datadoghq.com/v1/logs',
    ap2: 'https://otlp.ap2.datadoghq.com/v1/logs'
  },
  custom_costs_endpoint: {
    us: 'api.datadoghq.com/api/v2/cost/custom_costs',
    us3: 'api.us3.datadoghq.com/api/v2/cost/custom_costs',
    us5: 'api.us5.datadoghq.com/api/v2/cost/custom_costs',
    eu: 'api.datadoghq.eu/api/v2/cost/custom_costs.',
    ap1: 'api.ap1.datadoghq.com/api/v2/cost/custom_costs',
    ap2: 'api.ap2.datadoghq.com/api/v2/cost/custom_costs',
    gov: 'The custom costs endpoint for GOV is not supported.'
  },
  ip_ranges_url_webhooks: {
    us: 'https://ip-ranges.datadoghq.com/webhooks.json',
    us3: 'https://ip-ranges.us3.datadoghq.com/webhooks.json',
    us5: 'https://ip-ranges.us5.datadoghq.com/webhooks.json',
    eu: 'https://ip-ranges.datadoghq.eu/webhooks.json',
    ap1: 'https://ip-ranges.ap1.datadoghq.com/webhooks.json',
    ap2: 'https://ip-ranges.ap2.datadoghq.com/webhooks.json',
    gov: 'https://ip-ranges.ddog-gov.com/webhooks.json'
  },
  ip_ranges_url_api: {
    us: 'https://ip-ranges.datadoghq.com/api.json',
    us3: 'https://ip-ranges.us3.datadoghq.com/api.json',
    us5: 'https://ip-ranges.us5.datadoghq.com/api.json',
    eu: 'https://ip-ranges.datadoghq.eu/api.json',
    ap1: 'https://ip-ranges.ap1.datadoghq.com/api.json',
    ap2: 'https://ip-ranges.ap2.datadoghq.com/api.json',
    gov: 'https://ip-ranges.ddog-gov.com/api.json'
  },
  vercel_setup: {
    us: 'https://app.datadoghq.com/setup/vercel',
    us3: 'https://us3.datadoghq.com/setup/vercel',
    us5: 'https://us5.datadoghq.com/setup/vercel',
    eu: 'https://app.datadoghq.eu/setup/vercel',
    ap1: 'https://ap1.datadoghq.com/setup/vercel',
    ap2: 'https://ap2.datadoghq.com/setup/vercel',
    gov: 'https://app.ddog-gov.com/setup/vercel'
  },
  api_endpoint: {
    us: 'api.datadoghq.com',
    us3: 'api.us3.datadoghq.com',
    us5: 'api.us5.datadoghq.com',
    eu: 'api.datadoghq.eu',
    ap1: 'api.ap1.datadoghq.com',
    ap2: 'api.ap2.datadoghq.com',
    gov: 'api.ddog-gov.com'
  },
  api_endpoint_private_link: {
    us: 'api.datadoghq.com',
    us3: 'api.us3.datadoghq.com',
    us5: 'api.us5.datadoghq.com',
    eu: 'api.datadoghq.eu',
    ap1: 'api.ap1.datadoghq.com',
    ap2: 'orchid.intake.ap2.datadoghq.com',
    gov: 'api.ddog-gov.com'
  },
  metrics_endpoint: {
    us: 'metrics.agent.datadoghq.com',
    us3: 'metrics.agent.us3.datadoghq.com',
    us5: 'metrics.agent.us5.datadoghq.com',
    eu: 'metrics.agent.datadoghq.eu',
    ap1: 'metrics.agent.ap1.datadoghq.com',
    ap2: 'metrics.agent.ap2.datadoghq.com',
    gov: 'metrics.agent.ddog-gov.com'
  },
  metrics_endpoint_private_link: {
    us: 'metrics.agent.datadoghq.com',
    us3: 'metrics.agent.us3.datadoghq.com',
    us5: 'metrics.agent.us5.datadoghq.com',
    eu: 'metrics.agent.datadoghq.eu',
    ap1: 'metrics.agent.ap1.datadoghq.com',
    ap2: 'beige.intake.ap2.datadoghq.com',
    gov: 'metrics.agent.ddog-gov.com'
  },
  containers_endpoint: {
    us: 'orchestrator.datadoghq.com',
    us3: 'orchestrator.us3.datadoghq.com',
    us5: 'orchestrator.us5.datadoghq.com',
    eu: 'orchestrator.datadoghq.eu',
    ap1: 'orchestrator.ap1.datadoghq.com',
    ap2: 'orchestrator.ap2.datadoghq.com',
    gov: 'orchestrator.ddog-gov.com'
  },
  containers_endpoint_private_link: {
    us: 'orchestrator.datadoghq.com',
    us3: 'orchestrator.us3.datadoghq.com',
    us5: 'orchestrator.us5.datadoghq.com',
    eu: 'orchestrator.datadoghq.eu',
    ap1: 'orchestrator.ap1.datadoghq.com',
    ap2: 'linen.intake.ap2.datadoghq.com',
    gov: 'orchestrator.ddog-gov.com'
  },
  process_endpoint: {
    us: 'process.datadoghq.com',
    us3: 'process.us3.datadoghq.com',
    us5: 'process.us5.datadoghq.com',
    eu: 'process.datadoghq.eu',
    ap1: 'process.ap1.datadoghq.com',
    ap2: 'process.ap2.datadoghq.com',
    gov: 'process.ddog-gov.com'
  },
  process_endpoint_private_link: {
    us: 'process.datadoghq.com',
    us3: 'process.us3.datadoghq.com',
    us5: 'process.us5.datadoghq.com',
    eu: 'process.datadoghq.eu',
    ap1: 'process.ap1.datadoghq.com',
    ap2: 'bisque.intake.ap2.datadoghq.com',
    gov: 'process.ddog-gov.com'
  },
  profiling_endpoint: {
    us: 'intake.profile.datadoghq.com',
    us3: 'intake.profile.us3.datadoghq.com',
    us5: 'intake.profile.us5.datadoghq.com',
    eu: 'intake.profile.datadoghq.eu',
    ap1: 'intake.profile.ap1.datadoghq.com',
    ap2: 'intake.profile.ap2.datadoghq.com',
    gov: 'intake.profile.ddog-gov.com'
  },
  profiling_endpoint_private_link: {
    us: 'intake.profile.datadoghq.com',
    us3: 'intake.profile.us3.datadoghq.com',
    us5: 'intake.profile.us5.datadoghq.com',
    eu: 'intake.profile.datadoghq.eu',
    ap1: 'intake.profile.ap1.datadoghq.com',
    ap2: 'cyan.intake.ap2.datadoghq.com',
    gov: 'intake.profile.ddog-gov.com'
  },
  traces_endpoint: {
    us: 'trace.agent.datadoghq.com',
    us3: 'trace.agent.us3.datadoghq.com',
    us5: 'trace.agent.us5.datadoghq.com',
    eu: 'trace.agent.datadoghq.eu',
    ap1: 'trace.agent.ap1.datadoghq.com',
    ap2: 'trace.agent.ap2.datadoghq.com',
    gov: 'trace.agent.ddog-gov.com'
  },
  traces_endpoint_private_link: {
    us: 'trace.agent.datadoghq.com',
    us3: 'trace.agent.us3.datadoghq.com',
    us5: 'trace.agent.us5.datadoghq.com',
    eu: 'trace.agent.datadoghq.eu',
    ap1: 'trace.agent.ap1.datadoghq.com',
    ap2: 'lime.intake.ap2.datadoghq.com',
    gov: 'trace.agent.ddog-gov.com'
  },
  dbm_endpoint: {
    us: 'dbm-metrics-intake.datadoghq.com',
    us3: 'dbm-metrics-intake.us3.datadoghq.com',
    us5: 'dbm-metrics-intake.us5.datadoghq.com',
    eu: 'dbm-metrics-intake.datadoghq.eu',
    ap1: 'dbm-metrics-intake.ap1.datadoghq.com',
    ap2: 'dbm-metrics-intake.ap2.datadoghq.com',
    gov: 'dbm-metrics-intake.ddog-gov.com'
  },
  dbm_endpoint_private_link: {
    us: 'dbm-metrics-intake.datadoghq.com',
    us3: 'dbm-metrics-intake.us3.datadoghq.com',
    us5: 'dbm-metrics-intake.us5.datadoghq.com',
    eu: 'dbm-metrics-intake.datadoghq.eu',
    ap1: 'dbm-metrics-intake.ap1.datadoghq.com',
    ap2: 'white.intake.ap2.datadoghq.com',
    gov: 'dbm-metrics-intake.ddog-gov.com'
  },
  remote_config_endpoint: {
    us: 'config.datadoghq.com',
    us3: 'config.us3.datadoghq.com',
    us5: 'config.us5.datadoghq.com',
    eu: 'config.datadoghq.eu',
    ap1: 'config.ap1.datadoghq.com',
    ap2: 'config.ap2.datadoghq.com',
    gov: 'config.ddog-gov.com'
  },
  remote_config_endpoint_private_link: {
    us: 'config.datadoghq.com',
    us3: 'config.us3.datadoghq.com',
    us5: 'config.us5.datadoghq.com',
    eu: 'config.datadoghq.eu',
    ap1: 'config.ap1.datadoghq.com',
    ap2: 'violet.intake.ap2.datadoghq.com',
    gov: 'config.ddog-gov.com'
  },
  org_management_max_session_duration: {
    us: '720 hours (30 days)',
    us3: '720 hours (30 days)',
    us5: '720 hours (30 days)',
    eu: '720 hours (30 days)',
    ap1: '720 hours (30 days)',
    ap2: '720 hours (30 days)',
    gov: '12 hours'
  },
  jenkins_site_name: {
    us: 'US1',
    us3: 'US3',
    us5: 'US5',
    eu: 'EU1',
    ap1: 'AP1',
    ap2: 'AP2',
    gov: 'US1_FED'
  },
  synthetics_tunnel_endpoint: {
    us: 'tunnel-us1.synthetics.datadoghq.com',
    us3: 'tunnel-us3.synthetics.datadoghq.com',
    us5: 'tunnel-us5.synthetics.datadoghq.com',
    eu: 'tunnel-eu1.synthetics.datadoghq.com',
    ap1: 'tunnel-ap1.synthetics.datadoghq.com',
    ap2: 'tunnel-ap2.synthetics.datadoghq.com',
    gov: 'N/A'
  },
  dogwrap_site_flag: {
    us: '',
    us3: ' -s us3',
    us5: ' -s us5',
    eu: ' -s eu',
    ap1: '',
    ap2: '',
    gov: ''
  }
};
