---
title: Scheduled Cost Reports
---

## Overview
Scheduled Cloud Cost (CCM) Reports let you automatically receive recurring cost reports through email or Slack. This feature supports finance, engineering, and executive stakeholders by delivering periodic snapshots of cost metrics, without needing to log into the Datadog platform. The report PDF can be sent to Slack channels or email addresses.

{{< img src="cloud_cost/cost_reports/cloud-cost-scheduled-report.png" alt="Schedule Cost Report." style="width:100%;" >}}

## Schedule a Cost Report
1. Go to [**Cloud Cost > Analyze > Reports**][1] in Datadog.
Create a new report or click on an existing report. To create a new report, see the documentation on Cloud Cost Reports here.
2. Click Share, then Schedule Report. In the configuration modal that opens, set a schedule for the report to determine when and how often the report is sent. Enter your schedule’s title.
3. Add recipients:
    1. **Email recipients**: To add email recipients to your report, enter their email addresses. The email associated with your Datadog account is automatically added as a recipient. You can remove yourself as a recipient by hovering over your email and clicking the trash icon that appears next to it.
    **{{< img src="dashboards/scheduled_reports/add_email_recipients.png" alt="The configuration modal for editing scheduled report variables." style="width:90%;" >}}**
   2. **Slack recipients**: To add Slack recipients, select the Slack workspace and channel from the available dropdowns. If you do not see any Slack workspaces available, ensure you have the Datadog [Slack Integration][5] installed. All public channels within the Slack workspace should be listed automatically. To select a private Slack channel, make sure to invite the Datadog Slack bot to the channel in Slack. To send a test message to Slack, add a channel recipient and click **Send Test Message**.
    **{{< img src="dashboards/scheduled_reports/add_slack_recipients.png" alt="The configuration modal for editing scheduled report email recipients." style="width:90%;" >}}**

## Managing Reports
A single report can have multiple scheduled reports with different settings, which allows you to inform different groups of stakeholders interested in the same cost report. To see the schedules on an existing report, click the Share button and select Manage Schedules.

From the configuration modal that opens, you can pause an existing schedule or create a new schedule. To see and edit the details of an existing schedule, or delete the schedule, click Edit.

{{< img src="cloud_cost/cost_reports/manage-cost-report-schedules.png" alt="Manage a Cost Report's Schedule." style="width:100%;" >}}

To see all report schedules, navigate to [**Cloud Cost > Analyze > Reports**][1] and click the Report Schedules tab. On this page, you can click the “My schedules” toggle to switch between the schedules you’ve created and all the schedules in your organization.

{{< img src="cloud_cost/cost_reports/cost-report-schedules-view.png" alt="View all Cost Report Schedules." style="width:90%;" >}}

## Permissions
- You must have at least one of **Cloud Cost Report Schedules Write** or **Cloud Cost Report Schedules Manage** permissions to see any report schedules created in your organization.
- You must have the **Cloud Cost Report Schedules Write** permission to create and modify your own report schedules.
- You must have the **Cloud Cost Report Schedules Manage** permission to modify other users’ report schedules.

After a report is created, you can subscribe, unsubscribe, edit a schedule, and delete a report assuming you have appropriate permissions. If you do not have **Cloud Cost Report Schedules Write** or **Cloud Cost Report Schedules Manage** permissions, you can unsubscribe from the report directly from an email.

[1]: https://app.datadoghq.com/cost/analyze/reports
