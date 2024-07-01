---
"categories":
- cloud
- containers
- google cloud
- kubernetes
- log collection
- network
"custom_kind": "integration"
"dependencies": []
"description": "Monitor your GKE resource usage."
"doc_link": "https://docs.datadoghq.com/integrations/google_kubernetes_engine/"
"draft": false
"git_integration_title": "google_kubernetes_engine"
"has_logo": true
"integration_id": "google-kubernetes-engine"
"integration_title": "Google Kubernetes Engine, Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_kubernetes_engine"
"public_title": "Datadog-Google Kubernetes Engine, Cloud Integration"
"short_description": "Monitor your GKE resource usage."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Kubernetes Engine (GKE) is a powerful cluster manager and orchestration system for running your Docker containers.

Get metrics from Google Kubernetes Engine to:

- Visualize the performance of your GKE containers and GKE control plane.
- Correlate the performance of your GKE containers with your applications.

This integration comes with two separate preset dashboards:

- The standard GKE dashboard presents the GKE and GKE control plane metrics collected from the Google integration.
- The enhanced GKE dashboard presents metrics from Datadog's Agent-based Kubernetes integration alongside GKE control plane metrics collected from the Google integration.

The standard dashboard provides observability in GKE with a simple configuration. The enhanced dashboard requires additional configuration steps, but provides more real-time Kubernetes metrics, and is often a better place to start from when cloning and customizing a dashboard for monitoring workloads in production.

Unlike self-hosted Kubernetes clusters, the GKE control plane is managed by Google and not accessible by a Datadog Agent running in the cluster. Therefore, observability into the GKE control plane requires the Google integration even if you are primarily using the Datadog Agent to monitor your clusters.

## Setup

### Metric collection

#### Installation

1. If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps for the standard metrics and preset dashboard.

2. To populate the enhanced dashboard and enable APM tracing, logging, profiling, security, and other Datadog services, [install the Datadog Agent into your GKE cluster][2].

3. To populate the control plane metrics, you must [enable GKE control plane metrics][3]. Control plane metrics give you visibility into the operation of the Kubernetes control plane, which is managed by Google in GKE.

### Log collection

Google Kubernetes Engine logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][4].

Once this is done, export your Google Kubernetes Engine logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [GCP Logs Explorer page][5] and filter Kubernetes and GKE logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "google_kubernetes_engine" >}}


### Events

The Google Kubernetes Engine integration does not include any events.

### Service Checks

The Google Kubernetes Engine integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][7].


[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/gke/?tab=standard
[3]: https://cloud.google.com/stackdriver/docs/solutions/gke/managing-metrics#enable-control-plane-metrics
[4]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_kubernetes_engine/google_kubernetes_engine_metadata.csv
[7]: https://docs.datadoghq.com/help/

