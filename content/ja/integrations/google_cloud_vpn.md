---
"categories":
- "cloud"
- "network"
- "google cloud"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "VPN トンネルのステータス、スループット、セッション数などを監視。"
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_vpn/"
"draft": false
"git_integration_title": "google_cloud_vpn"
"has_logo": true
"integration_id": "google-cloud-vpn"
"integration_title": "Google VPN"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "google_cloud_vpn"
"public_title": "Datadog-Google VPN Integration"
"short_description": "Monitor VPN tunnel status, throughput, session counts, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Google Cloud VPN securely connects your existing network to your Google Cloud Platform network.

Get metrics from Google VPN to:

- Visualize the performance of your VPNs.
- Correlate the performance of your VPNs with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Google Cloud Platform integration first][1]. There are no other installation steps that need to be performed.

### Log collection

Google Cloud VPN logs are collected with Google Cloud Logging and sent to a Dataflow job through a Cloud Pub/Sub topic. If you haven't already, [set up logging with the Datadog Dataflow template][2].

Once this is done, export your Google Cloud VPN logs from Google Cloud Logging to the Pub/Sub topic:

1. Go to the [Google Cloud Logging page][3] and filter the Google Cloud VPN logs.
2. Click **Create Export** and name the sink.
3. Choose "Cloud Pub/Sub" as the destination and select the Pub/Sub topic that was created for that purpose. **Note**: The Pub/Sub topic can be located in a different project.
4. Click **Create** and wait for the confirmation message to show up.

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_vpn" >}}


### イベント

The Google Cloud VPN integration does not include any events.

### サービスチェック

The Google Cloud VPN integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_vpn/google_cloud_vpn_metadata.csv
[5]: https://docs.datadoghq.com/help/

