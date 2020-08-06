---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: spark
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/spark/README.md'
display_name: Spark
git_integration_title: spark
guid: f7a5a40f-f73c-465a-be8f-b2b371c706a2
integration_id: spark
integration_title: Spark
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: spark.
metric_to_check: spark.job.count
name: spark
public_title: Datadog-Spark インテグレーション
short_description: タスクの失敗率、シャッフルされたバイト数などを追跡します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Spark のグラフ][1]

## 概要

このチェックは、Datadog Agent を通じて [Spark][2] を監視します。以下の Spark メトリクスを収集します。

- ドライバーとエグゼキューター: RDD ブロック、使用メモリ量、使用ディスク容量、処理時間など
- RDD: パーティション数、使用メモリ量、使用ディスク容量。
- タスク: アクティブなタスク数、スキップされたタスク数、失敗したタスク数、合計タスク数。
- ジョブの状態: アクティブなジョブ数、完了したジョブ数、スキップされたジョブ数、失敗したジョブ数。

**注**: Spark Structured Streaming メトリクスはサポートされていません。

## セットアップ

### インストール

Spark チェックは [Datadog Agent][3] パッケージに含まれています。Mesos マスター（Mesos の Spark）、YARN ResourceManager（YARN の Spark）、Spark マスター（Spark Standalone）に追加でインストールする必要はありません。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `spark.d/conf.yaml` ファイルを編集します。以下のパラメーターは、更新が必要な場合があります。使用可能なすべての構成オプションの詳細については、[サンプル spark.d/conf.yaml][5] を参照してください。

   ```yaml
   init_config:

   instances:
     - spark_url: http://localhost:8080 # Spark master web UI
       #   spark_url: http://<Mesos_master>:5050 # Mesos master web UI
       #   spark_url: http://<YARN_ResourceManager_address>:8088 # YARN ResourceManager address

       spark_cluster_mode: spark_yarn_mode # default
       #   spark_cluster_mode: spark_mesos_mode
       #   spark_cluster_mode: spark_yarn_mode
       #   spark_cluster_mode: spark_driver_mode

       # required; adds a tag 'cluster_name:<CLUSTER_NAME>' to all metrics
       cluster_name: "<CLUSTER_NAME>"
       # spark_pre_20_mode: true   # if you use Standalone Spark < v2.0
       # spark_proxy_enabled: true # if you have enabled the spark UI proxy
   ```

2. [Agent を再起動します][6]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][7]をガイドとして参照して、次のパラメーターを適用します。

| パラメーター            | 値                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<インテグレーション名>` | `spark`                                                           |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                     |
| `<インスタンスコンフィギュレーション>`  | `{"spark_url": "%%host%%:8080", "cluster_name":"<CLUSTER_NAME>"}` |


##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

      ```yaml
       logs_enabled: true
     ```

2. `spark.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、 `type`、`path`、`service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル spark.d/conf.yaml][5] を参照してください。

      ```yaml
       logs:
         - type: file
           path: <LOG_FILE_PATH>
           source: spark
           service: <SERVICE_NAME>
           # To handle multi line that starts with yyyy-mm-dd use the following pattern
           # log_processing_rules:
           #   - type: multi_line
           #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #     name: new_log_start_with_date
     ```

3. [Agent を再起動します][6]。

Docker環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][8]を参照してください。


### 検証

Agent の [status サブコマンド][9]を実行し、Checks セクションで `spark` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "spark" >}}


### イベント

Spark チェックには、イベントは含まれません。

### サービスのチェック

Agent は、Spark の実行方法に応じて、以下のサービスチェックのいずれかを送信します。

**spark.standalone_master.can_connect**<br>
Agent が Spark インスタンスの Standalone Master に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**spark.mesos_master.can_connect**<br>
Agent が Spark インスタンスの Mesos Master に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**spark.application_master.can_connect**<br>
Agent が Spark インスタンスの ApplicationMaster に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**spark.resource_manager.can_connect**<br>
Agent が Spark インスタンスの ResourceManager に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**spark.driver.can_connect**<br>
Agent が Spark インスタンスの ResourceManager に接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

### AWS EMR 上の Spark

AWS EMR 上の Spark のメトリクスを受信するには、[ブートストラップアクションを使用][11]して [Datadog Agent][12] をインストールし、[各 EMR ノードに正しい値が指定][13]された `/etc/dd-agent/conf.d/spark.yaml` コンフィギュレーションファイルを作成します。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Hadoop と Spark の監視][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/spark/images/sparkgraph.png
[2]: https://spark.apache.org/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[8]: 
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/spark/metadata.csv
[11]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html
[12]: https://docs.datadoghq.com/ja/agent/
[13]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-connect-master-node-ssh.html
[14]: https://www.datadoghq.com/blog/monitoring-spark