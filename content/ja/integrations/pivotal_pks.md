---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - オーケストレーション
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/pivotal_pks/README.md
display_name: Pivotal PKS
draft: false
git_integration_title: pivotal_pks
guid: b0090603-01c8-4ad9-8f9a-4f3700bf065b
integration_id: pivotal-pks
integration_title: Pivotal Container Service
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: pivotal_pks
public_title: Datadog-Pivotal Container Service インテグレーション
short_description: Pivotal のエンタープライズレベル Kubernetes 製品
support: コア
supported_os:
  - linux
  - mac_os
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