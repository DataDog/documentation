---
"categories":
- "cloud"
- "data stores"
- "google cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Spanner インスタンスのリソースの使用状況を追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_spanner/"
"draft": false
"git_integration_title": "google_cloud_spanner"
"has_logo": true
"integration_id": "google-cloud-spanner"
"integration_title": "Google Spanner"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_spanner"
"public_title": "Datadog-Google Spanner Integration"
"short_description": "Track the resource usage of your Spanner instances."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Spanner is the first and only relational database service that is both strongly consistent and horizontally scalable.

Get metrics from Google Spanner to:

- Visualize the performance of your Spanner databases.
- Correlate the performance of your Spanner databases with your applications.

## セットアップ

### Metric collection

#### インストール

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud Spanner logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Spanner logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter Google Cloud Spanner logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_spanner" >}}


### イベント

The Google Cloud Spanner integration does not include any events.

### サービスチェック

The Google Cloud Spanner integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_spanner/google_cloud_spanner_metadata.csv
[5]: https://docs.datadoghq.com/help/

