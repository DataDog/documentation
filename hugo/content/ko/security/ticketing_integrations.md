---
aliases:
- /ko/security/cloud_security_management/review_remediate/jira
description: Security 티켓팅 통합
further_reading:
- link: /security/assignee_management/
  tag: 설명서
  text: 담당자 관리
- link: /incident_response/work_management/
  tag: 설명서
  text: 작업 관리
- link: /api/latest/security-monitoring/#create-cases-for-security-findings
  tag: API
  text: 티켓팅 통합 API
- link: https://www.datadoghq.com/blog/work-management/
  tag: 블로그
  text: Datadog Work Management를 통한 사람 및 에이전트형 작업의 중앙 집중화
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
site_support_id: case_management
title: 티켓팅 통합
---
{{< product-availability >}}

[Datadog Work Management][1]를 사용하여 [Jira][2], [ServiceNow][21], [Linear][23]와 같은 타사 도구의 티켓을 관리할 수 있습니다. 자세한 내용은 [타사 티켓팅 도구와의 Work Management 통합][3]을 참조하세요.

이 페이지에서는 티켓 관리를 위해 Datadog Security와 Datadog Work Management를 사용하는 방법을 설명합니다.

티켓을 생성하지 않고 Datadog 사용자를 파인딩에 할당하려면 [담당자 관리][30]를 참조하세요.


## Work Management 및 보안 제품 {#work-management-and-security-products}

Work Management는 신호나 탐지 결과를 사용하는 모든 보안 제품에서 지원됩니다.

- Code Security ([Findings][5])
- Cloud Security ([Findings][11])
- Cloud SIEM ([Signals][4])
- App and API Protection ([Signals][6] 및 [Findings][12])
- Workload Protection ([Signals][7] 및 [Findings][13])

이러한 제품에서 신호나 탐지 결과를 열거나 탐색기에서 탐지 결과를 일괄 선택한 다음 {{< ui >}}Create Ticket{{< /ui >}} 버튼을 사용하여 Datadog에서 케이스를 생성하세요.


## 양방향 티켓 동기화 {#bidirectional-ticket-syncing}

양방향 동기화를 사용하면 Datadog에서 변경 사항이 발생할 때 티켓을 자동으로 업데이트하고, 티켓팅 도구에서 변경 사항이 발생할 때 일부 Datadog 정보를 업데이트할 수 있습니다.

### 지원되는 제품 {#supported-products}

양방향 동기화는 다음 Code Security 및 Cloud Security 파인딩 카테고리에서 지원됩니다.

- Libraries (SCA)
- Static Code (SAST)
- Runtime Code (IAST)
- Secret Scanning 
- Infrastructure as Code(IaC)
- 구성 오류
- ID 위험
- 호스트 및 컨테이너 취약성
- App and API Protection
- Workload Protection

### 단일 정보 소스 {#single-source-of-truth}

양방향 동기화를 통해 티켓을 Datadog 케이스와 동기화할 수 있습니다. 하지만 Datadog은 문제 탐지 및 해결을 위한 단일 정보 소스입니다.

Datadog 파인딩과 관련된 티켓은 수동으로 닫을 수 있습니다. 하지만 Datadog이 문제가 해결되었음을 확인할 수 없는 경우 Datadog 파인딩은 열린 상태로 유지됩니다. 이 제한 사항은 누군가가 관련 티켓을 닫더라도 파인딩이 닫히거나 제거되지 않도록 하는 데 도움이 됩니다.

수정 없이 Datadog 케이스를 닫아도 파인딩이 닫히지는 않습니다.

Datadog에서 파인딩을 수정하거나 [파인딩 음소거][14]를 통해 예외를 정의하는 것만이 파인딩을 닫는 유일한 방법입니다. 파인딩이 수정되면 관련 케이스와 티켓이 닫힙니다.

### 양방향 동기화 설정 {#set-up-bidirectional-syncing}

{{< tabs >}}

{{% tab "Jira" %}}

다음 단계에 따라 Jira와의 양방향 동기화를 설정하고 설정이 성공했는지 확인합니다.

1. Datadog 계정에서 다음 필수 구성 요소를 설정하거나 이미 설정되어 있는지 확인합니다. 필수 구성 요소는 설정 순서대로 나열되어 있습니다.
   1. [Datadog Jira 통합][2].
   2. [Jira 통합을 위한 웹훅][8]. 웹훅을 설정하면 Work Management에서 생성한 케이스가 Jira에서 자동으로 이슈를 생성하고 두 리소스가 동기화된 상태로 유지됩니다.
   3. [새 Work Management 프로젝트][9]. 프로젝트는 케이스 세트를 보관하는 컨테이너 객체입니다.
   4. [프로젝트 내에서 Jira 통합이 구성되어 있습니다][3].
      1. {{< ui >}}Sync data between Work Management and Jira{{< /ui >}} 옵션을 활성화합니다.
      2. {{< ui >}}Title{{< /ui >}}에서 {{< ui >}}Two-way sync{{< /ui >}}를 선택합니다.
      3. 나머지 설정을 완료한 다음 {{< ui >}}Save changes{{< /ui >}}를 클릭합니다.
2. Jira와의 양방향 Work Management 통합이 정상적으로 작동하는지 확인합니다.
   1. [양방향 티켓 동기화를 지원하는 제품 중 하나][20]를 엽니다.
   2. 탐색기 또는 파인딩 페이지에서 티켓팅 드롭다운 옵션을 찾아 {{< ui >}}Jira{{< /ui >}}를 선택합니다. 이 버튼을 클릭하면 {{< ui >}}Jira Ticket{{< /ui >}} 모달이 열립니다.
   3. {{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}} 섹션이 있고 양방향 동기화가 활성화되어 있는지 확인합니다.

{{< img src="security/jira_modal-1.png" alt="양방향 동기화가 활성화된 상태에서 Security 파인딩에 대한 Jira 티켓을 생성하는 데 사용되는 모달입니다." responsive="true" style="width:50%;">}}

이제 양방향 작업 관리 티켓 생성을 시작할 준비가 되었습니다.

{{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}} 섹션이 보이지 않으면 필수 구성 요소를 완료했는지 확인하세요.

[2]: /ko/integrations/jira/
[3]: /ko/incident_response/work_management/notifications_integrations/#third-party-tickets
[8]: /ko/integrations/jira/#configure-a-jira-webhook
[9]: /ko/incident_response/work_management/projects/
[20]: /ko/security/ticketing_integrations/#supported-products

{{% /tab %}}

{{% tab "ServiceNow" %}}

다음 단계에 따라 ServiceNow와의 양방향 동기화를 설정하고 설정이 성공했는지 확인합니다.

1. Datadog 계정에서 다음 필수 구성 요소를 설정하거나 이미 설정되어 있는지 확인합니다. 필수 구성 요소는 설정 순서대로 나열되어 있습니다.
   1. [Datadog ServiceNow 통합][21].
      1. {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}ServiceNow{{< /ui >}} > {{< ui >}}Work Management{{< /ui >}}로 이동합니다.
      2. 양방향 동기화를 위한 케이스 테이블로 `Datadog Cases ITSM`을 선택합니다. 
   2. 할당 그룹에 연결할 [Work Management 프로젝트][9]. 프로젝트는 ServiceNow 테이블에 연결된 일련의 케이스를 보관하는 컨테이너 객체입니다. 연결된 프로젝트가 없는 경우, 티켓을 생성할 때 Datadog이 프로젝트를 생성합니다.
   3. ITSM 양방향 동기화를 위해 인시던트를 업데이트하는 ServiceNow 사용자에게 최소한 `itil` 역할이 있는지 확인합니다. 자세한 내용은 [ServiceNow ITOM/ITSM 설정][22]을 참조하세요.
2. Work Management와 ServiceNow 간의 양방향 통합이 정상적으로 작동하는지 확인합니다.
   1. [양방향 티켓 동기화를 지원하는 제품 중 하나][20]를 엽니다.     
   2. 탐색기 또는 파인딩 페이지에서 티켓팅 드롭다운 옵션을 찾아 {{< ui >}}ServiceNow{{< /ui >}}를 선택합니다. 이 버튼을 클릭하면 {{< ui >}}ServiceNow Ticket{{< /ui >}} 모달이 열립니다.
   3. 구성된 {{< ui >}}Instance{{< /ui >}} 및 {{< ui >}}Assignment Group{{< /ui >}}에 대해 양방향 동기화가 활성화되어 있는지 확인합니다.

{{< img src="security/servicenow_modal.png" alt="Security 파인딩에 대한 ServiceNow 티켓을 생성하는 데 사용되는 모달로, 양방향 동기화 및 상태 매핑이 활성화되어 있습니다." responsive="true" style="width:50%;">}}

이제 양방향 작업 관리 티켓 생성을 시작할 준비가 되었습니다.

{{< ui >}}Work Management ↔ ServiceNow Integration{{< /ui >}} 섹션이 보이지 않으면 필수 구성 요소를 완료했는지 확인하세요.

[3]: /ko/incident_response/work_management/notifications_integrations/#third-party-tickets
[9]: /ko/incident_response/work_management/projects/
[20]: /ko/security/ticketing_integrations/#supported-products
[21]: /ko/integrations/servicenow/
[22]: /ko/integrations/guide/servicenow-itom-itsm-setup/

{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Linear 티켓팅 통합은 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

다음 단계에 따라 Linear와의 양방향 동기화를 설정하고 설정이 성공했는지 확인합니다.

1. Datadog 계정에서 다음 필수 구성 요소를 설정하거나 이미 설정되어 있는지 확인합니다. 필수 구성 요소는 설정 순서대로 나열되어 있습니다.
   1. [Datadog Linear 통합][23].
   2. [Linear 통합을 위한 웹훅][24]. 웹훅을 구성하면 Work Management에서 생성된 케이스와 해당 Linear 이슈가 동기화된 상태로 유지됩니다.
   3. [새 Work Management 프로젝트][9]. 프로젝트는 케이스 세트를 보관하는 컨테이너 객체입니다.
   4. [프로젝트 내에서 Linear 통합이 구성되어 있습니다][3].
      1. 프로젝트에 대해 Linear를 활성화한 다음, 이슈 생성을 위한 Linear 계정과 팀을 선택합니다.
      2. 동기화 상태를 유지할 각 필드에 대해 {{< ui >}}Two-way sync{{< /ui >}}를 선택합니다.
      3. 나머지 설정을 완료한 다음 변경 사항을 저장합니다.
2. Work Management와 Linear 간의 양방향 통합이 정상적으로 작동하는지 확인합니다.
   1. [양방향 티켓 동기화를 지원하는 제품 중 하나][20]를 엽니다.
   2. 탐색기 또는 파인딩 페이지에서 티켓팅 드롭다운 옵션을 찾아 {{< ui >}}Linear{{< /ui >}}를 선택합니다. 이 버튼을 누르면 {{< ui >}}Linear Issue{{< /ui >}} 모달이 열립니다.
   3. {{< ui >}}Work Management ↔ Linear Integration{{< /ui >}} 섹션이 있고 양방향 동기화가 활성화되어 있는지 확인합니다.

{{< img src="security/linear_modal.png" alt="양방향 동기화가 활성화된 상태에서 Security 파인딩에 대한 Linear 이슈를 생성하는 데 사용되는 모달입니다." responsive="true" style="width:50%;">}}

이제 양방향 작업 관리 티켓 생성을 시작할 준비가 되었습니다.

{{< ui >}}Work Management ↔ Linear Integration{{< /ui >}} 섹션이 보이지 않으면 필수 구성 요소를 완료했는지 확인하세요.

[3]: /ko/incident_response/case_management/notifications_integrations/#third-party-tickets
[9]: /ko/incident_response/case_management/projects/
[20]: /ko/security/ticketing_integrations/#supported-products
[23]: /ko/integrations/linear/
[24]: /ko/integrations/linear/#configure-a-linear-webhook

{{% /tab %}}

{{< /tabs >}}

### 양방향 티켓 생성 {#create-bidirectional-tickets}

다음 단계에 따라 Security 파인딩에 대한 양방향 티켓을 생성합니다.

1. [양방향 티켓 동기화를 지원하는 제품 중 하나][20]를 엽니다.
2. 탐색기의 파인딩 또는 파인딩 페이지의 {{< ui >}}Next Steps{{< /ui >}} 아래에서 {{< ui >}}Ticketing{{< /ui >}} 아이콘 드롭다운 옵션을 찾습니다.
3. 한 번에 최대 50개의 탐지 결과를 선택하여 여러 티켓을 생성하거나 여러 탐지 결과에 대해 하나의 티켓을 생성할 수도 있습니다.
4. 드롭다운에서 타사 도구를 선택합니다.
5. 지원되는 타사 도구에서 티켓을 생성합니다(아래 섹션 참조).

{{% collapse-content title="Jira 티켓" level="h4" expanded=false %}}
1. {{< ui >}}Jira Ticket{{< /ui >}} 모달을 엽니다. 새 티켓이나 기존 티켓을 사용할 수 있습니다. 새 Jira 티켓을 생성하는 방법을 살펴보겠습니다.
2. 다음 설정을 완료하세요.
   1. {{< ui >}}Jira account{{< /ui >}}:** 티켓을 생성할 Jira 계정을 선택합니다.
   2. {{< ui >}}Jira Project{{< /ui >}}:** 사용할 Jira 프로젝트를 선택합니다.
   3. {{< ui >}}Jira work type{{< /ui >}}:** 생성할 Jira 작업 유형을 선택합니다.
   4. {{< ui >}}Assignee and Priority{{< /ui >}}:** 선택적으로 할당된 사용자와 우선순위를 선택합니다.
3. Datadog이 생성하는 Jira 티켓에 필드를 더 추가하려면 {{< ui >}}Add Optional Field{{< /ui >}}를 사용하여 필드를 추가합니다.
4. {{< ui >}}Data Sync Settings{{< /ui >}}를 조회하여 연결된 Work Management 프로젝트와 필드별 양방향 동기화 설정을 검토하고 업데이트합니다.
5. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

**참고**:
- Jira와의 양방향 동기화는 상태, 담당자, 댓글과 같은 특정 Jira 티켓 속성에 대해 사용할 수 있지만, 모든 Jira 필드를 사용할 수 있는 것은 아닙니다.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow 티켓" level="h4" expanded=false %}}
1. {{< ui >}}ServiceNow Ticket{{< /ui >}} 모달을 엽니다. 새 티켓이나 기존 티켓을 사용할 수 있습니다. 새 ServiceNow 티켓을 생성하는 방법을 살펴보겠습니다.
2. 다음 설정을 완료하세요.
   1. {{< ui >}}Instance{{< /ui >}}:** 티켓을 생성할 ServiceNow 인스턴스를 선택합니다.
   2. {{< ui >}}Assignment group{{< /ui >}}:** 티켓을 할당할 ServiceNow 그룹을 선택합니다.
3. 여러 탐지 결과에 대한 티켓을 생성하는 경우 생성 모드를 선택합니다.
   - {{< ui >}}Single Ticket{{< /ui >}}:** 선택한 모든 탐지 결과에 연결된 단일 집계 티켓을 생성합니다.
   - {{< ui >}}Multiple Tickets{{< /ui >}}:** 선택한 각 파인딩에 대해 개별 티켓을 생성합니다.
4. {{< ui >}}Data Sync Settings{{< /ui >}}를 조회하여 연결된 Work Management 프로젝트와 필드별 양방향 동기화 설정을 검토하고 업데이트합니다.
5. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

**참고**:
- 양방향 동기화는 `ITSM` 모드에서만 지원됩니다. `ITOM` 이벤트는 양방향 동기화를 지원하지 않습니다.
- 기존 티켓에 첨부하는 기능은 `ITSM` 모드에서만 지원됩니다.
- ServiceNow 인시던트 URL만 지원됩니다. 문제 및 변경 요청 URL은 허용되지 않습니다.
{{% /collapse-content %}}

{{% collapse-content title="Linear 이슈" level="h4" expanded=false %}}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Linear 티켓팅 통합은 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

1. {{< ui >}}Linear Issue{{< /ui >}} 모달을 엽니다. 새 이슈나 기존 이슈를 사용할 수 있습니다.
2. 다음 설정을 완료하세요.
   1. {{< ui >}}Linear account{{< /ui >}}:** 이슈를 생성할 Linear 계정을 선택합니다.
   2. {{< ui >}}Linear team{{< /ui >}}:** 이슈를 생성할 Linear 팀을 선택합니다.
3. 선택적으로 Linear 프로젝트, 라벨, 담당자 및 우선순위를 설정합니다.
4. {{< ui >}}Data Sync Settings{{< /ui >}}를 조회하여 연결된 Work Management 프로젝트와 필드별 양방향 동기화 설정을 검토하고 업데이트합니다.
5. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

**참고**:
- Linear와의 양방향 동기화는 상태, 담당자, 제목, 설명, 우선순위 및 댓글과 같은 이슈 속성에 사용할 수 있습니다.
- 기존 이슈를 사용하려면 Linear 이슈 URL을 제공하세요.
{{% /collapse-content %}}

### 양방향 Work Management 티켓 관리 {#manage-bidirectional-work-management-tickets}

**참고**: 양방향 동기화 문제를 해결하는 데 도움이 필요하면 [Work Management 문제 해결][24]을 참조하세요.

{{< tabs >}}

{{% tab "Jira" %}}

기존 양방향 Jira 티켓은 파인딩의 {{< ui >}}Ticketing{{< /ui >}} 또는 {{< ui >}}Next Steps{{< /ui >}} 섹션에 나열됩니다.

다음은 Static Code(SAST) 파인딩의 예입니다.

{{< img src="security/bidir-jira-existing-1.png" alt="기존 Jira 티켓이 있는 파인딩: Next Steps 섹션의 Ticket Created 아래에 Jira 로고와 'CJT-16' 텍스트가 포함된 배지" responsive="true" style="width:100%;">}}

Jira 티켓 위로 마우스를 가져가면 세부 정보를 볼 수 있습니다.

{{< img src="security/bidir-jira-existing-hover-1.png" alt="이전 이미지의 배지에 마우스를 올린 상태 Jira 티켓 세부 정보가 표시된 모달" responsive="true" style="width:100%;">}}

담당자 및 상태와 같은 세부 정보가 Jira 이슈 및 Datadog 케이스 변경 사항의 타임라인과 함께 제공됩니다.

닫힌 Jira 티켓은 녹색으로 표시됩니다.

{{< ui >}}Datadog Associated Case{{< /ui >}}에는 관련 Datadog 케이스가 제공됩니다. 케이스 이름을 클릭하여 [Work Management][1]에서 엽니다.

[1]: /ko/incident_response/work_management/
{{% /tab %}}

{{% tab "ServiceNow" %}}

기존 양방향 ServiceNow 티켓은 파인딩의 {{< ui >}}Ticketing{{< /ui >}} 또는 {{< ui >}}Next Steps{{< /ui >}} 섹션에 나열됩니다.

{{< img src="security/bidir-servicenow-existing.png" alt="기존 ServiceNow 티켓이 있는 탐지 결과: Next Steps 섹션의 Tracking 아래에 ServiceNow View incident 배지." responsive="true" style="width:100%;">}}

ServiceNow 티켓 위로 마우스를 가져가면 상태 및 ServiceNow와 Datadog 간에 동기화된 변경 사항의 타임라인을 포함한 세부 정보를 볼 수 있습니다.

{{< img src="security/bidir-servicenow-existing-hover.png" alt="인시던트 번호, 상태, ServiceNow와 Datadog 간에 동기화된 변경 사항의 타임라인을 보여주는 ServiceNow 티켓 배지 위의 툴팁." responsive="true" style="width:100%;">}}

{{< ui >}}Datadog Associated Case{{< /ui >}}에는 관련 Datadog 케이스가 제공됩니다. 케이스 이름을 클릭하여 [Work Management][1]에서 엽니다.

[1]: /ko/incident_response/case_management/
{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Linear 티켓팅 통합은 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

기존 양방향 Linear 이슈는 파인딩의 {{< ui >}}Ticketing{{< /ui >}} 또는 {{< ui >}}Next Steps{{< /ui >}} 섹션에 나열됩니다.

{{< img src="security/bidir-linear-existing.png" alt="Next Steps 섹션에 기존 Linear 이슈가 있는 파인딩" responsive="true" style="width:100%;">}}

Linear 이슈 위로 마우스를 가져가면 상태, 담당자, Linear와 Datadog 간에 동기화된 변경 사항의 타임라인을 포함한 세부 정보를 볼 수 있습니다.

{{< img src="security/bidir-linear-existing-hover.png" alt="이슈 상태, 담당자, Linear와 Datadog 간에 동기화된 변경 사항의 타임라인을 보여주는 Linear 이슈 배지 위의 툴팁" responsive="true" style="width:100%;">}}

{{< ui >}}Datadog Associated Case{{< /ui >}}에는 관련 Datadog 케이스가 제공됩니다. 케이스 이름을 클릭하여 [Work Management][1]에서 엽니다.

[1]: /ko/incident_response/work_management/
{{% /tab %}}

{{< /tabs >}}

#### 자동 연결 해제 및 티켓 열기/닫기 {#automatic-detachment-and-ticket-openingclosing}

케이스를 보관해도 관련 티켓은 삭제되지 않지만, 케이스 프로젝트를 삭제하면 관련 Security 탐지 결과에서 모든 티켓의 연결이 해제됩니다.

Security 파인딩에서 티켓 연결을 해제해도 티켓은 삭제되지 않습니다.

티켓에 연결된 열린 탐지 결과가 남아 있지 않으면(모두 연결 해제, 해결 또는 음소거된 경우) 티켓이 자동으로 닫힙니다.
마찬가지로 닫힌 티켓에 최소 하나의 열린 파인딩이 연결되면(연결되거나 다시 감지되거나 음소거 해제된 경우) 티켓이 자동으로 다시 열립니다.

### 양방향 Work Management 패싯 {#bidirectional-work-management-facets}

{{< ui >}}Triage{{< /ui >}} 아래에는 다음과 같은 여러 Work Management 패싯이 있습니다.

- 케이스 키
- Jira 키
- Jira 상태
- Linear 이슈 키
- Linear 상태
- 케이스 상태
- 티켓 첨부됨

이 패싯을 사용하여 속성을 쿼리하고 대시보드를 생성할 수 있습니다.

## 티켓팅 통합 API {#ticketing-integration-api}

Datadog 케이스와 기존 Security 탐지 결과 간의 연결을 공개 API로 관리할 수 있습니다.

전용 엔드포인트를 통해 사용자는 [기존 Security 탐지 결과에 대한 Datadog 케이스 생성][15], [기존 Datadog 케이스에 Security 탐지 결과 첨부][16], [케이스에서 Security 탐지 결과 분리][17]를 수행할 수 있습니다.

사용자는 [Security 탐지 결과에 대한 Jira 이슈 생성][18] 및 [Jira 이슈에 Security 탐지 결과 첨부][19]도 수행할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/work_management/
[2]: /ko/integrations/jira/
[3]: /ko/incident_response/work_management/notifications_integrations/#third-party-tickets
[4]: https://app.datadoghq.com/security/siem/signals
[5]: https://app.datadoghq.com/security/code-security
[6]: https://app.datadoghq.com/security/appsec/signals
[7]: https://app.datadoghq.com/security/workload-protection/signals
[8]: /ko/integrations/jira/#configure-a-jira-webhook
[9]: /ko/incident_response/work_management/projects/
[10]: /ko/security/ticketing_integrations/#prerequisites
[11]: https://app.datadoghq.com/security/compliance
[12]: https://app.datadoghq.com/security/appsec/inventory/finding
[13]: https://app.datadoghq.com/security/workload-protection/findings
[14]: https://app.datadoghq.com/security/automation_pipelines/mute
[15]: /ko/api/latest/security-monitoring/#create-cases-for-security-findings
[16]: /ko/api/latest/security-monitoring/#attach-security-findings-to-a-case
[17]: /ko/api/latest/security-monitoring/#detach-security-findings-from-their-case
[18]: /ko/api/latest/security-monitoring/#create-jira-issues-for-security-findings
[19]: /ko/api/latest/security-monitoring/#attach-security-findings-to-a-jira-issue
[20]: /ko/security/ticketing_integrations/#supported-products
[21]: /ko/integrations/servicenow/
[22]: /ko/integrations/guide/servicenow-itom-itsm-setup/
[23]: /ko/integrations/linear/
[24]: /ko/incident_response/case_management/troubleshooting/
[30]: /ko/security/assignee_management/