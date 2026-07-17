---
title: 에이전트 호스트와 트레이서 호스트의 차이점 이해하기
---

## 개요

Datadog 애플리케이션 성능 모니터링(APM)에서 `host` 태그는 스팬 및 트레이스를 인프라스트럭처 모니터링 데이터와 상호 연관시키므로, 호스트 메트릭은 스팬 및 트레이스의 호스트와 연관됩니다.

## Datadog 에이전트 vs. 트레이서 호스트네임

**에이전트 호스트**는 Datadog 에이전트가 실행되는 호스트입니다. **트레이서 호스트**는 추적 라이브러리로 계측한 애플리케이션이 실행되는 호스트입니다.

에이전트 호스트 및 트레이서 호스트는 인프라스트럭처에 Datadog 에이전트를 배포하는 방식에 따라 달라집니다.


에이전트가 애플리케이션과 동일한 호스트에 배포되는 경우(예: [DaemonSet][1] 사용), 에이전트 호스트와 트레이서 호스트는 동일합니다.

{{< img src="/tracing/guide/agent_tracer_hostnames/agent_host.png" alt="애플리케이션과 동일한 호스트에서 배포된 에이전트" style="width:80%;" >}}

에이전트가 원격 호스트에 배포된 경우 에이전트 호스트와 트레이서 호스트는 서로 다릅니다.

{{< img src="/tracing/guide/agent_tracer_hostnames/remote_host.png" alt="애플리케이션과 다른, 원격 호스트에 배포된 에이전트" style="width:80%;" >}}

### 트레이서 및 에이전트 호스트는 스팬에 언제 설정되나요?

- Datadog 에이전트 호스트네임은 항상 스팬에 설정됩니다.
- `DD_TRACE_REPORT_HOSTNAME`이 `true`라면 트레이서 호스트네임은 스팬에 설정됩니다(기본값은 `false`).

 언어 | 구성 | 환경 변수
----------|--------|---------------------
Ruby | `tracing.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
C++ | `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`
Node.js | `reportHostname` | `DD_TRACE_REPORT_HOSTNAME`
Go | - | `DD_TRACE_REPORT_HOSTNAME`
Python | - | `DD_TRACE_REPORT_HOSTNAME`
PHP | `datadog.trace.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
Java |  `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`

### 애플리케이션 성능 모니터링(APM)은 호스트 정보를 언제 사용하나요?

애플리케이션 성능 모니터링(APM)은 [보존 필터][2]를 만들거나, [스팬에서 메트릭][3]을 생성하거나, 쿼리에서 호스트 태그 필터를 사용하여 [민감한 데이터 스캐너 규칙][4]을 정할 때 호스트 정보를 사용합니다. 예를 들어, `availability-zone` 및 `cluster-name`과 같은 호스트 태그 필터는 Datadog 에이전트 호스트 정보로 보강됩니다.






[1]: /ko/containers/kubernetes/apm/?tab=daemonset
[2]: /ko/tracing/trace_pipeline/trace_retention
[3]: /ko/tracing/trace_pipeline/generate_metrics
[4]: /ko/sensitive_data_scanner/