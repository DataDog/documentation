---
app_id: atlassian-audit-records
app_uuid: 05aefffe-837f-414d-a550-b43ed99d24c2
assets:
  dashboards:
    confluence-audit-records: assets/dashboards/confluence_audit_records_overview.json
    jira-audit-records: assets/dashboards/jira_audit_records_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10390
    source_type_name: Atlassian 감사 기록
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: atlassian_audit_records
integration_id: atlassian-audit-records
integration_title: Jira 및 Confluence 감사 기록
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: atlassian_audit_records
public_title: Jira 및 Confluence 감사 기록
short_description: Atlassian의 Jira 및 Confluence 환경을 모니터링 및 보호하고 최적화하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::로그 수집
  - 카테고리::보안
  - 제출한 데이터 유형::로그
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Atlassian의 Jira 및 Confluence 환경을 모니터링 및 보호하고 최적화하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jira 및 Confluence 감사 기록
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요


Atlassian의 [Jira][1] 및 [Confluence][2] 감사 기록은 사용자 관리, 프로젝트 및 스페이스 구성, 시스템 설정 및 인증 이벤트 전반의 중요 활동에 관한 포괄적인 기록을 제공합니다. 이러한 제품별 사용자 이벤트 외에도 Atlassian 조직 제품 전체에 관한 이벤트를 완벽하게 파악하려면 **Atlassian 조직 감사 로그** 통합을 설치하는 것이 좋습니다.

이 통합을 통해 이러한 감사 로그를 Datadog로 가져온 다음 [Cloud SIEM][3]을 사용해 위험을 관리하고, 운영 동향을 파악하고, Atlassian 환경을 더욱 효과적으로 보호할 수 있습니다.
- Jira 및 Confluence 데이터 유지를 관리하세요.
- 커스텀 위젯 및 대시보드를 생성합니다.
- 특정 작업을 트리거하는 탐지 규칙을 설정합니다.
- 다른 서비스의 데이터와 Jira 및 Confluence 이벤트를 상호 참조하세요.

이러한 로그는 다음과 관련된 정보를 포함합니다.
- **사용자 관리**: 사용자 계정의 생성, 삭제 및 수정. 여기에는 비밀번호 변경, 그룹 멤버십 변경, 사용자 권한 변경 등이 포함됩니다.
- **프로젝트 구성**: 프로젝트 역할, 워크플로, 이슈 유형 및 프로젝트 권한 변경을 포함하여 프로젝트의 생성, 삭제, 업데이트를 실행할 수 있습니다.
- **공간 및 페이지 활동**: 공간 및 페이지의 생성, 삭제, 업데이트를 실행할 수 있습니다. 이러한 작업에는 공간 권한 변경, 페이지 수정, 이동이 포함될 수 있습니다.
- **시스템 구성**: 일반 구성, 전역 권한, 애플리케이션 링크 및 애드온 설정과 같은 Jira 및 Confluence 설정에 관한 변경 사항입니다.
- **인증 및 권한 부여**: 로그인 시도(성공 및 실패), 로그아웃 이벤트, 액세스 제어 목록의 변경 사항을 포함합니다.

Jira 및 Confluence 로그를 파싱한 후 Datadog 보안 관련 이벤트의 인사이트로 Jira 감사 기록 및 Confluence 감사 기록 대시보드를 채웁니다. 위젯에는 가장 빈번한 이벤트와 빈번하지 않은 이벤트를 보여주는 상위 목록과 로그인 시도의 시작 국가를 보여주는 지리적 위치 맵이 포함됩니다.

Datadog [로그 관리 제품][4]에서 Jira 감사 기록을 보려면 `source:jira-audit-records`를 검색하세요.
Datadog [로그 관리 제품][4]에서 Confluence 감사 기록을 보려면 `source:confluence-audit-records`를 검색하세요.

## 설정

1. Atlassian 감사 기록 타일의 **Configure** 탭에서 **Add Atlassian Account** 버튼을 클릭합니다.
2. Atlassian 감사 기록 타일의 지침에 따라 Atlassian 관리자 계정으로 OAuth를 사용하여 통합을 인증합니다. 

### 설치


## 수집한 데이터

### 메트릭

Atlassian 감사 기록에는 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

Atlassian 감사 기록에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Atlassian 감사 기록에는 이벤트가 포함되지 않습니다.

### 로그

Datadog의 Atlassian 감사 기록 통합은 사용자 활동과 관련된 로그를 생성하여 인사이트를 얻을 수 있는 [Jira의 감사 기록 API][1], [Confluence의 감사 기록 API][2] 또는 둘 다를 사용하여 로그를 수집합니다.

- Jira, Confluence 또는 둘 다에서 요청을 하는 사용자
- 어떤 유형의 요청인지
- 총 요청 횟수

각 로그에 포함된 속성에 관한 자세한 내용은 [Confluence 감사 기록 API 문서의 응답 섹션][2] 또는 [Jira 감사 기록 API 문서의 응답 섹션][1]을 참조하세요. 위에 링크된 문서에서 이러한 범주를 보려면 다음 단계를 따르세요.
1. **AuditRecords Container** 아래에 있는 **Response** 섹션의 
감사 레코드 목록에서 **Show child properties** 버튼을 클릭합니다. API 응답의 하위 속성 목록이 나타납니다.
2. **Records** 옆의 화살표를 클릭합니다.
3. 표시되는 **Show child properties** 버튼을 클릭합니다.
4. 각 로그에 포함된 다른 하위 속성 목록이 나타납니다. 그런 다음 각 로그 키 옆에 있는 드롭다운을 클릭하여 자세히 알아볼 수 있습니다.  

## 트러블슈팅

#### 승인을 클릭하면 Atlassian에서 오류 메시지가 표시됩니다.

계정에 액세스 권한이 없는 로그 유형을 선택하면 다음과 같은 메시지와 함께 Atlassian에서 오류 화면이 표시될 수 있습니다.

```
Something went wrong 
Close this page and try again, or raise a support request.
```

이러한 경우 Datadog Atlassian 타일로 다시 이동합니다. 그런 다음 계정이 액세스할 수 있는 로그 유형을 선택하고 계정을 다시 승인합니다.


#### 계정을 인증했지만 일부 환경의 로그가 표시되지 않습니다. 
현재는 각 사이트에서 개별적으로 인증해야 합니다. 예를 들어 여러 사이트의 관리자인 경우 각 사이트에 개별적으로 인증해야 하며, 이는 [Atlassian의 알려진 문제][5]입니다. 

#### CORS 허용 목록이 지원되나요? 
예, 자세한 내용은 Atlassian Docs의 [이 섹션][6]을 참조하세요.


#### 2024년 7월 2일 이전에 이 통합 기능을 설치했는데 로그가 표시되지 않습니다.
이 연동 기능을 2024년 7월 2일 이전에 설치한 경우 알려진 버그의 영향을 받을 수 있습니다. 이 문제를 해결하려면 통합을 다시 설치해야 할 수 있습니다. 여기에는 현재 계정을 삭제하고 관리자 권한이 있는 계정을 사용하여 다시 인증해야 하며, Confluence, Jira 또는 둘 다에 대한 권한이 있어야 합니다.


도움이 필요하세요?
- [Datadog 지원팀][7]에 문의하세요.
- [개발자 리소스][2]를 통해 Atlassian에 문의하세요.



[1]: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records
[2]: https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://docs.datadoghq.com/ko/logs/
[5]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#known-issues
[6]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#is-cors-whitelisting-supported-
[7]: https://docs.datadoghq.com/ko/help/