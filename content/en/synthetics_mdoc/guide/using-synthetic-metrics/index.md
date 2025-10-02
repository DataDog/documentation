---
title: Use Estimated Usage Metrics
description: Learn how to use general Synthetic metrics in monitors.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Use
  Estimated Usage Metrics
sourceUrl: https://docs.datadoghq.com/synthetics/guide/using-synthetic-metrics/index.html
---

# Use Estimated Usage Metrics

## Overview{% #overview %}

You can use [metrics](https://docs.datadoghq.com/synthetics/metrics/) generated from your Synthetic tests to create [metric monitors](https://docs.datadoghq.com/monitors/types/metric/) in addition to the [Synthetic monitor created with your test](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors/).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/using-synthetic-metrics/metric-monitor.321fc9fa0d1da220944b0d6ed420f4fc.png?auto=format"
   alt="Example metric monitor that alerts when too many tests are failing in CI" /%}

With metric monitors, you can accomplish the following:

- Monitor the total response time
- Scope on specific HTTP timings such as DNS, the DNS resolution, and TCP connection
- Access tags added to metrics coming from Synthetic tests

This guide demonstrates how to set up a metric monitor using a general metric such as `synthetics.test_runs`.

## Create a metric monitor{% #create-a-metric-monitor %}

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/using-synthetic-metrics/metric-monitor-setup.31d6e22345310ea116f753e5f241846a.png?auto=format"
   alt="Example metric monitor that alerts when too many tests are failing in CI" /%}

1. To create a metric monitor, navigate to [Monitors > New Monitor](https://app.datadoghq.com/monitors/create/metric) and click **Metric**.

1. Select a detection method to customize your monitor's alerting conditions. For this example, you can create a threshold alert metric monitor.

   {% dl %}
   
   {% dt %}
Threshold Alert
   {% /dt %}

   {% dd %}
An alert is triggered whenever a metric crosses a threshold.
   {% /dd %}

   {% dt %}
Change Alert
   {% /dt %}

   {% dd %}
An alert is triggered when the delta between values is higher than the threshold.
   {% /dd %}

   {% dt %}
Anomaly Detection
   {% /dt %}

   {% dd %}
An alert is triggered whenever a metric deviates from an expected pattern.
   {% /dd %}

   {% dt %}
Outliers Alert
   {% /dt %}

   {% dd %}
An alert is triggered whenever one member in a group behaves differently from its peers.
   {% /dd %}

   {% dt %}
Forecast Alert
   {% /dt %}

   {% dd %}
An alert is triggered whenever a metric is forecast to cross a threshold in the future.
   {% /dd %}

      {% /dl %}

1. In the **Define the metric** section, enter a Synthetic Monitoring metric such as `synthetics.test_runs`, where you can filter on status, response codes, and retry behavior.

1. Set the alerting conditions and add a notification message.

1. Set editing permissions and click **Create**.

## Further Reading{% #further-reading %}

- [Learn about metrics monitors](https://docs.datadoghq.com/monitors/types/metric/)
- [Learn how to manage monitors](https://docs.datadoghq.com/monitors/manage/)
- [Learn about Synthetic Monitoring metrics](https://docs.datadoghq.com/synthetics/metrics/)
