---
aliases:
- /ko/security/threats/investigate_agent_events
- /ko/security/workload_protection/investigate_agent_events
description: Datadog Agent가 Agent 이벤트로 Datadog에 전송하는 런타임 활동을 검색하고 분석하세요.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: 설명서
  text: Workload Protection 탐지 규칙 살펴보기
- link: /security/notifications/
  tag: 설명서
  text: 보안 알림에 대해 자세히 알아보기
title: Agent 이벤트
---
Datadog Agent는 Agent 호스트의 시스템 활동을 평가합니다. 활동이 Agent 규칙 표현식과 일치하면 Agent가 이벤트를 생성하여 Datadog 백엔드로 전달합니다.

[Agent Events Explorer][13]를 사용하면 신호와 별도로 Agent 이벤트를 조사할 수 있습니다. 이벤트 사이드 패널을 사용하여 어떤 일이 발생했는지, 어디에서 발생했는지, 어떤 Agent 규칙이 일치했는지 검토하세요. 조사 그래프, 프로세스 트리 및 원시 JSON 페이로드를 탐색하고 일치하는 규칙에 대한 분류 및 대응 지침을 조회할 수도 있습니다.

## Agent 이벤트 조사 {#investigate-agent-events}

Agent 이벤트를 조사하려면 다음 단계를 따르세요.

1. [Agent Events Explorer][13]로 이동합니다. Agent 이벤트는 Datadog [Events Explorer][14]의 표준 탐색기 컨트롤을 사용하여 쿼리하고 표시합니다.
2. Agent 이벤트를 선택합니다. 이벤트를 조사하는 데 도움이 되는 탭이 포함된 사이드 패널이 열립니다.

### 개요 {#overview}

{{< ui >}}Overview{{< /ui >}} 탭에서는 이벤트를 요약하며 조사를 시작하기에 가장 적합한 경우가 많습니다.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_overview.png" alt="What, Where, Agent rule 및 Investigation graph 섹션이 표시된 Agent 이벤트 사이드 패널의 Overview 탭" width="100%">}}

Overview 탭에는 다음 섹션이 포함됩니다.

- {{< ui >}}What{{< /ui >}}: 탐지된 활동에 대한 사람이 읽을 수 있는 설명 예를 들어, *사용자가 호스트 i-0d85f97942d947ca9에서 clang 명령을 실행했습니다*.
- {{< ui >}}Where{{< /ui >}}: 클라우드 공급자, 계정, 리전, 호스트, Kubernetes 클러스터, 네임스페이스, 포드, 컨테이너 및 이미지를 포함하여 이벤트가 발생한 인프라 컨텍스트
- {{< ui >}}Agent rule{{< /ui >}}: 규칙 이름, 이벤트 이름, 배포 정책, 정책 버전 및 규칙 표현식을 포함하여 이벤트와 일치한 Agent 규칙
- {{< ui >}}Investigation graph{{< /ui >}}: Overview 탭 하단에 표시되는 조사 그래프 미리 보기
- {{< ui >}}Process tree{{< /ui >}}: 시스템 init 프로세스부터 이벤트를 발생시킨 프로세스까지의 전체 프로세스 계보

#### 조사 그래프 {#investigation-graph}

{{< ui >}}Investigation graph{{< /ui >}}는 이벤트와 관련된 인프라와 프로세스를 매핑하는 인터랙티브 시각화입니다. 가장 관련성이 높은 엔터티와 프로세스를 강조하여 공격 체인을 간결하게 보여줍니다.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_investigation_graph.png" alt="호스트, Kubernetes 포드, 컨테이너, 이미지 및 주요 프로세스 실행 경로를 보여주는 조사 그래프" width="100%">}}

이 그래프는 호스트에서 Kubernetes 포드, 레플리카 세트, 컨테이너 및 컨테이너 이미지와 같은 주변 인프라를 거쳐 프로세스 실행 경로까지 이벤트를 추적합니다. 이벤트와 관련된 주요 프로세스는 개별적으로 표시되고, 관련성이 낮은 프로세스는 의심스러운 활동에 집중할 수 있도록 그룹화된 노드(예: **+7개 프로세스**)로 집계됩니다.

조사 그래프를 사용하여 호스트의 모든 프로세스를 검토하지 않고도 탐지된 활동이 더 넓은 런타임 컨텍스트에서 어떤 의미를 갖는지 파악하세요.

#### 프로세스 트리 {#process-tree}

{{< ui >}}Process tree{{< /ui >}}는 시스템 init 프로세스부터 이벤트를 발생시킨 프로세스까지 전체 프로세스 계보를 표시합니다.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_process_tree.png" alt="systemd부터 이벤트를 트리거한 프로세스까지의 전체 프로세스 체인을 나열하는 프로세스 트리" width="100%">}}

체인의 각 프로세스에 대해 프로세스 트리는 다음 정보를 표시합니다.

- {{< ui >}}Path{{< /ui >}}: 실행 파일 경로 및 명령줄 인수
- {{< ui >}}PID{{< /ui >}}: 프로세스 ID
- {{< ui >}}PPID{{< /ui >}}: 부모 프로세스 ID
- {{< ui >}}User{{< /ui >}}: 프로세스가 실행된 사용자 컨텍스트

프로세스 트리는 `systemd`에서 시작하여 `containerd`, `runc` 및 워크로드별 프로세스와 같은 중간 프로세스를 거쳐 Agent 규칙과 일치한 명령까지 이어지는 이벤트의 전체 계보를 보여줍니다. 이는 탐지로 이어진 정확한 실행 경로를 재구성하는 데 도움이 됩니다.

### JSON {#json}

{{< ui >}}JSON{{< /ui >}} 탭은 Agent가 수집한 전체 이벤트 속성 세트가 포함된 원시 이벤트 페이로드를 표시합니다. 이벤트 데이터를 가장 상세하게 조회해야 하는 경우 JSON을 사용하세요. 예를 들어, [Agent Events Explorer][13]에서 고급 쿼리를 작성하거나 조사 중에 전체 이벤트 페이로드를 공유할 수 있습니다. JSON에서 필드를 클릭하여 필터에 포함하거나 제외할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[13]: https://app.datadoghq.com/security/agent-events
[14]: /ko/events/explorer/