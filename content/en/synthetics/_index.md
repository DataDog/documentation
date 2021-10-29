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
- link: 'https://learn.datadoghq.com/course/view.php?id=39'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetic Monitoring Guides"

---

{{< vimeo 447241955 >}}

<br/>

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. Datadog tracks the performance of your webpages and APIs from the backend to the frontend, and at various network levels (`HTTP`, `SSL`, `TCP`, `DNS`, `UDP`, and `ICMP`) in a controlled and stable way, alerting you about faulty behavior such as regressions, broken features, high response times, and unexpected status codes. 

With **end-to-end testing in production and CI environments**, your development teams can proactively ensure that no defective code makes it to production. **Computing SLOs** on your key endpoints and user journeys makes it easier to stick to your application performance targets and ultimately provide a consistent customer experience.

## Set up API tests and multistep API tests

API tests allow you to launch [single][1] or [chained][2] requests to perform verifications on your key systems at various network levels: [HTTP test][3], [SSL test][4], [TCP test][5], [DNS test][6], [UDP test][7], and [ICMP test][8]. 

{{< img src="synthetics/api_test.png" alt="API tests" style="width:100%;">}}

## Record browser tests

Use [Synthetic browser tests][9] to monitor how your customers experience your webpages from around the world with end-to-end tests.

{{< img src="synthetics/browser_test.gif" alt="Browser tests" style="width:100%;">}}

## Launch private locations

Use [Synthetic private locations][10] to monitor internal APIs and websites or create custom locations in areas that are mission-critical to your business.

{{< img src="synthetics/private_locations.png" alt="Private locations" style="width:100%;">}}

## Run tests with your integration and deployment processes

Leverage your Synthetic tests as [canaries][11] or run them directly within your [CI pipelines][11] to start shipping without fear that faulty code may impact your customers' experience.

 {{< img src="synthetics/ci.png" alt="CI tests" style="width:100%;">}}

## Connect data and traces

Use the [out of the box integration between Synthetic tests and APM traces][12] to find the root cause of failures across frontend, network, and backend requests.

{{< img src="synthetics/synthetics_traces.gif" alt="Synthetic Monitoring" style="width:100%;">}}

## Ready to start?

See [Getting Started with Synthetic Monitoring][13] for instructions on creating your first Synthetic test and monitoring your web applications. Then, explore [Getting Started with Private Locations][14] for instructions on creating your private location and running Synthetic tests with your private location.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/multistep
[3]: /synthetics/api_tests/http_tests
[4]: /synthetics/api_tests/tcp_tests
[5]: /synthetics/api_tests/ssl_tests
[6]: /synthetics/api_tests/dns_tests
[7]: /synthetics/api_tests/udp_tests
[8]: /synthetics/api_tests/icmp_tests
[9]: /synthetics/browser_tests
[10]: /synthetics/private_locations
[11]: /synthetics/cicd_testing
[12]: /synthetics/apm/
[13]: /getting_started/synthetics
[14]: /getting_started/synthetics/private_location
