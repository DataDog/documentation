---
aliases:
- /ja/serverless/real-time-enhanced-metrics
- /ja/serverless/real_time_enhanced_metrics
title: 拡張 Lambda メトリクス
---

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Lambda 拡張メトリクスデフォルトダッシュボード" >}}

## 概要

Datadog は、低レイテンシー、数秒単位の粒度、コールドスタートやカスタムタグの詳細なメタデータを備えた Lambda ランタイムから、強化された Lambda メトリクスをすぐに生成します。

拡張 Lambda メトリクスは、AWS Lambda インテグレーションで有効になっているデフォルトの [Lambda メトリクス][1]を超えるビューを提供します。これらのメトリクスは、`aws.lambda.enhanced.*` ネームスペースにあることで識別が可能で、サーバーレスアプリケーションの健全性をリアルタイムでモニターするよう設定するための Datadog のベストプラクティスです。

### リアルタイムの拡張 Lambda メトリクス

次のリアルタイムの拡張 Lambda メトリクスが利用可能で、これらは `aws_account`、`region`、`functionname`、`cold_start`、`memorysize`、`executedversion`、`resource`、`runtime` でタグ付けされています。これらのメトリクスは[分布][2]で、`count`、`min`、`max`、`sum`、`avg` 集計を使用してクエリを実行できます。


`aws.lambda.enhanced.invocations`
: イベントまたは API コールの呼び出しに応答して関数が呼び出された回数を測定します。

`aws.lambda.enhanced.errors`
: 関数のエラーが原因で失敗した呼び出しの数を測定します。

`aws.lambda.enhanced.max_memory_used`
: 関数が使用するメモリの最大量 (mb) を測定します。

`aws.lambda.enhanced.duration`
: 関数コードが呼び出しの結果として実行を開始してから、実行を停止するまでの経過秒数を測定します。

`aws.lambda.enhanced.billed_duration`
: 請求対象となる関数が実行された時間を測定します (100 ミリ秒単位)。

`aws.lambda.enhanced.init_duration`
: コールドスタート時の関数の初期化時間 (秒) を計測します。

`aws.lambda.enhanced.runtime_duration`
: 関数のコードが実行を開始してから、クライアントにレスポンスを返すまでの経過ミリ秒を測定します。ただし、Lambda 拡張機能の実行によって追加されるランタイム後の時間は除きます。

`aws.lambda.enhanced.post_runtime_duration`
: 関数コードがクライアントに応答を返してから、関数の実行が停止するまでの経過ミリ秒を測定し、Lambda 拡張機能の実行によって追加される時間を表します。

`aws.lambda.enhanced.response_latency`
: 呼び出しリクエストを受信してから、レスポンスの最初のバイトがクライアントに送信されるまでの経過時間をミリ秒単位で測定します。

`aws.lambda.enhanced.response_duration`
: レスポンスの最初のバイトがクライアントに送信されてから、レスポンスの最後のバイトがクライアントに送信されるまでの経過時間をミリ秒単位で測定します。

`aws.lambda.enhanced.produced_bytes`
: 関数が返すバイト数を測定します。

`aws.lambda.enhanced.estimated_cost`
: 関数呼び出しの推定総コスト (米ドル) を測定します。

`aws.lambda.enhanced.timeouts`
: 関数がタイムアウトした回数を測定します。

`aws.lambda.enhanced.out_of_memory`
: 関数がメモリー不足になった回数を測定します。

## 拡張 Lambda メトリクスの有効化

{{< img src="serverless/serverless_custom_metrics.png" alt="AWS Lambda からの拡張メトリクスの収集" >}}

[インストール手順][3]に従ってサーバーレスアプリケーションのインスツルメンテーションをセットアップします。拡張 Lambda メトリクスはデフォルトで有効です。

## ダッシュボードの表示

拡張 Lambda メトリクスが有効化されると、[Datadog アプリにデフォルトのダッシュボード][4]に表示されます。

[1]: /ja/integrations/amazon_lambda/#metric-collection
[2]: /ja/metrics/distributions/
[3]: /ja/serverless/installation/
[4]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics