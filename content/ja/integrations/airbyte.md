---
app_id: airbyte
categories:
- ai/ml
- data stores
custom_kind: integration
description: Airbyte デプロイメントの状態を監視します。
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Airbyte
---
## 概要

このチェックは [Airbyte](https://airbyte.com/) を監視します。メトリクスは [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd) 経由で Datadog に送信されます。

## セットアップ

### インストール

Airbyte インテグレーションを正しく動作させるには、以下の手順をすべて実施する必要があります。開始前に、StatsD/DogStatsD のマッピング機能を含む [Datadog Agent をインストール](https://app.datadoghq.com/account/settings/agent/latest) し、バージョン `>=6.17` または `>=7.17` を使用してください。

### 設定

1. Airbyte デプロイメントを [Datadog にメトリクスを送信するよう設定](https://docs.airbyte.com/operator-guides/collecting-metrics/) します。
1. [Datadog Agent のメイン設定ファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) `datadog.yaml` に、次の設定を追加します:

```yaml
dogstatsd_mapper_profiles:
  - name: airbyte_worker
    prefix: "worker."
    mappings:
      - match: "worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "worker.*"
        name: "airbyte.worker.$1"
  - name: airbyte_cron
    prefix: "cron."
    mappings:
      - match: "cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
      - match: "cron.*"
        name: "airbyte.cron.$1"
  - name: airbyte_metrics_reporter
    prefix: "metrics-reporter."
    mappings:
      - match: "metrics-reporter.*"
        name: "airbyte.metrics_reporter.$1"
  - name: airbyte_orchestrator
    prefix: "orchestrator."
    mappings:
      - match: "orchestrator.*"
        name: "airbyte.orchestrator.$1"
  - name: airbyte_server
    prefix: "server."
    mappings:
      - match: "server.*"
        name: "airbyte.server.$1"
  - name: airbyte_general
    prefix: "airbyte."
    mappings:
      - match: "airbyte.worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "airbyte.worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "airbyte.worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "airbyte.worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "airbyte.worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "airbyte.worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "airbyte.cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
```

3. [Agent を再起動](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent) し、Airbyte も再起動します。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **airbyte.cron.jobs_run** <br>(count) | CRON タイプごとの CRON 実行回数|
| **airbyte.cron.workflows_healed** <br>(count) | 自己修復 CRON が修復したワークフロー数|
| **airbyte.metrics_reporter.est_num_metrics_emitted_by_reporter** <br>(count) | 直近の間隔で reporter が出力したメトリクスの推定数。件数が厳密ではないため、あくまで推定値です。|
| **airbyte.metrics_reporter.num_orphan_running_jobs** <br>(gauge) | 実行中として報告されているジョブのうち、非アクティブまたは非推奨の connection に紐づくジョブ数<br>_単位は job_ |
| **airbyte.metrics_reporter.num_pending_jobs** <br>(gauge) | 保留中のジョブ数<br>_単位は job_ |
| **airbyte.metrics_reporter.num_running_jobs** <br>(gauge) | 実行中のジョブ数<br>_単位は job_ |
| **airbyte.metrics_reporter.num_total_scheduled_syncs_last_day** <br>(gauge) | 過去 1 日間に実行された sync ジョブ総数<br>_単位は job_ |
| **airbyte.metrics_reporter.num_unusually_long_syncs** <br>(gauge) | 過去の実績と比べて異常に長い sync ジョブ数<br>_単位は job_ |
| **airbyte.metrics_reporter.oldest_pending_job_age_secs** <br>(gauge) | 最も古い保留中ジョブの経過時間 (秒)<br>_単位は second_ |
| **airbyte.metrics_reporter.oldest_running_job_age_secs** <br>(gauge) | 最も古い実行中ジョブの経過時間 (秒)<br>_単位は second_ |
| **airbyte.orchestrator.source_hearbeat_failure** <br>(count) | ソースから heartbeat が届かないことによるレプリケーション失敗回数|
| **airbyte.server.breaking_change_detected** <br>(count) | 破壊的なスキーマ変更が検出された回数|
| **airbyte.server.schema_change_auto_propagated** <br>(count) | 反映されたスキーマ変更数。|
| **airbyte.worker.activity.check_connection** <br>(count) | check connection アクティビティの開始回数<br>_単位は connection_ |
| **airbyte.worker.activity.dbt_transformation** <br>(count) | DBT transformation アクティビティの開始回数。|
| **airbyte.worker.activity.discover_catalog** <br>(count) | discover catalog アクティビティの開始回数。|
| **airbyte.worker.activity.failure** <br>(count) | アクティビティ失敗回数。activity タグで区別されます。|
| **airbyte.worker.activity.normalization** <br>(count) | normalization アクティビティの開始回数。|
| **airbyte.worker.activity.normalization_summary_check** <br>(count) | normalization summary check アクティビティの開始回数。|
| **airbyte.worker.activity.refresh_schema** <br>(count) | refresh schema アクティビティの開始回数。|
| **airbyte.worker.activity.replication** <br>(count) | replication アクティビティの開始回数。|
| **airbyte.worker.activity.spec** <br>(count) | spec アクティビティの開始回数。|
| **airbyte.worker.activity.submit_check_destination_connection** <br>(count) | submit check connection アクティビティの開始回数<br>_単位は connection_ |
| **airbyte.worker.activity.submit_check_source_connection** <br>(count) | submit check connection アクティビティの開始回数<br>_単位は connection_ |
| **airbyte.worker.activity.webhook_operation** <br>(count) | webhook operation アクティビティの開始回数。|
| **airbyte.worker.attempt.completed** <br>(count) | 完了した新規 attempt 数。attempt ごとに 1 件記録されます。<br>_単位は attempt_ |
| **airbyte.worker.attempt.created** <br>(count) | 作成された新規 attempt 数。attempt ごとに 1 件記録されます。<br>_単位は attempt_ |
| **airbyte.worker.attempt.created_by_release_stage** <br>(count) | 新規 attempt の作成数。release stage のタグが付くため、attempt は重複カウントされます。<br>_単位は attempt_ |
| **airbyte.worker.attempt.failed_by_failure_origin** <br>(count) | 失敗した attempt が持つ failure origin の件数。1 つの失敗に複数の origin があり得るため、同じ失敗が複数回カウントされる場合があります。failure origin と failure type のタグで区別されます。<br>_単位は attempt_ |
| **airbyte.worker.attempt.failed_by_release_stage** <br>(count) | 失敗した attempt 数。release stage のタグが付くため、attempt は重複カウントされます。<br>_単位は attempt_ |
| **airbyte.worker.attempt.succeeded_by_release_stage** <br>(count) | 成功した attempt 数。release stage のタグが付くため、attempt は重複カウントされます。<br>_単位は attempt_ |
| **airbyte.worker.destination_buffer_size** <br>(gauge) | レプリケーション worker の destination buffer queue サイズ<br>_単位は record_ |
| **airbyte.worker.destination_message_read** <br>(count) | destination から読み取られたメッセージ数<br>_単位は message_ |
| **airbyte.worker.destination_message_sent** <br>(count) | destination に送信されたメッセージ数<br>_単位は message_ |
| **airbyte.worker.job.cancelled_by_release_stage** <br>(count) | キャンセルされたジョブ数。release stage のタグが付くため、ジョブは重複カウントされます。<br>_単位は job_ |
| **airbyte.worker.job.created_by_release_stage** <br>(count) | 作成された新規ジョブ数。release stage のタグが付くため、ジョブは重複カウントされます。<br>_単位は job_ |
| **airbyte.worker.job.failed_by_release_stage** <br>(count) | 失敗したジョブ数。release stage のタグが付くため、ジョブは重複カウントされます。<br>_単位は job_ |
| **airbyte.worker.job.succeeded_by_release_stage** <br>(count) | 成功したジョブ数。release stage のタグが付くため、ジョブは重複カウントされます。<br>_単位は job_ |
| **airbyte.worker.notifications_sent** <br>(count) | 送信された通知数|
| **airbyte.worker.replication_bytes_synced** <br>(count) | レプリケーション中に同期されたバイト数<br>_単位は byte_ |
| **airbyte.worker.replication_records_synced** <br>(count) | レプリケーション中に同期されたレコード数<br>_単位は record_ |
| **airbyte.worker.source_buffer_size** <br>(gauge) | レプリケーション worker の source buffer queue サイズ<br>_単位は record_ |
| **airbyte.worker.source_message_read** <br>(count) | source から読み取られたメッセージ数<br>_単位は message_ |
| **airbyte.worker.state_commit.close_successful** <br>(count) | connection の終了時に、最終 state flush が正常に完了した回数|
| **airbyte.worker.state_commit.not_attempted** <br>(count) | 早期終了により state commit が試みられなかった回数<br>_単位は attempt_ |
| **airbyte.worker.temporal_workflow.attempt** <br>(count) | temporal workflow の attempt 数<br>_単位は attempt_ |
| **airbyte.worker.temporal_workflow.failure** <br>(count) | temporal workflow の失敗回数|
| **airbyte.worker.temporal_workflow.success** <br>(count) | temporal workflow の正常な sync 回数<br>_単位は success_ |

### サービス チェック

Airbyte チェックにはサービス チェックは含まれません。

### イベント

Airbyte チェックにはイベントは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。