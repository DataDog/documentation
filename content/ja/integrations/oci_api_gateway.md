---
app_id: oci-api-gateway
app_uuid: 4e1f1f29-8d9b-4197-a1e7-ca7b868c35c1
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.apigateway.backend_http_responses
      - oci.apigateway.bytes_received
      - oci.apigateway.bytes_sent
      - oci.apigateway.http_requests
      - oci.apigateway.http_responses
      - oci.apigateway.integration_latency
      - oci.apigateway.internal_latency
      - oci.apigateway.latency
      - oci.apigateway.response_cache_action
      - oci.apigateway.response_cache_availability
      - oci.apigateway.response_cache_latency
      - oci.apigateway.subscriber_quota_proportion_used
      - oci.apigateway.subscriber_rate_limit_proportion_used
      - oci.apigateway.subscriber_requests
      - oci.apigateway.usage_plan_requests
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42869397
    source_type_name: OCI API Gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- ネットワーク
- クラウド
- oracle
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_api_gateway
integration_id: oci-api-gateway
integration_title: OCI API Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_api_gateway
public_title: OCI API Gateway
short_description: OCI API Gateway は、プライベート エンドポイントを備えた API を公開できます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Category::Cloud
  - Category::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI API Gateway は、プライベートエンドポイントを持つ API を公開できます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI API Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

OCI API Gateway は、プライベートまたはパブリック エンドポイントを備えた API を作成およびデプロイできるフル マネージド サービスで、バックエンド サービスへの安全でスケーラブルなアクセスを可能にします。リクエストとレスポンスの変換、認証と認可、レート制限、CORS サポートなどの機能を備えており、堅牢な API 管理とガバナンスを実現します。

このインテグレーションでは、 [oci_apigateway][1] ネームスペースからメトリクスとタグを収集し、 API Gateway の健全性、容量、パフォーマンスを監視できます。

## セットアップ

### インストール

Once you set up the [Oracle Cloud Infrastructure][2] integration, ensure that any namespaces mentioned above are included in your [Connector Hub][3].


## 収集データ

### メトリクス
{{< get-metrics-from-git "oci_api_gateway" >}}


### サービスチェック

OCI API Gateway にはサービス チェックは含まれません。

### イベント

OCI API Gateway にはイベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://docs.oracle.com/en-us/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm
[2]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_api_gateway/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/