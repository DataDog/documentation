---
title: Measure Health with Metrics
description: "Learn how RUM computes metrics over your full traffic and how to use them to monitor the health of your frontend applications."
further_reading:
- link: "/real_user_monitoring/enrich_rum_data/"
  tag: "Documentation"
  text: "Enrich RUM data"
---

## Overview

RUM computes metrics over 100% of your ingested traffic, even when you retain only a subset of sessions with retention filters. Use these metrics to monitor the health of your frontend applications over time, track trends, and power dashboards and monitors.

After you have metrics, use them to visualize and alert on the health of your application:

- [Create dashboards][1] to build visualizations on top of your RUM metrics
- [Set up monitors][2] to get alerted when metrics cross thresholds

{{< whatsnext desc=" " >}}
    {{< nextlink href="/real_user_monitoring/measure_health_with_metrics/out_of_the_box_metrics/" >}}
    <h3>Out-of-the-box metrics</h3>
    Use the metrics Datadog automatically computes for every RUM application.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/measure_health_with_metrics/create_custom_metrics/" >}}
    <h3>Create custom metrics</h3>
    Create custom metrics from your RUM events.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/administer_and_extend_rum/dashboards/
[2]: /monitors/types/real_user_monitoring/
