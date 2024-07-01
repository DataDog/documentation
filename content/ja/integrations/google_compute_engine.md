---
"categories":
- "cloud"
- "configuration & deployment"
- "google cloud"
- "log collection"
- "network"
- "os & system"
"custom_kind": "integration"
"dependencies": []
"description": "Track busy instances and compare account usage metrics to quota limits."
"doc_link": "https://docs.datadoghq.com/integrations/google_compute_engine/"
"draft": false
"git_integration_title": "google_compute_engine"
"has_logo": true
"integration_id": "google-compute-engine"
"integration_title": "Google Compute Engine"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_compute_engine"
"public_title": "Datadog-Google Compute Engine Integration"
"short_description": "Track busy instances and compare account usage metrics to quota limits."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Compute Engine delivers virtual machines running in Google's innovative data centers and worldwide fiber network.

Get metrics from Google Compute Engine to:

- Visualize the performance of your Compute Engines.
- Correlate the performance of your Compute Engines with your applications.

## Setup

### Metric collection

#### Installation

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

#### Configuration

To collect custom Compute Engine labels as tags, enable the cloud asset inventory permission.

### Log collection

Google Compute Engine logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Compute Engine logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter Google Compute Engine logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Click **Create** and wait for the confirmation message to show up.

### Configuration

#### Limit host collection

If you want to monitor a subset of your GCE instances with Datadog, assign an GCE label, such as `datadog:true`, to those GCE instances. Then specify that tag in the **Optionally limit metrics collection** textbox in your [Datadog GCP integration tile][4]. For more information on filtering virtual machines by tag, see the [Google Cloud Platform integration documentation][5].

#### GCE automuting

Datadog can proactively mute monitors related to the manual shutdown of Google Compute Engine (GCE) instances and instance termination triggered by GCE autoscaling based on host statuses from the GCE API. Automuted GCE instances are listed on the [Monitor Downtime][6] page by checking **Show automatically muted hosts**.

To silence monitors for expected GCE instance shutdowns, check the **GCE automuting** box in the [Google Cloud Platform integration tile][1].

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="GCE Automuting" >}}

## Data Collected

### Metrics
{{< get-metrics-from-git "google_compute_engine" >}}


### Events

The Google Cloud Compute Engine integration does not include any events.

### Service Checks

The Google Cloud Compute Engine integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further Reading

-   [Monitoring Google Compute Engine metrics][9]
-   [How to collect Google Compute Engine metrics][10]
-   [How to monitor Google Compute Engine with Datadog][11]

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://app.datadoghq.com/integrations/google_cloud_platform
[5]: https://docs.datadoghq.com/integrations/google_cloud_platform/#configuration
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_compute_engine/google_compute_engine_metadata.csv
[8]: https://docs.datadoghq.com/help/
[9]: https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance
[10]: https://www.datadoghq.com/blog/how-to-collect-gce-metrics
[11]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog

