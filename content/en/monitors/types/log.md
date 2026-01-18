---
title: Log Monitor
description: "Monitor indexed logs to detect security threats, troubleshoot issues, and alert when log patterns exceed defined thresholds."
aliases:
- /monitors/monitor_types/log
- /monitors/create/types/log/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Logs Management Overview"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Check your monitor status"
- link: "https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/"
  tag: "Blog"
  text: "Use CIDR notation queries to filter your network traffic logs"
---

## Overview

Logs are essential for security investigations, aiding in threat detection, compliance tracking, and security monitoring. Log Management systems correlate logs with observability data for rapid root cause detection. Log management also enables efficient troubleshooting, issue resolution, and security audits.

Once [log management is enabled][1] for your organization, you can create a logs monitor to alert you when a specified log type  exceeds a user-defined threshold over a given period of time. The logs monitor only evaluates [indexed logs][2].

**Note**: Log monitors have a maximum rolling time window of `2 days`.

## Monitor creation

To create a log monitor in Datadog, use the main navigation: [**Monitors > New Monitor > Logs**][3].

<div class="alert alert-info">There is a default limit of 1000 Log monitors per account. If you are encountering this limit, consider using <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">multi alerts</a>, or <a href="/help/">Contact Support</a>.</div>

### Define the search query

As you define the search query, the graph above the search fields updates.

1. Construct a search query using the same logic as a [Log Explorer search][4]. Note that [Flex Tier logs][10], which can be shown in Log Explorer, are not supported for monitors. Only Standard Tier logs are supported.
2. Choose to monitor over a log count, [facet][5], an attribute, or [measure][6]:
    * **Monitor over a log count**: Use the search bar (optional) and do **not** select an attribute or measure. Datadog evaluates the number of logs over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a facet or an attribute**: If a an attribute is selected, the monitor alerts over the `Unique value count` of the attribute. For example, if you have an attribute such as `user.email`, the unique value count is the number of unique user emails. Any attribute can be used in a monitor, but only facets are shown in the autocompletion.
    * **Monitor over measure**: If a [measure][6] is selected, the monitor alerts over the numerical value of the log facet (similar to a metric monitor) and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Group logs by multiple dimensions (optional):
   All logs matching the query are aggregated into groups based on the value of tags, attributes, and up to four facets. When there are multiple dimensions, the number of top or bottom values can be selected for each dimension specifically.

   The total limit, irrespective of the number of facets, is 1000 top values. If this is increased above 1000, the top values for the other dimensions are adjusted to ensure the number of the resulting combinations is less than 1000. The default top values for every group-by is 10, with the exception of the fourth which will default to 5 top values.

   As an example, a Log Monitor with 4 groupings on the search query could have:
   * **1st facet**: 10 top values
   * **2nd facet**: 10 top values
   * **3rd facet**: 5 top values
   * **4th facet**: 2 top values

4. Configure the alerting grouping strategy (optional):
    * **Simple-Alert**: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. This works best to monitor a metric from a single host or the sum of a metric across many hosts. This strategy may be selected to reduce notification noise.
    * **Multi Alert**: Multi alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you could group `system.disk.in_use` by `device` to receive a separate alert for each device that is running out of space.

### Set alert conditions

Trigger when the query meets one of the following conditions compared to a threshold value:
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

#### No data and below alerts

`NO DATA` is a state given when no logs match the monitor query during the timeframe.

To receive a notification when all groups matching a specific query have stopped sending logs, set the condition to `below 1`. This notifies when no logs match the monitor query in a given timeframe across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are logs for a given group, and the count is below the threshold—or if there are no logs for **all** of the groups.

**Examples**:

* This monitor triggers if and only if there are no logs for all services:
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Below monitor split by service" style="width:60%;" >}}
* This monitor triggers if there are no logs for the service `backend`:
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Below monitor for backend service" style="width:60%;" >}}

#### Advanced alert conditions

For detailed instructions on the advanced alert options (evaluation delay, new group delay, etc.), see the [Monitor configuration][7] page.

### Notifications

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][8] page.

#### Log samples and breaching values toplist

When a logs monitor is triggered, samples or values can be added to the notification message. Logs without a message are not included in samples. In order to add the content of a log attribute to the monitor's message, use Log monitor [template variables][9] directly in the monitor's message body.

| Monitor Setup                    | Can be added to notification message |
|----------------------------------|--------------------------------------|
| Ungrouped Simple-Alert Log count | Up to 10 log samples.                |
| Grouped Simple-Alert Log count   | Up to 10 facet or measure values.    |
| Grouped Multi Alert Log count    | Up to 10 log samples.                |
| Ungrouped Simple-Alert measure   | Up to 10 log samples.                |
| Grouped Simple-Alert measure     | Up to 10 facet or measure values.    |
| Grouped Multi Alert Log measure  | Up to 10 facet or measure values.    |

These are available for notifications sent to Slack, Jira, webhooks, Microsoft Teams, Pagerduty, and email. **Note**: Samples are not displayed for recovery notifications.

To disable log samples, uncheck the box at the bottom of the **Configure notification & automations** section. The text next to the box is based on your monitor's grouping (as stated above).

#### Examples

Include a table of the top 10 breaching values:
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="Top 10 breaching values" style="width:60%;" >}}

Include a sample of 10 logs in the alert notification:
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="Top 10 breaching values" style="width:60%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: /logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/monitors/create/log
[4]: /logs/explorer/search/
[5]: /logs/explorer/facets/
[6]: /logs/explorer/facets/#measures
[7]: /monitors/configuration/#advanced-alert-conditions
[8]: /monitors/notify/
[9]: /monitors/notify/variables/?tab=is_alert#matching-attributetag-variables
[10]: /logs/log_configuration/flex_logs/
