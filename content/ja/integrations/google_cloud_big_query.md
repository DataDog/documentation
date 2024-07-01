---
"categories":
- "cloud"
- "google cloud"
- "data store"
- "log collection"
"dependencies": []
"description": "Track query count, execution times, uploaded bytes and rows, and more."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_big_query/"
"draft": false
"git_integration_title": "google_cloud_big_query"
"has_logo": true
"integration_id": "google-cloud-bigquery"
"integration_title": "Google BigQuery"
"integration_version": ""
"is_public": true
"kind": "integration"
"manifest_version": "1.0"
"name": "google_cloud_big_query"
"public_title": "Datadog-Google BigQuery Integration"
"short_description": "Track query count, execution times, uploaded bytes and rows, and more."
"version": "1.0"
---

## Overview

BigQuery is Google's fully managed, petabyte scale, low cost enterprise data warehouse for analytics.

Get metrics from Google BigQuery to:

- Visualize the performance of your BigQuery queries.
- Correlate the performance of your BigQuery queries with your applications.

## Setup

### Installation

If you haven't already, set up the [Google Cloud Platform integration first][1]. There are no other installation steps that need to be performed.

### Log collection

Google BigQuery logs are collected with Google Cloud Logging and sent to a Cloud pub/sub with an HTTP push forwarder. If you haven't already, set up a [Cloud pub/sub with an HTTP push forwarder][2].

Once this is done, export your Google BigQuery logs from Google Cloud Logging to the pub/sub:

1. Go to the [Google Cloud Logging page][3] and filter the Google BigQuery logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the pub/sub that was created for that purpose. **Note**: The pub/sub can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_big_query" >}}


### Events

The Google BigQuery integration does not include any events.

### Service Checks

The Google BigQuery integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[5]: https://docs.datadoghq.com/help/

