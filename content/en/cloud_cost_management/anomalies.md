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

Datadog Cloud Cost Management (CCM) continuously monitors your environment to identify and prioritize unexpected cost changes, so that you can detect, share, investigate, and resolve cost anomalies. Cost anomalies are available for AWS, and do not require any additional setup after CCM is set up.

## View cost anomalies

On the [Anomalies tab of the Cloud Cost page in Datadog][1], you can view the anomalies and filter them to Active, Past, or Resolved:
- **Active**: An anomaly is **Active** if anomalous costs occurred in the last day (the last full day of cost data, which is often 2-3 days prior). 
- **Past**: If an anomaly lasts more than 7 days, or the algorithm detects that costs are no longer anomalous, the anomaly is moved to the **Past** tab. Past anomalies can be useful to report on, but are often less urgent and actionable.
- **Resolved**: If you Resolve an anomaly, the anomaly can be found in the **Resolved** tab.

Each anomaly explains how much more costs were than expected, the specific cloud service name (ex: rds), usage type (ex: db.r6g.12xl), and cloud accounts where the anomaly occured. The anomaly also shows what expected costs would have been in the time frame, with a graph that shows the cost pattern over the past 1 month.

Anomalies with the most unexpected costs are at the top, so that it is easier to take action on anomalies with the most impact first.

{{< img src="cloud_cost/anomalies/cost anomalies - list.png" alt="List of cost anomalies automatically detected" style="width:100%;" >}}

## Take action on anomalies

Click an anomaly to view the services, teams, environments, and resource IDs that may be driving the cost anomaly.

Investigate the anomaly further, and by any additional dimensions, by viewing the costs in Explorer or saving the query to a Notebook. You can also send the anomaly, Explorer link, or Notebook to the associated service owners or teams, so they can help provide context for why the anomaly occured, and if it's expected or not.

You can also create a cost anomaly monitor to get alerted of similar cost anomalies in the future.

{{< img src="cloud_cost/anomalies/cost anomalies - side panel" alt="In the side panel you can take action on your cost anomaly" style="width:100%;" >}}

## Resolve anomalies

As you investigate anomalies, you may find anomalies that are not significant, were actually expected costs, or are simply not considered an anomaly. 

Mark anomalies as significant or insignificant to give feedback and help improve the anomaly detection algorithm. Resolve anomalies with context to move anomalies to the Resolved tab, and add context for others in your organization.

{{< img src="cloud_cost/anomalies/cost anomalies - side panel - is significant.png" alt="You can mark cost anomaly as significant and write an explanation about why it's an anomaly  and then resolve it" style="width:100%;" >}}
{{< img src="cloud_cost/anomalies/cost anomalies - side panel - not significant - is significant.png" alt="You can mark cost anomaly as not significant and then you can choose not an anomaly and write an explanation about why it should be an anomaly  and then resolve it" style="width:100%;" >}}
{{< img src="cloud_cost/anomalies/cost anomalies - side panel - not significant - not an anomaly.png" alt="You can mark cost anomaly as not significant and then you can choose not an anomaly and write an explanation about why it's not an anomaly and then resolve it" style="width:100%;" >}}


## How anomalies are defined

Anomalies are irregular or unexpected changes that significantly deviate from established patterns. We use a machine learning-based anomaly detection algorithm that accounts for weekly seasonality and automatically filters out low-cost anomalies below $5 to reduce noise.

Weekly seasonality further reduce noise by identifying expected weekly patterns. For example, many business spin down a part of their infrastructure over the weekend and spin back up on Mondays, that's a cost increase but it shouldn't be flag as an anomaly.

[1]: https://app.datadoghq.com/cost/analyze/anomalies
