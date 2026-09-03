---
description: Datadog Agent가 어떤 런타임 활동을 수집하여 Datadog에 Agent 이벤트로 전송할지를 결정하는 Agent 규칙에
  대해 알아보세요.
disable_toc: false
title: Agent 규칙
---
Agent 규칙은 Datadog Agent가 어떤 런타임 활동을 수집하여 Datadog에 Agent 이벤트로 전송할지를 결정합니다. 이러한 이벤트는 Workload Protection이 위협 탐지 및 런타임 보안 상태 평가에 사용하는 텔레메트리를 제공합니다. Datadog 백엔드의 탐지 규칙과 탐지 결과 규칙은 해당 이벤트를 분석하여 보안 신호와 탐지 결과를 생성합니다. Agent 이벤트는 워크로드에서 저수준 런타임 활동을 캡처하며, 정적 구성이나 주기적인 스캔에만 의존하는 대신 시스템에서 실제로 무슨 일이 일어나고 있는지 이해하는 데 필요한 고충실도 원시 데이터를 제공합니다.

노이즈, 데이터 볼륨 및 성능 영향을 줄이기 위해 Agent는 이벤트를 Datadog에 보내기 전에 무해 또는 저위험 활동을 필터링합니다. Agent 규칙은 SECL(Datadog Security Language)을 사용하여 이 필터링을 정의합니다. 정책은 Remote Configuration, Agent 구성 파일 또는 Terraform을 통해 Agent 규칙을 배포합니다.

## 기본 제공 Agent 규칙 {#ootb-rules}

Workload Protection에는 Datadog이 관리하는 기본 규칙이라는 OOTB(기본 제공) Agent 규칙이 포함되어 있습니다. 이를 확인하려면 Datadog의 [Agent 규칙][1]을 참조하세요. 해당 규칙은 Datadog 보안 엔지니어가 관리합니다. 보안 엔지니어는 새로운 멀웨어 동작, 진화하는 공격 기법 및 기타 보안 관련 활동에 대한 규칙을 추가합니다.

기본 규칙을 환경이나 워크로드에 선택적으로 배포하거나, 복제하여 표현식을 사용자 지정하거나, 필터링 로직을 개선하거나, 작업을 추가할 수 있습니다. 배포 옵션은 [정책 관리][2]를 참조하세요.

Agent 규칙은 상황별 텔레메트리를 수집하거나 신뢰도가 높은 활동을 일치시키고 Agent 작업을 실행할 수 있습니다. 백엔드 탐지 규칙은 Agent 이벤트를 분석하고 보안 신호를 생성합니다.

## SECL로 사용자 지정 Agent 규칙 작성하기 {#write-custom-agent-rules-in-secl}

Workload Protection Agent 규칙은 SecL이라는 사용자 지정 표현식 언어를 사용하여 런타임 컨텍스트를 기반으로 관찰, 일치 및 Datadog으로 전송할 이벤트를 지정합니다. 자세한 내용은 [SecL 가이드][5]를 참조하세요.

Agent 규칙과 위협 탐지 규칙을 함께 생성하려면 보조 규칙 생성기 또는 수동 흐름을 사용하세요. [탐지 규칙][4] 설명서의 [사용자 지정 Agent 및 탐지 규칙 함께 만들기][3]를 참조하세요.


## 정책을 사용하여 Agent 규칙 배포하기 {#deploy-agent-rules-with-policies}

Agent 규칙은 패키지로 구성되어 정책에 배포됩니다. Datadog에서 중앙 집중식으로 또는 Terraform을 사용하여 정책을 관리하고, Remote Configuration을 사용하거나 Agent 구성 파일을 수동으로 수정하여 Agent에 배포하세요. 자세한 내용은 [정책 관리][2]를 참조하세요.
## 변수 및 작업 사용하기 {#use-variables-and-actions}

변수와 작업은 이벤트 일치를 넘어 Agent 규칙을 확장합니다. 작업은 파일 해시와 같은 추가 텔레메트리를 수집하거나, 위협에 대응하거나, SECL 변수에서 작동할 수 있습니다. SECL 변수를 사용하면 상태 머신을 기반으로 하는 고급 상태 저장 탐지 로직을 구축할 수 있습니다. 자세한 내용은 [변수 및 작업][6]을 참조하세요.

[1]: https://app.datadoghq.com/security/workload-protection/agent-rules?ruleQuery=defaultRule%3Atrue
[2]: /ko/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[3]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[4]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /ko/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[6]: /ko/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions