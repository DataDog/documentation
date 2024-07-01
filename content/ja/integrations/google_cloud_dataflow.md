---
"categories":
- cloud
- google cloud
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Google Cloud Dataflow metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_dataflow/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/"
  "tag": Blog
  "text": Monitor your Dataflow pipelines with Datadog
"git_integration_title": "google_cloud_dataflow"
"has_logo": true
"integration_id": "google-cloud-dataflow"
"integration_title": "Google Cloud Dataflow"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"monitors":
  "job-backlog-time": assets/monitors/backlog_monitor.json
"name": "google_cloud_dataflow"
"public_title": "Datadog-Google Cloud Dataflow Integration"
"short_description": "Track key Google Cloud Dataflow metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Dataflow is a fully-managed service for transforming and enriching data in stream (real time) and batch (historical) modes with equal reliability and expressiveness.

Use the Datadog Google Cloud integration to collect metrics from Google Cloud Dataflow.

## Setup

### Metric collection

#### Installation

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud Dataflow logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Dataflow logs from Google Cloud Logging to the Pub/sub:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Dataflow logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_dataflow" >}}


<div class="alert alert-warning">
When using Google Cloud Dataflow to monitor Apache Beam pipeline metrics, note that metrics generated from <a href="https://beam.apache.org/releases/javadoc/current/org/apache/beam/sdk/metrics/Metrics.html">Gauge static methods</a> are not collected. If you need to monitor these metrics, you can use <a href="https://micrometer.io/docs">Micrometer</a>.
</div>

### Events

The Google Cloud Dataflow integration does not include any events.

### Service Checks

The Google Cloud Dataflow integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/help/

