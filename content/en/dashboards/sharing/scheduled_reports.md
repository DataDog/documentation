---
title: Scheduled Reports
disable_toc: false
aliases:
    - /dashboards/reporting/
    - /dashboards/scheduled_reports/
further_reading:
  - link: "https://www.datadoghq.com/blog/dashboard-sharing/"
    tag: "Blog"
    text: "Share Datadog dashboards securely with anyone"
  - link: "https://www.datadoghq.com/blog/template-variable-associated-values/"
    tag: "Blog"
    text: "Use associated template variables to refine your dashboards"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Scheduled Reports are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Scheduled reports enable Datadog users to share dashboards as high-density PDFs by email on a recurring basis.

{{< img src="dashboards/scheduled_reports/report_email.png" alt="Example report email with PDF attachment" style="width:90%;" >}}

The report PDF is included as an email attachment or as a link, depending on its size.

{{< img src="dashboards/scheduled_reports/report_pdf.png" alt="Example report PDF attachment" style="width:90%;" >}}

## Schedule a report

Create a report from any [dashboard or timeboard][1] that has at least one [supported widget](#unsupported-widget-types).

Click the **Share** button at the top of your dashboard and select **Schedule report**.

### 1. Set a schedule

In the configuration modal that opens, set a schedule for the report to determine when and how often the report is sent. 

**{{< img src="dashboards/scheduled_reports/set_schedule.png" alt="Section for defining a report schedule. Includes a schedule preview table showing the next 5 scheduled report dates." style="width:90%;" >}}**

### 2. Configure report

Define the report title and set a time frame to determine the range of time displayed in the resulting report. The report time frame can be different from the time frame displayed on the dashboard.

**Note:** Modifying the report time frame updates the **Schedule Preview** dropdown table above.

**{{< img src="dashboards/scheduled_reports/configure_report.png" alt="Section for defining a report schedule" style="width:90%;" >}}**

Click **Edit Variables** to modify the filters applied when the report is sent. These values do not affect the dashboard's default template variable values.

**{{< img src="dashboards/scheduled_reports/edit_variables.png" alt="The configuration modal section for customizing the report title, timeframe and variables." style="width:90%;" >}}**

### 3. Add recipients

Add recipients to your report by entering their email addresses. The email associated with your Datadog account is automatically added as a recipient. You can remove yourself as a recipient by hovering over your email and clicking the trash icon that appears next to it.

**Note:** Enterprise and Pro accounts can send reports to recipients outside of their organizations.

**{{< img src="dashboards/scheduled_reports/add_recipients.png" alt="The configuration modal for editing scheduled report variables." style="width:90%;" >}}**

To see the report before saving the schedule, click **Send Test Email**. You can pause a report schedule at any time.

## Managing reports
A single dashboard can have multiple scheduled reports with different settings, which allows you to inform different groups of stakeholders interested in the same dashboard. To see the reports on an existing dashboard, click the **Share** button and select **Configure Reports**.

From the configuration modal that opens, you can pause an existing report or create a new report. To see and edit the details of an existing report, or delete the report, click **Edit**.

{{< img src="dashboards/scheduled_reports/manage_reports.png" alt="The configuration modal for scheduled reports, with two reports displayed, each showing their titles, tags, recipients, frequency, an option to toggle the report on or off, and a button to edit the report. At the bottom is a button to add a new report and a cancel button" style="width:90%;" >}}

## Permissions

Users need the **Dashboards Report Write** [permission][2] to create and edit report schedules.
This permission can be granted by another user with the **User Access Manage** permission.

{{< img src="dashboards/scheduled_reports/permissions.png" alt="A screenshot of an individual user's permissions from within the organization settings page. The dashboards report write permission is highlighted under the dashboards section" style="width:90%;" >}}

Users with the **Org Management** permission can enable or disable the scheduled reports feature for their organization from the **Settings** tab under [Public Sharing][3] in **Organization Settings**.

{{< img src="dashboards/scheduled_reports/org_preference.png" alt="The Report Management setting under the Settings tab in Public Sharing within Organization Settings in Datadog with the setting Enabled" style="width:90%;" >}}

## Unsupported widget types

The following widget types are **not** supported and will be shown as empty in the report:
- [Iframe][4]
- [Image][5]
- [Hostmap][6]
- [Run Workflow][7]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#get-started
[2]: /account_management/rbac/permissions/
[3]: /account_management/org_settings/#public-sharing
[4]: /dashboards/widgets/iframe/
[5]: /dashboards/widgets/image/
[6]: /dashboards/widgets/hostmap/
[7]: /dashboards/widgets/run_workflow/

