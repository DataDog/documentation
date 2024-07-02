---
"categories":
- "cloud"
- "data stores"
- "google cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "パフォーマンス、健全性、レプリケーションに関するデータベースメトリクスを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/google_cloudsql/"
"draft": false
"git_integration_title": "google_cloudsql"
"has_logo": true
"integration_id": "google-cloudsql"
"integration_title": "Google Cloud SQL"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloudsql"
"public_title": "Datadog-Google Cloud SQL Integration"
"short_description": "Track database metrics for performance, health, and replication."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud SQL is a fully-managed database service that makes it easy to set up, maintain, manage, and administer your SQL databases in the cloud.

Get metrics from Google Cloud SQL to:

- Visualize the performance of your Cloud SQL databases.
- Correlate the performance of your Cloud SQL databases with your applications.

## セットアップ

### インストール

#### Metric collection

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

#### 構成

To collect custom Cloud SQL labels as tags, enable the cloud asset inventory permission.

#### Log collection

{{< site-region region="us3" >}}

Log collection is not supported for this site.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Google Cloud SQL logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud SQL logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter Google Cloud SQL logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer

{{< /site-region >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloudsql" >}}


### イベント

The Google Cloud SQL integration does not include any events.

### サービスチェック

**gcp.cloudsql.database.state**
The current serving state of the Cloud SQL instance.

## トラブルシューティング

Need help? Contact [Datadog support][3].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[3]: https://docs.datadoghq.com/help/

