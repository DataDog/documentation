---
title: Volume
kind: documentation
description: "Understand and manage your custom metrics usage and costs."
further_reading:
  - link: "/metrics/summary/"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "/metrics/metrics-without-limits/"
    tag: "Documentation"
    text: "Metrics without Limits™"

---

{{< beta-callout url="" btn_hidden="true">}}
Metrics Volume is in beta.
{{< /beta-callout >}}

## Overview
Cloud-based applications can generate massive amounts of data. And as your organization or business scales, you'll naturally have more teams that want and need to submit more data to provide better coverage of how your business is doing. But this growth can be daunting and seem unruly for organizations; especially for core observability teams within these organizations that are responsible for managing overall observability spend and resolving sudden spikes and overages quickly as to not burn through their budget. Observability costs are becoming a significant budget item but core observability teams lack visibility into what is truly valuable to each individual engineering team. Concurrently, individual teams may have limited insights into the costs of the metrics/tags they're submitting; therefore, they're less incentivized to be proactive in helping manage this growth. 

It is crucial for everyone to have visibility into their usage and feel empowered to take ownership of managing those volumes and associated costs. Therefore, we've introduced the Metrics Volume Management page to provide this comprehensive visibility and intelligent insights for which metrics you should focus your cost-optimization efforts with Metrics without Limits. Datadog recognizes that not all your metrics are equally valuable at every moment, so we were the first in the industry to introduce Datadog's Metrics without LimitsTM[1] which provides you flexibility by decoupling metric ingestion from indexing; allowing you to configure metrics to reduce costs through aggregation while preserving the mathematical accuracy of your configured metrics (all within our platform without any code-level changes). 

The Metrics Volume Management page[2] provides an out-of-the-box view of both your custom metrics' value, volume and therefore, costs in real-time so any developer in your organization can quickly identify the root causes of any volume spikes and be empowered to remediate those potentially inadvertent spikes with Metrics without Limits even faster without sacrificing the core observability that your teams' rely on. 

This volume management page provides all users real-time answers to the following questions: 
  - Which metric names are causing my custom metrics bill to spike? 
  - What are my organization's largest custom metrics?
  - Are these high cardinality custom metric names actually queried and valuable to my team? 
  - What metric names have spiked recently in the past timeframe of my choosing? (i.e. past day or month) 
  - I'm on `team:X` and responsible for optimizing my team's metrics based on internal chargebacks - which metrics do I own?
- I'm on `team:X` and responsible for optimizing my team's metrics based on internal chargebacks -  which ones should I focus my cost-optimization efforts on? 
  - How can my team better utilize our existing metrics to get more value from our observability spend?

{{< img src="metrics/volume/overview.jpg" alt="Metrics Volume Management Page" style="width:75%;">}}

## Identifying drivers of your account's custom metrics bill spikes 
As a quick refresher, your overall account's usage and monthly bill for custom metrics can viewed on the Plan&Usage page[3], such as your monthly Custom Metrics usage, costs, burn rate and Top Custom Metrics. The Usage Attribution feature[4] also provides a breakdown of your overall account's bill by any arbitrary dimension of your choosing; for example, `team:X` emits a volume of 10K custom metrics. However, as we stated earlier, all developers should have visibility into which metrics are driving their bill spikes in real-time and feel confident that their cost optimization efforts won't sacrifice another team's visibility. 

Therefore, the Metrics Volume Management page provides _all_ users (not just ones with Admin roles) with real-time, OOTB insights such as: 
- Top 500 Metric Names by Estimated Real-time Cardinality -- Quickly identify the top 500 metric names by cardinality/volume by clicking on the "Est. Custom Metrics" 
- Top 500 Metric Names by Change in Volume -- Quickly discover the top 500 metric names that have the greatest variance in their cardinality -- these metrics may have anomalously (potentially unintentionally) spiked in the timeframe of your choosing. If you've received an alert on your account's estimated real-time custom metrics usage, you can use this to quickly pinpoint the culprits tied to that spike. 

To view how your spiking metric's cardinality compares over time: 
{{< img src="metrics/volume/hoverstate.jpg" alt="Change in Volume Hover Graph" style="width:75%;">}}
1. Select a timeframe of your choosing in the top right hand corner (recommended timeframe of Past 1 Day or Past 4 Weeks) 
2. Click on the `Change in Volume` label to open up a comparison graph of your spiking metric's cardinality over time as well as how much percentage wise your metric has spiked
3. (Optional) Create a change % metric monitor to proactively alert on this spiking metric. Learn more about change monitors here[5].

You can additionally filter this list of spiking metric names down to the metrics submitted by a specific team, application or service to view who is responsible for any potential volume spikes. To do so, type in any tag key value pair in the *Filter by Tag Value* box.
{{< img src="metrics/volume/teamfilter.jpg" alt="Metrics Volume Management page filtered to team:dbm" style="width:75%;">}}

## Understanding whether these metrics provide value to your organization 
Now that you've identified your largest metrics or spiking metric names likely causing your account's overall custom metric volume spike, you'll need to understand the utility of this data in order to safely use Metrics without Limits to effectively reduce the costs of those metric names. 

To identify your top metric names that haven't been actively queried in the past 30 days, click on "Not Actively Queried" in the Query Activity Facet box on the left. Datadog analyzes your query patterns over the past 30 days to intelligently identify which metrics are valuable to your teams vs not. Selecting "Not Actively Queried" returns a list of metric names that haven't been actively queried on any dashboards, notebooks, monitors, SLOs, Metrics Explorer or via the API. 

{{< img src="metrics/volume/unqueried.jpg" alt="Filter to Unqueried Metrics" style="width:75%;">}}

We continuously analyze your query patterns such that you can always access an up-to-date list of metrics in a matter of seconds. 

### Quickly reduce costs of your unqueried metrics with the Query Activity Facet
Now that you've identified which metric names aren't valuable due to their query patterns, you can quickly eliminate the volumes, and therefore costs, of these metric names by using Metrics without LimitsTM[1] to maximize efficiency and ROI on your observability spend. 

1. Click on the metric name to open its details sidepanel
2. Click the Manage Tags button to open the tag configuration modal.
3. Select Include tags… but set an empty allowlist of tags.

You have full control over the cardinality of your metrics at any time with zero changes needed to your applications or the requirement of a remote-write setup. Below is an example of how eliminating timeseries that are never or rarely leveraged can significantly reduce your custom metrics volumes and therefore costs. 
Include screenshot of removing all unqueried metrics on EUM volume

### Review the value of your queried metrics with Metrics Related Assets (BETA)
While you can use Metrics without LimitsTM[1] to pay only for the metrics you use by eliminating timeseries that are never queried for the past 30 days, it may also be useful to review the utility of metrics that are queried but rarely leveraged in-app on any dashboard, notebook, monitor or SLO. 

Datadog surfaces your metric's related assets automatically and OOTB. Metrics related assets refers to any dashboard, notebook, monitor, or SLO that queries a particular metric. 

{{< img src="metrics/summary/RelatedAssets.PublicBeta.png" alt="Related Assets for a specified metrics name" style="width:80%;">}}

To view a metric's related assets: 
1. Click on the metric name to open its details sidepanel 
2. Scroll down to the the section of the sidepanel titled "Related Assets)
3. Click the dropdown button to view the type of related asset you are interested in (dashboards, monitors, notebooks, SLOs). You can additionally leverage the search bar to validate specific assets.

You can make data driven decisions based on the number of assets or the popularity of said assets to assess the utility of these metrics to your overall organization. Metrics with related assets can still be further optimized using Metrics without LimitsTM[1]. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/metrics-without-limits
[2]: https://app.datadoghq.com/metric/volume
[3]: https://app.datadoghq.com/billing/usage
[4]: https://app.datadoghq.com/billing/usage-attribution?view=table
[5]: /monitors/guide/change-alert/
