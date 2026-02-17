---
title: Track Monitor Access and Configuration Changes
description: Use Audit Trail to monitor usage patterns, configuration changes, and access history for specific monitors with API tracking and diff views.
disable_toc: false
further_reading:
- link: "account_management/audit_trail/"
  tag: "Documentation"
  text: "Set up Audit Trail"
---

## Overview

Audit Trail provides Datadog administrators visibility into who within the organization is using Datadog and how they are using it. This guide walks you through how you can see usage information for a specific monitor.

## View usage information for a specific monitor

### Get monitor ID

You need the monitor's ID to get usage information for the monitor.

1. Navigate to [Monitors][1].
1. Select your monitor.
1. The monitor ID is in the monitor URL, located after `https://app.datadoghq.com/monitors/`. For example, if the monitor URL is `https://app.datadoghq.com/monitors/123456789`, the monitor ID is `123456789`.
1. Copy the monitor ID.

### View monitor usage in Audit Trail

To see usage information for the monitor, use Audit Trail to search for all API `GET` requests for that monitor ID.

1. Navigate to [Audit Trail][2].
2. In the search bar, enter the query: `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/monitor/<monitor_id>`. Replace `<monitor_id>` with the monitor ID you copied earlier.
   
   For example, if the monitor ID is `123456789`, the search query should be `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/monitor/123456789`. `@http.status_code:200` narrows down the results to successful requests only.

   **Note**: You can also use the facet panel on the left side of the page to formulate the search query.
3. Select the timeframe in the upper right side of the page to see the events for a specific time period.
4. You can configure the **Group into fields** section and select different visualization tools to break down and analyze the data based on your use case. For example, if you set the `group by` field to `User Email` and click **Top List** in the **Visualize as** section, you get a top list of users who accessed the monitor.
5. See [Create a dashboard or a graph][3] if you want to put this information into a dashboard or graph.

## View recent monitor configuration changes

You can use [event queries][8] in Audit Trail to see a list of monitors that have had recent changes to their configurations.

1. Navigate to [Audit Trail][2].
1. In the **Search for** field, paste a query to filter for the kind of changes you want to see. Here are some common examples:
   
   | Audit event           | Query in audit explorer                                  |
   |-----------------------|----------------------------------------------------------|
   | [Monitor created][4]  | `@evt.name:Monitor @asset.type:monitor @action:created`  |
   | [Monitor modified][5] | `@evt.name:Monitor @asset.type:monitor @action:modified` |
   | [Monitor deleted][6]  | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
   | [Monitor resolved][7] | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

1. Optionally, on the facet panel, use filters like **Asset ID** or **Asset Name** to narrow your results down to a specific monitor.
1. For each event in the table, you can see the email address of the user who performed the last change, and a summary of what happened. 

   To see additional information about a specific change, click the row in the table. Then, click the **Inspect Changes (Diff)** tab to see the changes that were made to the monitor's configuration:

   {{< img src="account_management/audit_logs/monitor_change_diff.png" alt="A text diff showing a `check_type: api` tag being added to the monitor" style="width:100%;" >}}

1. See [Create a dashboard or a graph][3] if you want to put this information into a dashboard or graph.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: https://app.datadoghq.com/audit-trail
[3]: /account_management/audit_trail/#create-a-dashboard-or-a-graph
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[8]: /account_management/audit_trail/events/#monitor-events