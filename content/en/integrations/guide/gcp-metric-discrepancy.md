---
title: Google Cloud Metric Discrepancies

description: "Troubleshooting steps for missing or mismatched Google Cloud metrics in Datadog"
further_reading:
- link: "https://docs.datadoghq.com/integrations/google-cloud-platform/"
  tag: "Integration"
  text: "Google Cloud Integration"
---

## Overview

Use this guide when a Google Cloud metric is missing in Datadog or its values do not match the Google Cloud console.

## Confirm the metric exists in Google Cloud

Find the corresponding metric in the [Google Cloud metric catalog][2] and note its full name and metric kind (for example, `GAUGE`, `DELTA`, or `CUMULATIVE`).

Datadog converts Google Cloud metric names into the format `gcp.Google_Cloud_SERVICE_NAME.METRIC_NAME`. For example, the Google Cloud metric `redis.googleapis.com/stats/cpu_utilization` is ingested in Datadog as `gcp.redis.stats.cpu_utilization`.

## Metric is missing in Datadog

If a metric you expect to see does not appear in Datadog, work through the following checks.

1. Search for the metric on the [Datadog Metric Summary page][7]. If the metric kind is `CUMULATIVE`, also search for the `.delta` variant (for example, `gcp.gke.container.restart_count.delta`). See [Cumulative metrics][8] for background.

2. Confirm the metric is part of the standard Google Cloud Monitoring catalog. The Google Cloud integration does not automatically import [custom metrics][9] or [log-based metrics][10].

3. Confirm the integration has access to the resource:
   - The service account has the required IAM roles at the project, folder, or organization that contains the resource. See [Google Cloud integration setup][11] for the required roles.
   - The project containing the resource is configured for monitoring in the integration tile in Datadog.

4. Confirm metric collection is not filtered. In the [integration tile][12], check whether the service is disabled, or whether resource-type filters exclude the resource. See [Limit metric collection filters][13] for details.

5. Confirm the metric is being emitted in Google Cloud. Open Google Cloud's Metrics Explorer and graph the metric for the same resource and time window. If Google Cloud also shows no data, the resource is not emitting the metric.

If the metric is in scope and being emitted but still does not appear in Datadog, contact [Datadog support][14].

## Metric values do not match the Google Cloud console

Datadog ingests the most granular raw values from Google Cloud. All aggregation seen in Datadog happens on the Datadog side. Datadog's metrics intake imports the raw values from Google as gauges, and any further aggregation is performed within Datadog. The following steps reconcile the metric `gcp.redis.stats.cpu_utilization` between Google Cloud and Datadog.

1. Find the most granular dimensions.

   These include all the **Resource labels**: `project_id`,`region`, `instance_id`, `node_id`, and **Metric labels**: `role`, `space`, `relationship`. Refer to the [Google Cloud documentation][2] for other metrics.
   
   {{< img src="integrations/guide/gcp-metric-discrepancy/labels_definition.png" alt="labels definition in GCP documentation" >}}

   Resource type is associated with each metric under a Google Cloud service. Below are the supported resource types for **redis** service. The example metric's resource type is `redis_instance`. `redis_instance` has **Resource labels**: `project_id`,`region`, `instance_id`, `node_id`.
   - [redis.googleapis.com/Cluster][3]
   - [redis_instance][4]
   - [redis.googleapis.com/ClusterNode][5]

   {{< img src="integrations/guide/gcp-metric-discrepancy/redis_instance.png" alt="redis_instance resource labels" >}}

2. Graph the metric in the Google Cloud Metrics Explorer.

   Search for `redis.googleapis.com/stats/cpu_utilization`.
   - Time: 1 hour (ideally in UTC)
   - Namespace: Cloud Memorystore Redis Instance
   - Metric name: CPU Seconds 
   - Filter: (most granular dimensions) project_id, region, instance_id, node_id, role, space, relationship.
   - Aggregation: Sum (should show the same values when using mean, min, max, sum, or none if using most granular dimensions)
   - Min interval: 1m

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_metric_explorer.png" alt="gcp metric explorer" >}}

3. Graph the metric in the Datadog Metrics Explorer. 

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_metric_explorer.png" alt="datadog metric explorer" >}}

   In most cases, after completing these steps, you see the exact same values in both Google Cloud and Datadog. However, in our example, a discrepancy appears at 01:40:00 PM.

   - **Datadog**: 108.71ms 
   - **Google Cloud**: 0.0018119s

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_value.png" alt="gcp value" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_value.png" alt="datadog value" >}}


4. Understand Google Cloud alignment functions.

   This discrepancy occurs because by default, Google Cloud applies a rate alignment for this metric. For details, see the Google cloud [alignment function][6] documentation. Click on `configure aligner` to see that the alignment function is automatically set to **rate** (0.108711 / 60 ≃ 0.0018119).

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_aligner.png" alt="gcp aligner" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_rate.png" alt="gcp rate" >}}

5. Adjust the alignment function in Google Cloud.

   Change the alignment function to `delta`, `min`, `max`, `sum`, or `mean`. Assuming you are using the most granular dimensions, the value in Google Cloud should match the value in Datadog.

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_delta.png" alt="gcp delta" >}}
   
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://cloud.google.com/monitoring/api/metrics_gcp
[3]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/Cluster
[4]: https://cloud.google.com/monitoring/api/resources#tag_redis_instance
[5]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/ClusterNode
[6]: https://cloud.google.com/monitoring/api/v3/aggregation#alignment-intro
[7]: https://app.datadoghq.com/metric/summary
[8]: /integrations/google-cloud-platform/#cumulative-metrics
[9]: https://cloud.google.com/monitoring/custom-metrics
[10]: https://cloud.google.com/logging/docs/logs-based-metrics
[11]: /integrations/google-cloud-platform/#setup
[12]: https://app.datadoghq.com/integrations/google-cloud-platform
[13]: /getting_started/integrations/google_cloud/#limit-metric-collection-filters
[14]: /help/
