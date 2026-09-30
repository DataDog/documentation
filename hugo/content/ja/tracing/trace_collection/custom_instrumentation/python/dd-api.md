---
aliases:
- /ja/tracing/opentracing/python
- /ja/tracing/manual_instrumentation/python
- /ja/tracing/custom_instrumentation/python
- /ja/tracing/setup_overview/custom_instrumentation/python
- /ja/tracing/trace_collection/custom_instrumentation/python
- /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/python
code_lang: dd-api
code_lang_weight: 1
description: Python アプリケーションを手動でインスツルメントして、カスタムトレースを Datadog に送信します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
title: Datadog API を使用した Python カスタム インスツルメンテーション
type: multi-code-lang
---

自動インスツルメンテーションのセットアップ手順をまだ読んでいない場合は、まず [Python セットアップ手順][6] から始めてください。

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



[1]: /ja/tracing/glossary/#spans
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

発生したエラーでローカル ルート スパンにフラグを付けたい場合:

```python
import os
from ddtrace import tracer

try:
    raise TypeError
except TypeError as e:
    root_span = tracer.current_root_span()
    (exc_type, exc_val, exc_tb) = sys.exc_info()
    # エラー タイプを設定し、スパンをエラーとしてマークし、トレースバックを追加します
    root_span.set_exc_info(exc_type, exc_val, exc_tb)
```
{{% /tab %}}
{{< /tabs >}}


## ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][8]をお読みください。

### Baggage

スパンの [バゲージ][3] を操作する:

```python
from ddtrace import tracer

# 新しいスパンを開始し、バゲージを設定
with tracer.trace("example") as span:
    # set_baggage_item
    span.context.set_baggage_item("key1", "value1")
    span.context.set_baggage_item("key2", "value2")

    # get_all_baggage_items
    all_baggage = span.context.get_all_baggage_items()
    print(all_baggage) # {'key1': 'value1', 'key2': 'value2'}

    # remove_baggage_item
    span.context.remove_baggage_item("key1")
    print(span.context.get_all_baggage_items()) # {'key2': 'value2'}

    # get_baggage_item
    print(span.context.get_baggage_item("key1")) # None
    print(span.context.get_baggage_item("key2")) # value2

    # remove_all_baggage_items
    span.context.remove_all_baggage_items()
    print(span.context.get_all_baggage_items()) # {}
```

動作例は、[trace-examples の flask-baggage][7] を参照してください。

## ddtrace-api

{{< callout btn_hidden="true" header="ddtrace-api はプレビューです!">}}
<code>ddtrace-api</code> Python パッケージはプレビュー段階であり、必要な API 呼び出しをすべて含まない場合があります。より完全な機能が必要な場合は、前のセクションで説明した API を使用してください。
<br><br>以下の手順は、プレビュー版の <code>ddtrace-api</code> パッケージで試してみたい場合にのみ必要です。{{< /callout >}}

[ddtrace-api パッケージ][8] は、Datadog APM のカスタム Python インスツルメンテーション向けに安定したパブリック API を提供します。このパッケージは API インターフェイスのみを実装し、Datadog にスパンを作成・送信する基盤の機能は実装しません。

インターフェイス (`ddtrace-api`) と実装 (`ddtrace`) を分離することで、次の利点があります:

- カスタム インスツルメンテーション向けに、変更頻度が低く予測しやすい API に依存できます。
- 自動インスツルメンテーションのみを使用する場合、API の変更を完全に無視できます。
- シングル ステップとカスタム インスツルメンテーションの両方を実装する場合でも、`ddtrace` パッケージの複数コピーに依存せずに済みます。

`ddtrace-api` を使用するには:

1. `ddtrace` と `ddtrace-api` の両方のライブラリをインストールします:
   ```python
   pip install 'ddtrace>=3.1' ddtrace-api
   ```

2. Python のエントリ ポイント コマンドの前に `ddtrace-run` を付けて、Python アプリケーションをインスツルメントします:
   ```shell
   ddtrace-run python app.py
   ```

3. セットアップ後は、前のセクションの例とまったく同じ要領でカスタム インスツルメンテーションを記述できますが、`ddtrace` ではなく `ddtrace_api` から import します。

   例:
   ```python
   from ddtrace_api import tracer

   @tracer.wrap(service="my-sandwich-making-svc", resource="resource_name")
   def get_ingredients():
       # go to the pantry
       # go to the fridge
       # maybe go to the store
       return
   ```

サポートされている API 呼び出しの全一覧は、そのパッケージの [API 定義][9] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: /ja/tracing/trace_collection/trace_context_propagation/
[3]: /ja/tracing/trace_collection/trace_context_propagation/#baggage
[4]: /ja/tracing/security
[5]: /ja/tracing/guide/ignoring_apm_resources/
[6]: /ja/tracing/setup/python/
[7]: https://github.com/DataDog/trace-examples/tree/master/python/flask-baggage
[8]: https://pypi.org/project/ddtrace-api/
[9]: https://datadoghq.dev/dd-trace-api-py/pdocs/ddtrace_api.html