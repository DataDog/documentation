---
app_id: pivotal-pks
app_uuid: e8a08b96-bbca-4907-8cc8-b7c3abf2f443
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10034
    source_type_name: Pivotal PKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
- ログの収集
- ネットワーク
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md
display_on_public_website: true
draft: false
git_integration_title: pivotal_pks
integration_id: pivotal-pks
integration_title: Pivotal Container Service
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: pivotal_pks
public_title: Pivotal Container Service
short_description: Pivotal のエンタープライズレベル Kubernetes 製品
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Pivotal のエンタープライズレベル Kubernetes 製品
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pivotal Container Service
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このインテグレーションは、[Pivotal Container Service][1] クラスターを監視します。

## 計画と使用

Datadog はすでに Kubernetes とインテグレーションしているため、Pivotal Kubernetes Service (PKS) を監視するための準備が整っています。このインテグレーションと一緒に Datadog の[クラスターモニタリングタイル][2]を使用することで、クラスターの監視を行うことができます。

PKS 環境内の非ワーカーの各 VM に、Datadog Agent をインストールします。Pivotal Application Service (PAS) がインストールされていない環境では、タイルの `Resource Config` セクションを選択し、`datadog-firehose-nozzle` の `instances` を `0` に設定します。

### メトリクスの収集

PKS を監視するには、[Kubernetes][3] の Datadog インテグレーションをセットアップする必要があります。

### 収集データ

_Agent バージョン 6.0 以降で利用可能_

セットアップは Kubernetes の場合とまったく同じです。
すべてのコンテナからのログ収集を開始するには、Datadog Agent の[環境変数][4]を使用します。

DaemonSets を利用して、すべてのノードで [Datadog Agent を自動的にデプロイ][5]することもできます。

環境変数の詳細とさらに高度なセットアップオプションについては、[コンテナログの収集手順][6]を参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://pivotal.io/platform/pivotal-container-service
[2]: https://network.pivotal.io/products/datadog
[3]: https://docs.datadoghq.com/ja/integrations/kubernetes/
[4]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[5]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#container-installation
[6]: https://docs.datadoghq.com/ja/logs/log_collection/docker/#option-2-container-installation
[7]: https://docs.datadoghq.com/ja/help/