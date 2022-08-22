---
title: Reporting
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
---

## Overview

Reporting automatically sends a visual summary of a dashboard to selected recipients on a schedule. The generated reports display images of widgets from a dashboard in a linear HTML format.

{{< img src="dashboards/reporting/report_example.png" alt="An example report titled Checkout KPI Report showing a date, a description, a dashboard link, the name of the Datadog organization, and 3 images of dashboard widgets" style="width:70%;" >}}

## Schedule a report

Create a new report from any dashboard with a grid-based or automatic layout. Click on the dashboard’s cog icon and select **Schedule a Report**.

The following widget types are supported:

- [Change][1]
- [Distribution][2]
- [Geomap][3]
- [Group][4]
- [Heat Map][5]
- [Monitor Summary][6]
- [Notes and Links][7]
- [Query Value][8]
- [Scatter Plot][9]
- [Table][10]
- [Timeseries][11]
- [Top List][12]

### Set a schedule

In the configuration modal that opens, set a schedule for the report to determine when and how often the report is sent. Set a time frame to determine the range of time displayed in the resulting report. The report time frame can be different from the time frame displayed on the dashboard.

### Add recipients

Add recipients to your report by entering their email addresses. The email associated with your Datadog account is automatically added as a recipient. You can remove yourself as a recipient by hovering over your email and clicking the **X** that appears next to it.   

**Note:** Enterprise and Pro accounts can send reports to recipients outside of their organizations. 

{{< img src="dashboards/reporting/report_configuration_modal.png" alt="The configuration modal for an individual dashboard report, with sections to set a schedule, add recipients, and customize email. At the bottom of the modal are buttons to edit template variables, delete report, send preview, cancel, and save" style="width:100%;" >}}

### Customize the report

Finally, customize the report to provide recipients with more context or a tailored view. The optional description appears at the top of each report to provide more context on the dashboard.

Click **Edit Template Variables** to modify the filters applied when the report is sent. These values do not affect the underlying dashboard’s defaults. 

To see the report before saving the schedule, click **Send Preview**. You can pause a report schedule at any time.

## Managing reports
A single dashboard can have multiple scheduled reports with different settings, for example, to support different groups of stakeholders interested in the same dashboard. To see the reports on an existing dashboard, open the dashboard cog menu and select **Configure Reports**. 

{{< img src="dashboards/reporting/dashboard_cog_menu.png" alt="A view of the menu displayed when hovering over the cog icon in a dashboard, showing the option to configure reports" style="width:50%;" >}}

From the configuration modal that opens, you can pause an existing report or create a new report. To see and edit the details of an existing report, or delete the report, click **Edit**.

{{< img src="dashboards/reporting/reporting_configuration_modal.png" alt="The configuration modal for reporting, with two reports displayed, each showing their titles, tags, recipients, frequency, an option to toggle the report on or off, and a button to edit the report. At the bottom is a button to add a new report and a done button" style="width:100%;" >}}

## Permissions

Only users with the **Dashboard Report Write** permission can generate a report. This permission is turned on by default for Admins and off for all other roles. 

Images generated in reports show all data regardless of granular read restrictions. We recommend limiting the report permissions to users who have no granular read restrictions on data. To grant a user the **Dashboard Report Write** permission, create a new role with the **Dashboards Report Write** permission turned on and assign the user to this role. Alternatively, assign the **Admin** role to this user. To learn more about managing roles and permissions, read our [account management documentation][13]. 

{{< img src="dashboards/reporting/dashboard_permissions.png" alt="A screenshot of an individual user's permissions from within the organization settings page. The dashboards report write permission is highlighted under the dashboards section" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/change/
[2]: /dashboards/widgets/distribution/
[3]: /dashboards/widgets/geomap/
[4]: /dashboards/widgets/group/
[5]: /dashboards/widgets/heat_map/
[6]: /dashboards/widgets/monitor_summary/
[7]: /dashboards/widgets/note/
[8]: /dashboards/widgets/query_value/
[9]: /dashboards/widgets/scatter_plot/
[10]: /dashboards/widgets/table/
[11]: /dashboards/widgets/timeseries/
[12]: /dashboards/widgets/top_list/
[13]: /account_management/users/#edit-a-user-s-roles
