---
further_reading:
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#measuring-the-impact-of-our-optimizations
  tag: ブログ
  text: 'Datadog の大規模な最適化: Zendesk におけるコスト効率の良い監視可能性'
title: 推定使用量メトリクス
---
<style>tbody code {word-break: break-word !important;}</style>

## 概要 {#overview}

Datadog は、現在の推定使用量をほぼリアルタイムで計算します。推定使用量メトリクスにより、次のことが可能になります。

* 推定使用量をグラフ化する
* 選択したしきい値に基づいて、推定使用量の付近の[モニター][3]を作成する
* 使用量の急上昇または低下の[モニターアラート][4]を取得する
* コードの変更が使用量に及ぼす潜在的な影響をほぼリアルタイムで評価する

**注**: これらの使用量メトリクスはあくまでも推定値であり、リアルタイムという性質上、請求対象の使用量に必ずしも一致しません。推定使用量と請求対象使用量には平均で 10〜20% の差があります。推定であるため、使用量が少ないと誤差の範囲はより大きくなります。

{{< img src="account_management/billing/usage-metrics-01.png" alt="ダッシュボードの例" >}}

## 使用のタイプ {#types-of-usage}

推定使用量メトリクスは通常、次の使用タイプで使用できます。

| 使用タイプ                    | メトリクス                                   | 説明 |
|-------------------------------|------------------------------------------| ----------- |
| Infrastructure ホスト          | `datadog.estimated_usage.hosts`、`datadog.estimated_usage.hosts.by_tag`          | 過去 1 時間に確認された一意のホスト。|
| Containers                    | `datadog.estimated_usage.containers`、`datadog.estimated_usage.containers.by_tag`     | 過去 1 時間に確認された一意のコンテナ。|
| Fargate タスク                 | `datadog.estimated_usage.fargate_tasks`、`datadog.estimated_usage.fargate_tasks.by_tag`  | 過去 5 分間に確認された一意の Fargate タスクです。<br/><br/>**注**: このメトリクスは ECS Fargate と EKS Fargate の両方の使用状況を追跡します。|
| インデックスされた Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`、`datadog.estimated_usage.metrics.custom.by_tag`  | 過去 1 時間に確認された一意のインデックスされた Custom Metrics。|
| 取り込まれた Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`、`datadog.estimated_usage.metrics.custom.ingested.by_tag`  | 過去 1 時間に確認された一意の取り込まれた Custom Metrics。|
| (プレビュー) インデックスされた Custom Metrics ポイント | `datadog.estimated_usage.metrics.points.indexed`、`datadog.estimated_usage.metrics.points.indexed.by_tag`、`datadog.estimated_usage.metrics.points.indexed.hourly` | Custom Metrics の推定インデックス化ポイント。|
| (プレビュー) 取り込まれた Custom Metrics ポイント | `datadog.estimated_usage.metrics.points.ingested`、`datadog.estimated_usage.metrics.points.ingested.hourly` | Custom Metrics の推定取り込みポイント。|
| (プレビュー) 請求対象メトリクス名 | `datadog.estimated_usage.billable.metrics` | 100 以上のインデックス化ポイントを持つメトリクス名の月累計カウント。[メトリクス名の料金][7]を使用している組織に適用されます。|
| (プレビュー) 請求対象インデックス化ポイント | `datadog.estimated_usage.billable.points` | メトリクス名あたりに含まれる 1000 万ポイントを超えるインデックス化ポイントの月累計の合計。[メトリクス名の料金][7]を使用している組織に適用されます。|
| (プレビュー) 取り込みポイントとインデックス化ポイントの比率 | `datadog.estimated_usage.metrics.points.ratio` | 取り込まれたポイントの合計とインデックスされたポイントの合計の比較。[メトリクス名の料金][7]を使用している組織に適用されます。|
| ログ取り込みバイト | `datadog.estimated_usage.logs.ingested_bytes` | バイト単位のログの取り込みの合計。|
|  ログ取り込みイベント | `datadog.estimated_usage.logs.ingested_events` | 除外されたログを含む、取り込まれたイベントの総数。|
| ログパイプラインバイト | `datadog.estimated_usage.logs.ingested_bytes` | バイト単位のパイプラインによって一致したログの数。|
| ログパイプラインイベント | `datadog.estimated_usage.logs.ingested_events` | 除外されたログを含む、バイト単位のパイプラインによって一致したイベントの数。|
| 削除ログ数 | `datadog.estimated_usage.logs.drop_count` | 取り込み中に削除されたイベントの総数。|
| 切り捨てログ数 | `datadog.estimated_usage.logs.truncated_count` | 取り込み時に切り捨てられたイベントの総数。|
| 切り捨てログバイト数 | `datadog.estimated_usage.logs.truncated_bytes` | バイト単位の切り捨てイベントの量。|
| Error Tracking ログイベント    | `datadog.estimated_usage.error_tracking.logs.events` | Error Tracking に取り込まれたエラーログの量。|
| 分析ログ (セキュリティ) | `datadog.estimated_usage.security_monitoring.analyzed_bytes` |  バイト単位の Cloud SIEM ログの取り込みの合計。|
| APM ホスト                     | `datadog.estimated_usage.apm_hosts`、`datadog.estimated_usage.apm_hosts.by_tag` | 過去 1 時間に確認された一意の APM ホスト。Azure App Services ホストは含まれません。|
| APM インデックス化スパン | `datadog.estimated_usage.apm.indexed_spans` |  タグ付ベースの保持フィルターによってインデックス化されたスパンの総数。|
| APM 取り込みバイト | `datadog.estimated_usage.apm.ingested_bytes` | バイト単位の取り込まれたスパンの量。|
| APM 取り込みスパン | `datadog.estimated_usage.apm.ingested_spans` | 取り込まれたスパンの総数。|
| APM Fargate タスク | `datadog.estimated_usage.apm.fargate_tasks`、`datadog.estimated_usage.apm.fargate_tasks.by_tag` | 過去 5 分間に確認された一意の APM Fargate タスク。|
| RUM セッション | `datadog.estimated_usage.rum.sessions` | RUM セッションの総数。|
| RUM 取り込みセッション         | `datadog.estimated_usage.rum.ingested_sessions` | 取り込まれた RUM セッションの総数。<br /><br />**注**: RUM without Limits に適用されます。|
| RUM インデックス化セッション          | `datadog.estimated_usage.rum.indexed_sessions` | 保持フィルターによってインデックスされた RUM セッションの総数。<br /><br />**注**: RUM without Limits に適用されます。|
| サーバーレス Lambda 関数   | `datadog.estimated_usage.serverless.aws_lambda_functions`、`datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | 過去 1 時間に確認された一意のサーバーレス関数。|
| サーバーレス呼び出し        | `datadog.estimated_usage.serverless.invocations`| 過去 1 時間のサーバーレス呼び出しの合計。|
| API テスト実行                 | `datadog.estimated_usage.synthetics.api_test_runs` | API テストの推定使用量。|
| ブラウザテスト実行             | `datadog.estimated_usage.synthetics.browser_test_runs`| ブラウザテストの推定使用量。|
| 並列テストスロット        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | 並列テストスロットの推定使用量。|
| ネットワークホスト                 | `datadog.estimated_usage.network.hosts`、`datadog.estimated_usage.network.hosts.by_tag` | 過去 1 時間に確認された一意の CNM ホスト。|
| ネットワークデバイス               | `datadog.estimated_usage.network.devices`、`datadog.estimated_usage.network.devices.by_tag` | 過去 1 時間に確認された一意の NDM デバイス。|
| プロファイルされたホスト                | `datadog.estimated_usage.profiling.hosts`、`datadog.estimated_usage.profiling.hosts.by_tag` | 過去 1 時間に確認された一意のプロファイリングホスト。|
| プロファイルされたコンテナ           | `datadog.estimated_usage.profiling.containers`、`datadog.estimated_usage.profiling.containers.by_tag` | 過去 5 分間に確認された一意のプロファイリングコンテナ。|
| プロファイラー Fargate タスク        | `datadog.estimated_usage.profiling.fargate_tasks`、`datadog.estimated_usage.profiling.fargate_tasks.by_tag` | 過去 5 分間に確認された一意のプロファイリング Fargate タスク。|
| CSPM ホスト                    | `datadog.estimated_usage.cspm.hosts`、`datadog.estimated_usage.cspm.hosts.by_tag` | 過去 1 時間に確認された一意の CSPM ホスト。|
| CSPM コンテナ               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | 過去 5 分間に確認された一意の CSPM コンテナ。|
| CWS ホスト                     | `datadog.estimated_usage.cws.hosts`、`datadog.estimated_usage.cws.hosts.by_tag` | 過去 1 時間に確認された一意の CWS ホスト。|
| CWS コンテナ                | `datadog.estimated_usage.cws.containers`、`datadog.estimated_usage.cws.containers.by_tag` | 過去 5 分間に確認された一意の CWS コンテナ。|
| データベースホスト                | `datadog.estimated_usage.dbm.hosts`、`datadog.estimated_usage.dbm.hosts.by_tag` | 過去 1 時間に確認された一意の DBM ホスト。|
| AAP ホスト                     | `datadog.estimated_usage.asm.hosts`、`datadog.estimated_usage.asm.hosts.by_tag` | 過去 1 時間に確認された一意の AAP ホスト。|
| AAP タスク                     | `datadog.estimated_usage.asm.tasks`、`datadog.estimated_usage.asm.tasks.by_tag` | 過去 5 分間に確認された一意の AAP Fargate タスク。|
| CI Visibility パイプラインコミッター | `datadog.estimated_usage.ci_visibility.pipeline.committers` | (暦) 月累計の確認されたパイプラインコミッター。|
| CI Visibility テストコミッター | `datadog.estimated_usage.ci_visibility.test.committers` | (暦) 月累計の確認されたテストコミッター。|
| Code Coverage コミッター | `datadog.estimated_usage.code_coverage.committers` | (暦) 月累計の確認された Code Coverage コミッター。|
| IoT デバイス                   | `datadog.estimated_usage.iot.devices`、`datadog.estimated_usage.iot.devices.by_tag` | 過去 1 時間に確認された一意の IoT デバイス。|
| Observability Pipelines 取り込みバイト数 | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | 監視可能性パイプラインによって取り込まれたデータの量。|
| カスタムイベント                 | `datadog.estimated_usage.events.custom_events` | 送信されたカスタムイベントの量。|
| 取り込みイベント               | `datadog.estimated_usage.events.ingested_events` | イベントによって取り込まれたデータの量。|
| Code Security SAST コミッター | `datadog.estimated_usage.code_security.sast.committers` | (暦) 月累計の確認された SAST コミッター。|
| Code Security SCA コミッター  | `datadog.estimated_usage.code_security.sca.committers`  | (暦) 月累計の確認された SCA コミッター。 |
| Code Security SCA ホスト       | `datadog.estimated_usage.asm.vulnerability_oss_host`、`datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | 過去 1 時間に確認された一意の SCA ホスト。|
| Code Security Secret Scanning コミッター  | `datadog.estimated_usage.code_security.secrets.committers`  | (暦) 月累計の確認された Secret Scanning コミッター。 |
| Code Security IaC コミッター  | `datadog.estimated_usage.code_security.iac.committers`  | (暦) 月累計の確認された Infrastructure as Code (IaC) コミッター。 |
| Incident Management シート  | `datadog.estimated_usage.incident_management.seats`  | スタンドアロンの Incident Management 用ユーザーシート。 |
| Incident Management 月間アクティブユーザー  | `datadog.estimated_usage.incident_management.monthly_active_users`  | (暦) 月累計の確認された Incident Management の一意のアクティブユーザー (レガシー請求)。  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="メトリクス名" >}}

## by_tag 推定使用量メトリクスのタグ設定 {#setting-tags-for-your-by-tag-estimated-usage-metrics}
by_tag 推定使用量メトリクスにタグの内訳を設定するには、[使用属性][6]ページでチームや環境などの希望するタグを設定します (PRO プランの場合は、[カスタマーサクセスマネージャー][2]を通じてこの機能へのアクセスをリクエストできます)。変更内容は次の 00:00 UTC に反映されます。

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="使用属性における by_tag EUM タグの設定" >}}

## ダッシュボード {#dashboards}

これらのメトリクスを用いた有用なクエリを備えた、すぐに使える推定使用量ダッシュボードが利用可能です。ダッシュボードをクローンすることで、使用量メトリクスのモニタリングを簡単に始められます。これらのダッシュボードを見つけるには、[ダッシュボードプリセットリスト][5]に移動し、「Estimated Usage」というキーワードで検索してください。

## マルチオーガニゼーションの使用量 {#multi-org-usage}

複数の組織を持つアカウントの場合、`from` フィールドを使用して子組織の推定使用量をロールアップし、アカウント全体の使用量をモニターできます。

{{< img src="account_management/billing/usage-metrics-03.png" alt="マルチオーガニゼーションの使用量" >}}

## トラブルシューティング {#troubleshooting}

技術的な質問については、[Datadog のサポートチーム][1]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][2]マネージャーにお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: mailto:success@datadoghq.com
[3]: /ja/monitors/types/metric/?tab=threshold
[4]: /ja/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /ja/account_management/billing/usage_attribution/
[7]: /ja/account_management/billing/metric_name_pricing/