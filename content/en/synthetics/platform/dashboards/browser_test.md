---
title: Synthetic Browser Test Performance Dashboard
kind: documentation
description: Learn about the out-of-the-box Synthetic browser test performance dashboard.
aliases:
- /synthetics/dashboards/browser_test
further_reading:
- link: '/continuous_testing/explorer/'
  tag: 'Documentation'
  text: 'Learn about the Synthetic Monitoring & Testing Results Explorer'
---

## Overview

The [browser test performance dashboard][1] provides insights about your browser test runs, browser analysis, web performance, and events. It shows:

- **Synthetic browser test analysis**: See a breakdown of success rate by browser type, a list of browser test alerts, and average test duration by browser type and location.
  
  {{< img src="synthetics/dashboards/browser_test_analysis.png" alt="Browser test analysis section of the Synthetic Browser test performance dashboard" style="width:100%" >}}

- **Synthetic test web performance**: If you have Datadog RUM enabled, use the [RUM integration][2] to examine core web vitals and a list of third-party provider test resources.  
  
  {{< img src="synthetics/dashboards/browser_test_web_performance.png" alt="Synthetic test web performance section of the Synthetics Browser test performance dashboard" style="width:100%" >}}

- **Events**: Explore outstanding events from your Synthetic test alerts.

  {{< img src="synthetics/dashboards/browser_test_events.png" alt="Events section of the Synthetics Browser test performance dashboard" style="width:100%" >}}


{{< img src="synthetics/dashboards/browser_test_performance.png" alt="Out-of-the-box Synthetics Browser test performance dashboard" style="width:100%" >}}

For more information about the data displayed, see [Synthetic Monitoring Metrics][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /synthetics/guide/explore-rum-through-synthetics/
[3]: /watchdog/
[4]: /synthetics/metrics/
