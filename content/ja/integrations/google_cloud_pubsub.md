---
"categories":
- "cloud"
- "google cloud"
- "log collection"
- "message queues"
"custom_kind": "integration"
"dependencies": []
"description": "Track key Google Cloud PubSub metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_pubsub/"
"draft": false
"git_integration_title": "google_cloud_pubsub"
"has_logo": true
"integration_id": "google-cloud-pubsub"
"integration_title": "Google Pub/Sub"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_pubsub"
"public_title": "Datadog-Google Pub/Sub Integration"
"short_description": "Track key Google Cloud PubSub metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Pub/Sub brings the scalability, flexibility, and reliability of enterprise message-oriented middleware to the cloud.

Get metrics from Google Pub/Sub to:

- Visualize the performance of your Pub/Sub topics and subscriptions.
- Correlate the performance of your Pub/Sub topics and subscriptions with your applications.

## Setup

### Metric collection

#### Installation

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

#### Configuration

To collect custom Pub/Sub labels as tags, enable the cloud asset inventory permission.

### Log collection

Google Cloud Pub/Sub logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Pub/Sub logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Pub/Sub logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_pubsub" >}}


### Events

The Google Cloud Pub/Sub integration does not include any events.

### Service Checks

The Google Cloud Pub/Sub integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_pubsub/google_cloud_pubsub_metadata.csv
[5]: https://docs.datadoghq.com/help/

