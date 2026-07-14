---
aliases:
- /ja/tracing/setup_overview/open_standards/nodejs
- /ja/tracing/trace_collection/open_standards/nodejs
- /ja/tracing/trace_collection/opentracing/nodejs/
code_lang: nodejs
code_lang_weight: 40
description: Node.js のための OpenTracing インスツルメンテーション
title: Node.js OpenTracing インスツルメンテーション
type: multi-code-lang
---


<div class="alert alert-info">OpenTracing のサポートは、非推奨の仕様に基づくものです。オープンな仕様でコードをインスツルメンテーションしたい場合は、代わりに OpenTelemetry を使用してください。<a href="/tracing/trace_collection/otel_instrumentation/">Datadog トレーシングライブラリの OpenTelemetry インスツルメンテーションからのデータ処理</a>をお試しください。</div>

OpenTracing のサポートは `dd-trace` パッケージに含まれています。

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

その他の OpenTracing アプリケーションと同様にトレーサーを使用します。

以下のタグを使用して、Datadog 固有のオプションをオーバーライドできます。

* `service.name`: スパンに使用されるサービス名。これを指定しなかった場合、トレーサーからのサービス名が使用されます。
* `resource.name`: スパンに使用されるリソース名。これを指定しなかった場合、オペレーション名が使用されます。
* `span.type`: スパンに使用されるスパンタイプ。指定しなかった場合、`custom` にフォールバックします。

OpenTracing Node.js の使用については、[opentracing.io][1] を参照してください。



[1]: https://opentracing.io/guides/javascript/