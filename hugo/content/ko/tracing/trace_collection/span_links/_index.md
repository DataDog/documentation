---
description: OpenTelemetry 스팬 링크를 사용하여 복잡한 분산 시스템 워크플로에서 트레이스와 작업 전반에 걸쳐 스팬을 상호 연관시킵니다.
further_reading:
- link: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
  tag: 설명서
  text: OpenTelemetry 스팬 링크
- link: /tracing/trace_collection/otel_instrumentation/
  tag: 설명서
  text: OpenTelemetry API를 사용한 커스텀 계측
- link: /tracing/trace_collection/custom_instrumentation/
  tag: 설명서
  text: Datadog 라이브러리로 커스텀 계측
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: 블로그
  text: Datadog을 사용하여 모든 호스팅 플랜에서 Azure Functions 모니터링하기
title: 스팬 링크
---
{{< img src="tracing/span_links/span_links_tab_2.png" alt="스팬 링크 탭" style="width:90%;">}}

## 개요 {#overview}

스팬 링크는 [OpenTelemetry 개념][5]이며 [OpenTelemetry 트레이싱 API][2]의 일부입니다. Datadog은 다음을 위한 스팬 링크를 지원합니다.

- [OpenTelemetry SDK][6]로 계측된 애플리케이션.
- [Datadog SDK][9]로 계측된 애플리케이션.

스팬 링크는 인과 관계가 있지만 일반적인 상위-하위 관계가 없는 하나 이상의 스팬을 상호 연관시킵니다. 이러한 링크는 동일한 트레이스 내 또는 서로 다른 트레이스 간의 스팬을 상호 연관시킬 수 있습니다.

스팬 링크는 워크플로가 종종 선형 실행 패턴에서 벗어나는 분산 시스템에서 작업을 추적하는 데 도움이 됩니다. 이는 요청을 배치로 실행하거나 이벤트를 비동기적으로 처리하는 시스템에서 작업 흐름을 추적하는 데 유용합니다.

Datadog은 순방향 및 역방향 스팬 링크를 모두 지원하므로 사용자가 트레이스 간의 스팬 관계를 양방향으로 시각화하고 탐색할 수 있습니다.

- 순방향 링크: 스팬은 동일한 트레이스에 속하든 다른 트레이스에 속하든 관계없이 시간상 나중에 발생하는 다른 스팬에 연결될 수 있습니다. 이를 통해 트레이스 간에 이전 작업에서 후속 작업으로 이동할 수 있습니다.
- 역방향 링크: 마찬가지로 스팬은 동일한 트레이스 내에서나 서로 다른 트레이스 간에서 시간상 더 일찍 발생한 스팬에 연결될 수 있습니다. 이를 통해 나중 작업에서 이전 작업으로 역으로 추적할 수 있습니다.

## 일반적인 사용 사례 {#common-use-cases}

스팬 링크는 여러 작업이 단일 스팬으로 수렴되는 팬인(fan-in) 시나리오에서 가장 적합합니다. 단일 스팬은 수렴되는 여러 작업으로 다시 연결됩니다.

예를 들면 다음과 같습니다.

- **스캐터-개더(Scatter-Gather) 및 맵-리듀스(Map-Reduce)**: 여기에서 스팬 링크는 단일 결합 프로세스로 수렴되는 여러 병렬 프로세스를 추적하고 상호 연관시킵니다. 이들은 이러한 병렬 프로세스의 결과를 집합적 결과물에 연결합니다.

- **메시지 집계**: Kafka Streams와 같은 시스템에서 스팬 링크는 메시지 그룹의 각 메시지를 집계된 결과에 연결하여 개별 메시지가 최종 출력에 어떻게 기여하는지 보여줍니다.

- **트랜잭션 메시징**: 메시지 대기열과 같이 여러 메시지가 단일 트랜잭션의 일부인 시나리오에서 스팬 링크가 각 메시지와 전체 트랜잭션 프로세스 간의 관계를 추적합니다.

- **이벤트 소싱**: 이벤트 소싱의 스팬 링크는 여러 변경 메시지가 엔터티의 현재 상태에 어떻게 기여하는지를 추적합니다.

## 스팬 링크 생성{#creating-span-links}

애플리케이션이 다음으로 계측된 경우:

- OpenTelemetry SDK - 해당 언어에 대한 OpenTelemetry 수동 계측 설명서를 따릅니다. 예를 들어, [Java용 링크가 포함된 스팬 생성][3]을 확인하세요.
- Datadog SDK - [스팬 링크 추가][1] 예시를 따릅니다.

## 최소 지원{#minimum-support}

**참고***: 이 섹션은 Datadog APM 클라이언트 라이브러리(OpenTelemetry API 사용)를 통해 스팬 링크를 생성하기 위한 최소 지원을 문서화합니다. OpenTelemetry SDK에서 생성된 스팬 링크는 [OTLP Ingest][8]를 통해 Datadog으로 전송됩니다.

[Datadog SDK][7]를 사용하여 스팬 링크를 생성하려면 Agent v7.52.0 이상이 필요합니다. 스팬 링크에 대한 지원은 다음 릴리스에서 도입되었습니다.

| 언어  | 최소 SDK 버전|
|-----------|---------------------------------|
| C++/Proxy | 아직 지원되지 않음               |
| Go        | 1.61.0                          |
| Java      | 1.26.0                          |
| .NET      | 2.53.0                          |
| Node      | 5.3.0                           |
| PHP       | 0.97.0                          |
| Python    | 2.5.0                           |
| Ruby      | 2.0.0                           |

## 스팬 링크 보기{#viewing-span-links}

Datadog의 [Trace Explorer][4]에서 스팬 링크를 볼 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/custom_instrumentation/php/#adding-span-links
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /ko/tracing/trace_explorer/trace_view/?tab=spanlinks#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/ko/opentelemetry/interoperability/otlp_ingest_in_the_agent
[9]: /ko/tracing/trace_collection/custom_instrumentation/?tab=datadogapi