---
title: .NET アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
  - link: serverless/installation/python
    tag: Documentation
    text: Python サーバーレスモニタリングのインストール
  - link: serverless/installation/go
    tag: Documentation
    text: Go サーバーレスモニタリングのインストール
  - link: serverless/installation/java
    tag: Documentation
    text: Java サーバーレスモニタリングのインストール
---
[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、以下の手順に従ってアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## 構成

### 関数の構成

1. Lambda 関数の [AWS X-Ray アクティブトレース][3]を有効にします。
2. [.NET 向け AWS X-Ray SDK][4] をインストールします。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [DdFetchLambdaTags のオプションが有効であることを確認します][5]。
3. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][7] でメトリクス、ログ、トレースを確認できるようになるはずです。

カスタムメトリクスの送信をご希望の場合は、以下のコード例をご参照ください。

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```

[1]: /ja/serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[5]: https://docs.datadoghq.com/ja/serverless/forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://app.datadoghq.com/functions