---
"categories":
- cloud
- google cloud
- log collection
- ai/ml
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key Google Cloud TPU metrics."
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_tpu/"
"draft": false
"git_integration_title": "google_cloud_tpu"
"has_logo": true
"integration_id": "google-cloud-tpu"
"integration_title": "Google Cloud TPU"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_tpu"
"public_title": "Datadog-Google Cloud TPU Integration"
"short_description": "Track key Google Cloud TPU metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud TPU products make the benefits of Tensor Processing Units (TPUs) available through scalable and easy-to-use cloud computing resource for all ML researchers, ML engineers, developers, and data scientists running cutting-edge ML models.

Use the Datadog Google Cloud Platform integration to collect metrics from Google Cloud TPU.

## セットアップ

### インストール

If you haven't already, set up the [Google Cloud Platform integration][1] first. There are no other installation steps.

### Log collection

Google Cloud TPU logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud TPU logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud TPU logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_tpu" >}}


### イベント

The Google Cloud TPU integration does not include any events.

### サービスチェック

The Google Cloud TPU integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tpu/google_cloud_tpu_metadata.csv
[5]: https://docs.datadoghq.com/help/

