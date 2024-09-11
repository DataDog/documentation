---
title: RUM Dashboards
description: Use out-of-the-box RUM dashboards to learn more about your application's data and performance.
aliases:
- /real_user_monitoring/dashboards
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
---

## Overview

When you create a RUM application, Datadog [collects data][1] and generates dashboards about your application's performance, errors, resources, and user sessions. 

{{< img src="real_user_monitoring/rum-performance-summary-2.png" alt="RUM Application Overview page" style="width:90%;" >}}

Access your RUM dashboards by filtering for `RUM` in the search query of the [**Dashboard List**][2] or from your application summary pages (**Digital Experience > Performance Summary** and **Digital Experience > Product Analytics > Analytics Summary**).

{{< img src="real_user_monitoring/dashboards/available_rum_dashboards-2.png" alt="Out-of-the-box RUM Dashboards" style="width:90%;" >}}

{{< whatsnext desc="You can explore the following out-of-the-box RUM dashboards:" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>Performance Overviews</u>: See a global view of your website/app performance and demographics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>Testing and Deployment</u>: Evaluate your browser tests' application coverage and identify popular elements in your application to track using RUM and Synthetics data. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>Usage</u>: Analyze user session and usage data for your RUM applications, including frustration signals. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>Errors</u>: Observe errors that appear in user consoles by browser and device type. {{< /nextlink >}}
{{< /whatsnext >}}

## Interact with RUM dashboards

You can clone [dashboards][3] and customize them to explore your application's data in the [RUM Explorer][4].

### Template variables

The generated RUM dashboards automatically contain a set of default template variables. Use the template variable dropdowns to select values and narrow your search. For more information, see the [Template Variables][5] documentation.

### View RUM events

To explore individual events, click on a graph and click **View RUM events**. This redirects you to the RUM Explorer with pre-selected search filters.

{{< img src="real_user_monitoring/dashboards/view_rum_events.mp4" alt="View RUM events" video=true style="width:80%;" >}}

### Customize dashboards

To clone your RUM dashboards, click the **Settings** icon and select **Clone dashboard**. To add more widgets, powerpacks, or apps, scroll down to the bottom and click the **+** icon. 

You can also modify the template variables and create a [saved view][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /dashboards/
[4]: /real_user_monitoring/explorer/
[5]: /dashboards/template_variables
[6]: /real_user_monitoring/explorer/saved_views/
