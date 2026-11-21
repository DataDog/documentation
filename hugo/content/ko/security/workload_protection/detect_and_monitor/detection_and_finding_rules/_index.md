---
description: Workload Protection이 Agent 이벤트를 분석하는 데 사용하는 백엔드 탐지 규칙과 발견 결과 규칙을 비교하세요.
disable_toc: false
title: 탐지 및 발견 결과 규칙
---
Agent가 [Agent 이벤트][1]를 Datadog으로 전달하면 백엔드 규칙이 해당 텔레메트리를 분석하여 보안 결과를 생성합니다. Workload Protection은 다음과 같은 두 가지 백엔드 규칙 유형을 제공합니다.

- **[탐지 규칙][2]**은 위협을 탐지하고 의심스러운 활동이 기준과 일치할 때 [보안 신호][3]를 생성합니다. 탐지 규칙은 실제 런타임 보안 위협(예: 리버스 셸 또는 자격 증명 접근 시도)을 드러냅니다.
- **[발견 결과 규칙][4]**은 런타임 보안 상태를 평가하고 정책을 준수하지 않는 리소스에 대한 권장 사항과 함께 [발견 결과][5]를 생성합니다. 결과 규칙은 호스트나 컨테이너에서 지속되는 잘못된 관행과 잘못된 구성을 추적합니다(예: 프로덕션 컨테이너에서 패키지 관리자 사용).

두 규칙 유형 모두 동일한 **백엔드 이벤트 스키마**를 쿼리합니다. 각 이벤트에는 Agent가 수집한 모든 필드와 인프라 컨텍스트 및 위협 인텔리전스와 같은 추가적인 보강 정보가 포함됩니다. 탐지 규칙 또는 발견 결과 규칙에 대한 검색 쿼리를 작성할 때 이 스키마의 모든 필드를 필터링할 수 있습니다. 사용 가능한 전체 필드 세트는 [Linux 백엔드 구문][6] 및 [Windows 백엔드 구문][7]을 참조하세요.

## 탐지 규칙과 발견 결과 규칙 비교{#detection-rules-versus-finding-rules}

| | 탐지 규칙 | 발견 결과 규칙 |
|---|---|---|
| **출력** | 보안 신호 | 발견 결과|
| **의미** | 실제 런타임 보안 위협 | 보안 태세 문제 및 보안 권장 사항|
| **사용 사례** | 위협 탐지 및 인시던트 대응 | 런타임 태세 및 강화 |

예를 들어, `Sudoers Policy File Modification Detection`은 `/etc/sudoers` 및 `/etc/sudoers.d/` 내 파일에 대한 수정 사항에 플래그를 지정합니다. 이러한 파일 수정은 잘못된 관행이지만, 정당한 프로세스의 일부일 수 있습니다. 이를 탐지 규칙으로 처리하면 과도한 노이즈가 발생합니다. 발견 결과 규칙의 경우, 파일 쓰기마다 신호를 트리거하지 않고 어떤 리소스에 이 구성이 있는지 추적합니다.

## 다음 단계 {#next-steps}

- 기본 제공(OOTB) 위협 탐지 규칙을 살펴보고 사용자 지정 탐지 규칙을 만들려면 [탐지 규칙][2]을 읽어보세요.
- OOTB 태세 규칙을 탐색하고 사용자 지정 발견 결과 규칙을 만들려면 [결과 규칙][4]을 읽어보세요.
- 규칙 쿼리에 사용할 수 있는 모든 필드를 확인하려면 [Linux 백엔드 구문][6] 및 [Windows 백엔드 구문][7]을 탐색해 보세요.

[1]: /ko/security/workload_protection/investigate_and_triage/agent_events
[2]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[3]: /ko/security/workload_protection/investigate_and_triage/security_signals
[4]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[5]: /ko/security/workload_protection/investigate_and_triage/security_findings
[6]: /ko/security/workload_protection/backend_linux
[7]: /ko/security/workload_protection/backend_windows