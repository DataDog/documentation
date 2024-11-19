---
aliases:
- /ko/security_platform/cloud_workload_security/
- /ko/security/cloud_workload_security/
- /ko/security/cloud_workload_security/agent_expressions
- /ko/security/cloud_workload_security/backend/
- /ko/security/threats/security_profiles
- /ko/security/threats/runtime_anomaly_detection
title: 클라우드 보안 관리 위협
---

Cloud Security Management Threats (CSM Threats)는 환경 전체의 파일, 네트워크 및 프로세스 활동을 모니터링하여 인프라스트럭처에 대한 실시간 위협을 감지합니다. Datadog 플랫폼의 일부로 CSM Threats의 실시간 위협 감지를 메트릭, 로그, 트레이스 및 기타 원격 측정과 결합하여 워크로드에 대한 잠재적인 공격을 둘러싼 전체 컨텍스트를 확인할 수 있습니다.

## 실시간으로 프로덕션 워크로드에 대한 위협 감지

커널 수준에서 파일 및 프로세스 활동을 모니터링하여 Amazon EC2 인스턴스, Docker 컨테이너, Kubernetes 클러스터 등 인프라스트럭처에 대한 위협을 탐지합니다. CSM Threats를 [Network Performance Monitoring][9]과 결합하여 워크로드가 손상되기 전에 네트워크 수준에서 의심스러운 활동을 탐지합니다.

CSM Threats는 Datadog Agent를 사용하여 환경을 모니터링합니다. 아직 Datadog Agent를 설정하지 않은 경우 [지원되는 운영 체제][1]에서 [Agent 설정부터 시작][2]하세요. Datadog Agent가 CSM Threats에 대해 사용하는 네 가지 유형의 모니터링이 있습니다.

1. **Process Execution Monitoring**: 호스트나 컨테이너의 악의적인 활동에 대한 프로세스 실행을 실시간으로 감시합니다.
2. **File Integrity Monitoring**: 호스트 또는 컨테이너의 주요 파일 및 디렉터리 변경 사항을 실시간으로 감시합니다.
3. **DNS Activity Monitoring**: 호스트와 컨테이너의 악의적인 활동에 대한 네트워크 트래픽을 실시간으로 감시합니다.
4. **Kernel Activity Monitoring**: 프로세스 하이재킹, 컨테이너 침입 등과 같은 커널 계층 공격을 실시간으로 감시합니다.

{{< img src="security/csm/csm_overview_2.png" alt="해결할 중요 보안 이슈 목록을 보여주는 Cloud Security Management의 Security Inbox 개요" width="100%">}}

## Active Protection으로 위협을 사전에 차단

기본적으로 모든 OOTB Agent 크립토마이닝 위협 탐지 규칙이 활성화되어 있으며 위협을 적극적으로 모니터링합니다.

[Active Protection][10]을 사용하면 Datadog Agent 위협 탐지 규칙으로 식별된 크립토마이닝 위협을 사전에 차단하고 종료할 수 있습니다.

## 기본 및 커스텀 탐지 규칙 관리

CSM Threats에는 보안 전문가 팀이 유지 관리하는 50개 이상의 기본 탐지 규칙이 포함되어 있습니다. 규칙은 가장 중요한 위험을 표면화하므로 즉시 해결 조치를 취할 수 있습니다. Agent 표현 규칙은 분석을 위해 수집할 워크로드 활동을 정의하는 반면, 백엔드 탐지 규칙은 활동을 분석하고 공격자 기술 및 기타 위험한 행동 패턴을 식별합니다.

[Remote Configuration[7]을 사용하여 새 규칙과 업데이트된 규칙을 Agent에 자동으로 배포합니다. 각 규칙이 프로세스, 네트워크 및 파일 활동을 모니터링하는 방법을 정의하여 [규칙을 사용자 정의[5]하세요. 또한 [커스텀 규칙을 생성][6]하고 새로운 신호에 대해 [실시간 알림을 설정](#set-up-real-time-notifications)하세요.

{{< img src="security/cws/threats_detection_rules.png" alt="Datadog 앱의 CSM Threats 탐지 규칙" width="100%">}}

## 실시간 알림 설정

[실시간 알림을 보냄으로써][3] 환경에서 위협이 감지되면 위험을 완화하기 위한 조치를 취할 수 있습니다. 알림은 [Slack, 이메일, PagerDuty, 웹훅 등][4]으로 보낼 수 있습니다.

템플릿 변수와 Markdown을 사용하여 [알림 메시지를 사용자 정의][5]하세요. 기존 알림 규칙을 편집, 비활성화 및 삭제할 수 있습니다. 또한 심각도 및 규칙 유형에 따라 새 규칙을 생성하고 알림이 트리거되는 경우에 대한 커스텀 로직을 정의할 수 있습니다.

## 보안 신호 조사 및 해결

[Signals Explorer][8]에서 보안 신호를 조사하고 분류합니다. 영향을 받은 파일이나 프로세스, 관련 신호 및 로그, 해결 단계에 대한 자세한 정보를 확인하세요.

{{< img src="security/cws/signals_explorer.png" alt="CSM Signals Explorer 페이지" width="100%">}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfzQARsTPr3tiJDnS_4bGx7w35LDfAbGUggaUzHYoL0dIUMWQ/viewform" btn_hidden="false" header="Active Protection">}}

Datadog은 환경에서 자동으로 감지된 암호화 위협을 해결하기 위해 Active Protection이라는 새로운 기능을 도입했습니다. Active Protection은 비공개 베타 버전입니다. 액세스를 요청하려면 양식을 작성하세요.
{{< /callout >}}

## 시작하기

{{< whatsnext >}}
  {{< nextlink href="/security/threats/setup">}}설정 및 구성 완료{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}CSM Threats에 대한 Datadog 역할 권한{{< /nextlink >}}
  {{< nextlink href="/security/threats/workload_security_rules">}}CSM Threats 탐지 규칙 알아보기{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}기본 CSM Threats 탐지 규칙 사용하기{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Cloud Security Management 시작하기{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/security/threats/setup/?tab=kuberneteshelm#prerequisites
[2]: /ko/agent/
[3]: /ko/security/notifications/
[4]: /ko/security/notifications/#notification-channels
[5]: /ko/security/notifications/#detection-rule-notifications
[6]: /ko/security/threats/agent_expressions
[7]: /ko/security/threats/setup
[8]: /ko/security/threats/security_signals
[9]: /ko/network_monitoring/performance/
[10]: /ko/security/cloud_security_management/guide/active-protection