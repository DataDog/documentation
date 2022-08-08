---
app_id: pivotal-pks
app_uuid: e8a08b96-bbca-4907-8cc8-b7c3abf2f443
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Pivotal PKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- オーケストレーション
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md
display_on_public_website: true
draft: false
git_integration_title: pivotal_pks
integration_id: pivotal-pks
integration_title: Pivotal Container Service
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: pivotal_pks
oauth: {}
public_title: Pivotal Container Service
short_description: Pivotal のエンタープライズレベル Kubernetes 製品
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Containers
  - Category::Orchestration
  - Category::Log Collection
  configuration: README.md#Setup
  description: Pivotal のエンタープライズレベル Kubernetes 製品
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pivotal Container Service
---



## 概要

このインテグレーションは、[Pivotal Container Service][1] クラスターを監視します。

## セットアップ

Datadog は既に Kubernetes と統合されているため、すぐに PKS を監視することができます。

### メトリクスの収集

PKS を監視するには、[Kubernetes][2] の Datadog インテグレーションをセットアップする必要があります。

### ログの収集

_Agent バージョン 6.0 以降で利用可能_

セットアップは Kubernetes の場合とまったく同じです。
すべてのコンテナからのログ収集を開始するには、Datadog Agent の[環境変数][3]を使用します。

DaemonSets を利用して、すべてのノードで [Datadog Agent を自動的にデプロイ][4]することもできます。

環境変数の詳細とさらに高度なセットアップオプションについては、[コンテナログの収集手順][5]を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://pivotal.io/platform/pivotal-container-service
[2]: https://docs.datadoghq.com/ja/integrations/kubernetes/
[3]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[4]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#container-installation
[5]: https://docs.datadoghq.com/ja/logs/log_collection/docker/#option-2-container-installation
[6]: https://docs.datadoghq.com/ja/help/