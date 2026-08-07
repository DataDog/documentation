---
app_id: confluent-cloud-audit-logs
app_uuid: c74afba8-201e-4ea4-9cd1-5607fb908949
assets:
  dashboards:
    Confluent-Cloud-Audit-Logs-Overview: assets/dashboards/confluent-cloud-audit-logs-overview-dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: true
    source_type_id: 21251477
    source_type_name: Confluent Cloud Audit Log
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- 로그 수집
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: confluent_cloud_audit_logs
integration_id: confluent-cloud-audit-logs
integration_title: Confluent Cloud Audit Log
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: confluent_cloud_audit_logs
public_title: Confluent Cloud Audit Log
short_description: Confluent Cloud 리소스의 감사 로그를 수집합니다.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Confluent Cloud 리소스에 대한 감사 로그를 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Confluent Cloud Audit Logs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요
이 통합을 통해 [Confluent Cloud Audit Log][1]를 수집하여 Confluent 계정 내의 활동을 캡처합니다.

이를 통해 다음 작업을 수행할 수 있습니다.

- Confluent Cloud 리소스에 대한 액세스를 추적 및 속성 부여합니다.
- 비정상적이거나 의심스러운 활동을 식별합니다.
- 보안 위험을 선제적으로 모니터링하고 해결합니다.

Datadog Confluent Cloud Audit Log 통합은 Confluent Cloud 감사 로그 토픽에서 이벤트를 수집하여 Datadog에 로그로써 수집합니다. 모든 감사 로그 이벤트 유형의 전체 보기는 [Confluent Cloud 감사 가능 이벤트 메서드 스키마][2]를 참조하세요.

Datadog의 [Logs Management 제품][3]에서 Confluent Cloud Audit Log를 보려면 `source:confluent-cloud-audit-logs`을 검색합니다.

## 설정

### 설치

[Confluent 감사 로그 설정 지침][4]을 참조하세요. 본 지침에서는 Java 코드 스니펫을 제공하지만 타일 구성에 필요한 값만 복사합니다.

1. Confluent CLI를 사용하여 감사 로그 클러스터용 API 키 및 API 시크릿 쌍을 생성합니다. 감사 로그를 수집하려면 [OrganizationAdmin][5] 권한이 필요하다는 점에 유의하세요.
2. `bootstrap.servers` 문자열을 복사합니다.
3. [통합 타일][6]에 API 키, API 토큰, `bootstrap.servers` 문자열을 입력합니다.
4. "Save"를 클릭합니다.

Confluent Cloud 감사 로그는 5분 내에 자동으로 수집을 시작해야 합니다.


## 수집한 데이터

### 메트릭

Confluent Cloud Audit Log는 메트릭을 포함하지 않습니다.

### 서비스 점검

Confluent Cloud Audit Log는 서비스 점검을 포함하지 않습니다.

### 로그

Confluent Cloud Audit Log는 Confluent Cloud의 [confluent-audit-log-events][2] 토픽에서 데이터를 수집합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/cloud-audit-log-concepts.html
[2]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/event-methods/index.html
[3]: https://docs.datadoghq.com/ko/logs/
[4]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/configure.html#consume-with-java
[5]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#organizationadmin-role
[6]: https://app.datadoghq.com/integrations/cloudflare
[7]: https://docs.datadoghq.com/ko/help/