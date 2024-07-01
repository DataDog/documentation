---
"categories":
- cloud
- configuration & deployment
- google cloud
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key Google Cloud Load Balancing metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_loadbalancing/"
"draft": false
"git_integration_title": "google_cloud_loadbalancing"
"has_logo": true
"integration_id": "google-cloud-loadbalancing"
"integration_title": "Google Cloud Load Balancing"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_loadbalancing"
"public_title": "Datadog-Google Cloud Load Balancing Integration"
"short_description": "Track key Google Cloud Load Balancing metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Load Balancing gives you the ability to distribute load-balanced compute resources in single or multiple regions, to meet your high availability requirements, to put your resources behind a single anycast IP and to scale your resources up or down with intelligent Autoscaling.

Use the Datadog Google Cloud Platform integration to collect metrics from Google Cloud Load Balancing.

## Setup

### Metric collection

#### Installation

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud HTTP Loadbalancer logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud HTTP Loadbalancer logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud HTTP Loadbalancer logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_cloud_loadbalancing" >}}


### Events

The Google Cloud Load Balancing integration does not include any events.

### Service Checks

The Google Cloud Load Balancing integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_loadbalancing/google_cloud_loadbalancing_metadata.csv
[5]: https://docs.datadoghq.com/help/

