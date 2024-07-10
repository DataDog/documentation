---
aliases:
- /ja/tracing/connect_logs_and_traces/go
code_lang: go
code_lang_weight: 30
description: Go ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
title: Go ログとトレースの相関付け
type: multi-code-lang
---

## 手動挿入

Go トレーサーは、スパン情報と、`%v` 形式の指定子を使ったログステートメントの印刷を可能にします。

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // /posts URL にウェブリクエストようのスパンを作成。
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // スパン情報をログメッセージに付加:
    log.Printf("my log message %v", span)
}
```

上記の例は、標準ライブラリの `log` パッケージのスパンのコンテキストの使い方を説明しています。同様のロジックがサードパーティパッケージにも適用される場合があります。

**注**: [Datadog ログインテグレーション][1]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id`、`dd.span_id`、`dd.service`、`dd.env`、`dd.version` が文字列としてパースされていることを確実にする必要があります。詳しくは、[関連するログがトレース ID パネルに表示されない][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/logs/log_collection/go/#configure-your-logger
[2]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom