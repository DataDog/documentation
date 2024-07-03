---
app_id: spark
app_uuid: 5cb22455-9ae2-44ee-ae05-ec21c27b3292
assets:
  dashboards:
    Databricks Spark Overview: assets/dashboards/databricks_overview.json
    spark: assets/dashboards/spark_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: spark.job.count
      metadata_path: metadata.csv
      prefix: spark.
    process_signatures:
    - java org.apache.spark.deploy.SparkSubmit
    - java org.apache.spark.deploy.worker.Worker
    - java org.apache.spark.deploy.master.Master
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 142
    source_type_name: Spark
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/spark/README.md
display_on_public_website: true
draft: false
git_integration_title: spark
integration_id: spark
integration_title: Spark
integration_version: 4.3.1
is_public: true
manifest_version: 2.0.0
name: spark
public_title: Spark
short_description: タスクの失敗率、シャッフルされたバイト数などを追跡します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: タスクの失敗率、シャッフルされたバイト数などを追跡します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Spark
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Spark のグラフ][1]

## 概要

このチェックは、Datadog Agent を通じて [Spark][2] を監視します。以下の Spark メトリクスを収集します。

- ドライバーとエグゼキューター: RDD ブロック、使用メモリ量、使用ディスク容量、処理時間など
- RDD: パーティション数、使用メモリ量、使用ディスク容量。
- タスク: アクティブなタスク数、スキップされたタスク数、失敗したタスク数、合計タスク数。
- ジョブの状態: アクティブなジョブ数、完了したジョブ数、スキップされたジョブ数、失敗したジョブ数。

## セットアップ

### インストール

Spark チェックは [Datadog Agent][3] パッケージに含まれています。Mesos マスター（Mesos の Spark）、YARN ResourceManager（YARN の Spark）、Spark マスター（Spark Standalone）に追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `spark.d/conf.yaml` ファイルを編集します。以下のパラメーターは、更新が必要な場合があります。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル spark.d/conf.yaml][2] を参照してください。

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

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `spark`                                                           |
| `<INIT_CONFIG>`      | 空白または `{}`                                                     |
| `<INSTANCE_CONFIG>`  | `{"spark_url": "%%host%%:8080", "cluster_name":"<CLUSTER_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

      ```yaml
       logs_enabled: true
     ```

2. `spark.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、 `type`、`path`、`service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル spark.d/conf.yaml][4] を参照してください。

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

3. [Agent を再起動します][5]。

Docker 環境のログを有効にするには、[Docker ログ収集][6]を参照してください。

### 検証

Agent の [status サブコマンド][7]を実行し、Checks セクションで `spark` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "spark" >}}


### イベント

Spark チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "spark" >}}


## トラブルシューティング

### AWS EMR 上の Spark

AWS EMR 上の Spark のメトリクスを受信するには、[ブートストラップアクションを使用][8]して [Datadog Agent][9] をインストールします。

Agent v5 の場合は、[各 EMR ノードに正しい値が指定][10]された `/etc/dd-agent/conf.d/spark.yaml` 構成ファイルを作成します。

Agent v6/7 の場合は、[各 EMR ノードに正しい値が指定][10]された `/etc/datadog-agent/conf.d/spark.d/conf.yaml` 構成ファイルを作成します。

### チェックは成功したが、メトリクスは収集されない

Spark インテグレーションは、実行中のアプリに関するメトリクスのみを収集します。現在実行中のアプリがない場合、チェックはヘルスチェックを送信するだけです。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Hadoop と Spark の監視][11]
- [Monitoring Apache Spark applications running on Amazon EMR][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/spark/images/sparkgraph.png
[2]: https://spark.apache.org/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/docker/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html
[9]: https://docs.datadoghq.com/ja/agent/
[10]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-connect-master-node-ssh.html
[11]: https://www.datadoghq.com/blog/monitoring-spark
[12]: https://www.datadoghq.com/blog/spark-emr-monitoring/