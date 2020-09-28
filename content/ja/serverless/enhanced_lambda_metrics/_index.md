---
title: 拡張 Lambda メトリクス
aliases:
  - /ja/serverless/real-time-enhanced-metrics
  - /ja/serverless/real_time_enhanced_metrics
kind: ドキュメント
---
{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda 拡張メトリクスデフォルトダッシュボード" >}}

## 概要

Datadog では、Node.js、Python、Ruby、Java、そして Go ランタイム用のリアルタイム Lambda ランタイムメトリクスを追加設定なしで生成できます。これらのメトリクスはデフォルトで有効ですが、非同期でのみ送信されます。

Datadog では、[Datadog Lambda ライブラリ][1]と [Datadog Forwarder][2] を使用して、低レイテンシー、数秒の粒度、およびコールドスタートとカスタムタグの詳細なメタデータを備えたメトリクスを生成できます。これらのメトリクスは、`aws.lambda.enhanced.*` ネームスペースにあることで識別が可能で、サーバーレスアプリケーションの健全性をリアルタイムにモニターするよう設定するためのベストプラクティスです。

拡張 Lambda メトリクスを使用すると、AWS Lambda インテグレーションで有効化されているデフォルトの [Amazon CloudWatch メトリクス][3]以上および以下のデータを確認することができます。

### リアルタイムの拡張 Lambda メトリクス

Datadog では、Node.js、Python、Ruby ランタイム用のリアルタイム Lambda ランタイムメトリクスを追加設定なしで生成できます。

Datadog では、Datadog Lambda レイヤーと Datadog Forwarder を使用して、低レイテンシー、数秒の粒度、およびコールドスタートとカスタムタグの詳細なメタデータを備えたメトリクスを生成できます。

| メトリクス                                  | 説明                                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **aws.lambda.enhanced.invocations**     | イベントまたは呼び出し API コールに応答して関数が呼び出された回数を測定します。                                                 |
| **aws.lambda.enhanced.errors**          | 関数のエラー（応答コード 4XX）が原因で失敗した呼び出しの数を測定します。                                                  |
| **aws.lambda.enhanced.max_memory_used** | 関数が使用するメモリの量を測定します。                                                                                                |
| **aws.lambda.enhanced.duration**        | 関数コードが呼び出しの結果として実行を開始してから、実行を停止するまでの平均経過時間を測定します。 |
| **aws.lambda.enhanced.billed_duration** | 請求対象となる関数が実行された時間を測定します（100 ミリ秒単位）。                                                                        |
| **aws.lambda.enhanced.init_duration** | コールドスタート時の関数の初期化時間を計測します。                                  |
| **aws.lambda.enhanced.estimated_cost**  | 関数呼び出しの推定総コスト（米ドル）を測定します。                                                                         |
| **aws.lambda.enhanced.timeouts**  | 関数がタイムアウトした回数を測定します。                        |
| **aws.lambda.enhanced.out_of_memory**  | 関数がメモリー不足になった回数を測定します。                        |

これらのメトリクスは、`functionname`、`cold_start`、`memorysize`、`region`、`account_id`、`allocated_memory`、`executedversion`、`resource`、`runtime` でタグ付けされています。これらは [DISTRIBUTION][10] タイプのメトリクスであるため、その `count`、`min`、`max`、`sum`、`avg` を表示できます。

**注:** 拡張メトリクスは、CloudWatch Logs を介して Datadog Forwarder に送信されます。つまり、CloudWatch のログの量が増加します。これは AWS の請求額に影響する場合があります。オプトアウトするには、AWS Lambda 関数で DD_ENHANCED_METRICS 環境変数を false に設定します。

## 拡張 Lambda メトリクスの有効化

{{< img src="serverless/integration/lambda_metrics.png" alt="Lambda メトリクスコレクション" >}}

Datadog は、Node.js、Python、Ruby、Java、Go ランタイム用のリアルタイム拡張 Lambda メトリクスをすぐに生成します。 [インストール手順][4]では、関数で拡張 Lambda メトリクスを有効にするために必要な手順を確認できます。

1. [AWS インテグレーション][5]をインストールします。
2. [Datadog Forwarder][6] をインストールします。
3. [Datadog Lambda ライブラリ][7]をインストールします。
4. [Datadog Forwarder を関数ロググループ][8]にサブスクライブします。

ご使用の関数のログを有効にせずに拡張 Lambda メトリクスを有効にするには、[Datadog Forwarder][6] で `DdForwarderLog` 環境変数が `false` に設定することをご確認ください。

## ダッシュボードの表示

拡張 Lambda メトリクスが有効化されると、[Datadog アプリにデフォルトのダッシュボード][9]に表示されます。

[1]: /ja/serverless/datadog_lambda_library
[2]: /ja/serverless/forwarder/
[3]: /ja/integrations/amazon_lambda/?tab=nodejs#metric-collection
[4]: /ja/serverless/installation/
[5]: /ja/integrations/amazon_web_services/#setup
[6]: /ja/serverless/forwarder
[7]: /ja/serverless/datadog_lambda_library
[8]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[9]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[10]: /ja/metrics/distributions/
