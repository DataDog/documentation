---
title: API Testing
description: Simulate requests on your public and internal services
breadcrumbs: Docs > Synthetic Testing and Monitoring > API Testing
sourceUrl: https://docs.datadoghq.com/synthetics/api_tests/index.html
---

# API Testing

## Overview{% #overview %}

API tests help you **proactively monitor** your most important services so they are available anytime and from anywhere.

Launch requests on the different network layers of your systems with these subtypes:

- [](https://docs.datadoghq.com/synthetics/api_tests/http_tests)
- [](https://docs.datadoghq.com/synthetics/api_tests/ssl_tests)
- [](https://docs.datadoghq.com/synthetics/api_tests/dns_tests)
- [](https://docs.datadoghq.com/synthetics/api_tests/websocket_tests)
- [](https://docs.datadoghq.com/synthetics/api_tests/tcp_tests)
- [](https://docs.datadoghq.com/synthetics/api_tests/udp_tests)
- [](https://docs.datadoghq.com/synthetics/api_tests/icmp_tests)
- [](https://docs.datadoghq.com/synthetics/api_tests/grpc_tests)

If your service starts answering slower or in an unexpected way (such as an unexpected response body or wrong A record), your test can [alert your team](https://docs.datadoghq.com/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor), [block your CI pipeline](https://docs.datadoghq.com/continuous_testing/cicd_integrations), and [roll back the faulty deployment](https://docs.datadoghq.com/continuous_testing/cicd_integrations).

API tests run from Datadog [managed locations](https://docs.datadoghq.com/synthetics/api_tests/http_tests/#select-locations) or [private locations](https://docs.datadoghq.com/synthetics/private_locations), allowing **internal and external coverage** of your systems.

**Note:** API tests are single requests executed against your services. If you want to monitor sophisticated business transactions at the API level or endpoints that require authentication, chain your requests with [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/).

## Further Reading{% #further-reading %}

- [Version History for Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/version_history/)
- [Monitor your workflows with Datadog SSL, TLS, and Multistep API tests](https://www.datadoghq.com/blog/monitor-apis-with-datadog)
- [Get started with API tests](https://docs.datadoghq.com/getting_started/synthetics/api_test)
- [Run API tests on internal endpoints](https://docs.datadoghq.com/synthetics/private_locations)
- [Create and manage Synthetic API Tests with Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test)
