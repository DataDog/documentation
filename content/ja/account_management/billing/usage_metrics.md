---
title: 推定使用量メトリクス
---

<style>tbody code {word-break: break-word !important;}</style>

## 概要

Datadog は、現在の推定使用量をほぼリアルタイムで計算します。推定使用量メトリクスにより、次のことが可能になります。

* 推定使用量をグラフ化します
* 選択したしきい値に基づいて、推定使用量の付近の[モニター][3]を作成します
* 使用量の急上昇または低下の[モニターアラート][4]を取得します
* コードの変更が使用量に及ぼす潜在的な影響をほぼリアルタイムで評価します

**注**: これらの使用量メトリクスはあくまでも推定値であり、リアルタイムという性質上、請求対象の使用量に必ずしも一致しません。推定使用量と請求対象使用量には平均で 10〜20% の差があります。推定であるため、使用量が少ないと誤差の範囲はより大きくなります。

{{< img src="account_management/billing/usage-metrics-01.png" alt="ダッシュボード例" >}}

## 使用のタイプ

推定使用量メトリクスは、通常、次の使用タイプで使用できます。

| 使用タイプ                    | メトリクス                                   | 説明 |
|-------------------------------|------------------------------------------| ----------- |
| インフラストラクチャーホスト          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | 過去 1 時間に確認された一意のホスト。 |
| コンテナ                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | 過去 1 時間に確認された一意のコンテナ。 |
| Fargate タスク                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | 過去 5 分間に検出されたユニークな Fargate タスクです。<br/><br/>**注**: このメトリクスは ECS Fargate と EKS Fargate の両方の使用状況を追跡します。 |
| インデックスされたカスタムメトリクス        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | 過去 1 時間に確認された一意のインデックス化カスタムメトリクス。 |
| 取り込まれたカスタムメトリクス       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | 過去 1 時間に確認された一意の取り込みカスタムメトリクス。 |
| ログ取り込みバイト           | `datadog.estimated_usage.logs.ingested_bytes` | バイト単位のログの取り込みの合計。 |
| ログ取り込みイベント          | `datadog.estimated_usage.logs.ingested_events` | 除外されたログを含む、取り込まれたイベントの総数。 |
| 削除ログ数               | `datadog.estimated_usage.logs.drop_count` | 取り込み中に削除されたイベントの総数。 |
| 切り捨てログ数          | `datadog.estimated_usage.logs.truncated_count` | 取り込み時に切り捨てられたイベントの総数。 |
| 切り捨てログバイト数          | `datadog.estimated_usage.logs.truncated_bytes` | 切り捨てイベントの量 (バイト単位)。 |
| エラー追跡のログイベント    | `datadog.estimated_usage.error_tracking.logs.events` | Error Tracking に取り込まれたエラーログの量。 |
| 分析ログ (セキュリティ)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | バイト単位の Cloud SIEM ログの取り込みの合計。 |
| APM ホスト                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | 過去 1 時間に確認された一意の APM ホスト。Azure App Services ホストは含まれません。 |
| APM インデックス化スパン             | `datadog.estimated_usage.apm.indexed_spans` | タグ付ベースの保持フィルターによってインデックス化されたスパンの総数。 |
| APM 取り込みバイト            | `datadog.estimated_usage.apm.ingested_bytes` | バイト単位の取り込みスパンの量。 |
| APM 取り込みスパン            | `datadog.estimated_usage.apm.ingested_spans` | 取り込みスパンの総数。 |
| APM Fargate タスク             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | 過去 5 分間に確認された一意の APM Fargate タスク。 |
| RUM セッション                  | `datadog.estimated_usage.rum.sessions` | RUM セッションの総数。 |
| サーバーレス Lambda 関数   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | 過去 1 時間に確認された一意のサーバーレス関数。 |
| サーバーレス呼び出し        | `datadog.estimated_usage.serverless.invocations`| 過去 1 時間のサーバーレス呼び出しの合計。 |
| API テストの実行                 | `datadog.estimated_usage.synthetics.api_test_runs` | API テストの推定使用量。 |
| ブラウザテストの実行             | `datadog.estimated_usage.synthetics.browser_test_runs`| ブラウザテストの推定使用量。 |
| 並列テストスロット        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | 並列テストスロットの推定使用量。 |
| ネットワークホスト                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | 過去 1 時間に検出されたユニークな CNM ホストです。 |
| ネットワークデバイス               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | 過去 1 時間に確認された一意の NDM デバイス。 |
| プロファイル済みのホスト                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | 過去 1 時間に確認された一意のプロファイリングホスト。 |
| プロファイル済みのコンテナ           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | 過去 5 分間に確認された一意のプロファイリングコンテナ。 |
| Profiler Fargate タスク        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | 過去 5 分間に確認された一意のプロファイリング Fargate タスク。 |
| CSPM ホスト                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | 過去 1 時間に確認された一意の CSPM ホスト。 |
| CSPM コンテナ               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | 過去 5 分間に確認された一意の CSPM コンテナ。 |
| CWS ホスト                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | 過去 1 時間に確認された一意の CWS ホスト。 |
| CWS コンテナ                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | 過去 5 分間に確認された一意の CWS コンテナ。 |
| データベースホスト                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | 過去 1 時間に確認された一意の DBM ホスト。 |
| ASM ホスト                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | 過去 1 時間に確認された一意の ASM ホスト。 |
| ASM タスク                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | 過去 5 分間に確認された一意の ASM Fargate タスク。 |
| CI Visibility パイプラインのコミッター | `datadog.estimated_usage.ci_visibility.pipeline.committers` | (暦) 月累計の確認されたパイプラインコミッター。 |
| CI Visibility テストのコミッター | `datadog.estimated_usage.ci_visibility.test.committers` | (暦) 月累計の確認されたテストコミッター。 |
| IOT デバイス                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | 過去 1 時間に確認された一意の IoT デバイス。 |
| Observability Pipelines の取り込みバイト数 | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | 観測可能性パイプラインによって取り込まれたデータの量 |
| カスタムイベント                   | `datadog.estimated_usage.events.custom_events` | 送信されたカスタムイベントの量 |
| 取り込みイベント                        | `datadog.estimated_usage.events.ingested_events` | イベントによって取り込まれたデータの量 |

{{< img src="account_management/billing/usage-metrics-02.png" alt="メトリクス名" >}}

## ダッシュボード

これらのメトリクスを用いた有用なクエリを備えた、すぐに使える推定使用量ダッシュボードが利用可能です。ダッシュボードをクローンすることで、使用量メトリクスのモニタリングを簡単に始められます。これらのダッシュボードを見つけるには、[ダッシュボードプリセットリスト][5]に移動し、「Estimated Usage」というキーワードで検索してください。

## 複数組織の使用

複数の組織を持つアカウントの場合、`from` フィールドを使用して子組織の推定使用量をロールアップし、アカウント全体の使用量を監視できます。

{{< img src="account_management/billing/usage-metrics-03.png" alt="複数組織の使用" >}}

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][1]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][2]マネージャーにお問い合わせください。

[1]: /ja/help/
[2]: mailto:success@datadoghq.com
[3]: /ja/monitors/types/metric/?tab=threshold
[4]: /ja/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage