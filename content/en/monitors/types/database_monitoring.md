---
title: Database Monitoring Monitor
kind: documentation
---


## Overview

With the [Database Monitoring (DBM)][1] monitor type, you can create monitors and alert on the data surfaced in DBM. These monitors can be configured to alert you when a DBM event type deviates from a predefined threshold over a given period of time.

A few common monitoring scenarios (click for setup instructions):
- [Number of waiting queries](#number-of-waiting-queries)
- [Number of queries exceeding a given duration](#queries-exceeding-30-seconds)
- Explain-plan cost ([for all queries](#explain-plan-cost-all-queries) or [a single query signature](#explain-plan-cost-single-query-signature))

## Monitor creation

To create a new DBM monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Database Monitoring**][2] in the UI.

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 DBM monitors per account. If you are encountering this limit, consider using <a href="/monitors/configuration/?tab=thresholdalert#multi-alert">multi alerts</a>, or <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

## Define the search query

Note: As your query changes, the chart above the search bar updates in response.

### Common monitor types

If you don't wish to [create your monitor from scratch](#creating-monitors-from-scratch), you can use one of the following pre-defined monitor types:
- Waiting Queries
- Long Running Queries

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="Example OOTB monitors related to waiting queries and long running queries" style="width:100%;" >}}

Any feedback on these existing monitor types and other ones you would like to see should be shared with your Customer Success Manager or the [Support Team][9].

### Creating monitors from scratch

1. Determine whether you want to monitor **Query Samples** or **Explain Plans** and select the corresponding option from the dropdown menu.

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="A dropdown menu showing the different data sources available for the Database Monitoring monitor type" style="width:80%;" >}}

2. Construct a search query using the same logic as in the <a href="https://docs.datadoghq.com/database_monitoring/query_samples/">DBM Query Samples</a> activity and explain plan explorer. This means that you should select one or more **facets** to include in the search bar. For example, if you wanted to alert on the waiting queries executed by user `postgresadmin`, then your search bar would look like this:

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="An example search query containing two facets in the search bar." style="width:100%;" >}}

Note: The monitor you configure alerts over the **unique value count** of the facets.

3. You also have the option to group DBM events by multiple dimensions. All DBM events matching the query are grouped together based on the values of up to **five facets**. With the group by functionality, you also have the ability to configure the **alerting grouping strategy**:
    * **Simple Alert**: Simple Alerts aggregate over all reporting sources, so one alert triggers when one or multiple groups values breach the threshold. You may use this strategy to reduce notification noise.
    * **Multi Alert**: Multi Alerts apply the alert to each source according to your group parameters, meaning that an alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@db.user` and select the Multi Alert Aggregation type to receive a separate alert for each database user that triggers the alert as you've defined it.

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
For more information about the **Notify your team** and **Say what's happening** sections, see [Notifications][4].

## Example monitors

### Number of waiting queries

{{< img src="database_monitoring/dbm_event_monitor/waiting_queries_monitor.png" alt="A configured metrics query for monitoring the number of waiting database queries" style="width:100%;" >}}

1. In Datadog, go to [**Monitors > New Monitor > Database Monitoring**][2].
1. In the **Common monitor types** box, click **Waiting Queries**. Use the dropdown menu at the top of the chart to set the time frame to **Past 1 Month** to gain context on the range of typical values.
1. Enter your chosen alerting threshold value in the **alert threshold** box. For example, if the number of waiting queries stays below `3000` on the chart, you might set **alert threshold** to `4000` to represent unusual activity. For configuration details, see [Set alert conditions][6] and [Advanced alert conditions][3].
1. Under **Notify your team**, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
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
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.
1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert** in the modal, then **Run Test**.
1. Click **Create** to save the monitor.

### Queries exceeding 30 seconds

{{< img src="database_monitoring/dbm_event_monitor/long_running_queries_monitor.png" alt="A configured metrics query for monitoring the number of long-running database queries" style="width:100%;" >}}

1. In Datadog, go to [**Monitors > New Monitor > Database Monitoring**][2].
1. In **Common monitor types**, click **Long Running Queries**.
1. Update the query filter to **Duration:>30s**.
1. In the dropdown menu at the top of the chart, expand the time frame to **Past 1 Month** to gain context on the range of typical values.
1. Enter your chosen alerting threshold value in the **alert threshold** box. For example, if the values on the chart stay below `2000`, you might set **alert threshold** to `2500` to represent unusual activity. For configuration details, [Set alert conditions][6] and [Advanced alert conditions][3].
1. Under **Notify your team**, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
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
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.
1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert** in the modal, then **Run Test**.
1. Click **Create** to save the monitor.

### Explain-plan cost: all queries

{{< img src="database_monitoring/dbm_event_monitor/explain_plan_avg_monitor.png" alt="A configured metrics query for monitoring the explain-plan cost of all queries" style="width:100%;" >}}

1. In Datadog, go to [**Monitors > New Monitor > Database Monitoring**][2].
1. Under **Define the search query**, make the following updates: 
    - Change **Query Samples** to **Explain Plans**
    - Change __*__ to **Explain Plan Cost (@db.plan.cost)**
1. In the dropdown menu at the top of the chart, expand the time frame to **Past 1 Month** to gain context on the range of typical values.
1. Enter your chosen alerting threshold value in the **alert threshold** box. For example, if the cost stays below `85,000` on the chart, you might set **alert threshold** to `90,000` to represent unusual activity. For configuration details, see [Set alert conditions][6] and [Advanced alert conditions][3].
1. Under **Notify your team**, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
The average explain-plan cost has exceeded {{threshold}} with a value of {{value}}.
{{/is_alert}}

{{#is_recovery}}
The average explain-plan cost, which exceeded {{threshold}}, has recovered. 
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.
1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert** in the modal, then **Run Test**.
1. Click **Create** to save the monitor.

### Explain-plan cost: single query signature

{{< img src="database_monitoring/dbm_event_monitor/explain_plan_single_query_monitor.png" alt="A configured metrics query for monitoring the explain-plan cost of a single query" style="width:100%;" >}}

1. In Datadog, go to [**Monitors > New Monitor > Database Monitoring**][2].
1. Under **Define the search query**, make the following updates: 
    - Change **Query Samples** to **Explain Plans**
    - Change __*__ to **Explain Plan Cost (@db.plan.cost)**
    - Change **(everything)** to **Query Signature (@db.query_signature)**
    - Change the result limit to **top 5** to focus on the most expensive queries.
1. In the dropdown menu at the top of the chart, expand the time frame to **Past 1 Month** to gain context on the range of typical values.
1. From the multiple query signatures shown on the chart, choose one to monitor. Add a `@db.query_signature:<YOUR_QUERY_SIGNATURE>` filter to your query, using autocomplete as it appears.
1. Click the **X** on the **by Query Signature (@db.query_signature)** grouping, which has become redundant.
1. Enter your chosen alerting threshold value in the **alert threshold** box. For example, if the cost stays below `85,000` on the chart, you might set **alert threshold** to `90,000` to represent unusual activity. For configuration details, see [Set alert conditions][6] and [Advanced alert conditions][3].
1. Under **Notify your team**, write the notification message. For detailed instructions, see [Notifications][4]. You can use this text for the message body:
{{< code-block lang="text" >}}
{{#is_alert}}
The explain-plan cost of a query has exceeded {{threshold}} 
with a value of {{value}}.
{{/is_alert}}

{{#is_recovery}}
The explain-plan cost of a query has recovered to below {{threshold}}.
{{/is_recovery}}
{{< /code-block >}}
1. Add yourself to the notification recipients by typing and then selecting your name in the **Notify your services and your team members** box.
1. To verify the monitor setup, click **Test Notifications**. Trigger a test alert by choosing **Alert** in the modal, then **Run Test**.
1. Click **Create** to save the monitor.

[1]: /database_monitoring/
[2]: https://app.datadoghq.com/monitors/create/database-monitoring
[3]: /monitors/create/configuration/#advanced-alert-conditions
[4]: /monitors/notify/
[5]: /monitors/configuration/?tab=thresholdalert#thresholds
[6]: /monitors/configuration/?tab=thresholdalert#set-alert-conditions
[7]: /monitors/configuration/?tab=thresholdalert#notify-your-team
[8]: https://app.datadoghq.com/databases/list
[9]: /help/