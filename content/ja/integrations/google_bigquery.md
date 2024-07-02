---
"aliases":
- /integrations/google_cloud_big_query/
"categories":
- cloud
- google cloud
- data stores
- log collection
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track query count, execution times, uploaded bytes and rows, and more."
"doc_link": "https://docs.datadoghq.com/integrations/google_bigquery/"
"draft": false
"git_integration_title": "google_bigquery"
"has_logo": true
"integration_id": "google-cloud-bigquery"
"integration_title": "Google BigQuery"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_bigquery"
"public_title": "Google BigQuery Integration"
"short_description": "Track query count, execution times, uploaded bytes and rows, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

BigQuery is Google's fully managed, petabyte scale, low cost enterprise data warehouse for analytics.

Get metrics from Google BigQuery to:

- Visualize the performance of your BigQuery queries.
- Correlate the performance of your BigQuery queries with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Google Cloud Platform integration first][1]. There are no other installation steps that need to be performed.

### Log collection

Google BigQuery logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google BigQuery logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google BigQuery logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_bigquery" >}}


### イベント

The Google BigQuery integration does not include any events.

### サービスチェック

The Google BigQuery integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[5]: https://docs.datadoghq.com/help/

