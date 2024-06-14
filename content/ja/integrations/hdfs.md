---
integration_title: Hdfs
is_public: true
kind: インテグレーション
short_description: クラスターのディスク使用状況、ボリューム障害、停止した DataNode などを追跡します。
---


<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## HDFS DataNode インテグレーション

![HDFS ダッシュボード][1]

## 概要

各 HDFS DataNode のディスク使用率と障害ボリュームを追跡します。この Agent チェックはこれらのメトリクスに加えて、ブロックおよびキャッシュ関連のメトリクスを収集します。 このチェック (hdfs_datanode) とその対になるチェック (hdfs_namenode) を使用し、古いツーインワンチェック (hdfs) は使用しないでください。このチェックは非推奨です。 

## セットアップ

ホスト上で実行されている Agent に対してこのチェックをインストールおよび構成するには、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーインテグレーションテンプレート][2]を参照してください。

### インストール

HDFS DataNode チェックは [Datadog Agent][3] パッケージに含まれているため、DataNode に他に何かをインストールする必要はありません。

### 構成

#### Agent の接続

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->


#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

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
     ## https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_datanode_jmx_uri: http://localhost:9864
   ```

2. [Agent を再起動します][6]。

<!-- xxz tab xxx -->
<!-- xxx tab "コンテナ化" xxx -->

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                               |
| -------------------- | --------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_datanode`                                     |
| `<INIT_CONFIG>`      | 空白または `{}`                                       |
| `<INSTANCE_CONFIG>`  | `{"hdfs_datanode_jmx_uri": "http://%%host%%:9864"}` |

#### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hdfs_datanode" >}}


### ヘルプ

HDFS-datanode チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "hdfs_datanode" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][9]
- [Hadoop メトリクスの監視方法][10]
- [Hadoop メトリクスの収集方法][11]
- [Datadog を使用した Hadoop の監視方法][12]




<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## HDFS NameNode インテグレーション

![HDFS ダッシュボード][13]

## 概要

プライマリ HDFS NameNode とスタンバイ HDFS NameNode を監視して、クラスターが不安定な状態に陥ったときに知ることができます。この Agent チェックは、残り容量、破損/欠落ブロック、停止した DataNode、ファイルシステム負荷、レプリケート不足ブロック、合計ボリューム障害 (すべての DataNode に対する) などのメトリクスを収集します。

このチェック (hdfs_namenode) とその対になるチェック (hdfs_datanode) を使用し、古いツーインワンチェック (hdfs) は使用しないでください。このチェックは非推奨です。

## セットアップ

ホスト上で実行されている Agent に対してこのチェックをインストールおよび構成するには、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーインテグレーションテンプレート][2]を参照してください。

### インストール

HDFS NameNode チェックは [Datadog Agent][3] パッケージに含まれているため、NameNode に他に何かをインストールする必要はありません。

### 構成

#### Agent の接続

<!-- xxx tabs xxx -->
<!-- xxx tab "Host" xxx -->

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

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
     ## https://hadoop.apache.org/docs/r3.1.3/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml
     #
     - hdfs_namenode_jmx_uri: http://localhost:9870
   ```

2. [Agent を再起動します][6]。

<!-- xxz tab xxx -->
<!-- xxx tab "コンテナ化" xxx -->

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `hdfs_namenode`                                      |
| `<INIT_CONFIG>`      | 空白または `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"hdfs_namenode_jmx_uri": "https://%%host%%:9870"}` |

#### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hdfs_namenode" >}}


### ヘルプ

HDFS-namenode チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "hdfs_namenode" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [Hadoop アーキテクチャの概要][9]
- [Hadoop メトリクスの監視方法][10]
- [Hadoop メトリクスの収集方法][11]
- [Datadog を使用した Hadoop の監視方法][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/hdfs_datanode/images/hadoop_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
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