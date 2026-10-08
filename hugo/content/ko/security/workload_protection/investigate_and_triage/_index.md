---
description: Datadog에서 Workload Protection Agent 이벤트, 보안 신호 및 발견 결과를 조사하세요.
disable_toc: false
title: 조사 및 분류하기
---
Workload Protection은 런타임 활동을 평가하면서 Agent 이벤트, 신호 및 발견 결과를 생성합니다. Agent Events Explorer를 사용하여 런타임 활동을 조사하고, Signals Explorer를 사용하여 위협을 조사하며, Findings Explorer를 사용하여 런타임 보안 태세 문제를 검토하세요.

각 항목이 생성되는 방식은 [Workload Protection 작동 방식][4]을 참조하세요.

## Agent 이벤트 {#agent-events}

[Agent 이벤트][1]는 런타임 활동이 에이전트 규칙과 일치할 때 Datadog Agent에서 생성되는 원시 텔레메트리입니다. Agent Events Explorer를 사용하여 이 활동을 조사하세요.

## 신호 {#signals}

[신호][2]는 Agent 이벤트가 백엔드 탐지 규칙과 일치할 때 생성됩니다. Signals Explorer를 사용하여 위협을 조사하고, 신호를 분류하며, 대응 조치를 취하세요.

{{< whatsnext desc="Workload Protection 신호 탐색:" >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}신호 조사{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}신호 분류 및 대응{{< /nextlink >}}
{{< /whatsnext >}}

## 발견 결과 {#findings}

[발견 결과][3]는 Agent 이벤트가 발견 결과 규칙과 일치할 때 생성됩니다. Findings Explorer를 사용하여 런타임 보안 태세 문제를 검토하세요.

[1]: /ko/security/workload_protection/investigate_and_triage/agent_events
[2]: /ko/security/workload_protection/investigate_and_triage/security_signals
[3]: /ko/security/workload_protection/investigate_and_triage/security_findings
[4]: /ko/security/workload_protection/#evaluating-activity