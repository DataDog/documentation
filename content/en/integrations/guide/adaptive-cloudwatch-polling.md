---
title: Adaptive Polling of CloudWatch Metrics
private: false
description: "Adaptive Polling of CloudWatch Metrics"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
---

## Overview

When Datadog queries metrics in CloudWatch on your behalf, it incurs AWS CloudWatch costs due to `GetMetricData` (GMD) API calls.

Adaptive Polling helps you save costs by reducing the polling frequency of metrics that haven't been queried (used in monitors, dashboards, notebooks, or metric queries) for at least 30 days. Polling of unqueried metrics is automatically throttled to one-hour intervals.

To see which metrics are unqueried, go to the [Metric Summary][2] page and filter by the **Query Activity** facet in the [facet panel][3].

**Note**: Newly added metrics are unqueried by default.

## Considerations

* Metrics used in Datadog monitors will always be considered active 
* Custom metrics are not included in apative polling  

### Multiple AWS accounts

Adaptive Polling applies across all AWS accounts monitored by Datadog.

### What happens when a slowed metric is queried?

As soon as the metric is queried by any surface (dashboard, monitor, notebook, Metrics Explorer, API query, etc.), Datadog will return that metric to the active 10-minute polling frequency. Note there is a short operational lag: it takes a few minutes between when the query happens and when re-polling of data occurs.
For example, a customer's metrics may have been crawled at 1:00pm, and then at 1:02pm a dashboard is viewed that contains a slowed metric. This slowed metric will return to active but will not refresh until the next metric crawl, 8 mins later at 1:10pm.  

### How do I enable or opt out of Adaptive Polling?

All Datadog orgs and AWS accounts are automatically enrolled in adaptive polling. To opt out, please make a request with [Datadog support](https://www.datadoghq.com/support/).

### Unopened dashboards and notebooks

Dashboards and notebooks only run their metric queries when opened. If unopened, the metrics in their queries may become classified as unqueried.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/metric/summary
[3]: /metrics/summary/#facet-panel

