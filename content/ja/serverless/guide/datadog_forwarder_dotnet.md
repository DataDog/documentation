---
title: Datadog Forwarder を使用した .NET サーバーレスアプリケーションのインスツルメンテーション
---
## 概要

<div class="alert alert-warning">
Datadog Serverless の新規ユーザーの場合、代わりに <a href="/serverless/installation/dotnet">Datadog Lambda Extension を使用して Lambda 関数をインスツルメントする手順</a>に従ってください。Lambda がすぐに使える機能を提供する前に、Datadog Forwarder で Datadog Serverless をすでにセットアップした場合は、このガイドを使用してインスタンスを維持してください。
</div>

## 前提条件

[Datadog Forwarder Lambda 関数][1]は、AWS Lambda 拡張メトリクス、カスタムメトリクス、ログの取り込みに必要です。

## X-Ray トレーシングを有効にする

1. Lambda 関数の [AWS X-Ray アクティブトレース][2]を有効にします。
2. [.NET 向け AWS X-Ray SDK][3] をインストールします。

## Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数を[サブスクライブ][4]します。

## 次のステップ

- [Serverless Homepage][5] でメトリクス、ログ、トレースを見ることができるようになりました。
- [カスタムビジネスロジックの監視](#monitor-custom-business-logic)のサンプルコードを参照してください。
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][6]を参照してください。

## カスタムビジネスロジックの監視

Datadog Forwarder を使用して[カスタムメトリクス][7]を送信したい場合は、以下のサンプルコードを参照してください。

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```


[1]: /ja/serverless/forwarder
[2]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[5]: https://app.datadoghq.com/functions
[6]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[7]: /ja/serverless/custom_metrics