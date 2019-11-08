---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mapreduce/README.md'
display_name: MapReduce
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
integration_id: mapreduce
integration_title: Map Reduce
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapreduce.
metric_to_check: mapreduce.job.elapsed_time.max
name: mapreduce
public_title: Datadog-Map Reduce インテグレーション
short_description: マップのステータスと期間を監視しタスクを削減。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![MapReduce ダッシュボード][1]

## 概要

mapreduce サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* mapreduce の状態を視覚化および監視できます。
* mapreduce のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Mapreduce チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

サーバーとポートを指定し、監視するマスターを設定するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `mapreduce.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル mapreduce.d/conf.yaml][5] を参照してください。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `mapreduce` を探します。

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
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

* [Hadoop アーキテクチャの概要][9]
* [Hadoop メトリクスの監視方法][10]
* [Hadoop メトリクスの収集方法][11]
* [Datadog を使用した Hadoop の監視方法][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/mapreduce/metadata.csv
[8]: https://docs.datadoghq.com/ja/help
[9]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[10]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[11]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[12]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog


{{< get-dependencies >}}