---
disable_toc: false
further_reading:
- link: /security/default_rules/?category=cat-csm-threats#all
  tag: 설명서
  text: Workload Protection 탐지 규칙 살펴보기
- link: /security/workload_protection/workload_security_rules
  tag: 설명서
  text: Workload Protection 탐지 규칙 관리 방법
- link: /security/notifications/
  tag: 설명서
  text: 보안 알림에 관해 자세히 알아보기
title: Agent 이벤트 조사
---


Agent Events 탐색기로 [OOTB(기본 제공) 탐지 규칙][12]이 생성한 Datadog Agent 위협 탐지 이벤트를 어떻게 쿼리하고 리뷰하는지 알아봅니다.

Datadog Agent는 Agent 호스트의 시스템 활동을 평가합니다. 해당 활동이 Agent 규칙 표현식과 일치하면 Agent는 탐지 이벤트를 생성하여 Datadog 백엔드로 전달합니다.

이벤트가 Agent 탐지 규칙 *및* 백엔드 위협 탐지 규칙과 일치하면 신호가 생성되어 [Signals][11]에 표시됩니다 (`Agent detection rule + backend Threat detection rule = Signal`).

[Agent Events 탐색기][13]를 사용하면 신호와 별도로 Agent Events를 조사할 수 있습니다. 이벤트가 발생한 호스트 경로를 검토하고 이벤트의 속성, 메트릭 및 프로세스를 확인할 수 있습니다. 또한 이벤트를 생성한 Agent 규칙을 검토하고 분류 및 대응 지침을 확인할 수 있습니다.

## Active Protection으로 위협을 사전에 차단

기본적으로 모든 OOTB Agent 가상화폐 마이닝 위협 탐지 규칙이 활성화되어 있으며 위협을 적극적으로 모니터링합니다.

[Active Protection][18]을 사용하면 Datadog Agent 위협 탐지 규칙이 파악한 가상화폐 마이닝 위협을 사전에 차단하고 종료할 수 있습니다.

## Agent 이벤트 보기

Agent 이벤트를 보려면 [Agent Events 탐색기][13]로 이동합니다.

Agent 이벤트는 Datadog [Events 탐색기][14]의 표준 탐색기 컨트롤을 사용하여 쿼리되고 표시됩니다.


## Agent 이벤트 조사

[Agent Events 탐색기][13]에 이벤트가 표시된 이유를 자세히 알아보려면 해당 이벤트를 선택하세요.

이벤트 세부 정보에는 속성, [메트릭][16] 및 [프로세스][15]가 포함됩니다. **Metrics**은 호스트 대시보드에 연결되고 **Processes**는 호스트 [프로세스 대시보드][17] 및 프로세스 에이전트 설치 단계에 연결됩니다.

**Path**에는 최신 프로세스 트리가 표시됩니다. 이를 통해 이벤트를 시작한 명령으로 이어지는 모든 명령을 보여줌으로써 진행 상황을 가장 잘 파악할 수 있습니다.

{{< img src="security/csm/agent_events_explorer_details.png" alt="이미지 설명" style="width:100%;" >}}

이벤트 조사를 시작할 때 **Path**부터 살펴보는 것이 좋습니다.

## Agent 이벤트 분류

이벤트를 분류하는 방법:

1. [Agent Events 탐색기][13]에서 **AGENT RULE** 열에 있는 이벤트를 선택합니다.
2. **Click to copy**를 선택합니다.
3. [OOTB 규칙 문서][12]를 엽니다.
4. 검색 필드에 복사한 규칙 이름을 붙여넣습니다.
5. 결과에서 규칙을 선택합니다.
6. 규칙 **Goal**, **Strategy**를 검토하고 **Triage and response**의 단계를 따릅니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[11]: /ko/security/workload_protection/security_signals
[12]: /ko/security/default_rules/#cat-cloud-security-management
[13]: https://app.datadoghq.com/security/agent-events
[14]: /ko/service_management/events/explorer/
[15]: /ko/infrastructure/process/
[16]: /ko/metrics/
[17]: https://app.datadoghq.com/process
[18]: /ko/security/workload_protection/guide/active-protection