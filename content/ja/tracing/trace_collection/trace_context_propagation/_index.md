---
aliases:
- /ja/tracing/trace_collection/trace_context_propagation/cpp
- /ja/tracing/trace_collection/trace_context_propagation/dotnet
- /ja/tracing/trace_collection/trace_context_propagation/go
- /ja/tracing/trace_collection/trace_context_propagation/java
- /ja/tracing/trace_collection/trace_context_propagation/nodejs
- /ja/tracing/trace_collection/trace_context_propagation/php
- /ja/tracing/trace_collection/trace_context_propagation/python
- /ja/tracing/trace_collection/trace_context_propagation/ruby
description: Datadog、B3、W3C Trace Context のヘッダーを抽出・挿入し、分散型トレーシングのコンテキストを伝搬させます。
further_reading:
- link: tracing/glossary/
  tag: よくあるご質問
  text: APM の用語を理解する
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: よくあるご質問
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: トレースコンテキスト伝搬
type: multi-code-lang
---
トレースコンテキスト伝搬とは、分散アプリケーション内のコンポーネント間で、トレース ID、スパン ID、およびサンプリング決定などのトレース情報を渡すメカニズムです。これにより、リクエスト内のすべてのトレース (および追加のテレメトリ) を関連付けることができます。自動インスツルメンテーションが有効になっている場合、トレースコンテキスト伝搬は Datadog SDK によって自動的に処理されます。

デフォルトでは、Datadog SDK は以下の形式を用いて分散トレーシングヘッダーの抽出と注入を行います:

- [Datadog][1] (ヘッダーを抽出する際はこちらが優先されます)
- [W3C Trace Context][2]
- [Baggage][10]

このデフォルト設定により、以前の Datadog SDK バージョンや製品との互換性を最大限に保ちつつ、OpenTelemetry のような他の分散トレーシングシステムとの相互運用も可能になります。

## トレースコンテキスト伝搬をカスタマイズする {#customize-trace-context-propagation}

以下のようなケースでは、トレースコンテキスト伝搬の設定をカスタマイズする必要があるかもしれません:

- サポートされている別の形式で分散トレーシング情報をやりとりしている
- 分散トレーシングヘッダーを抽出または注入しないようにしたい

分散トレーシングヘッダーの読み取りおよび書き込み形式を構成するには、以下の環境変数を使用してください。言語別の設定値については、[言語サポート][6] セクションを参照してください。

`DD_TRACE_PROPAGATION_STYLE`
: 抽出および注入のためのトレースコンテキスト伝搬形式を、カンマ区切りのリストで指定します。抽出または注入の設定によって上書きされる場合があります。<br>
**デフォルト**: `datadog,tracecontext,baggage` <br>
**注**: 複数のトレースコンテキスト形式がある場合、抽出は指定された順序に従います (たとえば、`datadog,tracecontext` は最初に Datadog ヘッダーをチェックします)。最初の有効なコンテキストがトレースを継続し、追加の有効なコンテキストはスパンリンクになります。`baggage` が含まれている場合、既存のコンテキストに [Baggage](#baggage) として追加されます。

`OTEL_PROPAGATORS`
: 抽出と注入の両方におけるトレースコンテキスト伝搬形式を指定します (カンマ区切りのリスト)。最も低い優先度です。他の Datadog トレースコンテキスト伝搬環境変数が設定されている場合は無視されます。<br>
**注**: この設定は、アプリケーションを OpenTelemetry SDK から Datadog SDK に移行する場合にのみ使用してください。この設定やその他の OpenTelemetry 環境変数に関する詳細は、[Datadog SDK を使用した OpenTelemetry 環境変数の利用][9] を参照してください。

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
: サービスレベルで、受信した分散トレースヘッダーをどのように処理するかを指定します。指定可能な値は次のとおりです。<br>
`continue`: 受信した分散トレースヘッダーが有効なトレースコンテキストを表している場合、SDK は分散トレースを継続します。<br>
`restart`: SDK は常に新しいトレースを開始します。受信した分散トレースヘッダーが有効なトレースコンテキストを表している場合、そのトレースコンテキストはサービスエントリスパンのスパンリンクとして表現されます (`continue` 設定の親スパンとは異なります)。<br>
`ignore`: SDK は常に新しいトレースを開始し、受信したすべての分散トレースヘッダーは無視されます。<br>
**デフォルト**: `continue` <br>
**注**: これは、.NET、Node.js、Python、および Java ライブラリでのみ実装されています。

### 高度な構成 {#advanced-configuration}

ほとんどのサービスは、同じ形式を使用してトレースコンテキストヘッダーを送受信します。ただし、サービスが 1 つの形式でトレースコンテキストヘッダーを受け取り、別の形式で送信する必要がある場合は、以下の設定を使用してください。

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: 抽出のみを対象としたトレースコンテキスト伝搬形式を、カンマ区切りのリストで指定します。抽出プロパゲーターを設定するための最も高い優先順位です。

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: 注入のみを対象としたトレースコンテキスト伝搬形式を、カンマ区切りのリストで指定します。注入プロパゲーターを設定するための最も高い優先順位です。

## 対応している形式 {#supported-formats}

Datadog SDK は、以下のトレースコンテキスト形式をサポートしています:

| 形式                 | 設定値        |
|------------------------|----------------------------|
| [Datadog][1]           | `datadog`                  |
| [W3C Trace Context][2] | `tracecontext`             |
| [B3 Single][3]         | _言語依存の値_ |
| [B3 Multi][4]          | `b3multi`                  |
| [Baggage][10]          | `baggage`<sup>*</sup>       |
| [None][5]              | `none`                     |

<sup>*</sup> **注**: `baggage` は Rust ではサポートされていません。

## 言語サポート {#language-support}

{{< tabs >}}

{{% tab "Java" %}}

### 対応している形式 {#supported-formats-1}

Datadog Java SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (非推奨)   |
| [Baggage][7]          | `baggage`           |
| [AWS X-Ray][5]         | `xray`              |
| [None][6]              | `none`              |

### 追加の構成 {#additional-configuration}

環境変数での設定に加えて、システムプロパティを使ってプロパゲーターを更新することもできます:
- `-Ddd.trace.propagation.style=datadog,b3multi`
- `-Dotel.propagators=datadog,b3multi`
- `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- `-Ddd.trace.propagation.style.extract=datadog,b3multi`

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-tracingheader
[6]: #none-format
[7]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Python" %}}

### 対応している形式 {#supported-formats-2}

Datadog Python SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値             |
|------------------------|---------------------------------|
| [Datadog][1]           | `datadog`                       |
| [W3C Trace Context][2] | `tracecontext`                  |
| [Baggage][6]           | `baggage`                       |
| [B3 Single][3]         | `b3`                            |
|                        | `b3 single header` (v3.0 で削除) |
| [B3 Multi][4]          | `b3multi`                       |
| [None][5] | `none`                          |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Ruby" %}}

### 対応している形式 {#supported-formats-3}

Datadog Ruby SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [None][5] | `none`              |

### 追加の構成 {#additional-configuration-1}

環境変数の設定に加えて、`Datadog.configure` を使用してコード内でプロパゲーターを更新することもできます:

```ruby
Datadog.configure do |c|
  # List of header formats that should be extracted
  c.tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # List of header formats that should be injected
  c.tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Go" %}}

### 対応している形式 {#supported-formats-4}

Datadog Go SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (非推奨)   |
| [None][5] | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Node.js" %}}

### 対応している形式 {#supported-formats-5}

Datadog Node.js SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (非推奨) |
| [None][5] | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "PHP" %}}

### 対応している形式 {#supported-formats-6}

Datadog PHP SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (非推奨) |
| [None][5] | `none`              |

### さまざまな使用例 {#additional-use-cases}

以下のユースケースは、Datadog PHP SDK 特有のものです:

{{% collapse-content title="PHP スクリプト起動時の分散トレーシング" level="h4" %}}

新しい PHP スクリプトが起動されると、Datadog SDK は分散トレーシング用の Datadog ヘッダーが存在するかどうかを自動的にチェックします。
- `x-datadog-trace-id` (環境変数: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (環境変数: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (環境変数: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (環境変数: `HTTP_X_DATADOG_TAGS`)

{{% /collapse-content %}}

{{% collapse-content title="分散トレーシングコンテキストを手動で設定する" level="h4" %}}

新しいトレースまたは既存のトレースに対して CLI スクリプトでトレーシング情報を手動で設定するには、`DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` 関数を使用してください。

```php
<?php

function processIncomingQueueMessage($message) {
}

\DDTrace\trace_function(
    'processIncomingQueueMessage',
    function(\DDTrace\SpanData $span, $args) {
        $message = $args[0];
        \DDTrace\set_distributed_tracing_context($message->trace_id, $message->parent_id);
    }
);
```

バージョン **0.87.0** 以降、生ヘッダーが利用可能な場合は、`DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)` 関数を使用してください。**注**: ヘッダー名は小文字にする必要があります。

```php
$headers = [
	"x-datadog-trace-id" => "1234567890",
	"x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

トレースコンテキストをヘッダーとして直接抽出するには、`DDTrace\generate_distributed_tracing_headers(?array $inject = null): array` 関数を使用してください。

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Store headers somewhere, inject them in an outbound request, ...
// These $headers can also be read back by \DDTrace\consume_distributed_tracing_headers from another process.
```

この関数のオプション引数は、注入スタイル名の配列を受け取ります。デフォルトでは、設定された注入スタイルが使用されます。

{{% /collapse-content %}}

{{% collapse-content title="RabbitMQ" level="h4" %}}

PHP SDK は、`php-amqplib/php-amqplib` ライブラリ (バージョン 0.87.0 以上) の自動トレースをサポートしています。ただし、場合によっては分散トレースが途切れることがあります。たとえば、既存のトレースの外で `basic_get` メソッドを使用して分散キューからメッセージを読み取る場合、`basic_get` 呼び出しと、それに対応するメッセージ処理の周りにカスタムトレースを追加する必要があります。

```php
// Create a surrounding trace
$newTrace = \DDTrace\start_trace_span();
$newTrace->name = 'basic_get.process';
$newTrace->service = 'amqp';


// basic_get call(s) + message(s) processing
$msg = $channel->basic_get($queue);
if ($msg) {
   $messageProcessing($msg);
}


// Once done, close the span
\DDTrace\close_span();
```

この囲むトレースを消費処理ロジックに作成することで、分散キューの観測可能性を確保することができます。

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "C++" %}}

### 対応している形式 {#supported-formats-7}

Datadog C++ SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| [None][5] | `none`              |

### 追加の構成 {#additional-configuration-2}

環境変数での設定に加えて、コード内でもプロパゲーターを更新できます:

```cpp
#include <datadog/tracer_config.h>
#include <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
  dd::TracerConfig config;
  config.service = "my-service";

  // `injection_styles` indicates with which tracing systems trace propagation
  // will be compatible when injecting (sending) trace context.
  // All styles indicated by `injection_styles` are used for injection.
  // `injection_styles` is overridden by the `DD_TRACE_PROPAGATION_STYLE_INJECT`
  // and `DD_TRACE_PROPAGATION_STYLE` environment variables.
  config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

  // `extraction_styles` indicates with which tracing systems trace propagation
  // will be compatible when extracting (receiving) trace context.
  // Extraction styles are applied in the order in which they appear in
  // `extraction_styles`. The first style that produces trace context or
  // produces an error determines the result of extraction.
  // `extraction_styles` is overridden by the
  // `DD_TRACE_PROPAGATION_STYLE_EXTRACT` and `DD_TRACE_PROPAGATION_STYLE`
  // environment variables.
  config.extraction_styles = {dd::PropagationStyle::W3C};

  ...
}
```

### さまざまな使用例 {#additional-use-cases-1}

{{% collapse-content title="伝播されたコンテキストを手動で抽出する" level="h4" %}}

伝播コンテキストを抽出するには、カスタム `DictReader` インターフェイスを実装し、`Tracer::extract_span` または `Tracer::extract_or_create_span` を呼び出します。

以下は、HTTP ヘッダーからプロパゲーションコンテキストを抽出するサンプルです:

```cpp
#include <datadog/dict_reader.h>
#include <datadog/optional.h>
#include <datadog/string_view.h>

#include <unordered_map>

namespace dd = datadog::tracing;

class HTTPHeadersReader : public datadog::tracing::DictReader {
  std::unordered_map<dd::StringView, dd::StringView> headers_;

public:
  HTTPHeadersReader(std::unordered_map<dd::StringView, dd::StringView> headers)
    : headers_(std::move(headers)) {}

  ~HTTPHeadersReader() override = default;

  // Return the value at the specified `key`, or return `nullopt` if there
  // is no value at `key`.
  dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
    auto found = headers_.find(key);
    if (found == headers_.cend()) return dd::nullopt;

    return found->second;
  }

  // Invoke the specified `visitor` once for each key/value pair in this object.
  void visit(
      const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
      const override {
      for (const auto& [key, value] : headers_) {
        visitor(key, value);
      }
  };
};

// Usage example:
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
  HTTPHeadersReader reader{request.headers};
  auto maybe_span = tracer.extract_span(reader);
  ..
}
```
{{% /collapse-content %}}

{{% collapse-content title="分散トレース用のコンテキストを手動で注入する" level="h4" %}}

伝播コンテキストを注入するには、`DictWriter` インターフェイスを実装し、スパンインスタンスに対して `Span::inject` を呼び出します。

```cpp
#include <datadog/dict_writer.h>
#include <datadog/string_view.h>

#include <string>
#include <unordered_map>

using namespace dd = datadog::tracing;

class HTTPHeaderWriter : public dd::DictWriter {
  std::unordered_map<std::string, std::string>& headers_;

public:
  explicit HTTPHeaderWriter(std::unordered_map<std::string, std::string>& headers) : headers_(headers) {}

  ~HTTPHeaderWriter() override = default;

  void set(dd::StringView key, dd::StringView value) override {
    headers_.emplace(key, value);
  }
};

// Usage example:
void handle_http_request(const Request& request, dd::Tracer& tracer) {
  auto span = tracer.create_span();

  HTTPHeaderWriter writer(request.headers);
  span.inject(writer);
  // `request.headers` now populated with the headers needed to propagate the span.
  ..
}
```
{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab ".NET" %}}

### 対応している形式 {#supported-formats-8}

Datadog .NET SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [W3C Trace Context][2] | `tracecontext`                |
| [Baggage][9]          | `baggage`                     |
|                        | `W3C` (非推奨)            |
| [B3 Single][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (非推奨) |
| [B3 Multi][4]          | `b3multi`                     |
|                        | `B3` (非推奨)             |
| [None][5]              | `none`                        |

### さまざまな使用例 {#additional-use-cases-2}

{{% collapse-content title="以前の構成におけるデフォルト設定" level="h4" %}}

- バージョン [2.48.0][6] 以降、デフォルトの伝播スタイルは `datadog, tracecontext` です。これは、Datadog ヘッダーが優先的に使用され、次に W3C Trace Context が使用されることを意味します。
- バージョン 2.48.0 より前は、抽出および注入の両方で `tracecontext, Datadog` の順序が用いられていました。
- バージョン [2.22.0][7] より前のバージョンでは、`Datadog` の注入スタイルのみが有効でした。
- バージョン [2.42.0][8] 以降、複数のエクストラクターが指定されている場合、`DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` 設定は、最初の有効な `tracecontext` を検出した際にコンテキスト抽出を直ちに終了するかどうかを指定します。デフォルト値は `false` です。

{{% /collapse-content %}}

{{% collapse-content title="メッセージキューを使用した分散トレーシング" level="h4" %}}

ほとんどの場合、ヘッダーの抽出および注入は自動的に行われます。ただし、分散トレースが切断される既知のケースがいくつか存在します。たとえば、分散キューからメッセージを読み取る際、一部のライブラリではスパンコンテキストが失われる可能性があります。Kafka メッセージを消費する際に `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定した場合にも、同様のことが発生します。これらのケースでは、以下のコードを使用してカスタムトレースを追加できます。

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

`GetHeaderValues` メソッドを提供します。このメソッドの実装方法は、`SpanContext` を保持する構造体によって異なります。

以下はその例です。

```csharp
// Confluent.Kafka
IEnumerable<string> GetHeaderValues(Headers headers, string name)
{
    if (headers.TryGetLastBytes(name, out var bytes))
    {
        try
        {
            return new[] { Encoding.UTF8.GetString(bytes) };
        }
        catch (Exception)
        {
            // ignored
        }
    }

    return Enumerable.Empty<string>();
}

// RabbitMQ
IEnumerable<string> GetHeaderValues(IDictionary<string, object> headers, string name)
{
    if (headers.TryGetValue(name, out object value) && value is byte[] bytes)
    {
        return new[] { Encoding.UTF8.GetString(bytes) };
    }

    return Enumerable.Empty<string>();
}

// SQS
public static IEnumerable<string> GetHeaderValues(IDictionary<string, MessageAttributeValue> headers, string name)
{
    // For SQS, there are a maximum of 10 message attribute headers,
    // so the Datadog headers are combined into one header with the following properties:
    // - Key: "_datadog"
    // - Value: MessageAttributeValue object
    //   - DataType: "String"
    //   - StringValue: <JSON map with key-value headers>
    if (headers.TryGetValue("_datadog", out var messageAttributeValue)
        && messageAttributeValue.StringValue is string jsonString)
    {
        var datadogDictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonString);
        if (datadogDictionary.TryGetValue(name, out string value))
        {
            return new[] { value };
        }
    }
    return Enumerable.Empty<string>();
}
```

`SpanContextExtractor` API を使用して Kafka コンシューマースパンをトレースする場合は、`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定してください。これにより、トピックからメッセージが消費された直後にコンシューマースパンが正しく終了し、メタデータ (`partition` や `offset` など) が正しく記録されます。`SpanContextExtractor` API を使用して Kafka メッセージから作成されたスパンは、プロデューサースパンの子であり、コンシューマースパンの兄弟となります。

トレースコンテキストを手動で伝播させる必要がある場合 (WCF クライアントのように自動的に計測されないライブラリなど)、`SpanContextInjection` API を使用できます。以下は、`this` が WCF クライアントである場合の WCF の例です。

```csharp

using (OperationContextScope ocs = new OperationContextScope(this.InnerChannel))
{
  var spanContextInjector = new SpanContextInjector();
  spanContextInjector.Inject(OperationContext.Current.OutgoingMessageHeaders, SetHeaderValues, Tracer.Instance.ActiveScope?.Span?.Context);
}


void SetHeaderValues(MessageHeaders headers, string name, string value)
{
    MessageHeader header = MessageHeader.CreateHeader(name, "datadog", value);
    headers.Add(header);
}
```

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.48.0
[7]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.22.0
[8]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.42.0
[9]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Rust" %}}

<div class="alert alert-info">Datadog Rust SDK は現在プレビュー版です。</div>

Datadog Rust SDK は、OpenTelemetry (OTel) SDK をベースに構築されています。

トレースコンテキスト伝搬は OTel SDK によって処理されます。この SDK は `datadog-opentelemetry` によって設定され、`datadog` および `tracecontext` (W3C) 形式の両方をサポートしています。

### 対応している形式 {#supported-formats-9}

| 形式 | 設定値 |
|---|---|
| [Datadog][1] | `datadog` |
| [W3C Trace Context][2] | `tracecontext` |

### 構成 {#configuration}

`DD_TRACE_PROPAGATION_STYLE` 環境変数を設定することで、使用する伝播形式を制御できます。カンマ区切りでリストを提供することも可能です。

たとえば、以下のとおりです。

```bash
# To support both W3C and Datadog
export DD_TRACE_PROPAGATION_STYLE="tracecontext,datadog"
```

### 手動での注入と抽出 {#manual-injection-and-extraction}

Rust には自動インスツルメンテーション機能がないため、リモート呼び出し (HTTP リクエストなど) を送受信する際には、手動でコンテキストを伝播させる必要があります。
- `HeaderExtractor`で、受信リクエストヘッダーから親コンテキストを**抽出**します。
- `HeaderInjector`で、現在のコンテキストを送信リクエストヘッダーに**注入**します。

まず、`opentelemetry-http` を `Cargo.toml` に追加します。

```toml
[dependencies]
# Provides HeaderInjector and HeaderExtractor
# Ensure this version matches your other opentelemetry dependencies
opentelemetry-http = "0.31"

# Only required for the Hyper examples below
http-body-util = "0.1"
```

<div class="alert alert-danger">バージョン競合を避けるため、 <code>opentelemetry-http</code> には他の OpenTelemetry 依存関係と同じクレートバージョンを使用してください。</div>

### コンテキストの注入 (クライアント側) {#injecting-context-client-side}

HTTP リクエストを行う際 (たとえば、`hyper` 1.0 を使用する場合)、`HeaderInjector` を使用して現在のスパンコンテキストをリクエストヘッダーに注入します。

```rust
use opentelemetry::{global, Context};
use opentelemetry_http::HeaderInjector;
use hyper::Request;
use http_body_util::Empty;
use hyper::body::Bytes;

// HYPER example
fn build_outbound_request(url: &str) -> http::Result<Request<Empty<Bytes>>> {
    let cx = Context::current();

    // Build the request and inject headers in-place
    let mut builder = Request::builder().method("GET").uri(url);
    global::get_text_map_propagator(|prop| {
        prop.inject_context(&cx, &mut HeaderInjector(builder.headers_mut().unwrap()))
    });

    builder.body(Empty::<Bytes>::new())
}
```

### コンテキストの抽出 (サーバー側) {#extracting-context-server-side}

HTTP リクエストを受信する際、`HeaderExtractor` を使用してヘッダーからトレースコンテキストを抽出します。

非同期ランタイム (Tokio など) を使用する場合、抽出したコンテキストを Future に添付する必要があります。これにより、非同期タスクチェーンを通じてコンテキストが正しく伝播されます。

```rust
use opentelemetry::{
    global,
    trace::{Span, FutureExt, SpanKind, Tracer},
    Context,
};
use opentelemetry_http::HeaderExtractor;
use hyper::{Request, Response};
use hyper::body::Incoming;
use http_body_util::Full;
use hyper::body::Bytes;

// Utility function to extract context from a hyper request
fn extract_context(req: &Request<Incoming>) -> Context {
    global::get_text_map_propagator(|propagator| {
        propagator.extract(&HeaderExtractor(req.headers()))
    })
}

// A placeholder for your actual request handling logic
async fn your_handler_logic() -> Response<Full<Bytes>> {
    // ... your logic ...
    Response::new(Full::new(Bytes::from("Hello, World!")))
}

// HYPER example
async fn hyper_handler(req: Request<Incoming>) -> Response<Full<Bytes>> {
    // Extract the parent context from the incoming headers
    let parent_cx = extract_context(&req);
    
    let tracer = global::tracer("my-server-component");
    
    // Start the server span as a child of the extracted context
    let server_span = tracer
        .span_builder("http.server.request")
        .with_kind(SpanKind::Server)
        .start_with_context(tracer, &parent_cx);

    // Create a new context with the new server span
    // This is critical for async propagation
    let cx = parent_cx.with_span(server_span);

    // Attach the new context to the future using .with_context(cx)
    // This makes the span active for the duration of the handler
    your_handler_logic().with_context(cx).await
}
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/

{{% /tab %}}

{{< /tabs >}}

## カスタムヘッダー形式 {#custom-header-formats}

### Datadog 形式 {#datadog-format}

Datadog SDK が抽出または注入 (あるいはその両方) で Datadog 形式を使用するように設定されている場合、Datadog SDK は以下のリクエストヘッダーを処理します:

`x-datadog-trace-id`
: 128 ビットのトレース ID の下位 64 ビットを、10 進数形式で指定します。

`x-datadog-parent-id`
: 現在のスパンに対応する 64 ビットのスパン ID を、10 進数形式で指定します。

`x-datadog-origin`
: トレースを開始した Datadog 製品を指定します。たとえば、[Real User Monitoring][7] や [Synthetic Monitoring][8] があります。このヘッダーが存在する場合、その値は : `rum`、`synthetics`、`synthetics-browser` のいずれかであることが期待されます。

`x-datadog-sampling-priority`
: 表示されるスパンに対するサンプリング決定を、10 進数の整数で指定します。

`x-datadog-tags`
: 128 ビットのトレース ID の上位 64 ビット (16 進数表現) など、Datadog トレースの追加情報を指定します。

### None 形式 {#none-format}

Datadog SDK が抽出または注入 (あるいはその両方) で None 形式を使用するように設定されている場合、Datadog SDK はリクエストヘッダーとやりとりを_行いません_。つまり、対応するコンテキスト伝搬処理は何もしません。

### Baggage {#baggage}

デフォルトでは、Baggage は OpenTelemetry の [W3C 互換ヘッダー][10] を使用して分散リクエスト全体で自動的に伝搬されます。Baggage を無効化するには、[DD_TRACE_PROPAGATION_STYLE][12] を `datadog,tracecontext` に設定してください。

#### Baggage をスパンタグとして追加する {#adding-baggage-as-span-tags}

デフォルトでは、`user.id,session.id,account.id` の Baggage キーはスパンタグとして追加されます。この設定をカスタマイズするには、[コンテキスト伝播設定][13] を参照してください。指定された Baggage キーは自動的にスパンタグ `baggage.<key>` として追加されます (たとえば、`baggage.user.id`)。

Baggage をスパンタグとしてサポートする機能は、以下のリリースで導入されました:

| 言語  | 最小 SDK バージョン                         |
|-----------|---------------------------------------------|
| Java      | 1.52.0                                      |
| Python    | 3.7.0                                       |
| Ruby      | 2.20.0                                      |
| Go        | 2.2.2                                       |
| .NET      | 3.23.0                                      |
| Node      | 5.54.0                                      |
| PHP       | 1.10.0                                      |
| C++/Proxy | 1.9.0 (Nginx)。他のプロキシはサポートされていません。|
| Rust      | サポートされていません                               |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: #language-support
[7]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm
[8]: /ja/synthetics/platform/apm
[9]: /ja/opentelemetry/interoperability/environment_variable_support
[10]: https://www.w3.org/TR/baggage/
[11]: /ja/help
[12]: #customize-trace-context-propagation
[13]: /ja/tracing/trace_collection/library_config#context-propagation