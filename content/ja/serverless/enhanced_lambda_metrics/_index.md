---
title: 拡張 Lambda メトリクス
aliases:
  - /ja/serverless/real-time-enhanced-metrics
  - /ja/serverless/real_time_enhanced_metrics
kind: ドキュメント
---
{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda 拡張メトリクスデフォルトダッシュボード" >}}

## 概要

[Datadog Lambda ライブラリ][1]と [Datadog Lambda Extension][2] (Node.js および Python) または [Datadog Forwarder][3] (その他の Lambda ランタイム) は、Node.js、Python、Ruby、Java、Go アプリケーション用の拡張 Lambda メトリクスを、低レイテンシー、数秒の粒度、そしてコールドスタートとカスタムタグの詳細なメタデータ付きで生成します。

拡張 Lambda メトリクスは、AWS Lambda インテグレーションで有効になっているデフォルトの [Lambda メトリクス][4]を超えるビューを提供します。これらのメトリクスは、`aws.lambda.enhanced.*` ネームスペースにあることで識別が可能で、サーバーレスアプリケーションの健全性をリアルタイムでモニターするよう設定するためのベストプラクティスです。

### リアルタイムの拡張 Lambda メトリクス

次のリアルタイムの拡張 Lambda メトリクスが利用可能で、これらは `aws_account`、`region`、`functionname`、`cold_start`、`memorysize`、`executedversion`、`resource`、`runtime` でタグ付けされています。これらのメトリクスは[分布][5]で、`count`、`min`、`max`、`sum`、`avg` 集計を使用してクエリを実行できます。


`aws.lambda.enhanced.invocations`     
: イベントまたは呼び出し API コールに応答して関数が呼び出された回数を測定します。

`aws.lambda.enhanced.errors`          
: 関数のエラー（応答コード 4XX）が原因で失敗した呼び出しの数を測定します。

`aws.lambda.enhanced.max_memory_used` 
: 関数が使用するメモリの最大量 (mb) を測定します。

`aws.lambda.enhanced.duration`        
: 関数コードが呼び出しの結果として実行を開始してから、実行を停止するまでの経過秒数を測定します。

`aws.lambda.enhanced.billed_duration` 
: 請求対象となる関数が実行された時間を測定します (100 ミリ秒単位)。

`aws.lambda.enhanced.init_duration` 
: コールドスタート時の関数の初期化時間 (秒) を計測します。

`aws.lambda.enhanced.estimated_cost`  
: 関数呼び出しの推定総コスト (米ドル) を測定します。

`aws.lambda.enhanced.timeouts`  
: 関数がタイムアウトした回数を測定します。

`aws.lambda.enhanced.out_of_memory`  
: 関数がメモリー不足になった回数を測定します。

**注:** [Datadog Lambda 拡張機能][2]を使用していない場合、拡張メトリクスは CloudWatch Logs を介して Datadog Forwarder に送信されます。つまり、CloudWatch のログの量が増加します。これは AWS の請求額に影響する場合があります。オプトアウトするには、AWS Lambda 関数で `DD_ENHANCED_METRICS` 環境変数を `false` に設定します。

## 拡張 Lambda メトリクスの有効化

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からの拡張メトリクスの収集" >}}

[インストール手順][6]に従ってサーバーレスアプリケーションのインスツルメンテーションをセットアップすると、拡張 Lambda メトリクスがデフォルトで有効になります。

**注**: ご使用の関数のログを Datadog に送信せず、Datadog Forwarder を介して拡張 Lambda メトリクスを有効にするには、[Datadog Forwarder][3] で `DD_FORWARD_LOG` 環境変数を `false` に設定します。

## ダッシュボードの表示

拡張 Lambda メトリクスが有効化されると、[Datadog アプリにデフォルトのダッシュボード][7]に表示されます。

[1]: /ja/serverless/datadog_lambda_library
[2]: /ja/serverless/libraries_integrations/extension
[3]: /ja/serverless/forwarder/
[4]: /ja/integrations/amazon_lambda/#metric-collection
[5]: /ja/metrics/distributions/
[6]: /ja/serverless/installation/
[7]: https://app.datadoghq.com/screen/integration/30306