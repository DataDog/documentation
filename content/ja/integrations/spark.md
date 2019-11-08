---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
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
kind: integration
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

Spark チェックは、以下のメトリクスを収集します。

- ドライバーとエグゼキューター: RDD ブロック、使用メモリ量、使用ディスク容量、処理時間など
- RDD: パーティション数、使用メモリ量、使用ディスク容量
- タスク: アクティブなタスク数、スキップされたタスク数、失敗したタスク数、合計タスク数
- ジョブの状態: アクティブなジョブ数、完了したジョブ数、スキップされたジョブ数、失敗したジョブ数

## セットアップ
### インストール

Spark チェックは [Datadog Agent][3] パッケージに含まれています。以下に追加でインストールする必要はありません。

- Mesos マスター (Spark を Mesos で実行している場合)
- YARN ResourceManager (Spark を YARN で実行している場合)
- Spark マスター (スタンドアロン Spark を実行している場合)

### コンフィグレーション
#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. [Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `spark.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル spark.d/conf.yaml][5] を参照してください。

    ```yaml
        init_config:

        instances:
          - spark_url: http://localhost:8088 # Spark master web UI
        #   spark_url: http://<Mesos_master>:5050 # Mesos master web UI
        #   spark_url: http://<YARN_ResourceManager_address>:8088 # YARN ResourceManager address

            spark_cluster_mode: spark_standalone_mode # default is spark_yarn_mode
        #   spark_cluster_mode: spark_mesos_mode
        #   spark_cluster_mode: spark_yarn_mode

            cluster_name: <CLUSTER_NAME> # required; adds a tag 'cluster_name:<CLUSTER_NAME>' to all metrics

        #   spark_pre_20_mode: true   # if you use Standalone Spark < v2.0
        #   spark_proxy_enabled: true # if you have enabled the spark UI proxy
    ```

    Spark の実行方法に応じて、`spark_url` と `spark_cluster_mode` を設定します。

2. [Agent を再起動][6]すると、Datadog への Spark メトリクスの送信が開始されます。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                       |
|----------------------|---------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `spark`                                                                                   |
| `<INIT_CONFIG>`      | 空欄あるいは`{}`                                                                               |
| `<INSTANCE_CONFIG>`  | `{"spark_url": "%%host%%:8080", "cluster_name":"<CLUSTER_NAME>"}` |

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `spark` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "spark" >}}


### イベント
Spark チェックには、イベントは含まれません。

### サービスのチェック
Agent は、Spark の実行方法に応じて、以下のサービスチェックのいずれかを送信します。

- **spark.standalone_master.can_connect**
- **spark.mesos_master.can_connect**
- **spark.application_master.can_connect**
- **spark.resource_manager.can_connect**

Agent が Spark メトリクスを収集できない場合、チェックは CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
### AWS EMR 上の Spark

Spark が AWS EMR 上にセットアップされている場合に Spark メトリクスを取得するには、[ブートストラップアクションを使用][9]して [Datadog Agent][10] をインストールし、[各 EMR ノードに正しい値が指定][11]された `/etc/dd-agent/conf.d/spark.yaml` 構成ファイルを作成します。

## その他の参考資料

* [Datadog を使用した Hadoop と Spark の監視][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/spark/images/sparkgraph.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/spark/metadata.csv
[9]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html
[10]: https://docs.datadoghq.com/ja/agent
[11]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-connect-master-node-ssh.html
[12]: https://www.datadoghq.com/blog/monitoring-spark


{{< get-dependencies >}}