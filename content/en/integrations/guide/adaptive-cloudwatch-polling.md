---
title: Adaptive Polling of CloudWatch Metrics
private: true
description: "Adaptive Polling of CloudWatch Metrics"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"

---

{{< callout url="#" header="false" btn_hidden="true" >}}
  Adaptive Polling of CloudWatch Metrics is in Preview.
{{< /callout >}} 

## Overview

When Datadog queries metrics in CloudWatch on your behalf, it can lead to increased CloudWatch cost due to `GetMetricData` (GMD) API calls.

Adaptive Polling helps you save costs by reducing the polling frequency of metrics that haven't been queried (used in monitors, dashboards, notebooks, or metric queries) for at least 30 days. Polling of unqueried metrics is automatically throttled to one-hour intervals.

## Considerations

### Newly added metrics

A newly added metric must be unqueried for 30 days before being classified as unqueried. During this time, Datadog makes GMD API calls at the default frequency.

### Multiple AWS accounts

Adaptive Polling applies across all AWS accounts monitored by Datadog.

### A previously unqueried metric is queried

If a previously unqueried metric is newly queried, datapoints may initially be missing for up to one hour until polling resumes at the default frequency.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
