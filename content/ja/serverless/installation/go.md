---
aliases:
- /ja/serverless/datadog_lambda_library/go/
further_reading:
- link: /serverless/configuration
  tag: Documentation
  text: サーバーレスモニタリングの構成
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentation
  text: サーバーレスモニタリングのトラブルシューティング
- link: serverless/custom_metrics/
  tag: Documentation
  text: サーバーレスアプリケーションからのカスタムメトリクスの送信
kind: ドキュメント
title: Go サーバーレスアプリケーションのインスツルメンテーション
---

<div class="alert alert-warning">Go Lambda 関数がまだランタイム <code>go1.x</code> を使用していて、<code>provided.al2</code> ランタイムに移行できない場合、代わりに <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">Datadog Forwarder を使用してインスツルメントする</a>必要があります。</div>

<div class="alert alert-warning">Lambda 関数が公共のインターネットにアクセスできない VPC にデプロイされている場合、<code>datadoghq.com</code> <a href="/getting_started/site/">Datadog サイト</a>には <a href="/agent/guide/private-link/">AWS PrivateLink</a> を、それ以外のサイトには<a href="/agent/proxy/">プロキシを使用</a>してデータを送信することができます。</div>

## インストール

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、[Datadog Lambda 拡張機能][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を自動的に構成します。

Datadog サーバーレスプラグインをインストールして構成するには、次の手順に従います。

### Datadog サーバーレスプラグインをインストールします。

```sh
serverless plugin install --name serverless-plugin-datadog
```

### `serverless.yml` を更新します:

```yaml
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。
- `<DATADOG_SITE>` を、テレメトリーの送信先となる [Datadog サイト][3]に置き換えます。
- `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][4]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

詳細および追加設定については、[プラグインドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}
### Datadog Lambda 拡張機能のインストール

AWS のリージョンやアーキテクチャに応じた ARN 形式で、Datadog Lambda 拡張機能の [Lambda レイヤーを Lambda 関数に追加][1]します。

```sh
# AWS 商用リージョンにデプロイされた x86 ベースの Lambda にはこの形式を使用します
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# AWS 商用リージョンにデプロイされた arm64 ベースの Lambda にはこの形式を使用します
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# AWS GovCloud リージョンにデプロイされた x86 ベースの Lambda にはこの形式を使用します
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# AWS GovCloud リージョンにデプロイされた arm64 ベースの Lambda にはこの形式を使用します
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```

`<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。

### 必要な環境変数を構成する

- `DD_SITE` を、テレメトリーの送信先となる [Datadog サイト][2]に設定します。
- `DD_API_KEY_SECRET_ARN` を、[Datadog API キー][3]が安全に保存されている AWS シークレットの ARN に設定します。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `DD_API_KEY` を使用して、Datadog API キーをプレーンテキストで設定することができます。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/ja/getting_started/site/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Datadog Lambda ライブラリのインストール

```
go get github.com/DataDog/datadog-lambda-go
```

### Lambda 関数のコードを更新する

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
)

func main() {
  // Lambda ハンドラーをラップします
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // HTTP リクエストをトレースします
  req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
  client := http.Client{}
  client = *httptrace.WrapClient(&client)
  client.Do(req)

  // カスタムメトリクスを送信します
  ddlambda.Metric(
    "coffee_house.order_value", // メトリクス名
    12.45, // メトリクス値
    "product:latte", "order:online" // 関連タグ
  )

  // カスタムスパンを作成します
  s, _ := tracer.StartSpanFromContext(ctx, "child.span")
  time.Sleep(100 * time.Millisecond)
  s.Finish()
}
```

## 次のステップ

- おめでとうございます。[Serverless Homepage][1] でメトリクス、ログ、トレースを見ることができるようになりました。
- テレメトリーの収集に問題がある場合は、[トラブルシューティングガイド][2]を参照してください
- [高度な構成][3]を参照して以下のことを行ってください。
    - タグを使ったテレメトリー接続
    - AWS API Gateway、SQS などのテレメトリーを収集する
    - Lambda のリクエストとレスポンスのペイロードを取得する
    - Lambda 関数のエラーをソースコードにリンクする
    - ログまたはトレースから機密情報をフィルタリングまたはスクラブする

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ja/serverless/configuration/