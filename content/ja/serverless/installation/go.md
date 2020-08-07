---
title: Go アプリケーションのインスツルメンテーション
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
  - link: serverless/installation/dotnet
    tag: Documentation
    text: .NET サーバーレスモニタリングのインストール
  - link: serverless/installation/java
    tag: Documentation
    text: Java サーバーレスモニタリングのインストール
---
[AWS インテグレーションをインストール][1]したら、以下のいずれかの方法に従いアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## 構成

### Datadog Lambda ライブラリのインストール

以下のコマンドを実行し、[Datadog Lambda ライブラリ][2]をローカルでインポートできます。

```
go get github.com/DataDog/datadog-lambda-go
```

### 関数の構成

1. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
1. Lambda 関数の [AWS X-Ray アクティブトレース][3]を有効にします。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][4]。
2. [DdFetchLambdaTags のオプションが有効であることを確認します[5]。
3. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless ページ][7]でメトリクス、ログ、トレースを確認できるようになるはずです。カスタムメトリクスを送信する必要がある場合は、以下のコード例をご参照ください。

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

  req, err := http.NewRequest("GET", "http://example.com/status")

  // Datadog 分散型トレーシングヘッダを追加
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

[1]: /ja/serverless/#1-install-the-cloud-integration
[2]: https://github.com/DataDog/datadog-lambda-go
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[4]: https://docs.datadoghq.com/ja/serverless/forwarder/
[5]: https://docs.datadoghq.com/ja/serverless/forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://app.datadoghq.com/functions