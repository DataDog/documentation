---
title: Derived Metrics 
further_reading:
- link: "https://www.datadoghq.com/blog/auto-smoother-asap/"
  tag: "Blog"
  text: "Auto-smooth noisy metrics to reveal trends"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScUkDpqIQNN1G4llFA7JN2qeevIp4wqfyDaa4A7lRCEa9FopQ/viewform?usp=header" >}}
The Derived Metrics feature is in Preview.
{{< /callout >}} 

## Overview

Derived Metrics allow you to save any metrics query as a new metric, so you can simplify and optimize how you work with metrics in Datadog. Instead of repeatedly building complex queries across dashboards, monitors, SLOs, and notebooks, you can create a derived metric once and reuse it across all your assets. Use derived metrics to:

- **Simplify querying**: Define a query once, save it as a derived metric, and reuse it everywhere.
- **Reduce errors and increase consistency**: Maintain formulas centrally to avoid errors and ensure uniformity across teams.
- **Accelerate workflows**: No code changes or new metric submissions needed-—-create new metrics directly from existing metrics in Datadog.
- **Gain control and auditability**: Manage, and improve derived formulas in a single place.

**Note**: Derived Metrics are **not** billed as Custom Metrics, because they are computed dynamically at query time and are not stored or indexed.

## Create a derived metric

To create a derived metric, navigate to **[Metrics > Generate Metrics][1]** and click **+ New Metric**.

{{< img src="metrics/derived_metrics/generate_metrics_tab.png" alt="The generate metrics tab in Datadog" style="width:90%;" >}}

1. Give your derived metric a name that does **not** start with `datadog.estimated_usage`. Use the format described in [naming custom metrics][2].

2. Define any underlying metrics queries, and optionally use the formula box to define mathematical operations to perform on the metric values. 

   For example, to monitor the overall stability of Kafka connectors, you could create individual queries `a` and `b` using the metrics `kafka.connect.connector.status.running` and `kafka.connect.connector.status.failed`. Then, in the formula box, enter the formula `(a / (a + b)) * 100`.

   For more information on how to define metric queries, see [querying metrics][3].

{{< img src="metrics/derived_metrics/derived_metric_query.png" alt="A Datadog metric query to generate a derived metric" style="width:90%;" >}}

3. Click **Create Metric**.

## Update a derived metric

To update a derived metric, hover over the metric and click the **Edit** icon that appears to the right. 

**Note**: You cannot rename an existing metric. Create a new metric instead.

## Delete a derived metric

To delete a derived metric, hover over the derived metric and click the **Delete** icon that appears to the right. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/metric/generate-metrics
[2]: /metrics/custom_metrics/#naming-custom-metrics
[3]: /metrics/#querying-metrics
