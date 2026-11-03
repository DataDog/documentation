---
further_reading:
- link: /opentelemetry/
  tag: 설명서
  text: Datadog의 OpenTelemetry
- link: https://www.datadoghq.com/architecture/enhancing-observability-in-aws-lambda-with-otel/
  tag: 아키텍처 센터
  text: Datadog 및 OpenTelemetry를 사용하여 AWS Lambda에서 애플리케이션 관측 가능성을 향상시킵니다.
title: 서버리스 및 OpenTelemetry
---
[OpenTelemetry][1]는 오픈 소스 통합 가시성 프레임워크로, IT 팀에 원격 분석 데이터 수집 및 라우팅을 위한 표준화된 프로토콜과 도구를 제공합니다.

[OpenTelemetry API][2]로 코드를 직접 계측하거나 벤더 중립적인 사용자 지정 계측 코드를 작성하려는 경우, Datadog 스타일의 스팬 및 트레이스를 생성하도록 구성할 수 있습니다. 그런 다음 해당 언어용 Datadog SDK로 이러한 스팬과 트레이스를 처리하고 데이터를 Datadog에 전송할 수 있습니다.

### AWS Lambda {#aws-lambda}

[AWS Lambda 및 OpenTelemetry][4]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /ko/tracing/trace_collection/otel_instrumentation/
[4]: /ko/serverless/aws_lambda/opentelemetry