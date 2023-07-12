---
title: Change Overlays
kind: documentation
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


---
<div class="alert alert-warning">
    Change Overlays is currently in  beta.
</div>


## Overview

As teams iterate quickly, deploy code and continually make changes to their applications and services, it can be difficult to find the exact change that caused a spike in errors, an increase in latency, or slower page load times. Change overlays enables you to identify when a recent change is causing performance issues within your application or services and helps you identify the source of the problem.

{{< img src="dashboards/change_overlays/references-graphing-edit-window-with-y-2.png" alt="Change overlays on graphs in a Dashboard" style="width:75%;">}}

By viewing the moment a change occurred in the context of your Datadog observability data, you can easily pinpoint issues to specific releases, correlate changes with metrics, and troubleshoot faster. Change overlays currently supports [APM service deployments][1].


## Overlay changes on graphs

To get started, click the **Overlays** button in the upper right corner of your dashboard. 

{{< img src="dashboards/change_overlays/overlays_button_dashboard.png" alt="Overlays button on dashboards" style="width:75%;">}}

Overlays will automatically appear on timeseries graphs filtered with the `service` tag for services configured with `version` tags. To enable deployments in your APM services, [add version tags to your configuration][1]. 

You can click on any event overlay to open a side panel with more information and [analyze the impact of your change](#analyze-the-impact-of-your-change).


### Show faulty deploys

Use the toggle in the overlays panel to only show [faulty deployments][2] that could be impacting your metrics.

{{< img src="dashboards/change_overlays/faulty_deployments_toggle.png" alt="Faulty Deployments toggle" style="width:75%;">}}


### Overriding automatic detection
You can override the automatic service detection by using the search bar to find the service of interest. 

{{< img src="dashboards/change_overlays/service_selector.png" alt="Service selector override" style="width:75%;">}}



## Analyze the impact of your change
Click on any overlay on your graph to open a change analysis page, allowing you to understand the status and impact of you change.

{{< img src="dashboards/change_overlays/change_overlays_side_panel.png" alt="Change overlays side panel" style="width:75%;">}}

### APM Deployments
For APM deployments, you can:
- Compare the version selected to overall service performance for Requests, Errors, or Latency
- View the rollout of your version by `region`, `env`, or `datacenter`
- See new Error Tracking issues that have been introduced with the new deployment
- Check related infrastructure that your service is running on

{{< img src="dashboards/change_overlays/apm_overlays_side_panel.png" alt="APM overlays side panel" style="width:75%;">}}

## FAQ
### When do overlays appears?
For APM deployments overlays will appear on timeseries graphs that:
1. Are filtered by the `service` tag in the query
2. That have the `service` set up with the `verion` tag

### What are my deployments scoped to?
For APM deployments, an `env` must be specified. If you have a `env` or `datacenter` template variable set in your dashboard, deployments will be filtered to match the selection. Otherwise the `env` will be defaulted to `prod`. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/deployment_tracking/
[2]: watchdog/faulty_deployment_detection/
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
