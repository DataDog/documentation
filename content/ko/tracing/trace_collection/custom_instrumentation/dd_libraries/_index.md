---
algolia:
  tags:
  - apm 커스텀 계측
aliases:
- /ko/tracing/setup/php/manual-installation
- /ko/agent/apm/php/manual-installation
- /ko/tracing/guide/distributed_tracing/
- /ko/tracing/advanced/manual_instrumentation/
- /ko/tracing/advanced/opentracing/
- /ko/tracing/opentracing/
- /ko/tracing/manual_instrumentation/
- /ko/tracing/guide/adding_metadata_to_spans
- /ko/tracing/advanced/adding_metadata_to_spans/
- /ko/tracing/custom_instrumentation
- /ko/tracing/setup_overview/custom_instrumentation/undefined
- /ko/tracing/setup_overview/custom_instrumentation/
description: Datadog 트레이스 내에서 계측 및 관측 맞춤 설정
further_reading:
- link: tracing/guide/instrument_custom_method
  text: 커스텀 메서드 계측을 통해 비즈니스 논리를 더 깊게 가시화하기
- link: 추적/연결_로그_및_트레이스
  text: 로그 및 트레이스를 서로 연결
- link: tracing/visualization/
  text: 서비스, 리소스 및 트레이스 탐색
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Datadog 및 OpenTelemetry 이니셔티브에 대해 자세히 알아보기
title: Datadog 라이브러리로 커스텀 계측
type: multi-code-lang
---

커스텀 계측을 사용하면 Datadog에 전송할 트레이스를 프로그래밍 방식으로 생성, 수정, 삭제할 수 있습니다. 또한 자동 계측 기능으로 캡처되지 않은 내부 코드를 추적하고, 트레이스에서 원치 않는 스팬을 제거하며, 스팬 태그 추가 등 스팬에 관한 상세한 정보와 컨텍스트를 제공할 수 있습니다.

애플리케이션을 계측하기 전에 Datadog [APM 용어][2]를 확인하고 Datadog APM의 핵심 개념을 숙지해 두세요.

개방형 표준을 사용하여 코드를 계측하는 경우 [OpenTracing으로 계측][3] 또는 [OpenTelemetry로 계측][4]을 참고하세요.

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[2]: /ko/tracing/glossary
[3]: /ko/tracing/trace_collection/opentracing/
[4]: /ko/tracing/trace_collection/otel_instrumentation