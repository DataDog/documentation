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

#### ノードを準備する

1. Agent は、DataNode の JMX リモートインターフェイスからメトリクスを収集します。このインターフェイスはデフォルトでは無効になっています。`hadoop-env.sh` (通常は $HADOOP_HOME/conf にあります) で以下のオプションを設定して、これを有効にしてください。

   ```conf
   export HADOOP_DATANODE_OPTS="-Dcom.sun.management.jmxremote
     -Dcom.sun.management.jmxremote.authenticate=false
     -Dcom.sun.management.jmxremote.ssl=false
     -Dcom.sun.management.jmxremote.port=50075 $HADOOP_DATANODE_OPTS"
   ```

2. DataNode プロセスを再起動すると、JMX インターフェイスが有効になります。

#### Agent の接続

<!-- xxx tabs xxx -->
<!-- xxx tab "ホスト" xxx -->

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `hdfs_datanode.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル hdfs_datanode.d/conf.yaml][5] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param hdfs_datanode_jmx_uri - string - required
     ## The HDFS DataNode check retrieves metrics from the HDFS DataNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on a HDFS DataNode. The HDFS
     ## DataNode JMX URI is composed of the DataNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.datanode.http.address
     ## https://hadoop.apache.org/docs/r2.7.1/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_datanode_jmx_uri: http://localhost:50075
   ```

2. [Agent を再起動します][6]。

<!-- xxz tab xxx -->
<!-- xxx tab "コンテナ化" xxx -->

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                |
| -------------------- | ---------------------------------------------------- |
| `<インテグレーション名>` | `hdfs_datanode`                                      |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                        |
| `<インスタンスコンフィギュレーション>`  | `{"hdfs_datanode_jmx_uri": "http://%%host%%:50075"}` |

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent でのログ収集は、デフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. DataNode のログの収集を開始するには、次の構成ブロックを `hdfs_datanode.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_datanode
          service: <SERVICE_NAME>
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。

3. [Agent を再起動します][6]。

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `hdfs_datanode` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hdfs_datanode" >}}


### イベント

HDFS-datanode チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "hdfs_datanode" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][9]
- [Hadoop メトリクスの監視方法][10]
- [Hadoop メトリクスの収集方法][11]
- [Datadog を使用した Hadoop の監視方法][12]




## HDFS NameNode インテグレーション

![HDFS ダッシュボード][13]

## 概要

プライマリおよびスタンバイ HDFS NameNode を監視することで、クラスターが不安定な状態に陥っている場合、NameNode が 1 つしか残っていない場合、クラスターに容量を追加する必要がある場合などに気付くことができます。この Agent チェックは、残存容量、破損/欠落したブロック、停止した DataNode、ファイルシステムの負荷、レプリケーションが不十分なブロック、合計ボリューム障害数 (全 DataNode の合計) などに関するメトリクスを収集します。

このチェック (hdfs_namenode) と、これと対応するチェック (hdfs_datanode) の 2 つを使用してください。以前の兼用型のチェック (hdfs) は非推奨になりました。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

HDFS NameNode チェックは [Datadog Agent][3] パッケージに含まれています。NameNode に追加でインストールする必要はありません。

### コンフィギュレーション

#### ノードを準備する

1. Agent は、NameNode の JMX リモートインターフェイスからメトリクスを収集します。このインターフェイスはデフォルトでは無効になっています。`hadoop-env.sh` (通常は $HADOOP_HOME/conf にあります) で以下のオプションを設定して、これを有効にしてください。

    ```conf
    export HADOOP_NAMENODE_OPTS="-Dcom.sun.management.jmxremote
      -Dcom.sun.management.jmxremote.authenticate=false
      -Dcom.sun.management.jmxremote.ssl=false
      -Dcom.sun.management.jmxremote.port=50070 $HADOOP_NAMENODE_OPTS"
    ```

2. NameNode プロセスを再起動すると、JMX インターフェイスが有効になります。

#### Agent の接続

<!-- xxx tabs xxx -->
<!-- xxx tab "ホスト" xxx -->

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `hdfs_namenode.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hdfs_namenode.d/conf.yaml][14] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param hdfs_namenode_jmx_uri - string - required
     ## The HDFS NameNode check retrieves metrics from the HDFS NameNode's JMX
     ## interface via HTTP(S) (not a JMX remote connection). This check must be installed on
     ## a HDFS NameNode. The HDFS NameNode JMX URI is composed of the NameNode's hostname and port.
     ##
     ## The hostname and port can be found in the hdfs-site.xml conf file under
     ## the property dfs.namenode.http-address
     ## https://hadoop.apache.org/docs/r2.7.1/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_namenode_jmx_uri: http://localhost:50070
   ```

2. [Agent を再起動します][6]。

<!-- xxz tab xxx -->
<!-- xxx tab "コンテナ化" xxx -->

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                 |
| -------------------- | ----------------------------------------------------- |
| `<インテグレーション名>` | `hdfs_namenode`                                       |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                         |
| `<インスタンスコンフィギュレーション>`  | `{"hdfs_namenode_jmx_uri": "https://%%host%%:50070"}` |

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent でのログ収集は、デフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. NameNode のログの収集を開始するには、次の構成ブロックを `hdfs_namenode.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
        - type: file
          path: /var/log/hadoop-hdfs/*.log
          source: hdfs_namenode
          service: <SERVICE_NAME>
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。

3. [Agent を再起動します][6]。

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `hdfs_namenode` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hdfs_namenode" >}}


### イベント

HDFS-namenode チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "hdfs_namenode" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][9]
- [Hadoop メトリクスの監視方法][10]
- [Hadoop メトリクスの収集方法][11]
- [Datadog を使用した Hadoop の監視方法][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/hdfs_datanode/datadog_checks/hdfs_datanode/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[10]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[11]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[12]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_namenode/images/hadoop_dashboard.png
[14]: https://github.com/DataDog/integrations-core/blob/master/hdfs_namenode/datadog_checks/hdfs_namenode/data/conf.yaml.example