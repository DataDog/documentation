---
"categories":
- "cloud"
- "configuration & deployment"
- "google cloud"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "プロジェクトのメトリクスを収集してプロジェクトバージョン間で比較。"
"doc_link": "https://docs.datadoghq.com/integrations/google_app_engine/"
"draft": false
"git_integration_title": "google_app_engine"
"has_logo": true
"integration_id": "google-app-engine"
"integration_title": "Google App Engine"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_app_engine"
"public_title": "Datadog-Google App Engine Integration"
"short_description": "Collect metrics for your project and compare them across project versions."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Install the Google App Engine integration in your project to:

- See your Google App Engine services metrics: memcache, task queues, datastores.
- See metrics about requests: display percentiles, latency, cost.
- Tag Google App Engine metrics by version and compare the performance of different versions.

You can also send custom metrics to Datadog through the [API][1] or [DogStatsD][2].

## セットアップ

### インストール

If you haven't already, set up the [Google Cloud Platform integration][3] first. There are no other installation steps.

### Log collection

Google App Engine logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][4].

Once this is done, export your Google App Engine logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][5] and filter the Google App Engine logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_app_engine" >}}


### イベント

The Google App Engine integration does not include any events.

### サービスチェック

The Google App Engine integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://docs.datadoghq.com/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/developers/dogstatsd/
[3]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[4]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[7]: https://docs.datadoghq.com/help/

