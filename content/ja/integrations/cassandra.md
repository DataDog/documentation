---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
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
kind: integration
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

Cassandra サービスからメトリクスをリアルタイムに取得すると、以下のことができます。

* Cassandra の状態を視覚化および監視できます。
* Cassandra のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Cassandra チェックは [Datadog Agent][3] パッケージに含まれています。Cassandra ノードに追加でインストールする必要はありません。

このインテグレーションでは、Oracle の JDK の使用をお勧めします。

このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][4]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][5]までお問い合わせください。

### コンフィグレーション

Cassandra の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][6]のルートにある `conf.d/` フォルダーの `cassandra.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル cassandra.d/conf.yaml][7] を参照してください。

#### メトリクスの収集

`cassandra.d/conf.yaml` ファイルは、デフォルトの構成で、[Cassandra メトリクス](#metrics)の収集が有効になっています。
使用可能なすべての構成オプションの詳細については、[サンプル cassandra.d/conf.yaml][7] を参照してください。

#### ログの収集

**Agent 6.0 以上で使用可能**

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
          sourcecategory: database
          service: myapplication
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。
    使用可能なすべての構成オプションの詳細については、[サンプル cassandra.d/conf.yaml][7] を参照してください。

    スタックトレースが単一のログとして適切に集計されるようにするために、[複数行の処理ルール][8]を追加できます。

3. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `cassandra` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "cassandra" >}}


### イベント
Cassandra チェックには、イベントは含まれません。

### サービスのチェック
**cassandra.can_connect**:<br>
Agent が監視対象の Cassandra インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

* [Cassandra パフォーマンスメトリクスの監視方法][12]
* [Cassandra メトリクスの収集方法][13]
* [Datadog を使用した Cassandra の監視][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/integrations/java
[5]: https://docs.datadoghq.com/ja/help
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/logs/log_collection/?tab=tailexistingfiles#multi-line-aggregation
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/cassandra/metadata.csv
[12]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[13]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[14]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog


{{< get-dependencies >}}


## Agent チェック: Cassandra Nodetool

![Cassandra のデフォルトのダッシュボード][111]

## 概要

このチェックは、[jmx インテグレーション][112]では収集できない Cassandra クラスターのメトリクスを収集します。
このメトリクスの収集には `nodetool` ユーティリティを使用します。

## セットアップ
### インストール

Cassandra Nodetool チェックは [Datadog Agent][114] パッケージに含まれています。Cassandra ノードに追加でインストールする必要はありません。

### コンフィグレーション

[Agent の構成ディレクトリ][115]のルートにある `conf.d/` フォルダーの `cassandra_nodetool.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル cassandra_nodetool.d/conf.yaml][116] を参照してください。

```yaml
init_config:
  # コマンドまたは nodetool のパス (例: /usr/bin/nodetool または docker exec container nodetool) は
  # インスタンスで上書きできます
  # nodetool: /usr/bin/nodetool

instances:

  # 監視するキースペースのリスト
  - keyspaces: []

  # nodetool が接続するホスト
  # host: localhost

  # 接続のために JMX がリスニングするポート
  # port: 7199

  # ホストに接続するための資格情報のセット。これは、JMX サーバーの資格情報です。
  # チェックが機能するには、nodetool が `status` コマンドを実行できるように、このユーザーが読み書きアクセス権を持つ必要があります。
  # username:
  # password:

  # nodetool が JMX サーバーに SSL で接続するように、--ssl パラメーターを使用するかどうか。
  # オプションのブール値。指定する場合は、true または false にする必要があります。
  # ssl: false

  # メトリクスと一緒に送信される追加のタグのリスト
  # tags: []
```

### 検証

[Agent の `status` サブコマンドを実行][117]し、Checks セクションで `cassandra_nodetool` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "cassandra_nodetool" >}}


### イベント
Cassandra_nodetool チェックには、イベントは含まれません。

### サービスのチェック

**cassandra.nodetool.node_up**:
Agent は、監視対象のクラスターのノードごとにこのサービスチェックを送信します。ノードがダウンしている場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][119]までお問合せください。

## その他の参考資料

* [Cassandra パフォーマンスメトリクスの監視方法][120]
* [Cassandra メトリクスの収集方法][121]
* [Datadog を使用した Cassandra の監視][122]

[111]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard.png
[112]: https://github.com/DataDog/integrations-core/tree/master/cassandra
[114]: https://app.datadoghq.com/account/settings#agent
[115]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[116]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example
[117]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[118]: https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/metadata.csv
[119]: https://docs.datadoghq.com/ja/help
[120]: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
[121]: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
[122]: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog


{{< get-dependencies >}}