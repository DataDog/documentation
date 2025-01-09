---
aliases:
- /ko/tracing/trace_collection/otel_instrumentation/php/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API를 사용해 PHP 애플리케이션을 계측하고 트레이스를 Datadog에 전송하세요.
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