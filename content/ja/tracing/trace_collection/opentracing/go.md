---
aliases:
- /ja/tracing/setup_overview/open_standards/go
- /ja/tracing/trace_collection/open_standards/go
code_lang: go
code_lang_weight: 30
description: Go のための OpenTracing インスツルメンテーション
kind: documentation
title: Go OpenTracing インスツルメンテーション
type: multi-code-lang
---


Datadog では、OpenTracing 標準をサポートしています。詳細は、[OpenTracing API][1] または以下の設定情報をご覧ください。

## セットアップ

[`opentracer` パッケージ][2]をインポートして、Datadog トレーサーを [OpenTracing][3] 互換トレーサーとして公開します。

基本的な使用例

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // 通常のトレーサーを起動し、opentracing.Tracer インターフェイスとして返します。
    // Datadog トレーサーで通常使用するのと同じオプションのセットを使用できます。
    t := opentracer.New(tracer.WithServiceName("<サービス名>"))

    // トレーサーパッケージの通常の Stop 呼び出しを使用して停止します。
    defer tracer.Stop()

    // グローバル OpenTracing トレーサーを設定します。
    opentracing.SetGlobalTracer(t)

    // 通常どおり OpenTracing API を使用します。
}
```

[1]: https://github.com/opentracing/opentracing-go
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[3]: http://opentracing.io