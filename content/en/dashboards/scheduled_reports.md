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
<div class="alert alert-warning">Scheduled Reports are not supported for this site.</div>
{{< /site-region >}}

## Overview

Scheduled dashboard reports automatically send a visual summary of a dashboard to selected recipients on a schedule. The generated reports display images of widgets from a dashboard in a linear HTML format.

{{< img src="dashboards/scheduled_reports/report_example.png" alt="An example report titled Checkout KPI Report showing a date, a description, a dashboard link, the name of the Datadog organization, and 3 images of dashboard widgets" style="width:70%;" >}}

## Schedule a report

Create a report from any dashboard with a grid-based or automatic layout. Click the **Share** button and select **Schedule a Report**.

The following widget types are supported:

- [Change][1]
- [Distribution][2]
- [Geomap][3]
- [Group][4]
- [Heatmap][5]
- [Monitor Summary][6]
- [Notes and Links][7]
- [Pie Chart][16]
- [Query Value][8]
- [Scatter Plot][9]
- [SLO Summary][10]
- [SLO List][11]
- [Table][12]
- [Timeseries][13]
- [Top List][14]

### Set a schedule

In the configuration modal that opens, set a schedule for the report to determine when and how often the report is sent. Set a time frame to determine the range of time displayed in the resulting report. The report time frame can be different from the time frame displayed on the dashboard.

### Add recipients

Add recipients to your report by entering their email addresses. The email associated with your Datadog account is automatically added as a recipient. You can remove yourself as a recipient by hovering over your email and clicking the **X** that appears next to it.   

**Note:** Enterprise and Pro accounts can send reports to recipients outside of their organizations. 

{{< img src="dashboards/scheduled_reports/report_configuration_modal.png" alt="The configuration modal for an individual dashboard report, with sections to set a schedule, add recipients, and customize email. At the bottom of the modal are buttons to edit template variables, delete report, send preview, cancel, and save" style="width:100%;" >}}

### Customize the report

Finally, customize the report to provide recipients with more context or a tailored view. The optional description appears at the top of each report to provide more context on the dashboard.

Click **Edit Template Variables** to modify the filters applied when the report is sent. These values do not affect the underlying dashboard's defaults. 

To see the report before saving the schedule, click **Send Preview**. You can pause a report schedule at any time.

## Managing reports
A single dashboard can have multiple scheduled reports with different settings, for example, to support different groups of stakeholders interested in the same dashboard. To see the reports on an existing dashboard, open the **Share** menu and select **Configure Reports**. 

{{< img src="dashboards/scheduled_reports/configure_reports.png" alt="A view of the option to configure reports in the dashboard Share menu" style="width:50%;" >}}

From the configuration modal that opens, you can pause an existing report or create a new report. To see and edit the details of an existing report, or delete the report, click **Edit**.

{{< img src="dashboards/scheduled_reports/scheduled_reports_configuration_modal.png" alt="The configuration modal for scheduled reports, with two reports displayed, each showing their titles, tags, recipients, frequency, an option to toggle the report on or off, and a button to edit the report. At the bottom is a button to add a new report and a done button" style="width:100%;" >}}

## Permissions

Only users with the **Dashboard Report Write** permission can generate a report. This permission is turned on by default for Admins and off for all other roles.

Images generated in reports show all data regardless of granular read restrictions. Datadog recommends limiting the report permissions to users who have no granular read restrictions on data. To grant a user the **Dashboard Report Write** permission, create a new role with the **Dashboards Report Write** permission turned on and assign the user to this role. Alternatively, assign the **Admin** role to this user. To learn about managing roles and permissions, see [User Management][17]. 

{{< img src="dashboards/scheduled_reports/dashboard_permissions.png" alt="A screenshot of an individual user's permissions from within the organization settings page. The dashboards report write permission is highlighted under the dashboards section" style="width:100%;" >}}

Users with the Admin role or **Org Management** permission can enable or disable the scheduled reports feature for an account from the **Settings** tab under [Public Sharing][15] in **Organization Settings**.

{{< img src="dashboards/scheduled_reports/report_management.png" alt="The Report Management setting under the Settings tab in Public Sharing within Organization Settings in Datadog with the setting Enabled" style="width:100%;" >}}

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

