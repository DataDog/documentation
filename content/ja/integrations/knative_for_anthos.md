---
"categories":
- cloud
- configuration & deployment
- containers
- google cloud
- kubernetes
- log collection
- orchestration
"custom_kind": "integration"
"dependencies": []
"description": "Collect metrics and logs from Knative for Anthos clusters and analyze them in Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/knative_for_anthos/"
"draft": false
"git_integration_title": "knative_for_anthos"
"has_logo": true
"integration_id": "knative-for-anthos"
"integration_title": "Knative for Anthos"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "knative_for_anthos"
"public_title": "Datadog- Knative for Anthos Integration"
"short_description": "Collect metrics and logs from your Knative for Anthos clusters and analyze them in Datadog."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Knative for Anthos is a flexible serverless development platform for hybrid and multicloud environments. Knative for Anthos is Google's managed and fully supported [Knative][1] offering.

Use the Datadog Google Cloud Platform integration to collect metrics from Knative for Anthos.

## Setup

### Metric collection

#### Installation

If you haven't already, set up the [Google Cloud Platform integration][2].

If you are already authenticating your Knative for Anthos services using Workload Identity, then no further steps are needed.

If you have not enabled Workload Identity, you must migrate to use Workload Identity to start collecting Knative metrics. This involves binding a Kubernetes service account to a Google service account and configuring each service that you want to collect metrics from to use Workload Identity.

For detailed setup instructions, see [Google Cloud Workload Identity][3].

### Log collection

Knative for Anthos exposes [service logs][4].
Knative logs can be collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][5].

Once this is done, export your Google Cloud Run logs from Google Cloud Logging to the Pub/Sub:

1. Go to [Knative for Anthos][6], click on your desired services and navigate to the **Logs** tab.
2. Click on **View in Logs Explorer** to go to the **Google Cloud Logging Page**.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub that was created for that purpose. **Note**: The Pub/Sub can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Click **Create** and wait for the confirmation message to show up.

## Data Collected

### Metrics
{{< get-metrics-from-git "knative_for_anthos" >}}


### Events

The Knative for Anthos integration does not include any events.

### Service Checks

The Knative for Anthos integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[3]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[4]: https://cloud.google.com/anthos/run/docs/logging
[5]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/anthos/run
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[8]: https://docs.datadoghq.com/help/

