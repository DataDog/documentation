---
aliases:
- /ja/tracing/opentracing/python
- /ja/tracing/manual_instrumentation/python
- /ja/tracing/custom_instrumentation/python
- /ja/tracing/setup_overview/custom_instrumentation/python
code_lang: php
code_lang_weight: 10
description: Python アプリケーションを手動でインスツルメントして、カスタムトレースを Datadog に送信します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: Python のカスタムインスツルメンテーション
type: multi-code-lang
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

`ddtrace.Tracer.wrap()` 向けデコレータの API 詳細は、[こちら][1]で確認できます。


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

`ddtrace.Tracer()` の API 詳細は[こちら][2]で確認できます

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

デコレータの API 詳細は、`ddtrace.Tracer.trace` の[ドキュメント][2]または `ddtrace.Span.finish` の[ドキュメント][3]で確認できます。



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

{{< /tabs >}}

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
{{% /tab %}}
{{< /tabs >}}

## 分散型トレーシングのためのトレースコンテキストの伝搬

Datadog APM トレーサーは、分散型トレーシングのために [B3][2] や [W3C][3] のヘッダーの抽出と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入および抽出スタイルを構成することで制御されます。`tracecontext`、`Datadog`、`B3`、`B3 single header` のスタイルがサポートされています。

- 環境変数 `DD_PROPAGATION_STYLE_INJECT=tracecontext,B3` を用いて挿入スタイルを構成する
- 環境変数 `DD_PROPAGATION_STYLE_EXTRACT=tracecontext,B3` を用いて抽出スタイルを構成する
- 環境変数 `DD_TRACE_PROPAGATION_STYLE=tracecontext,B3` を用いて挿入スタイルと抽出スタイルの両方を構成する

これらの環境変数の値は、挿入または抽出が有効になっているヘッダースタイルのコンマ区切りリストです。デフォルトでは、`tracecontext,Datadog` スタイルが有効になっています。

トレースコンテキストの伝搬を無効にするには、環境変数の値を `none` に設定します。
- 環境変数 `DD_PROPAGATION_STYLE_INJECT=none` を用いて挿入スタイルを無効にする
- 環境変数 `DD_PROPAGATION_STYLE_EXTRACT=none` を用いて抽出スタイルを無効にする
- 環境変数 `DD_PROPAGATION_STYLE=none` を使って、すべてのトレースコンテキストの伝搬を無効にします (挿入と抽出の両方)。

複数の環境変数が設定されている場合、 `DD_PROPAGATION_STYLE_INJECT` と `DD_PROPAGATION_STYLE_EXTRACT` は `DD_TRACE_PROPAGATION_STYLE` で指定した値をオーバーライドします。

複数の抽出スタイルが有効な場合、それらのスタイルが指定されている順序で抽出が試行されます。最初に正常に抽出された値が使用されます。

## リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][4]ページまたは[不要なリソースを無視する][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: https://github.com/openzipkin/b3-propagation
[3]: https://github.com/w3c/trace-context
[4]: /ja/tracing/security
[5]: /ja/tracing/guide/ignoring_apm_resources/