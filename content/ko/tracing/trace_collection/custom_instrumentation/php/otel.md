---
aliases:
- /ko/tracing/trace_collection/otel_instrumentation/php/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
code_lang: otel
code_lang_weight: 1
description: OpenTelemetry API로 PHP 애플리케이션을 계측하여 Datadog로 트레이스를 전송합니다.
further_reading:
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
title: OpenTelemetry API를 사용한 PHP 커스텀 계측
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## 설정

OpenTelemetry를 설정하여 Datadog 트레이스 공급자를 사용하려면,

1. [OpenTelemetry API 패키지][13]를 설치합니다.
  ```php
  composer require open-telemetry/sdk
  ```
2. [OpenTelemetry PHP 매뉴얼 계측 설명서][5]에 따라 PHP 코드에 원하는 OpenTelemetry 계측을 수동으로 추가하세요. 

3. Datadog PHP 추적 라이브러리][6]을 설치합니다.

4. `DD_TRACE_OTEL_ENABLED`을 `true`로 설정합니다.

Datadog는 이러한 OpenTelemetry 스팬(span)을 다른 Datadog 애플리케이션 성능 모니터링(APM) 스팬(span)과 결합하여 애플리케이션의 단일 트레이스로 만듭니다.

## 스팬(span) 태그 추가하기

스팬(span)을 시작하는 바로 그 순간에 속성을 추가할 수 있습니다:

```php
$span = $tracer->spanBuilder('mySpan')
    ->setAttribute('key', 'value')
    ->startSpan();
```

또는 스팬(span) 이 활성화되어 있는 동안,

```php
$activeSpan = OpenTelemetry\API\Trace\Span::getCurrent();

$activeSpan->setAttribute('key', 'value');
```


## 스팬(span)에 오류 설정

 예외가 발생할 때 활성화되어 있는 경우 예외 정보가 캡처되고 스팬(span)에 첨부됩니다.

```php
// Create a span
$span = $tracer->spanBuilder('mySpan')->startSpan();

throw new \Exception('Oops!');

// 'mySpan' will be flagged as erroneous and have 
// the stack trace and exception message attached as tags
```

트레이스에 오류 플래그를 지정하는 것도 수동으로 할 수 있습니다:

```php
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\Context\Context;

// Can only be done after the setup steps, such as initializing the tracer.

try {
    throw new \Exception('Oops!');
} catch (\Exception $e) {
    $rootSpan = Span::fromContext(Context::getRoot());
    $rootSpan->recordException($e);
}
```
## 스팬(span) 추가

스팬(span)을 추가하려면,

```php
// Get a tracer or use an existing one
$tracerProvider = \OpenTelemetry\API\Globals::tracerProvider();
$tracer = $tracerProvider->getTracer('datadog')

// Create a span
$span = $tracer->spanBuilder('mySpan')->startSpan();

// ... do stuff

// Close the span
$span->end();

```

## 스팬 이벤트 추가하기

<div class="alert alert-info">스팬 이벤트를 추가하려면 SDK 버전 1.3.0 이상이 필요합니다.</div>

`addEvent` API를 사용하여 스팬 이벤트를 추가할 수 있습니다. 이 메서드에는 `name` 파라미터가 필요하며 선택적으로 `attributes` 및 `timestamp` 파라미터를 허용합니다. 이 메서드는 지정된 속성을 가진 새 스팬 이벤트를 생성하고 해당 스팬 이벤트와 연결합니다.

- **이름** [_필수_]: 이벤트의 이름을 나타내는 문자열입니다.
- **속성** [_옵션_]: 다음 속성을 가진 0개 이상의 키-값 쌍입니다.
  - 키는 비어 있지 않은 문자열이어야 합니다.
  - 값은 둘 중 하나가 될 수 있습니다.
    - 기본 유형: 문자열, 부울, 또는 숫자
    - 원시 타입 값의 균일한 배열(예: 문자열 배열)입니다.
  - 중첩 배열 및 서로 다른 데이터 유형의 요소를 포함하는 배열은 허용되지 않습니다.
- **타임스탬프** [_옵션_]: 이벤트 발생 시간을 나타내는 UNIX 타임스탬프입니다. `nanoseconds`가 예상됩니다.

다음 예는 스팬에 이벤트를 추가하는 다양한 방법을 보여줍니다.

```php
$span->addEvent("Event With No Attributes");
$span->addEvent(
    "Event With Some Attributes", 
    [ 
        'int_val' => 1, 
        'string_val' => "two", 
        'int_array' => [3, 4], 
        'string_array' => ["5", "6"],
        'bool_array' => [true, false]
    ]
);
```

자세한 내용은 [OpenTelemetry][14] 사양을 참조하세요.

### 예외 사항 기록

예외를 기록하려면 `recordException` API를 사용하세요. 이 메서드는 `exception` 파라미터가 필요하며, 선택적으로 UNIX `timestamp` 파라미터를 허용합니다. 표준화된 예외 속성을 포함하는 새 스팬 이벤트를 생성하고 해당 스팬과 연결합니다.

다음 예에서는 예외를 기록하는 다양한 방법을 보여줍니다.

```php
$span->recordException(new \Exception("Error Message"));
$span->recordException(new \Exception("Error Message"), [ "status" => "failed" ]);
```

자세한 내용은 [OpenTelemetry][15] 사양을 읽어보세요.

## 활성 스팬에 액세스(스팬(span))

현재 활성화된 스팬(span) 에 액세스하려면:

```PHP
스팬(span) = OpenTelemetry\API\추적하다\스팬(span)::getCurrent();
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/php/manual/
[6]: /ko/tracing/trace_collection/dd_libraries/php#getting-started
[13]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[15]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception