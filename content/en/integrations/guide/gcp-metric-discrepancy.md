---
title: Google Cloud Metric Discrepancy

description: "Troubleshooting steps for the Google Cloud metric discrepancy"
further_reading:
- link: "https://docs.datadoghq.com/integrations/google-cloud-platform/"
  tag: "Integration"
  text: "Google Cloud Integration"
---

## Overview

Use this guide to troubleshoot metric discrepancies between Google Cloud and Datadog.

## Metric discrepancies

Datadog ingests the most granular raw values from Google Cloud. All aggregation seen in Datadog happens on the Datadog side. Datadog's metrics intake imports the raw values from Google as gauges, and any further aggregation is performed within Datadog. The following steps reconcile the metric `gcp.redis.stats.cpu_utilization` between Google Cloud and Datadog.

1. Find the corresponding metric in Google Cloud.

   For the Google Cloud integration, Datadog converts Google Cloud metrics into the format `gcp.Google_Cloud_SERVICE_NAME.METRIC_NAME`. For the [example metric][1], the Google Cloud service name is **redis**, and the metric name is **stats/cpu_utilization**. The full metric name is `redis.googleapis.com/stats/cpu_utilization`.

2. Find the most granular dimensions.

   These include all the **Resource labels**: `project_id`,`region`, `instance_id`, `node_id`, and **Metric labels**: `role`, `space`, `relationship`. Refer to the [Google Cloud documentation][2] for other metrics.
   
   {{< img src="integrations/guide/gcp-metric-discrepancy/labels_definition.png" alt="labels definition in GCP documentation" >}}

   Resource type is associated with each metric under a Google Cloud service. Below are the supported resource types for **redis** service. The example metric's resource type is `redis_instance`. `redis_instance` has **Resource labels**: `project_id`,`region`, `instance_id`, `node_id`.
   - [redis.googleapis.com/Cluster][3]
   - [redis_instance][4]
   - [redis.googleapis.com/ClusterNode][5]

   {{< img src="integrations/guide/gcp-metric-discrepancy/redis_instance.png" alt="redis_instance resource labels" >}}

3. Graph the metric in the Google Cloud Metrics Explorer.

   Search for `redis.googleapis.com/stats/cpu_utilization`.
   - Time: 1 hour (ideally in UTC)
   - Namespace: Cloud Memorystore Redis Instance
   - Metric name: CPU Seconds 
   - Filter: (most granular dimensions) project_id, region, instance_id, node_id, role, space, relationship.
   - Aggregation: Sum (should show the same values when using mean, min, max, sum, or none if using most granular dimensions)
   - Min interval: 1m

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_metric_explorer.png" alt="gcp metric explorer" >}}

4. Graph the metric in the Datadog Metrics Explorer. 

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_metric_explorer.png" alt="datadog metric explorer" >}}

   In most cases, after completing steps 1–4, you see the exact same values in both Google Cloud and Datadog. However, in our example, a discrepancy appears at 01:40:00 PM.

   - **Datadog**: 108.71ms 
   - **Google Cloud**: 0.0018119s

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_value.png" alt="gcp value" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_value.png" alt="datadog value" >}}


5. Understand Google Cloud alignment functions.

   This discrepancy occurs because by default, Google Cloud applies a rate alignment for this metric. For details, see the Google cloud [alignment function][6] documentation. Click on `configure aligner` to see that the alignment function is automatically set to **rate** (0.108711 / 60 ≃ 0.0018119).

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_aligner.png" alt="gcp aligner" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_rate.png" alt="gcp rate" >}}

6. Adjust the alignment function in Google Cloud.

   Change the alignment function to `delta`, `min`, `max`, `sum`, or `mean`. Assuming you are using the most granular dimensions, the value in Google Cloud should match the value in Datadog.

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_delta.png" alt="gcp delta" >}}
   
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/monitoring/api/metrics_gcp_p_z#gcp-redis:~:text=of%20%5Bprimary%2C%20replica%5D.-,stats/cpu_utilization,-GA%20%E2%80%83(project)
[2]: https://cloud.google.com/monitoring/api/metrics_gcp
[3]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/Cluster
[4]: https://cloud.google.com/monitoring/api/resources#tag_redis_instance
[5]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/ClusterNode
[6]: https://cloud.google.com/monitoring/api/v3/aggregation#alignment-intro