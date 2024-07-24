---
title: Synthetic Dashboards
description: Explore out-of-the-box Synthetic dashboards to learn more about your Synthetic tests.  
aliases:
- /synthetics/dashboards
further_reading:
- link: '/synthetics/'
  tag: 'Documentation'
  text: 'Learn about Synthetic Monitoring'
- link: '/continuous_testing/explorer/'
  tag: 'Documentation'
  text: 'Learn about the Synthetic Monitoring & Testing Results Explorer'
- link: '/continuous_testing/explorer/saved_views'
  tag: 'Documentation'
  text: 'Learn about Saved Views'
---

## Overview

When you create a Synthetic test, Datadog [collects data][1] and generates dashboards about your stack, browser applications, or overall tests' performance, private locations, and events. 

Access your Synthetic dashboards by filtering for `Synthetics` in the search query of the [**Dashboard List**][2] or by clicking on the dropdown menu under [**Dashboards**][3] on the [Synthetic Monitoring & Continuous Testing page][4].

{{< img src="synthetics/dashboards/dashboards_homepage_blurred.png" alt="Synthetic Monitoring Dashboards on the Synthetic Monitoring & Continuous Testing homepage" style="width:100%;">}}

{{< whatsnext desc="You can explore the following out-of-the-box Synthetic dashboards:" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>API Test Performance</u>: Monitor your endpoints and services. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>Browser Test Performance</u>: View your browser tests' web performance, insights into third-party providers, and Core Web Vitals. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>Test Overview</u>: See insights about your Synthetic tests by region, environment, or team. {{< /nextlink >}}
{{< /whatsnext >}}

## Customize your Synthetic dashboards

You can clone [dashboards][5] and customize them by team, environment, or region using template variables. You can also customize your view and create a [saved view][6] of your cloned dashboard.

### Edit template variables

The generated Synthetic dashboards automatically contain a set of default template variables. Use the template variable dropdown menus to narrow the data shown in the dashboard. For example, you can filter for a specific browser type with the `Browser` template variable. For more information, see the [Template Variables][7] documentation. To clone your Synthetic dashboard, click the **Clone** button next to the **Configure** icon. 

{{< img src="synthetics/dashboards/clone.png" alt="Clone a dashboard" style="width:100%;">}}

The Synthetic dashboard has a default view which you can adjust. Click the **Edit** icon to enter edit mode and customize your template variables.

{{< img src="synthetics/dashboards/synthetics_template_variable_edit.png" alt="Edit template variables in a Synthetic dashboard" style="width:100%;">}}

### Create a saved view

Once you are done editing, click **Done** and select **Save selections as view** from the left hand dropdown menu. 

{{< img src="synthetics/dashboards/saved_view.png" alt="Create a saved view in a Synthetic dashboard" style="width:60%;">}}

Enter a name for your saved view and click **Save**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /dashboards/
[6]: /continuous_testing/explorer/saved_views/
[7]: /dashboards/template_variables/