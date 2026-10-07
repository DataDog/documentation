---
further_reading:
- link: /opentelemetry/
  tag: 설명서
  text: Datadog의 OpenTelemetry
title: AWS Lambda 및 OpenTelemetry
---

[OpenTelemetry][1]는 오픈 소스 통합 가시성 프레임워크로, IT 팀에 원격 분석 데이터 수집 및 라우팅을 위한 표준화된 프로토콜과 도구를 제공합니다.

이 페이지에서는 서버리스 모니터링 AWS Lambda에서 OpenTelemetry를 사용하는 방법에 대해 설명합니다. 서버리스 환경 이외에서 OpenTelemetry를 사용하는 방법을 포함한 자세한 내용은 [Datadog OpenTelemetry][2]를 참조하세요.

## OpenTelemetry를 사용한 AWS Lambda 계측

OpenTelemetry를 사용하여 AWS Lambda 함수를 계측하고 데이터를 Datadog로 전송하는 여러 가지 방법이 있습니다.

- [Datadog 트레이서](#opentelemetry-api-support-within-datadog-tracers)에서 OpenTelemetry API 지원(권장)
- [Datadog 람다 확장(#sdk)(베타)을 통해 모든 OpenTelemetry SDK에서 OpenTelemetry 트레이스 전송]

### Datadog 추적기 내에서 OpenTelemetry API 지원

Datadog 설치 시 Datadog 람다 확장에 포함된 라이브러리 추적은 커스텀 스팬(span)과 트레이스 OpenTelemetry 계측 코드로 만든 프로세스 텔레메트리를 수신하여 Datadog로 전송합니다.

예를 들어, 주요 목표가 이미 OpenTelemetry API 로 계측된 코드인 경우 이 접근 방식을 사용할 수 있습니다. 즉, 모든 서비스의 벤더 중립적 계측을 유지하면서 Datadog의 기본 구현, 태깅 및 기능을 계속 활용할 수 있습니다. 

OpenTelemetry API를 사용해 AWS Lambda를 계측하려면 Lambda 함수에서 환경 변수 `DD_TRACE_OTEL_ENABLED`를 `true`로 설정하고, 런타임 관련 지침은 [OpenTelemetry API를 사용한 커스텀 계측][3]을 참조하세요.


### Datadog 람다 확장 프로그램{#sdk}을 통해 OpenTelemetry SDK에서 OpenTelemetry 트레이스 전송하세요.

<div class="alert alert-danger">이 기능은 베타 버전입니다.</div>

이 접근 방식은 [Datadog 에이전트 ][4]의 OLTP 수집과 유사합니다. 런타임에 추적 지원을 사용할 수 없는 상황(예: Rust 또는 PHP)에서는 권장됩니다.

1. OpenTelemetry에 스팬을 Datadog Lambda 확장 프로그램으로 내보낼 것을 지시합니다. 그런 다음 AWS Lambda에 OpenTelemetry 계측을 추가합니다.

   {{< tabs >}}
   {{% tab "Python" %}}
   ```py
   from opentelemetry.instrumentation.botocore import BotocoreInstrumentor
   from opentelemetry.instrumentation.aws_lambda import AwsLambdaInstrumentor
   from opentelemetry import trace
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.exporter.otlp.trace_exporter import OTLPExporter
   from opentelemetry.sdk.trace.export import SimpleSpanProcessor
   from opentelemetry.resource import Resource
   from opentelemetry.semconv.resource import (
       SERVICE_NAME,
       SemanticResourceAttributes,
   )

   # Create a TracerProvider
   tracer_provider = TracerProvider(resource=Resource.create({SERVICE_NAME: <YOUR_SERVICE_NAME>}))

   # Add a span processor with an OTLP exporter
   tracer_provider.add_span_processor(
       SimpleSpanProcessor(
           OTLPExporter(endpoint="http://localhost:4318/v1/traces")
       )
   )

   # Register the provider
   trace.set_tracer_provider(tracer_provider)

   # Instrument AWS SDK and AWS Lambda
   BotocoreInstrumentor().instrument(tracer_provider=tracer_provider)
   AwsLambdaInstrumentor().instrument(tracer_provider=tracer_provider)
   ```
   {{% /tab %}}
   {{% tab "Node.js" %}}
   ```js
   // instrument.js

   const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
   const { Resource } = require('@opentelemetry/resources');
   const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
   const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
   const provider = new NodeTracerProvider({
       resource: new Resource({
           [SemanticResourceAttributes.SERVICE_NAME ]: 'rey-app-otlp-dev-node',
       })
   });
  공급자.addSpanProcessor(
       새로운 SimpleSpanProcessor(
           새로운 OTLPTraceExporter(
               { url: 'http://localhost:4318/v1/트레이스' },
           ),
       ),
   );
  공급자.register();

   const { AwsInstrumentation } = require('@opentelemetry/계측-AWS-sdk');
   const { AwsLambdaInstrumentation } = require('@opentelemetry/계측-AWS-lambda');
   const { registerInstrumentations } = require('@opentelemetry/계측');

   registerInstrumentations({
       계측: [
           새로운 AwsInstrumentation({
               suppressInternalInstrumentation: true,
           }),
           새로운 AwsLambdaInstrumentation({
               disableAwsContextPropagation: true,
           }),
       ],
   });

   ```
   {{% /tab %}}
   {{< /tabs >}}

1. `serverless.yml` 을 수정하여 런타임에 계측 을 적용하고, Datadog 확장 v53+ 을 추가하고, Datadog 확장에 환경 변수 `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` 를 `localhost:4318` (HTTP 용) 또는 `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 를 `localhost:4317` (gRPC 용)으로 설정하여 OpenTelemetry 를 활성화합니다. Datadog 추적 레이어는 추가하지 마세요.

   {{< tabs >}}
   {{% tab Python %}}
   ```yaml
  서비스: <YOUR_SERVICE_NAME>

  공급자:
     name: AWS
     region: <YOUR_REGION>
     런타임: python3.8 # 또는 사용 중인 파이썬(Python) 버전
    환경:
       DD_API_KEY: ${env:DD_API_KEY}
       DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: localhost:4318
     레이어
       - arn:AWS:lambda:sa-east-1:464622532012:layer:Datadog-Extension:53

  기능/함수:
    파이썬(Python):
       핸들러: 핸들러.핸들러
      환경:
         INSTRUMENTATION_FLAG: true
   ```

   그런 다음 파이썬(Python) 코드를 적절히 업데이트합니다. 예를 들어 `handler.py`:

   ```py
   import os

   def 핸들러(이벤트, 컨텍스트):
       if os.environ.get('INSTRUMENTATION_FLAG') == 'true':
           # 여기에 계측 로직을 수행합니다.
           print("계측 is enabled")

       # 여기에 일반적인 핸들러 로직을 수행합니다.
       print(" 이벤트 처리 중")
   ```
   {{% /tabs %}}
   {{% tab "Node.js" %}}
   ```yaml
   # 서버리스.yml

  서비스: <YOUR_SERVICE_NAME>

  공급자:
     name: AWS
     region: <YOUR_REGION>
     런타임: nodejs18.x # 또는 사용 중인 Node.js 버전
    환경:
       DD_API_KEY: ${env:DD_API_KEY}
       DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: localhost:4318
     레이어
       - arn:AWS:lambda:sa-east-1:464622532012:layer:Datadog-Extension:53

  기능/함수:
     node:
       핸들러: 핸들러.핸들러
      환경:
         NODE_OPTIONS: --require 계측하다
   ```
   {{% /tab %}}
   {{< /tabs >}}

1. 배포.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /ko/opentelemetry
[3]: /ko/tracing/trace_collection/otel_instrumentation/
[4]: /ko/opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host