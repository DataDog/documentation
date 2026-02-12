---
title: Track Dashboard Access and Configuration Changes
description: Use Audit Trail to track dashboard usage, access patterns, and configuration changes with API request monitoring and diff inspection.
disable_toc: false
further_reading:
- link: "account_management/audit_trail/"
  tag: "Documentation"
  text: "Set up Audit Trail"
aliases:
- ./track_dashboard_usage/
---

## Overview

Audit Trail provides Datadog administrators visibility into who within the organization is using Datadog and how they are using it. This guide walks you through how you can see usage information for a specific dashboard.

## View usage information for a specific dashboard

### Get dashboard ID

You need the dashboard's ID to get usage information for the dashboard.

1. Navigate to [Dashboards][1].
1. Select your dashboard.
1. The dashboard ID is in the dashboard URL, located after `https://app.datadoghq.com/dashboard/`. For example, if the dashboard URL is `https://app.datadoghq.com/dashboard/pte-tos-7kc/escalations-report`, the dashboard ID is `pte-tos-7kc`.
1. Copy the dashboard ID.

### View dashboard usage in Audit Trail

To see usage information for the dashboard, use Audit Trail to search for all API `GET` requests for that dashboard ID.

1. Navigate to [Audit Trail][2].
2. In the search bar, enter the query: `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/dashboard/<dashboard_id>`. Replace `<dashboard_id>` with the dashboard ID you copied earlier.<br>For example, if the dashboard ID is `pte-tos-7kc`, the search query looks like this:
{{< img src="account_management/audit_logs/dashboard_access_query.png" alt="Search query for all successful GET requests for the dashboard ID pte-tos-7kc" style="width:100%;" >}}
`@http.status_code:200` narrows down the results to successful requests only.
<br>**Note**: You can also use the facet panel on the left side of the page to formulate the search query.
3. Select the timeframe in the upper right side of the page to see the events for a specific time period.
4. You can configure the **Group into fields** section and select different visualization tools to break down and analyze the data based on your use case. For example, if you set the `group by` field to `User Email` and click **Top List** in the **Visualize as** section, you get a top list of users who accessed the dashboard.
5. See [Create a dashboard or a graph][3] if you want to put this information into a dashboard or graph.

## View recent dashboard configuration changes

You can use [event queries][7] in Audit Trail to see a list of dashboards that have had recent changes to their configurations.

1. Navigate to [Audit Trail][2].
1. In the **Search for** field, paste a query to filter for the kind of changes you want to see. Here are some common examples:
   
   | Audit event                       | Query in audit explorer                                      |
   |-----------------------------------|--------------------------------------------------------------|
   | [Recently created dashboards][4]  | `@evt.name:Dashboard @asset.type:dashboard @action:created`  |
   | [Recently modified dashboards][5] | `@evt.name:Dashboard @asset.type:dashboard @action:modified` |
   | [Recently deleted dashboards][6]  | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`  |

1. Optionally, on the facet panel, use filters like **Asset ID** or **Asset Name** to narrow your results down to a specific dashboard.
1. For each event in the table, you can see the email address of the user who performed the last change, and a summary of what happened. 

   To see additional information about a specific change, click the row in the table. Then, click the **Inspect Changes (Diff)** tab to see the changes that were made to the dashboard's configuration:

   {{< img src="account_management/audit_logs/dashboard_change_diff.png" alt="A text diff showing a new widget being added to the dashboard" style="width:100%;" >}}

1. See [Create a dashboard or a graph][3] if you want to put this information into a dashboard or graph.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/audit-trail
[3]: /account_management/audit_trail/#create-a-dashboard-or-a-graph
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[7]: /account_management/audit_trail/events