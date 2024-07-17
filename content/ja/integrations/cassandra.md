---
app_id: cassandra
app_uuid: a930364f-ac97-4483-92d6-5a982da7b1c0
assets:
  dashboards:
    cassandra-overview: assets/dashboards/cassandra_overview.json
    cassandra-overview-screenboard: assets/dashboards/cassandra_overview_screenboard.json
    cassandra-read: assets/dashboards/cassandra_read.json
    cassandra-sstables: assets/dashboards/cassandra_sstable.json
    cassandra-write: assets/dashboards/cassandra_write.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cassandra.load.count
      metadata_path: metadata.csv
      prefix: cassandra.
    process_signatures:
    - java org.apache.cassandra.service.CassandraDaemon
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33
    source_type_name: Cassandra
  logs:
    source: cassandra
  saved_views:
    cassandra_processes: assets/saved_views/cassandra_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md
display_on_public_website: true
draft: false
git_integration_title: cassandra
integration_id: cassandra
integration_title: Cassandra
integration_version: 1.18.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cassandra
public_title: Cassandra
short_description: クラスターのパフォーマンス、容量、全体的な健全性などを追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::キャッシュ
  - Category::Data Stores
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: クラスターのパフォーマンス、容量、全体的な健全性などを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cassandra
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Cassandra のデフォルトのダッシュボード][1]

## 概要

Cassandra からメトリクスをリアルタイムに取得すると、以下のことができます。

- Cassandra の状態を視覚化および監視できます。
- Cassandra のフェイルオーバーとイベントの通知を受けることができます。

## 計画と使用

### インフラストラクチャーリスト

Cassandra チェックは [Datadog Agent][2] パッケージに含まれています。Cassandra ノードに追加でインストールする必要はありません。このインテグレーションには、Oracle の JDK を使用することをお勧めします。

**注**: このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、[ステータスページ][3]に表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX のドキュメント][4]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][5]までお問い合わせください。

### ブラウザトラブルシューティング

##### メトリクスの収集

1. `cassandra.d/conf.yaml` ファイルは、デフォルトの構成で、[Cassandra メトリクス](#metrics)の収集が有効になっています。使用可能なすべての構成オプションの詳細については、[サンプル cassandra.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

コンテナ環境の場合は、[Kubernetes Log Collection][8] または [Docker Log Collection][9] のページの指示に従ってください。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Cassandra のログの収集を開始するには、次の構成ブロックを `cassandra.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /var/log/cassandra/*.log
         source: cassandra
         service: myapplication
         log_processing_rules:
            - type: multi_line
              name: log_start_with_date
              # pattern to match: DEBUG [ScheduledTasks:1] 2019-12-30
              pattern: '[A-Z]+ +\[[^\]]+\] +\d{4}-\d{2}-\d{2}'
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル cassandra.d/conf.yaml][6] を参照してください。

    スタックトレースが単一のログとして適切に集計されるようにするために、[複数行の処理ルール][10]を追加できます。

3. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `cassandra` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "cassandra" >}}


### ヘルプ

Cassandra チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "cassandra" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

- [Cassandra パフォーマンスメトリクスの監視方法][11]
- [Cassandra メトリクスの収集方法][12]
- [Datadog を使用した Cassandra の監視][13]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Cassandra Nodetool インテグレーション

![Cassandra デフォルトダッシュボード][14]

## 概要

このチェックは [jmx インテグレーション][15] では取得できない Cassandra クラスターのメトリクスを収集します。これには `nodetool` ユーティリティを用います。

## セットアップ

### インストール

Cassandra Nodetool チェックは [Datadog Agent][2] パッケージに含まれているので、Cassandra ノードに別途インストールする必要はありません。

### 構成

ホスト上で実行されている Agent に対してこのチェックを構成するには、以下の手順に従ってください。コンテナ環境については、[コンテナ化](#containerized)セクションを参照してください。

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### メトリクスベース SLO

1. [Agent のコンフィギュレーションディレクトリ][16]のルートにある `conf.d/` フォルダーの `cassandra_nodetool.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル cassandra_nodetool.d/conf.yaml][17] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param keyspaces - list of string - required
     ## The list of keyspaces to monitor.
     ## An empty list results in no metrics being sent.
     #
     - keyspaces:
         - "<KEYSPACE_1>"
         - "<KEYSPACE_2>"
   ```

2. [Agent を再起動します][7]。

#### 収集データ

Cassandra Nodetool ログは Cassandra インテグレーションにより収集されます。[Cassandra のログ収集の手順][18]をご確認ください。

<!-- xxz tab xxx -->
<!-- xxx tab "コンテナ化" xxx -->

#### コンテナ化

コンテナ環境では、ポッドに公式の [Prometheus エクスポーター][19]を使用し、Agent のオートディスカバリーでポッドを見つけ、エンドポイントをクエリします。

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `cassandra_nodetool` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "cassandra_nodetool" >}}


### ヘルプ

Cassandra_nodetool チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "cassandra_nodetool" >}} 


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

- [Cassandra パフォーマンスメトリクスの監視方法][11]
- [Cassandra メトリクスの収集方法][12]
- [Datadog を使用した Cassandra の監視][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/integrations/java/
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/containers/kubernetes/log/
[9]: https://docs.datadoghq.com/ja/containers/docker/log/
[10]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[11]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[12]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[13]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
[14]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[15]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[16]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[17]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[18]: https://github.com/DataDog/integrations-core/tree/master/cassandra#log-collection
[19]: https://github.com/prometheus/jmx_exporter