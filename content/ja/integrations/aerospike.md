---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md'
display_name: Aerospike
git_integration_title: aerospike
guid: 582de9e7-0c99-4037-9cc5-bc34612ce039
integration_id: aerospike
integration_title: Aerospike
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aerospike.
metric_to_check: aerospike.uptime
name: aerospike
public_title: Datadog-Aerospike インテグレーション
short_description: Aerospike データベースからクラスターやネームスペースの統計を収集
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

Aerospike データベースからメトリクスをリアルタイムに取得すると、以下のことができます。

* Aerospike の状態を視覚化および監視できます。
* Aerospike のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照してこの手順を行ってください。

### インストール

Aerospike チェックは [Datadog Agent][1] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. aerospike のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `aerospike.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル aerospike.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションの `aerospike` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aerospike" >}}


### サービスのチェック

- `aerospike.can_connect`
- `aerospike.cluster_up`

### イベント

Aerospike には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/aerospike/metadata.csv
[5]: https://docs.datadoghq.com/ja/help
[6]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}