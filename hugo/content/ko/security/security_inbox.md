---
further_reading:
- link: /security/automation_pipelines/security_inbox
  tag: 문서
  text: Add to Security Inbox 규칙
- link: /security/automation_pipelines/set_due_date
  tag: 문서
  text: 기한 규칙 설정하기
- link: /security/cloud_security_management
  tag: 문서
  text: Cloud Security에 대해 자세히 알아보기
- link: /security/code_security/
  tag: 문서
  text: Code Security에 대해 자세히 알아보기
- link: /security/application_security/
  tag: 문서
  text: App and API Protection에 대해 자세히 알아보기
- link: /security/default_rules/#all
  tag: 문서
  text: 기본 제공 탐지 규칙
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: 블로그
  text: Datadog Security Inbox의 보안 위험 우선 순위 지정 방법
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Security Inbox
---
{{< product-availability >}}

Security Inbox는 가장 중요한 보안 발견 결과를 통합하여 실행 가능한 목록으로 제공합니다. Security Inbox는 Datadog 보안 제품 전반의 발견 결과(취약성, 구성 오류, ID 위험, 공격 경로)를 연결하고 컨텍스트를 추가하여 환경의 리스크를 가장 크게 줄일 수 있는 작업을 하나의 우선순위 보기로 제공합니다.

Security Inbox는 다음 세 가지 질문에 답합니다.

- **우리 팀이 다음에 처리해야 할 작업은 무엇입니까?** 발견 결과는 중증도, 연결된 리스크, 영향을 받는 리소스 및 서비스 수의 순서로 우선순위가 지정됩니다.
- **기한이 지난 항목은 무엇입니까?** 기한 규칙은 발견 결과에 수정 기한을 지정하여 조직이 약정한 서비스 수준 계약(SLA)에 따른 진행 상황을 추적할 수 있도록 합니다.
- **이 발견 결과가 내 받은 편지함에 있는 이유는 무엇입니까?** 모든 발견 결과는 받은 편지함 규칙을 통해 Security Inbox에 추가됩니다. 기본 규칙을 검토하고, 조직에 맞지 않는 규칙을 비활성화하며, 직접 규칙을 생성할 수 있습니다.

{{< img src="security/security_inbox_8.png" alt="Security Inbox는 중증도, 분류 상태 및 수정 SLA 요약과 함께 우선순위가 지정된 보안 발견 결과를 보여줍니다." width="100%">}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">Security Inbox에 데이터를 제공하는 일부 제품은 이 사이트에서 사용할 수 없습니다({{< region-param key="dd_site_name" >}}). Code Security 발견 결과는 Security Inbox에 추가되지 않으며 Linear는 티켓팅에 사용할 수 없습니다.</div>
{{% /site-region %}}

{{% site-region region="gov2" %}}
<div class="alert alert-danger">Security Inbox에 데이터를 제공하는 일부 제품은 이 사이트에서 사용할 수 없습니다({{< region-param key="dd_site_name" >}}). Code Security 및 App and API Protection 발견 결과는 Security Inbox에 추가되지 않습니다. Linear 티켓팅, Datadog Case Management 및 담당자 관리 기능도 사용할 수 없습니다.</div>
{{% /site-region %}}

## Security Inbox에 표시되는 항목 {#what-appears-in-security-inbox}

받은 편지함 규칙은 어떤 발견 결과가 Security Inbox에 추가될지 제어합니다. Datadog은 Datadog Security Research 팀에서 구성한 기본 받은 편지함 규칙 세트를 제공하며, 이를 통해 실제 리스크를 나타낼 가능성이 가장 높은 발견 결과가 표시됩니다. 이 규칙들을 검토하고, 개별 규칙을 끄거나 직접 규칙을 추가할 수 있습니다.

규칙은 순서대로 평가됩니다. 각 발견 결과에 대해 Datadog은 위에서부터 규칙을 확인하다가 일치하는 규칙을 찾으면 중단합니다. 일치하는 규칙이 없으면 해당 발견 결과는 Security Inbox에 추가되지 않습니다.

받은 편지함을 채우는 규칙을 확인하려면 Security Inbox 필터 바에서 **Customize inbox**를 클릭하거나 **Security** > **Settings** > [**Findings Automation**][24]으로 이동하세요.

### 지원되는 발견 결과 유형 {#supported-finding-types}

받은 편지함 규칙은 다음 발견 결과 유형과 일치할 수 있습니다.

| 발견 결과 유형 | 소스 |
|---|---|
| [구성 오류][2] | Cloud Security |
| [ID 위험][3] | Cloud Security |
| [공격 경로][1] | Cloud Security |
| [호스트 취약성][14] | Cloud Security |
| [컨테이너 이미지 취약성][14] | Cloud Security |
| [워크로드 활동][15] | Workload Protection |
| [라이브러리 취약성][4] | Code Security |
| [정적 코드 취약성][16] | Code Security |
| [런타임 코드 취약성][5] | Code Security |
| [코드형 인프라][17] | Code Security |
| [시크릿][18] | Code Security |
| [API 보안][19] | App and API Protection |

Security Inbox에는 읽기 권한이 있는 발견 결과 유형만 표시됩니다. 해당 탐색기에서 열 수 없는 발견 결과는 Security Inbox에 표시되지 않습니다.

### 탐지된 위험 {#detected-risks}

Security Inbox는 발견 결과를 평가할 때 다음 탐지된 위험을 고려합니다.

- **Public accessibility**: 공개적으로 노출된 리소스는 특히 취약성이나 구성 오류가 있는 경우 위험이 더 높습니다. 자세한 내용은 [Datadog에서 리소스의 공개 액세스 가능 여부를 결정하는 방법][6]을 참조하세요.
- **Privileged access**: 권한 있는 액세스가 부여된 리소스는 공격 표면을 확장할 수 있는 높은 수준의 권한을 제공하므로 위험이 더 높습니다.
- **Under attack**: 의심스러운 보안 활동이 나타나는 리소스는 위험이 더 높습니다. 최근 15일 이내에 해당 리소스에서 보안 신호가 탐지된 경우 'Under Attack'으로 플래그됩니다.
- **Exploit available**: 공개 익스플로잇이 있는 취약성은 위험이 더 높습니다. 공개 익스플로잇의 가용성은 [cisa.gov][7], [exploit-db.com][8], [nvd.nist.gov][9]와 같은 다양한 익스플로잇 데이터베이스를 통해 확인됩니다.
- **In production**: 프로덕션 환경의 취약성은 위험이 더 높습니다. 환경은 `env` 및 `environment` 태그를 기반으로 계산됩니다.

## Security Inbox 우선순위 지정 방식 {#how-security-inbox-prioritization-works}

Security Inbox는 먼저 발견 결과의 중증도를 고려하고, 그다음 연결된 위험의 수, 마지막으로 영향을 받는 리소스와 서비스의 수를 기준으로 우선순위를 지정합니다.

- **Severity(Critical, High, Medium, and Low)**: 중증도는 클라우드 구성 오류와 ID 위험의 경우 [Datadog Security Scoring Framework][10]에 따라, 취약성의 경우 CVSS 3.1에 따라 결정됩니다.
- **탐지된 위험 수**: 두 발견 결과의 중증도가 동일한 경우, 탐지된 위험 수가 더 많은 발견 결과에 더 높은 우선순위가 부여됩니다.
- **영향을 받는 리소스 및 서비스 수**: 두 발견 결과의 중증도와 탐지된 위험 수가 모두 동일한 경우, 더 많은 리소스와 서비스에 영향을 미치는 발견 결과에 더 높은 우선순위가 부여됩니다.

**참고**: 발견 결과 유형, 탐지된 위험 또는 영향을 받는 리소스의 종류는 우선순위 지정에 영향을 주지 않습니다.

## 기한에 따른 수정 진행 상황 추적 {#track-remediation-against-due-dates}

[기한 규칙][12]은 발견 결과의 중증도와 유형에 따라 수정 기한을 지정합니다. 기한이 구성되면 Security Inbox 상단의 **Remediation SLA** 카드에서 기한 대비 진행 상황을 확인할 수 있습니다.

| 상태 | 의미 |
|---|---|
| 기한 초과|  발견 결과의 수정 기한이 지났습니다. |
| 기한 임박|  발견 결과의 수정 기한이 향후 7일 이내입니다. |
| 기한 미도래|  발견 결과의 수정 기한이 7일 넘게 남았습니다. |

상태를 클릭하여 해당 상태의 발견 결과만 표시하도록 목록을 필터링하세요. 필터 표시줄에서 **기한 초과 상태**를 기준으로 필터링할 수도 있습니다.

다른 두 카드에는 동일한 발견 결과 집합이 요약되어 있습니다.

- **Severity**: Critical 및 High 발견 결과의 수입니다.
- **상태**:
  - **Pending triage**: 티켓도 담당자도 없는 발견 결과의 수입니다.
  - **In flight**: 티켓 또는 담당자가 하나 이상 있는 발견 결과의 수입니다.

## 발견 결과 조사 {#investigate-findings}

### 필터링 및 그룹화 {#filter-and-group}

필터를 적용하여 팀, 중증도, 발견 결과 유형, 서비스 및 리소스를 비롯한 발견 결과 스키마의 모든 패싯을 기준으로 Security Inbox의 범위를 좁힐 수 있습니다. 패싯으로 제공되지 않는 속성을 기준으로 필터링하려면 **Edit Filters** 메뉴에 해당 이름을 입력하고 사용자 지정 필터로 추가하세요.

**Group by**를 사용하여 최대 두 개의 필드를 기준으로 발견 결과를 한 번에 집계하세요. Security Inbox는 기본적으로 발견 결과 제목별로 그룹화되며, 동일한 근본적인 문제에 해당하는 모든 발견 결과를 하나의 행으로 묶습니다. 발견 결과당 하나의 행을 표시하려면 **Group by**를 **None**으로 설정하세요.

### 열 변경 {#change-the-columns}

표 위의 톱니바퀴 아이콘을 클릭하여 열을 추가, 제거 또는 재정렬하세요. 기본 열은 발견 결과 유형, 제목, 중증도, 위험, 리소스 및 분류 상태입니다.

<div class="alert alert-info">열 옵션은 그룹화되지 않은 표와 확장된 그룹 내의 표에서 사용할 수 있습니다. 그룹화된 보기의 외부 표에서는 사용할 수 없습니다.</div>

### 저장된 보기 {#saved-views}

현재 필터, 그룹화 및 열 조합을 저장된 보기로 저장하여 나중에 다시 열거나 팀과 공유할 수 있습니다. 저장된 보기는 **Views** 사이드바에 나열됩니다.

### 내보내기 {#export}

표 위의 **Export**를 클릭하여 발견 결과를 다른 도구로 내보냅니다.

- **Export to Sheets**: 더 심층적인 분석과 보고를 위해 발견 결과를 [Datadog Sheets][21]로 전송합니다.
- **DDSQL 편집기에서 열기**: 복잡한 집계 및 사용자 지정 분석을 위해 [DDSQL 편집기][22]에서 해당 쿼리를 엽니다.
- **Download as CSV**: 발견 결과를 CSV 파일로 다운로드합니다.
- **cURL로 복사**: 해당 API 요청을 클립보드에 복사합니다.

## 분류 및 수정 {#triage-and-remediate}

**분류** 열에는 개별 발견 결과에 대한 액션이 포함됩니다. **Assign**을 클릭하여 [담당자][23]를 설정하거나, **Add Ticket**을 클릭하여 표를 벗어나지 않고 티켓을 생성하거나 연결하세요.

여러 발견 결과에 한꺼번에 작업을 수행하려면 해당 항목을 선택하고 다음 옵션을 사용하세요.

- **Ticketing**: 선택한 발견 결과에 대해 Jira 이슈, ServiceNow 인시던트, Linear 이슈 또는 Datadog 보안 케이스를 생성하거나 기존 항목의 연결을 해제합니다. 설정 및 양방향 동기화에 대해서는 [Ticketing Integrations][20]을 참조하세요.
- **Assignee**: 선택한 발견 결과의 [담당자][23]를 설정하거나 해제합니다.
- **Muting**: 평가하여 수락한 발견 결과를 음소거합니다.
- **Severity**: 선택한 발견 결과의 중증도를 조정합니다.

그룹화되지 않은 표와 확장된 그룹 내에서 대량 선택을 사용할 수 있습니다. 발견 결과를 클릭하여 사이드 패널을 열면 해당 발견 결과 유형의 전체 탐지 세부 정보와 수정 지침이 표시됩니다.

## Security Inbox 보고 {#report-on-your-inbox}

**Reporting** 탭에는 시간 경과에 따른 Security Inbox 추세를 보여주는 대시보드가 표시되므로 수정 작업이 탐지 속도를 따라가고 있는지 추적할 수 있습니다.

## 보안 컨텍스트 맵을 사용한 취약성 식별 및 완화 {#use-the-security-context-map-to-identify-and-mitigate-vulnerabilities}

[Attack Paths](#supported-finding-types)의 보안 컨텍스트 맵은 잠재적 침해 지점을 식별하고 해결하는 데 도움이 되는 포괄적인 보기를 제공합니다. 이 맵은 공격자가 악용할 수 있는 상호 연결된 구성 오류, 권한 격차 및 취약성을 매핑합니다.

주요 기능은 다음과 같습니다.

- **Risk assessment**: 이 맵을 통해 보안 팀은 취약성과 구성 오류가 미치는 광범위한 영향을 평가할 수 있습니다. 여기에는 액세스 경로 및 권한과 같은 보안 정책을 업데이트해야 하는지 평가하고, 특히 영향 범위 내의 민감한 데이터가 위험에 노출된 경우 이러한 노출이 규정 준수에 미치는 영향을 파악하는 작업이 포함됩니다.
- **Actionable context for immediate response**: 이 맵에는 서비스 소유권 정보 및 기타 관련 컨텍스트가 포함되어 있어 팀이 충분한 정보를 바탕으로 실시간 의사결정을 내릴 수 있습니다. 팀은 도구를 전환하지 않고도 맵에서 직접 통합 워크플로를 실행하고, 보안 문제 링크를 공유하며, 리소스의 AWS 콘솔 보기에 액세스하여 효율적으로 수정할 수 있습니다.

{{< img src="security/security_context_map.png" alt="심각한 구성 오류가 있는 공개 액세스 가능 AWS EC2 인스턴스를 보여주는 보안 컨텍스트 맵" width="100%">}}

## Security Inbox 사용자 지정 {#customize-security-inbox}

[Automation Pipelines][13]를 사용하면 Security Inbox에 어떤 항목이 추가되는지와 각 발견 결과의 수정 기한을 결정하는 규칙을 구성할 수 있습니다. 자동화를 사용하여 다음 작업을 수행할 수 있습니다.

- **기본적으로 캡처되지 않은 발견 결과 다시 표시**: 사용자 지정 규칙을 사용하여 기본 규칙과 일치하지 않는 발견 결과를 강조 표시함으로써 중요한 결과를 놓치지 않도록 합니다.
- **규정 준수 강화 및 주요 시스템 문제 해결**: 심각도와 관계없이 규정 준수나 중요한 비즈니스 시스템에 영향을 미치는 문제를 해결합니다.
- **현재 위험 우선순위 지정**: 인시던트 후의 ID 위험이나 업계 전반의 취약성과 같은 즉각적인 위협에 집중합니다.
- **수정 기한 강제**: 중증도별로 기한을 지정하여 기한이 지난 작업을 팀 전체에서 확인할 수 있도록 합니다.

자세한 내용은 [Add to Security Inbox 규칙][11] 및 [기한 규칙 설정][12]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/?category=all#all
[2]: /ko/security/cloud_security_management/misconfigurations/
[3]: /ko/security/cloud_security_management/identity_risks/
[4]: /ko/security/code_security/software_composition_analysis
[5]: /ko/security/code_security/iast
[6]: /ko/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /ko/security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /ko/security/automation_pipelines/security_inbox
[12]: /ko/security/automation_pipelines/set_due_date
[13]: /ko/security/automation_pipelines/
[14]: /ko/security/cloud_security_management/vulnerabilities/
[15]: /ko/security/workload_protection/
[16]: /ko/security/code_security/static_analysis/
[17]: /ko/security/code_security/iac_security/
[18]: /ko/security/code_security/secret_scanning/
[19]: /ko/security/application_security/api_posture/
[20]: /ko/security/ticketing_integrations/
[21]: /ko/sheets/
[22]: /ko/ddsql_editor/
[23]: /ko/security/assignee_management/
[24]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox