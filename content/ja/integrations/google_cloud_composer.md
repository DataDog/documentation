---
"categories":
- cloud
- configuration & deployment
- google cloud
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Google Cloud Composer metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_composer/"
"draft": false
"git_integration_title": "google_cloud_composer"
"has_logo": true
"integration_id": "google-cloud-composer"
"integration_title": "Google Cloud Composer"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_composer"
"public_title": "Datadog-Google Cloud Composer Integration"
"short_description": "Track key Google Cloud Composer metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Composer is a fully managed workflow orchestration service that empowers you to author, schedule, and monitor pipelines that span across clouds and on-premises data centers.

Use the Datadog Google Cloud Platform integration to collect metrics from Google Cloud Composer.

## Setup

### Installation

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud Composer logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Composer logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Composer logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_composer" >}}


### Events

The Google Cloud Composer integration does not include any events.

### Service Checks

The Google Cloud Composer integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_composer/google_cloud_composer_metadata.csv
[5]: https://docs.datadoghq.com/help/

