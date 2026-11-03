---
aliases:
- /ko/security/workload_protection/detect_and_monitor/finding_rules
description: 런타임 보안 상태를 평가하고 Workload Protection 탐지 결과를 생성하는 백엔드 규칙을 생성하고 관리합니다.
disable_toc: false
further_reading:
- link: /security/workload_protection/investigate_and_triage/security_findings
  tag: 설명서
  text: 탐지 결과 조사 및 분류하기
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: 설명서
  text: SECL 가이드
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: 설명서
  text: 탐지 규칙
title: 발견 규칙
---
발견 규칙은 [Agent 이벤트][1]를 분석하여 런타임 보안 상태를 평가하는 데 사용되는 백엔드 로직을 설명합니다. 발견 규칙이 일치하면 Workload Protection은 영향을 받는 리소스에 대한 [발견 결과][2]를 생성합니다.

실제 런타임 보안 위협을 표면화하는 [탐지 규칙][3]과 달리, 발견 규칙은 지속적인 잘못된 관행과 잘못된 구성을 추적합니다. 발견 결과는 하나의 의심 활동이 아니라 보안 정책을 적극적으로 위반하는 리소스(호스트 또는 컨테이너)를 나타냅니다.

발견 규칙은 기존 [Agent 이벤트]를 사용하여 컨테이너의 패키지 관리자 사용, IMDS 액세스 패턴 또는 불필요한 권한 구성과 같은 실용적인 보안 권장 사항을 표면화합니다. 이는 직접적인 위협은 아니지만 프로덕션 환경에서 위험한 관행을 나타내는 실제 위험을 해결하는 데 도움이 됩니다.

## OOTB 발견 규칙 {#ootb-finding-rules}

Workload Protection에는 Datadog에서 유지 관리하는 기본 제공(OOTB) 발견 규칙이 포함되어 있습니다. 이러한 발견 규칙은 프로덕션 워크로드의 잘못된 관행과 위험한 구성을 지속적으로 표면화합니다. Datadog은 지속적으로 새로운 기본 제공 발견 규칙을 개발하며, 새로운 규칙은 귀하의 계정으로 자동으로 가져옵니다. 전체 목록은 [OOTB 발견 규칙 목록][8]을 참조하세요.

Datadog의 Workload Protection [발견 규칙][6] 목록에서 조직에 배포된 발견 규칙을 찾아 검토하세요. 각 발견 규칙에는 보안 위험에 대한 설명, 적용되는 리소스 유형, 수정 지침이 포함되어 있습니다.

예상되는 구성에 대한 노이즈를 줄이려면 발견 결과 자동화를 사용하여 규칙을 비활성화하지 않고 음소거하세요. [발견 결과 자동화][7]를 참조하세요.

## 사용자 지정 발견 규칙 생성 {#create-a-custom-finding-rule}

사용자 지정 발견 규칙은 [탐지 규칙][3]과 동일한 생성 과정을 따르지만, 특정 시점의 이벤트를 탐지하는 대신 호스트나 컨테이너와 같은 특정 리소스 유형을 대상으로 한다는 하나의 주요한 차이점이 있습니다.

사용자 지정 발견 규칙을 생성하려면 Workload Protection [발견 규칙][6] 페이지로 이동하여 {{< ui >}}New Rule{{< /ui >}}를 클릭하세요.

규칙 편집기에서 5단계를 거치게 됩니다.

### 1단계: 리소스 유형 선택 및 검색 쿼리 정의하기 {#step-1-select-a-resource-type-and-define-search-query}

발견 규칙이 평가할 리소스 유형을 선택하세요.

- {{< ui >}}Host{{< /ui >}}: 규칙이 호스트에 적용됩니다. Workload Protection은 컨테이너 이벤트를 제외하기 위해 쿼리 앞에 `-@container.id:*`를 자동으로 추가합니다.
- {{< ui >}}Container{{< /ui >}}: 규칙이 컨테이너에 적용됩니다. Workload Protection은 컨테이너 이벤트만 포함하도록 쿼리 앞에 `@container.id:*`를 자동으로 추가합니다.

{{< img src="security/workload_protection/detect_and_monitor/finding_rules_editor.png" alt="호스트 및 컨테이너 리소스 유형 선택기와 검색 쿼리 미리보기 화면이 표시된 발견 규칙 편집기" width="100%">}}

규칙이 평가할 [Agent 이벤트][1]를 선택하는 쿼리를 정의하세요. 검색 쿼리는 리소스가 규칙을 위반하는지 판단할 때 고려되는 이벤트를 결정합니다.

여기서는 다음을 할 수 있습니다.

- Agent 이벤트의 **특정 필드**를 필터링하여 쿼리를 구체화하고 더 정확한 발견 결과를 얻으세요. 예를 들어 `@process.executable.path`, `@file.path` 또는 `@agent.rule_id`를 기준으로 필터링하세요. [탐지 규칙][3]과 유사하게, 발견 규칙은 백엔드 이벤트 스키마의 모든 필드를 쿼리할 수 있으며, 여기에는 모든 [Agent 이벤트] 필드와 인프라 컨텍스트, 프로세스 계보, 위협 인텔리전스와 같은 추가적인 강화 데이터가 포함됩니다. 사용 가능한 전체 필드 세트는 [Linux 백엔드 구문][9] 및 [Windows 백엔드 구문][10]을 참조하세요.
- 여러 조건을 결합하여 인프라 또는 워크로드의 하위 집합으로 규칙 범위를 제한합니다.

발견 규칙을 게시하기 전에 [Agent 이벤트 탐색기][5]를 사용하여 쿼리를 테스트하고 어떤 이벤트가 일치하는지 확인하세요.

### 2단계: 발견 결과의 심각도 정의하기 {#step-2-define-finding-severity}

규칙이 트리거될 때 생성되는 발견 결과의 심각도를 정의하세요.

### 3단계: 발견 결과 설명하기 {#step-3-describe-the-finding}

발견 결과가 생성될 때 표시되는 **이름**, **설명** 및 **수정 지침**을 구성합니다.

1. {{< ui >}}Rule name{{< /ui >}}을 입력합니다. 이름은 발견 규칙 목록에 표시되며 생성된 발견 결과의 제목이 됩니다.
2. {{< ui >}}Rule message{{< /ui >}} 섹션에서 Markdown을 사용하여 발견 결과의 의미와 해결 방법을 표시합니다. 메시지 본문에는 `## Remediation` 헤더를 포함하세요. Workload Protection은 이 섹션을 사용하여 발견 결과 측면 패널에 수정 단계를 바로 표시합니다.
3. {{< ui >}}Tag resulting findings{{< /ui >}} 드롭다운을 사용하여 생성된 발견 결과에 태그를 추가합니다. 예를 들어, `security:posture` 또는 `compliance:pci` 태그를 지정하세요.

**참고**: 수정 단계가 발견 결과 측면 패널에 올바르게 표시되려면 `## Remediation` 헤더가 필요합니다.

[1]: /ko/security/workload_protection/investigate_and_triage/agent_events
[2]: /ko/security/workload_protection/investigate_and_triage/security_findings
[3]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: https://app.datadoghq.com/security/configuration/findings-automation
[5]: https://app.datadoghq.com/security/agent-events
[6]: https://app.datadoghq.com/security/workload-protection/finding-rules
[7]: /ko/security/automation_pipelines/mute
[8]: /ko/security/default_rules/#workload-activity
[9]: /ko/security/workload_protection/backend_linux
[10]: /ko/security/workload_protection/backend_windows