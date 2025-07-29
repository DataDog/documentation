---
title: GCP Metric Discrepancy

description: "Troubleshooting steps for the GCP metric discrepancy"
further_reading:
- link: "https://docs.datadoghq.com/integrations/google-cloud-platform/"
  tag: "Integration"
  text: "GCP Integration"
---

## Overview

Use this guide to troubleshoot GCP metric discrepancy issues.

## Metric Discrepancies

Datadog ingests the most granular raw values from Google Cloud Platform (GCP). All aggregation seen in Datadog happens on the Datadog side. We report the raw values from Google as gauges into Datadog's metrics intake, and any further aggregation is performed within Datadog. Take `gcp.redis.stats.cpu_utilization` as an example.

1. Find the corresponding metric in GCP.

   For GCP integration, Datadog converts GCP metrics into format gcp.`GCP_SERVICE_NAME`.`METRIC_NAME`. For the [example metric](https://cloud.google.com/monitoring/api/metrics_gcp_p_z#gcp-redis:~:text=of%20%5Bprimary%2C%20replica%5D.-,stats/cpu_utilization,-GA%20%E2%80%83(project)), the GCP service name is **redis** and the metric name is **stats/cpu_utilization**. The full metric name is `redis.googleapis.com/stats/cpu_utilization`.

2. Find the most granular dimensions.

   These include all the **Resource labels**: `project_id`,`region`, `instance_id`, `node_id`, and **Metric labels**: `role`, `space`, `relationship`. Refer to the GCP documentation for other metrics.
   
   {{< img src="integrations/guide/gcp-metric-discrepancy/labels_definition.png" alt="labels definition in GCP documentation" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/redis_instance.png" alt="redis_instance resource labels" >}}

3. Graph the metric in GCP Metrics explorer.

   You can search by `redis.googleapis.com/stats/cpu_utilization`.
   - Time: ideally in UTC for 1 hour.
   - Namespace: Cloud Memorystore Redis Instance
   - Metric name: CPU Seconds 
   - Filter: (most granular dimensions) project_id, region, instance_id, node_id, role, space, relationship.
   - Aggregation: Sum (should show the same values when using mean, min, max, sum or none if using most granular dimensions)
   - Min interval: 1m

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_metric_explorer.png" alt="gcp metric explorer" >}}

4. Graph the metric in Datadog Metrics explore. 

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_metric_explorer.png" alt="datadog metric explorer" >}}

   In most cases, after completing steps 1–4, you will see the exact same values in both GCP and Datadog. However, in our example, a discrepancy appears at 01:40:00 PM.

   - **Datadog**: 108.71ms 
   - **GCP**: 0.0018119s

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_value.png" alt="gcp value" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_value.png" alt="datadog value" >}}


5. Understand GCP Alignment Functions.

   This discrepancy occurs because by default GCP applies a rate alignement for this metric (see what is an alignement function in [GCP doc](https://cloud.google.com/monitoring/api/v3/aggregation#alignment-intro)). If you click on `configure aligner`, You’ll see that the alignment function is automatically set to rate (0.108711 / 60 ≃ 0.0018119)

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_aligner.png" alt="gcp aligner" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_rate.png" alt="gcp rate" >}}

6. Adjust the Alignment Function in GCP.

   You can change the alignment function to `delta`, `min`, `max`, `sum` or `mean` and it should show the same values if you are using the most granular dimensions, for example using `delta` alignment. You can see the value matches Datadog now.

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_delta.png" alt="gcp delta" >}}