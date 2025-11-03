---
title: Scheduled Reports
aliases:
- /cloud_cost_management/scheduled_reports
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

Below is an example of a report sent to a Slack channel.

{{< img src="cloud_cost/cost_reports/cost-report-slack-1.png" alt="A report that has been sent to a Slack channel based on a schedule" style="width:70%;" >}}

For emails, the report PDF is included as an email attachment and/or as a link, depending on its size.

{{< img src="cloud_cost/cost_reports/cost-report-email.png" alt="A report that has been sent as an email based on a schedule" style="width:70%;" >}}

## Schedule a CCM report
1. Go to [**Cloud Cost > Analyze > Reports**][1] in Datadog.
2. [Create a report][2] or select an existing report.
3. Click **Share**, then **Schedule Report**.
    {{< img src="cloud_cost/cost_reports/share_scheduled_report-1.png" alt="Click the Share button and Schedule Report on an individual report page." style="width:90%;" >}}
    
4. In the configuration modal that opens:
   - Set your schedule (when and how often the report should be sent)
   - Enter a title for your schedule
5. Add recipients:
   - **Email recipients**: Enter email addresses. Your Datadog account is automatically added, but you can remove it by hovering over it and clicking the trash icon.

     **Note:** Enterprise and Pro accounts can send reports to recipients outside of their organizations. You can control which email domains are able to receive reports by configuring your [domain allowlist][4].

    - **Slack recipients**: Select your Slack workspace and channel from the dropdowns. If no workspaces appear, make sure you have the Datadog [Slack Integration][2] installed. All public channels within the Slack workspace are listed automatically. For private channels, invite the Datadog Slack bot first. You can test the connection by clicking the **Send Test Message** button.

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

After a report is created, you can subscribe, unsubscribe, edit schedules, and delete reports (assuming you have the appropriate permissions). **Note:** Only Datadog users can unsubscribe directly from the email. External recipients (including group email addresses) must contact the report schedule owner to unsubscribe, as Datadog cannot distinguish between group emails and individual external emails.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/reports
[2]: /cloud_cost_management/reporting
[3]: /integrations/slack/?tab=datadogforslack
[4]: /account_management/org_settings/domain_allowlist/