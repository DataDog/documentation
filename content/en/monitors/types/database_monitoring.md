---
title: Database Monitoring Monitor
kind: documentation
---


## Overview

Once [Database Monitoring (DBM)][1] is enabled for your organization, you can create a monitor to alert you when a DBM event type deviates from a predefined threshold over a given period of time.

Some examples of these event types include when a set of queries are waiting on the resolution of a blocking query to run or when a certain amount of active query executions exceed a given duration threshold.

## Monitor creation

To create a new DBM monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **Database Monitoring**][2] in the UI.

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 DBM monitors per account. If you are encountering this limit, consider using simple alerts (referenced in the "Creating monitors from scratch" section below) or <a href="/help/">Contact Support</a> to lift this limit for your account.</div>

## Define the search query

For both of the below cases your query changes, note that as you expand your search filters, the chart above the search bar updates.

### Common monitor types

If you don't wish to create your monitor from scratch, then we have provided some common monitor types for you to access:
1. Waiting Queries
2. Long Running Queries

{{< img src="database_monitoring/dbm_event_monitor/dbm_common_monitor_types.png" alt="The options for the Waiting Queries and Long Running Queries example monitors as presented in the UI" style="width:100%;" >}}

If these above-mentioned monitor types do not fit your use case, then please refer to the **"Creating monitors from scratch"** section below that contains instructions for creating a new monitor. 

Additionally, please share any feedback you have on these example monitors with your CSM, as we are actively looking to incorporate new ones to recommend.

### Creating monitors from scratch

1. Determine whether you want to monitor **Query Samples** or **Explain Plans** and select the corresponding option from the dropdown menu pictured below:

{{< img src="database_monitoring/dbm_event_monitor/dbm_event_monitor_data_types.png" alt="A dropdown menu showing the different data sources - Query Samples and Explain Plans - that we pull from for this monitor type" style="width:100%;" >}}

2. Construct a search query using the same logic as in the <a href="https://docs.datadoghq.com/database_monitoring/query_samples/">DBM Query Samples</a> activity and explain plan explorer. This means that you will need to select one or more **facets** to include in the search bar. For example, if you wanted to alert on the waiting queries executed by user `postgresadmin`, then your search bar would look like this:

{{< img src="database_monitoring/dbm_event_monitor/dbm_example_query_no_group_by.png" alt="An example search query containing two facets in the search bar: @db.is_waiting=true AND @db.user:postgresadmin" style="width:100%;" >}}

Note that the monitor you configure will alert over the **unique value count** of the facet(s).

3. You also have the option to group DBM events by multiple dimensions. All DBM events matching the query are grouped together based on the value of up to **five facets**. With the group by functionality, you have the ability to configure the **alerting grouping strategy** as well (under "Notify your team" in the Datadog UI):
    * **Simple Alert**: Simple Alerts aggregate over all reporting sources, so you'll get one alert when one or multiple groups values breach the threshold. You may use this strategy to reduce notification noise.
    * **Multi Alert**: Multi Alerts apply the alert to each source according to your group parameters, meaning that an alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@db.user` and select the Multi Alert Aggregation type to receive a separate alert for each database user that triggers the alert as you've defined it.

### Set alert conditions

1. Set an alert to trigger whenever a metric is `above`, `above or equal to`, `below`, or `below or equal to` a threshold that you define. For help configuring the options in this view, please see the following <a href="https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#thresholds">docs</a>.
2. Determine your desired behavior for when data is missing for 5 minutes (i.e. `evaluate as zero`, `show NO DATA`, `show NO DATA and notify`, or `show OK`).

#### No data and below alerts

To receive a notification when an application has stopped sending DBM events, set the condition to `below 1`. This alert will trigger when no DBM events match the monitor query in a given time frame across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if**:
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