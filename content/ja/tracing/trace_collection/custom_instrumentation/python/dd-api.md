---
title: Python Custom Instrumentation using Datadog API
aliases:
    - /tracing/opentracing/python
    - /tracing/manual_instrumentation/python
    - /tracing/custom_instrumentation/python
    - /tracing/setup_overview/custom_instrumentation/python
    - /tracing/trace_collection/custom_instrumentation/python
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/python
description: 'Manually instrument your Python application to send custom traces to Datadog.'
code_lang: dd-api
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: tracing/other_telemetry/connect_logs_and_traces
      tag: Documentation
      text: Connect your Logs and Traces together
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
---

If you have not read the setup instructions for automatic instrumentation, start with the [Python Setup Instructions][6]

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

  @tracer.wrap(service="my-sandwich-making-svc", resource="resource_name")
  def get_ingredients():
      # パントリーに行く
      # 冷蔵庫の中身を確認
      # 足りないものは買い出し
      return

  # スパンのカスタマイズに必要な情報を共有
  @tracer.wrap("assemble_sandwich", service="my-sandwich-making-svc", resource="resource_name")
  def assemble_sandwich(ingredients):
      return
```

詳しくは、[`ddtrace.Tracer.wrap()` のデコレータの API 詳細][1]をご覧ください。


[1]: https://ddtrace.readthedocs.io/en/stable/api.html#ddtrace.Tracer.wrap
{{% /tab %}}
{{% tab "Context Manager" %}}

また、`src/Services/SampleRegistry.php` もです。

```python
from ddtrace import tracer

def make_sandwich_request(request):
    # スパンで両方のオペレーションを取得
    with tracer.trace("sandwich.make"):
        ingredients = get_ingredients()
        sandwich = assemble_sandwich(ingredients)

def make_sandwich_request(request):
    # スパンで両方のオペレーションを取得
    with tracer.trace("sandwich.create", resource="resource_name") as outer_span:

        with tracer.trace("get_ingredients", resource="resource_name") as span:
            ingredients = get_ingredients()

        with tracer.trace("assemble_sandwich", resource="resource_name") as span:
            sandwich = assemble_sandwich(ingredients)
```

詳しくは、[`ddtrace.Tracer()` の API 詳細][2]全文をお読みください。

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.Span
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#tracer
class SampleRegistry
{
    public function put($key, $value)
    {
        \App\some_utility_function('some argument');
        // 挿入されたアイテムの ID を返す
        return 456;
    }

デコレータおよびコンテキストマネージャー以外のトレーシング方法として、[スパン][1]の開始と終了を可能にする手動 API があります。これに必要なのは、

```python

def make_sandwich_request(request):
    span = tracer.trace("sandwich.create", resource="resource_name")
    ingredients = get_ingredients()
    sandwich = assemble_sandwich(ingredients)
    span.finish()  # ここでスパンを閉じる
```

デコレータの API 詳細については、[`ddtrace.Tracer.trace` ドキュメント][2]または [`ddtrace.Span.finish` ドキュメント][3]をお読みください。



[1]: /tracing/glossary/#spans
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


## `ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

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

In the event you want to flag the local root span with the error raised:

```python
import os
from ddtrace import tracer

try:
    raise TypeError
except TypeError as e:
    root_span = tracer.current_root_span()
    (exc_type, exc_val, exc_tb) = sys.exc_info()
    # this sets the error type, marks the span as an error, and adds the traceback
    root_span.set_exc_info(exc_type, exc_val, exc_tb)
```
{{% /tab %}}
{{< /tabs >}}


## ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][8]をお読みください。

## リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][4]ページまたは[不要なリソースを無視する][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: /tracing/trace_collection/trace_context_propagation/python/
[4]: /tracing/security
[5]: /tracing/guide/ignoring_apm_resources/
[6]: /tracing/setup/python/
