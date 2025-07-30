---
title: GCP Metric Discrepancy

description: "Troubleshooting steps for the GCP metric discrepancy"
further_reading:
- link: "https://docs.datadoghq.com/integrations/google-cloud-platform/"
  tag: "Integration"
  text: "GCP Integration"
---

## Overview

Use this guide to troubleshoot metric discrepancies between Google Cloud and Datadog.

## Metric discrepancies

Datadog ingests the most granular raw values from Google Cloud Platform (GCP). All aggregation seen in Datadog happens on the Datadog side. Datadog's metrics intake imports the raw values from Google as gauges, and any further aggregation is performed within Datadog. The following steps reconcile the metric `gcp.redis.stats.cpu_utilization` between Google Cloud and Datadog.

1. Find the corresponding metric in GCP.

   For the GCP integration, Datadog converts GCP metrics into the format `gcp.GCP_SERVICE_NAME.METRIC_NAME`. For the [example metric](https://cloud.google.com/monitoring/api/metrics_gcp_p_z#gcp-redis:~:text=of%20%5Bprimary%2C%20replica%5D.-,stats/cpu_utilization,-GA%20%E2%80%83(project)), the GCP service name is **redis**, and the metric name is **stats/cpu_utilization**. The full metric name is `redis.googleapis.com/stats/cpu_utilization`.

2. Find the most granular dimensions.

   These include all the **Resource labels**: `project_id`,`region`, `instance_id`, `node_id`, and **Metric labels**: `role`, `space`, `relationship`. Refer to the GCP documentation for other metrics.
   
   {{< img src="integrations/guide/gcp-metric-discrepancy/labels_definition.png" alt="labels definition in GCP documentation" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/redis_instance.png" alt="redis_instance resource labels" >}}

3. Graph the metric in the Google Cloud Metrics Explorer.

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

   In most cases, after completing steps 1–4, you see the exact same values in both Google Cloud and Datadog. However, in our example, a discrepancy appears at 01:40:00 PM.

   - **Datadog**: 108.71ms 
   - **GCP**: 0.0018119s

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_value.png" alt="gcp value" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_value.png" alt="datadog value" >}}


5. Understand Google Cloud alignment functions.

   This discrepancy occurs because by default, GCP applies a rate alignment for this metric. For details, see the Google cloud [alignment function](https://cloud.google.com/monitoring/api/v3/aggregation#alignment-intro) documentation. Click on `configure aligner` to see that the alignment function is automatically set to **rate**(0.108711 / 60 ≃ 0.0018119).

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_aligner.png" alt="gcp aligner" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_rate.png" alt="gcp rate" >}}

6. Adjust the Alignment Function in GCP.

   You can change the alignment function to `delta`, `min`, `max`, `sum` or `mean` and it should show the same values if you are using the most granular dimensions, for example using `delta` alignment. You can see the value matches Datadog now.

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_delta.png" alt="gcp delta" >}}
   
## Further reading

{{< partial name="whats-next/whats-next.html" >}}