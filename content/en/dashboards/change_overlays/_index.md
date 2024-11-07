---
title: Change Overlays
description: Overlay your change events on graphs to correlate performance anomalies with changes in your application
further_reading:
- link: "/tracing/services/deployment_tracking/"
  tag: "Documentation"
  text: "Getting started with APM Deployment Tracking"
- link: "https://www.datadoghq.com/blog/datadog-deployment-tracking/"
  tag: "Blog"
  text: "Monitor code deployments with Deployment Tracking in Datadog APM"
- link: "https://www.datadoghq.com/blog/faulty-deployment-detection/"
  tag: "Blog"
  text: "Release code confidently with Automatic Faulty Deployment Detection"
- link: "/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm"
  tag: "Documentation"
  text: "Getting started with RUM Deployment Tracking"
- link: "https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/"
  tag: "Blog"
  text: "Troubleshoot faulty frontend deployments with Deployment Tracking in RUM"
- link: "https://www.datadoghq.com/blog/change-overlays/"
  tag: "Blog"
  text: "Quickly spot and revert faulty deployments with Change Overlays"
---
<div class="alert alert-warning">
    Change Overlays is in beta.
</div>


## Overview

As teams iterate, deploy code, and continually make changes to their applications and services, it can be difficult to find the exact change that caused a spike in errors, an increase in latency, or slower page load times. Use Change overlays to identify when a recent change is causing performance issues within your application or services and find the source of the problem.

View the moment a change occurs in the context of your Datadog observability data to pinpoint issues to specific releases, correlate changes with metrics, and troubleshoot faster. Change overlays supports [APM service deployments][1].

## Overlay changes on graphs

To get started, click **Show Overlays** in the upper right corner of your dashboard. 

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="Overlays button on dashboard header" style="width:100%;">}}

Overlays automatically appear on timeseries graphs filtered with the `service` tag for services configured with `version` tags. To enable deployments in your APM services, [add version tags to your configuration][1]. 

Click on any event overlay to open a side panel with more information and [analyze the impact of your change](#analyze-the-impact-of-your-change).

### Show faulty deploys
Use the toggle in the overlays panel to only show [faulty deployments][2] that could be impacting your metrics.

### Override automatic detection
Override the automatic service detection by using the search bar to find the service of interest. 

## Analyze the impact of your change
Click on any overlay on your graph to open a change analysis page, allowing you to understand the status and impact of you change.

{{< img src="dashboards/change_overlays/change_overlays_side_panel.png" alt="Change overlays side panel" style="width:75%;">}}

### APM deployments
For APM deployments, you can:
- Compare the version selected to overall service performance for requests, errors, or latency
- View the rollout of your version by `region`, `env`, or `datacenter`
- See new Error Tracking issues that have been introduced with the new deployment
- Check related infrastructure that your service is running on

{{< img src="dashboards/change_overlays/apm_overlays_side_panel.png" alt="APM overlays side panel" style="width:75%;">}}

## FAQ
### When do overlays appear?
For APM deployments, overlays appear on timeseries graphs that:
1. Are filtered by the `service` tag in the query
2. Have the `service` set up with the `version` tag

### What are deployments scoped to?
For APM deployments, an `env` must be specified. If you have an `env` or `datacenter` template variable set in your dashboard, deployments are filtered to match the selection. Otherwise, the `env` defaults to `prod`. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/deployment_tracking/
[2]: /watchdog/faulty_deployment_detection/
[3]: /dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /metrics/advanced-filtering/
[8]: /getting_started/tagging/
[9]: /metrics/#time-aggregation
[10]: /dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /dashboards/functions/rollup/
[12]: /dashboards/functions/#apply-functions-optional
[13]: /metrics/advanced-filtering/#boolean-filtered-queries
[14]: /logs/explorer/search_syntax/
[15]: /dashboards/widgets/timeseries/#event-overlay
