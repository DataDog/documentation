---
aliases:
- /ko/opentelemetry/setup/intake_endpoint/
- /ko/opentelemetry/setup/agentless/
further_reading:
- link: /opentelemetry/setup
  tag: 문서
  text: Datadog에 데이터 전송
- link: https://www.datadoghq.com/blog/native-otel-with-datadog/
  tag: 블로그
  text: 수집부터 조사까지 Datadog과 함께 OpenTelemetry 네이티브 관측성을 사용하십시오.
title: Datadog OTLP 수집 엔드포인트
---
## 개요 {#overview}

프로덕션 워크로드의 경우 Datadog은 [Datadog Agent][1] 또는 [OpenTelemetry Collector][2]를 통해 OpenTelemetry 데이터를 전송할 것을 권장합니다. 이러한 구성 요소는 메타데이터 보강, 신호 처리 및 중앙 집중식 샘플링을 제공합니다. 권장되는 컬렉터 설정은 OTLP를 통해 Datadog으로 텔레메트리를 내보냅니다.

컬렉터나 Agent를 배포할 수 없는 경우 이 페이지의 직접 OTLP 인테이크 엔드포인트를 사용하십시오. 예로는 Serverless 함수, 사용자를 대신하여 텔레메트리를 내보내는 관리형 플랫폼, 그리고 엄격한 리소스 제약이 있는 환경 등이 있습니다.

{{< img src="/opentelemetry/setup/direct-ingest.png" alt="다이어그램: OpenTelemetry SDK가 인테이크 엔드포인트를 통해 Datadog으로 데이터를 직접 전송합니다." style="width:100%;" >}}

설정은 텔레메트리가 어디에서 오는지에 따라 달라집니다. 먼저 [관리형 플랫폼][6] 목록을 검사하십시오; 플랫폼에 전용 엔드포인트가 있는 경우 해당 엔드포인트를 사용하십시오. 그렇지 않은 경우 Serverless 또는 신호별 페이지를 사용하십시오.

| 텔레메트리 출처... | 여기서 시작하십시오 |
|---|---|
| 관리형 플랫폼(Cloudflare, Vercel, Heroku, Netlify, Modal 및 [기타][6]) | [관리형 플랫폼][6] |
| 트레이스를 전송하는 Serverless 환경(Lambda, ECS Fargate, Azure Functions, Cloud Run, GKE Autopilot) | [Serverless][7] |
| 자체 앱, 호스트 또는 컨테이너 | [Logs][3], [Metrics][4] 또는 [Traces][8] |

참조: [Agent Observability를 위한 계측][5].

## 인테이크 제한 {#intake-limits}

Datadog은 각 OTLP 인테이크 엔드포인트에서 요청당 최대 페이로드 크기를 제한합니다. 제한을 초과한 요청은 `HTTP 413 Request Entity Too Large` 응답과 함께 거부됩니다. 413 오류가 발생하면 내보내기 배치 크기를 줄이거나 더 자주 플러시하여 각 요청이 제한을 넘지 않도록 합니다.

| 신호  | 엔드포인트 경로   | 최대 페이로드 크기    |
|---------|-----------------|-------------------------|
| 메트릭 | `/v1/metrics`   | 512 KiB (압축됨)    |
| Logs    | `/v1/logs`      | 5.1 MiB (압축 해제됨)  |
| Traces  | `/v1/traces`    | 15 MiB (압축 해제됨)   |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/otlp_ingest_in_the_agent/
[2]: /ko/opentelemetry/setup/collector_exporter/
[3]: /ko/opentelemetry/setup/otlp_ingest/logs/
[4]: /ko/opentelemetry/setup/otlp_ingest/metrics/
[5]: /ko/llm_observability/instrument/otel_instrumentation/?tab=python#setup
[6]: /ko/opentelemetry/setup/otlp_ingest/managed_platforms/
[7]: /ko/opentelemetry/setup/otlp_ingest/serverless/
[8]: /ko/opentelemetry/setup/otlp_ingest/traces/