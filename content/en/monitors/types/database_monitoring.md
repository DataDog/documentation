---
title: Database Monitoring Monitor
kind: documentation
---


## Overview

Once [Database Monitoring (DBM) is enabled][TODO] for your organization, you can create a DBM monitor to alert you when a specific DBM event type exceeds a predefined threshold over a given period of time.

## Create a Database Monitoring monitor

To create a DBM monitor in Datadog, first navigate to [**Monitors** > **New Monitor** > **Database Monitoring**][TODO].

<div class="alert alert-info"><strong>Note</strong>: There is a default limit of 1000 DBM monitors per account. If you are encountering this limit, consider using <a href="/monitors/create/configuration/?tab=thresholdalert#alert-grouping">multi alerts</a>, or <a href="/help/">Contact Support</a>.</div>

### Define the search query

As you expand your search filters, the graph above the search bar updates.

1. Construct a search query using the same logic as a DBM Query Samples.
2. Choose to monitor over a DBM event count or facet.
    * **Monitor over a DBM event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of DBM events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a facet**: If you select a facet, the monitor alerts over the `Unique value count` of the facet.
3. Group DBM events by multiple dimensions (optional). All DBM events matching the query are aggregated into groups based on the value of up to five facets.
4. Configure the alerting grouping strategy (optional).
   * **Simple-Alert**: Simple alerts aggregate over all reporting sources. You receive one alert when the aggregated value meets the set conditions. If the query has a `group by` and you select **Simple-Alert**, you get one alert when one or multiple groups values breach the threshold. You may use this strategy to reduce notification noise.
   * **Multi Alert**: Multiple alerts apply the alert to each source according to your group parameters. An alerting event is generated for each group that meets the set conditions. For example, you can group a query by `@db.user` to receive a separate alert for each database user when the number of errors is high.

### Set alert conditions

An alert is triggered whenever a metric crosses a threshold.

* Triggers when the metric is `above`, `above or equal to`, `below`, or `below or equal to`.
* The threshold during the last `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between 5 minutes and 48 hours.
* Alert threshold `<NUMBER>`.
* Warning threshold `<NUMBER>`.

#### No data and below alerts

To receive a notification when an application has stopped sending DBM events, set the condition to `below 1`. This notifies when no DBM events match the monitor query in a given time frame across all aggregate groups.

When splitting the monitor by any dimension (tag or facet) and using a `below` condition, the alert is triggered **if and only if** there are DBM events for a given group, and the count is below the threshold—or if there are no DBM events for **all** of the groups.

#### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors][6].

### Notifications

For more information about the **Say what's happening** and **Notify your team** sections, see [Notifications][7].