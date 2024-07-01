---
"categories":
- cloud
- google cloud
- data stores
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track query count, execution times, uploaded bytes and rows, and more."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_alloydb/"
"draft": false
"git_integration_title": "google_cloud_alloydb"
"has_logo": true
"integration_id": "google-cloud-alloydb"
"integration_title": "Google AlloyDB"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_alloydb"
"public_title": "Datadog-Google AlloyDB Integration"
"short_description": "Track query count, execution times, uploaded bytes and rows, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AlloyDB is a fully-managed, PostgreSQL-compatible database for demanding transactional workloads. 
It provides enterprise-grade performance and availability while maintaining 100% compatibility with open-source PostgreSQL.

Get metrics from Google AlloyDB to:

- Visualize the performance of your AlloyDB Clusters.
- Correlate the performance of your AlloyDB instances with your databases.

## Setup

### Installation

If you haven't already, set up the [Google Cloud Platform integration first][1]. There are no other installation steps that need to be performed.

### Log collection

Google AlloyDB logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google AlloyDB logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google AlloyDB logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_alloydb" >}}


### Events

The Google AlloyDB integration does not include any events.

### Service Checks

The Google AlloyDB integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_alloydb/google_cloud_alloydb_metadata.csv
[5]: https://docs.datadoghq.com/help/

