---
title: Python オープン標準
kind: documentation
description: 'Python のオープン標準'
code_lang: python
type: multi-code-lang
code_lang_weight: 10
---

## OpenTracing

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

## OpenTelemetry

OpenTelemetry のサポートは、`opentelemetry-ext-datadog` パッケージを使用してトレースを OpenTelemetry から Datadog にエクスポートすることで利用できます。

<div class="alert alert-warning">
現在、この機能はベータ版です。期待どおりに機能しない場合は、<a href="https://docs.datadoghq.com/help/">サポートにお問い合わせください。</a>。
</div>

### インストール

インストールするには

```python
pip install opentelemetry-ext-datadog
```

### 使用方法

アプリケーションに Datadog プロセッサーとエクスポーターをインストールし、オプションを構成します。次に、OpenTelemetry インターフェイスを使用して、トレースおよびその他の情報を生成します。

```python
from opentelemetry import trace
from opentelemetry.ext.datadog import (
    DatadogExportSpanProcessor,
    DatadogSpanExporter,
)
from opentelemetry.sdk.trace import TracerProvider

trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

exporter = DatadogSpanExporter(
    agent_url="http://localhost:8126", service="example"
)

span_processor = DatadogExportSpanProcessor(exporter)
trace.get_tracer_provider().add_span_processor(span_processor)


with tracer.start_as_current_span("foo"):
    with tracer.start_as_current_span("bar"):
        with tracer.start_as_current_span("baz"):
            print("Hello world from OpenTelemetry Python!")
```

### 構成オプション

Datadog Agent の URL とスパンタグの値は、環境と Agent の場所次第で必要または希望に応じて構成できます。

#### Datadog Agent URL

デフォルトでは、OpenTelemetry Datadog Exporter はトレースを `http://localhost:8126` に送信します。次の環境変数を構成して、トレースを別の URL に送信します。

- `DD_TRACE_AGENT_URL`: Datadog Agent がトレースをリッスンする `<host>:<port>`。例: `agent-host:8126`

これらの値は、トレースエクスポーターレベルでオーバーライドできます。

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126", service="example"
)
```

#### タグ付け

次の環境変数を設定して、Datadog がエクスポートしたトレースに自動的にタグを付けるようにアプリケーションを構成します。

- `DD_ENV`: アプリケーション環境。例: `production`、`staging`
- `DD_SERVICE`: アプリケーションのデフォルトのサービス名。例: `billing-api`
- `DD_VERSION`: アプリケーションのバージョン。例: `2.5`、`202003181415`、`1.3-alpha`
- `DD_TAGS`: カンマで区切られた値ペアのカスタムタグ。例: `layer:api,team:intake`
- `DD_ENV`、`DD_SERVICE`、または `DD_VERSION` が設定されている場合、`DD_TAGS` で定義されている対応する `env`、`service`、または `version` タグをオーバーライドします。
- `DD_ENV`、`DD_SERVICE`、`DD_VERSION` が設定されて_いない_場合、`DD_TAGS` の対応するタグを使用して、環境、サービス、バージョンを構成できます。

タグ値は、トレースエクスポーターレベルでもオーバーライドできます。これにより、アプリケーションごとに値を設定できるため、同じホスト上の異なる環境について複数のアプリケーションレポートを作成できます。

```python
exporter = DatadogSpanExporter(
    agent_url="http://dd-agent:8126",
    service="example",
    env='prod',
    version='1.5-alpha',
    tags='team:ops,region:west'
)

```

個々のスパンに直接設定できるタグは、アプリケーションレベルで定義された競合するタグに優先します。

### OpenTelemetry リンク

- OpenTelemetry Python Datadog Exporter の使用法については、[github][2]、[opentelemetry の例][3]、または [readthedocs][4] を参照してください。

[1]: https://opentracing.io/guides/python/
[2]: https://github.com/open-telemetry/opentelemetry-python/tree/main/ext/opentelemetry-ext-datadog
[3]: https://github.com/open-telemetry/opentelemetry-python/tree/main/docs/examples/datadog_exporter
[4]: https://opentelemetry-python.readthedocs.io/en/stable/ext/datadog/datadog.html
