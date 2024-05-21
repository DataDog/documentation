---
title: Synthetic Test Summary Dashboard
kind: documentation
aliases:
- /synthetics/dashboards/test_summary
further_reading:
- link: '/continuous_testing/explorer/'
  tag: 'Documentation'
  text: 'Learn about the Synthetic Monitoring & Testing Results Explorer'
---

## Overview

The [test summary dashboard][1] provides insights about your Synthetic test runs, Synthetic tests in your CI/CD pipelines, and private locations. It shows:

- **Synthetic monitoring & testing usage**: View a breakdown of your Synthetic test usage by environment, team, and test type.

  {{< img src="synthetics/dashboards/test_summary_dashboard.png" alt="Out-of-the-box Synthetics test summary dashboard" style="width:100%" >}}

- **Test automation**: View Synthetic test runs in your CI/CD pipelines by type and team.

  {{< img src="synthetics/dashboards/test_automation.png" alt="Continuous Testing and CI/CD Integrations section of the Synthetics test summary dashboard" style="width:100%" >}}

- **Private locations**: View the number of Synthetic workers by private location, the average concurrency, and average number of pulled tests.

  {{< img src="synthetics/dashboards/private_locations.png" alt="Private locations section of the Synthetics test summary dashboard" style="width:100%" >}}


For more information about the data displayed, see [Synthetic Monitoring Metrics][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30696/synthetics---test-summary
[2]: /watchdog/
[3]: /synthetics/metrics/
