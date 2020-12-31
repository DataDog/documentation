---
dependencies:
- "https://github.com/DataDog/datadog-lambda-go/blob/master/README.md"
kind: ドキュメント
title: Go 向け Datadog Lambda ライブラリ
---
![build](https://github.com/DataDog/datadog-lambda-go/workflows/build/badge.svg)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/datadog-lambda-go)](https://codecov.io/gh/DataDog/datadog-lambda-go)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![Godoc](https://img.shields.io/badge/godoc-reference-blue.svg)](https://godoc.org/github.com/DataDog/datadog-lambda-go)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-go/blob/main/LICENSE)

Datadog Lambda Library for Go は、拡張 Lambda メトリクス、分散型トレーシング、および AWS Lambda 関数からのカスタムメトリクス送信を可能にします。

## インストール

[こちら](https://docs.datadoghq.com/serverless/installation/go/)のインストール手順に従ってください。

## 拡張メトリクス

[インストール](#installation)したら、Lambda 関数の拡張メトリクスを Datadog で表示できるはずです。

[Datadog Lambda 拡張メトリクス](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=go#real-time-enhanced-lambda-metrics)の公式ドキュメントをご覧ください。

## カスタムメトリクス

[インストール](#installation)したら、Lambda 関数からカスタムメトリクスを送信できるはずです。

[AWS Lambda 関数からカスタムメトリクスを送信する](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=go#custom-metrics)手順を確認してください。

## トレーシング

`DD_TRACE_ENABLED` 環境変数を `true` に設定して、Datadog トレースを有効にします。Datadog トレースが有効になっている場合、ライブラリは Lambda の実行を表すスパンをコンテキストオブジェクトに挿入します。次に、付属の `dd-trace-go` パッケージを使用して、コンテキストから追加のスパンを作成したり、コンテキストを他のサービスに渡したりできます。詳細については、[dd-trace-go ドキュメント](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace)を参照してください。

```
import (
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
)

func handleRequest(ctx context.Context, ev events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  // HTTP リクエストをトレースします
  req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
  client := http.Client{}
  client = *httptrace.WrapClient(&client)
  client.Do(req)

  // カスタムスパンを作成します
  s, _ := tracer.StartSpanFromContext(ctx, "child.span")
  time.Sleep(100 * time.Millisecond)
  s.Finish()
}
```

挿入されたスパンを使用して[ログとトレースを接続](https://docs.datadoghq.com/tracing/connect_logs_and_traces/go/)することもできます。

```
func handleRequest(ctx context.Context, ev events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  currentSpan, _ := tracer.SpanFromContext(ctx)
  log.Printf("my log message %v", currentSpan)
}
```

AWS X-Ray を使用して Lambda 関数をトレースしている場合は、`DD_MERGE_XRAY_TRACES` 環境変数を `true` に設定すると、Datadog は Datadog トレースと X-Ray トレースを単一の統合トレースにマージします。


## 環境変数

### DD_FLUSH_TO_LOG

[Datadog Forwarder](https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring) を利用して CloudWatch ログを介してカスタムメトリクスを非同期に (Lambda 関数の実行に追加のレイテンシーなしで) 送信するには、`true` に設定します (推奨)。デフォルトは `false` です。`false` に設定する場合、`DD_API_KEY` と `DD_SITE` も設定する必要があります。

### DD_API_KEY

`DD_FLUSH_TO_LOG` が `false` に設定されている場合 (非推奨)、Datadog API キーを定義する必要があります。

### DD_SITE

`DD_FLUSH_TO_LOG` が `false` に設定されており (非推奨)、データを Datadog EU サイトに送信する必要がある場合は、`DD_SITE` を `datadoghq.eu` に設定する必要があります。デフォルトは `datadoghq.com` です。

### DD_LOG_LEVEL

`debug` に設定すると、Datadog Lambda ライブラリからのデバッグログが有効になります。デフォルトは `info` です。

### DD_ENHANCED_METRICS

`aws.lambda.enhanced.invocations` や `aws.lambda.enhanced.errors` などの拡張 Datadog Lambda インテグレーションメトリクスを生成します。デフォルトは `true` です。

### DD_TRACE_ENABLED

`true` に設定されている場合は、Datadog トレーサーを初期化します。デフォルトは `false` です。

### DD_MERGE_XRAY_TRACES

X-Ray トレースと Datadog トレースの両方を使用している場合は、これを `true` に設定して、X-Ray トレースと Datadog トレースをマージします。デフォルトは `false` です。

## 問題を開く

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、datadog-lambda-go のバージョン、`go version`、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](https://github.com/DataDog/dd-lambda-go/blob/main/CONTRIBUTING.md)に従ってプルリクエストを開いてください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2020 Datadog, Inc.
