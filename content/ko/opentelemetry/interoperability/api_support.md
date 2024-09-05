---
algolia:
  tags:
  - otel 커스텀 계측
further_reading:
- link: tracing/guide/instrument_custom_method
  text: 커스텀 메서드 계측을 통해 비즈니스 논리를 더 깊게 가시화하기
- link: tracing/connect_logs_and_traces
  text: 로그 및 트레이스를 서로 연결
- link: tracing/visualization/
  text: 서비스, 리소스, 트레이스 탐색
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  text: Datadog 및 OpenTelemetry 이니셔티브에 대해 자세히 알아보기
title: OpenTelemetry API Support
---

Datadog 추적 라이브러리는 코드 계측을 위한 OpenTelemetry API의 구현을 제공합니다. 즉, 모든 서비스에 대해 벤더 중립적 계측을 유지하면서 Datadog의 네이티브 구현, 기능 및 제품을 계속 활용할 수 있습니다. Datadog 스타일 스팬(span) 및 트레이스를 생성하여 Datadog 추적 라이브러리로 프로세싱한 후 Datadog로 전송할 수 있습니다.

자세히 알아보려면 해당 언어의 링크를 클릭하세요:

{{< partial name="apm/otel-instrumentation.html" >}}

<br>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}