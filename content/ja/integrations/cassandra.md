---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: cassandra
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cassandra/README.md'
display_name: Cassandra
git_integration_title: cassandra
guid: 03ba454d-425c-4f61-9e9c-54682c3ebce5
integration_id: cassandra
integration_title: Cassandra
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cassandra.
metric_to_check: cassandra.load.count
name: cassandra
process_signatures:
  - java org.apache.cassandra.service.CassandraDaemon
public_title: Datadog-Cassandra インテグレーション
short_description: クラスターのパフォーマンス、容量、全体的な健全性などを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Cassandra のデフォルトのダッシュボード][1]

## 概要

Cassandra からメトリクスをリアルタイムに取得すると、以下のことができます。

- Cassandra の状態を視覚化および監視できます。
- Cassandra のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Cassandra チェックは [Datadog Agent][2] パッケージに含まれています。Cassandra ノードに追加でインストールする必要はありません。このインテグレーションには、Oracle の JDK を使用することをお勧めします。

**注**: このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][3]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][4]までお問い合わせください。

### コンフィギュレーション

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

#### ホスト

##### メトリクスの収集

1. `cassandra.d/conf.yaml` ファイルは、デフォルトの構成で、[Cassandra メトリクス](#metrics)の収集が有効になっています。使用可能なすべての構成オプションの詳細については、[サンプル cassandra.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル cassandra.d/conf.yaml][5] を参照してください。

    スタックトレースが単一のログとして適切に集計されるようにするために、[複数行の処理ルール][7]を追加できます。

3. [Agent を再起動します][6]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][9]のガイドを参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][10]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "cassandra", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `cassandra` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cassandra" >}}


### イベント

Cassandra チェックには、イベントは含まれません。

### サービスのチェック

**cassandra.can_connect**:<br>
Agent が監視対象の Cassandra インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Cassandra パフォーマンスメトリクスの監視方法][12]
- [Cassandra メトリクスの収集方法][13]
- [Datadog を使用した Cassandra の監視][14]




## Agent チェック: Cassandra Nodetool

![Cassandra のデフォルトのダッシュボード][15]

## 概要

このチェックは、[jmx インテグレーション][16]では収集できない Cassandra クラスターのメトリクスを収集します。このメトリクスの収集には `nodetool` ユーティリティを使用します。

## セットアップ

### インストール

Cassandra Nodetool チェックは [Datadog Agent][2] パッケージに含まれています。Cassandra ノードに追加でインストールする必要はありません。

### コンフィギュレーション

1. [Agent のコンフィギュレーションディレクトリ][17]のルートにある `conf.d/` フォルダーの `cassandra_nodetool.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル cassandra_nodetool.d/conf.yaml][18] を参照してください。

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

2. [Agent を再起動します][6]。

### 検証

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `cassandra_nodetool` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cassandra_nodetool" >}}


### イベント

Cassandra_nodetool チェックには、イベントは含まれません。

### サービスのチェック

**cassandra.nodetool.node_up**:
Agent は、監視対象のクラスターのノードごとにこのサービスチェックを送信します。ノードがダウンしている場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Cassandra パフォーマンスメトリクスの監視方法][12]
- [Cassandra メトリクスの収集方法][13]
- [Datadog を使用した Cassandra の監視][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/integrations/java/
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[9]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[10]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[13]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[14]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
[15]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[16]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[17]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[18]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example