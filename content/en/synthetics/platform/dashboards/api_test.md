---
title: Synthetic API Test Performance Dashboard
kind: documentation
aliases:
- /synthetics/dashboards/api_test
further_reading:
- link: '/continuous_testing/explorer/'
  tag: 'Documentation'
  text: 'Learn about the Synthetic Monitoring & Testing Results Explorer'
---

## Overview

The [API test performance dashboard][1] provides insights about your entire stack and events. It shows:

- **API test types**: View your network levels' average response time, latency, or lookup time, along with transaction timings and response time by location by test type.

  {{< img src="synthetics/dashboards/api_test_performance_dashboard_2_2024.png" alt="Out-of-the-box Synthetics API test performance dashboard" style="width:100%" >}}

- **Events**: View events triggered for all of your API tests and filter for specific tests using the template variables at the top of the dashboard.
  
  {{< img src="synthetics/dashboards/api_test_performance_events_2_2024.png" alt="Events section of the Synthetics API test performance dashboard" style="width:100%" >}}


For more information about the data displayed, see [Synthetic Monitoring Metrics][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30695/synthetics---api-test-performance
[2]: /watchdog/
[3]: /synthetics/metrics/
