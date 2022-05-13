---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- 構成 & デプロイ
- コンテナ
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/helm/README.md
display_name: Helm
draft: false
git_integration_title: helm
guid: 7f57a1f2-6dc6-4029-ae9c-426238ea2f86
integration_id: helm
integration_title: Helm チェック
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: helm.
metric_to_check: helm.release
name: helm
public_title: Helm チェック
short_description: Datadog で Helm のデプロイメントを追跡
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて Helm のデプロイメントを監視します。

Helm は複数のストレージバックエンドをサポートしています。v3 では、Helm のデフォルトは Kubernetes シークレットで、v2 では、Helm のデフォルトは ConfigMaps です。このチェックでは、両方のオプションに対応しています。

## セットアップ

### インストール

Helm チェックは [Datadog Agent][1] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

これはクラスターチェックです。詳細については、[クラスターチェックのドキュメント][2]を参照してください。

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `helm` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "helm" >}}


### イベント

Helm インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "helm" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/helm/metadata.csv
[5]: https://github.com/DataDog/integrations-core/blob/master/helm/assets/service_checks.json
[6]: https://docs.datadoghq.com/ja/help/