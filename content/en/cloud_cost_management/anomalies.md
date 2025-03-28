---
title: Anomalies Page
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/monitors"
  tag: "Monitors"
  text: "Create Cost Monitors"
---

## Overview

Datadog Cloud Cost Management (CCM) continuously monitors your environment to detect and prioritize unexpected cost changes, enabling you to share, investigate, and resolve anomalies. Cost anomalies are available for AWS, and do not require any additional setup after CCM is set up.

## How anomalies are defined

Anomalies are significant, unexpected changes that stand out from typical patterns. Datadog automatically identifies anomalies using machine learning techniques that adapt to your specific usage patterns.

Our algorithm takes into account seasonality, distinguishing true anomalies from expected fluctuations. For example, if your infrastructure typically scales up every Monday, Datadog recognizes this pattern and won’t flag it as a cost anomaly.

To further reduce noise, anomalies with low cost impact are automatically filtered out, ensuring your attention stays focused on the largest anomalies.

[1]: https://app.datadoghq.com/cost/analyze/anomalies

## View cost anomalies

On the [Anomalies tab of the Cloud Cost page in Datadog][1], you can view the anomalies and filter them to Active, Past, or Resolved:
- **Active**: An anomaly is **Active** if anomalous costs occurred in the last day (the last full day of cost data, which is often 2-3 days prior).
- **Past**: If an anomaly lasts more than 7 days, or the algorithm detects that costs are no longer anomalous, the anomaly is moved to the **Past** tab. Past anomalies can be useful to report on, but are often less urgent and actionable.
- **Resolved**: If you [resolve an anomaly](#resolve-anomalies), the anomaly can be found in the **Resolved** tab.

Each anomaly explains how much more costs were than expected for the service name (ex:`rds`), usage type, and cloud accounts for the anomaly. The anomaly also shows what expected costs would have been in the time frame. The card also shows a graph with the cost trend over the past 1 month.

Anomalies with the most unexpected costs are at the top, so that it is easier to take action on anomalies with the most impact first.

This is an example of the list of anomalies detected in your infrastructure:

{{< img src="cloud_cost/anomalies/cost_anomalies_list.png" alt="List of cost anomalies automatically detected" style="width:90%;" >}}

## Take action on anomalies

Click an anomaly to view the services, teams, environments, and resource IDs that may be driving the cost anomaly.

Investigate the anomaly further, and by any additional dimensions, by viewing the costs in Explorer or saving the query to a Notebook. You can also send the anomaly, Explorer link, or Notebook to the associated service owners or teams. This enables teams to provide context for why the anomaly occurred, and if it's expected.

You can also create a cost anomaly monitor to get alerted of similar cost anomalies in the future.

This is the side panel where you can take action on your cost anomaly:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel.png" alt="In the side panel you can take action on your cost anomaly" style="width:90%;" >}}

## Resolve anomalies

As you investigate anomalies, you may find anomalies that are not significant, were actually expected costs, or are otherwise not considered an anomaly.

Mark anomalies as significant or insignificant to give feedback and help improve the anomaly detection algorithm. Resolve anomalies with context to move anomalies to the Resolved tab, and add context for others in your organization.

This is an example of how to mark a cost anomaly as significant and explain why it's an anomaly:

{{< img src="cloud_cost/anomalies/cost_anomalies_side-panel_is-significant.png" alt="You can mark cost anomaly as significant and write an explanation about why it's an anomaly  and then resolve it" style="width:90%;" >}}
