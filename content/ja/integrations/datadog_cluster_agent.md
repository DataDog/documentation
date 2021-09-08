---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/README.md'
display_name: Datadog Cluster Agent
draft: false
git_integration_title: datadog_cluster_agent
guid: 275fd66d-2440-44e5-ac30-461062cd2825
integration_id: datadog-cluster-agent
integration_title: Datadog Cluster Agent
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: datadog_cluster_agent.
metric_to_check: datadog.cluster_agent.admission_webhooks.certificate_expiry
name: datadog_cluster_agent
public_title: Datadog Cluster Agent インテグレーション
short_description: Datadog Cluster Agent のメトリクスを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Datadog Cluster Agent][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Datadog-Cluster-Agent チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. datadog_cluster_agent のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `datadog_cluster_agent.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル datadog_cluster_agent.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `datadog_cluster_agent` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "datadog_cluster_agent" >}}


### イベント

Datadog_Cluster_Agent インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "datadog_cluster_agent" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/cluster_agent/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/