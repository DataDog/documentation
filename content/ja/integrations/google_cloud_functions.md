---
"categories":
- "cloud"
- "google cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "関数実行時間の最小、最大、平均を追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_functions/"
"draft": false
"git_integration_title": "google_cloud_functions"
"has_logo": true
"integration_id": "google-cloud-functions"
"integration_title": "Google Cloud Functions"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_functions"
"public_title": "Datadog-Google Cloud Functions Integration"
"short_description": "Track min, max, and average function execution times."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions.

Get metrics from Google Functions to:

- Visualize the performance of your Functions.
- Correlate the performance of your Functions with your applications.

## セットアップ

### Metric collection

#### インストール

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud Function logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Function logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Function logs.
2. Click **Create Sink** and name the sink accordingly.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_functions" >}}


### イベント

The Google Cloud Functions integration does not include any events.

### Service Checks

The Google Cloud Functions integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/help/

