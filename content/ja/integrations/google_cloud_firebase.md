---
"categories":
- "cloud"
- "google cloud"
- "log collection"
- "mobile"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Firebase サービスに関するネットワークとデータストアの使用状況を追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_firebase/"
"draft": false
"git_integration_title": "google_cloud_firebase"
"has_logo": true
"integration_id": "google-cloud-firebase"
"integration_title": "Google Cloud Firebase"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_firebase"
"public_title": "Datadog-Google Cloud Firebase Integration"
"short_description": "Track network and data store usage attributable to your Firebase services."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Firebase is a mobile platform that helps you quickly develop high-quality apps, grow your user base, and earn more money.

Get metrics from Google Firebase to:

- Visualize the performance of your Firebase databases and hosting services.
- Correlate the performance of your Firebase tools with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Google Cloud Platform integration first][1]. There are no other installation steps that need to be performed.

### Log collection

Google Firebase logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Firebase logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Firebase logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_firebase" >}}


### イベント

The Google Firebase integration does not include any events.

### サービスチェック

The Google Firebase integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[5]: https://docs.datadoghq.com/help/

