---
title: API Tests
kind: documentation
description: Simulate requests on your public and internal services
aliases:
  - /synthetics/uptime_check
  - /synthetics/api_test
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/getting_started/synthetics/api_test"
  tag: "Documentation"
  text: "Get started with API tests"
- link: "/synthetics/api_tests/http_tests"
  tag: "Documentation"
  text: "Create your first HTTP test"
- link: "/synthetics/api_tests/ssl_tests"
  tag: "Documentation"
  text: "Create your first SSL test"
- link: "/synthetics/api_tests/tcp_tests"
  tag: "Documentation"
  text: "Create your first TCP test"
- link: "/synthetics/api_tests/dns_tests"
  tag: "Documentation"
  text: "Create your first DNS test"
- link: "/synthetics/api_tests/icmp_tests"
  tag: "Documentation"
  text: "Create your first ICMP test"
- link: "/synthetics/private_locations"
  tag: "Documentation"
  text: "Run API tests on internal endpoints"
- link: "https://www.datadoghq.com/blog/monitor-apis-with-datadog"
  tag: "Blog"
  text: "Monitor your workflows with Datadog SSL, TLS, and Multistep API tests"
---

## Overview

API tests are useful to help you **proactively monitor that your most important services are available** at anytime and from anywhere. API tests come in four different flavors that allow you to launch requests on the **different network layers** of your systems:

- [`HTTP` test][1]
- [`SSL` test][2]
- [`TCP` test][3]
- [`DNS` test][4]
- [`ICMP` test][5]

{{< img src="synthetics/api_tests/api_tests.mp4" alt="API Test subtypes" video="true"  width="100%" >}}

If your service starts answering more slowly, or in an unexpected way (for example, unexpected response body, wrong A record, etc.), your test can [**alert your team**][6], [**block your CI pipeline**][7], or even [**roll back the faulty deployment**][7].

API tests can run from Datadog [managed locations][8] and [private locations][9], allowing **full coverage of your systems**, both external and internal.

**Note**: API tests are single requests executed against your services. If you want to monitor sophisticated business transactions at the API level or endpoints that require authentication, you can also chain your requests using [Multistep API tests][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests
[2]: /synthetics/api_tests/ssl_tests
[3]: /synthetics/api_tests/tcp_tests
[4]: /synthetics/api_tests/dns_tests
[5]: /synthetics/api_tests/icmp_tests
[6]: /synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[7]: /synthetics/ci
[8]: /api/v1/synthetics/#get-all-locations-public-and-private
[9]: /synthetics/private_locations
[10]: /synthetics/multistep/
