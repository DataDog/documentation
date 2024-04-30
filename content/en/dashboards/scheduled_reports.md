---
title: Scheduled Reports
kind: documentation
disable_toc: false
is_public: true
further_reading:
  - link: "https://www.datadoghq.com/blog/dashboard-sharing/"
    tag: "Blog"
    text: "Share Datadog dashboards securely with anyone"
  - link: "https://www.datadoghq.com/blog/template-variable-associated-values/"
    tag: "Blog"
    text: "Use associated template variables to refine your dashboards"
  - link: "https://learn.datadoghq.com/courses/building-better-dashboards"
    tag: "Learning Center"
    text: "Building Better Dashboards"
aliases:
    - /dashboards/reporting/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Scheduled Reports are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Scheduled reports enable Datadog users to share dashboards as high-density PDFs by email on a recurring basis.

{{< img src="dashboards/scheduled_reports/report_email.png" alt="Example report email with PDF attachment" style="width:90%;" >}}

{{< img src="dashboards/scheduled_reports/report_pdf.png" alt="Example report PDF attachment" style="width:90%;" >}}


## Schedule a report

Create a report from any [grid-based dashboard](https://www.datadoghq.com/blog/datadog-dashboards/) or timeboard. The dashboard must have at least one [supported widget](#supported-widget-types). Click the **Share** button at the top of your dashboard and select **Schedule a Report**.

{{< img src="dashboards/scheduled_reports/report_configuration_modal.png" alt="The configuration modal for an individual dashboard report, with sections to set a schedule, add recipients, and customize email. At the bottom of the modal are buttons to edit template variables, delete report, send preview, cancel, and save" style="width:90%;" >}}

### Set a schedule

In the configuration modal that opens, set a schedule for the report to determine when and how often the report is sent. Set a time frame to determine the range of time displayed in the resulting report. The report time frame can be different from the time frame displayed on the dashboard.

### Add recipients

Add recipients to your report by entering their email addresses. The email associated with your Datadog account is automatically added as a recipient. You can remove yourself as a recipient by hovering over your email and clicking the **X** that appears next to it.

**Note:** Enterprise and Pro accounts can send reports to recipients outside of their organizations.

### Customize the report

Finally, customize the report to provide recipients with more context or a tailored view. The optional description appears at the top of each report to provide more context on the dashboard.

Click **Edit Template Variables** to modify the filters applied when the report is sent. These values do not affect the underlying dashboard's defaults.

To see the report before saving the schedule, click **Send Preview**. You can pause a report schedule at any time.

## Managing reports
A single dashboard can have multiple scheduled reports with different settings, for example, to support different groups of stakeholders interested in the same dashboard. To see the reports on an existing dashboard, click the **Share** button and select **Configure Reports**.

From the configuration modal that opens, you can pause an existing report or create a new report. To see and edit the details of an existing report, or delete the report, click **Edit**.

{{< img src="dashboards/scheduled_reports/scheduled_reports_configuration_modal.png" alt="The configuration modal for scheduled reports, with two reports displayed, each showing their titles, tags, recipients, frequency, an option to toggle the report on or off, and a button to edit the report. At the bottom is a button to add a new report and a done button" style="width:90%;" >}}

## Permissions

Users need the `generate_dashboard_reports` [permission][29] to create and edit report schedules. This permission can be granted by another user with the `user_access_manage` permission and is available by default to users with the `org_management` permission.

{{< img src="dashboards/scheduled_reports/dashboard_permissions.png" alt="A screenshot of an individual user's permissions from within the organization settings page. The dashboards report write permission is highlighted under the dashboards section" style="width:90%;" >}}

Users with the `org_management` permission can enable or disable the scheduled reports feature for an account from the **Settings** tab under [Public Sharing][15] in **Organization Settings**.

{{< img src="dashboards/scheduled_reports/report_management.png" alt="The Report Management setting under the Settings tab in Public Sharing within Organization Settings in Datadog with the setting Enabled" style="width:90%;" >}}

## Supported widget types

The following widget types are supported:

- [Alert Graph][18]
- [Alert Value][19]
- [Change][1]
- [Check Status][20]
- [Distribution][2]
- [Free Text][21]
- [Funnel][22]
- [Geomap][3]
- [Group][4]
- [Heatmap][5]
- [List][23]
- [Monitor Summary][6]
- [Notes and Links][7]
- [Pie Chart][16]
- [Powerpack][24]
- [Profiling Flame Graph][25]
- [Query Value][8]
- [Scatter Plot][9]
- [SLO Summary][10]
- [SLO List][11]
- [Split Graph][26]
- [Table][12]
- [Timeseries][13]
- [Top List][14]
- [Topology][27]
- [Tree Map][28]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/change/
[2]: /dashboards/widgets/distribution/
[3]: /dashboards/widgets/geomap/
[4]: /dashboards/widgets/group/
[5]: /dashboards/widgets/heatmap/
[6]: /dashboards/widgets/monitor_summary/
[7]: /dashboards/widgets/note/
[8]: /dashboards/widgets/query_value/
[9]: /dashboards/widgets/scatter_plot/
[10]: /dashboards/widgets/slo/
[11]: /dashboards/widgets/slo_list/
[12]: /dashboards/widgets/table/
[13]: /dashboards/widgets/timeseries/
[14]: /dashboards/widgets/top_list/
[15]: /account_management/org_settings/#public-sharing
[16]: /dashboards/widgets/pie_chart/
[17]: /account_management/users
[18]: /dashboards/widgets/alert_graph/
[19]: /dashboards/widgets/alert_value/
[20]: /dashboards/widgets/check_status/
[21]: /dashboards/widgets/free_text/
[22]: /dashboards/widgets/funnel/
[23]: /dashboards/widgets/list/
[24]: /dashboards/widgets/powerpack/
[25]: /dashboards/widgets/profiling_flame_graph/
[26]: /dashboards/widgets/split_graph/
[27]: /dashboards/widgets/topology_map/
[28]: /dashboards/widgets/treemap/
[29]: /account_management/rbac/permissions/#dashboards
