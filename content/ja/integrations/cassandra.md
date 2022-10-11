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
- data store
- log collection
- autodiscovery
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md
display_on_public_website: true
draft: false
git_integration_title: cassandra
integration_id: cassandra
integration_title: Cassandra
integration_version: 1.16.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: cassandra
oauth: {}
public_title: Cassandra
short_description: クラスターのパフォーマンス、容量、全体的な健全性などを追跡
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::データストア
  - Category::ログの収集
  - Category::オートディスカバリー
  configuration: README.md#Setup
  description: クラスターのパフォーマンス、容量、全体的な健全性などを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cassandra
---



![Cassandra のデフォルトのダッシュボード][1]

## 概要

Cassandra からメトリクスをリアルタイムに取得すると、以下のことができます。

- Cassandra の状態を視覚化および監視できます。
- Cassandra のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Cassandra チェックは [Datadog Agent][2] パッケージに含まれています。Cassandra ノードに追加でインストールする必要はありません。このインテグレーションには、Oracle の JDK を使用することをお勧めします。

**注**: このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX のドキュメント][3]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][4]までお問い合わせください。

### コンフィギュレーション

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. `cassandra.d/conf.yaml` ファイルは、デフォルトのコンフィギュレーションで、[Cassandra メトリクス](#メトリクス)の収集が有効になっています。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cassandra.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cassandra.d/conf.yaml][1] を参照してください。

    スタックトレースが単一のログとして適切に集計されるようにするために、[複数行の処理ルール][3]を追加できます。

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

コンテナ環境については、[JMX によるオートディスカバリー][2]ガイドを参照してください。これには、オートディスカバリーによりクラスター上で [Agent イメージを更新する][3]ことが含まれます。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][4]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "cassandra", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containeragent#autodiscovery-annotations
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `cassandra` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cassandra" >}}


### イベント

Cassandra チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "cassandra" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Cassandra パフォーマンスメトリクスの監視方法][6]
- [Cassandra メトリクスの収集方法][7]
- [Datadog を使用した Cassandra の監視][8]




## Cassandra Nodetool インテグレーション

![Cassandra デフォルトのダッシュボード][9]

## 概要

このチェックは、[jmx インテグレーション][10]では収集できない Cassandra クラスターのメトリクスを収集します。このメトリクスの収集には `nodetool` ユーティリティを使用します。

## セットアップ

### インストール

Cassandra Nodetool チェックは [Datadog Agent][2] パッケージに含まれています。Cassandra ノードに追加でインストールする必要はありません。

### コンフィギュレーション

1. [Agent のコンフィギュレーションディレクトリ][11]のルートにある `conf.d/` フォルダーの `cassandra_nodetool.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル cassandra_nodetool.d/conf.yaml][12] を参照してください。

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

2. [Agent を再起動します][13]。

#### ログの収集

Cassandra Nodetool ログは Cassandra インテグレーションにより収集されます。[Cassandra のログ収集の手順][14]をご確認ください。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `cassandra_nodetool` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cassandra_nodetool" >}}


### イベント

Cassandra_nodetool チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "cassandra_nodetool" >}} 


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Cassandra パフォーマンスメトリクスの監視方法][6]
- [Cassandra メトリクスの収集方法][7]
- [Datadog を使用した Cassandra の監視][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/integrations/java/
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[7]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[8]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
[9]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[10]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[12]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://github.com/DataDog/integrations-core/tree/master/cassandra#log-collection