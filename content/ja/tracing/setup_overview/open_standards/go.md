---
title: Go オープン標準
kind: documentation
description: 'Go のオープン標準'
code_lang: go
type: multi-code-lang
code_lang_weight: 30
---

## OpenTracing

Datadog では、OpenTracing 標準もサポートしています。詳細は、[OpenTracing API][1] または以下の設定情報をご覧ください。

### セットアップ

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
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[3]: http://opentracing.io
