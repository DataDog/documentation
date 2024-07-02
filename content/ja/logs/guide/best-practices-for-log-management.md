---
title: Best Practices for Log Management
kind: guide
aliases:
    - /logs/guide/logs-monitors-on-volumes/
further_reading:
    - link: /logs/log_configuration/processors
      tag: Documentation
      text: Learn how to process your logs
    - link: /logs/log_configuration/parsing
      tag: Documentation
      text: Learn more about parsing
    - link: "https://www.datadoghq.com/blog/log-management-policies/"
      tag: Blog
      text: How to implement log management policies with your teams
algolia:
  tags: [log usage]
---

## Overview

Datadog Log Management collects, processes, archives, explores, and monitors your logs, so that you have visibility into your system's issues. However, it can be hard to get the right level of visibility from your logs and log throughput can vary highly, creating unexpected resource usage.

Therefore, this guide walks you through various Log Management best practices and account configurations that provide you flexibility in governance, usage attribution, and budget control. More specifically, how to:

- [Set up multiple indexes to segment your logs](#set-up-multiple-indexes-for-log-segmentation)
- [Set up multiple archives for long-term storage](#set-up-multiple-archives-for-long-term-storage)
- [Set up RBAC for custom roles](#set-up-rbac-for-custom-roles)

This guide also goes through how to monitor your log usage by:

- [Alerting on unexpected log traffic spikes](#alert-on-unexpected-log-traffic-spikes)
- [Alerting on indexed logs when the volume passes a specified threshold](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)
- [Setting up exclusion filters on high-volume logs](#set-up-exclusion-filters-on-high-volume-logs)

If you want to transform your logs or redact sensitive data in your logs before they leave your environment, see how to [aggregate, process, and transform your log data with Observability Pipelines][29].

## Log account configuration

### Set up multiple indexes for log segmentation

Set up multiple indexes if you want to segment your logs for different retention periods or daily quotas, usage monitoring, and billing. 

For example, if you have logs that only need to be retained for 7 days, while other logs need to be retained for 30 days, use multiple indexes to separate out the logs by the two retention periods.

To set up multiple indexes:

1. Navigate to [Log Indexes][1].
2. Click **New Index** or **Add a new index**.
3. Enter a name for the Index.
4. Enter the search query to filter to the logs you want in this index.
5. Set the daily quota to limit the number of logs that are stored within an index per day.
6. Set the retention period to how long you want to retain these logs.
7. Click **Save**.

Setting daily quotas on your indexes can help prevent billing overages when new log sources are added or if a developer unintentionally changes the logging levels to debug mode. See [Alert on indexes reaching their daily quota](#alert-on-indexes-reaching-their-daily-quota) on how to set up a monitor to alert when a percentage of the daily quota is reached within the past 24 hours.

### Set up multiple archives for long-term storage

If you want to store your logs for longer periods of time, set up [Log Archives][2] to send your logs to a storage-optimized system, such as Amazon S3, Azure Storage, or Google Cloud Storage. When you want to use Datadog to analyze those logs, use [Log Rehydration][3]TM to capture those logs back in Datadog. With multiple archives, you can both segment logs for compliance reasons and keep rehydration costs under control.

#### Set up max scan size to manage expensive rehydrations 

Set a limit on the volume of logs that can be rehydrated at one time. When setting up an archive, you can define the maximum volume of log data that can be scanned for Rehydration. See [Define maximum scan size][4] for more information.

### Set up RBAC for custom roles

There are three [default Datadog roles][5]: Admin, Standard, and Read-only. You can also create custom roles with unique permission sets. For example, you can create a role that restricts users from modifying index retention policies to avoid unintended cost spikes. Similarly, you can restrict who can modify log parsing configurations to avoid unwanted changes to well-defined log structures and formats.

To set up custom roles with permissions:

1. Log in to [Datadog][6] as an Admin.
2. Navigate to [Organization Settings > Roles][7].
3. To enable custom roles, click the cog on the top left and then click **Enable**.
4. Once enabled, click **New Role**.
5. Enter a name for the new role.
6. Select the permissions for the role. This allows you to restrict access to certain actions, such as rehydrating logs and creating log-based metrics. See [Log Management Permissions][8] for details.
7. Click **Save**.

See [How to Set Up RBAC for Logs][9] for a step-by-step guide on how to set up and assign a role with specific permissions for an example use case.

## Monitor log usage

You can monitor your log usage, by setting up the following:

- [Alerts for unexpected log traffic spikes](#alert-on-unexpected-log-traffic-spikes)
- [Alert when an indexed log volume passes a specified threshold](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)

### Alert on unexpected log traffic spikes

#### Log usage metrics

By default, [log usage metrics][10] are available to track the number of ingested logs, ingested bytes, and indexed logs. These metrics are free and kept for 15 months:

- `datadog.estimated_usage.logs.ingested_bytes`
- `datadog.estimated_usage.logs.ingested_events`

See [Anomaly detection monitors][11] for steps on how to create anomaly monitors with the usage metrics.

**Note**: Datadog recommends setting the unit to `byte` for the `datadog.estimated_usage.logs.ingested_bytes` in the [metric summary page][12]:

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="The metric summary page showing the datadog.estimated_usage.logs.ingested_bytes side panel with the unit set to byte" style="width:70%;">}}

#### Anomaly detection monitors

Create an anomaly detection monitor to alert on any unexpected log indexing spikes:

1. Navigate to [Monitors > New Monitor][13] and select **Anomaly**.
2. In the **Define the metric** section, select the `datadog.estimated_usage.logs.ingested_events` metric.
3. In the **from** field, add the `datadog_is_excluded:false` tag to monitor indexed logs and not ingested ones.
4. In the **sum by** field, add the `service` and `datadog_index` tags, so that you are notified if a specific service spikes or stops sending logs in any index.
5. Set the alert conditions to match your use case. For example, set the monitor to alert if the evaluated values are outside of an expected range.
6. Add a title for the notification and a message with actionable instructions. For example, this is a notification with contextual links:
    ```text
    An unexpected amount of logs has been indexed in the index: {{datadog_index.name}}

    1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
    2. [Add an exclusion filter on the noisy pattern](https://app.datadoghq.com/logs/pipelines/indexes)
    ``` 
7. **Create** をクリックします。

### Alert when an indexed log volume passes a specified threshold

Set up a monitor to alert if an indexed log volume in any scope of your infrastructure (for example, `service`, `availability-zone`, and so forth) is growing unexpectedly.

1. Navigate to the [Log Explorer][14].
2. Enter a [search query][15] that includes the index name (for example, `index:main`) to capture the log volume you want to monitor.
3. Click the down arrow next to **Download as CSV** and select **Create monitor**.
4. Add tags (for example, `host, `services, and so on) to the **group by** field.
5. Enter the **Alert threshold** for your use case. Optionally, enter a **Warning threshold**.
6. Add a notification title, for example: 
    ```
    Unexpected spike on indexed logs for service {{service.name}}
    ```
6. Add a message, for example:
    ```
    The volume on this service exceeded the threshold. Define an additional exclusion filter or increase the sampling rate to reduce the volume.
    ```
7. **Create** をクリックします。

#### Alert on indexed logs volume since the beginning of the month

Leverage the `datadog.estimated_usage.logs.ingested_events` metric filtered on `datadog_is_excluded:false` to only count indexed logs and the [metric monitor cumulative window][28] to monitor the count since the beginning of the month. 

{{< img src="logs/guide/monthly_usage_monitor.png" alt="Setup a monitor to alert for the count of indexed logs since the beginning of the month" style="width:70%;">}}

#### Alert on indexes reaching their daily quota

[Set up a daily quota][16] on indexes to prevent indexing more than a given number of logs per day. If an index has a daily quota, Datadog recommends that you set the [monitor that notifies on that index's volume](#alert-when-an-indexed-log-volume-passes-a-specified-threshold) to alert when 80% of this quota is reached within the past 24 hours.

An event is generated when the daily quota is reached. By default, these events have the `datadog_index` tag with the index name. Therefore, when this event has been generated, you can [create a facet][17] on the `datadog_index` tag, so that you can use `datadog_index` in the `group by` step for setting up a multi-alert monitor. 

To set up a monitor to alert when the daily quota is reached for an index:

1. Navigate to [Monitors > New Monitor][13] and click **Event**.
2. Enter: `source:datadog "daily quota reached"` in the **Define the search query** section.
3. Add `datadog_index` to the **group by** field. It automatically updates to `datadog_index(datadog_index)`. The `datadog_index(datadog_index)` tag is only available when an event has already been generated. 
4. In the **Set alert conditions** section, select `above or equal to` and enter `1` for the **Alert threshold**.
5. Add a notification title and message in the **Configure notifications and automations** section. The **Multi Alert** button is automatically selected because the monitor is grouped by `datadog_index(datadog_index)`.
6. Click **Save**.

This is an example of what the notification looks like in Slack:

{{< img src="logs/guide/daily_quota_notification.png" alt="A slack notification on the daily quota reached on datadog_index:retention-7" style="width:70%;">}}

### Review the estimated usage dashboard

Once you begin ingesting logs, an out-of-the-box [dashboard][18] summarizing your log usage metrics is automatically installed in your account.

{{< img src="logs/guide/logslight.png" alt="The log estimated usage dashboard showing the breakdown of indexed and ingested in different widgets" style="width:70%;">}}

**Note**: The metrics used in this dashboard are estimates and may differ from official billing numbers.

To find this dashboard, go to **Dashboards > Dashboards List** and search for [Log Management - Estimated Usage][19].

### Set up exclusion filters on high-volume logs

When your usage monitors alert, you can set up exclusion filters and increase the sampling rate to reduce the volume. See [Exclusion Filters][20] on how to set them up. You can also use [Log Patterns][21] to group and identify high-volume logs. Then, in the log pattern's side panel, click **Add Exclusion Filter** to add a filter to stop indexing those logs.

{{< img src="logs/guide/patterns_exclusion.png" alt="The log explorer page showing the side-panel details of a pattern with the add exclusion filter button at the top" style="width:80%;">}}

Even if you use exclusion filters, you can still visualize trends and anomalies over all of your log data using log-based metrics. See [Generate Metrics from Ingested Logs][22] for more information.

### Enable Sensitive Data Scanner for Personally Identifiable Information (PII) detection

If you want to prevent data leaks and limit non-compliance risks, use Sensitive Data Scanner to identify, tag, and optionally redact or hash sensitive data. For example, you can scan for credit card numbers, bank routing numbers, and API keys in your logs, APM spans, and RUM events, See [Sensitive Data Scanner][23] on how to set up scanning rules to determine what data to scan. 

**Note**: [Sensitive Data Scanner][24] is a separate billable product.

### Enable Audit Trail to see user activities

If you want to see user activities, such as who changed the retention of an index or who modified an exclusion filter, enable Audit Trail to see these events. See [Audit Trail Events][25] for a list of platform and product-specific events that are available. To enable and configure Audit Trail, follow the steps in the [Audit Trail documentation][26].

**Note**: [Audit Trail][27] is a separate billable product.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /logs/log_configuration/archives/
[3]: /logs/log_configuration/rehydrating/
[4]: /logs/log_configuration/archives/?tab=awss3#define-maximum-scan-size
[5]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: https://app.datadoghq.com/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: /account_management/rbac/permissions/?tab=ui#log-management
[9]: /logs/guide/logs-rbac/
[10]: /logs/logs_to_metrics/#logs-usage-metrics
[11]: /monitors/types/anomaly/
[12]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[13]: https://app.datadoghq.com/monitors/create
[14]: https://app.datadoghq.com/logs
[15]: /logs/explorer/search/
[16]: /logs/indexes/#set-daily-quota
[17]: /service_management/events/explorer/facets
[18]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[19]: https://app.datadoghq.com/dashboard/lists?q=Log+Management+-+Estimated+Usage
[20]: /logs/log_configuration/indexes/#exclusion-filters
[21]: /logs/explorer/analytics/patterns
[22]: /logs/log_configuration/logs_to_metrics/
[23]: /sensitive_data_scanner/
[24]: https://www.datadoghq.com/pricing/?product=sensitive-data-scanner#sensitive-data-scanner
[25]: /account_management/audit_trail/events/
[26]: /account_management/audit_trail/
[27]: https://www.datadoghq.com/pricing/?product=audit-trail#audit-trail
[28]: /monitors/configuration/?tab=thresholdalert#evaluation-window
[29]: /observability_pipelines/
