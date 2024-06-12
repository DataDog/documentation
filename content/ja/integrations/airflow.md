---
app_id: airflow
app_uuid: ed426432-3df4-4ab8-ab2f-a5a85900c59b
assets:
  dashboards:
    Airflow Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: airflow.dagbag_size
      metadata_path: metadata.csv
      prefix: airflow。
    process_signatures:
    - airflow
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10083
    source_type_name: Airflow
  logs:
    source: airflow
  monitors:
    Heartbeat Failure: assets/monitors/heartbeat_failures.json
    Ongoing Duration: assets/monitors/ongoing_duration.json
  saved_views:
    airflow_overview: assets/saved_views/airflow_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 自動化
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/airflow/README.md
display_on_public_website: true
draft: false
git_integration_title: airflow
integration_id: airflow
integration_title: Airflow
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: airflow
public_title: Airflow
short_description: DAG、タスク、プール、エグゼキューターなどに関するメトリクスを追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: DAG、タスク、プール、エグゼキューターなどに関するメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Airflow
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog Agent は、以下のような多くのメトリクスを Airflow から収集します。

- DAGs（Directed Acyclic Graphs）: DAG 処理の数、DAG バッグサイズなど
- タスク: タスクの失敗、成功、強制終了など
- プール: オープンスロット、使用中のスロットなど
- エグゼキューター: オープンスロット、キューにあるタスク、実行中のタスクなど

メトリクスは [Airflow StatsD][1] プラグインを通じて収集され、Datadog の [DogStatsD][2] へ送られます。

Datadog Agent はメトリクスだけでなく、Airflow の健全性に関するサービスチェックも送信します。

## 計画と使用

### インフラストラクチャーリスト

Airflow インテグレーションを適切に動作させるには、以下のステップをすべて実施する必要があります。ステップを開始する前に、StatsD/DogStatsD マッピング機能が含まれる [Datadog Agent][3] (バージョン `6.17 または 7.17` 以降) をインストールしてください。

### ブラウザトラブルシューティング
Airflow インテグレーションには 2 つの形式があります。まず、Airflow が接続でき、正常であるかどうかを報告するために、提供されたエンドポイントにリクエストを行う Datadog Agent インテグレーションがあります。次に、Airflow が Datadog Agent にメトリクスを送信するように Airflow を構成できる Airflow StatsD 部分があります。これにより、Airflow 表記を Datadog 表記に再マップできます。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

##### Datadog Agent Airflow インテグレーションを構成する

[Datadog Agent][1] パッケージに含まれている Airflow チェックを構成して、ヘルスメトリクスとサービスチェックを収集します。これは、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーにある `airflow.d/conf.yaml` ファイル内の `url` を編集して、Airflow サービスチェックの収集を開始することで実行できます。利用可能なすべてのコンフィギュレーションオプションについては、[airflow.d/conf.yaml のサンプル][2]を参照してください。

`url` が Airflow [Web サーバー `base_url`][3] (Airflow インスタンスへの接続に使用する URL) に一致することを確認します。

##### Airflow を DogStatsD に接続する

Airflow の `statsd` 機能を使用してメトリクスを収集することにより、Airflow を DogStatsD (Datadog Agent に含まれる) に接続します。使用されている Airflow バージョンによって報告されるメトリクスと追加のコンフィギュレーションオプションの詳細については、以下の Airflow ドキュメントを参照してください。
- [Airflow メトリクス][4]
- [Airflow メトリクス構成][5]

**注**: Airflow により報告される StatsD メトリクスの有無は、使用される Airflow エグゼキューターにより異なる場合があります。たとえば、`airflow.ti_failures/successes`、`airflow.operator_failures/successes`、`airflow.dag.task.duration` は [`KubernetesExecutor` に報告されません][6]。

1. [Airflow StatsD プラグイン][7]をインストールします。

   ```shell
   pip install 'apache-airflow[statsd]'
   ```

2. 下記のコンフィギュレーションを追加して、Airflow コンフィギュレーションファイル `airflow.cfg` を更新します。

   <div class="alert alert-warning"> `statsd_datadog_enabled` を true に設定しないでください。`statsd_datadog_enabled` を有効にすると、競合が発生する可能性があります。問題を防ぐには、この変数を `False` に設定してください。</div>

   ```conf
   [scheduler]
   statsd_on = True
   # Hostname or IP of server running the Datadog Agent
   statsd_host = localhost  
   # DogStatsD port configured in the Datadog Agent
   statsd_port = 8125
   statsd_prefix = airflow
   ```

3. 下記のコンフィギュレーションを追加して、[Datadog Agent のメインコンフィギュレーションファイル][8]である `datadog.yaml` を更新します。

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
         - match: "airflow.*_heartbeat_failure"
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
         - match: "airflow.pool.queued_slots.*"
           name: "airflow.pool.queued_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.running_slots.*"
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
         - match: 'airflow.scheduler.tasks.running'
           name: "airflow.scheduler.tasks.running"
         - match: 'airflow.scheduler.tasks.starving'
           name: "airflow.scheduler.tasks.starving"
         - match: 'airflow.sla_email_notification_failure'
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
         - match: 'airflow\.ti\.start\.(.+)\.(\w+)'
           match_type: regex
           name: airflow.ti.start
           tags: 
             dag_id: "$1"
             task_id: "$2"
         - match: 'airflow\.ti\.finish\.(\w+)\.(.+)\.(\w+)'
           name: airflow.ti.finish
           match_type: regex
           tags: 
             dag_id: "$1"
             task_id: "$2"
             state: "$3"
   ```

##### Datadog Agent と Airflow を再起動する

1. [Agent を再起動します][9]。
2. Airflow を再起動し、Agent の DogStatsD エンドポイントへの Airflow メトリクスの送信を開始します。

##### インテグレーションサービスチェック

`airflow.d/conf.yaml` ファイルのデフォルトコンフィギュレーションを使用して、Airflow サービスチェックを有効にします。利用可能なすべてのコンフィギュレーションオプションについては、[airflow.d/conf.yaml][2] のサンプルを参照してください。

##### 収集データ

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
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/scheduler/latest/*.log"
          source: airflow
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
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

3. [Agent を再起動します][10]。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url
[4]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[5]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[6]: https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html
[7]: https://airflow.apache.org/docs/stable/metrics.html
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/help/
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

##### Datadog Agent Airflow インテグレーションを構成する

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                 |
|----------------------|-----------------------|
| `<INTEGRATION_NAME>` | `airflow`             |
| `<INIT_CONFIG>`      | 空白または `{}`         |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%:8080"}` |

`url` が Airflow [Web サーバー `base_url`][2] (Airflow インスタンスへの接続に使用する URL) に一致することを確認します。`localhost` をテンプレート変数 `%%host%` に置き換えます。

##### Airflow を DogStatsD に接続する

Airflow の `statsd` 機能を使用してメトリクスを収集することにより、Airflow を DogStatsD (Datadog Agent に含まれる) に接続します。使用されている Airflow バージョンによって報告されるメトリクスと追加のコンフィギュレーションオプションの詳細については、以下の Airflow ドキュメントを参照してください。
- [Airflow メトリクス][3]
- [Airflow メトリクス構成][4]

**注**: Airflow により報告される StatsD メトリクスの有無は、使用される Airflow エグゼキューターにより異なる場合があります。たとえば、`airflow.ti_failures/successes`、`airflow.operator_failures/successes`、`airflow.dag.task.duration` は [`KubernetesExecutor` に報告されません][5]。

**注**: Airflow に使用される環境変数は、バージョン間で異なる場合があります。たとえば、Airflow `2.0.0` では、これは環境変数 `AIRFLOW__METRICS__STATSD_HOST` を利用しますが、Airflow `1.10.15` は `AIRFLOW__SCHEDULER__STATSD_HOST` を利用します。

Airflow StatsD コンフィギュレーションは、Kubernetes デプロイメントで次の環境変数を使用して有効にできます。
  ```yaml
  env:
    - name: AIRFLOW__SCHEDULER__STATSD_ON
      value: "True"
    - name: AIRFLOW__SCHEDULER__STATSD_PORT
      value: "8125"
    - name: AIRFLOW__SCHEDULER__STATSD_PREFIX
      value: "airflow"
    - name: AIRFLOW__SCHEDULER__STATSD_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
  ```
ホストエンドポイント `AIRFLOW__SCHEDULER__STATSD_HOST` の環境変数には、ノードのホスト IP アドレスが提供され、Airflow ポッドと同じノード上の Datadog Agent ポッドに StatsD データをルーティングします。この設定では、Agent がこのポート `8125` に対して `hostPort` を開き、非ローカルの StatsD トラフィックを受け入れる必要もあります。詳細については、[Kubernetes セットアップの DogStatsD][6] を参照してください。

これにより、StatsD トラフィックが Airflow コンテナから受信データを受け入れる準備ができている Datadog Agent に転送されます。最後の部分は、対応する `dogstatsd_mapper_profiles` で Datadog Agent を更新することです。これは、[ホストインストール][7]で提供されている `dogstatsd_mapper_profiles` を `datadog.yaml` ファイルにコピーすることで実行できます。または、環境変数 `DD_DOGSTATSD_MAPPER_PROFILES` に同等の JSON コンフィギュレーションで Datadog Agent をデプロイします。Kubernetes に関して、同等の環境変数表記は次のとおりです。
  ```yaml
  env: 
    - name: DD_DOGSTATSD_MAPPER_PROFILES
      value: >
        [{"name":"airflow","prefix":"airflow.","mappings":[{"match":"airflow.*_start","name":"airflow.job.start","tags":{"job_name":"$1"}},{"match":"airflow.*_end","name":"airflow.job.end","tags":{"job_name":"$1"}},{"match":"airflow.*_heartbeat_failure","name":"airflow.job.heartbeat.failure","tags":{"job_name":"$1"}},{"match":"airflow.operator_failures_*","name":"airflow.operator_failures","tags":{"operator_name":"$1"}},{"match":"airflow.operator_successes_*","name":"airflow.operator_successes","tags":{"operator_name":"$1"}},{"match":"airflow\\.dag_processing\\.last_runtime\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_runtime","tags":{"dag_file":"$1"}},{"match":"airflow\\.dag_processing\\.last_run\\.seconds_ago\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_run.seconds_ago","tags":{"dag_file":"$1"}},{"match":"airflow\\.dag\\.loading-duration\\.(.*)","match_type":"regex","name":"airflow.dag.loading_duration","tags":{"dag_file":"$1"}},{"match":"airflow.dagrun.*.first_task_scheduling_delay","name":"airflow.dagrun.first_task_scheduling_delay","tags":{"dag_id":"$1"}},{"match":"airflow.pool.open_slots.*","name":"airflow.pool.open_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.queued_slots.*","name":"airflow.pool.queued_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.running_slots.*","name":"airflow.pool.running_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.used_slots.*","name":"airflow.pool.used_slots","tags":{"pool_name":"$1"}},{"match":"airflow.pool.starving_tasks.*","name":"airflow.pool.starving_tasks","tags":{"pool_name":"$1"}},{"match":"airflow\\.dagrun\\.dependency-check\\.(.*)","match_type":"regex","name":"airflow.dagrun.dependency_check","tags":{"dag_id":"$1"}},{"match":"airflow\\.dag\\.(.*)\\.([^.]*)\\.duration","match_type":"regex","name":"airflow.dag.task.duration","tags":{"dag_id":"$1","task_id":"$2"}},{"match":"airflow\\.dag_processing\\.last_duration\\.(.*)","match_type":"regex","name":"airflow.dag_processing.last_duration","tags":{"dag_file":"$1"}},{"match":"airflow\\.dagrun\\.duration\\.success\\.(.*)","match_type":"regex","name":"airflow.dagrun.duration.success","tags":{"dag_id":"$1"}},{"match":"airflow\\.dagrun\\.duration\\.failed\\.(.*)","match_type":"regex","name":"airflow.dagrun.duration.failed","tags":{"dag_id":"$1"}},{"match":"airflow\\.dagrun\\.schedule_delay\\.(.*)","match_type":"regex","name":"airflow.dagrun.schedule_delay","tags":{"dag_id":"$1"}},{"match":"airflow.scheduler.tasks.running","name":"airflow.scheduler.tasks.running"},{"match":"airflow.scheduler.tasks.starving","name":"airflow.scheduler.tasks.starving"},{"match":"airflow.sla_email_notification_failure","name":"airflow.sla_email_notification_failure"},{"match":"airflow\\.task_removed_from_dag\\.(.*)","match_type":"regex","name":"airflow.dag.task_removed","tags":{"dag_id":"$1"}},{"match":"airflow\\.task_restored_to_dag\\.(.*)","match_type":"regex","name":"airflow.dag.task_restored","tags":{"dag_id":"$1"}},{"match":"airflow.task_instance_created-*","name":"airflow.task.instance_created","tags":{"task_class":"$1"}},{"match":"airflow\\.ti\\.start\\.(.+)\\.(\\w+)","match_type":"regex","name":"airflow.ti.start","tags":{"dag_id":"$1","task_id":"$2"}},{"match":"airflow\\.ti\\.finish\\.(\\w+)\\.(.+)\\.(\\w+)","name":"airflow.ti.finish","match_type":"regex","tags":{"dag_id":"$1","task_id":"$2","state":"$3"}}]}]
  ```

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][8]を参照してください。

| パラメーター      | 値                                                 |
|----------------|-------------------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "airflow", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/getting_started/agent/autodiscovery/?tab=docker#integration-templates
[2]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url
[3]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[4]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[5]: https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html
[6]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=kubernetes#setup
[7]: /ja/integrations/airflow/?tab=host#connect-airflow-to-dogstatsd
[8]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `airflow` を探します。

## 付録

### Airflow DatadogHook

さらに、Datadog とのインタラクションに [Airflow DatadogHook][5] を使用することも可能です。

- メトリクスの送信
- メトリクスのクエリ
- イベントのポスト

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "airflow" >}}


### ヘルプ

Airflow チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "airflow" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。



[1]: https://airflow.apache.org/docs/stable/metrics.html
[2]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://airflow.apache.org/docs/apache-airflow-providers-datadog/stable/_modules/airflow/providers/datadog/hooks/datadog.html
[6]: https://docs.datadoghq.com/ja/help/