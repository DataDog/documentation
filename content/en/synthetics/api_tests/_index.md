---
title: API Testing
kind: documentation
description: Simulate requests on your public and internal services
aliases:
  - /synthetics/uptime_check
  - /synthetics/api_test
further_reading:
- link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
  tag: 'Blog'
  text: 'Introducing Datadog Synthetic Monitoring'
- link: 'https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/'
  tag: 'Blog'
  text: 'Improve your API test coverage with Datadog Synthetic Monitoring'
- link: 'https://www.datadoghq.com/blog/monitor-apis-with-datadog'
  tag: 'Blog'
  text: 'Monitor your workflows with Datadog SSL, TLS, and Multistep API tests'
- link: 'https://learn.datadoghq.com/courses/intro-to-synthetic-tests'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: '/getting_started/synthetics/api_test'
  tag: 'Documentation'
  text: 'Get started with API tests'
- link: '/synthetics/private_locations'
  tag: 'Documentation'
  text: 'Run API tests on internal endpoints'
- link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test'
  tag: 'External Site'
  text: 'Create and manage Synthetic API Tests with Terraform'
---

## Overview

API tests help you **proactively monitor** your most important services so they are available anytime and from anywhere. 

Launch requests on the different network layers of your systems with these subtypes:

{{< partial name="synthetics/network-layers.html" >}}

If your service starts answering slower or in an unexpected way (such as an unexpected response body or wrong A record), your test can [alert your team][1], [block your CI pipeline][2], and [roll back the faulty deployment][2].

API tests run from Datadog [managed locations][3] or [private locations][4], allowing **internal and external coverage** of your systems.

**Note:** API tests are single requests executed against your services. If you want to monitor sophisticated business transactions at the API level or endpoints that require authentication, chain your requests with [multistep API tests][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[2]: /continuous_testing/cicd_integrations
[3]: /synthetics/api_tests/http_tests/#select-locations
[4]: /synthetics/private_locations
[5]: /synthetics/multistep/
