---
title: Synthetic Monitoring
kind: documentation
description: "Use automated testing to ensure the most critical parts of your systems and applications are up and running from various locations around the world."
disable_sidebar: true
aliases:
  - /integrations/synthetics/
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring"
  tag: "Release Notes"
  text: "Check out the latest Datadog Synthetic Monitoring releases! (App login required)"
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introduction to Datadog Synthetic Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-cdn-performance-with-synthetic-testing/"
  tag: "Blog"
  text: "Monitor CDN performance within your Synthetic tests"
- link: 'https://learn.datadoghq.com/courses/intro-to-synthetic-tests'
  tag: 'Learning Center'
  text: 'Introduction to Synthetic Tests'
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetic Monitoring Guides"

---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/447241955/rendition/1080p/file.mp4?loc=external&signature=47f0bf6adc93cbbd62e4939228c964c19227a2e0aec2d61822417cd2af985c97" poster="/images/poster/synthetics.png" >}}

<br/>

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. Datadog tracks the performance of your webpages and APIs from the backend to the frontend, and at various network levels (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, and `gRPC`) in a controlled and stable way, alerting you about faulty behavior such as regressions, broken features, high response times, and unexpected status codes. 

**Computing SLOs** on your key endpoints and user journeys makes it easier to stick to your application performance targets and ultimately provide a consistent customer experience.

You can create Synthetic tests in the [Datadog application][1], with the [API][2], or with [Terraform][3].

## Set up API tests and multistep API tests

API tests allow you to launch [single][4] or [chained][5] requests to perform verifications on your key systems at various network levels: [HTTP test][6], [SSL test][7], [DNS test][8], [WebSocket test][9], [TCP test][10], [UDP test][11], [ICMP test][12], and [gRPC test][13]. 

{{< img src="synthetics/api_test.png" alt="API tests" style="width:100%;">}}

## Record browser tests

Use [Synthetic browser tests][14] to monitor how your customers experience your webpages from around the world with end-to-end tests.

{{< img src="synthetics/browser_test.mp4" alt="Browser tests" video=true style="width:100%;">}}

## Launch private locations

Use [Synthetic private locations][15] to monitor internal APIs and websites or create custom locations in areas that are mission-critical to your business.

{{< img src="synthetics/private_locations.png" alt="Private locations" style="width:100%;">}}

## Connect data and traces

Use the [integration between Synthetic tests and APM traces][16] to find the root cause of failures across frontend, network, and backend requests.

{{< img src="synthetics/synthetics_traces.mp4" alt="Synthetic Monitoring" video=true style="width:100%;">}}

## Access out-of-the-box dashboards

Analyze performance information about your API tests, multistep API tests, browser tests, and private locations, as well as Datadog events, with [out-of-the-box Synthetic dashboards][17]. 

{{< img src="synthetics/test_summary_dashboard.png" alt="Test Summary Dashboard" style="width:100%;">}}

## Use the Synthetic Monitoring & Continuous Testing Explorer

Create [search queries and visualizations][20] for your Synthetic test runs or batches of tests running in CI/CD pipelines. 

{{< img src="continuous_testing/explorer_ci_batches.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Ready to start?

See [Getting Started with Synthetic Monitoring][18] for instructions on creating your first Synthetic test and monitoring your web applications. Then, explore [Getting Started with Private Locations][19] for instructions on creating your private location and running Synthetic tests with your private location.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/synthetics/create#
[2]: /api/latest/synthetics/#create-an-api-test
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[4]: /synthetics/api_tests/
[5]: /synthetics/multistep
[6]: /synthetics/api_tests/http_tests
[7]: /synthetics/api_tests/ssl_tests
[8]: /synthetics/api_tests/dns_tests
[9]: /synthetics/api_tests/websocket_tests
[10]: /synthetics/api_tests/tcp_tests
[11]: /synthetics/api_tests/udp_tests
[12]: /synthetics/api_tests/icmp_tests
[13]: /synthetics/api_tests/grpc_tests
[14]: /synthetics/browser_tests
[15]: /synthetics/private_locations
[16]: /synthetics/apm/
[17]: /synthetics/dashboards/
[18]: /getting_started/synthetics
[19]: /getting_started/synthetics/private_location
[20]: /continuous_testing/explorer/