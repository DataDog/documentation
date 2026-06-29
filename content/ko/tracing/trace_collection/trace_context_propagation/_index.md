---
aliases:
- /ko/tracing/trace_collection/trace_context_propagation/cpp
- /ko/tracing/trace_collection/trace_context_propagation/dotnet
- /ko/tracing/trace_collection/trace_context_propagation/go
- /ko/tracing/trace_collection/trace_context_propagation/java
- /ko/tracing/trace_collection/trace_context_propagation/nodejs
- /ko/tracing/trace_collection/trace_context_propagation/php
- /ko/tracing/trace_collection/trace_context_propagation/python
- /ko/tracing/trace_collection/trace_context_propagation/ruby
description: Datadog, B3 및 W3C Trace Context 헤더를 추출하고 주입하여 분산 트레이스의 컨텍스트를 전파합니다.
further_reading:
- link: tracing/glossary/
  tag: 설명서
  text: 애플리케이션 성능 모니터링(APM) 용어 이해
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: 블로그
  text: W3C 트레이스 컨텍스트의 도움을 받아 OpenTelemetry 계측된 앱 모니터링하기
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
title: 트레이스 컨텍스트 전파
type: multi-code-lang
---
트레이스 컨텍스트 전파는 트레이스 ID, 스팬 ID 및 샘플링 결정과 같은 트레이스 정보를 분산 애플리케이션의 한 구성 요소에서 다른 구성 요소로 전달하는 메커니즘입니다. 이를 통해 요청에 포함된 모든 트레이스(및 추가 텔레메트리)를 서로 연관시킬 수 있습니다. 자동 계측이 활성화되면 트레이스 컨텍스트 전파는 Datadog SDK가 자동으로 처리합니다.

기본적으로 Datadog SDK는 다음 형식을 사용하여 분산 트레이스 헤더를 추출하고 주입합니다.

- [Datadog][1](헤더를 추출할 때 가장 높은 우선순위를 차지함)
- [W3C Trace Context][2]
- [Baggage][10]

이 기본 구성은 이전 Datadog SDK 버전 및 제품과의 호환성을 최대화하는 동시에 OpenTelemetry와 같은 다른 분산 트레이싱 시스템과의 상호 운용성을 허용합니다.

## 트레이스 컨텍스트 전파 사용자 지정 {#customize-trace-context-propagation}

다음과 같은 경우 트레이스 컨텍스트 전파 구성을 사용자 지정해야 할 수 있습니다.

- 애플리케이션이 다른 지원 형식으로 분산 트레이싱 정보를 전달하는 경우
- 애플리케이션이 분산 트레이싱 헤더의 추출 또는 주입을 방지해야 하는 경우

다음 환경 변수를 사용하여 분산 트레이싱 헤더의 읽기 및 쓰기 형식을 구성하세요. 언어별 구성 값은 [언어 지원][6] 섹션을 참조하세요.

`DD_TRACE_PROPAGATION_STYLE`
: 추출 및 주입에 사용할 트레이스 컨텍스트 전파 형식을 쉼표로 구분된 목록으로 지정합니다. 추출 전용 또는 주입 전용 구성이 우선 적용됩니다.<br>
**기본값**: `datadog,tracecontext,baggage` <br>
**참고**: 여러 트레이스 컨텍스트 형식이 있는 경우, 추출은 지정된 순서를 따릅니다(예: `datadog,tracecontext`는 Datadog 헤더를 먼저 확인합니다). 첫 번째 유효한 컨텍스트가 트레이스를 이어받고, 이후 발견된 유효한 컨텍스트는 스팬 링크로 저장됩니다. `baggage`이 포함되면 기존 컨텍스트에 [Baggage](#baggage)로 추가됩니다.

`OTEL_PROPAGATORS`
: 추출 및 주입에 모두 사용할 트레이스 컨텍스트 전파 형식을 쉼표로 구분된 목록으로 지정합니다. 우선순위가 가장 낮으며, 다른 Datadog 트레이스 컨텍스트 전파 환경 변수가 설정되어 있으면 무시됩니다.<br>
**참고**: OpenTelemetry SDK에서 Datadog SDK로 애플리케이션을 마이그레이션할 때만 이 구성을 사용하세요. 이 구성 및 기타 OpenTelemetry 환경 변수에 대한 자세한 내용은 [Datadog SDK에서 OpenTelemetry 환경 변수 사용하기][9]를 참조하세요.

`DD_TRACE_PROPAGATION_BEHAVIOR_EXTRACT`
수신된 분산 트레이싱 헤더를 서비스 수준에서 어떻게 처리할지 지정합니다. 허용되는 값:<br>
`continue`: 수신된 분산 트레이스 헤더가 유효한 트레이싱 컨텍스트를 나타내면 SDK는 기존 분산 트레이스를 계속합니다.<br>
`restart`: SDK는 항상 새로운 트레이스를 시작합니다. 수신된 분산 트레이싱 헤더가 유효한 트레이스 컨텍스트를 나타내면 해당 트레이스 컨텍스트는 서비스 진입 스팬에서 스팬 링크로 표시됩니다(`continue` 구성의 상위 스팬과는 반대).<br>
`ignore`: SDK는 항상 새로운 트레이스를 시작하며 모든 수신된 분산 트레이싱 헤더는 무시됩니다.<br>
**기본값**: `continue` <br>
**참고**: 이는 .NET, Node.js, Python 및 Java 라이브러리에서만 구현됩니다.

### 고급 구성 {#advanced-configuration}

대부분의 서비스는 동일한 형식을 사용하여 트레이스 컨텍스트 헤더를 송수신합니다. 그러나 트레이스 컨텍스트 헤더를 송수신할 때 서로 다른 형식을 사용해야 하는 경우 다음 구성을 사용하세요.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: 쉼표로 구분된 목록에서 추출 전용으로 사용할 트레이스 컨텍스트 전파 형식을 지정합니다. 추출 전파기 구성 시 가장 높은 우선 순위입니다.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: 쉼표로 구분된 목록에서 주입 전용으로 사용할 트레이스 컨텍스트 전파 형식을 지정합니다. 주입 전파기 구성 시 가장 높은 우선 순위입니다.

## 지원되는 형식 {#supported-formats}

Datadog SDK는 다음의 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값        |
|------------------------|----------------------------|
| [Datadog][1]           | `datadog`                  |
| [W3C Trace Context][2] | `tracecontext`             |
| [B3 Single][3]         | _언어별 값_ |
| [B3 Multi][4]          | `b3multi`                  |
| [Baggage][10]          | `baggage`<sup>*</sup>       |
| [None][5]              | `none`                     |

<sup>*</sup> **참고**: Rust에서는 `baggage`가 지원되지 않습니다.

## 언어 지원 {#language-support}

{{< tabs >}}

{{% tab "Java" %}}

### 지원되는 형식 {#supported-formats-1}

Datadog Java SDK는 지원 중단된 구성 값을 비롯해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [B3 Single][3]         | `b3 single header`  |
|                        | `b3single`          |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3`(지원 중단됨)   |
| [Baggage][7]          | `baggage`           |
| [AWS X-Ray][5]         | `xray`              |
| [None][6]              | `none`              |

### 추가 구성 {#additional-configuration}

환경 변수 구성 외에도 시스템 속성 구성을 사용하여 전파기를 업데이트할 수 있습니다.
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

### 지원되는 형식 {#supported-formats-2}

Datadog Python SDK는 지원 중단된 구성 값을 포함해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값             |
|------------------------|---------------------------------|
| [Datadog][1]           | `datadog`                       |
| [W3C Trace Context][2] | `tracecontext`                  |
| [Baggage][6]           | `baggage`                       |
| [B3 Single][3]         | `b3`                            |
|                        | `b3 single header`(v3.0에서 제거됨) |
| [B3 Multi][4]          | `b3multi`                       |
| [None][5]              | `none`                          |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Ruby" %}}

### 지원되는 형식 {#supported-formats-3}

Datadog Ruby SDK는 지원 중단된 구성 값을 포함해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `b3`                |
| [B3 Multi][4]          | `b3multi`           |
| [None][5]              | `none`              |

### 추가 구성 {#additional-configuration-1}

환경 변수 구성 외에도 `Datadog.configure`를 사용하여 코드에서 전파기를 업데이트할 수 있습니다.

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

### 지원되는 형식 {#supported-formats-4}

Datadog Go SDK는 지원 중단된 구성 값을 포함해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `b3`(지원 중단됨)   |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "Node.js" %}}

### 지원되는 형식 {#supported-formats-5}

Datadog Node.js SDK는 지원 중단된 구성 값을 포함해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3`(지원 중단됨)   |
| [None][5]              | `none`              |

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "PHP" %}}

### 지원되는 형식 {#supported-formats-6}

Datadog PHP SDK는 지원 중단된 구성 값을 포함해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Single][3]         | `B3 single header`  |
| [B3 Multi][4]          | `b3multi`           |
|                        | `B3`(지원 중단됨)   |
| [None][5]              | `none`              |

### 추가 사용 사례 {#additional-use-cases}

다음 사용 사례는 Datadog PHP SDK에 관련된 내용입니다.

{{% collapse-content title="PHP 스크립트 실행 시 분산 트레이싱" level="h4" %}}

새 PHP 스크립트가 실행되면, Datadog SDK는 분산 트레이싱을 위한 Datadog 헤더가 존재하는지 자동으로 확인합니다.
- `x-datadog-trace-id`(환경 변수: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id`(환경 변수: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin`(환경 변수: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags`(환경 변수: `HTTP_X_DATADOG_TAGS`)

{{% /collapse-content %}}

{{% collapse-content title="분산 트레이싱 컨텍스트를 수동으로 설정하기" level="h4" %}}

새로운 또는 기존 트레이스를 위한 CLI 스크립트에서 트레이싱 정보를 수동으로 설정하려면, `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` 함수를 사용하세요.

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

버전 **0.87.0** 이상에서는 원시 헤더를 사용할 수 있는 경우 `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)` 함수를 사용하세요. **참고**: 헤더 이름은 소문자로 작성해야 합니다.

```php
$headers = [
	"x-datadog-trace-id" => "1234567890",
	"x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

트레이스 컨텍스트를 헤더 형식으로 직접 추출하려면, `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array` 함수를 사용하세요.

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// Store headers somewhere, inject them in an outbound request, ...
// These $headers can also be read back by \DDTrace\consume_distributed_tracing_headers from another process.
```

이 함수의 선택적 인수는 주입 스타일 이름의 배열을 허용합니다. 기본적으로는 구성된 주입 스타일이 사용됩니다.

{{% /collapse-content %}}

{{% collapse-content title="RabbitMQ" level="h4" %}}

PHP SDK는 `php-amqplib/php-amqplib` 라이브러리(버전 0.87.0 이상)의 자동 트레이싱을 지원합니다. 그러나 경우에 따라 분산 트레이스가 끊어질 수 있습니다. 예를 들어, 기존 트레이스 외부에서 `basic_get` 메서드를 사용하여 분산 대기열의 메시지를 읽는 경우에는 `basic_get` 호출과 이후 메시지 처리 로직을 감싸는 사용자 지정 트레이스를 추가해야 합니다.

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

이와 같이 소비-처리 로직을 감싸는 트레이스를 생성하면 분산 대기열에 대한 가시성을 확보할 수 있습니다.

{{% /collapse-content %}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: https://www.w3.org/TR/baggage/

{{% /tab %}}

{{% tab "C++" %}}

### 지원되는 형식 {#supported-formats-7}

Datadog C++ SDK는 지원 중단된 구성 값을 포함해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값 |
|------------------------|---------------------|
| [Datadog][1]           | `datadog`           |
| [W3C Trace Context][2] | `tracecontext`      |
| [Baggage][6]          | `baggage`           |
| [B3 Multi][4]          | `b3`                |
|                        | `b3multi`           |
| [None][5]              | `none`              |

### 추가 구성 {#additional-configuration-2}

환경 변수 구성 외에도 코드에서 전파기를 업데이트할 수 있습니다.

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

### 추가 사용 사례 {#additional-use-cases-1}

{{% collapse-content title="전파된 컨텍스트를 수동으로 추출" level="h4" %}}

전파 컨텍스트를 추출하려면 사용자 지정 `DictReader` 인터페이스를 구현한 후 `Tracer::extract_span` 또는 `Tracer::extract_or_create_span`을 호출하세요.

다음은 HTTP 헤더에서 전파 컨텍스트를 추출하는 예입니다.

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

{{% collapse-content title="분산 트레이싱을 위한 컨텍스트를 수동으로 주입" level="h4" %}}

전파 컨텍스트를 주입하려면 `DictWriter` 인터페이스를 구현한 후 스팬 인스턴스에서 `Span::inject`를 호출하세요.

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

### 지원되는 형식 {#supported-formats-8}

Datadog .NET SDK는 지원 중단된 구성 값을 포함해 다음 트레이스 컨텍스트 형식을 지원합니다.

| 형식                 | 구성 값           |
|------------------------|-------------------------------|
| [Datadog][1]           | `datadog`                     |
| [W3C Trace Context][2] | `tracecontext`                |
| [Baggage][9]          | `baggage`                     |
|                        | `W3C`(지원 중단됨)            |
| [B3 Single][3]         | `B3 single header`            |
|                        | `B3SingleHeader`(지원 중단됨) |
| [B3 Multi][4]          | `b3multi`                     |
|                        | `B3`(지원 중단됨)             |
| [None][5]              | `none`                        |

### 추가 사용 사례 {#additional-use-cases-2}

{{% collapse-content title="이전 기본 구성" level="h4" %}}

- 버전 [2.48.0][6]부터 기본 전파 스타일은 `datadog, tracecontext`입니다. 즉, Datadog 헤더를 먼저 사용하고 그다음 W3C Trace Context를 사용합니다.
- 버전 2.48.0 이전에는 추출 및 주입 모두에 대해 `tracecontext, Datadog` 순서가 사용되었습니다.
- 버전 [2.22.0][7] 이전에는 `Datadog` 주입 스타일만 활성화되어 있었습니다.
- 버전 [2.42.0][8]부터 여러 개의 추출기를 지정한 경우, `DD_TRACE_PROPAGATION_EXTRACT_FIRST=true` 구성을 통해 첫 번째 유효한 `tracecontext`를 발견했을 때 즉시 컨텍스트 추출을 종료할지 여부를 지정할 수 있습니다. 기본값은 `false`입니다.

{{% /collapse-content %}}

{{% collapse-content title="메시지 대기열을 통한 분산 트레이싱" level="h4" %}}

대부분의 경우, 헤더 추출 및 주입은 자동으로 이루어집니다. 그러나 분산 트레이스 연결이 끊어질 수 있는 일부 알려진 사례가 있습니다. 예를 들어 분산 대기열에서 메시지를 읽을 때 일부 라이브러리는 스팬 컨텍스트를 유지하지 못할 수 있습니다. Kafka 메시지를 소비할 때 `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`를 `false`로 설정한 경우에도 발생할 수 있습니다. 이러한 경우, 다음 코드를 사용하여 사용자 지정 트레이스를 추가할 수 있습니다.

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

`GetHeaderValues` 메서드를 제공하세요. 이 메서드의 구현 방식은 `SpanContext`를 전달하는 구조에 따라 다릅니다.

예시는 다음과 같습니다.

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

Kafka 컨슈머 스팬을 추적하기 위해 `SpanContextExtractor` API를 사용할 때는 `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED`를 `false`로 설정하세요. 이렇게 하면 메시지가 토픽에서 소비된 직후 컨슈머 스팬이 올바르게 닫히고 메타데이터(예: `partition` 및 `offset`)가 올바르게 기록됩니다. `SpanContextExtractor` API를 사용하여 Kafka 메시지에서 생성된 스팬은 프로듀서 스팬의 자식이며, 컨슈머 스팬의 형제입니다.

자동으로 계측되지 않는 라이브러리(WCF 클라이언트 등)의 경우 트레이스 컨텍스트를 수동으로 전파해야 하는 경우, `SpanContextInjection` API를 사용할 수 있습니다. 다음은 `this`가 WCF 클라이언트인 경우의 예입니다.

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

<div class="alert alert-info">Datadog Rust SDK는 미리보기 상태입니다.</div>

Datadog Rust SDK는 OpenTelemetry(OTel) SDK를 기반으로 구축되었습니다.

트레이스 컨텍스트 전파는 OTel SDK가 처리하며 기본적으로 `datadog-opentelemetry`가 구성되어 `datadog` 형식과 `tracecontext`(W3C) 형식을 모두 지원합니다.

### 지원되는 형식 {#supported-formats-9}

| 형식 | 구성 값 |
|---|---|
| [Datadog][1] | `datadog` |
| [W3C Trace Context][2] | `tracecontext` |

### 구성 {#configuration}

사용할 전파 형식은 `DD_TRACE_PROPAGATION_STYLE` 환경 변수로 제어할 수 있습니다. 쉼표로 구분된 목록을 제공할 수 있습니다.

예:

```bash
# To support both W3C and Datadog
export DD_TRACE_PROPAGATION_STYLE="tracecontext,datadog"
```

### 수동 주입 및 추출 {#manual-injection-and-extraction}

Rust에 대한 자동 계측이 없기 때문에 원격 호출(예: HTTP 요청)을 송수신할 때 수동으로 컨텍스트를 전파해야 합니다.
- `HeaderExtractor` : 수신 요청 헤더에서 부모 컨텍스트를 **추출**하려면
- `HeaderInjector` : 현재 컨텍스트를 송신 요청 헤더에 **주입**하려면

먼저, `opentelemetry-http`를 `Cargo.toml`에 추가하세요.

```toml
[dependencies]
# Provides HeaderInjector and HeaderExtractor
# Ensure this version matches your other opentelemetry dependencies
opentelemetry-http = "0.31"

# Only required for the Hyper examples below
http-body-util = "0.1"
```

<div class="alert alert-danger">버전 충돌을 방지하려면 <code>opentelemetry-http</code> 의 버전을 다른 OpenTelemetry 종속성과 동일하게 사용해야 합니다.</div>

### 컨텍스트 주입(클라이언트 측) {#injecting-context-client-side}

HTTP 요청(예: `hyper` 1.0 사용 시)을 전송할 때 `HeaderInjector`를 사용하여 현재 스팬 컨텍스트를 요청 헤더에 주입합니다.

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

### 컨텍스트 추출(서버 측) {#extracting-context-server-side}

HTTP 요청을 수신할 때 `HeaderExtractor`를 사용하여 헤더에서 추적 컨텍스트를 추출합니다.

Tokio와 같은 비동기 런타임을 사용할 때는 추출된 컨텍스트를 future에 연결해야 비동기 작업 체인 전체에 걸쳐 올바르게 전파됩니다.

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

## 사용자 지정 헤더 형식 {#custom-header-formats}

### Datadog 형식 {#datadog-format}

Datadog SDK가 추출 또는 주입(또는 둘 다)을 위해 Datadog 형식으로 구성되면, Datadog SDK는 다음 요청 헤더와 상호 작용합니다.

`x-datadog-trace-id`
: 128비트 트레이스 ID의 하위 64비트를 10진수 형식으로 지정합니다.

`x-datadog-parent-id`
: 현재 스팬의 64비트 스팬 ID를 10진수 형식으로 지정합니다.

`x-datadog-origin`
: 트레이스를 시작한 Datadog 제품을 지정합니다. 예를 들어 [Real User Monitoring][7] 또는 [Synthetic Monitoring][8]이 있습니다. 이 헤더가 존재하는 경우, 값은 : `rum`, `synthetics`, `synthetics-browser` 중 하나여야 합니다.

`x-datadog-sampling-priority`
: 표시된 스팬에 대해 내린 샘플링 결정을 10진수 형식의 정수로 지정합니다.

`x-datadog-tags`
: 보조 Datadog 트레이스 상태 정보를 지정합니다. 여기에는 128비트 트레이스 ID의 상위 64비트(16진수 형식)가 포함되며, 이에 국한되지 않습니다.

### None 형식 {#none-format}

Datadog SDK가 추출 또는 주입(둘 다 가능)을 위해 None 형식으로 구성되면, Datadog SDK는 요청 헤더와 상호 작용하지 _않으며_, 이는 해당 컨텍스트 전파 작업이 아무것도 하지 않음을 의미합니다.

### Baggage {#baggage}

기본적으로, Baggage는 OpenTelemetry의 [W3C 호환 헤더][10]를 사용하여 분산 요청을 통해 자동으로 전파됩니다. Baggage를 비활성화하려면 [DD_TRACE_PROPAGATION_STYLE][12]을 `datadog,tracecontext`로 설정하세요.

#### 스팬 태그로 Baggage 추가 {#adding-baggage-as-span-tags}

기본적으로, `user.id,session.id,account.id` Baggage 키는 스팬 태그로 자동 추가됩니다. 이 구성을 사용자 지정하려면 [컨텍스트 전파 구성][13]을 참조하세요. 지정된 Baggage 키는 자동으로 스팬 태그로 추가됩니다`baggage.<key>` (예: `baggage.user.id`).

스팬 태그로서의 Baggage 지원은 다음 릴리스에서 도입되었습니다.

| 언어  | 최소 SDK 버전                         |
|-----------|---------------------------------------------|
| Java      | 1.52.0                                      |
| Python    | 3.7.0                                       |
| Ruby      | 2.20.0                                      |
| Go        | 2.2.2                                       |
| .NET      | 3.23.0                                      |
| Node      | 5.54.0                                      |
| PHP       | 1.10.0                                      |
| C++/Proxy | 1.9.0(Nginx). 다른 Proxy는 지원되지 않습니다. |
| Rust      | 지원되지 않음                               |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #datadog-format
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: #none-format
[6]: #language-support
[7]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm
[8]: /ko/synthetics/platform/apm
[9]: /ko/opentelemetry/interoperability/environment_variable_support
[10]: https://www.w3.org/TR/baggage/
[11]: /ko/help
[12]: #customize-trace-context-propagation
[13]: /ko/tracing/trace_collection/library_config#context-propagation