---
further_reading:
- link: /opentelemetry/
  tag: 설명서
  text: Datadog의 OpenTelemetry
title: 서버리스 및 OpenTelemetry
---

[OpenTelemetry][1]는 오픈 소스 통합 가시성 프레임워크로, IT 팀에 원격 분석 데이터 수집 및 라우팅을 위한 표준화된 프로토콜과 도구를 제공합니다.

코드가 [OpenTelemetry API][2]로 커스텀 계측되거나 벤더 독립적 커스텀 계측 코드를를 작성하려는 경우, Datadog-스타일 스팬(span) 및 트레이스를 생성한 다음, 이 스팬(span) 및 트레이스를 Datadog 추적 라이브러리와 함께 프로세싱하여 Datadog에 데이터를 전송할 수 있습니다.

### AWS Lambda

[AWS Lambda 및 OpenTelemetry][4]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /ko/tracing/trace_collection/otel_instrumentation/
[4]: /ko/serverless/aws_lambda/opentelemetry