---
title: Synthetic Test Summary Dashboard
kind: documentation
further_reading:
- link: '/synthetics/ci_results_explorer'
  tag: 'Documentation'
  text: 'Learn about the CI Results Explorer'
---

## Overview

The [test summary dashboard][1] provides insights about your Synthetic test runs, Synthetic tests in your CI/CD pipelines, and private locations. It shows:

- **Synthetic monitoring & testing usage**: View a breakdown of your Synthetic test usage by environment, team, and test type.
- **Test automation**: View Synthetic test runs in your CI/CD pipelines by type and team.
- **Private locations**: View the number of Synthetic workers by private location, the average concurrency, and average number of pulled tests.

Click the pink Watchdog icon to open the [**Watchdog Insights**][2] side panel and analyze outstanding anomalies in your application performance or triggered monitor alerts.

{{< img src="synthetics/dashboards/test_summary_dashboard.png" alt="Out-of-the-box Synthetics test summary dashboard" style="width:100%" >}}
{{< img src="synthetics/dashboards/test_automation.png" alt="Continuous Testing and CI/CD Integrations section of the Synthetics test summary dashboard" style="width:100%" >}}
{{< img src="synthetics/dashboards/private_locations.png" alt="Private locations section of the Synthetics test summary dashboard" style="width:100%" >}}

For more information about the data displayed, see [Synthetic Monitoring Metrics][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30696/synthetics---test-summary
[2]: /watchdog/
[3]: /synthetics/metrics/
