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
  tag: Documentation
  text: APM の用語を理解する
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: トレースコンテキストの伝播
type: multi-code-lang
---

トレースコンテキスト伝搬は、トレース ID、スパン ID、サンプリングの決定といったトレーシング情報を、分散アプリケーションのある部分から別の部分へ受け渡す仕組みです。これにより、リクエスト内のすべてのトレース (および追加のテレメトリー) が相互に関連付けられるようになります。自動インスツルメンテーションが有効な場合、APM SDK によってトレースコンテキスト伝搬は自動的に処理されます。

デフォルトでは、Datadog SDK は以下の形式を用いて分散トレーシングヘッダーの抽出と注入を行います:

- [Datadog][1] (ヘッダーを抽出する際はこちらが優先されます) 
- [W3C Trace Context][2]
- [Baggage][10]

このデフォルト設定により、以前の Datadog SDK バージョンや製品との互換性を最大限に保ちつつ、OpenTelemetry のような他の分散トレーシングシステムとの相互運用も可能になります。

## トレースコンテキスト伝搬のカスタマイズ

以下のようなケースでは、トレースコンテキスト伝搬の設定をカスタマイズする必要があるかもしれません:

- サポートされている別の形式で分散トレーシング情報をやりとりしている
- 分散トレーシングヘッダーを抽出または注入しないようにしたい

分散トレーシングヘッダーの読み取り・書き込み形式を指定するには、次の環境変数を使用します。言語固有の設定値については、[言語別サポート][6]のセクションを参照してください。

`DD_TRACE_PROPAGATION_STYLE`
: 抽出と注入の両方に使用するトレースコンテキスト伝搬形式をカンマ区切りで指定します。抽出専用または注入専用の設定がある場合、それらが優先されます。<br>
**デフォルト**: `datadog,tracecontext`<br>
**注**: 複数形式を指定した場合、抽出時は指定された順序 (例: `datadog,tracecontext`) でチェックが行われます。最初に有効と判断されたコンテキストがトレースを継続し、その後に見つかった有効なコンテキストはスパンリンクとなります。

`OTEL_PROPAGATORS`
: 抽出と注入の両方に使用するトレースコンテキスト伝搬形式をカンマ区切りで指定します。他の Datadog のトレースコンテキスト伝搬用環境変数が設定されている場合は無視されます (優先度が最も低い)。<br>
**注**: この設定は、OpenTelemetry SDK から Datadog SDK に移行する際のみ使用してください。この設定やその他の OpenTelemetry 用環境変数について詳しくは、[Datadog SDKs で OpenTelemetry の環境変数を使用する][9]を参照してください。

### 高度なコンフィギュレーション

多くのサービスでは同じ形式を使ってトレースコンテキストヘッダーを送受信します。しかし、あるサービスで特定の形式のトレースコンテキストヘッダーを受け取り、別の形式で送信する必要がある場合は、以下の設定を使用できます:

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: トレースコンテキスト伝搬形式のうち「抽出専用」として使用する形式をカンマ区切りで指定します。抽出用設定としては最も優先度が高くなります。

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: トレースコンテキスト伝搬形式のうち「注入専用」として使用する形式をカンマ区切りで指定します。注入用設定としては最も優先度が高くなります。

## 対応している形式

Datadog SDK は、以下のトレースコンテキスト形式をサポートしています:

| 形式                 | 設定値           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [W3C Trace Context][2] | `tracecontext`                |
| [B3 Single][3]         | 言語依存の値    |
| [B3 Multi][4]          | `b3multi`                     |
| [Baggage][10]          | `baggage`                     |
| [None][5]              | `none`                        |

## 言語別サポート

{{< tabs >}}

{{% tab "Java" %}}

### 対応している形式

Datadog Java SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (非推奨)   |
| [AWS X-Ray][5]         | `xray`              |
| [None][6]              | `none`              |

### 追加構成

環境変数での設定に加えて、システムプロパティを使ってプロパゲータを更新することもできます:
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

{{% /tab %}}

{{% tab "Python" %}}

### 対応している形式

Datadog Python SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値             |
|------------------------|---------------------------------|
| [Datadog][1]           | `datadog`                       |
| [W3C Trace Context][2] | `tracecontext`                  |
| [B3 Single][3]         | `b3`                            |
|                        | `b3 single header` (非推奨) |
| [B3 Multi][4]          | `b3multi`                       |
| [None][5]              | `none`                          |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "Ruby" %}}

### 対応している形式

Datadog Ruby SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [None][5]              | `none`              |

### 追加構成

環境変数での設定に加えて、コード内で Datadog.configure を使ってプロパゲータを更新することもできます:

```ruby
Datadog.configure do |c|
# 抽出に使用するヘッダー形式のリスト
c.tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

# 注入に使用するヘッダー形式のリスト
c.tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "Go" %}}

### 対応している形式

Datadog Go SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3` (非推奨)   |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "Node.js" %}}

### 対応している形式

Datadog Node.js SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (非推奨)   |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "PHP" %}}

### 対応している形式

Datadog PHP SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3` (非推奨)   |
| [None][5]              | `none`              |

### さまざまな使用例

以下のユースケースは、Datadog PHP SDK 特有のものです:

{{% collapse-content title="PHPスクリプト起動時の分散トレーシング" level="h4" %}}

新しい PHP スクリプトが起動されると、Datadog SDK は分散トレーシング用の Datadog ヘッダーが存在するかどうかを自動的にチェックします。
- `x-datadog-trace-id` (環境変数: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (環境変数: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (環境変数: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (環境変数: `HTTP_X_DATADOG_TAGS`)

{{% /collapse-content %}}

{{% collapse-content title="分散トレーシングコンテキストを手動で設定する" level="h4" %}}

新規または既存のトレースに対して CLI スクリプトでトレース情報を手動設定するには、`DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` 関数を使用します。

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

バージョン **0.87.0** 以降では、未加工 (raw) のヘッダーを利用できる場合、`DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)` 関数を使用します。**注**: ヘッダー名はすべて小文字である必要があります。

```php
$headers = [
    "x-datadog-trace-id" => "1234567890",
    "x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

トレースコンテキストをヘッダーとして直接取得するには、`DDTrace\generate_distributed_tracing_headers(?array $inject = null): array` 関数を使用します。

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// ヘッダーをどこかに保存し、アウトバウンドリクエストに挿入し、... 
// また、これらの $headers は、他のプロセスから \DDTrace\consume_distributed_tracing_headers によって読み返すことができます。
```


この関数のオプション引数には、インジェクションスタイル名の配列を指定できます。デフォルトでは設定済みのインジェクションスタイルが使われます。

{{% /collapse-content %}}

{{% collapse-content title="RabbitMQ" level="h4" %}}

PHP APM SDK は `php-amqplib/php-amqplib` ライブラリ (バージョン 0.87.0+) の自動トレースをサポートしています。ただし、場合によっては分散トレースが途切れてしまうことがあります。たとえば、既存のトレースの外部で `basic_get` メソッドを使用して分散キューからメッセージを受信する場合、`basic_get` の呼び出しと該当するメッセージ処理部分をカスタムトレースで囲む必要があります。

```php
// 囲むトレースを作成します
$newTrace = \DDTrace\start_trace_span();
$newTrace->name = 'basic_get.process';
$newTrace->service = 'amqp';


// basic_get call(s) + message(s) 処理
$msg = $channel->basic_get($queue);
if ($msg) {
   $messageProcessing($msg);
}


// 完了したら、スパンを閉じます
\DDTrace\close_span();
```

この囲むトレースを消費処理ロジックに作成することで、分散キューの観測可能性を確保することができます。

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab "C++" %}}

### 対応している形式

Datadog C++ SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| [None][5]              | `none`              |

### 追加構成

環境変数での設定に加えて、コード内でもプロパゲータを更新できます:

"```cpp
#include <datadog/tracer_config.h>
#include <datadog/propagation_style.h>

namespace dd = datadog::tracing;
int main() {
dd::TracerConfig config;
config.service = "my-service";

// `injection_styles` はトレースコンテキストの注入 (送信) 時に、
// どのトレーシングシステムとの互換性を持たせるかを指定します。
// ここに指定されたすべてのスタイルが注入に使用されます。
// `injection_styles` は環境変数 `DD_TRACE_PROPAGATION_STYLE_INJECT` および
// `DD_TRACE_PROPAGATION_STYLE` によって上書きされます。
config.injection_styles = {dd::PropagationStyle::DATADOG, dd::PropagationStyle::B3};

// `extraction_styles` はトレースコンテキストの抽出 (受信) 時に、
// どのトレーシングシステムとの互換性を持たせるかを指定します。
// `extraction_styles` に並んだ順番で抽出が試行されます。
// 最初に有効なコンテキストが見つかるかエラーが発生した時点で
// 抽出結果が決まります。
// `extraction_styles` は環境変数
// `DD_TRACE_PROPAGATION_STYLE_EXTRACT` および
// `DD_TRACE_PROPAGATION_STYLE` によって上書きされます。
config.extraction_styles = {dd::PropagationStyle::W3C};

...
}
```"

### さまざまな使用例

{{% collapse-content title="プロパゲートされたコンテキストを手動で抽出する" level="h4" %}}

プロパゲーションコンテキストを抽出するには、カスタムの `DictReader` インターフェイスを実装し、`Tracer::extract_span` または `Tracer::extract_or_create_span` を呼び出します。

以下は、HTTP ヘッダーからプロパゲーションコンテキストを抽出するサンプルです:

"```cpp
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

// 指定された `key` に対応する値を返します。
// 値がない場合は `nullopt` を返します。
dd::Optional<dd::StringView> lookup(dd::StringView key) const override {
auto found = headers_.find(key);
if (found == headers_.cend()) return dd::nullopt;

return found->second;
}

// このオブジェクトに含まれるすべてのキー/値の組に対して、
// 指定された `visitor` を呼び出します。
void visit(
const std::function<void(dd::StringView key, dd::StringView value)>& visitor)
const override {
for (const auto& [key, value] : headers_) {
visitor(key, value);
}
};
};

// 使用例:
void handle_http_request(const Request& request, datadog::tracing::Tracer& tracer) {
HTTPHeadersReader reader{request.headers};
auto maybe_span = tracer.extract_span(reader);
..
}
```"
{{% /collapse-content %}}

{{% collapse-content title="分散トレーシング用コンテキストを手動で注入する" level="h4" %}}

プロパゲーションコンテキストを注入するには、DictWriter インターフェイスを実装し、スパンインスタンスに対して Span::inject を呼び出します。

"```cpp
#include <datadog/dict_writer.h>
#include <datadog/string_view.h>

#include <string>
#include <unordered_map>

using namespace dd = datadog::tracing;

class HTTPHeaderWriter : public dd::DictWriter {
std::unordered_map<std::string, std::string>& headers_;

public:
explicit HTTPHeaderWriter(std::unordered_map<std::string, std::string>& headers): headers_(headers) {}

~HTTPHeaderWriter() override = default;

void set(dd::StringView key, dd::StringView value) override {
headers_.emplace(key, value);
}
};

// 使用例:
void handle_http_request(const Request& request, dd::Tracer& tracer) {
auto span = tracer.create_span();

HTTPHeaderWriter writer(request.headers);
span.inject(writer);
// これで `request.headers` にスパンを伝搬するために必要なヘッダーが設定されます。
..
}
```"
{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format

{{% /tab %}}

{{% tab ".NET" %}}

### 対応している形式

Datadog .NET SDK は、以下のトレースコンテキスト形式をサポートしています (非推奨の設定値も含む):

| 形式                 | 設定値           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [W3C Trace Context][2] | `tracecontext`                |
|                        | `W3C` (非推奨)            |
| [B3 Single][3]         | `B3 single header`            |
|                        | `B3SingleHeader` (非推奨) |
| [B3 Multi][4]          | `b3multi`                     |
|                        | `B3` (非推奨)             |
| [None][5]              | `none`                        |

### さまざまな使用例

{{% collapse-content title="従来の設定デフォルト" level="h4" %}}

- [2.48.0][6] 以降のバージョンでは、デフォルトのプロパゲーションスタイルは `datadog, tracecontext` です。これは、Datadog ヘッダーを先に使用し、その後に W3C Trace Context を使用することを意味します。
- バージョン 2.48.0 より前は、抽出と注入の両方で `tracecontext, Datadog` の順序が用いられていました。
- [2.22.0][7] より前のバージョンでは、`Datadog` のみが注入スタイルとして有効でした。
- [2.42.0][8] 以降では、複数の抽出スタイルを指定した場合に `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` を設定すると、有効な `tracecontext` が最初に検出された時点で抽出を即座に終了するよう制御できます。デフォルト値は `false` です。

{{% /collapse-content %}}

{{% collapse-content title="メッセージキューを使用した分散トレーシング" level="h4" %}}

多くの場合、ヘッダーの抽出と注入は自動的に行われます。しかし、いくつかのケースでは分散トレースが切断される可能性があります。たとえば、分散キューからメッセージを読み込む場合に、一部のライブラリがスパンコンテキストを失ってしまうことがあります。また、Kafka メッセージを取得するときに `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定している場合も同様です。こうしたケースでは、以下のコード例のようにカスタムトレースを追加できます。

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

`GetHeaderValues` メソッドを提供します。このメソッドの実装方法は、`SpanContext` を保持する構造に依存します。

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
            // 無視
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
    // SQS の場合、メッセージ属性ヘッダーは最大 10 個なので、
    // Datadog のヘッダーは以下のプロパティを持つ 1 つのヘッダーに統合されます。
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

Kafka コンシューマースパンをトレースするために `SpanContextExtractor` API を使用する場合、`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定します。これにより、メッセージがトピックから消費された直後にコンシューマースパンが正しく閉じられ、メタデータ (`partition` や `offset` など) が正しく記録されることが保証されます。`SpanContextExtractor` API を使用して Kafka メッセージから作成されたスパンは、プロデューサーのスパンの子であり、コンシューマーのスパンの兄弟になります。

(WCF クライアントのように自動的にインスツルメンテーションされないライブラリに対して) トレースコンテキストを手動で伝播する必要がある場合、`SpanContextInjection` API を使用することができます。以下は WCF の例で、`this` は WCF クライアントです。

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


{{% /tab %}}

{{< /tabs >}}

## カスタムヘッダー形式

### Datadog 形式

Datadog SDK が抽出または注入 (あるいはその両方) で Datadog 形式を使用するように設定されている場合、Datadog SDK は以下のリクエストヘッダーを処理します:

`x-datadog-trace-id`
: 128 ビットのトレース ID の下位 64 ビットを 10 進数で指定します。

`x-datadog-parent-id`
: 現在のスパンに対応する 64 ビットのスパン ID を 10 進数で指定します。

`x-datadog-origin`
: トレースを開始した Datadog 製品 ([Real User Monitoring][7] や [Synthetic Monitoring][8] など) を示します。このヘッダーが存在する場合、値は `rum`、`synthetics`、`synthetics-browser` のいずれかである必要があります。

`x-datadog-sampling-priority`
: 表示されているスパンのサンプリング決定を 10 進数の整数で指定します。

`x-datadog-tags`
: 128 ビットのトレースID の上位 64 ビット (16 進数表現) など、Datadog トレースの追加情報を指定します。

### None 形式

Datadog SDK が抽出または注入 (あるいはその両方) で None 形式を使用するように設定されている場合、Datadog SDK はリクエストヘッダーとやり取りを行いません。つまり、対応するコンテキスト伝搬処理は何もしません。

### Baggage

現時点では Python、Node.js、.NET で利用可能です。他の言語については[サポート][11]までお問い合わせください。

デフォルトでは、Baggage は OpenTelemetry の [W3C 互換ヘッダー][10] を使用して分散リクエスト全体で自動的に伝搬されます。Baggage を無効化するには、[DD_TRACE_PROPAGATION_STYLE][12] を `datadog,tracecontext` に設定してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: #language-support
[7]: /ja/real_user_monitoring/platform/connect_rum_and_traces
[8]: /ja/synthetics/platform/apm
[9]: /ja/opentelemetry/interoperability/environment_variable_support
[10]: https://www.w3.org/TR/baggage/
[11]: /ja/help
[12]: #customize-trace-context-propagation