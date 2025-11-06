---
aliases:
- /ko/tracing/trace_collection/otel_instrumentation/ruby/
- /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/ruby
code_lang: otel
code_lang_weight: 1
description: OpenTelemetry API로 Ruby 애플리케이션을 계측하여 Datadog에 트레이스를 전송하세요.
further_reading:
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
title: OpenTelemetry API를 사용한 Ruby 커스텀 계측
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}


## 필수 요건 및 제한 사항

- Datadog Ruby 추적 라이브러리 `dd-trace-rb` 버전 1.9.0 이상.
- Gem 버전은 1.1.0 이상을 지원합니다.

Datadog 라이브러리에 구현된 OpenTelemetry 기능은 다음과 같습니다.

| 기능                               | 지원 사항                       |
|---------------------------------------|--------------------------------------|
| [OpenTelemetry Context 전파][1]         | [Datadog 및 W3C Trace Context 헤더 형식][9]은 기본적으로 활성화되어 있습니다. | 
| [Span Processors][2]                  | 미지원                                          | 
| [Span Exporters][3]                   | 미지원                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger`는 `Datadog.logger`와 동일한 개체로 설정됩니다. [사용자 정의 로깅][10]을 통해 구성하세요. |
| 트레이스/스팬 [ID Generators][4]         | 추적 라이브러리가 ID를 생성하며, **[128비트 트레이스 ID][12]**를 지원합니다.     |


## Datadog 추적 라이브러리를 사용하도록 OpenTelemetry 구성

1. [OpenTelemetry Ruby 수동 계측 설명서][5]에 따라 원하는 수동 OpenTelemetry 계측을 Ruby 코드에 추가합니다. **중요!** 해당 지침에서 코드가 OpenTelemetry SDK를 호출하도록 되어 있는 경우, 대신 Datadog 추적 라이브러리를 호출해야 합니다.

1. Gemfile에 `datadog` gem을 추가합니다.

    ```ruby
    source 'https://rubygems.org'
    gem 'datadog' # For dd-trace-rb v1.x, use the `ddtrace` gem.
    ```

1. `bundle install`을 실행하여 gem을 설치합니다.
1. OpenTelemetry 구성 파일에 다음 줄을 추가합니다.

    ```ruby
    require 'opentelemetry/sdk'
    require 'datadog/opentelemetry'
    ```

1. 애플리케이션에 구성 블록을 추가하여 통합을 활성화하고 트레이서 설정을 변경할 수 있습니다. 여기에서 추가 구성이 없으면 OpenTelemetry로 계측한 코드만 추적됩니다.

    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

   이 블록을 사용하면 다음을 할 수 있습니다.

    - [Datadog 구성 설정 추가][6]
    - [Datadog 계측 활성화 또는 재구성][7]

   OpenTelemetry 구성은 [`OpenTelemetry::SDK.configure` 블록][15]을 사용하여 개별적으로 변경할 수 있습니다.

Datadog은 이러한 OpenTelemetry 스팬을 다른 Datadog APM 스팬과 결합하여 애플리케이션의 단일 트레이스를 제공합니다. 또한 [통합 계측][7] 및 [OpenTelemetry Automatic 계측][8]도 지원합니다.

## 스팬 이벤트 추가하기

<div class="alert alert-info">스팬 이벤트를 추가하려면 SDK 버전 2.3.0 이상이 필요합니다.</div>

`add_event` API를 사용하여 스팬 이벤트를 추가할 수 있습니다. 이 메서드에는 `name` 파라미터가 필수이며, 선택적으로 `attributes` 또는 `timestamp` 파라미터를 허용합니다. 이 메서드는 지정된 속성을 사용하여 새 스팬 이벤트를 생성하고 해당 스팬과 연결합니다.

- **이름** [_필수_]: 이벤트의 이름을 나타내는 문자열입니다.
- **속성** [_옵션_]: 다음 속성을 가진 0개 이상의 키-값 쌍입니다:
  - 키는 비어 있지 않은 문자열이어야 합니다.
  - 값은 둘 중 하나가 될 수 있습니다.
    - 기본 유형: 문자열, 부울 또는 숫자
    - 원시 타입 값의 균일한 배열(예: 문자열 배열)입니다.
  - 중첩 배열 및 서로 다른 데이터 유형의 요소를 포함하는 배열은 허용되지 않습니다.
- **Timestamp** [_선택 사항_]: 이벤트 발생 시간을 나타내는 UNIX 타임스탬프. `seconds(Float)` 형식 사용.

다음 예는 스팬에 이벤트를 추가하는 다양한 방법을 보여줍니다.

```ruby
span.add_event('Event With No Attributes')
span.add_event(
  'Event With All Attributes',
  attributes: { 'int_val' => 1, 'string_val' => 'two', 'int_array' => [3, 4], 'string_array' => ['5', '6'], 'bool_array' => [false, true]}
)
```

자세한 내용은 [OpenTelemetry][13] 사양을 참고하세요.

### 레코딩 예외 사항

예외를 기록하려면 `record_exception` API를 사용하세요. 이 메서드에는 `exception` 파라미터가 필수이며, 선택적으로 UNIX `timestamp` 파라미터를 허용합니다. 표준화된 예외 속성을 포함하는 새 스팬 이벤트를 생성하고 해당 스팬과 연결합니다.

다음 예에서는 예외를 기록하는 다양한 방법을 보여줍니다.

```ruby
span.record_exception(
  StandardError.new('Error Message')
)
span.record_exception(
  StandardError.new('Error Message'),
  attributes: { 'status' => 'failed' }
)
```

자세한 내용은 [OpenTelemetry][14] 사양을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/ruby/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[6]: /ko/tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[7]: /ko/tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[8]: https://opentelemetry.io/docs/languages/ruby/libraries/
[9]: /ko/tracing/trace_collection/trace_context_propagation/
[10]: /ko/tracing/trace_collection/dd_libraries/ruby/#custom-logging
[12]: /ko/opentelemetry/guide/otel_api_tracing_interoperability/
[13]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[15]: https://opentelemetry.io/docs/languages/ruby/getting-started/#instrumentation