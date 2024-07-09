---
aliases:
- /ja/tracing/setup_overview/open_standards/python
- /ja/tracing/trace_collection/open_standards/python
- /ja/tracing/trace_collection/opentracing/python/
code_lang: python
code_lang_weight: 10
description: Python のための OpenTracing インスツルメンテーション
title: Python OpenTracing インスツルメンテーション
type: multi-code-lang
---

<div class="alert alert-info">OpenTracing のサポートは、非推奨の仕様に基づくものです。オープンな仕様でコードをインスツルメンテーションしたい場合は、代わりに OpenTelemetry を使用してください。<a href="/tracing/trace_collection/otel_instrumentation/python/">Datadog トレーシングライブラリの OpenTelemetry インスツルメンテーションからのデータを処理する</a>ためのベータサポートをお試しください。</div>

OpenTracing のサポートは `ddtrace` パッケージに含まれています。`pip` を使用して、必要な `opentracing` パッケージをインストールします。

```sh
pip install ddtrace[opentracing]
```

トレーサーを初期化するための OpenTracing の規則は、新しいトレーサーを構成、インスタンス化し、グローバルな `opentracing.tracer` 参照を上書きする初期化メソッドを定義することです。

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      "agent_hostname": "localhost",
      "agent_port": 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span("<OPERATION_NAME>")
  span.set_tag("<TAG_KEY>", "<TAG_VALUE>")
  time.sleep(0.05)
  span.finish()

init_tracer("<SERVICE_NAME>")
my_operation()
```

トレーサーが、その他の OpenTracing アプリケーションと同様に使用できるようになりました。OpenTracing Python の使用方法については [opentracing.io][1] を参照してください。


[1]: https://opentracing.io/guides/python/