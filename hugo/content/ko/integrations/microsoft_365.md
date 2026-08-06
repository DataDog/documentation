---
categories:
- 로그 수집
- 보안
custom_kind: integration
dependencies: []
description: Microsoft 365에 연결하여 조직의 감사 로그를 Datadog의 로깅 플랫폼으로 가져옵니다.
doc_link: https://docs.datadoghq.com/integrations/microsoft_365/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/microsoft-365-integration/
  tag: 블로그
  text: Datadog를 사용해 Microsoft 365 감사 로그 수집 및 모니터링
git_integration_title: microsoft_365
has_logo: true
integration_id: ''
integration_title: Microsoft 365 보안 및 감사 로그
integration_version: ''
is_public: true
manifest_version: '1.0'
name: microsoft_365
public_title: Datadog-Microsoft 365 보안 및 감사 로그
short_description: 'Datadog에서 Microsoft 365 감사 로그 보기(예: 서비스): Microsoft Teams, Power
  BI, Azure Active Directory, Dynamics 365 등'
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Microsoft 365와 통합:

- Datadog 로깅 제품을 사용하여 감사 로그 보기 및 구문 분석
- Microsoft 365 플랫폼에서 이벤트 모니터링을 설정하세요.
- 보안 도구(Datadog 스위트(suite))를 활용하여 보안 규칙을 설정하세요.

## 설정

### 설치

[Datadog Microsoft 365 타일][1]를 사용하여 통합을 설치합니다.

**새 테넌트 설치**를 클릭합니다. 그러면 인증을 위해 Microsoft 365 계정에 로그인하라는 메시지가 표시됩니다. 관리자 계정으로 로그인해야 합니다.

선택적으로 쉼표로 구분된 커스텀 태그를 추가하여 새로 설정된 테넌트에 대해 로그을 남깁니다(예: `environment:prod,team:us`). 이 태그는 로그 을 필터링/분석하는 데 사용할 수 있습니다.

**참고**: Datadog 감사 로깅을 사용하려면 조직에 [감사 로깅 사용][2]이 설정되어 있어야 합니다.

## 수집한 데이터

### 로그

[Office 365 관리 API 스키마][3]에 언급된 모든 서비스에 대해 감사 로그를 수집할 수 있습니다.

- Microsoft Teams
- Power BI
- Azure Active Directory
- Dynamics 365
- Exchange
- SharePoint

Microsoft 365 통합은 감사 로그당 하나의 로그 이벤트를 남깁니다. 수집된 로그는 소스 `microsoft-365`로 태그가 지정됩니다. 요약 및 링크를 포함하는 일반적인 로그 소스 목록의 경우 아래를 클릭해 Datadog의 로그 쿼리를 사전 설정합니다.

<details>
  <summary><strong>클릭하여 일반적인 로그 출처 보기 </strong></summary>

[`AirInvestigation`][4]
: Microsoft 365 내의 고급 전자 검색 및 지능형 위협 방지(ATP) 조사와 관련된 로그입니다. 로그에는 보안 인시던트, 조사 및 경고, 수정 단계 및 포렌식 데이터와 같은 위협을 완화하기 위해 취한 조치에 대한 정보가 포함되어 있습니다.

[`Audit.AzureActiveDirectory`][5]
: Microsoft의 클라우드 기반 ID 및 액세스 관리 서비스인 Azure AD(Azure Active Directory)에서 생성된 로그
를 나타냅니다. Azure AD 로그는 사용자 로그인 활동, 디렉터리 및 그룹 관리, 애플리케이션 액세스 및 보안 관련 이벤트에 대한 인사이트를 제공합니다. 이를 통해 조직은 사용자 액세스를 관리하고 잠재적인 보안 위험을 감지할 수 있습니다.

[`Audit.Exchange`][6]
: Microsoft Exchange Server에서 생성된 로그입니다. Exchange 로그에는 이메일 전달, 사서함 액세스, 클라이언트 연결 및 Exchange 환경 내의 관리 작업에 대한 정보가 포함되어 있습니다. 조직이 이메일 관련 문제를 모니터링하고 해결하는 데 도움을 줍니다..

[`Audit.General`][7]
: 사용자 및 관리자 활동, 시스템 이벤트, 보안 인시던트, Exchange 또는 SharePoint와 같은 특정 서비스와 직접적으로 연관되지 않은 기타 작업 등 Microsoft 365 환경 내에서 발생하는 다양한 활동 및 이벤트에 대한 정보를 포함합니다.

[`Audit.MicrosoftForms`][8]
: 설문 조사, 퀴즈 및 양식을 만들기 위한 도구인 Microsoft Forms에서 생성된 로그를 나타냅니다. 양식 로그에는 양식 작성, 액세스, 응답 및 사용자 활동에 대한 정보가 포함되어 있으며 조직이 양식 데이터를 추적하고 보호하는 데 도움이 됩니다.

[`Audit.MicrosoftStream`][9]
: Microsoft 에코시스템 내의 비디오-공유 플랫폼인 Microsoft Stream에서 생성된 로그입니다.Stream 로그에는 비디오 업로드, 액세스, 공유 및 사용자 활동에 대한 정보가 포함되어 있습니다. 조직이 비디오 콘텐츠를 추적하고 보호하는 데 도움이 됩니다.

[`Audit.MicrosoftTeams`][10]
: 공동 작업 및 커뮤니케이션 플랫폼인 Microsoft Teams에서 생성된 로그입니다. Teams 로그에는 사용자 활동, 팀 및 채널 관리, 파일 공유 및 모임 이벤트 에 대한 정보가 포함됩니다. 조직의 모니터링 사용자 상호 작용을 지원하고 안전한 협업을 보장합니다.

[`Audit.OneDrive`][11]
: Microsoft의 클라우드 기반 파일 저장소 및 동기화 서비스인 OneDrive에서 생성된 로그를 가리킵니다. OneDrive 로그에는 파일 액세스, 공유, 수정 및 사용자 활동에 대한 정보가 포함되어 있습니다. 조직이 클라우드 기반 데이터를 모니터링하고 클라우드 기반 데이터를 보호하는 데 도움이 됩니다.

[`Audit.PowerBI`][12]
: Microsoft의 비즈니스 분석 및 데이터 시각화 도구인 Power BI에서 제작한 로그입니다. Power BI 로그에는 데이터 액세스, 보고서 생성, 대시보드 활동 및 사용자 상호 작용에 대한 정보가 포함되어 있습니다. 조직이 비즈니스 인텔리전스 데이터를 모니터링하고 비즈니스 인텔리전스 데이터를 보호할 수 있도록 돕습니다.

[`Audit.Project`][13]
: Microsoft 365 스위트(suite) 내의 프로젝트 관리 도구인 Microsoft Project에 대한 감사 로그입니다. 이러한 로그는 프로젝트 생성, 작업 업데이트, 리소스 할당 및 권한 변경과 같은 Microsoft Project 내의 사용자 활동, 관리 작업 및 시스템 이벤트 과 관련된 이벤트를 캡처합니다.

[`Audit.SharePoint`][14]
: Microsoft SharePoint에서 생성된 로그입니다. SharePoint 로그는 사용자 액세스, 문서 수정, 사이트 관리 및 보안 관련 이벤트를 기록합니다. 이를 통해 조직은 데이터 무결성을 유지하고 SharePoint 사이트와 콘텐츠를 보호할 수 있습니다.

[`Audit.SkypeForBusiness`][15]
: 비즈니스용 Skype 활동에 대한 감사 로그입니다. 이러한 로그는 통화 세부 기록, 회의 세부 기록, 메시지 활동, 사용자 관리 및 정책 업데이트 등의 관리 작업을 비롯해 비즈니스용 Skype 서비스 사용자 및 관리 작업과 관련된 이벤트를 캡처합니다.

[`Audit.Yammer`][16]
: 기업용 소셜 네트워킹 플랫폼인 Yammer에서 생성된 로그입니다. Yammer 로그에는 사용자 활동, 그룹 및 커뮤니티 관리, 콘텐츠 공유에 대한 정보가 포함되어 있습니다. 조직에이 내부 소셜 네트워크 모니터링하고 보호하는 데 도움이 됩니다.

[`ComplianceManager`][17]
: 조직이 Microsoft 365에서 규정 준수 활동을 평가, 관리 및 추적하는 데 도움이 되는 Microsoft 규정 준수 관리자 도구입니다. 로그에는 규정 준수 평가, 작업, 개선 조치 및 규정 요구 사항 충족을 위한 진행 상황에 대한 정보가 포함되어 있습니다.

`DLP.All`
: Exchange, SharePoint, OneDrive, Microsoft Teams 등을 포함한 모든 Microsoft 365 서비스에서 DLP 정책, 탐지 및 조치와 관련된 이벤트를 캡처합니다. 로그 정책 위반, 민감한 정보 탐지, 콘텐츠 차단, 사용자 또는 관리자에게 알림 등 데이터 보호를 위해 취한 조치에 대한 인사이트를 제공합니다.

`Dynamics365`
: [Microsoft Dynamics 365][18] 서비스 및 애플리케이션에서 이벤트를 수집합니다.

[`MicrosoftFlow`][19]
: 사용자가 다양한 애플리케이션 간에 자동화된 워크플로를 만들고 관리할 수 있는 클라우드 기반 플랫폼인 Microsoft Power Automate 서비스(이전 명칭: Microsoft Flow)와 관련되어 있습니다. 해당 로그는 워크플로 실행, 오류 및 플로우 생성, 업데이트 또는 삭제와 같은 관리 작업과 관련된 이벤트를 캡처합니다.

[`Mip`][20]
: 민감한 데이터를 분류, 레이블 지정 및 보호하기 위한 도구 스위트이자 서비스인 Microsoft 정보 보호(MIP)에서 생성된 로그입니다. MIP 로그는 데이터 분류, 액세스 및 보호 이벤트에 대한 인사이트를 제공합니다. 이를 통해 조직은 민감한 정보를 관리하고 보호할 수 있습니다.

[`MyAnalytics`][21]
: Microsoft 365 내에서 개인의 업무 습관 및 생산성 동향에 대한 인사이트를 제공하는 Microsoft MyAnalytics 서비스와 관련된 스위트(suite)입니다. 해당 로그에는 회의, 전자 메일, 공동 작업, 집중 시간 등 사용자의 활동에 대한 정보가 포함되어 있습니다.

[`PowerApps`][22]
: Microsoft의 로우-코드 애플리케이션 개발 플랫폼인 Power Apps에서 생성된 로그입니다. Power Apps 로그에는 앱 생성, 액세스, 사용 및 사용자 활동에 대한 정보가 포함되어 있습니다.

[`Quarantine`][23]
: 잠재적으로 악의적이거나 원치 않는 이메일을 격리하고 검토하는 데 사용되는 이메일 격리 시스템에서 생성된 로그입니다. Quarantine 로그는 격리된 이메일, 발신자 및 수신자 세부 정보, 취해진 조치에 대한 정보를 포함합니다. 조직에서 이메일 보안을 관리하고 위협을 방지하는 데 도움이 됩니다.

[`Rdl`][24]
: 사용자가 다양한 형식의 보고서를 작성, 게시 및 관리할 수 있는 서버 기반 보고 플랫폼인 SQL 서버 보고 서비스 (SSRS)와 관련된 로그입니다. Rdl 로그 소스는 보고서 실행, 액세스 및 보고서 생성, 업데이트 또는 삭제와 같은 관리 작업과 관련된 이벤트를 캡처합니다.

[`SecurityComplianceCenter`][25]
: Microsoft 365 서비스에서 보안 및 규정 준수 기능을 관리하기 위한 중앙 집중식 플랫폼인 Microsoft의 Security & Compliance Center에서 생성한 로그입니다. 로그는 보안 인시던트, 정책 위반 및 규정 준수 관리 활동에 대한 인사이트를 제공합니다. 이를 통해 조직은 안전하고 규정에 부합하는 IT 환경 를 유지할 수 있습니다.

[`SecurityMonitoringEntityReducer`][26]
: 보안 이벤트 및 Microsoft 365의 경고 집계 활동에 대한 로그입니다. 로그는 보안 이벤트 및 이상 징후 등 Microsoft 365환경에서 탐지된 잠재적 위협에 대한 인사이트를 제공합니다.

[`ThreatIntelligence`][27]
: 새로운 보안 위협에 대한 정보를 수집, 분석 및 공유하는 위협 인텔리전스 시스템 또는 도구에서 생성된 로그입니다. Threat intelligence 로그는 잠재적 위협, 취약성 및 침해 지표에 대한 인사이트를 제공합니다. 이를 통해 조직은 사이버 공격을 선제적으로 방어할 수 있습니다.

</details>

잠재적 로그 출처에 대한 전체 목록을 보려면 [Office 365 관리 API 스키마][3]를 참조하세요.

### 보안

Datadog의 [클라우드 보안 정보와 이벤트 관리(SIEM)][28]를 사용하면 Microsoft 365 감사 로그를 통해 환경에 존재하는 실시간 위협을 탐지할 수 있습니다. [기본 제공 Microsoft 365 탐지 규칙][29] 또는 [커스텀 탐지 규칙 생성][30] 전체 목록을 참조하세요.

{{< img src="integrations/microsoft_365/microsoft_365_rules.png" alt="검색 바에 입력된 Microsoft 365, Cloud SIEM 선택된 기본 제공 보안 규칙 페이지" style="width:80;" popup="true">}}

### 메트릭

Microsoft 365 통합에서는 메트릭을 수집하지 않습니다.

### 서비스 검사

Microsoft 365 통합에서는 서비스 점검을 수집하지 않습니다.

## 트러블슈팅

Datadog 로그 수집은 지난 18시간 동안만의 과거 데이터 이벤트를 지원합니다. 이전 타임스탬프의 로그 이벤트는 폐기됩니다.

Datadog는 GCC 정부, GCC High 정부 또는 DoD 테넌트를 지원하지 않습니다. 해당 요소들은 서로 다른 Microsoft 엔드포인트를 필요로 합니다.

도움이 필요하세요? [Datadog 지원팀][31]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/microsoft-365
[2]: https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#turn-on-audit-log-search
[3]: https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema#office-365-management-api-schemas
[4]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAirInvestigation%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[5]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AAzureActiveDirectory%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[6]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AExchange%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[7]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[8]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftForms%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[9]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftStream%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[10]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftTeams%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[11]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AOneDrive%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[12]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerBI%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[13]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AProject%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[14]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASharePoint%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[15]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASkypeForBusiness%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[16]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AYammer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[17]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AComplianceManager%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[18]: https://learn.microsoft.com/dynamics365/
[19]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMicrosoftFlow%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[20]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMip%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[21]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AMyAnalytics%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[22]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3APowerApps%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[23]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AQuarantine%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[24]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ARdl%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[25]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityComplianceCenter%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[26]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3ASecurityMonitoringEntityReducer%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[27]: https://app.datadoghq.com/logs?query=source%3Amicrosoft-365%20service%3AThreatIntelligence%20&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=desc&viz=stream&live=true
[28]: https://docs.datadoghq.com/ko/security/#cloud-siem
[29]: https://docs.datadoghq.com/ko/security/default_rules/?category=cat-cloud-siem-log-detection&search=microsoft+365
[30]: https://docs.datadoghq.com/ko/security/detection_rules/#create-detection-rules
[31]: https://docs.datadoghq.com/ko/help/