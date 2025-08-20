---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/python/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/python
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API で Python アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: OpenTelemetry API を使った Python カスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}


## セットアップ

OpenTelemetry を Datadog トレースプロバイダーを使用するように構成するには

1. 自動インスツルメンテーションとセットアップの説明をまだお読みでない場合は、[Python セットアップ手順][1]からお読みください。

1. `DD_TRACE_OTEL_ENABLED` 環境変数を `true` に設定します。

### カスタムスパンの作成

既存のトレースコンテキスト内にカスタムスパンを作成するには

{{< highlight python "hl_lines=6" >}}
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def do_work():
    with tracer.start_as_current_span("operation_name") as span:
        # スパンで追跡したい作業を実行
        print("Doing work...")
        # 'with' ブロックが終了すると、スパンは自動的に閉じる
{{< /highlight >}}

## アクティブなスパンへのアクセス

現在アクティブなスパンにアクセスするには、`get_current_span()` 関数を使います。

```python
from opentelemetry import trace

current_span = trace.get_current_span()
# 'current_span' に情報を追加
```

## スパンタグの追加

スパンに属性を追加して、追加のコンテキストやメタデータを提供します。

以下は、現在のスパンに属性を追加する方法の例です。

```python
from opentelemetry import trace

current_span = trace.get_current_span()

current_span.set_attribute("attribute_key1", 1)
```

## スパン イベントの追加

<div class="alert alert-info">スパン イベントを追加するには SDK バージョン 2.9.0 以上が必要です。</div>

`add_event` API を使用してスパン イベントを追加できます。このメソッドには必須パラメーター `name` があり、オプションで `attributes` と `timestamp` を受け取ります。メソッドは指定されたプロパティを持つ新しいスパン イベントを作成し、対象のスパンに関連付けます。

- **Name** [_required_]: イベント名を表す文字列。
- **Attributes** [_optional_]: 以下のプロパティを持つ 0 個以上のキーと値のペア。
  - キーは空でない文字列である必要があります。
  - 値として指定できるのは次のいずれかです。
    - プリミティブ型: string、Boolean、number。
    - 同一プリミティブ型の要素のみを含む配列 (例: string の配列)。
  - 入れ子の配列や異なるデータ型を混在させた配列は使用できません。
- **Timestamp** [_optional_]: イベント発生時刻を表す UNIX タイムスタンプ。`microseconds` を想定します。

以下の例は、スパンにイベントを追加するさまざまな方法を示しています。

```python
span.add_event("Event With No Attributes")
span.add_event("Event With Some Attributes", {"int_val": 1, "string_val": "two", "int_array": [3, 4], "string_array": ["5", "6"], "bool_array": [True, False]})
```

詳細は [OpenTelemetry 仕様][2] を参照してください。

### 例外の記録

例外を記録するには `record_exception` API を使用します。このメソッドには必須パラメーター `exception` があり、オプションで UNIX `timestamp` を受け取ります。標準化された例外属性を含む新しいスパン イベントを作成し、対象のスパンに関連付けます。

以下の例は、例外を記録するさまざまな方法を示しています。

```python
span.record_exception(Exception("Error Message"))
span.record_exception(Exception("Error Message"), {"status": "failed"})
```

詳細は [OpenTelemetry 仕様][3] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/python/
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[3]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception