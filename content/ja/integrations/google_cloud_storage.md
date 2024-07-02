---
"categories":
- "cloud"
- "data stores"
- "google cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Google Cloud Storage の主要メトリクスを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_storage/"
"draft": false
"git_integration_title": "google_cloud_storage"
"has_logo": true
"integration_id": "google-cloud-storage"
"integration_title": "Google Storage"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_storage"
"public_title": "Datadog-Google Storage Integration"
"short_description": "Track key Google Cloud Storage metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Storage is unified object storage for developers and enterprises, from live data serving to data analytics/ML to data archiving.

Get metrics from Google Storage to:

- Visualize the performance of your Storage services.
- Correlate the performance of your Storage services with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

#### 構成

To collect custom Cloud Storage labels as tags, enable the cloud asset inventory permission.

### Log collection

Google Cloud Storage logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Storage logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Storage logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_storage" >}}


### イベント

The Google Cloud Storage integration does not include any events.

### サービスチェック

The Google Cloud Storage integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[5]: https://docs.datadoghq.com/help/

