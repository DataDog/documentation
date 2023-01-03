---
title: Synthetics Dashboards
kind: documentation
description: Explore out-of-the-box Synthetics dashboards to learn more about your Synthetic tests.  
further_reading:
- link: '/synthetics/'
  tag: 'Documentation'
  text: 'Learn about Synthetic Monitoring'
- link: '/synthetics/ci_results_explorer'
  tag: 'Documentation'
  text: 'Learn about the CI Results Explorer'
---

## Overview

When you create a Synthetics test, Datadog [collects data][1] and generates dashboards about your stack, browser applications, or overall tests' performance, private locations, and events. 

Access your Synthetics dashboards by filtering for `Synthetics` in the search query of the [**Dashboard List**][2] or by clicking on the dropdown menu under [**Dashboards**][3] on the [Synthetic Monitoring homepage][4].

{{< img src="synthetics/dashboards/synthetic_tests_dashboards.png" alt="Synthetic Monitoring Dashboards" style="width:100%;">}}

{{< whatsnext desc="You can explore the following out-of-the-box Synthetics dashboards:" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>API Test Performance</u>: Monitor your endpoints and services. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>Browser Test Performance</u>: View your browser tests' web performance, insights into third-party providers, and Core Web Vitals. {{< /nextlink >}}
    {{< nextlink href="/synthetics/dashboards/testing_coverage" >}}<u>Testing Coverage</u>: Evaluate your browser tests' application coverage and identify popular elements in your application to track using RUM and Synthetics data. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>Test Summary</u>: See insights about your Synthetic tests by region, environment, or team. {{< /nextlink >}}
{{< /whatsnext >}}

## Interact with Synthetics dashboards

You can clone [dashboards][5] and customize them by team, environment, or region using template variables.

### Template variables

The generated Synthetics dashboards automatically contain a set of default template variables. Use the template variable dropdown menus to narrow the data shown in the dashboard. For example, you can filter for a specific browser type with the `Browser` template variable.

### Saved views

The Synthetics dashboard has a default view. To adjust the dashboard view, click the **Edit** icon and customize your template variables. 

Once you are done editing, click **Save** and select **Save selections as view** from the left hand dropdown menu. Enter a name for your saved view and click **Save**.

### Customize dashboards

To clone your Synthetics dashboard, click the **Settings** icon and select **Clone dashboard**. To add more widgets, powerpacks, or apps, scroll down to the bottom and click the **+** icon. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /dashboards/
