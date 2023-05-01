---
title: Synthetic API Test Performance Dashboard
kind: documentation
further_reading:
- link: '/synthetics/ci_results_explorer'
  tag: 'Documentation'
  text: 'Learn about the CI Results Explorer'
---

## Overview

The [API test performance dashboard][1] provides insights about your entire stack and events. It shows:

- **API test types**: View your network levels' average response time, latency, or lookup time, along with transaction timings and response time by location by test type.
- **Events**: View events triggered for all of your API tests and filter for specific tests using the template variables at the top of the dashboard.

Click the pink Watchdog icon to open the [**Watchdog Insights**][2] side panel and analyze outstanding anomalies in your application performance or triggered monitor alerts.

{{< img src="synthetics/dashboards/api_test_performance_dashboard.png" alt="Out-of-the-box Synthetics API test performance dashboard" style="width:100%" >}}

{{< img src="synthetics/dashboards/api_test_performance_events.png" alt="Events section of the Synthetics API test performance dashboard" style="width:100%" >}}

For more information about the data displayed, see [Synthetic Monitoring Metrics][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30695/synthetics---api-test-performance
[2]: /watchdog/
[3]: /synthetics/metrics/
