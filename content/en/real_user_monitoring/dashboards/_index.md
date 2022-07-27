---
title: RUM Dashboards
kind: documentation
description: Use out-of-the-box RUM dashboards to learn more about your application's data and performance.
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
---

## Overview

When you create a RUM application, Datadog [collects data][1] and generates dashboards about your application's performance, errors, resources, user sessions, and mobile performance. 

{{< img src="real_user_monitoring/dashboards/rum_application_overview_dashboard.png" alt="RUM Application Overview page" style="width:90%;" >}}

Access your RUM dashboards by filtering for `RUM` in the search query of the [**Dashboard List**][2] or by clicking on a dashboard's **Application Overview** in the [**RUM Applications** page][3].

{{< img src="real_user_monitoring/dashboards/available_rum_dashboards.png" alt="Out-of-the-box RUM Dashboards" style="width:90%;" >}}

{{< whatsnext desc="You can explore the following out-of-the-box RUM dashboards:" >}}
  {{< nextlink href="/real_user_monitoring/dashboards/performance_overview_dashboard" >}}<u>Performance Overview</u>: See a global view of your website’s performance and demographics. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/frustration_signals_dashboard" >}}<u>Frustration Signals</u>: Examine frustration signals where users experience the highest points of friction in your application. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/testing_coverage" >}}<u>Testing Coverage</u>: Evaluate your browser tests' application coverage and identify popular elements in your application to track using RUM and Synthetics data. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/user_sessions_dashboard" >}}<u>User Sessions</u>: Analyze user session and usage data for your RUM applications. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors_dashboard" >}}<u>Errors</u>: Observe errors that appear in user consoles by browser and device type. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/resources_dashboard" >}}<u>Resources</u>: Analyze which resources are the slowest and investigate third-party resources. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/mobile_dashboard" >}}<u>Mobile</u>: Observe screen views, errors, and crashes for your mobile RUM applications. {{< /nextlink >}}
{{< /whatsnext >}}

## Interact with RUM dashboards

You can clone [dashboards][4] and customize them to explore your application's data in the [RUM Explorer][5].

### Template variables

The generated RUM dashboards automatically contain a set of default template variables. Use the template variable dropdown menus to narrow your search. For example, you can filter for a specific application with the `applicationId` template variable.

{{< img src="real_user_monitoring/dashboards/template_variables.mp4" alt="Template variable" video=true style="width:50%;" >}}

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
[3]: https://app.datadoghq.com/rum/list
[4]: /dashboards/
[5]: /real_user_monitoring/explorer/
[6]: /real_user_monitoring/explorer/saved_views/
