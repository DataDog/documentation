---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: 블로그
  text: W3C 트레이스 컨텍스트의 도움을 받아 OpenTelemetry 계측된 앱 모니터링하기
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
title: (레거시) Ruby 트레이스 컨텍스트 전파
---

<div class="alert alert-danger">이 문서는 <code>ddtrace</code> gem v1.x용입니다. <code>datadog</code> gem v2.0 이상 사용자는 최신 <a href="/tracing/trace_collection/trace_context_propagation/">Ruby 트레이스 컨텍스트 전파</a> 문서를 참고하세요.</div>

### 헤더 추출 및 삽입

Datadog APM 트레이서는 분산 추적을 위해 [B3][6] 및 [W3C Trace Context][7] 헤더 추출 및 삽입을 지원합니다.

분산 헤더 삽입 및 추출은 삽입 및 추출 방식을 설정하여 제어합니다. 지원되는 스타일은 다음과 같습니다.

- Datadog: `datadog`
- B3 Multi Header: `b3multi`
- B3 Single Header: `b3`
- W3C 트레이스 컨텍스트: `tracecontext`
- No-op: `none`

삽입 스타일은 다음을 사용해 구성할 수 있습니다.

- 환경 변수: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3`

환경 변수 값은 삽입에 사용할 헤더 스타일을 쉼표로 구분하여 나열한 목록입니다. 기본 설정은 `datadog,tracecontext`입니다.

추출 스타일은 다음을 사용해 구성할 수 있습니다.

- 환경 변수: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3`

환경 변수 값은 추출에 사용할 헤더 스타일을 쉼표로 구분하여 나열한 목록입니다. 기본 설정은 `datadog,tracecontext`입니다.

여러 추출 스타일이 활성화된 경우 구성된 스타일 순서대로 추출을 시도하고 먼저 성공적으로 추출된 값이 사용됩니다.

기본 추출 스타일은 순서대로 `datadog`, `b3multi`, `b3`, `tracecontext`입니다.

`Datadog.configure`을 사용하여 코드에서 이러한 형식의 사용을 활성화하거나 비활성화할 수도 있습니다.

```ruby
Datadog.configure do |c|
  # 추출해야 할 헤더 형식 목록
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'datadog', 'b3' ]

  # 삽입해야 할 헤더 형식 목록
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'datadog' ]
end
```

트레이스 컨텍스트 전파 구성에 대한 자세한 내용은 Ruby 추적 라이브러리 구성 문서의 [Distributed Tracing 섹션][1]에서 확인해 보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/dd_libraries/ruby/#distributed-tracing
[6]: https://github.com/openzipkin/b3-propagation
[7]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format