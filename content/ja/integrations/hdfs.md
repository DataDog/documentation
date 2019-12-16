---
integration_title: Hdfs
is_public: true
kind: インテグレーション
short_description: クラスターのディスク使用状況、ボリューム障害、停止した DataNode などを追跡 more.
---
## HDFS DataNode インテグレーション

![HDFS ダッシュボード][1]

## 概要

HDFS DataNode ごとにディスク使用率や失敗したボリュームを追跡できます。この Agent チェックは、これらのメトリクスのほかに、ブロック関連やキャッシュ関連のメトリクスも収集します。

このチェック (hdfs_datanode) と、これと対応するチェック (hdfs_namenode) の 2 つを使用してください。以前の兼用型のチェック (hdfs) は非推奨になりました。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

HDFS DataNode チェックは [Datadog Agent][3] パッケージに含まれています。DataNode に追加でインストールする必要はありません。

### コンフィグレーション
#### DataNode の準備

Agent は、DataNode の JMX リモートインターフェイスからメトリクスを収集します。このインターフェイスはデフォルトでは無効になっています。`hadoop-env.sh` (通常は $HADOOP_HOME/conf にあります) で以下のオプションを設定して、これを有効にしてください。

```
export HADOOP_DATANODE_OPTS="-Dcom.sun.management.jmxremote
  -Dcom.sun.management.jmxremote.authenticate=false
  -Dcom.sun.management.jmxremote.ssl=false
  -Dcom.sun.management.jmxremote.port=50075 $HADOOP_DATANODE_OPTS"
```

DataNode プロセスを再起動すると、JMX インターフェイスが有効になります。

#### Agent の接続

[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `hdfs_datanode.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル hdfs_datanode.d/conf.yaml][5] を参照してください。

```
init_config:

instances:
  - hdfs_datanode_jmx_uri: http://localhost:50075
```

[Agent を再起動][6]すると、Datadog への DataNode メトリクスの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `hdfs_datanode` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "hdfs_datanode" >}}


### イベント
HDFS-datanode チェックには、イベントは含まれません。

### サービスのチェック

`hdfs.datanode.jmx.can_connect`:

何らかの理由 (誤ったポートの指定、タイムアウト、パースできない JSON 応答など) で Agent が DataNode の JMX インターフェイスに接続できない場合は、`Critical` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

* [Hadoop アーキテクチャの概要][10]
* [Hadoop メトリクスの監視方法][11]
* [Hadoop メトリクスの収集方法][12]
* [Datadog を使用した Hadoop の監視方法][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/datadog_checks/hdfs_datanode/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[11]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[12]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[13]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog


{{< get-dependencies >}}


## HDFS NameNode インテグレーション

![HDFS ダッシュボード][111]

## 概要

プライマリおよびスタンバイ HDFS NameNode を監視することで、クラスターが不安定な状態に陥っている場合、NameNode が 1 つしか残っていない場合、クラスターに容量を追加する必要がある場合などに気付くことができます。この Agent チェックは、残存容量、破損/欠落したブロック、停止した DataNode、ファイルシステムの負荷、レプリケーションが不十分なブロック、合計ボリューム障害数 (全 DataNode の合計) などに関するメトリクスを収集します。

このチェック (hdfs_namenode) と、これと対応するチェック (hdfs_datanode) の 2 つを使用してください。以前の兼用型のチェック (hdfs) は非推奨になりました。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][112]のガイドを参照してこの手順を行ってください。

### インストール

HDFS NameNode チェックは [Datadog Agent][113] パッケージに含まれています。NameNode に追加でインストールする必要はありません。

### コンフィグレーション
#### NameNode の準備

Agent は、NameNode の JMX リモートインターフェイスからメトリクスを収集します。このインターフェイスはデフォルトでは無効になっています。`hadoop-env.sh` (通常は $HADOOP_HOME/conf にあります) で以下のオプションを設定して、これを有効にしてください。

```
export HADOOP_NAMENODE_OPTS="-Dcom.sun.management.jmxremote
  -Dcom.sun.management.jmxremote.authenticate=false
  -Dcom.sun.management.jmxremote.ssl=false
  -Dcom.sun.management.jmxremote.port=50070 $HADOOP_NAMENODE_OPTS"
```

NameNode プロセスを再起動すると、JMX インターフェイスが有効になります。

#### Agent の接続

[Agent の構成ディレクトリ][114]のルートにある `conf.d/` フォルダーの `hdfs_namenode.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル hdfs_namenode.d/conf.yaml][115] を参照してください。

```
init_config:

instances:
  - hdfs_namenode_jmx_uri: http://localhost:50070
```

[Agent を再起動][116]すると、Datadog への NameNode メトリクスの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][117]し、Checks セクションで `hdfs_namenode` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "hdfs_namenode" >}}


### イベント
HDFS-namenode チェックには、イベントは含まれません。

### サービスのチェック

`hdfs.namenode.jmx.can_connect`:

何らかの理由 (誤ったポートの指定、タイムアウト、パースできない JSON 応答など) で Agent が NameNode の JMX インターフェイスに接続できない場合は、`Critical` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][119]までお問合せください。

## その他の参考資料

* [Hadoop アーキテクチャの概要][120]
* [Hadoop メトリクスの監視方法][121]
* [Hadoop メトリクスの収集方法][122]
* [Datadog を使用した Hadoop の監視方法][123]


[111]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png
[112]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[113]: https://app.datadoghq.com/account/settings#agent
[114]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[115]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/datadog_checks/hdfs_namenode/data/conf.yaml.example
[116]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[117]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[118]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/metadata.csv
[119]: https://docs.datadoghq.com/ja/help
[120]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[121]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[122]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[123]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog


{{< get-dependencies >}}