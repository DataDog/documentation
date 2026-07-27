---
title: Database Monitoring Monitor
description: "Create Database Monitoring monitors to alert on query performance, waiting queries, and significant changes in explain-plan cost."
---


## Overview

With the [Database Monitoring (DBM)][1] monitor type, you can create monitors and alert on the data surfaced in DBM. These monitors can be configured to alert you when a DBM event type deviates from a predefined threshold over a given period of time.

Common monitoring scenarios include
- [Number of waiting queries](#number-of-waiting-queries)
- [Number of queries exceeding a given duration](#queries-exceeding-30-seconds)
- [Significant changes in explain-plan cost](#change-in-explain-plan-cost)

For step-by-step instructions, see [Example monitors](#example-monitors).

## Monitor creation

To create a new DBM monitor in Datadog, navigate to [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Database Monitoring{{< /ui >}}][2] in the UI.

<div class="alert alert-info">There is a default limit of 1000 DBM monitors per account. If you are encountering this limit, consider using <a href="/monitors/configuration/?tab=thresholdalert#multi-alert">multi alerts</a>, or <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

## Define the search query

Note: As your query changes, the chart above the search bar updates in response.

### Common monitor types

If you don't wish to [create your monitor from scratch](#creating-monitors-from-scratch), you can use one of the following pre-defined monitor types:
- Waiting Queries
- Long Running Queries

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="Example OOTB monitors related to waiting queries and long running queries" style="width:80%;" >}}

Any feedback on these existing monitor types and other ones you would like to see should be shared with your Customer Success Manager or the [Support Team][9].

### Creating monitors from scratch

1. Determine whether you want to monitor {{< ui >}}Query Samples{{< /ui >}} or {{< ui >}}Explain Plans{{< /ui >}} and select the corresponding option from the dropdown menu.

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="A dropdown menu showing the different data sources available for the Database Monitoring monitor type" style="width:80%;" >}}

2. Construct a search query using the same logic as in the <a href="https://docs.datadoghq.com/database_monitoring/query_samples/">DBM Query Samples</a> activity and explain plan explorer. This means that you should select one or more **facets** to include in the search bar. For example, if you wanted to alert on the waiting queries executed by user `postgresadmin`, then your search bar would look like this:

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="An example search query containing two facets in the search bar." style="width:80%;" >}}

Note: The monitor you configure alerts over the **unique value count** of the facets.

3. You also have the option to group DBM events by multiple dimensions. All DBM events matching the query are grouped together based on the values of up to **four facets**. With the group by functionality, you also have the ability to configure the **alerting grouping strategy**:
    * {{< ui >}}Simple Alert{{< /ui >}}: Simple Alerts aggregate over all reporting sources, so one alert triggers when one or multiple groups values breach the threshold. You may use this strategy to reduce notification noise.
    * {{< ui >}}Multi Alert{{< /ui >}}: Multi Alerts apply the alert to each source according to your group parameters, meaning that an alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@db.user` and select the Multi Alert Aggregation type to receive a separate alert for each database user that triggers the alert as you've defined it.

### Set alert conditions

1. Set an alert to trigger whenever a query result is `above`, `above or equal to`, `below`, or `below or equal to` a threshold that you define. For help configuring the options in this view, see [Configure Monitors][5].
2. Determine your desired behavior for when data is missing for 5 minutes, for example, `evaluate as zero`, `show NO DATA`, `show NO DATA and notify`, or `show OK`.

#### No data and below alerts

To receive a notification when an application has stopped sending DBM events, set the condition to `below 1`. This alert triggers when no DBM events match the monitor query in a given time frame across all aggregate groups.

When you split the monitor by any dimension (tag or facet) and use a `below` condition, the alert is triggered **if and only if**:
1. There are DBM events for a given group, but the count is below the threshold.
2. There are no DBM events for any of the groups.

#### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors][3].

### Notifications
For more information about the {{< ui >}}Configure notifications and automations{{< /ui >}} section, see [Notifications][4].

## Example monitors

### Number of waiting queries

This monitor detects whether the number of waiting queries has exceeded a given threshold.

{{< img src="database_monitoring/dbm_event_monitor/waiting_queries_monitor.png" alt="A configured metrics query for monitoring the number of waiting database queries" style="width:80%;" >}}

#### Build the monitoring query

1. In Datadog, go to [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Database Monitoring{{< /ui >}}][2].
1. In the {{< ui >}}Common monitor types{{< /ui >}} box, click {{< ui >}}Waiting Queries{{< /ui >}}. 

#### Set the alert threshold

1. To gain context on the range of typical values, set the time frame to {{< ui >}}Past 1 Month{{< /ui >}} using the dropdown menu at the top of the chart.
1. Enter your chosen alerting threshold value in the {{< ui >}}Alert threshold{{< /ui >}} box. For example, if the number of waiting queries stays below `3000` on the chart, you might set {{< ui >}}Alert threshold{{< /ui >}} to `4000` to represent unusual activity. For configuration details, see [Set alert conditions][6] and [Advanced alert conditions][3].
1. Use the red shaded area on the chart to verify that your alert won't trigger too rarely or too often, and adjust the threshold value as needed.

#### Configure notifications

1. Under {{< ui >}}Configure notifications and automations{{< /ui >}}, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
Waiting queries on {{host.name}} have exceeded {{threshold}} 
with a value of {{value}}.
{{/is_alert}}

{{#is_recovery}}
The number of waiting queries on {{host.name}}, which exceeded {{threshold}},
has recovered.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the {{< ui >}}Notify your services and your team members{{< /ui >}} box.

#### Verify and save the monitor

1. To verify the monitor setup, click {{< ui >}}Test Notifications{{< /ui >}}. Trigger a test alert by choosing {{< ui >}}Alert{{< /ui >}}, then click {{< ui >}}Run Test{{< /ui >}}.
1. Click {{< ui >}}Create{{< /ui >}} to save the monitor.

### Queries exceeding 30 seconds

This monitor detects whether the number of long-running queries has exceeded a given threshold.

{{< img src="database_monitoring/dbm_event_monitor/long_running_queries_monitor.png" alt="A configured metrics query for monitoring the number of long-running database queries" style="width:80%;" >}}

#### Build the monitoring query

1. In Datadog, go to [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Database Monitoring{{< /ui >}}][2].
1. In {{< ui >}}Common monitor types{{< /ui >}}, click {{< ui >}}Long Running Queries{{< /ui >}}.
1. Update the query filter to {{< ui >}}Duration:>30s{{< /ui >}}.

#### Set the alert threshold

1. To gain context on the range of typical values, set the time frame to {{< ui >}}Past 1 Month{{< /ui >}} using the dropdown menu at the top of the chart.
1. Enter your chosen alerting threshold value in the {{< ui >}}Alert threshold{{< /ui >}} box. For example, if the values on the chart stay below `2000`, you might set {{< ui >}}Alert threshold{{< /ui >}} to `2500` to represent unusual activity. For configuration details, see [Set alert conditions][6] and [Advanced alert conditions][3].
1. Use the red shaded area on the chart to verify that your alert won't trigger too rarely or too often, and adjust the threshold value as needed.

#### Configure notifications

1. Under {{< ui >}}Configure notifications and automations{{< /ui >}}, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
The number of queries with a duration of >30s has exceeded 
{{threshold}} on {{host.name}} with a value of {{value}}.
{{/is_alert}}

{{#is_recovery}}
The number of queries with a duration of >30s on {{host.name}}, 
which exceeded {{threshold}}, has recovered.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the {{< ui >}}Notify your services and your team members{{< /ui >}} box.

#### Verify and save the monitor

1. To verify the monitor setup, click {{< ui >}}Test Notifications{{< /ui >}}. Trigger a test alert by choosing {{< ui >}}Alert{{< /ui >}}, then click {{< ui >}}Run Test{{< /ui >}}.
1. Click {{< ui >}}Create{{< /ui >}} to save the monitor.

### Change in explain-plan cost

{{< img src="database_monitoring/dbm_event_monitor/explain_plan_cost_monitor.png" alt="A monitor configured to track changes in average daily explain-plan cost" style="width:80%;" >}}

This monitor detects a significant change in daily average explain-plan cost by comparing the results of two queries:

- Query **a** reflects the current explain-plan cost
- Query **b** reflects the explain-plan cost a week ago

This allows the comparison of two consecutive Mondays, for example.

With minor changes, the monitor can instead reflect hourly averages, measure the difference between today and yesterday, group by query signature instead of host, and so on.

#### Build the first monitoring query

1. In Datadog, go to [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Database Monitoring{{< /ui >}}][2].
1. Under {{< ui >}}Define the search query{{< /ui >}}, make the following updates:
    - Change {{< ui >}}Query Samples{{< /ui >}} to {{< ui >}}Explain Plans{{< /ui >}}.
    - Change `*` to {{< ui >}}Explain Plan Cost (@db.plan.cost){{< /ui >}}. Typing "cost" into the field populates the autocomplete options.
    - Change {{< ui >}}(everything){{< /ui >}} to {{< ui >}}Host (host){{< /ui >}}.
1. Click the {{< ui >}}∑{{< /ui >}} button and type **rollup** to populate the autocomplete suggestions. Choose {{< ui >}}moving_rollup{{< /ui >}}. 

#### Build the second monitoring query

1. Click {{< ui >}}Add Query{{< /ui >}} to create query **b**, a copy of query **a**.
1. Change {{< ui >}}a + b{{< /ui >}} to {{< ui >}}a - b{{< /ui >}}. Because the two queries are temporarily identical, this value displays on the chart as 0.
1. In the **b** query, click the {{< ui >}}∑{{< /ui >}} button and choose {{< ui >}}Timeshift{{< /ui >}} > {{< ui >}}Week before{{< /ui >}}. This configures the monitor to detect significant changes between last week and the present.

#### Set the alert threshold

1. In the dropdown menu at the top of the chart, expand the time frame to {{< ui >}}Past 1 Month{{< /ui >}} to gain context on the typical cost variation from week to week.
1. Enter your chosen alerting threshold value in the {{< ui >}}alert threshold{{< /ui >}} box. For example, if the difference in explain-plan cost stays below `8000` on the chart, you might set {{< ui >}}alert threshold{{< /ui >}} to `9000` to represent unusual activity. For configuration details, see [Set alert conditions][6] and [Advanced alert conditions][3]. 
1. Use the red shaded area on the chart to verify that your alert won't trigger too rarely or too often, and adjust the threshold value as needed.

#### Configure notifications

1. Under {{< ui >}}Configure notifications and automations{{< /ui >}}, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
The daily average explain-plan cost on {{host.name}} has increased by at least {{threshold}} 
versus one week ago, with a value of {{value}}.
{{/is_alert}}

{{#is_recovery}}
The daily average explain-plan cost on {{host.name}} has recovered to within {{threshold}}
of the cost on this day last week.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the {{< ui >}}Notify your services and your team members{{< /ui >}} box.

#### Verify and save the monitor

1. To verify the monitor setup, click {{< ui >}}Test Notifications{{< /ui >}}. Trigger a test alert by choosing {{< ui >}}Alert{{< /ui >}}, then click {{< ui >}}Run Test{{< /ui >}}.
1. Click {{< ui >}}Create{{< /ui >}} to save the monitor.


[1]: /database_monitoring/
[2]: https://app.datadoghq.com/monitors/create/database-monitoring
[3]: /monitors/create/configuration/#advanced-alert-conditions
[4]: /monitors/notify/
[5]: /monitors/configuration/?tab=thresholdalert#thresholds
[6]: /monitors/configuration/?tab=thresholdalert#set-alert-conditions
[7]: /monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[8]: https://app.datadoghq.com/databases/list
[9]: /help/
