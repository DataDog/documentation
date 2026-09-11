<div class="alert alert-info">
Datadog과 함께 OpenTelemetry를 언제 사용해야 하는지 <a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">OpenTelemetry API를 사용한 커스텀 계측</a>에서 확인해 보세요.
</div>

## 개요

다음의 경우 OpenTelemetry API를 사용해 애플리케이션을 수동으로 계측해야 합니다.

- Datadog이 [지원하는 라이브러리 계측][101]을 사용하고 있지 않습니다.
- `ddtrace` 라이브러리의 기능을 확장하고 싶습니다.
- 애플리케이션 계측을 보다 세밀하게 제어해야 합니다.

`ddtrace` 라이브러리는 이러한 목표를 달성하는 데 도움이 됩니다. 다음 섹션에서는 커스텀 계측을 위해 Datadog과 OpenTelemetry API를 함께 사용하는 방법을 다룹니다.

[101]: /ko/tracing/trace_collection/compatibility/