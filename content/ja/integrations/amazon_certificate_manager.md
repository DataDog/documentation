---
app_id: amazon-certificate-manager
app_uuid: 9eda4833-a2c0-4dcb-bf1c-7a868a0a59c3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.certificatemanager.days_to_expiry
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.certificatemanager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 330
    source_type_name: Amazon Certificate Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- クラウド
- 構成とデプロイ
- ログの収集
- プロビジョニング
custom_kind: インテグレーション
dependencies: []
description: 主要な AWS Certificate Manager メトリクスを追跡します。
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_certificate_manager/
draft: false
git_integration_title: amazon_certificate_manager
has_logo: true
integration_id: amazon-certificate-manager
integration_title: AWS Certificate Manager
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_certificate_manager
public_title: AWS Certificate Manager
short_description: AWS Certificate Manager lets you easily provision, manage, and
  deploy public and private SSL/TLS certificates.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS Certificate Manager lets you easily provision, manage, and deploy
    public and private SSL/TLS certificates.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Certificate Manager
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

AWS Certificate Manager を使用すると、SSL/TLS 証明書をプロビジョニング、管理、デプロイして AWS サービスや内部の接続済みリソースに利用できます。

このインテグレーションを有効にすると、Datadog ですべての Certificate Manager メトリクスを表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `CertificateManager` が有効になっていることを確認します。
2. [Datadog - AWS Certificate Manager インテグレーション][3]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon-certificate-manager" >}}


### イベント

AWS Certificate Manager インテグレーションは、EventBridge からの証明書期限とステータス変更イベントをサポートします。

### サービスチェック

AWS Certificate Manager インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-certificate-manager
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_certificate_manager/assets/metrics/metric-spec.yaml
[5]: https://docs.datadoghq.com/ja/help/