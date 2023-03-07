---
aliases:
- /ja/tracing/setup_overview/open_standards/nodejs
code_lang: nodejs
code_lang_weight: 40
description: Node.js のオープン標準
kind: documentation
title: Node.js オープン標準
type: multi-code-lang
---

## OpenTracing

OpenTracing のサポートは `dd-trace` パッケージに含まれています。

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

トレーサーが、その他の OpenTracing アプリケーションと同様に使用できるようになりました。

以下のタグを使用して、Datadog 固有のオプションをオーバーライドできます。

* `service.name`: スパンに使用されるサービス名。これを指定しなかった場合、トレーサーからのサービス名が使用されます。
* `resource.name`: スパンに使用されるリソース名。これを指定しなかった場合、オペレーション名が使用されます。
* `span.type`: スパンに使用されるスパンタイプ。指定しなかった場合、`custom` にフォールバックします。

OpenTracing Node.js の使用については、[opentracing.io][1] を参照してください。



[1]: https://opentracing.io/guides/javascript/