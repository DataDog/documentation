---
title: 推定使用量メトリクス
---

## 概要

Datadog は、現在の推定使用量をほぼリアルタイムで計算します。推定使用量メトリクスにより、次のことが可能になります。

* 推定使用量をグラフ化します
* 自身で選んだしきい値に基づいた推定使用量に関する[モニター][3]を作成します
* 使用量の急増や減少に関する[モニターアラート][4]を受け取ります
* コードの変更が使用量に及ぼす潜在的な影響をほぼリアルタイムで評価します

**注**: これらの使用量メトリクスはあくまでも推定値であり、リアルタイムという性質上、請求対象の使用量に必ずしも一致しません。推定使用量と請求対象使用量には平均で 10〜20% の差があります。推定であるため、使用量が少ないと誤差の範囲はより大きくなります。

{{< img src="account_management/billing/usage-metrics-01.png" alt="ダッシュボード例" >}}

## 使用のタイプ

推定使用量メトリクスは、通常、次の使用タイプで使用できます。

| 使用タイプ                    | メトリクス                                   | 説明 |
|-------------------------------|------------------------------------------| ----------- |
| インフラストラクチャーホスト          | `datadog.estimated_usage.hosts`          | 過去 1 時間に確認された一意のホスト。 |
| コンテナ                    | `datadog.estimated_usage.containers`     | 過去 1 時間に確認された一意のコンテナ。 |
| Fargate タスク                 | `datadog.estimated_usage.fargate_tasks`  | 過去 5 分間に確認された一意の Fargate タスク。 |
| インデックスされたカスタムメトリクス        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` | 過去 1 時間に確認された一意のインデックス化カスタムメトリクス。 |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` | 過去 1 時間に確認された一意の取り込みカスタムメトリクス。 |
| ログ取り込みバイト           | `datadog.estimated_usage.logs.ingested_bytes` | バイト単位のログの取り込みの合計。 |
| ログ取り込みイベント          | `datadog.estimated_usage.logs.ingested_events` | 除外されたログを含む、取り込まれたイベントの総数。 |
| ログのドロップ数               | `datadog.estimated_usage.logs.drop_count` | 取り込み中にドロップされたイベントの総数。 |
| ログの切り捨て数          | `datadog.estimated_usage.logs.truncated_count` | 取り込み時に切り捨てられたイベントの総数。 |
| ログの切り捨てバイト数          | `datadog.estimated_usage.logs.truncated_bytes` | 切り捨てられたイベントの量 (バイト単位)。 |
| 分析ログ (セキュリティ)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | バイト単位の Cloud SIEM ログの取り込みの合計。 |
| APM ホスト                     | `datadog.estimated_usage.apm_hosts` | 過去 1 時間に確認された一意の APM ホスト。Azure App Services ホストは含まれません。 |
| APM インデックス化スパン             | `datadog.estimated_usage.apm.indexed_spans` | インデックス化スパンの総数。 |
| APM 取り込みバイト            | `datadog.estimated_usage.apm.ingested_bytes` | バイト単位の取り込みスパンの量。 |
| APM 取り込みスパン            | `datadog.estimated_usage.apm.ingested_spans` | 取り込みスパンの総数。 |
| APM Fargate タスク             | `datadog.estimated_usage.apm.fargate_tasks` | 過去 5 分間に確認された一意の APM Fargate タスク。 |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions` | RUM セッションの総数。 |
| サーバーレス Lambda 関数   | `datadog.estimated_usage.serverless.aws_lambda_functions` | 過去 1 時間に確認された一意のサーバーレス関数。 |
| サーバーレス呼び出し        | `datadog.estimated_usage.serverless.invocations`| 過去 1 時間のサーバーレス呼び出しの合計。 |
| API テストの実行                 | `datadog.estimated_usage.synthetics.api_test_runs` | API テストの推定使用量。 |
| ブラウザテストの実行             | `datadog.estimated_usage.synthetics.browser_test_runs`| ブラウザテストの推定使用量。 |
| 並列テストスロット        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | 並列テストスロットの推定使用量。 |
| Network Hosts                 | `datadog.estimated_usage.network.hosts` | 過去 1 時間に確認された一意の NPM ホスト。 |
| Network Devices               | `datadog.estimated_usage.network.devices` | 過去 1 時間に確認された一意の NDM デバイス。 |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts` | 過去 1 時間に確認された一意のプロファイリングホスト。 |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers` | 過去 5 分間に確認された一意のプロファイリングコンテナ。 |
| Profiler Fargate タスク        | `datadog.estimated_usage.profiling.fargate_tasks` | 過去 5 分間に確認された一意のプロファイリング Fargate タスク。 |
| CSPM ホスト                    | `datadog.estimated_usage.cspm.hosts` | 過去 1 時間に確認された一意の CSPM ホスト。 |
| CSPM コンテナ               | `datadog.estimated_usage.cspm.containers` | 過去 5 分間に確認された一意の CSPM コンテナ。 |
| CWS ホスト                     | `datadog.estimated_usage.cws.hosts` | 過去 1 時間に確認された一意の CWS ホスト。 |
| CWS コンテナ                | `datadog.estimated_usage.cws.containers` | 過去 5 分間に確認された一意の CWS コンテナ。 |
| データベースホスト                | `datadog.estimated_usage.dbm.hosts` | 過去 1 時間に確認された一意の DBM ホスト。 |
| ASM ホスト                     | `datadog.estimated_usage.asm.hosts` | 過去 1 時間に確認された一意の ASM ホスト。 |
| ASM タスク                     | `datadog.estimated_usage.asm.tasks` | 過去 5 分間に確認された一意の ASM Fargate タスク。 |
| インシデント管理 (アクティブユーザー)   | `datadog.estimated_usage.incident_management.active_users` | (暦) 月累計の確認されたアクティブ IM ユーザー。 |
| CI Visibility パイプラインのコミッター | `datadog.estimated_usage.ci_visibility.pipeline.committers` | (暦) 月累計の確認されたパイプラインコミッター。 |
| CI Visibility テストのコミッター | `datadog.estimated_usage.ci_visibility.test.committers` | (暦) 月累計の確認されたテストコミッター。 |
| IOT デバイス                   | `datadog.estimated_usage.iot.devices` | 過去 1 時間に確認された一意の IoT デバイス。 |
| Observability Pipelines 取り込みバイト数 | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Observability Pipelines によって取り込まれたデータ量。 |


{{< img src="account_management/billing/usage-metrics-02.png" alt="メトリクス名" >}}

## 複数組織の使用

複数の組織を持つアカウントの場合、`from` フィールドを使用して子組織の推定使用量をロールアップし、アカウント全体の使用量を監視できます。

{{< img src="account_management/billing/usage-metrics-03.png" alt="複数組織の使用" >}}

## ヘルプ

技術的な質問については、[Datadog のサポートチーム][1]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][2]マネージャーにお問い合わせください。

[1]: /ja/help/
[2]: mailto:success@datadoghq.com
[3]: /ja/monitors/types/metric/?tab=threshold
[4]: /ja/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month