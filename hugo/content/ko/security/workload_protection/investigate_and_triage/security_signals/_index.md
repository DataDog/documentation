---
aliases:
- /ko/security/threats/security_signals
- /ko/security/workload_protection/security_signals
- /ko/security_platform/cspm/signals_explorer
- /ko/security/cspm/signals_explorer
- /ko/security/misconfigurations/signals_explorer
- /ko/security/cloud_security_management/misconfigurations/signals_explorer/
description: Workload Protection 탐지 규칙이 생성하는 보안 신호를 검색, 필터링 및 분류하세요.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: 설명서
  text: Workload Protection 탐지 규칙 살펴보기
- link: /security/notifications/
  tag: 설명서
  text: 보안 알림에 대해 자세히 알아보기
title: 신호
---
[Workload Protection][1] 보안 신호는 Datadog이 보안 규칙을 기반으로 위협을 탐지할 때 생성됩니다. [Signals Explorer][2]에서 보안 신호를 조회, 검색, 필터링 및 조사하거나 [알림 규칙][3]을 구성하여 타사 도구로 신호를 전송할 수 있습니다.

## Signals Explorer {#signals-explorer}

[Signals Explorer][2]에는 [탐지 규칙][5]에서 생성된 Workload Protection 보안 신호가 표시됩니다. 검색창이나 패싯 패널을 사용하여 중증도, 분류 상태, 탐지 규칙, 호스트, 컨테이너 및 기타 속성별로 신호를 필터링하세요. 예를 들어, 분류 상태별로 필터링하려면 `@workflow.triage.state:<status>`를 사용하세요. 여기서 `<status>`는 원하는 상태(`open`, `under_review` 또는 `archived`)입니다. 패싯 패널에서 {{< ui >}}Signal State{{< /ui >}} 패싯을 사용할 수도 있습니다.

신호를 선택하여 사이드 패널을 여세요. 여기에서 조사 그래프, 타임라인, 컨텍스트 및 Signal JSON을 사용하여 [위협을 조사][6]하거나 [조치를 취하여][7] 신호를 분류하거나, 에스컬레이션하거나, 자동화하거나, 대응할 수 있습니다.

## 다음 단계 {#next-steps}

{{< whatsnext desc="Workload Protection 신호를 조사하고 대응하는 방법을 알아보세요." >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}조사 그래프, 타임라인 및 Signal JSON을 사용한 신호 조사{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}신호 분류 및 조치: 할당, 에스컬레이션, 자동화 및 시행{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/security/workload_protection/
[2]: https://app.datadoghq.com/security/workload-protection/signals
[3]: /ko/security/notifications/rules/
[5]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[6]: /ko/security/workload_protection/investigate_and_triage/security_signals/investigate
[7]: /ko/security/workload_protection/investigate_and_triage/security_signals/actions