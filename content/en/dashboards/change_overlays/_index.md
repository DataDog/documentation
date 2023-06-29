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
    Change Overlays is currently in beta.
</div>


## Overview

As teams iterate quickly, deploy code and continually make changes to their applications and services, it can be difficult to find the exact change that caused a spike in errors, an increase in latency, or slower page load times. Change overlays enables you to identify when a recent change is causing performance issues within your application or services and helps you identify the source of the problem.

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Change overlays on graphs in a Dashboard" style="width:75%;">}}

By viewing the moment a change occurred in the context of your Datadog observability data, you can easily correlate changes with performance metrics, pinpoint issues to specific releases, and troubleshoot faster. Change overlays currently supports [APM service deployments][1].


## Overlay changes on graphs

To get started, click the **Overlays** button in the upper right corner of your dashboard. 

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Overlays button on dashboards" style="width:75%;">}}

Overlays will automatically appear on timeseries graphs filtered with the `service` tag for services configured with `version` tags. To enable deployments in your APM services, [add version tags to your configuration][1]. 

You can click on any event overlay to open a side panel with more information and [analyze the impact of your change](#analyze-the-impact-of-your-change).


### Show faulty deploys

Use the toggle in the overlays panel to only show [faulty deployments][2] that could be impacting your metrics.

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Faulty Deployments toggle" style="width:75%;">}}


### Overriding automatic detection
You can override the automatic service detection by using the search bar to find the service of interest. 

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Overlays button on dashboards" style="width:75%;">}}



## Analyze the impact of your change
Click on any overlay on your graph to open a change analysis page, allowing you to understand the status and impact of you change.

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Overlays button on dashboards" style="width:75%;">}}

### APM Deployments
For APM deployments, you can:
- Compare the version selected to overall service performance. In the dropdown, you can see choose to compare Requests, Errors, or Latency
- View the rollout of your version by `region`, `env`, or `datacenter`
- See new Error Tracking issues that have been introduced with the new deployment
- Check related infrastructure that your service is running on

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Overlays button on dashboards" style="width:75%;">}}

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
