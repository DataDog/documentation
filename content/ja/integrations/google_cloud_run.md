---
"categories":
- cloud
- containers
- google cloud
- log collection
- orchestration
"custom_kind": "integration"
"dependencies": []
"description": "Collect metrics, traces, and logs from across your clusters and analyze them in Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_run/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-google-cloud-run-with-datadog/"
  "tag": Blog
  "text": Monitor Google Cloud Run with Datadog
- "link": "https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/"
  "tag": Documentation
  "text": Google Cloud Run for Anthos
"git_integration_title": "google_cloud_run"
"has_logo": true
"integration_id": "google-cloud-run"
"integration_title": "Google Cloud Run"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_run"
"public_title": "Datadog-Google Cloud Run Integration"
"short_description": "Collect metrics, traces, and logs from across your clusters and analyze them in Datadog."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Cloud Run is a managed compute platform that enables you to run stateless containers that are invocable using HTTP requests.

Enable this integration and instrument your container to see all of your Cloud Run metrics, traces, and logs in Datadog.

For more information about Cloud Run for Anthos, see the [Google Cloud Run for Anthos documentation][1].

## Setup

### Metric collection

#### Installation

Set up the [Google Cloud Platform integration][2] to begin collecting out-of-the-box metrics. To set up custom metrics, see the [Serverless documentation][3]. 

### Log collection

#### Integration
Google Cloud Run also exposes [audit logs][4].
Google Cloud Run logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][5].

Once this is done, export your Google Cloud Run logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][6] and filter Google Cloud Run logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Click **Create** and wait for the confirmation message to show up.

#### Direct Logging
For more information about direct application logging to Datadog from your Cloud Run services, see the [Serverless documentation][3].

### Tracing

For more information about specialized Agent setup instructions for fully managed Google Cloud Run, see the [Serverless documentation][3].

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_run" >}}


### Events

The Google Cloud Functions integration does not include any events.

### Service Checks

The Google Cloud Functions integration does not include any service checks.


## Troubleshooting

Need help? Contact [Datadog support][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[3]: https://docs.datadoghq.com/serverless/google_cloud_run
[4]: https://cloud.google.com/run/docs/audit-logging
[5]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/logs/viewer
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run/google_cloud_run_metadata.csv
[8]: https://docs.datadoghq.com/help/

