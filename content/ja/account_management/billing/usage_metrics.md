---
title: 推定使用量メトリクス
kind: documentation
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

| 使用タイプ           | メトリクス                                   |
|----------------------|------------------------------------------|
| インフラストラクチャーホスト | `datadog.estimated_usage.hosts`          |
| コンテナ           | `datadog.estimated_usage.containers`     |
| カスタムメトリクス       | `datadog.estimated_usage.metrics.custom` |
| ログ取り込みバイト  | `datadog.estimated_usage.logs.ingested_bytes`          |
| ログ取り込みイベント | `datadog.estimated_usage.logs.ingested_events`   |
| APM ホスト            | `datadog.estimated_usage.apm_hosts`      |
| APM インデックス化スパン   | `datadog.estimated_usage.apm.indexed_spans` |
| APM 取り込みバイト   | `datadog.estimated_usage.apm.ingested_bytes` |
| APM 取り込みスパン   | `datadog.estimated_usage.apm.ingested_spans` |
| サーバーレス Lambda 関数 | `datadog.estimated_usage.serverless.aws_lambda_functions` |

ログベースの使用量メトリクスは、[メトリクスの生成][1]ページから手動で有効にする必要があります。

{{< img src="account_management/billing/usage-metrics-02.png" alt="メトリクス名" >}}

## 複数組織の使用

複数の組織を持つアカウントの場合、`from` フィールドを使用して子組織の推定使用量をロールアップし、アカウント全体の使用量を監視できます。

{{< img src="account_management/billing/usage-metrics-03.png" alt="複数組織の使用" >}}

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][2]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][3]マネージャーにお問い合わせください。

[1]: /ja/logs/logs_to_metrics/#recommended-usage-metrics
[2]: /ja/help/
[3]: mailto:success@datadoghq.com