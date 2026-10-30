---
title: Derived Metrics 
description: "Save a metrics query as a new metric you can reuse across dashboards, monitors, SLOs, and notebooks."
further_reading:
- link: "https://www.datadoghq.com/blog/auto-smoother-asap/"
  tag: "Blog"
  text: "Auto-smooth noisy metrics to reveal trends"
---

## Overview

Derived Metrics allow you to save any metrics query as a new metric, so you can simplify and optimize how you work with metrics in Datadog. Instead of repeatedly building complex queries across dashboards, monitors, SLOs, and notebooks, you can create a derived metric once and reuse it across all your assets. Use derived metrics to:

- **Simplify querying**: Define a query once, save it as a derived metric, and reuse it everywhere.
- **Reduce errors and increase consistency**: Maintain formulas centrally to avoid errors and ensure uniformity across teams.
- **Accelerate workflows**: No code changes or new metric submissions needed-—-create new metrics directly from existing metrics in Datadog.
- **Gain control and auditability**: Manage, and improve derived formulas in a single place.

**Note**: Derived Metrics are **not** billed as Custom Metrics, because they are computed dynamically at query time and are not stored or indexed.

## Create a derived metric

To create a derived metric, navigate to [{{< ui >}}Metrics > Generate Metrics{{< /ui >}}][1] and click {{< ui >}}\+ New Metric{{< /ui >}}.

{{< img src="metrics/derived_metrics/generate_metrics_tab.png" alt="The generate metrics tab in Datadog" style="width:90%;" >}}

1. Give your derived metric a name that does **not** start with `datadog.estimated_usage`. Use the format described in [naming custom metrics][2].

2. Define any underlying metrics queries, and optionally use the formula box to define mathematical operations to perform on the metric values. 

   For example, to monitor the overall stability of Kafka connectors, you could create individual queries `a` and `b` using the metrics `kafka.connect.connector.status.running` and `kafka.connect.connector.status.failed`. Then, in the formula box, enter the formula `(a / (a + b)) * 100`.

   For more information on how to define metric queries, see [querying metrics][3].

{{< img src="metrics/derived_metrics/derived_metric_query.png" alt="A Datadog metric query to generate a derived metric" style="width:90%;" >}}

3. Click {{< ui >}}Create Metric{{< /ui >}}.

## Update a derived metric

To update a derived metric, hover over the metric and click the {{< ui >}}Edit{{< /ui >}} icon that appears to the right. 

**Note**: You cannot rename an existing metric. Create a new metric instead.

## Delete a derived metric

To delete a derived metric, hover over the derived metric and click the {{< ui >}}Delete{{< /ui >}} icon that appears to the right. 

## Manage derived metrics with Terraform

Use the [`datadog_derived_metric` resource][4] to create, update, and delete derived metric definitions with Terraform.

Before you begin, [configure the Datadog Terraform provider][5]. Your application key needs **Metrics Read** (`metrics_read`) and **Manage Tags for Metrics** (`metric_tags_write`) permissions. See [API and application keys][6] for details.

For example, add this resource to your Terraform configuration to combine two CPU metrics:

```hcl
resource "datadog_derived_metric" "cpu_total" {
  name    = "custom.cpu.total"
  formula = "a + b"
  queries = [
    {
      name        = "a"
      data_source = "metrics"
      query       = "avg:system.cpu.user{*}"
    },
    {
      name        = "b"
      data_source = "metrics"
      query       = "avg:system.cpu.system{*}"
    },
  ]
}
```

Run `terraform plan` to review the changes, then run `terraform apply` to create the derived metric.

Changes to `formula` or `queries` update the existing definition. Changing `name` replaces the derived metric.

To manage an existing derived metric, add its resource configuration and import it by name:

```shell
terraform import datadog_derived_metric.cpu_total "custom.cpu.total"
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/metric/generate-metrics
[2]: /metrics/custom_metrics/#naming-custom-metrics
[3]: /metrics/#querying-metrics
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/derived_metric
[5]: /integrations/terraform/#configuration
[6]: /account_management/api-app-keys/
