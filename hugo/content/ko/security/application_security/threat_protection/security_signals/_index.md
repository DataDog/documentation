---
aliases:
- /ko/security/application_security/security_signals/
- /ko/security/application_security/threats/security_signals
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: 설명서
  text: AAP 위협 탐지 기본 제공 규칙 살펴보기
- link: /security/application_security/threat_protection/policies/custom_rules/
  tag: 설명서
  text: 사용자 지정 AAP 위협 탐지 규칙 구성
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: 설명서
  text: AAP 위협 인텔리전스
title: 보안 신호 조사
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

## 개요 {#overview}

AAP 보안 신호는 Datadog이 탐지 규칙을 기반으로 위협을 감지할 때 생성됩니다. [Signals Explorer][2]에서 보안 신호를 확인, 검색, 필터링 및 조사하거나 [알림 규칙][8]을 구성하여 타사 도구로 신호를 전송할 수 있습니다.

<!-- {{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="세부 정보 사이드 패널을 사용하여 Signals Explorer에서 위협을 조사하는 방법에 대한 개요">}} -->

## Signals Explorer 열 {#signals-explorer-columns}

Signals Explorer에는 다음 열이 표시됩니다.

{{< ui >}}Severity{{< /ui >}}
: 5가지 심각도 상태:  {{< ui >}}Info{{< /ui >}}, {{< ui >}}Low{{< /ui >}}, {{< ui >}}Medium{{< /ui >}}, {{< ui >}}High{{< /ui >}}, {{< ui >}}Critical{{< /ui >}} {{< ui >}}High{{< /ui >}} 및 {{< ui >}}Critical{{< /ui >}}은 서비스 이용 가능 여부에 대한 중대한 영향 또는 진행 중인 침해를 나타냅니다.

{{< ui >}}Title{{< /ui >}}
: 신호의 이름입니다. 새 데이터가 상호 연결되어 공격의 영향도 평가가 변경되면 제목이 업데이트될 수 있습니다.

{{< ui >}}Service/Env{{< /ui >}}
: 공격에서 식별된 서비스 및 환경입니다. 서비스 이름 위에 마우스를 올리면 서비스 페이지 및 코드 리포지토리로 연결되고 해당 서비스의 온콜 담당자를 확인할 수 있습니다.

{{< ui >}}Entities{{< /ui >}}
: 공격자와 공격의 피해자입니다. 공격자는 IP 주소로 식별됩니다. 피해자는 인증된 사용자로 식별됩니다. IP 목록 위에 마우스를 올린 다음 IP를 클릭하면 {{< ui >}}Threat Intelligence{{< /ui >}} 및 {{< ui >}}Security Activity{{< /ui >}} 등의 세부 정보를 확인할 수 있습니다.

{{< ui >}}Triage State{{< /ui >}}
: 신호에 대응자를 할당하고 분류 상태를 설정할 수 있습니다. 사용 가능한 상태는 {{< ui >}}Open{{< /ui >}}, {{< ui >}}Under Review{{< /ui >}}, {{< ui >}}Archived{{< /ui >}}입니다.

{{< ui >}}Creation Date{{< /ui >}}
: 신호가 처음 생성된 날짜입니다. 신호는 기본적으로 날짜순으로 정렬됩니다.

## 보안 신호 필터링 {#filter-security-signals}

[Signals Explorer][2]에서 보안 신호를 필터링하려면 검색 쿼리 `@workflow.triage.state:<status>`를 사용하세요. 여기서 `<status>`는 필터링하려는 상태(`open`, `under_review` 또는 `archived`)입니다. 패싯 패널에서 {{< ui >}}Signal State{{< /ui >}} 패싯을 사용할 수도 있습니다.

## 신호 분류{#triage-a-signal}

추가 조사를 위해 사용자에게 신호를 할당하여 신호를 분류할 수 있습니다. 할당된 사용자는 신호의 상태를 업데이트하여 검토 내용을 추적할 수 있습니다.

1. [Signals Explorer][2] 페이지에서 {{< ui >}}Triage State{{< /ui >}} 열의 사용자 프로필 아이콘을 클릭합니다.
2. 신호를 할당할 사용자를 선택합니다.
3. 보안 신호의 상태를 업데이트하려면 분류 상태 드롭다운 메뉴를 클릭하고 상태를 선택합니다. 기본 상태는 {{< ui >}}Open{{< /ui >}}입니다.
    - {{< ui >}}Open{{< /ui >}}: 신호가 아직 해결되지 않았습니다.
    - {{< ui >}}Under Review{{< /ui >}}: 신호를 활발히 조사하고 있습니다. {{< ui >}}Under Review{{< /ui >}} 상태에서는 필요에 따라 신호를 {{< ui >}}Archived{{< /ui >}} 또는 {{< ui >}}Open{{< /ui >}} 상태로 이동할 수 있습니다.
    - {{< ui >}}Archived{{< /ui >}}: 신호를 유발한 탐지가 해결되었습니다. 신호가 원래 탐지된 시점으로부터 30일 이내인 경우 신호를 {{< ui >}}Archived{{< /ui >}} 상태에서 {{< ui >}}Open{{< /ui >}} 상태로 다시 이동할 수 있습니다.

**참고**: 보안 신호를 수정하려면 `security_monitoring_signals_write` 권한이 있어야 합니다. Datadog의 기본 역할과 App 및 API Protection에 사용가능한 세분화된 역할 기반 액세스 제어 권한에 대한 내용은 [Role Based Access Control][9]을 참조하세요.

## 인시던트 선언 {#declare-an-incident}

[Incident Management][4]를 사용하여 보안 신호에 대한 인시던트를 생성할 수 있습니다.

다음과 같은 경우 인시던트를 선언하세요.

- 고객에게 영향을 미치고 있거나, 미칠 가능성이 있는 이슈.
- 긴급하게 해결해야 한다고 판단되는 이슈(내부 이슈 포함).

만약 인시던트 선언 여부에 대한 확신이 없다면, 다른 사용자에게 알리고 중요도를 적정 수준으로 조절하세요.

1. [Signals Explorer][2] 페이지에서 보안 신호를 선택하여 세부 정보 패널을 엽니다.
2. 신호 패널에서 {{< ui >}}Declare Incident{{< /ui >}}를 클릭하거나 드롭다운 화살표를 선택한 후 {{< ui >}}Add to an existing incident{{< /ui >}}를 선택합니다.
3. 새 인시던트를 선언할 때, {{< ui >}}Declare Incident{{< /ui >}} 설정에서 중요도 수준 및 인시던트 커맨더와 같은 세부 정보를 지정하여 인시던트를 구성합니다.
   1. 영향도를 추정합니다. 중요도 수준은 SEV-1(critical)부터 SEV-5(minor impact)까지 있습니다. 확실하지 않은 경우 항상 더 높은 중요도를 선택하세요.
4. {{< ui >}}Declare Incident{{< /ui >}}를 클릭합니다.

## 워크플로 실행 {#run-a-workflow}

[Workflow Automation][5]을 사용하여 보안 신호에 대한 워크플로를 수동으로 트리거할 수 있습니다.

1. 실행하려는 워크플로에 보안 트리거가 있는지 확인합니다.
2. [Signals Explorer][2] 페이지에서 보안 신호를 엽니다.
3. {{< ui >}}Respond{{< /ui >}} 섹션에서 {{< ui >}}Run Workflow{{< /ui >}}을 클릭합니다.
4. {{< ui >}}Run a workflow{{< /ui >}}에서 실행하려는 워크플로를 선택하거나 {{< ui >}}New Workflow{{< /ui >}}을 클릭합니다.
   - 선택한 워크플로에 따라 추가 입력 파라미터를 입력해야 할 수도 있습니다.
   - {{< ui >}}New Workflow{{< /ui >}}를 선택한 경우, '보안 워크플로 실행'이 열립니다. 워크플로에 대한 자세한 내용은 [Workflow Automation][5]을 참조하세요.
5. {{< ui >}}Run{{< /ui >}}을 클릭합니다.

## 검토 및 해결{#review-and-remediate}

1. [Signals Explorer][2] 페이지에서 보안 신호를 엽니다.
2. 신호 세부 정보에서 {{< ui >}}What Happened{{< /ui >}}, {{< ui >}}Activity Summary{{< /ui >}}, {{< ui >}}Detection Rule{{< /ui >}} 등의 각 섹션을 확인합니다.
3. {{< ui >}}Next Steps{{< /ui >}}를 확인하고 조치를 취합니다.
    -  {{< ui >}}Block all Attacking IPs{{< /ui >}}을 클릭하세요(특정 기간 또는 영구적으로).
    -  {{< ui >}}Automated Attacker Blocking{{< /ui >}}을 클릭하세요([감지][10] 규칙 기준). 이 설정에는 App and API Protection `Protect Write` 권한이 필요합니다.
    -  [{{< ui >}}Block with Edge WAF{{< /ui >}}][11]을 클릭하세요.

## 일괄 작업{#bulk-actions}

하나 이상의 신호를 선택할 경우 {{< ui >}}Bulk Actions{{< /ui >}}를 사용하여 다음 작업을 수행할 수 있습니다.

### 상태 설정{#set-state}

분류 상태를 {{< ui >}}Open{{< /ui >}}, {{< ui >}}Under Review{{< /ui >}} 또는 {{< ui >}}Archived{{< /ui >}} 상태로 설정합니다.

### 사용자에게 신호 할당 {#assign-the-signal-to-users}

{{< ui >}}Assign selection{{< /ui >}}을 선택한 다음 신호를 할당할 사용자를 선택하세요.

신호 할당을 없음으로 재설정하려면 {{< ui >}}Remove all assignments{{< /ui >}}을 선택하세요.

### Case Management {#case-management}

Datadog [Case Management][6]는 Datadog 및 타사 통합에서 감지된 문제를 분류, 추적 및 해결할 수 있는 중앙 집중식 공간을 제공합니다.

1. [Signals Explorer][2] 페이지에서 보안 신호를 선택합니다.
2. 에서 {{< ui >}}Bulk Actions{{< /ui >}}, {{< ui >}}Create a case{{< /ui >}}을 선택합니다.
3. {{< ui >}}Create a case{{< /ui >}}을 선택하거나, {{< ui >}}Add to an existing case{{< /ui >}}를 선택하여 신호를 기존 케이스에 추가합니다.
4. 제목 및 설명(필요 시)을 입력합니다.
5. {{< ui >}}Create Case{{< /ui >}}를 클릭합니다.

{{< ui >}}Create Case{{< /ui >}}를 클릭하면 Case Management와 선택한 프로젝트로 이동합니다.

## 저장된 뷰 {#saved-views}

Signals Explorer의 다양한 구성을 뷰로 저장할 수 있습니다. 예를 들어, 탐색기를 필터링하여 할당되지 않은 모든 신호를 표시한 다음 이를 뷰로 저장하는 것이 가능합니다.

구성을 뷰로 저장하면 고객님과 팀원들이 나중에 사용할 수 있습니다.

뷰에는 다음에 대한 탐색기의 현재 선택 항목이 포함됩니다.

- 시간 및 쿼리
- 표시된 열 및 정렬
- 분석 집계 설정
- 타임라인 표시 여부
- 표시된 패싯
- 탐지 규칙별 집계

1. 뷰를 저장하려면 원하는 뷰가 표시되도록 탐색기를 구성한 다음 {{< ui >}}Save{{< /ui >}}를 클릭합니다.
2. 뷰 이름을 입력한 다음 뷰를 공유할 팀을 선택합니다.
3. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

저장된 모든 뷰를 보려면 {{< ui >}}Views{{< /ui >}} 페이지 제목 옆의 {{< ui >}}Signals Explorer{{< /ui >}}를 클릭하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /ko/incident_response/incident_management/
[5]: /ko/actions/workflows/
[6]: /ko/incident_response/work_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /ko/security/notifications/rules/
[9]: /ko/account_management/rbac/permissions/#cloud-security-platform
[10]: /ko/security/application_security/threat_protection/policies/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /ko/security/application_security/threat_protection/policies/#blocking-attack-attempts-with-in-app-waf