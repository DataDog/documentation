---
"categories":
- cloud
- data stores
- google cloud
- log collection
- mobile
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Google Cloud Firestore metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_firestore/"
"draft": false
"git_integration_title": "google_cloud_firestore"
"has_logo": true
"integration_id": "google-cloud-firestore"
"integration_title": "Google Cloud Firestore"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_firestore"
"public_title": "Datadog-Google Cloud Firestore Integration"
"short_description": "Track key Google Cloud Firestore metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.

Use the Datadog Google Cloud Platform integration to collect metrics from Google Cloud Firestore.

## セットアップ

### インストール

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud Firestore logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud Firestore logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud Firestore logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_firestore" >}}


### イベント

The Google Cloud Firestore integration does not include any events.

### Service Checks

The Google Cloud Firestore integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firestore/google_cloud_firestore_metadata.csv
[5]: https://docs.datadoghq.com/help/

