---
title: Python のカスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/opentracing/python
  - /ja/tracing/manual_instrumentation/python
decription: Python アプリケーションを手動でインスツルメントして、カスタムトレースを Datadog に送信します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、 <a href="https://docs.datadoghq.com/tracing/setup/python/">Pythonセットアップ手順</a>からご覧ください。
</div>

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][1]参照）、手動でコードをインスツルメントする必要があります。

`ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

## スパンの作成

`ddtrace` ライブラリは、`ddtrace-run` で[多くのライブラリとフレームワーク][1]に対応するスパンを自動生成します。しかし、使用しているコードを可視化したい場合はスパンの利用が便利です。

Web リクエスト (例: `make_sandwich_request`) 内で、`get_ingredients()`、`assemble_sandwich()` など、測定に役立つさまざまなオペレーションを行うことができます。

```python
def make_sandwich_request(request):
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "Decorator" %}}

`ddtrace` から提供される `tracer.wrap()` デコレータを使用して、対象の関数を修飾することができます。呼び出し場所に関わらずに関数をトレースしたい場合に便利です。


```python
  from ddtrace import tracer

  @tracer.wrap()
  def get_ingredients():
      # パントリーに行く
      # 冷蔵庫の中身を確認
      # 足りないものは買い出し
      return

  # スパンのカスタマイズに必要な情報を共有
  @tracer.wrap("assemble_sandwich", service="my-sandwich-making-svc")
  def assemble_sandwich(ingredients):
      return
```

`ddtrace.Tracer.wrap()` 向けデコレータの API 詳細は、[こちら][1]で確認できます。


[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Context Manager" %}}

任意のコードブロックをトレースするには、以下の `ddtrace.Span` コンテキストマネージャーを使用するか、 [高度な使用方法に関するドキュメント][1]を参照してください。

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # スパンで両方のオペレーションを取得
    with tracer.trace("sandwich.make"):
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)

def make_sandwich_request(request):
    # スパンで両方のオペレーションを取得
    with tracer.trace("sandwich.create") as outer_span:
        with tracer.trace("get_ingredients") as span:
            ingredients = get_ingredients()

        with tracer.trace("assemble_sandwich") as span:
            sandwich = assemble_sandwich(ingredients)
```

`ddtrace.Tracer()` の API 詳細は[こちら][2]で確認できます

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
{{% /tab %}}
{{% tab "手動" %}}

デコレータおよびコンテキストマネージャー以外のトレーシング方法として、[スパン][1]の開始と終了を可能にする手動 API があります。これに必要なのは、

```python

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # ここでスパンを閉じる
```

デコレータの API 詳細は、`ddtrace.Tracer.trace` の[ドキュメント][2]または `ddtrace.Span.finish` の[ドキュメント][3]で確認できます。



[1]: /ja/tracing/visualization/#spans
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Tracer.trace
[3]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{< /tabs >}}


## アクティブなスパンへのアクセス

内蔵のインスツルメンテーションおよびカスタムインスツルメンテーションは、有意義なオペレーションに関連するスパンを作成します。アクティブなスパンにアクセスして、これらの有意義なデータを含めるよう設定できます。

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # スパンで両方のオペレーションを取得
    with tracer.trace("sandwich.make") as my_span:
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)
```

{{< tabs >}}
{{% tab "現在のスパン" %}}

```python
def get_ingredients():
    # アクティブなスパンを取得
    span = tracer.current_span()
    # 上記の make_sandwich_request からの my_span
```

{{% /tab %}}

{{% tab "ルートスパン" %}}

```python
def assemble_sandwich(ingredients):
    with tracer.trace("another.operation") as another_span:
        # アクティブなルートスパンを取得
        span = tracer.current_root_span()
        # 上記の make_sandwich_request からの my_span
```
{{% /tab %}}
{{< /tabs >}}


## タグの追加

{{< tabs >}}
{{% tab "ローカル" %}}

スパンに `set_tag` メソッドを適用して、スパンにタグを追加することができます。

```python
from ddtrace import tracer

def make_sandwich_request(request):
    with tracer.trace("sandwich.make") as span:
        ingredients = get_ingredients()
        span.set_tag("num_ingredients", len(ingredients))
```
{{% /tab %}}
{{% tab "グローバル" %}}

タグはトレーサー上にグローバルに設定することができます。これらのタグは作成されるスパンのそれぞれに適用されます。

```python
from ddtrace import tracer
from myapp import __version__

# これは各スパンに適用されます
tracer.set_tags({"version": __version__, "<TAG_KEY_2>": "<TAG_VALUE_2>"})
```
{{% /tab %}}
{{% tab "エラー" %}}

例外発生時点でアクティブなスパンが存在した場合は、その例外の情報がスパンに添付されます。

```python
from ddtrace import tracer

with tracer.trace("throws.an.error") as span:
    raise Exception("Oops!")

# `span` にエラーフラグを立て、
# スタックトレースと例外メッセージをタグとして追加
```

スパンへのエラーフラグ適用は、手動でも行うことができます。

```python
from ddtrace import tracer

span = tracer.trace("operation")
span.error = 1
span.finish()
```
{{% /tab %}}
{{< /tabs >}}

## リソースフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][2]ページを参照してください。

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

トレーサーが、その他の OpenTracing アプリケーションと同様に使用できるようになりました。OpenTracing Python の使用方法については [opentracing.io][3] を参照してください。

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

- OpenTelemetry Python Datadog Exporter の使用法については、[github][4]、[opentelemetry の例][5]、または [readthedocs][6] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: /ja/tracing/security
[3]: https://opentracing.io/guides/python/
[4]: https://github.com/open-telemetry/opentelemetry-python/tree/main/ext/opentelemetry-ext-datadog
[5]: https://github.com/open-telemetry/opentelemetry-python/tree/main/docs/examples/datadog_exporter
[6]: https://opentelemetry-python.readthedocs.io/en/stable/ext/datadog/datadog.html