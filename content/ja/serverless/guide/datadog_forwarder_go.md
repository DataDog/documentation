---
title: Datadog Forwarder を使用した Go サーバーレスアプリケーションのインスツルメンテーション
---
## 概要

<div class="alert alert-warning">
Datadog Serverless の新規ユーザーの場合、代わりに <a href="/serverless/installation/go">Datadog Lambda Extension を使用して Lambda 関数をインスツルメントする手順</a>に従ってください。Lambda がすぐに使える機能を提供する前に、Datadog Forwarder で Datadog Serverless をセットアップした場合は、このガイドを使用してインスタンスを維持してください。
</div>

## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、手順に従ってアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## コンフィギュレーション

### Install

次のコマンドを実行して、[Datadog Lambda ライブラリ][3]をローカルにインストールします。

```
go get github.com/DataDog/datadog-lambda-go
```

### インスツルメントする

関数をインスツルメントするには、次の手順に従います。

1. 環境変数 `DD_FLUSH_TO_LOG` と `DD_TRACE_ENABLED` を `true` に設定します。
2. Lambda 関数ハンドラーを宣言するファイルに必要なパッケージをインポートします。

    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      "github.com/DataDog/datadog-lambda-go"
      "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    )
    ```
3. Datadog Lambda ライブラリが提供するラッパーを使用して、Lambda 関数ハンドラーをラップします。

    ```go
    func main() {
      // Wrap your lambda handler like this
      lambda.Start(ddlambda.WrapHandler(myHandler, nil))
      /* OR with manual configuration options
      lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
        BatchInterval: time.Second * 15
        APIKey: "my-api-key",
      }))
      */
    }
    ```
4. 含まれているライブラリを使用して、追加のスパンを作成し、ログとトレースを接続し、トレースコンテキストを他のサービスに渡します。
    ```go
    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // Trace an HTTP request
      req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
      client := http.Client{}
      client = *httptrace.WrapClient(&client)
      client.Do(req)

      // Connect your Lambda logs and traces
      currentSpan, _ := tracer.SpanFromContext(ctx)
      log.Printf("my log message %v", currentSpan)

      // Create a custom span
      s, _ := tracer.StartSpanFromContext(ctx, "child.span")
      time.Sleep(100 * time.Millisecond)
      s.Finish()
    }
    ```

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][4]。

### タグ

これはオプションですが、Datadog は、[統合サービスタグ付け][5]向けに、サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることをお勧めします。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][6] でメトリクス、ログ、トレースを確認できるようになります。

## カスタムビジネスロジックの監視

カスタムメトリクスの送信をご希望の場合は、以下のコード例をご参照ください。

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // ハンドラー関数をラップします
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // カスタムメトリクスを送信します
  ddlambda.Metric(
    "coffee_house.order_value", // メトリクス名
    12.45, // メトリクス値
    "product:latte", "order:online" // 関連タグ
  )

  // Submit a custom metric with timestamp
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value", // メトリクス名
    12.45, // メトリクス値
    time.Now(), // タイムスタンプ、過去 20 分以内である必要があります
    "product:latte", "order:online" // Associated tags
  )

  req, err := http.NewRequest("GET", "http://example.com/status")

  // Datadog 分散型トレーシングヘッダを追加
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

[カスタムメトリクスの送信][7]に関する詳細を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: https://app.datadoghq.com/functions
[7]: /ja/serverless/custom_metrics?tab=go