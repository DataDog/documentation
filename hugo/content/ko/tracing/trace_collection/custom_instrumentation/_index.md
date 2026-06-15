---
algolia:
  tags:
  - apm 커스텀 계측
further_reading:
- link: tracing/guide/instrument_custom_method
  text: 커스텀 메서드 계측을 통해 비즈니스 논리를 더 깊게 가시화하기
- link: 추적/연결_로그_및_트레이스
  text: 로그 및 트레이스를 서로 연결
- link: tracing/visualization/
  text: 서비스, 리소스 및 트레이스 탐색
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Datadog 및 OpenTelemetry 이니셔티브에 대해 자세히 알아보기
title: 커스텀 계측
---

## 개요

커스텀 계측을 사용하여 애플리케이션의 특정 구성 요소를 정밀하게 모니터링할 수 있습니다. 자동 계측으로는 포착할 수 없는 내부 코드나 복잡한 함수에서 관측 데이터를 수집할 수 있습니다. 자동 계측에는 [단일 단계 계측][5] 또는 [Datadog 추적 라이브러리][6] 사용이 포함됩니다.

커스텀 계측은 추적 코드를 애플리케이션 코드에 직접 삽입합니다. 이를 통해 Datadog에 전송할 트레이스를 프로그래밍 방식으로 생성, 수정, 삭제할 수 있습니다.

## 사용 사례

커스텀 계측은 다음과 같은 상황에서 사용할 수 있습니다:

- 고유하거나 복잡한 비즈니스 로직을 포함한 커스텀 코드에서 관측 데이터를 수집할 때
- 스팬에 관한 상세한 정보와 컨텍스트를 제공해야 할 때 (예: [스팬 태그][1] 추가)
- 세밀한 제어가 필요한 특정 작업 플로우나 사용자 상호작용을 정밀하게 모니터링해야 할 때
- 트레이스에서 원치 않는 스팬을 제거할 때

## 시작하기

시작하기 전에 [Agent를 설치하고 구성했는지][7] 확인하세요.

자세한 내용은 커스텀 계측 방식 관련 문서를 참고하세요.

{{< tabs >}}
{{% tab "Datadog API" %}}

Datadog API로 커스텀 계측을 추가하면 Datadog에 전송할 트레이스를 프로그래밍 방식으로 생성, 수정, 삭제할 수 있습니다. 또한 자동 계측 기능으로 캡처되지 않은 내부 코드를 추적하고, 트레이스에서 원치 않는 스팬을 제거하며, 스팬 태그 추가 등 스팬에 관한 상세한 정보와 컨텍스트를 제공할 수 있습니다.

{{< partial name="apm/apm-manual-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTelemetry API" %}}

Datadog 추적 라이브러리는 코드 계측을 위한 OpenTelemetry API의 구현을 제공합니다. 즉, 모든 서비스에 대해 벤더 중립적 계측을 유지하면서 Datadog의 네이티브 구현, 기능 및 제품을 계속 활용할 수 있습니다. Datadog 스타일 스팬(span) 및 트레이스를 생성하여 Datadog 추적 라이브러리로 프로세싱한 후 Datadog로 전송할 수 있습니다.

{{< partial name="apm/apm-otel-instrumentation-custom.html" >}}

<br>

{{% /tab %}}

{{% tab "OpenTracing (legacy)" %}}

[OpenTelemetry][1] 또는 [`ddtrace`][2] 커스텀 계측을 사용할 수 없는 경우, Datadog은 지원하는 언어별로 [OpenTracing][3] 데이터를 Datadog으로 전송하는 기능도 지원해 드립니다. OpenTracing은 아카이브되며 프로젝트는 지원되지 않습니다.

{{< partial name="apm/apm-opentracing-custom.html" >}}

<br>

[1]: /ko/tracing/trace_collection/otel_instrumentation/
[2]: /ko/tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[2]: /ko/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /ko/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /ko/tracing/trace_collection/single-step-apm
[6]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /ko/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent