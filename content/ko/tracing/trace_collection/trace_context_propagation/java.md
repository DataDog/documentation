---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: 블로그
  text: W3C 트레이스 컨텍스트를 사용해 OpenTelemetry 계측된 앱 모니터링하기
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: 설명서
  text: OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스
kind: 설명서
title: Java 트레이스 컨텍스트 전파
type: multi-code-lang
---


Datadog API 추적기에서는 분산 추적을 위해 [B3][13] 및 [W3C 트레이스 컨텍스트][14] 헤더 추출 및 삽입을 지원합니다.

분산 헤더에 따른 삽입과 추출 스타일을 구성할 수 있습니다.

Java 추적기는 다음 스타일을 지원합니다.

- Datadog: `datadog`
- B3 멀티 헤더: `b3multi`(`b3` 앨리어스는 이제 사용되지 않음)
- W3C 트레이스 컨텍스트: `tracecontext`(1.11.0부터 사용 가능)
- B3 싱글 헤더: `b3 single header`(`b3single`)

삽입 스타일은 다음을 사용해 구성할 수 있습니다.

- 시스템 속성: `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- 환경 변수: `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3multi`

속성이나 환경 변수 값은 쉼표(또는 띄어쓰기)로 구분된 헤더 스타일 목록이며 삽입에 사용할 수 있습니다. 기본 설정은 `datadog,tracecontext` 삽입 스타일입니다.

추출 스타일은 다음을 사용해 구성할 수 있습니다.

- 시스템 속성: `-Ddd.trace.propagation.style.extract=datadog,b3multi`
- 환경 변수: `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3multi`

속성이나 환경 변수 값은 쉼표(또는 띄어쓰기)로 구분된 헤더 스타일 목록이며 추출에 사용할 수 있습니다. 기본적으로 `datadog,tracecontext` 설정을 사용한 `datadog`와 `tracecontext` 추출 스타일로 설정되어 있고, `datadog` 스타일이 `tracecontext` 스타일보다 우선 순위가 높습니다.

추출 스타일 여럿이 활성화되어 있을 경우 스타일이 구성된 순서대로 추출을 실행하며 가장 먼저 성공적으로 추출된 값이 사용됩니다. 추후 유효한 트레이스 컨텍스트가 발견되면 컨텍스트가 종료되고 스팬 링크로 추가됩니다. 또 `tracecontext` 스타일을 활성화한 경우 W3C Traceparent가 추출된 컨텍스트와 일치할 경우 W3C Tracestate이 전파됩니다.

컨텍스트 전파 설정과 다른 구성에 관한 자세한 참조를 보려면 [Java 추적 라이브러리 구성][1]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format