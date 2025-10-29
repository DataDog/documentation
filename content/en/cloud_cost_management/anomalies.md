---
title: Anomalies Page
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/monitors"
  tag: "Monitors"
  text: "Create Cost Monitors"
---

## Overview

Datadog Cloud Cost Management (CCM) continuously monitors your environment to detect and prioritize unexpected cost changes, enabling you to share, investigate, and resolve anomalies. Cost anomalies are available for AWS, Azure, and Google Cloud and do not require any additional setup after CCM is set up.

{{< img src="cloud_cost/anomalies/anomalies-overview.png" alt="List of cost anomalies showing service names, usage types, and cost impacts" style="width:80;" >}}

A typical workflow could be the following:

1. **View** anomalies on the Anomalies tab
2. **Investigate** using Watchdog Explains to understand what's driving the cost changes
3. **Share with engineering teams** who can take action by reviewing details, investigating further, or setting up monitoring
4. **Resolve** anomalies that are expected or not significant

## How anomalies are defined

Anomalies are significant, unexpected changes that stand out from typical patterns. Datadog automatically identifies anomalies using machine learning techniques that adapt to your specific usage patterns.

To distinguish between true anomalies and expected fluctuations, Datadog's algorithm:
- Recognizes recurring cost spikes and dips, such as a cost increase every Monday, or a spike on the fourth day of every month
- Focuses on engineering usage (excludes taxes, credits, refunds, and Reserved Instance fees)
- Filters out low-impact anomalies to reduce noise

## View cost anomalies

On the [Anomalies tab of the Cloud Cost page in Datadog][1], you can view and filter anomalies:

- **Active**: Anomalies from the last full day of cost data (typically 2-3 days prior).
- **Past**: Anomalies that lasted more than 7 days or are no longer detected as anomalous. Past anomalies can be useful to report on, but are often less urgent and actionable.
- **Resolved**: Anomalies that you've marked as resolved with context.

Each anomaly card shows:
- Service name (`rds`, for example)
- Usage type
- Cloud accounts affected
- Expected vs. actual costs
- Cost trend graph (past 1 month)

Anomalies are sorted by cost impact, with the most significant changes at the top.

## Investigate anomalies

### Understand what drives anomalies

CCM automatically uses [Watchdog Explains][2], an investigation assistant, to help you identify what is driving cost anomalies. Watchdog Explains analyzes and identifies the specific:

- accounts
- teams
- services
- Kubernetes or ECS clusters
- regions

where the anomaly happened, reducing manual investigation steps. When hovering over the anomaly graph, you can see two graphs: one with and one without the tags identified by Watchdog Explains. This shows how removing specific tags flattens the spike, confirming the impact on the cost.

### Take action on anomalies

Follow these steps to investigate and resolve anomalies:

1. **Hover** over an anomaly to see anomaly drivers or click **See more** to open the side panel.

   {{< img src="cloud_cost/anomalies/anomalies-watchdog.png" alt="Click See More to see side panel showing anomaly details, investigation options, and action buttons" style="width:80;" >}}

1.  **Review the details** for services affected, teams involved, environments impacted, resource IDs, or how usage and unit price may be driving the cost anomaly.
1. **Investigate further**: View the anomaly in Cost Explorer or a Datadog Notebook to further investigate anomalies by using additional dimensions. You can then send the anomaly, Explorer link, or Notebook to the service owners or teams identified by Watchdog Explains. This enables teams to resolve anomalies with context for why the anomaly occurred and whether it's expected.

   {{< img src="cloud_cost/anomalies/anomalies-take-action.png" alt="Click Take Action to view the anomaly in Cost Explorer or add it to a Notebook" style="width:80;" >}}
1. **Set up monitoring**: Create a cost anomaly monitor for similar patterns or configure alerts for future anomalies.
   {{< img src="cloud_cost/anomalies/anomalies-create-monitor.png" alt="Create a cost anomaly monitor" style="width:80;" >}}

## Resolve anomalies

As you investigate anomalies, you may find some that are not significant, were actually expected costs, or are otherwise not considered anomalies.

To resolve an anomaly:

1. Click **Resolve Anomaly** to open the resolution popup.
1. Select one of the following resolutions to help improve the algorithm:
   - The anomaly amount was too small
   - This is an unexpected increase
   - This is an expected increase
1. **Add context** about why it is or is not an anomaly.
1. Click **Resolve** to move it to the Resolved tab.

This is an example of how to mark a cost anomaly as significant and explain why it's an anomaly:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-unexpected-1.png" alt="Form for marking an anomaly as unexpected with explanation field" style="width:80;" >}}

## Troubleshooting

If you're not seeing expected anomalies:
- Verify that CCM is [properly set up][3]
- Check that you have the necessary permissions for AWS, Azure, or Google Cloud
- Review the time range of your anomaly view

For more help, contact [Datadog Support][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/anomalies
[2]: /dashboards/graph_insights/watchdog_explains
[3]: /cloud_cost_management/setup/
[4]: /help/
