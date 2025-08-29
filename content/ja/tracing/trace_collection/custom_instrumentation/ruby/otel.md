---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/ruby/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API を使用して Ruby アプリケーションをインスツルメントし、トレースを Datadog に送信します。
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: Ruby で OpenTelemetry API を使用したカスタム インスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}


## 要件と制限

- Datadog Ruby トレーシングライブラリ `dd-trace-rb` バージョン 1.9.0 以上。
- Gem バージョンサポート 1.1.0 以上。

特記されている通り、Datadog のライブラリに実装されている以下の OpenTelemetry 機能:

| 機能                               | サポートノート                       |
|---------------------------------------|--------------------------------------|
| [OpenTelemetry コンテキスト伝搬][1]         | [Datadog と W3C Trace Context のヘッダーフォーマット][9]はデフォルトで有効になっています。 | 
| [スパンプロセッサー][2]                  | 非サポート                                          | 
| [スパンエクスポーター][3]                   | 非サポート                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` は `Datadog.logger` と同じオブジェクトに設定されています。[カスタムロギング][10]から構成します。 |
| トレース/スパン [ID ジェネレーター][4]         | ID 生成はトレーシングライブラリによって実行され、[128 ビットのトレース ID][12] をサポートしています。     |


## Datadog トレーシングライブラリを使用するための OpenTelemetry の構成

1. [OpenTelemetry Ruby Manual Instrumentation のドキュメント][5] に従って、必要な手動の OpenTelemetry インスツルメンテーションを Ruby コードに追加します。**重要!** その手順で OpenTelemetry SDK を呼び出すように示されている箇所では、代わりに Datadog トレース ライブラリを呼び出してください。

1. `datadog` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'datadog' # For dd-trace-rb v1.x, use the `ddtrace` gem.
    ```

1. `bundle install` を実行して gem をインストールします。
1. OpenTelemetry のコンフィギュレーションファイルに以下の行を追加します。

    ```ruby
    require 'opentelemetry/sdk'
    require 'datadog/opentelemetry'
    ```

1. インテグレーションを有効にし、トレーサー設定を変更できる構成ブロックをアプリケーションに追加します。ここで追加の構成を行わないと、OpenTelemetry でインスツルメンテーションを行ったコードのみがトレースされます。

    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

   このブロックを使うと、以下のことができます。

    - [Datadog コンフィギュレーション設定の追加][6]
    - [Datadog インスツルメンテーションの有効化または再構成][7]

   OpenTelemetry の設定は、[`OpenTelemetry::SDK.configure` ブロック][15] を使用して、個別に変更できます。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。また、[インテグレーションインスツルメンテーション][7]と [OpenTelemetry 自動インスツルメンテーション][8]もサポートしています。

## Adding span events

<div class="alert alert-info">スパン イベントを追加するには、SDK バージョン 2.3.0 以上が必要です。</div>

`add_event` API を使用してスパン イベントを追加できます。このメソッドには必須パラメーター `name` があり、オプションで `attributes` と `timestamp` を受け取ります。メソッドは指定されたプロパティを持つ新しいスパン イベントを作成し、対象のスパンに関連付けます。

- **Name** [_required_]: A string representing the event's name.
- **Attributes** [_optional_]: Zero or more key-value pairs with the following properties:
  - The key must be a non-empty string.
  - The value can be either:
    - A primitive type: string, Boolean, or number.
    - A homogeneous array of primitive type values (for example, an array of strings).
  - Nested arrays and arrays containing elements of different data types are not allowed.
- **Timestamp** [_オプション_]: イベントが発生した時刻を表す UNIX タイムスタンプ。`seconds(Float)` を想定します。

The following examples demonstrate different ways to add events to a span:

```ruby
span.add_event('Event With No Attributes')
span.add_event(
  'Event With All Attributes',
  attributes: { 'int_val' => 1, 'string_val' => 'two', 'int_array' => [3, 4], 'string_array' => ['5', '6'], 'bool_array' => [false, true]}
)
```

詳細は [OpenTelemetry][13] 仕様を参照してください。

### Recording exceptions

例外を記録するには `record_exception` API を使用します。このメソッドには必須パラメーター `exception` があり、オプションで UNIX `timestamp` を受け取ります。標準化された例外属性を含む新しいスパン イベントを作成し、対象のスパンに関連付けます。

The following examples demonstrate different ways to record exceptions:

```ruby
span.record_exception(
  StandardError.new('Error Message')
)
span.record_exception(
  StandardError.new('Error Message'),
  attributes: { 'status' => 'failed' }
)
```

詳細は [OpenTelemetry 仕様][14] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/ruby/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[6]: /ja/tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[7]: /ja/tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[8]: https://opentelemetry.io/docs/languages/ruby/libraries/
[9]: /ja/tracing/trace_collection/trace_context_propagation/
[10]: /ja/tracing/trace_collection/dd_libraries/ruby/#custom-logging
[12]: /ja/opentelemetry/guide/otel_api_tracing_interoperability/
[13]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[15]: https://opentelemetry.io/docs/languages/ruby/getting-started/#instrumentation