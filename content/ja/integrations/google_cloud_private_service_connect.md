---
"app_id": "google-cloud-private-service-connect"
"app_uuid": "e4c77d0b-1c96-4484-85a5-7066ca938f98"
"assets":
  "dashboards":
    "google-cloud-private-service-connect": assets/dashboards/google_cloud_private_service_connect_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - gcp.gce.private_service_connect.consumer.open_connections
      - gcp.gce.private_service_connect.producer.open_connections
      "metadata_path": metadata.csv
      "prefix": gcp.gce.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "9347815"
    "source_type_name": Google Cloud Private Service Connect
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- google cloud
- network
- モニター
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "google_cloud_private_service_connect"
"integration_id": "google-cloud-private-service-connect"
"integration_title": "Google Cloud Private Service Connect"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_cloud_private_service_connect"
"public_title": "Google Cloud Private Service Connect"
"short_description": "Monitor your Private Service Connections"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Google Cloud"
  - "Category::Network"
  - "Category::Metrics"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Monitor your Private Service Connections
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Google Cloud Private Service Connect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## Overview

[Google Cloud Private Service Connect][1] is a capability of Google Cloud Networking that allows consumers to access managed services privately from inside your VPC network, thereby offering both security in the transfer of the data, as well as saving network overhead (egress) costs. It also allows producers to host and expose their services to other Google Cloud customers, offering a private connection between their service and consumers.

Enable this integration to visualize the connections, data transferred, and dropped packets via Private Service Connect. With this integration, Datadog collects important metrics from your Private Service Connect connections, both for producers as well as consumers.

## セットアップ

### インストール

### 構成

To collect metrics, this integration will use the credentials you configured in the [main Google Cloud Platform integration][2].

Datadog also offers Private Service Connect functionality that allows you to transmit metrics, traces, and logs from your Google Cloud environment to Datadog via a Private Link without passing through the public internet, saving on network egress costs and providing more security for your data in-transit. To do so, please review our [guide for supported datacenters][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_private_service_connect" >}}


### サービスチェック

Google Cloud Private Service Connect does not include any service checks.

### イベント

Google Cloud Private Service Connect does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://app.datadoghq.com/integrations/google-cloud-private-service-connect
[2]: https://app.datadoghq.com/integrations/google-cloud-platform
[3]: https://docs.datadoghq.com/agent/guide/gcp-private-service-connect/?site=us5
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/google_cloud_private_service_connect/metadata.csv
[5]: https://docs.datadoghq.com/help/

