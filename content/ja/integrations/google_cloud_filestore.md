---
"categories":
- cloud
- data stores
- google cloud
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Google Cloud Filestore metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_filestore/"
"draft": false
"git_integration_title": "google_cloud_filestore"
"has_logo": true
"integration_id": "google-cloud-filestore"
"integration_title": "Google Cloud Filestore"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_filestore"
"public_title": "Datadog-Google Cloud Filestore Integration"
"short_description": "Track key Google Cloud Filestore metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Filestore is a managed file storage service for applications that require a filesystem interface and a shared filesystem for data.

Use the Datadog Google Cloud Platform integration to collect metrics from Google Cloud Filestore.

## Setup

### Installation

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud Filestore logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Filestore logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Filestore logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_filestore" >}}


### Events

The Google Cloud Filestore integration does not include any events.

### Service Checks

The Google Cloud Filestore integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_file/google_cloud_filestore_metadata.csv
[5]: https://docs.datadoghq.com/help/

