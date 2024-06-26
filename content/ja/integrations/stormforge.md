---
app_id: stormforge
app_uuid: 6f1ddcc9-e704-4f94-941b-8a914fcd89a0
assets:
  dashboards:
    StormForge Optimize Live Application Overview: assets/dashboards/stormforge_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: stormforge.recommendation_cpu_requests_cores
      metadata_path: metadata.csv
      prefix: stormforge.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: StormForge
author:
  homepage: https://stormforge.io
  name: StormForge
  sales_email: sales@stormforge.io
  support_email: support@stormforge.io
categories:
- クラウド
- 構成 & デプロイ
- コンテナ
- コスト管理
- kubernetes
- orchestration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stormforge/README.md
display_on_public_website: true
draft: false
git_integration_title: stormforge
integration_id: stormforge
integration_title: StormForge
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: stormforge
public_title: StormForge
short_description: 機械学習を用いた Kubernetes リソースのリアルタイム最適化
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Cost Management
  - Category::Kubernetes
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: 機械学習を用いた Kubernetes リソースのリアルタイム最適化
  media:
  - caption: 最適化の対象となるリソースの集合体として、アプリケーションを作成します。
    image_url: images/sf_ui_01_application.jpg
    media_type: image
  - caption: Optimize Live の構成
    image_url: images/sf_ui_02_configure.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: StormForge
---



## 概要

[StormForge Optimize Live][1] は、観測可能性メトリクスに機械学習を適用し、Kubernetes で実行されるあらゆるデプロイのリソースリクエストに対してリアルタイムに提案を行うことができます。

**StormForge Optimize Live を使用すると、以下のことが可能になります。**
- リソース効率の向上
- 既存の観測可能性データの活用
- パフォーマンス問題のリスク低減
- 迅速な Time to Value の実現
- 自動または承認による提案のデプロイ

## セットアップ

このインテグレーションをセットアップするには、StormForge アカウント、Datadog API 、アプリケーションキーが必要です。

### コンフィギュレーション

1. [Datadog API キー][2]を作成します。
2. [Datadog アプリケーションキー][3]を作成します。
3. Datadog API およびアプリケーションキーを [StormForge Datadog インテグレーション][4]に追加します。
4. Optimize Live のデプロイ
5. [StormForge][5] 内でアプリケーションをセットアップします。

より詳細な手順は、StormForge [スタートアップガイド][6]に記載されています。

## 収集データ

### メトリクス
{{< get-metrics-from-git "stormforge" >}}


### イベント

StormForge インテグレーションは、以下に対してイベントを作成します。
- アプリケーションの更新
- 適用された提案

### サービスのチェック

StormForge インテグレーションには、サービスのチェック機能は含まれません。

## サポート

ご質問やその他のサポートについては、[メール][8]で StormForge にご連絡ください。

[1]: https://www.stormforge.io/how-stormforge-optimize-live-works/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#application-keys
[4]: https://docs.stormforge.io/optimize-live/getting-started/install/#datadog-metric-provider
[5]: https://app.stormforge.io
[6]: https://docs.stormforge.io/optimize-live/
[7]: https://github.com/DataDog/integrations-extras/blob/master/stormforge/metadata.csv
[8]: mailto:support@stormforge.io