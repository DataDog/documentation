---
title: Track Dashboard Usage
disable_toc: false
further_reading:
- link: "account_management/audit_trail/"
  tag: "Documentation"
  text: "Set up Audit Trail"
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
{{< img src="account_management/audit_logs/dashboard_access_query.png" alt="Search query for all successful GET requests for a the dashboard ID pte-tos-7kc" style="width:100%;" >}}
`@http.status_code:200` narrows down the results to successful requests only.
<br>**Note**: You can also use the facet panel on the left side of the page to formulate the search query.
3. Select the timeframe in the upper right side of the page to see the events for a specific time period.
4. You can configure the **Group into fields** section and select different visualization tools to break down and analyze the data based on your use case. For example, if you set the `group by` field to `User Email` and click **Top List** in the **Visualize as** section, you get a top list of users who accessed the dashboard.
5. See [Create a dashboard or graph][3] if you want to put this information into a dashboard or graph.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/audit-trail
[3]: /account_management/audit_trail/#create-a-dashboard-or-a-graph