---
aliases:
- /ko/bits_ai/bits_ai_sre/help_bits_learn/
- /ko/bits_ai/bits_investigation/help_bits_learn/
- /ko/bits_ai/bits_ai_sre/knowledge_sources/
title: 지식 소스
---
Bits Investigation은 세 가지 고유한 지식 소스를 결합하여 지속적으로 개선됩니다.
- [**런북:**](#runbooks) 단계별 문제 해결 지침
- [**bits.md:**](#bitsmd) 환경 관련 컨텍스트
- [**피드백 및 메모리:**](#feedback-and-memories) 조사를 통해 얻은 인사이트

## 런북 {#runbooks}
Bits를 새로운 팀원으로 생각하고 온보딩 절차를 진행하세요. 더 많은 컨텍스트를 제공할수록 Bits가 조사를 보다 효과적으로 수행할 수 있습니다.

모니터 메시지에 직접 단계별 문제 해결 지침을 추가하거나, 해당 지침이 명시된 Confluence 페이지에 연결할 수 있습니다.

- **Datadog 텔레메트리 링크 포함**: 모니터 메시지에 지침을 추가할 때 가장 관련성이 높은 텔레메트리 링크를 포함합니다. 모니터가 트리거될 때 일반적으로 Datadog에서 가장 먼저 확인하는 위치(예: 대시보드, 로그, 트레이스, 주요 위젯이 포함된 노트북)부터 시작하세요. 링크는 특별한 형식을 지정할 필요가 없으며 일반 URL을 사용해도 됩니다.

이러한 링크는 사용자가 정의하므로 Bits가 검토하는 내용을 제어할 수 있어, 사용자가 검토해야 하는 동일한 데이터에 집중하도록 보장하고 팀의 워크플로에 맞게 조사 방식을 유연하게 조정할 수 있습니다.

- **노트북**: 모니터는 모니터 또는 관련 서비스와 관련된 문제 해결 지침이 포함된 노트북에 연결할 수 있습니다. 노트북은 마크다운과 Datadog 쿼리를 모두 지원하므로, 에이전트에 근본 원인 분석을 가장 효과적으로 수행하는 방법에 대한 지침을 제공합니다.

- **Confluence 통합**: 런북이 Confluence에 있는 경우 모니터 메시지에 관련 페이지 링크를 포함합니다. 조사 과정에서 Bits는 페이지를 읽고, 텔레메트리 링크를 추출하고 문서화된 문제 해결 단계를 따르고(가능한 경우), 권장 사항에 수정 지침을 반영합니다.

이 통합의 가치를 극대화하려면 관련 서비스, 종속성, 시스템을 상세히 문서화하고 문제 해결에 도움이 되는 명확한 단계별 지침을 제공하세요. 체계적이고 구체적인 런북을 통해 Bits는 보다 정확하고 효과적인 조사를 수행할 수 있습니다.

{{< img src="bits_ai/optimization_example.png" alt="최적화 단계가 적용된 예시 모니터" style="width:100%;" >}}

## Bits.md {#bitsmd}

[{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits.md{{< /ui >}}][2]에 `bits.md` 파일을 생성하여 Bits가 환경을 조사하는 방식을 사전에 안내할 수 있습니다.

`bits.md`는 사용자 환경에 대한 구조화된 컨텍스트를 Bits에 제공하는 마크다운 파일입니다. 이는 조사 정확도, 쿼리 구성, 용어 정렬을 개선하기 위한 간단한 지침으로 활용됩니다. 태깅 규칙, 아키텍처 패턴, 용어집, 조사 모범 사례 등 팀별 지식을 추가합니다.

### 샘플 bits.md {#sample-bitsmd}

{{< code-block lang="markdown" filename="bits.md" collapsible="true" >}}

## Scope rules
- Always carry forward explicit scope from the user (env, service, team, region, namespace).
- Treat mentioned values as hard filters in all queries.
- Do not broaden scope unless explicitly asked.

---

## Tag and naming conventions

### Environment normalization
Environment values may differ across telemetry sources (monitors, APM, logs, tickets).

Example:
- Alerts/APM: `env:blue-prod`
- Logs: `env:prod`

Rule: When switching data sources, normalize to the correct env value for that source before querying.

---

### Service name normalization
Service/application names may appear in different formats across systems (alerts, logs, tickets, asset systems).

Example:
- Alert tag: `checkout_prd`
- Ticketing system: `CHECKOUT`
- Logs: `checkout-service`

Rule:
- Derive a canonical service name.
- Use case-insensitive or wildcard matching when correlating across systems.
- Do not assume naming is identical across tools.

---

## Kubernetes quick checks
For pod issues, check Kubernetes events first:
`source:kubernetes pod_name:<pod> kube_namespace:<namespace>`

Common causes:
- `FailedMount` → missing Secret/ConfigMap
- `ImagePullBackOff` → image/registry issue
- `OOMKilled` → memory pressure

---

## Known noise and false positives
Document recurring patterns that look like incidents but are expected behavior.

Examples:
- Nightly batch jobs trigger CPU spikes between 02:00–02:30 UTC.
- Synthetic monitoring tests intentionally generate short-lived 5xx errors.
- Canary deployments temporarily increase error rates during rollout.
- Autoscaling events may cause brief latency spikes.

Rule:
- Check whether the signal matches a documented noise pattern.
- If behavior matches a known pattern, classify as expected unless additional impact is observed.

{{< /code-block >}}

## 피드백 및 메모리 {#feedback-and-memories}

조사가 끝나면 Bits가 도출한 결론이 정확했는지 알려주세요.

{{< img src="bits_ai/help_bits_ai_learn_2.png" alt="조사 후 근본 원인 피드백 흐름" style="width:100%;" >}}

결론이 부정확했다면 Bits에 올바른 근본 원인을 제공하고, 놓친 부분을 강조하고, 다음에는 어떤 부분을 다르게 처리해야 할지 설명합니다. 피드백은 다음 기준을 충족해야 합니다.
- 실제 근본 원인을 파악합니다(단순히 관찰된 영향이나 증상이 아님).
- 관련 서비스, 구성 요소, 메트릭을 명시합니다.
- 근본 원인을 가리키는 텔레메트리 링크를 포함합니다.

**양질의 근본 원인 피드백 예시**: "2025-11-15 14:30 UTC부터 2시간마다 발생하는 OOM 킬을 유발하는 세션 캐시의 메모리 누수로 인해 auth-service 포드에서 높은 메모리 사용량이 관찰됨. 이는 `https://app.datadoghq.com/logs?<rest_of_link>`에 의해 입증됨"

모든 긍정적인 피드백과 Bits 채팅에서 제공된 모든 부정적인 피드백(세부 정보 포함)은 **메모리**를 생성합니다. Bits는 성능 향상을 위해 향후 조사에서 사용할 메모리를 동적으로 선택합니다. 유사한 컨텍스트에서 과거 수정 사항을 적용하고, 효과적인 쿼리를 재사용하고, 조사 단계의 우선순위를 지정하는 방식을 개선합니다. 시간이 지남에 따라 Bits는 사용자 환경에 맞게 적응하면서 조사를 수행할 때마다 정확성과 효율성이 강화됩니다.

메모리를 관리(조회 및 삭제 포함)하려면 [모니터 관리][1] 페이지의 {{< ui >}}Memories{{< /ui >}} 열로 이동합니다.

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
[2]: https://app.datadoghq.com/bits-ai/settings/bits-md