---
title: .NET アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: serverless/serverless_tagging/
    tag: サーバーレス
    text: サーバーレスアプリケーションのタグ付け
  - link: serverless/distributed_tracing/
    tag: サーバーレス
    text: サーバーレスアプリケーションのトレース
  - link: serverless/custom_metrics/
    tag: サーバーレス
    text: サーバーレスアプリケーションからのカスタムメトリクスの送信
---
## 必須セットアップ

まだ構成が済んでいない場合は、[AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。[AWS インテグレーション][1]をインストールしたら、手順に従いアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## コンフィギュレーション

### Datadog Lambda 拡張機能のインストール

次の形式の ARN を使用して、[Datadog Lambda 拡張機能][2]を Lambda 関数に Lambda レイヤーとしてインストールします。

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
```

`EXTENSION_VERSION` については、[最新リリース][3]を参照してください。

### 関数の構成

1. Lambda 関数の [AWS X-Ray アクティブトレース][4]を有効にします。
2. [.NET 向け AWS X-Ray SDK][5] をインストールします。
3. 環境変数 `DD_API_KEY` を追加し、[API 管理ページ][6]で Datadog API キーに値を設定します。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][7] でメトリクス、ログ、トレースを確認できるようになるはずです。

### タグ

これはオプションですが、Datadog は、[統合サービスタグ付けのドキュメント][8]に従って、サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

### AWS サーバーレスリソースからログを収集

AWS Lambda 関数以外のマネージドリソースで生成されたサーバーレスログは、サーバーレスアプリケーションの問題の根本的な原因を特定するのに役立ちます。お使いの環境の以下のマネージドリソースからログを転送することをお勧めします。
- API: API Gateway、AppSync、ALB
- クエリとストリーム: SQS、SNS、Kinesis
- データストア: DynamoDB、S3、RDS など

Lambda 以外の AWS リソースからログを収集するには、[Datadog Forwarder][9] をインストールして構成し、マネージドリソースの各 CloudWatch ロググループにサブスクライブさせます。

### カスタムビジネスロジックの監視

カスタムメトリクスの送信をご希望の場合は、以下のコード例をご参照ください。

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```

カスタムメトリクスの送信について、詳しくは[こちら][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/libraries_integrations/extension/
[3]: https://gallery.ecr.aws/datadog/lambda-extension
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://app.datadoghq.com/functions
[8]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: /ja/serverless/libraries_integrations/forwarder
[10]: /ja/serverless/custom_metrics?tab=otherruntimes