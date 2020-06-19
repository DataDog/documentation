---
title: Synthetics
kind: documentation
description: "Make sure the most critical parts of your product are up and running from various locations around the world."
disable_toc: true
aliases:
  - /integrations/synthetics/
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "User experience monitoring with Datadog Browser Tests"
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "/synthetics/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Synthetics"
- link: "/synthetics/settings/"
  tag: "Documentation"
  text: "Synthetics Settings"
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetics Guides"
---

{{< img src="synthetics/home_page.png" alt="Synthetics home page" >}}

Synthetic tests allow you to observe how all your systems are performing using simulated user requests from around the globe. Datadog tracks the performance of your webpages and APIs at all network levels (HTTP, TCP, SSL) in a controlled and stable way, alerting you in case of faulty behavior (high response time, unexpected status code, etc.). Computing SLOs on your key endpoints and user journeys makes it easier to stick to your application performance targets and ultimately provide a consistent customer experience. By end-to-end testing both your production and CI environments, you can increase your development teams’ speed and stop fearing defective code might make it to production.

## Getting Started
Create your first Synthetic test and start monitoring web applications to improve their performance in just a few minutes.
### Set up API tests

API tests allow you to launch requests and perform verifications on your web applications at various network levels: HTTP, TCP, DNS. Create your first [HTTP test][1] and get started with API monitoring.

{{< img src="synthetics/api_test.png" alt="API tests"  style="width:100%;">}}

### Record Browser tests

Record end-to-end tests to monitor how your customers experience your webpages from around the world using [Synthetics Browser tests][2].

{{< img src="synthetics/browser_test.gif" alt="Browser tests"  style="width:100%;">}}

### Launch Private Locations

Use [Synthetics Private Locations][3] to monitor internal APIs and websites or to create custom locations in areas that are mission-critical to your business.

{{< img src="synthetics/private_locations.png" alt="Private locations"  style="width:100%;">}}

### Run tests from your CI

 Include your [Synthetic tests in your CI pipelines][4] and start shipping without fearing faulty code might make it to production.

 {{< img src="synthetics/ci.png" alt="CI tests"  style="width:100%;">}}

### Connect Synthetics and Traces

Use the [out of the box integration between Synthetic tests and APM traces][5] to find the root cause of failures across frontend, network and backend requests.

{{< img src="synthetics/synthetics_traces.gif" alt="Synthetics" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/synthetics/api_test
[2]: /getting_started/synthetics/browser_test
[3]: /getting_started/synthetics/private_location
[4]: /synthetics/ci/
[5]: /synthetics/apm/
