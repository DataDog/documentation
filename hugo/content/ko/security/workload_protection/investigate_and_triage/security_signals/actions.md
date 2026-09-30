---
description: 신호 사이드 패널에서 Workload Protection 신호를 분류하고, 에스컬레이션하고, 자동화하고 대응하세요.
disable_toc: false
title: 보안 신호 분류 및 조치
---
Workload Protection 신호를 검토한 후 신호 사이드 패널의 {{< ui >}}Next Steps{{< /ui >}} 섹션을 사용하여 위협을 분류, 에스컬레이션, 자동화하거나 대응하세요.

Workload Protection 신호는 다른 Datadog Security 신호와 동일한 분류 및 대응 워크플로를 공유합니다. Cloud SIEM, App and API Protection, Workload Protection 전반의 보안 신호에 대한 개요는 [탐지 규칙][1] 및 통합 [Security Signals Explorer][2]를 참조하세요.

## 신호 분류{#triage-a-signal}

추가 조사를 위해 사용자에게 신호를 할당하여 신호를 분류할 수 있습니다. 할당된 사용자는 신호의 상태를 업데이트하여 검토 내용을 추적할 수 있습니다.

<div class="alert alert-info">보안 신호를 수정하려면 <code>security_monitoring_signals_write</code> 권한이 있어야 합니다. Datadog의 기본 역할 및 Workload Protection에 사용할 수 있는 세분화된 역할 기반 액세스 제어 권한에 대한 자세한 내용은 <a href="/account_management/rbac/permissions/#cloud-security-platform">역할 기반 액세스 제어</a>를 참조하세요.</div>

1. [Signals Explorer][3] 페이지에서 보안 신호를 선택합니다.
2. {{< ui >}}Triage{{< /ui >}} 섹션에서 {{< ui >}}Assign Signal{{< /ui >}}을 클릭한 다음 사용자를 선택합니다.
3. 보안 신호의 상태를 업데이트하려면 triage status 드롭다운 메뉴를 클릭하고 상태를 선택합니다. 기본 상태는 {{< ui >}}Open{{< /ui >}}입니다.
    - {{< ui >}}Open{{< /ui >}}: 신호가 아직 해결되지 않았습니다.
    - {{< ui >}}Under Review{{< /ui >}}: 신호를 조사하고 있습니다. {{< ui >}}Under Review{{< /ui >}} 상태에서는 필요에 따라 신호를 {{< ui >}}Archived{{< /ui >}} 또는 {{< ui >}}Open{{< /ui >}} 변경할 수 있습니다.
    - {{< ui >}}Archived{{< /ui >}}: 신호를 유발한 탐지가 해결되었습니다. 신호가 원래 탐지된 시점으로부터 30일 이내인 경우, 신호를 {{< ui >}}Archived{{< /ui >}} 상태에서 {{< ui >}}Open{{< /ui >}} 상태로 다시 변경할 수 있습니다.

## 케이스 생성{#create-a-case}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 Case Management가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[Case Management][4]를 사용하여 보안 신호를 추적, 분류 및 조사할 수 있습니다.

1. [Signals Explorer][3] 페이지에서 보안 신호를 선택합니다.
2. 신호 사이드 패널의 {{< ui >}}Next Steps{{< /ui >}} 아래에서 {{< ui >}}Respond{{< /ui >}} 섹션을 찾아 {{< ui >}}Create Security Case{{< /ui >}}를 클릭합니다. 신호를 기존 케이스에 추가하려면 {{< ui >}}Create Security Case{{< /ui >}} 옆의 드롭다운을 열고 {{< ui >}}Add to existing Security Case{{< /ui >}}를 선택하세요.
3. 제목 및 설명(필요 시)을 입력합니다.
4. {{< ui >}}Create Case{{< /ui >}}를 클릭합니다.

## 인시던트 선언 {#declare-an-incident}

[Incident Management][5]를 사용하여 보안 신호에 대한 인시던트를 생성하세요.

1. [Signals Explorer][3] 페이지에서 보안 신호를 선택합니다.
2. 신호 사이드 패널의 {{< ui >}}Respond{{< /ui >}} 섹션에서 {{< ui >}}More actions{{< /ui >}}를 확장합니다.
3. {{< ui >}}Escalate{{< /ui >}} 아래에서 다음 중 하나를 수행합니다.
    - 인시던트를 생성하려면 {{< ui >}}Declare Incident{{< /ui >}}를 클릭하세요. 심각도 수준 및 인시던트 커맨더와 같은 세부 정보를 지정하여 인시던트를 구성한 다음 {{< ui >}}Declare Incident{{< /ui >}}를 클릭하세요.
    - 신호를 기존 인시던트에 추가하려면 {{< ui >}}Declare Incident{{< /ui >}} 옆의 드롭다운을 열고 인시던트를 선택한 다음 {{< ui >}}Confirm{{< /ui >}}을 클릭하세요.

## 워크플로 실행 {#run-a-workflow}

[Workflow Automation][7]을 사용하여 보안 신호에 대한 워크플로를 수동으로 트리거할 수 있습니다. 자세한 내용은 [보안 신호에서 워크플로 트리거][6]을 참조하세요.

1. [Signals Explorer][3] 페이지에서 보안 신호를 선택합니다.
2. 신호 사이드 패널의 {{< ui >}}Respond{{< /ui >}} 섹션에서 {{< ui >}}Run Workflow{{< /ui >}}를 클릭합니다.
3. 워크플로 모달에서 실행할 워크플로를 선택합니다. 목록에 표시되려면 워크플로에 보안 트리거가 있어야 합니다. 워크플로에 따라 추가 입력 파라미터를 입력해야 할 수도 있습니다.
4. {{< ui >}}Run Workflow{{< /ui >}}를 클릭합니다.

또는 신호 사이드 패널에서 {{< ui >}}Workflows{{< /ui >}} 탭을 클릭하여 해당 신호에 대해 트리거된 워크플로와 실행이 제안된 워크플로를 확인합니다.

## 컨테이너 또는 프로세스 종료 {#kill-containers-or-processes}

신호 사이드 패널에서 악성 프로세스나 컨테이너를 직접 종료할 수 있습니다. {{< ui >}}Respond{{< /ui >}} 아래에서 {{< ui >}}Kill Containers or Processes{{< /ui >}}를 클릭하세요.

이 액션을 수행하려면 Datadog Agent에서 시행이 활성화되어 있어야 합니다. Agent는 구성된 범위에 따라 대상 프로세스 또는 침해된 컨테이너의 모든 프로세스를 종료합니다. 요구 사항, 구성 및 액션 상태에 대한 자세한 내용은 [수동 대응][8]을 참조하세요.

## 네트워크 격리 {#network-isolation}

신호 사이드 패널에서 침해된 프로세스나 컨테이너를 네트워크로부터 격리할 수 있습니다. {{< ui >}}Respond{{< /ui >}}에서 {{< ui >}}Network Isolation{{< /ui >}}을 클릭하여 eBPF 기반 필터를 사용하여 영향을 받는 워크로드에 대한 네트워크 트래픽을 차단하세요.

네트워크 격리를 위해서는 Agent에서 시행이 활성화되어 있어야 하며, Agent가 기본적으로 활성화하는 네트워크 프로브도 함께 활성화되어 있어야 합니다. 요구 사항 및 사용 가능한 시행 옵션은 [수동 대응][8]을 참조하세요.

[1]: /ko/security/detection_rules/
[2]: https://app.datadoghq.com/security/signals
[3]: https://app.datadoghq.com/security/workload-protection/signals
[4]: /ko/incident_response/work_management/
[5]: /ko/incident_response/incident_management/
[6]: /ko/security/cloud_security_management/workflows
[7]: /ko/service_management/workflows
[8]: /ko/security/workload_protection/respond_and_report/#response