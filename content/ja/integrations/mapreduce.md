---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - autodiscovery
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md'
display_name: MapReduce
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
integration_id: mapreduce
integration_title: Map Reduce
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapreduce.
metric_to_check: mapreduce.job.elapsed_time.max
name: mapreduce
public_title: Datadog-Map Reduce インテグレーション
short_description: マップのステータスと期間を監視し、タスクを削減します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![MapReduce ダッシュボード][1]

## 概要

mapreduce サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- mapreduce の状態を視覚化および監視できます。
- mapreduce のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Mapreduce チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. サーバーとポートを指定し、監視するマスターを設定するには、[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `mapreduce.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル mapreduce.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `mapreduce`                                                                                   |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<MAPREDUCE_CLUSTER_NAME>"}` |

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `mapreduce` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mapreduce" >}}


### イベント

Mapreduce チェックには、イベントは含まれません。

### サービスのチェック

**mapreduce.resource_manager.can_connect**

Agent が Resource Manager に接続できない場合は、`CRITICAL` を返します。
それ以外の場合は、`OK` を返します。

**mapreduce.application_master.can_connect**

Agent が Application Master に接続できない場合は、`CRITICAL` を返します。
それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][10]
- [Hadoop メトリクスの監視方法][11]
- [Hadoop メトリクスの収集方法][12]
- [Datadog を使用した Hadoop の監視方法][13]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[11]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[12]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[13]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog