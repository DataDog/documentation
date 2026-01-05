---
title: Scheduled CSV Reports
---

## Overview

Scheduled CSV Reports let you automatically receive recurring, structured data exports through email or Slack. This feature supports operational, compliance, and executive stakeholders by delivering periodic snapshots of key metrics, without needing to log into the Datadog platform.

## Define a query

To schedule a CSV Report, the query must meet the following conditions:

* The query must be created from the [Log Explorer][1]  
* The query result displays as a **List** or **Table** (no other visualization types are supported)  
* The query is not a composite query (no [subqueries][2])
* The query doesn't use [calculated fields][3] or [Reference Tables][4]
* The CSV is limited to 50k rows

## Schedule a CSV report

1. Click **More…**.  
2. Select **Schedule CSV Report**.
3. In the configuration modal that opens, set a schedule for the report to determine when and how often the report is sent.  
4. Configure report: Define the report title and set a time frame to determine the range of time displayed in the resulting report. The report time frame can be different from the time frame displayed on the dashboard.  
5. Add recipients  
   1. **Email recipients**: To add email recipients to your report, enter their email addresses. The email associated with your Datadog account is automatically added as a recipient. You can remove yourself as a recipient by hovering over your email and clicking the trash icon that appears next to it.  
   2. **Slack recipients**: To add Slack recipients, select the Slack workspace and channel from the available dropdowns. If you do not see any Slack workspaces available, ensure you have the Datadog [Slack Integration][5] installed. All public channels within the Slack workspace should be listed automatically. To select a private Slack channel, make sure to invite the Datadog Slack bot to the channel in Slack. To send a test message to Slack, add a channel recipient and click **Send Test Message**.

## Managing reports

To view CSV reports navigate to [Log Explorer][1] and click the **Reports** tab. 

**Note**: Reports are not tied to [Saved Views][6] and can only be accessed through the Reports tab. 

* You must have the **CSV Report Schedules Write** permission to create your own report schedules.
* You must have the **CSV Report Schedules Manage** permission to modify other users' report schedules.

After a report is created, you can subscribe, unsubscribe, edit a schedule, and delete a report assuming you have appropriate permissions. If you do not have **CSV Report Schedules Write** or **CSV Report Schedules Manage** permissions, you can unsubscribe from the report directly from an email

## Reports views

| Report View | Description | Required Permission |
| ----- | ----- | ----- |
| Created by you | Shows all Scheduled CSV Reports you have created from Log Explorer | CSV Report Schedules Write |
| All Reports | Shows all Scheduled CSV Reports in Log Explorer for the organization you are in | CSV Report Schedules Manage |
| Subscribed | Shows all Scheduled CSV Reports that you are Subscribed to | CSV Report Schedules Write |

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/advanced_search/#filter-logs-with-subqueries
[3]: /logs/explorer/calculated_fields/
[4]: /reference_tables/?tab=manualupload
[5]: /integrations/slack/?tab=datadogforslack
[6]: /logs/explorer/saved_views/#saved-views
