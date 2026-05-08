---
title: Adaptive Polling of CloudWatch Metrics
private: true
description: "Adaptive Polling of CloudWatch Metrics"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
---

{{< callout url="https://www.datadoghq.com/product-preview/adaptive-metric-polling/" header="Join the Preview!" btn_hidden="false" >}}
  Adaptive Polling of CloudWatch Metrics is in Preview.
{{< /callout >}} 

## Overview

When Datadog queries metrics in CloudWatch on your behalf, it can lead to increased CloudWatch cost due to `GetMetricData` (GMD) API calls.

Adaptive Polling helps you save costs by reducing the polling frequency of metrics that haven't been queried (used in monitors, dashboards, notebooks, or metric queries) for at least 30 days. Polling of unqueried metrics is automatically throttled to one-hour intervals.

To see which metrics are unqueried, go to the [Metric Summary][2] page and filter by the **Query Activity** facet in the [facet panel][3].

**Note**: Newly added metrics are unqueried by default.

## Considerations

### Multiple AWS accounts

Adaptive Polling applies across all AWS accounts monitored by Datadog.

### A previously unqueried metric is queried

If a previously unqueried metric is newly queried, datapoints may initially be missing for up to one hour until polling resumes at the default frequency.

### Unopened dashboards and notebooks

Dashboards and notebooks only run their metric queries when opened. If unopened, the metrics in their queries may become classified as unqueried.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/metric/summary
[3]: /metrics/summary/#facet-panel

