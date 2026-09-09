---
aliases:
- /ko/security_platform/cloud_workload_security/
- /ko/security/cloud_workload_security/
- /ko/security/cloud_workload_security/agent_expressions
- /ko/security/cloud_workload_security/backend/
- /ko/security/threats/security_profiles
- /ko/security/threats/runtime_anomaly_detection
- /ko/security/threats/
- /ko/security/threats/agent
- /ko/security/workload_protection/agent
cascade:
- _target:
    path: /security/workload_protection/backend_linux
  aliases:
  - /security/threats/backend_linux
- _target:
    path: /security/workload_protection/backend_windows
  aliases:
  - /security/threats/backend_windows
- _target:
    path: /security/workload_protection/linux_expressions
  aliases:
  - /security/threats/linux_expressions
- _target:
    path: /security/workload_protection/windows_expressions
  aliases:
  - /security/threats/windows_expressions
description: Datadog Workload Protection을 사용하여 호스트, 컨테이너 및 서버리스 워크로드 전반에서 런타임 위협을
  탐지하고 대응하세요.
further_reading:
- link: https://www.datadoghq.com/blog/workload-protection-investigation/
  tag: 블로그
  text: Datadog Workload Protection으로 파편화된 런타임 신호를 일관된 공격 스토리로 전환하기
- link: https://www.datadoghq.com/blog/workload-protection-findings
  tag: 블로그
  text: Workload Protection Findings를 사용하여 런타임 태세 문제를 식별하고 해결하기
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: 학습 센터
  text: Workload Protection으로 호스트 및 컨테이너 침해 탐지하기
- link: https://learn.datadoghq.com/courses/workload-protection-enable-manage
  tag: 학습 센터
  text: Workload Protection 활성화 및 관리하기
title: Workload Protection
---
Datadog Workload Protection은 환경 전반의 파일, 네트워크 및 프로세스 활동을 지속적으로 모니터링하여 인프라에 대한 실시간 가시성과 방어 기능을 제공합니다. 또한 위협이 발생하는 즉시 이를 탐지하여 보안 신호와 파인딩을 생성합니다. 이를 사용하여 악의적인 동작이 워크로드에 영향을 미치기 전에 식별, 조사 및 중지하세요.

Workload Protection은 Datadog Security 플랫폼의 일부입니다. 신호는 잘못된 구성 스캔, 취약성 평가 및 코드 보안 발견 사항과 상관관계가 있으므로 런타임 공격을 기존 약점과 연결할 수 있습니다. Datadog 플랫폼에서 실행되므로 인프라 메트릭, 트레이스 및 로그와도 연결됩니다. 이러한 컨텍스트는 위협의 범위를 이해하고 공격 스토리를 재구성하는 데 도움이 됩니다.

## 런타임 위협 탐지를 넘어 {#beyond-runtime-threat-detection}

Workload Protection은 런타임 위협 탐지에만 국한되지 않습니다. 많은 조직에서 다양한 보안 및 운영 사용 사례에 이를 활용하고 있습니다.

- **규정 준수 검증:** Workload Protection은 정책 위반, 위험한 구성 및 무단 변경에 대한 런타임 활동을 지속적으로 모니터링하여 PCI, FedRAMP, SOC 2와 같은 규제 프레임워크 준수 여부를 검증하도록 지원합니다.

- **런타임 보안 태세:** Workload Protection은 안전하지 않은 런타임 관행과 민감한 구성 드리프트를 식별하여 보안 태세를 개선하고, 약점이 악용되기 전에 이를 포착하도록 돕습니다.

- **Infrastructure Monitoring:** Workload Protection은 보안 관련 여부와 관계없이 모든 종류의 런타임 동작을 추적합니다. 사용자 지정 워크로드 디버깅부터 시스템 수준 프로세스 및 원격 사용자 세션 모니터링에 이르기까지, 환경이 어떻게 작동하는지에 대한 실시간 가시성을 제공합니다.

{{< img src="security/workload_protection/k8s_remote_access.png" alt="Kubernetes 원격 사용자 세션 분석" width="100%">}}

## 작동 방식 {#how-it-works}

Workload Protection은 수집한 활동을 Datadog Agent와 Datadog에서 평가합니다.

### 디자인을 통한 리소스 절약 {#saving-resources-by-design}

Workload Protection 탐지 규칙은 복잡하며 시간과 프로세스에 걸쳐 여러 데이터 포인트를 상관 분석합니다. 모든 규칙을 Agent 호스트에서 평가할 경우, 이러한 복잡성으로 인해 상당한 컴퓨팅 리소스의 수요가 발생하게 됩니다.

Datadog은 워크로드에서 보안과 관련 없는 활동을 필터링하는 효율적인 규칙으로 Agent를 가볍게 유지하고, Datadog 백엔드에서 위협 탐지 및 발견 규칙을 사용하여 나머지 활동을 처리함으로써 이 문제를 해결합니다. Agent 규칙은 [policies][14]로 구성되며, 이러한 정책은 {{< tooltip glossary="Remote Configuration을 사용하거나" case="title" >}} 수동으로 배포하게 됩니다. Datadog, Agent 구성 파일 또는 Datadog Terraform 공급자를 사용하여 규칙과 정책을 관리할 수 있습니다.

{{< img src="security/workload_protection/workload_protection_detection_architecture.png" alt="Workload Protection 아키텍처 개요" width="100%">}}

### 런타임 활동 수집 {#collecting-runtime-activity}

Datadog Agent는 워크로드에서 런타임 활동을 수집합니다. 수집 메커니즘은 플랫폼에 따라 다릅니다.

- **Linux**: 가장 광범위한 기능 지원을 제공하는 eBPF Agent.
- **AWS Fargate**: cws-instrumentation 트레이서. Fargate는 eBPF 액세스를 제공하지 않으므로 이 Agent는 대신 ptrace를 사용합니다. 파일 무결성 모니터링 및 프로세스 실행 모니터링을 포함한 주요 Workload Protection 기능을 다룹니다.
- **Windows**: Windows 드라이버.

Linux 및 Windows 전반에서 Workload Protection은 프로세스, 파일 시스템, 커널 및 네트워크 활동을 아우르는 40개 이상의 이벤트 유형을 다룹니다. 각 Agent가 지원하는 배포판, 버전 및 클라우드 환경에 대해서는 [설정][1]을 참조하세요.

### 활동 평가하기 {#evaluating-activity}

Agent 규칙은 경량 필터링을 수행하므로 모든 호스트에서 효율적으로 실행됩니다. Datadog은 시간과 프로세스 전반에 걸쳐 더 복잡한 상관관계를 평가합니다.

1. [Agent 규칙][6]은 Agent 호스트에서 시스템 활동을 평가합니다.
2. 활동이 Agent 규칙 표현식과 일치하면 Agent가 [Agent 이벤트][7]를 생성하여 Datadog으로 전달합니다.
3. Datadog은 [탐지 규칙][8] 및 [파인딩 규칙][9]에 대해 Agent 이벤트를 평가합니다.
4. 탐지 규칙이 일치하면 신호가 생성되어 [신호][10]에 표시됩니다. Agent 이벤트 속성이 [위협 인텔리전스 지표][13]와 일치하면 일치하는 지표도 표시됩니다.
5. 발견 규칙이 일치하면 발견 결과가 생성되어 [발견 결과][11]에 표시됩니다.
6. 신호의 심각도, 규칙 유형, 태그 및 속성과 일치하는 모든 [알림 규칙][12]이 실행됩니다.

Workload Protection은 350개 이상의 Agent 규칙과 200개 이상의 탐지 규칙을 제공하며, 대부분의 MITRE ATT&CK 전술 및 기법을 다룹니다. 또한 복잡한 침해 지표에 대해서만 경고하는 Agent 내 상태 머신을 포함하여 직접 작성할 수도 있습니다.

### 위협 대응 {#responding-to-threats}

대응 작업은 Agent에서 실행됩니다. Agent는 프로세스나 컨테이너를 종료하거나 eBPF 기반 필터를 사용하여 네트워크 트래픽을 차단할 수 있습니다. 이러한 작업은 두 가지 방법으로 트리거할 수 있습니다.

- **자동 대응**은 Agent 규칙에 작업을 연결하므로 규칙이 일치하는 즉시 Agent가 작업을 실행합니다.
- **수동 대응**을 사용하면 신호가 생성된 후 신호에서 직접 대응 작업을 실행할 수 있습니다.

두 가지 모두 Agent에서 강제 적용 기능이 활성화되어 있어야 합니다. [위협 대응][4]을 참조하세요.

Agent 대신 Datadog에서 대응할 수도 있습니다. 신호에서 [워크플로][15]를 트리거하거나 기존 대응 파이프라인과 신호를 통합하세요. [신호 작업][16]을 참조하세요.

## 다음 단계 {#next-steps}

### 설정 {#setup}

[설정][1] 가이드부터 시작하세요. 여기에는 지원되는 환경, Agent 배포 방법, 그리고 플레이그라운드 스크립트를 사용하여 Workload Protection의 기능을 실험하는 방법이 포함됩니다.

### 탐지 및 모니터링{#detect-and-monitor}

[탐지 및 모니터링][2] 페이지를 읽고 에이전트 이벤트가 어떻게 Workload Protection 신호 및 발견 결과로 변환되는지 알아보세요. 해당 페이지에서는 기본 제공(OOTB) 탐지를 살펴보고 자체 탐지 로직을 만드는 방법을 알아보는 데 도움이 됩니다.

### 조사 및 분류{#investigate-and-triage}

[조사 및 분류][3] 페이지를 참조하여 Workload Protection에서 사용할 수 있는 탐색기 및 인앱 뷰를 확인하세요. 해당 페이지는 플랫폼에서 생성된 이벤트, 신호 및 발견 결과를 최대한 활용하는 방법을 알아보는 데 도움이 됩니다.

### 위협 대응 {#respond-to-threats}

[위협 대응][4] 페이지에서는 자동화된 대응 및 수동 대응을 구성하는 방법을 설명합니다. 여기에는 Agent의 시행 요구 사항, 사용 가능한 대응 작업, 그리고 결과 해석 방법이 포함됩니다.

### 적용 범위 {#coverage}

[적용 범위][5]를 사용하여 호스트, 컨테이너 및 서버리스 워크로드 전반에 걸쳐 Workload Protection 상태를 통합적으로 실시간으로 조회하세요. 정책 배포 문제, 보호되지 않는 자산 및 탐지 격차를 악용 가능한 위험이 되기 전에 식별하세요.

### 가이드 {#guides}

{{< whatsnext desc="Workload Protection을 발견하고 학습하는 데 도움이 되는 케이스 기반 예제를 다룹니다." >}}
{{< nextlink href="/security/workload_protection/guide/tuning-rules" >}}Workload Protection Security 신호 조정을 위한 모범 사례{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/security/workload_protection/setup
[2]: /ko/security/workload_protection/detect_and_monitor
[3]: /ko/security/workload_protection/investigate_and_triage
[4]: /ko/security/workload_protection/respond_and_report
[5]: /ko/security/workload_protection/inventory
[6]: /ko/security/workload_protection/detect_and_monitor/agent_rules
[7]: /ko/security/workload_protection/investigate_and_triage/agent_events
[8]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[9]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[10]: /ko/security/workload_protection/investigate_and_triage/security_signals
[11]: /ko/security/workload_protection/investigate_and_triage/security_findings
[12]: /ko/security/notifications/rules
[13]: /ko/security/workload_protection/detect_and_monitor/threat_intelligence
[14]: /ko/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[15]: /ko/actions/workflows/
[16]: /ko/security/workload_protection/investigate_and_triage/security_signals/actions