---
title: Scheduled Cost Reports
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/dashboards/sharing/scheduled_reports"
  tag: "Documentation"
  text: "Learn about scheduled dashboard reports"
---

## Overview
Scheduled Cloud Cost (CCM) Reports let you automatically receive recurring cost reports through email or Slack. This feature supports finance, engineering, and executive stakeholders by delivering periodic snapshots of cost metrics, without needing to log into the Datadog platform. Reports are sent as PDFs to your chosen Slack channels or email addresses.

{{< img src="cloud_cost/cost_reports/cloud-cost-scheduled-report-1.png" alt="Schedule Cost Report." style="width:80%;" >}}

## Schedule a cost report
1. Go to [**Cloud Cost > Analyze > Reports**][1] in Datadog.
2. [Create a report][2] or select an existing report.
3. Click **Share**, then **Schedule Report**.
    {{< img src="cloud_cost/cost_reports/share_scheduled_report.png" alt="Click the Share button and Schedule Report on an individual report page." style="width:90%;" >}}
    
4. In the configuration modal that opens:
   - Set your schedule (when and how often the report should be sent)
   - Enter a title for your schedule
5. Add recipients:
   - **Email recipients**: Enter email addresses. Your Datadog account is automatically added, but you can remove it by hovering over it and clicking the trash icon.
     {{< img src="dashboards/scheduled_reports/add_email_recipients.png" alt="The configuration modal for editing scheduled report variables." style="width:80%;" >}}  
    - **Slack recipients**: Select your Slack workspace and channel from the dropdowns. If no workspaces appear, make sure you have the Datadog [Slack Integration][2] installed. All public channels within the Slack workspace are listed automatically. For private channels, invite the Datadog Slack bot first. You can test the connection by clicking **Send Test Message**.
      {{< img src="dashboards/scheduled_reports/add_slack_recipients.png" alt="The configuration modal for editing scheduled report Slack recipients." style="width:80%;" >}}

## Managing schedules
A single Cloud Cost (CCM) Report can have multiple schedules with different settings, allowing you to inform different stakeholder groups interested in the same cost data. To view existing schedules, click **Share** and select **Manage Schedules**.

From the configuration modal that opens, you can:
- Pause existing schedules
- Create new schedules
- Edit schedule details
- Delete schedules

{{< img src="cloud_cost/cost_reports/manage-cost-report-schedules-2.png" alt="Manage a Cost Report's Schedule." style="width:70%;" >}}

## Viewing schedules

To see all Cloud Cost (CCM) Report schedules across your organization:
1. Navigate to [**Cloud Cost > Analyze > Reports**][1] and click the **Report Schedules** tab.
2. Use the "My schedules" toggle to switch between your personal schedules and all organization schedules.

{{< img src="cloud_cost/cost_reports/cost-report-schedules-view-4.png" alt="View all Cost Report Schedules." style="width:100%;" >}}

## Permissions
| Action | Required Permission |
|--------|----------|
| View schedules | Cloud Cost Report Schedules Write OR Cloud Cost Report Schedules Manage |
| Create/modify your schedules | Cloud Cost Report Schedules Write OR Cloud Cost Report Schedules Manage |
| Modify others' schedules | Cloud Cost Report Schedules Manage |

After a report is created, you can subscribe, unsubscribe, edit schedules, and delete reports (assuming you have the appropriate permissions). If you do not have **Cloud Cost Report Schedules Write** or **Cloud Cost Report Schedules Manage** permissions, you can still unsubscribe directly from the email.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/reports
[2]: /cloud_cost_management/reports
[3]: /integrations/slack/?tab=datadogforslack
