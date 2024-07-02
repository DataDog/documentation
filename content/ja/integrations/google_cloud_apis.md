---
"app_id": "google-cloud-apis"
"app_uuid": "b2dc9b16-68b8-47c0-a9e0-351d9c356baa"
"assets":
  "dashboards":
    "google-cloud-apis": assets/dashboards/google_cloud_apis_overview.json
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - gcp.serviceruntime.api.request_count
      "metadata_path": metadata.csv
      "prefix": gcp.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "262"
    "source_type_name": Google Cloud APIs
  "monitors":
    "[GCP] Number of instances per VPC network is approaching quota limit for {{network_id.name}} in {{project_id.name}}": assets/monitors/compute_instance_vpc_quota.json
    "[GCP] Service Quota utilization is high for {{quota_metric.name}} in {{project_id.name}}": assets/monitors/serviceruntime_rate_quota.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com (日本語対応)
  "support_email": help@datadoghq.com
"categories":
- google cloud
- モニター
- クラウド
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "google_cloud_apis"
"integration_id": "google-cloud-apis"
"integration_title": "Google Cloud APIs"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_cloud_apis"
"public_title": "Google Cloud APIs"
"short_description": "Google Cloud APIs を使用すると、Google Cloud Platform 製品にコードからアクセスできます。"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Google Cloud"
  - "Category::Metrics"
  - "Category::Cloud"
  - "Queried Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Google Cloud APIs を使用すると、Google Cloud Platform 製品にコードからアクセスできます。
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Google Cloud APIs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Google Cloud APIs を使用すると、Google Cloud Platform 製品にコードからアクセスできます。

Datadog Google Cloud Platform インテグレーションを使用して、Google Cloud APIs からメトリクスを収集できます。

## セットアップ

### インストール

[Google Cloud Platform インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_apis" >}}


### イベント

Google Cloud APIs インテグレーションには、イベントは含まれません。

### サービスチェック

Google Cloud APIs インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_apis/google_cloud_apis_metadata.csv
[3]: https://docs.datadoghq.com/help/

