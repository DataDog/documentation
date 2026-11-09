---
aliases:
- /ko/security/workload_protection/workload_security_rules
- /ko/security/threats/workload_security_rules
- /ko/security/cloud_workload_security/workload_security_rules
- /ko/security_platform/cloud_workload_security/workload_security_rules
description: Workload Protection이 위협을 탐지하는 데 사용하는 Agent 규칙, 탐지 규칙, 발견 규칙, 위협 인텔리전스
  및 Content Packs에 대해 알아보세요.
disable_toc: false
title: 탐지 및 모니터링
---
Workload Protection은 여러 종류의 규칙을 기준으로 워크로드 활동을 평가합니다. 이 규칙들은 함께 작동하여 위협을 탐지하고, 런타임 보안 상태를 평가하며, 세분화된 감사 기능을 제공합니다. Agent 규칙은 Datadog에 전달할 활동을 결정합니다. 탐지 규칙과 발견 규칙은 해당 활동을 분석합니다. 위협 인텔리전스는 활동 데이터에 평판 컨텍스트를 추가하며, Content Packs는 특정 소프트웨어 스택과 위협 벡터에 적용할 수 있는 규칙을 묶어 제공합니다.

탐지 파이프라인에서 이러한 규칙이 함께 작동하는 방식은 [Workload Protection 작동 방식][19]을 참조하세요.

## Agent 규칙 {#agent-rules}

[Agent 규칙][1]은 추가 분석을 위해 Datadog 백엔드로 전송할 시스템 활동을 정의합니다.
- SECL 표현식 언어를 사용하여 사용자 지정 Agent 규칙을 작성하는 방법을 설명하는 [SECL 가이드][15]
- 사용자 지정 및 기본 Agent 규칙을 배포하기 위한 [정책 관리][9]
- 상태 기반 탐지 및 추가 텔레메트리 수집을 위한 [변수 및 작업][16]
- 쿼리 가능한 전체 SECL 필드 세트를 위한 [Linux 표현식][17] 및 [Windows 표현식][18]

## 탐지 및 발견 규칙 {#detection-and-finding-rules}

[탐지 및 발견 규칙][3]은 [Agent 이벤트][2]를 분석하고 [시그널][5] 또는 [발견 결과][6]를 생성하는 데 사용되는 백엔드 로직을 설명합니다.
- 위협 탐지 및 인시던트 대응을 위한 [탐지 규칙][11]
- 런타임 보안 상태 관리 및 강화에 사용되는 [발견 규칙][12]
- 쿼리 가능한 전체 이벤트 필드 세트를 위한 [Linux 백엔드 구문][13] 및 [Windows 백엔드 구문][14]

## 위협 인텔리전스 {#threat-intelligence}

Workload Protection은 위협 인텔리전스 데이터베이스를 사용하여 [Agent 이벤트][2]를 보강하고 멀웨어 및 알려진 악성 엔터티를 탐지합니다. [위협 인텔리전스][7] 페이지에서 다음 작업을 수행할 수 있습니다.
- Workload Protection에서 기본 제공(OOTB)하는 위협 인텔리전스 데이터베이스 탐색
- 자체 위협 인텔리전스 데이터베이스를 가져와 Workload Protection과 연동되도록 구성

## Content Packs {#content-packs}

Workload Protection은 특정 소프트웨어 스택, 위협 벡터 및 새롭게 발견되는 취약점에 대응하도록 Datadog에서 제작한 [Content Packs][10]을 제공합니다. [Content Packs][10] 페이지에서 다음 작업을 수행할 수 있습니다.
- 주요 워크로드 보안 사용 사례에 적합한 Content Packs 탐색 및 활성화
- 필요시 적용 대상 워크로드에만 탐지 기능 배포
- Datadog에서 관리하는 규칙 업데이트를 통해 새로운 위협에 대한 최신 정보 확보

[1]: /ko/security/workload_protection/detect_and_monitor/agent_rules
[2]: /ko/security/workload_protection/investigate_and_triage/agent_events
[3]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules
[5]: /ko/security/workload_protection/investigate_and_triage/security_signals
[6]: /ko/security/workload_protection/investigate_and_triage/security_findings
[7]: /ko/security/workload_protection/detect_and_monitor/threat_intelligence
[9]: /ko/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[10]: /ko/security/workload_protection/detect_and_monitor/content_packs
[11]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[12]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[13]: /ko/security/workload_protection/backend_linux
[14]: /ko/security/workload_protection/backend_windows
[15]: /ko/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[16]: /ko/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[17]: /ko/security/workload_protection/linux_expressions
[18]: /ko/security/workload_protection/windows_expressions
[19]: /ko/security/workload_protection/#evaluating-activity