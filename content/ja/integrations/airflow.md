---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Airflow Overview: assets/dashboards/overview.json
  logs:
    source: airflow
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 処理
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/airflow/README.md'
display_name: Airflow
draft: false
git_integration_title: airflow
guid: f55d88b1-1c0a-4a23-a2df-9516b50050dd
integration_id: airflow
integration_title: Airflow
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: airflow。
metric_to_check: airflow.dagbag_size
name: airflow
public_title: Datadog-Airflow インテグレーション
short_description: DAG、タスク、プール、エグゼキューターなどに関するメトリクスを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog Agent は、以下のような多くのメトリクスを Airflow から収集します。

- DAGs（Directed Acyclic Graphs）: DAG 処理の数、DAG バッグサイズなど
- タスク: タスクの失敗、成功、強制終了など
- プール: オープンスロット、使用中のスロットなど
- エグゼキューター: オープンスロット、キューにあるタスク、実行中のタスクなど

メトリクスは [Airflow StatsD][1] プラグインを通じて収集され、Datadog の [DogStatsD][2] へ送られます。

Datadog Agent はメトリクスだけでなく、Airflow の健全性に関するサービスチェックも送信します。

## セットアップ

### インストール

Airflow インテグレーションを適切に動作させるには、以下のステップをすべて実施する必要があります。ステップを開始する前に、StatsD/DogStatsD マッピング機能が含まれる [Datadog Agent][3] (バージョン `6.17 または 7.17` 以降) をインストールしてください。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

##### Airflow を構成する

健全性メトリクスとサービスチェックを収集するように、[Datadog Agent][1] パッケージに含まれている Airflow チェックを構成します。

(任意) Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーで `airflow.d/conf.yaml` ファイルを編集し、Airflow サービスチェックの収集を開始します。利用可能なすべてのコンフィギュレーションオプションについては、[airflow.d/conf.yaml のサンプル][2]を参照してください。

##### Airflow を DogStatsD に接続する

Airflow の `statsd` 機能を使用して Airflow を (Datadog Agent に含まれる) DogStatsD に接続し、メトリクスを収集します。

**注**: Airflow により報告される StatsD メトリクスの有無は、使用される Airflow エグゼキューターにより異なる場合があります。たとえば、`airflow.ti_failures/successes、airflow.operator_failures/successes、airflow.dag.task.duration` は [`KubernetesExecutor` に報告されません][3]。

1. [Airflow StatsD プラグイン][4]をインストールします。

   ```shell
   pip install 'apache-airflow[statsd]'
   ```

2. 下記のコンフィギュレーションを追加して、Airflow コンフィギュレーションファイル `airflow.cfg` を更新します。

   ```conf
   [scheduler]
   statsd_on = True
   statsd_host = localhost  # Hostname or IP of server running the Datadog Agent
   statsd_port = 8125       # DogStatsD port configured in the Datadog Agent
   statsd_prefix = airflow
   ```

3. 下記のコンフィギュレーションを追加して、[Datadog Agent のメインコンフィギュレーションファイル][5]である `datadog.yaml` を更新します。

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: airflow
       prefix: "airflow."
       mappings:
         - match: "airflow.*_start"
           name: "airflow.job.start"
           tags:
             job_name: "$1"
         - match: "airflow.*_end"
           name: "airflow.job.end"
           tags:
             job_name: "$1"
         - match: "aiflow.*_<job_name>_heartbeat_failure"
           name: airflow.job.heartbeat.failure
           tags:
             job_name: "$1"
         - match: "airflow.operator_failures_*"
           name: "airflow.operator_failures"
           tags:
             operator_name: "$1"
         - match: "airflow.operator_successes_*"
           name: "airflow.operator_successes"
           tags:
             operator_name: "$1"
         - match: 'airflow\.dag_processing\.last_runtime\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_runtime"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dag_processing\.last_run\.seconds_ago\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_run.seconds_ago"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dag\.loading-duration\.(.*)'
           match_type: "regex"
           name: "airflow.dag.loading_duration"
           tags:
             dag_file: "$1"
         - match: "airflow.dagrun.*.first_task_scheduling_delay"
           name: "airflow.dagrun.first_task_scheduling_delay"
           tags:
             dag_id: "$1"
         - match: "airflow.pool.open_slots.*"
           name: "airflow.pool.open_slots"
           tags:
             pool_name: "$1"
         - match: "pool.queued_slots.*"
           name: "airflow.pool.queued_slots"
           tags:
             pool_name: "$1"
         - match: "pool.running_slots.*"
           name: "airflow.pool.running_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.used_slots.*"
           name: "airflow.pool.used_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.starving_tasks.*"
           name: "airflow.pool.starving_tasks"
           tags:
             pool_name: "$1"
         - match: 'airflow\.dagrun\.dependency-check\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.dependency_check"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dag\.(.*)\.([^.]*)\.duration'
           match_type: "regex"
           name: "airflow.dag.task.duration"
           tags:
             dag_id: "$1"
             task_id: "$2"
         - match: 'airflow\.dag_processing\.last_duration\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_duration"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dagrun\.duration\.success\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.duration.success"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dagrun\.duration\.failed\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.duration.failed"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dagrun\.schedule_delay\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.schedule_delay"
           tags:
             dag_id: "$1"
         - match: 'scheduler.tasks.running'
           name: "airflow.scheduler.tasks.running"
         - match: 'scheduler.tasks.starving'
           name: "airflow.scheduler.tasks.starving"
         - match: sla_email_notification_failure
           name: 'airflow.sla_email_notification_failure'
         - match: 'airflow\.task_removed_from_dag\.(.*)'
           match_type: "regex"
           name: "airflow.dag.task_removed"
           tags:
             dag_id: "$1"
         - match: 'airflow\.task_restored_to_dag\.(.*)'
           match_type: "regex"
           name: "airflow.dag.task_restored"
           tags:
             dag_id: "$1"
         - match: "airflow.task_instance_created-*"
           name: "airflow.task.instance_created"
           tags:
             task_class: "$1"
         - match: "ti.start.*.*"
           name: "airflow.ti.start"
           tags:
             dagid: "$1"
             taskid: "$2"
         - match: "ti.finish.*.*.*"
           name: "airflow.ti.finish"
           tags:
             dagid: "$1"
             taskid: "$2"
             state: "$3"
   ```

##### Datadog Agent と Airflow を再起動する

1. [Agent を再起動します][6]。
2. Airflow を再起動し、Agent の DogStatsD エンドポイントへの Airflow メトリクスの送信を開始します。

##### インテグレーションサービスチェック

`airflow.d/conf.yaml` ファイルのデフォルトコンフィギュレーションを使用して、Airflow サービスチェックを有効にします。利用可能なすべてのコンフィギュレーションオプションについては、[airflow.d/conf.yaml][2] のサンプルを参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `airflow.d/conf.yaml` の下部にある、コンフィギュレーションブロックのコメントを解除して編集します。
  `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

   - DAG プロセッサーマネージャーと Scheduler のログのコンフィギュレーション

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/dag_processor_manager/dag_processor_manager.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/scheduler/*/*.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

       スケジューラーログを毎日ローテーションする場合は、ログを定期的にクリーンアップすることをお勧めします。

   - DAG タスクのログ用に追加するコンフィギュレーション

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/*/*/*/*.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

     注意事項: デフォルトでは、Airflow は `log_filename_template = {{ ti.dag_id }}/{{ ti.task_id }}/{{ ts }}/{{ try_number }}.log` のログファイルテンプレートをタスクに使用します。ログファイルの数は、定期的に削除しなければ急速に増加します。これは、実行された各タスクのログを Airflow UI が個別に表示するために使用するパターンです。

      ログを Airflow UI で確認しない場合は、`airflow.cfg` に `log_filename_template = dag_tasks.log` を構成することをお勧めします。これにより、ログはこのファイルをローテーションすると同時に、以下のコンフィギュレーションを使用します。

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/dag_tasks.log"
          source: airflow
          service: "<SERVICE_NAME>"
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

3. [Agent を再起動します][7]。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://airflow.apache.org/docs/stable/metrics.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/help/
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                 |
|----------------------|-----------------------|
| `<インテグレーション名>` | `airflow`             |
| `<初期コンフィギュレーション>`      | 空白または `{}`         |
| `<インスタンスコンフィギュレーション>`  | `{"url": "%%host%%"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                                 |
|----------------|-------------------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "airflow", "service": "<YOUR_APP_NAME>"}` |

##### Kubernetes

Kubernetes のインストールに関するヒント

- Airflow コンフィギュレーションを[ポッドアノテーション][2]でカスタマイズします。
- `airflow.cfg` を変更する際は、`statsd_host` を Kubernetes ノードの IP アドレスに送信する必要があります。
- [設定の例][3]については、Datadog `integrations-core` レポジトリを参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://github.com/DataDog/integrations-core/tree/master/airflow/tests/k8s_sample
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `airflow` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "airflow" >}}


### サービスのチェック

**airflow.can_connect**:<br>
Airflow に接続できない場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**airflow.healthy**:<br>
Airflow が不健全な場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

### イベント

Airflow チェックには、イベントは含まれません。

## 付録

### Airflow DatadogHook

さらに、Datadog とのインタラクションに [Airflow DatadogHook][5] を使用することも可能です。

- メトリクスの送信
- メトリクスのクエリ
- イベントのポスト

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://airflow.apache.org/docs/stable/metrics.html
[2]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://airflow.apache.org/docs/apache-airflow-providers-datadog/stable/_modules/airflow/providers/datadog/hooks/datadog.html
[6]: https://docs.datadoghq.com/ja/help/