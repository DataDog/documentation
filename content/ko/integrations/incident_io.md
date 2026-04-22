---
app_id: incident-io
app_uuid: 95ee2e88-d2ee-45f8-a4d6-2cb9eced79ee
assets:
  dashboards:
    incident.io - Incidents Overview: assets/dashboards/incident-io_incidents_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25431122
    source_type_name: incident.io
  logs:
    source: incident-io
  monitors:
    Critical public incident: assets/monitors/critical_public_incident.json
    High number of public incidents: assets/monitors/high_number_of_public_incidents.json
    Public incident reopened: assets/monitors/public_incident_reopened.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 인시던트
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/incident_io/README.md
display_on_public_website: true
draft: false
git_integration_title: incident_io
integration_id: incident-io
integration_title: incident.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: incident_io
public_title: incident.io
short_description: incident.io에서 인시던트 활동에 관한 인사이트를 얻으세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Incidents
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: incident.io에서 인시던트 활동에 관한 인사이트를 얻으세요.
  media:
  - caption: incident.io - Incidents Overview 1
    image_url: images/incident-io_incidents_overview_1.png
    media_type: 이미지
  - caption: incident.io - Incidents Overview 2
    image_url: images/incident-io_incidents_overview_2.png
    media_type: 이미지
  - caption: incident.io - Incidents Overview 3
    image_url: images/incident-io_incidents_overview_3.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: incident.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[incident.io][1]는 핵심 인프라 장애부터 데이터 유출 및 보안 사고에 이르기까지, 정상적인 비즈니스 운영을 방해하는 이벤트에 관해 기업이 공지하고, 협업하고, 소통하며, 이를 통해 학습할 수 있도록 지원합니다. 이 서비스는 팀이 인시던트와 장애를 효과적으로 관리할 수 있도록 지원하며, 일반적으로 인시던트 보고, 추적, 해결 워크플로우와 같은 기능을 제공합니다.

Datadog과 incident.io 계정을 통합하면 인시던트 관련 활동에 관한 인사이트를 얻을 수 있습니다.

## 설정

아래 안내를 따라 Webhook을 통해 incident.io 인시던트 이벤트 통합을 구성하세요.

### 설정

#### Webhook 구성
Datadog 엔드포인트를 구성하여 incident.io 인시던트의 이벤트를 Datadog에 로그로 전달합니다. 자세한 내용은 incident.io [웹훅][2] 설명서를 참고하세요.

1. 기존 API 키를 선택하거나 아래 버튼 중 하나를 클릭하여 새 키를 만드세요. <!-- Datadog 팀에서 추가할 UI Component -->
2. 조직 소유자로 [incident.io 계정][3]에 로그인합니다.
3. **Settings > Webhooks**로 이동합니다.
4. **Add Endpoint**를 클릭합니다.
5. 1단계에서 생성한 웹훅 URL을 입력합니다.
6. **Subscribe to events** 섹션에서 Datadog에 푸시하려는 인시던트 이벤트 유형을 선택합니다.
7. **생성**을 클릭합니다.

## 수집한 데이터

### 로그
incident.io 통합은 다음 로그를 수집합니다.
- 공개된 인시던트 이벤트 로그
- 비공개 인시던트 이벤트 로그
- 작업 및 후속 조치 이벤트 로그

### 메트릭

incident.io는 메트릭을 포함하지 않습니다.

### 서비스 점검

incident.io는 서비스 점검을 포함하지 않습니다.

### 이벤트

incident.io는 이벤트를 포함하지 않습니다.

## 지원

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://incident.io/
[2]: https://api-docs.incident.io/tag/Webhooks/
[3]: https://app.incident.io/
[4]: https://docs.datadoghq.com/ko/help/