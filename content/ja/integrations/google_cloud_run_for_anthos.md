---
"categories":
- cloud
- orchestration
- google cloud
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Collect metrics and logs from Cloud Run for Anthos clusters and analyze them in Datadog."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/"
"draft": false
"further_reading":
- "link": "https://docs.datadoghq.com/integrations/google_cloud_run/"
  "tag": Documentation
  "text": Google Cloud Run Integration
"git_integration_title": "google_cloud_run_for_anthos"
"has_logo": true
"integration_id": "google-cloud-run-for-anthos"
"integration_title": "Google Cloud Run for Anthos"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_run_for_anthos"
"public_title": "Datadog-Google Cloud Run for Anthos Integration"
"short_description": "Collect metrics and logs from your Cloud Run for Anthos clusters and analyze them in Datadog."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Run for Anthos is a flexible serverless development platform for hybrid and multicloud environments. Cloud Run for Anthos is Google's managed and fully supported [Knative][1] offering. If you are using fully managed Google Cloud, see the [Google Cloud Run documentation][2].

Use the Datadog Google Cloud Platform integration to collect metrics from Google Cloud Run for Anthos.

## セットアップ

### Metric collection

#### インストール

If you haven't already, set up the [Google Cloud Platform integration][3].

If you are already authenticating your Cloud Run for Anthos services using Workload Identity, then no further steps are needed.

If you have not enabled Workload Identity, you must migrate to use Workload Identity to start collecting Knative metrics. This involves binding a Kubernetes service account to a Google service account and configuring each service that you want to collect metrics from to use Workload Identity.

For detailed setup instructions, see [Google Cloud Workload Identity][4].

### Log collection

Google Cloud Run for Anthos exposes [service logs][5].
Google Cloud Run logs can be collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][6].

Once this is done, export your Google Cloud Run logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to [Cloud Run for Anthos][7], click on your desired services and navigate to the **Logs** tab.
2. Click on **View in Logs Explorer** to go to the **Google Cloud Logging Page**.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Click **Create** and wait for the confirmation message to show up.

### Tracing and Custom Metrics
Use the [Datadog Admission Controller][8] to configure APM tracers and DogStatsD clients automatically. Inject the `DD_AGENT_HOST` and `DD_ENTITY_ID` environment variables by using one of the following methods:

- Add the `admission.datadoghq.com/enabled: "true"` label to your pod.
- Configure the Cluster Agent admission controller by setting `mutateUnlabelled: true`.

To prevent pods from receiving environment variables, add the `admission.datadoghq.com/enabled: "false"` label. This works even if you set `mutateUnlabelled: true`. For more information, see the [Datadog Admission Controller][8] documentation. 

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_run_for_anthos" >}}


### イベント

The Google Cloud Run for Anthos integration does not include any events.

### サービスチェック

The Google Cloud Run for Anthos integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/integrations/google_cloud_run/
[3]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[5]: https://cloud.google.com/anthos/run/docs/logging
[6]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[7]: https://console.cloud.google.com/anthos/run
[8]: https://docs.datadoghq.com/containers/cluster_agent/admission_controller/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[10]: https://docs.datadoghq.com/help/

