---
title: Synthetics
kind: documentation
description: "Make sure the most critical parts of your product are up and running from various locations around the world."
aliases:
  - /integrations/synthetics/
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "/synthetics/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting Synthetics"
- link: "/synthetics/settings/"
  tag: "Documentation"
  text: "Synthetics Settings"
---

{{< img src="synthetics/synthetics_home_page.png" alt="Synthetics home page" >}}

Synthetic tests allow you to observe how all your systems are performing as experienced by your users from around the globe -  Datadog tracks the performance of your applications and API endpoints using simulated user requests and browser rendering. Synthetics helps you ensure uptime, identify regional issues, compute error budgets, automate tests, and track application performance. By unifying Synthetics with your metrics, traces, and logs, you can test your production environment end-to-end.

## Getting Started

### Set up API tests

Monitor how your customers from around the world experience your http API endpoints using [Synthetics API tests][1].

{{< img src="synthetics/api.png" alt="API tests"  style="width:100%;">}}

### Set up Browser tests

Monitor how your customers from around the world experience your webpage using [Synthetics Browser tests][2].

{{< img src="synthetics/browser.gif" alt="Browser tests"  style="width:100%;">}}

### Set up Private Locations

Use [Synthetics Private Locations][3] to monitor internal APIs and websites - private URLs that aren’t accessible from the public internet.

{{< img src="synthetics/private_locations.png" alt="Private locations"  style="width:100%;">}}

### Connect Synthetics and Traces

[Link simulated API tests][7] to traces to find the root cause of failures across frontend, network and backend requests.

{{< img src="synthetics/traces.gif" alt="Synthetics"  style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/synthetics/api_test
[2]: https://docs.datadoghq.com/getting_started/synthetics/browser_test
[3]: https://docs.datadoghq.com/getting_started/synthetics/private_location
