---
title: Synthetics
kind: documentation
description: "Use automated testing to ensure the most critical parts of your systems and applications are up and running from various locations around the world."
disable_toc: true
aliases:
  - /integrations/synthetics/
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introduction to Datadog Synthetics"
- link: "https://www.datadoghq.com/blog/browser-tests/"
  tag: "Blog"
  text: "User experience monitoring with Datadog Browser Tests"
- link: "https://www.datadoghq.com/blog/test-creation-best-practices/"
  tag: "Blog"
  text: "Best practices for creating end-to-end tests"
- link: "/synthetics/guide/"
  tag: "Documentation"
  text: "Synthetics Guides"
- link: "/synthetics/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Synthetics"
---

{{< img src="synthetics/synthetics_home.png" alt="Synthetics home page" >}}

Synthetic tests allow you to observe how your systems and applications are performing using **simulated requests and actions from around the globe**. Datadog **tracks the performance of your webpages and APIs** from the backend to the frontend, and at various network levels (HTTP, TCP, SSL) in a controlled and stable way, alerting you in case of faulty behavior (regression, broken feature, high response time, unexpected status code, etc.). **End-to-end testing production and CI environments** increases development teams’ speed as it puts an end to the fear of defective code making it to production. **Computing SLOs** on your key endpoints and user journeys makes it easier to stick to your application performance targets and ultimately provide a consistent customer experience. 

## Getting Started
Create your first Synthetic test and start monitoring web applications to improve their performance in just a few minutes.
### Set up API tests

API tests allow you to launch requests and perform verifications on your web applications at various network levels: HTTP, TCP, SSL. Create your first [HTTP test][1], TCP test, and [SSL test][2] to get started with API and network monitoring.

{{< img src="synthetics/api_test.png" alt="API tests"  style="width:100%;">}}

### Record Browser tests

Record end-to-end tests to monitor how your customers experience your webpages from around the world using [Synthetics Browser tests][3].

{{< img src="synthetics/browser_test.gif" alt="Browser tests"  style="width:100%;">}}

### Launch Private Locations

Use [Synthetics Private Locations][4] to monitor internal APIs and websites or to create custom locations in areas that are mission-critical to your business.

{{< img src="synthetics/private_locations.png" alt="Private locations"  style="width:100%;">}}

### Run tests with your integration and deployment processes

Leverage your Synthetic tests as [canaries][5] or run them directly within your [CI pipelines][5] to start shipping without fearing faulty code might impact your customers experience.

 {{< img src="synthetics/ci.png" alt="CI tests"  style="width:100%;">}}

### Connect Synthetics and traces

Use the [out of the box integration between Synthetic tests and APM traces][6] to find the root cause of failures across frontend, network and backend requests.

{{< img src="synthetics/synthetics_traces.gif" alt="Synthetics" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/synthetics/api_test
[2]: /synthetics/api_tests/?tab=ssltest
[3]: /getting_started/synthetics/browser_test
[4]: /getting_started/synthetics/private_location
[5]: /synthetics/ci/
[6]: /synthetics/apm/
