---
aliases:
- /ko/security/workload_protection/detect_and_monitor/detection_rules
- /ko/security/workload_protection/setup/ootb_rules
description: Agent 이벤트를 분석하고 Workload Protection 보안 신호를 생성하는 백엔드 규칙을 생성하고 관리합니다.
disable_toc: false
title: 탐지 규칙
---
탐지 규칙은 [Agent 이벤트][1]를 분석하여 환경 내의 위협을 탐지하는 데 사용되는 백엔드 로직을 설명합니다. 탐지 규칙이 일치하면 Workload Protection은 Datadog에서 조사하고 대응할 수 있는 [보안 신호][2]를 생성합니다.

탐지 규칙은 하나 이상의 Agent 규칙(`@agent.rule_id`로 참조됨)을 결합하고, 임계값이나 이상 징후와 같은 탐지 방법을 적용하며, 노이즈를 억제하고, 적절한 팀에 경보를 라우팅합니다. Agent 규칙은 호스트에서 런타임 텔레메트리를 수집하며, 탐지 규칙은 해당 텔레메트리를 우선순위가 지정된 위협 탐지로 전환합니다.

이 페이지에서는 기본 제공(OOTB) 탐지 규칙의 작동 방식과 Datadog에서 사용자 지정 탐지 규칙을 생성하는 방법을 설명합니다.

## 기본 제공 탐지 규칙 {#ootb-detection-rules}

Workload Protection에는 Datadog에서 유지 관리하는 기본 제공 **탐지 규칙**이 포함되어 있습니다. 이 규칙들은 Agent 규칙을 통해 수집된 텔레메트리와 백엔드 표현식을 결합하여 활동이 의심스러울 때 보안 신호를 발생시킵니다. [기본 탐지 규칙][3]에서 전체 카탈로그를 찾아보거나 Datadog의 Workload Protection [탐지 규칙][4] 목록에서 검토하고 조정하세요.

## 사용자 지정 탐지 규칙 생성{#create-a-custom-detection-rule}

사용자 지정 탐지 규칙을 생성하려면 Workload Protection [탐지 규칙][4] 페이지로 이동하여 {{< ui >}}New Rule{{< /ui >}}을 클릭하세요. {{< ui >}}Assisted rule creator{{< /ui >}}을 사용하여 Agent 규칙과 탐지 규칙을 단일 흐름으로 구성할 수도 있습니다. [사용자 지정 Agent 및 탐지 규칙 함께 생성](#create-the-custom-agent-and-detection-rules-together)을 참조하세요.

규칙 편집기에서 5단계를 거치게 됩니다.

### 1단계: 실시간 규칙 정의{#step-1-define-your-real-time-rule}

사용할 탐지 방법을 선택하세요.

- {{< ui >}}Threshold{{< /ui >}}: 시간 범위와 신호를 트리거하는 데 필요한 일치 이벤트 수를 정의합니다. 예를 들어, 5분 이내에 5개를 초과하는 일치 이벤트가 발생할 때 트리거합니다.
- {{< ui >}}New value{{< /ui >}}: 이전에 관찰되지 않은 값을 가진 추적된 속성이 나타날 때 트리거합니다.
- {{< ui >}}Anomaly{{< /ui >}}: 이벤트 볼륨이나 동작이 예상 기준선에서 벗어날 때 트리거합니다.
- {{< ui >}}Content anomaly{{< /ui >}}: 일치하는 이벤트의 내용이 과거 데이터와 비교하여 통계적으로 비정상적일 때 트리거합니다.

### 2단계: 검색 쿼리 정의 {#step-2-define-search-query}

규칙이 평가할 [Agent 이벤트][1]를 선택하는 쿼리를 정의하세요. 검색 쿼리는 신호를 보낼지 여부를 결정할 때 고려할 이벤트를 결정합니다.

여기서는 다음을 할 수 있습니다.

- Agent 이벤트의 **특정 필드**를 필터링하여 쿼리를 구체화하고 탐지 정확도를 높이세요. 예를 들어 `@process.executable.path`, `@file.path` 또는 `@agent.rule_id`를 기준으로 필터링하세요. 탐지 규칙은 백엔드 이벤트 스키마의 모든 필드를 쿼리할 수 있습니다. 사용 가능한 전체 필드 세트는 [Linux 백엔드 구문][13] 및 [Windows 백엔드 구문][14]을 참조하세요.
- 여러 조건을 결합하여 인프라 또는 워크로드의 하위 집합으로 규칙 범위를 제한합니다.

**임계값** 규칙의 경우, **조회 기간**(Datadog이 규칙 조건과 비교하기 전에 일치하는 이벤트를 집계하는 기간)도 정의하세요.

[Agent 이벤트 탐색기][6]를 사용하여 쿼리를 테스트하여 규칙을 게시하기 전에 어떤 이벤트가 일치하는지 확인하세요.

### 3단계: 규칙 조건 정의 {#step-3-define-rule-conditions}

규칙이 신호를 보낼 시점을 결정하는 제한을 설정하세요. 각각 다른 심각도 수준과 연결된 **여러 케이스**를 생성할 수 있습니다.

예를 들어, 임계값 규칙으로 다음을 정의할 수 있습니다.

- {{< ui >}}Critical{{< /ui >}} 5분 이내에 10개를 초과하는 일치 이벤트가 발생할 때.
- {{< ui >}}High{{< /ui >}} 5분 이내에 5개를 초과하는 일치 이벤트가 발생할 때.
- {{< ui >}}Medium{{< /ui >}} 5분 이내에 2개를 초과하는 일치 이벤트가 발생할 때.

{{< ui >}}Add notify{{< /ui >}} 섹션에서 규칙이 트리거될 때 알림을 받을 대상을 선택적으로 구성하세요. 개별 수신자를 추가하거나 [알림 규칙][7]을 사용하여 여러 탐지 규칙 전반의 경보를 관리할 수 있습니다.

### 4단계: 플레이북 설명{#step-4-describe-your-playbook}

[신호 탐색기][2]에서 열 때 나타나는 신호의 **제목** 및 **설명**을 구성하세요.

1. {{< ui >}}Rule name{{< /ui >}}을 입력합니다. 이 이름은 탐지 규칙 목록에 나타나며 생성된 보안 신호의 제목이 됩니다.
2. {{< ui >}}Rule message{{< /ui >}} 섹션에서 [알림 변수][8]와 Markdown을 사용하여 발생한 상황과 대응자가 취해야 할 조치를 설명하세요. 템플릿 변수는 트리거된 에이전트 이벤트의 동적 컨텍스트를 신호 및 해당 알림에 직접 삽입합니다.
3.  {{< ui >}}Tag resulting signals{{< /ui >}} 드롭다운 메뉴를 사용하여 생성된 신호에 태그를 추가하세요. 예를 들어, `security:attack` 또는 `technique:T1059-command-and-scripting-interpreter`.

### 5단계: 차단 규칙 만들기{#step-5-create-a-suppression}

선택적으로 **차단 쿼리**를 추가하여 특정 인프라나 이벤트를 이 규칙에서 제외함으로써 노이즈를 줄일 수 있습니다. 차단은 일치하는 활동이 예상되거나 무해할 때 신호가 생성되지 않도록 방지하는 데 도움이 됩니다.

예를 들어, 알려진 자동화 사용자를 규칙에서 제외하려면 `@usr.name:automation-bot`과 같은 차단 쿼리를 추가하세요.

이 단계에서는 과거의 **일치 이벤트 수에 대한 개요**도 제공하므로, 규칙을 저장하기 전에 규칙이 얼마나 자주 트리거되었을지 추정할 수 있습니다. 이 미리 보기를 사용하여 쿼리, 임계값 또는 차단을 조정하고 과도한 경보 볼륨을 방지하세요.

탐지 규칙 전반의 차단에 대한 자세한 내용은 [차단][9]을 참조하세요.

## 사용자 지정 에이전트 및 탐지 규칙 함께 만들기 {#create-the-custom-agent-and-detection-rules-together}

기본 에이전트 규칙이 정책에 패키징되고 배포되는 방법에 대한 자세한 내용은 [에이전트 규칙][10] 개요 및 [정책 관리][11]를 참조하세요.

다음 방법 중 하나로 일치하는 에이전트 규칙과 탐지 규칙을 정의할 수 있습니다.

- {{< ui >}}Assisted rule creator{{< /ui >}}: Datadog에서 사용자 지정 Workload Protection [탐지 규칙][4]을 시작하고 마법사를 사용하여 에이전트 표현식과 백엔드 탐지 규칙 로직을 모두 구성하세요.
- {{< ui >}}Manual rule creator{{< /ui >}}: [에이전트 구성][12]에서 정책을 열거나 생성하고 {{< ui >}}Manual rule creator{{< /ui >}}를 선택하여 에이전트 규칙을 먼저 작성한 다음, 이를 참조하는 탐지 규칙을 추가하세요. UI 단계 및 배포에 대해서는 [정책 관리][11]를 참조하세요.

[1]: /ko/security/workload_protection/investigate_and_triage/agent_events
[2]: /ko/security/workload_protection/investigate_and_triage/security_signals
[3]: /ko/security/default_rules/#cat-workload-security
[4]: https://app.datadoghq.com/security/configuration/rules?product=cws
[5]: /ko/security/workload_protection/respond_and_report/#automated-response
[6]: https://app.datadoghq.com/security/agent-events
[7]: /ko/security/notifications/rules/
[8]: /ko/security/notifications/variables/
[9]: /ko/security/suppressions/
[10]: /ko/security/workload_protection/detect_and_monitor/agent_rules
[11]: /ko/security/workload_protection/detect_and_monitor/agent_rules/policy_management#create-a-custom-agent-rule
[12]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[13]: /ko/security/workload_protection/backend_linux
[14]: /ko/security/workload_protection/backend_windows