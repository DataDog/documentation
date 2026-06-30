---
title: Adaptive Polling of CloudWatch Metrics
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

* Metrics used in Datadog monitors are always considered active.
* Custom metrics are not included in adaptive polling.

### Multiple AWS accounts

Adaptive Polling applies across all AWS accounts monitored by Datadog.

### What happens when a slowed metric is queried?

As soon as the metric is queried by any surface (such as a dashboard, monitor, notebook, Metrics Explorer, or API query), Datadog returns that metric to the active 10-minute polling frequency.

**Note:** There is a short operational lag of a few minutes between when the query happens and when re-polling of data occurs.

For example, if metrics were last polled at 1:00 p.m. and a dashboard containing a slowed metric is opened at 1:02 p.m., the metric returns to active status but does not refresh until the next poll cycle, 8 minutes later at 1:10 p.m.  

### How do you enable this or opt out of Adaptive Polling?

All Datadog organizations and AWS accounts are automatically enrolled in adaptive polling. To opt out, contact [Datadog support](https://www.datadoghq.com/support/).

### Unopened dashboards and notebooks

Dashboards and notebooks only run their metric queries when opened. If unopened, the metrics in their queries may become classified as unqueried.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/metric/summary
[3]: /metrics/summary/#facet-panel

