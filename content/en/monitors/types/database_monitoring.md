---
title: Database Monitoring Monitor
kind: documentation
---


## Overview

Once [Database Monitoring (DBM)][1] is enabled for your organization, you can create a monitor to alert you when a DBM event type deviates from a predefined threshold over a given period of time.

Some examples of these event types include when a set of queries are waiting on the resolution of a blocking query to run, or when a certain amount of active query executions exceed a given duration threshold.

## Monitor creation

To create a new DBM monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Database Monitoring**][2] in the UI.

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 DBM monitors per account. If you are encountering this limit, consider using <a href="/monitors/types/database_monitoring/#creating-monitors-from-scratch">simple alerts</a>, or <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

## Define the search query

For both of the below cases your query changes, note that as you expand your search filters, the chart above the search bar updates.

### Common monitor types

If you don't wish to [create your monitor from scratch](#creating-monitors-from-scratch), you can use one of the following pre-defined monitor types:
- Waiting Queries
- Long Running Queries

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="The options for the Waiting Queries and Long Running Queries example monitors as presented in the UI" style="width:100%;" >}}


Additionally, please share any feedback you have on these example monitors with your CSM, as we are actively looking to incorporate new ones to recommend.

### Creating monitors from scratch

1. Determine whether you want to monitor **Query Samples** or **Explain Plans** and select the corresponding option from the dropdown menu.

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="A dropdown menu showing the different data sources available for the Database Monitoring monitor type" style="width:80%;" >}}

2. Construct a search query using the same logic as in the <a href="https://docs.datadoghq.com/database_monitoring/query_samples/">DBM Query Samples</a> activity and explain plan explorer. This means that you will need to select one or more **facets** to include in the search bar. For example, if you wanted to alert on the waiting queries executed by user `postgresadmin`, then your search bar would look like this:

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="An example search query containing two facets in the search bar." style="width:100%;" >}}

Note that the monitor you configure will alert over the **unique value count** of the facets.

3. You also have the option to group DBM events by multiple dimensions. All DBM events matching the query are grouped together based on the values of up to **five facets**. With the group by functionality, you also have the ability to configure the **alerting grouping strategy**:
    * **Simple Alert**: Simple Alerts aggregate over all reporting sources, so you'll get one alert when one or multiple groups values breach the threshold. You may use this strategy to reduce notification noise.
    * **Multi Alert**: Multi Alerts apply the alert to each source according to your group parameters, meaning that an alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@db.user` and select the Multi Alert Aggregation type to receive a separate alert for each database user that triggers the alert as you've defined it.

### Set alert conditions

1. Set an alert to trigger whenever a metric is `above`, `above or equal to`, `below`, or `below or equal to` a threshold that you define. For help configuring the options in this view, see [Configure Monitors][5].
2. Determine your desired behavior for when data is missing for 5 minutes, for example, `evaluate as zero`, `show NO DATA`, `show NO DATA and notify`, or `show OK`.

#### No data and below alerts

To receive a notification when an application has stopped sending DBM events, set the condition to `below 1`. This alert will trigger when no DBM events match the monitor query in a given time frame across all aggregate groups.

When you split the monitor by any dimension (tag or facet) and use a `below` condition, the alert is triggered **if and only if**:
1. There are DBM events for a given group, but the count is below the threshold.
2. There are no DBM events for any of the groups.

#### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors][3].

### Notifications
For more information about the **Notify your team** and **Say what's happening** sections, see [Notifications][4].

[1]: /database_monitoring/
[2]: https://app.datadoghq.com/monitors/create/databases
[3]: /monitors/create/configuration/#advanced-alert-conditions
[4]: /monitors/notify/
[5]: /monitors/configuration/?tab=thresholdalert#thresholds