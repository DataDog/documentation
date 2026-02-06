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

## Overview

As teams iterate, deploy code, and make changes to their applications and services, identifying the exact change that caused a spike in errors, increased latency, or slower page load times can be challenging. Use Change Overlays to visualize changes on your dashboard like deployments or feature flags, and quickly correlate performance issues with them.

## Overlay changes on graphs

To get started, click **Show Overlays** in the upper right corner of your dashboard. Now you can enable the [Change Tracking][16] timeline and change overlays on timeseries widgets.

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="Overlays button on dashboard header" style="width:100%;">}}

When activated, the **Service** search bar displays the **Most Relevant** service by default. Datadog automatically selects the service most frequently referenced in the queries supporting the widgets on the dashboard.

Override the automatic service detection by using the search bar to find the service of interest. 

All changes displayed on the change timeline and as overlays tie back to the selected service. 
Use the **Show On** dropdown to limit change overlays to relevant widgets, or shown them on all widgets on your dashboard.

To view additional details or take additional actions, click on a change overlay or change within the change timeline.

## FAQ

### What are deployments changes scoped to?
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
[16]: /change_tracking/
