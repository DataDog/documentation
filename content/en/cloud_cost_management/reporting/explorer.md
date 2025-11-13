---
title: Cost Explorer
description: Query and analyze cloud costs in real time with flexible filters and visualizations.
further_reading:
- link: "/cloud_cost_management/reporting/"
  tag: "Documentation"
  text: "Create and save cost reports"
- link: "/cloud_cost_management/tags/multisource_querying"
  tag: "Documentation"
  text: "Query costs across multiple providers"
- link: "/monitors/types/cloud_cost/"
  tag: "Documentation"
  text: "Create cost monitors"
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
---

## Overview

The [Cloud Cost Explorer][1] provides an interactive, query-based interface for analyzing your cloud spending across [AWS][2], [Azure][3], [Google Cloud][4], [Oracle][5], [SaaS providers][6], and [Datadog costs][7]. Unlike saved reports, the Explorer lets you perform ad-hoc analysis with flexible queries, filters, and visualizations to investigate cost trends, identify anomalies, and answer specific questions about your cloud spend.

Use the Cost Explorer to:
- Build custom queries across multiple providers using tags, services, and filters
- Investigate cost changes over time with flexible groupings and breakdowns
- Download data, create dashboard widgets, or set up cost monitors

## Query your cost data

1. Navigate to [**Cloud Cost > Analyze > Explorer**][1] in Datadog.
2. Build a search query using the query editor or dropdown filters:
   - Use the **Provider** dropdown to select one or more cloud providers
   - Click **+ Filter** to add filters for services, tags, regions, teams, and other attributes
   - Type directly in the search bar for more advanced queries

   {{< img src="cloud_cost/reporting/reporting-overview-1.png" alt="The Cloud Cost Explorer query builder showing provider selection, cost type filters, tag search, service filters, and group by options" style="width:100%;" >}}

3. Group your cost data by clicking **Group by** and selecting dimensions like:
   - Provider name
   - Service name
   - Resource tags (such as `team`, `env`, `project`)
   - Region
   - Account ID

4. Select a time range using the time picker to analyze costs over different periods (hour, day, week, month, or custom range).

**Note:** When querying costs across multiple providers, resource-level tags are not available. To access resource-specific tags, filter to a single provider in your query.

## Cost Change Summary side panel 

Click any row in the table at the bottom of the Explorer to open the **Cost Change Summary panel** for that specific provider, service, or resource. The panel highlights what and who may be driving cost changes for the current period versus the prior period.

The panel contains four general sections:
- Cost change summary
- Associated teams
- Change details
- Investigate further

{{< img src="cloud_cost/reporting/cost-change-sidepanel.png" alt="The Cost Change Summary panel highlights what and who may be driving cost changes for the current period versus the prior period." style="width:100%;" >}}

At the top, you can see the **total cost** for the current period and the dollar and percent cost change versus the prior period (**what happened**). 

### Investigate the change

Use the **Change Details** and **Investigate Further** sections to:

- **Instantly identify cost anomalies**---Unexpected deviations in cost, calculated against historical data, are automatically highlighted in red, allowing you to focus your investigation on critical trends.  
     
- **Analyze Change Drivers:** Easily determine the cause of a cost change—whether it was driven by a change in **usage** (the count of resources) or a change in **unit price** (the cost per resource). For example, in the screenshot below, we can see the change in spend is driven by a shift in unit price rather than usage—the resource count stays flat while cost per resource rises and falls, causing the overall cost change.

{{< img src="cloud_cost/reporting/cloud-cost-spend-summary.png" alt="The change in spend is driven by a shift in unit price rather than usage—the resource count stays flat while cost per resource rises and falls, causing the overall cost change" style="width:100%;" >}}

### Collaborate and monitor

- **Contact the responsible team**:
  - Review the **Associated Team(s)** section to identify which teams own the resources driving the cost change (inferred from tags like `team:shopist`). Follow up with the listed teams (for example, Shopist, Platform, Cloud-Networks) to gain full context for the change.
  - Click **Send Notebook** to share the full cost investigation context directly with the team, allowing them to capture findings, add annotations, and track the investigation thread.

- **Filter by tags**:
  - Use **Associated Tags** to see all tags contributing to the cost line item.
  - Click any tag value (like `account:demo` or a specific `aws_account`) to refine your search and filter the entire Explorer to show only resources with that tag.

- **Create a monitor**:
  - Set up a Cloud Cost Monitor to be alerted the next time a similar change occurs. Learn more about [Cloud Cost Monitors][10].

## Refine your results

Click **Refine Results** to access advanced filtering options that help you focus on specific cost patterns.

   {{< img src="cloud_cost/reporting/refine-results.png" alt="The Refine Results panel shows filtering options including Usage Charges Only, Complete Days Only, Total Cost, Dollar Change, and Percent Change" style="width:100%;" >}}

**Complete Days Only**
: Exclude the past two days of cost data, which may be incomplete. Use this option for accurate historical analysis.

**Total Cost**
: Filter the data to view costs within a specific dollar range (for example, show only resources costing more than $1,000).

**Dollar Change**
: Display only cost changes within a specified dollar change range (for example, show services with a $500+ increase).

**Percent Change**
: Display only cost changes within a specified percentage range (for example, show resources with a 20%+ cost increase).

## Change data views

The Cost Explorer displays your cost data as a timeseries graph with a table breakdown. You can change how the graph displays data by selecting from the following views:

- **Costs ($)**: View total costs in dollars over time
- **Change trends (%)**: View cost changes as percentage increases or decreases
- **Change trends ($)**: View cost changes in dollar amounts

{{< img src="cloud_cost/reporting/change-view.png" alt="Dropdown menu showing three view options: Costs in $, Change trends in %, and Change trends in $" style="width:100%;" >}}

Switch between these views to identify whether you're tracking absolute costs or investigating cost variations.

### Table display options

Below the graph, the table displays costs broken down by your selected grouping (such as provider, service name, or tags). You can customize how this data is displayed.

{{< img src="cloud_cost/reporting/table-display-options.png" alt="Table display options showing Summary and Breakdown view modes, column visibility toggles, and Top changes only filter" style="width:100%;" >}}

**View modes**
- **Summary**: View aggregated costs across all time periods for a high-level overview
- **Breakdown**: See costs broken down by time period (daily, weekly, or monthly depending on your selected time range)

**Filters**
- **Top changes only**: Enable this checkbox to filter the table and show only the resources or services with the largest cost increases or decreases

**Column visibility**

Show or hide columns in the table to focus on the metrics that matter:
- **Total**: Total aggregated costs for each resource or service
- **Dollar change trends**: Cost changes in dollar amounts over time
- **Change trends**: Percentage-based cost changes over time

## Export and share

After analyzing costs in the Explorer, you can:

### Export to csv
Download your cost data for offline analysis, reporting, or sharing with stakeholders. Click the **Export** button and select **Download as CSV**.

### Create a dashboard widget
Save your current query as a dashboard widget to monitor costs alongside other metrics:
1. Click **Export** and select **Export to Dashboard**
2. Choose an existing dashboard or create a new one
3. Customize the widget title and settings

### Create a cost monitor
Set up alerts based on your current query to get notified when costs exceed thresholds or change unexpectedly:
1. Click **Export** and select **Create Monitor**
2. Configure alert conditions (for example, when costs exceed $10,000 or increase by 20%)
3. Set notification channels (email, Slack, PagerDuty)

Learn more about [Cloud Cost Monitors][8].

### Share your query
Copy the URL from your browser to share your current cost query with team members. The URL includes all filters, groupings, and time range settings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/explorer
[2]: /cloud_cost_management/aws/
[3]: /cloud_cost_management/azure/
[4]: /cloud_cost_management/google_cloud/
[5]: /cloud_cost_management/oracle/
[6]: /cloud_cost_management/saas_costs/
[7]: /cloud_cost_management/datadog_costs/
[8]: /monitors/types/cloud_cost/
[9]: /cloud_cost_management/reporting/