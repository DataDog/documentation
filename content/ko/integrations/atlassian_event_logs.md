---
app_id: atlassian-event-logs
app_uuid: b2294505-ae3d-44d3-bbf2-174032e95be3
assets:
  dashboards:
    atlassian-event-logs: assets/dashboards/atlassian_organization_audit_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19256538
    source_type_name: Atlassian Event Logs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: atlassian_event_logs
integration_id: atlassian-event-logs
integration_title: Atlassian Organization Audit Logs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: atlassian_event_logs
public_title: Atlassian Organization Audit Logs
short_description: 조직에서 구독하는 Atlassian Guard로 관리자 활동을 모니터링하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 조직에서 구독하는 Atlassian Guard로 관리자 활동을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Atlassian Organization Audit Logs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

Atlassian [Organization Audit Logs][1]는 조직의 그룹 구성 및 제품 액세스의 관리자 변경 사항을 추적합니다. 이 통합을 사용하면 Jira 및 Confluence에 그치지 않고 모든 Atlassian 제품에 관한 관리자 이벤트를 손십게 확인할 수 있습니다. 이러한 관리 작업과 함께 당사는 **Jira & Confluence 감사 레코드** 통합을 설치하여 더욱 세부적인 제품별 사용자 이벤트를 살펴볼 것을 권장합니다.

이 통합은 또한 즉시 사용 가능한 로그 파이프라인을 사용해 [Cloud SIEM][2] 탐지 규칙을 설정하는 데도 사용할 수 이습니다.

또한 다음이 가능합니다.
- Atlassian 제품의 데이터 보관 기간을 관리합니다.
- 커스텀 위젯 및 대시보드를 생성합니다.
- 특정 작업을 트리거하는 탐지 규칙을 설정합니다.
- 다른 서비스의 데이터를 통해 Atlassian 제품 이벤트를 교차 참조합니다.

로그는 Atlassian의 [감사 로그 API][1]를 통해 수집되며 레코드는 다음 정보를 포함합니다.

- **Group Management**: 그룹 생성, 삭제 및 사용자 목록 수정
- **Group Access Configuration**: 그룹에 대한 제품 및 관리 액세스 변경 사항, 여기에는 액세스 역할 허가 및 취소가 포함됩니다.
- **Product Access Configuration**: 제품 또는 사이트 액세스에 대한 초대 설정 및 허용된 사용자 변경, 여기에는 타사 계정 초대 및 API 토큰 생성 또는 취소가 포함됩니다.

이 로그의 속성에 관한 보다 상세한 내용은 Atlassian의 [감사 로그를 통한 조직 활동 추적][3] 설명서를 참고하세요. [Atlassian Guard Premium 티어][4]를 사용하는 조직의 경우, 사용자 생성 콘텐츠와 분류 활동을 추적하는 추가 감사 로그 이벤트가 생성될 수 있습니다.

`source:atlassian-event-logs`를 검색하여 Datadog의 [로그 관리 제품][5]에서 Atlassian Organization Audit Logs를 확인합니다.


## 설정

1. Atlassian Organization Audit Logs 타일의 **Configure** 탭에서 **Add New** 버튼을 클릭하세요.
2. Atlassian Organization Audit Logs 타일의 안내에 따라 **Atlassian Organization ID**와 **API Bearer Token**을 사용해 인증하세요.

### 검증

Datadog의 로그 탐색기에서 `source:atlassian-event-logs` 쿼리를 사용해 로그를 검색하세요. 통합이 올바르게 설치되고 인증되었다면, 잠시 후 로그가 표시됩니다.

## 수집한 데이터

### 메트릭

Atlassian Organization Audit Logs는 메트릭을 포함하지 않습니다.

### 서비스 점검

Atlassian Organization Audit Logs는 서비스 점검을 포함하지 않습니다.

### 이벤트

Atlassian Organization Audit Logs는 이벤트를 포함하지 않습니다.

### 로그

Atlassian Organization Audit Logs는 감사 로그를 수집합니다.

## 트러블슈팅
#### 속도 한도
관리자 활동이 많은 조직은 API 속도 제한에 도달할 수 있습니다. 현재 제한값은 Atlassian의 [감사 로그 속도 제한][6] 설명서를 참고하세요. 로그 수집 속도가 최대 한계치에 가까운 경우, 일부 로그가 누락되는 원인이 될 수 있습니다.


도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-v1-orgs-orgid-events-get
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/
[4]: https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/#:~:text=Atlassian%20Guard%20Standard-,Atlassian%20Guard%20Premium,-Cloud%20Enterprise
[5]: https://docs.datadoghq.com/ko/logs/
[6]: https://developer.atlassian.com/cloud/admin/organization/rest/intro/#rate%20limits
[7]: https://docs.datadoghq.com/ko/help/