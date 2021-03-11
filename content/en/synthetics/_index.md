---
title: Synthetic Monitoring
kind: documentation
description: "Use automated testing to ensure the most critical parts of your systems and applications are up and running from various locations around the world."
disable_sidebar: true
aliases:
  - /integrations/synthetics/
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introduction to Datadog Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "User experience monitoring with Datadog Browser Tests"
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetic Monitoring Guides"
- link: "/synthetics/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Synthetic Monitoring"
---

{{< img src="synthetics/synthetics_home.png" alt="Synthetic Monitoring home page" >}}

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. Datadog **tracks the performance of your webpages and APIs** from the backend to the frontend, and at various network levels (`HTTP`, `TCP`, `SSL`, `DNS`, and `ICMP`) in a controlled and stable way, alerting you in case of faulty behavior (regression, broken feature, high response time, unexpected status code, etc.). **End-to-end testing production and CI environments** increases development teams’ speed as it puts an end to the fear of defective code making it to production. **Computing SLOs** on your key endpoints and user journeys makes it easier to stick to your application performance targets and ultimately provide a consistent customer experience.

## Getting Started
Create your first Synthetic test and start monitoring web applications to improve their performance in just a few minutes.

### Set up API tests and Multistep API tests

API tests allow you to launch [single][1] or [chained][2] requests to perform verifications on your key systems at various network levels: `HTTP`, `TCP`, `SSL`, `DNS`, and `ICMP`. Create your first [HTTP test][3], [TCP test][4], [SSL test][5], [DNS test][6], or [ICMP test][7] to get started with API and network monitoring.

{{< img src="synthetics/api_test.png" alt="API tests"  style="width:100%;">}}

### Record Browser tests

Record end-to-end tests to monitor how your customers experience your webpages from around the world using [Synthetic browser tests][8].

{{< img src="synthetics/browser_test.gif" alt="Browser tests"  style="width:100%;">}}

### Launch Private Locations

Use [Synthetic private locations][9] to monitor internal APIs and websites or to create custom locations in areas that are mission-critical to your business.

{{< img src="synthetics/private_locations.png" alt="Private locations"  style="width:100%;">}}

### Run tests with your integration and deployment processes

Leverage your Synthetic tests as [canaries][10] or run them directly within your [CI pipelines][10] to start shipping without fearing faulty code might impact your customers experience.

 {{< img src="synthetics/ci.png" alt="CI tests"  style="width:100%;">}}

### Connect Synthetic Monitoring data and traces

Use the [out of the box integration between Synthetic tests and APM traces][11] to find the root cause of failures across frontend, network and backend requests.

{{< img src="synthetics/synthetics_traces.gif" alt="Synthetic Monitoring" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/multistep
[3]: /getting_started/synthetics/api_test
[4]: /synthetics/api_tests/?tab=tcptest
[5]: /synthetics/api_tests/?tab=ssltest
[6]: /synthetics/api_tests/?tab=dnstest
[7]: /synthetics/api_tests/?tab=icmp_test
[8]: /getting_started/synthetics/browser_test
[9]: /getting_started/synthetics/private_location
[10]: /synthetics/ci/
[11]: /synthetics/apm/
