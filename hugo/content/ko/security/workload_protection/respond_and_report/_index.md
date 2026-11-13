---
aliases:
- /ko/security/workload_protection/respond_and_report/active_protection
- /ko/security/workload_protection/respond_and_report/automated_response
- /ko/security/workload_protection/respond_and_report/response
- /ko/security/workload_protection/respond_and_report/remediation
- /ko/security/workload_protection/guide/active-protection
- /ko/security/cloud_security_management/guide/active-protection
description: 자동 및 수동 Workload Protection 대응 액션을 사용하여 프로세스와 컨테이너를 종료하거나 네트워크 트래픽을 차단합니다.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: 설명서
  text: Workload Protection 탐지 규칙
- link: /security/workload_protection/setup
  tag: 설명서
  text: Workload Protection 설정
- link: /security/workload_protection/setup/advanced_configuration
  tag: 설명서
  text: Workload Protection Agent 구성
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: 학습 센터
  text: Workload Protection으로 호스트 및 컨테이너 침해 탐지하기
- link: https://www.datadoghq.com/blog/stop-runtime-threats-with-workload-protection-response-actions/
  tag: 블로그
  text: Workload Protection 대응 액션으로 런타임 위협 차단
site_support_id: workload_security_active_protection
title: 위협 대응
---
Workload Protection은 프로세스와 컨테이너를 종료하거나 네트워크 트래픽을 차단하여 위협에 대응합니다. Agent 규칙이 일치하면 Datadog Agent가 이러한 액션을 자동으로 실행하며, 신호에서 수동으로 트리거할 수도 있습니다. 두 방식 모두 Agent의 강제 적용 기능에 의존합니다.

## 대응 요건 {#response-requirements}

대응 액션은 Agent에서 실행되므로 자동 및 수동 대응 모두 Agent 설정과 적절한 RBAC 권한이 필요합니다.

### Agent 강제 적용 구성 {#configure-agent-enforcement}

대응 액션은 `/etc/datadog-agent/system-probe.yaml`의 `runtime_security_config.enforcement` 설정을 사용합니다. 강제 적용은 기본적으로 활성화되어 있으며, 대부분의 구성에서는 기본 설정으로 충분합니다. 전체 파라미터에 대한 참고 자료는 [Workload Protection Agent 구성][4]을 참조하세요.

이 설정을 통해 대응 액션에서 바이너리를 제외하거나 대응 액션을 트리거할 수 있는 규칙 소스를 제어할 수 있습니다. 기본적으로 제외된 바이너리는 없으며, `file` 및 `remote-config` 규칙 소스가 허용됩니다.

### 대응 권한 {#response-permissions}

자동 및 수동 대응에는 모두 특정 [RBAC 권한][5]이 필요합니다.

- `security_monitoring_cws_agent_rules_actions` 권한을 사용하면 자동 대응을 구성하고 위협에 수동으로 대응할 수 있습니다.
  - Datadog Admin 역할이 있는 사용자는 이 권한이 포함된 역할을 생성한 다음, 자동 대응을 관리하거나 수동 대응 액션을 실행해야 하는 사용자에게만 해당 역할을 할당해야 합니다.
- **Datadog Standard** 역할을 가진 사용자는 규칙의 **protection** 설정을 변경하지 않는 한 기본적으로 사용자 지정 규칙을 생성하고 업데이트할 수 있습니다. Standard 역할이 있는 사용자는 자동 대응 액션이 포함된 비활성화된 규칙을 활성화할 수 없으며 수동 대응 액션을 사용할 수 없습니다.

## 자동 대응 {#automated-response}

자동 대응을 사용하면 Datadog Agent 탐지 규칙으로 식별된 위협과 일치하는 프로세스나 컨테이너를 종료하거나 네트워크에서 격리함으로써 해당 위협을 사전에 차단할 수 있습니다.

자동 대응에서는 두 팀이 의사 결정을 분담합니다.

- 보안 팀은 어떤 위협에 자동 액션이 필요한지 결정합니다.
- 개발 운영 팀은 어떤 애플리케이션과 리소스가 특정 대상을 보호하기 위한 조치를 견딜 만큼 충분한 복원력을 갖추고 있는지 결정합니다.

이를 통해 위협을 탐지한 후 신뢰도가 높은 위협에 대해 즉시 표적 완화 조치를 수행할 수 있습니다.

### 자동 대응 가용성 {#automated-response-availability}

Agent 규칙에 대해 자동 대응이 활성화된 경우 다음과 같이 규칙에서 검증할 수 있습니다.

1. [Agent Configuration][2]에서 규칙을 엽니다.
2. 활성 액션 목록에 {{< ui >}}Automated response{{< /ui >}}가 표시되는지 확인합니다.

신호를 생성한 규칙에 자동 대응이 적용되는지 확인하려면 다음 단계를 따르세요.

1. [Signals][1]에서 신호를 엽니다.
2. {{< ui >}}Next Steps{{< /ui >}}를 확인합니다. 일치하는 규칙에 자동 대응을 사용할 수 있는 경우 {{< ui >}}Proactively block threats{{< /ui >}}에 {{< ui >}}Automated response enabled{{< /ui >}}가 표시됩니다.

### Agent 규칙에서 자동 대응 구성 {#configure-automated-response-on-agent-rules}

기본적으로 모든 기본 제공(OOTB) Agent 규칙은 자동 대응 없이 활성화됩니다. 프로세스를 종료하거나 격리하려면 자동 대응 액션을 수동으로 구성해야 합니다.

#### 보호 상태 {#protection-states}

Agent 규칙은 다음 상태 중 하나일 수 있습니다.

- **비활성:** Agent가 규칙 이벤트를 모니터링하지 않으며 Datadog 백엔드로 탐지 결과를 전송하지 않습니다.
- **활성:** 활성화된 규칙에 대한 기본 설정입니다. Agent는 활성화된 규칙을 모니터링하고 [Signals][1]에 탐지 결과를 표시합니다.
- **자동 대응이 활성화된 상태:** Agent는 활성화된 규칙을 모니터링하고, 일치하는 프로세스를 종료하거나 네트워크에서 격리하며, [Signals][1]에 탐지 결과를 표시합니다.

<div class="alert alert-info">자동 대응은 활성화된 이후에 탐지된 모든 위협에 적용됩니다. 자동 대응은 소급 적용되지 않습니다.</div>

Agent 규칙에서 자동 대응을 활성화하려면 다음 단계를 따르세요.

1. [Agent Configuration][2]에서 규칙을 엽니다. {{< ui >}}Agent's actions{{< /ui >}} 섹션에 {{< ui >}}Automated response{{< /ui >}} 액션이 없으면 해당 규칙에 대해 자동 대응을 사용할 수 없습니다.
2. {{< ui >}}Edit{{< /ui >}}을 클릭합니다.
3. {{< ui >}}Add actions for the agent to follow{{< /ui >}}에서 {{< ui >}}Automated response{{< /ui >}} 중 하나를 선택합니다.

   {{< img src="security/workload_protection/respond_and_report/automated_response_activation.png" alt="자동 대응 액션이 표시된 Agent 규칙의 Protection 섹션" style="width:100%;" >}}
4. {{< ui >}}Link the rule to policies{{< /ui >}}에서 하나 이상의 정책에 대해 규칙이 {{< ui >}}Active{{< /ui >}} 상태인지 확인합니다.
5. {{< ui >}}Update Agent Rule{{< /ui >}}을 클릭합니다.

### 차단된 공격 시도 검토 {#review-blocked-attack-attempts}

Agent 규칙에 대해 자동 대응이 활성화되면 차단된 위협이 [Signals][1]에 표시됩니다.

모든 자동 대응은 수동으로 실행한 대응과 함께 Response 표에 나열됩니다.

## 수동 대응 {#response}

Workload Protection에서 [신호][6]를 생성한 후 신호 사이드 패널에서 수동 대응을 통해 인프라를 보호할 수 있습니다. Agent 규칙이 프로세스를 자동으로 종료하지 않도록 하려면 수동 대응을 사용합니다.

{{< img src="security/workload_protection/respond_and_report/response_actions.png" alt="ISOLATED 및 KILLED 상태와 함께 Isolate Container 및 Kill Container 액션이 표시된 Response 섹션" style="width:100%;" >}}

### 수동 대응을 위한 추가 요건 {#additional-requirements-for-manual-response}

Workload Protection이 활성화된 Agent를 실행하는 호스트나 컨테이너가 있는 각 환경이 다음 요건을 충족하는지 확인합니다.

- 대응 액션을 실행해야 하는 호스트에 Datadog **Agent 7.78** 이상이 설치되어 있어야 합니다.
- [**Remote Configuration**][3]이 활성화되어 대응 정책이 Agent에 전달될 수 있어야 합니다.
- [Agent 강제 적용 구성](#configure-agent-enforcement)에 설명된 대로 `system-probe`에서 강제 적용이 기본적으로 활성화됩니다.

### 사용 가능한 액션 {#available-actions}

Agent는 다음 **강제 적용** 액션 유형을 지원합니다.

#### Kill {#kill}

범위에 따라 악성 프로세스 또는 침해된 **컨테이너**(cgroup)의 모든 프로세스를 종료합니다.

#### 네트워크 필터(네트워크 격리) {#network-filter-network-isolation}

eBPF 기반 필터를 사용하여 네트워크 트래픽을 차단합니다(예: 특정 포트로의 송신 트래픽 차단). 모든 격리 조치를 되돌릴 수 있습니다.

네트워크 격리는 eBPF **Traffic Control** 분류기 및 원시 패킷 프로그램을 사용합니다. Agent는 `system-probe.yaml`의 `event_monitoring_config.network`에서 필요한 네트워크 프로브를 기본적으로 활성화합니다.

### 액션 상태 {#action-statuses}

대응 액션이 실행되면 Agent는 이를 자동 대응과 함께 Response 표에 기록합니다. 각 액션에는 상태가 있습니다. 아래 표에는 각 액션 유형에 대한 주요 결과가 요약되어 있습니다.

| 상태 | 설명 | Kill | 네트워크 격리 |
| --- | --- | --- | --- |
| `performed` | 액션이 성공적으로 완료되었습니다. | {{< X >}} | {{< X >}} |
| `partially_performed` | 종료 작업은 부분적으로 성공했으나(예: 일부 프로세스 종료) 모든 대상을 종료하지는 못했습니다. | {{< X >}} | |
| `removed` | 이전에 존재했던 격리 규칙이 현재 규칙 집합에서 **제거되었습니다**. 네트워크 격리를 **되돌릴** 때 사용됩니다. | | {{< X >}} |
| `error` | 응답 중에 오류가 발생했습니다. 액션이 실패했으며 프로세스 또는 컨테이너가 여전히 실행 중이거나 격리되지 않았습니다. | {{< X >}} | {{< X >}} |
| `not_triggered` | Agent가 대상 리소스를 찾지 못했습니다. 대응 액션이 실행되기 전에 컨테이너 또는 프로세스가 종료되었을 수 있습니다. | {{< X >}} | {{< X >}} |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/workload-protection/agent-rules
[3]: /ko/agent/remote_config/?tab=configurationyamlfile
[4]: /ko/security/workload_protection/setup/advanced_configuration
[5]: /ko/account_management/rbac/permissions
[6]: /ko/security/workload_protection/investigate_and_triage/security_signals