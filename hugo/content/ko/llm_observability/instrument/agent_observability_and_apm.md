---
aliases:
- /ko/llm_observability/guide/llm_observability_and_apm
- /ko/llm_observability/monitoring/llm_observability_and_apm/
description: LLM 특화 작업 및 더 폭넓은 애플리케이션 생태계에 대한 인사이트를 얻을 수 있도록 Agent Observability 스팬과
  APM 스팬 간에 전환하며 탐색하는 방법을 알아보세요.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: 설명서
  text: Agent Observability 스팬에 대해 알아보기
- link: /glossary/#span/
  tag: 설명서
  text: APM 스팬에 대해 알아보기
- link: https://www.datadoghq.com/blog/troubleshooting-rag-llms/
  tag: 블로그
  text: RAG 기반 LLM 애플리케이션 문제 해결하기
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: 학습 센터
  text: LLM Observability로 조사하기
title: Agent Observability와 APM 상호 연결하기
---
## 개요 {#overview}

이 가이드에서는 Datadog에서 Agent Observability와 APM을 모두 사용하여 Agent Observability와 APM [스팬][6]을 상호 연결하는 방법을 설명합니다. 

Agent Observability로 LLM 특화 작업을 계측하고 APM으로 더 폭넓은 애플리케이션을 계측하면 다음을 수행할 수 있습니다.



* 종합적인 가시성 이해: 전체 애플리케이션 컨텍스트 내에서 LLM 애플리케이션의 업스트림 및 다운스트림 요청을 살펴봅니다.
* APM에서 Agent Observability 자세히 살펴보기: 애플리케이션 문제가 OpenAI 호출과 같은 LLM 특화 애플리케이션에 국한된 것인지 조사합니다.

## 설정 {#setup}

Agent Observability SDK는 APM의 dd-tracer를 기반으로 구축되었습니다. 이를 통해 [Application Performance Monitoring(APM)][7]과 함께 Agent Observability를 사용할 수 있습니다.

[Python용 Agent Observability SDK][1]를 APM의 [`dd-tracer`][2]와 함께 사용하는 경우, 추가 설정 없이 Datadog APM과 Agent Observability의 스팬 간을 탐색할 수 있습니다.

APM용 `dd-tracer`와 함께 [Agent Observability API][3]를 사용하는 경우 다음 단계를 따르세요.

1. 적절한 메서드를 사용해 트레이서에서 스팬 ID를 가져옵니다(예: Go 트레이서의 경우 `span.Context().SpanID()` 사용).
1. 모든 Agent Observability API 요청에 캡처된 스팬 ID를 포함합니다. 이렇게 하면 Datadog에서 APM 및 Agent Observability 스팬이 연결됩니다.

## 스팬 간 탐색 {#navigate-between-spans}

이 통합을 사용하면 애플리케이션 스택 전반에서 데이터를 상호 연결하고 LLM 애플리케이션이 다른 구성 요소와 어떻게 상호 작용하는지 이해할 수 있습니다. 또한 문제를 더 신속하게 해결하고 애플리케이션 성능을 최적화할 수 있습니다.

{{< img src="llm_observability/guides/apm/end_to_end_tracing.mp4" alt="이 동영상은 Datadog에서 Agent Observability 스팬과 APM 스팬 간을 탐색하는 기능을 보여줍니다." style="width:100%" video=true >}}

### Agent Observability에서 APM으로 전환 {#from-agent-observability-to-apm}

애플리케이션 생태계 내 LLM 운영의 더 폭넓은 맥락을 이해하려면 [Agent Observability Explorer][4]에서 Agent Observability 스팬을 선택하고 {{< ui >}}APM span{{< /ui >}}을 클릭하여 관련 APM 스팬으로 이동하세요.

{{< img src="llm_observability/guides/apm/llm_span.png" alt="Agent Observability의 Traces 페이지에서 탐색할 수 있는 관련 APM 스팬이 있는 Agent Observability 스팬" style="width:100%;" >}}

### APM에서 Agent Observability로 전환 {#from-apm-to-agent-observability}

LLM 특화 인사이트에 액세스하려면 [Trace Explorer][5]에서 APM 스팬을 선택하고 {{< ui >}}Info{{< /ui >}} 탭의 Agent Observability 섹션에서 {{< ui >}}View Span{{< /ui >}}을 클릭하여 해당 Agent Observability 스팬으로 이동하세요.

{{< img src="llm_observability/guides/apm/apm_span.png" alt="APM의 Traces 페이지에서 탐색할 수 있는 관련 Agent Observability 스팬이 있는 APM 스팬" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/setup/sdk/
[2]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[3]: /ko/llm_observability/setup/api/
[4]: https://app.datadoghq.com/llm/traces
[5]: https://app.datadoghq.com/apm/traces
[6]: /ko/llm_observability/quickstart/terms/#spans
[7]: /ko/tracing