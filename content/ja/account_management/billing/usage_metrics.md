---
kind: documentation
title: 推定使用量メトリクス
---

## 概要

Datadog は、現在の推定使用量をほぼリアルタイムで計算します。推定使用量メトリクスにより、次のことが可能になります。

* 推定使用量をグラフ化します
* 選択したしきい値に基づいて、推定使用量の付近のモニターを作成します
* 使用量の急上昇または低下の即時アラートを取得します
* コードの変更が使用量に及ぼす潜在的な影響をほぼリアルタイムで評価します

**注**: これらの使用量メトリクスはあくまでも推定値であり、リアルタイムという性質上、請求対象の使用量に必ずしも一致しません。推定使用量と請求対象使用量には平均で 10〜20% の差があります。推定であるため、使用量が少ないと誤差の範囲はより大きくなります。

{{< img src="account_management/billing/usage-metrics-01.png" alt="ダッシュボード例" >}}

## 使用のタイプ

推定使用量メトリクスは、通常、次の使用タイプで使用できます。

| 使用タイプ                    | メトリクス                                   |
|-------------------------------|------------------------------------------|
| インフラストラクチャーホスト          | `datadog.estimated_usage.hosts`          |
| コンテナ                    | `datadog.estimated_usage.containers`     |
| インデックスされたカスタムメトリクス        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` |
| ログ取り込みバイト           | `datadog.estimated_usage.logs.ingested_bytes`    |
| ログ取り込みイベント          | `datadog.estimated_usage.logs.ingested_events`   |
| 分析ログ (セキュリティ)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes`   |
| APM ホスト                     | `datadog.estimated_usage.apm_hosts` (Azure App Services ホストは含まれません)      |
| APM インデックス化スパン             | `datadog.estimated_usage.apm.indexed_spans` |
| APM 取り込みバイト            | `datadog.estimated_usage.apm.ingested_bytes` |
| APM 取り込みスパン            | `datadog.estimated_usage.apm.ingested_spans` |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions`  |
| サーバーレス Lambda 関数   | `datadog.estimated_usage.serverless.aws_lambda_functions` |
| サーバーレス呼び出し        | `datadog.estimated_usage.serverless.invocations`|
| API テストの実行                 | `datadog.estimated_usage.synthetics.api_test_runs` |
| ブラウザテストの実行             | `datadog.estimated_usage.synthetics.browser_test_runs`|
| Network Hosts                 | `datadog.estimated_usage.network.hosts` |
| Network Devices               | `datadog.estimated_usage.network.devices` |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts` |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers` |
| CSPM ホスト                    | `datadog.estimated_usage.cspm.hosts` |
| CSPM コンテナ               | `datadog.estimated_usage.cspm.containers` |
| CWS ホスト                     | `datadog.estimated_usage.cws.hosts` |
| CWS コンテナ                | `datadog.estimated_usage.cws.containers` | 
| データベースホスト                | `datadog.estimated_usage.dbm.hosts` |
| ASM ホスト                     | `datadog.estimated_usage.asm.hosts` |
| インシデント管理 (アクティブユーザー)   | `datadog.estimated_usage.incident_management.active_users` |
| CI Visibility                 | `datadog.estimated_usage.ci_visibility.pipeline.committers`、`datadog.estimated_usage.ci_visibility.test.committers` |


{{< img src="account_management/billing/usage-metrics-02.png" alt="メトリクス名" >}}

## 複数組織の使用

複数の組織を持つアカウントの場合、`from` フィールドを使用して子組織の推定使用量をロールアップし、アカウント全体の使用量を監視できます。

{{< img src="account_management/billing/usage-metrics-03.png" alt="複数組織の使用" >}}

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][1]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][2]マネージャーにお問い合わせください。

[1]: /ja/help/
[2]: mailto:success@datadoghq.com