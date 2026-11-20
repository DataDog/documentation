---
code_lang: python
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: 소스 코드
  text: 소스 코드
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: 외부 사이트
  text: API 설명서
- link: /tracing/trace_collection/trace_context_propagation/
  tag: 설명서
  text: 트레이스 컨텍스트 전파
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 둘러보기
- link: tracing/
  tag: 설명서
  text: 고급 사용
- link: /opentelemetry/interoperability/environment_variable_support
  tag: 설명서
  text: OpenTelemetry 환경 변수 구성
title: Python SDK 구성
type: multi-code-lang
---
코드로 SDK를 설정한 다음 Agent를 구성하여 애플리케이션 성능 모니터링(APM) 데이터를 수집한 후에는 필요시 [Unified Service Tagging][1] 설정 등, 원하는 대로 SDK를 구성합니다.

{{% apm-config-visibility %}}

## Agentless 모드 {#agentless-mode}

`ddtrace` v4.15.0부터는 Datadog Agent 없이도 데이터를 Datadog으로 직접 전송할 수 있습니다. Agentless 모드를 활성화하려면 다음 환경 변수를 설정하세요.

- `DD_AGENTLESS_ENABLED`: `true`
- `DD_API_KEY`: Datadog [API 키][3]
- `DD_SITE`: [Datadog 사이트][4]

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

`DD_AGENTLESS_ENABLED` 값이 `true`이고 `DD_API_KEY`가 설정되지 않으면 SDK는 시작 시 오류를 발생시킵니다.

Agentless 모드에서 SDK는 다음 데이터를 Datadog으로 직접 전송합니다.

- 트레이스
- [Remote Configuration][5]
- [Dynamic Instrumentation][6]
- [Test Optimization][7]
- [LLM Observability][8]

다음 기능에는 Datadog Agent가 필요하며 Agentless 모드에서는 작동하지 않습니다.

- [런타임 메트릭][9]
- [프로파일링][10]
- 트레이서 플레어

`DD_CIVISIBILITY_AGENTLESS_ENABLED`와 `DD_LLMOBS_AGENTLESS_ENABLED`의 기본값은 `DD_AGENTLESS_ENABLED`의 값입니다. 해당 제품에 대해 Agentless 모드를 재정의하려면 둘 중 하나를 명시적으로 설정하세요.

**ddtrace-run**을 사용하는 경우 다음 [환경 변수 옵션][2]을 사용할 수 있습니다.

## 구성 키 {#configuration-keys}

{{< partial name="apm/registry-config-list.html" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/getting_started/site/
[5]: /ko/remote_configuration/
[6]: /ko/tracing/trace_collection/dynamic_instrumentation/
[7]: /ko/tests/
[8]: /ko/llm_observability/
[9]: /ko/tracing/metrics/runtime_metrics/
[10]: /ko/profiler/