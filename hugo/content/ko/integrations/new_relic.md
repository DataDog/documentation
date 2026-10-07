---
app_id: new-relic
app_uuid: 82c7d333-a23e-44f9-a6c5-cd22fb541022
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - new_relic.application_summary.apdex_score
      - new_relic.apdex.score
      metadata_path: metadata.csv
      prefix: new_relic.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 54
    source_type_name: New Relic
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
- event management
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: new_relic
integration_id: new-relic
integration_title: New Relic
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: new_relic
public_title: New Relic
short_description: New Relic은 웹 및 모바일 애플리케이션용 모니터링 서비스 애플리케이션입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::알림
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: New Relic은 웹 및 모바일 애플리케이션용 모니터링 서비스 애플리케이션입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: New Relic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

## 개요

<div class="alert alert-warning">New Relic APM 통합은 사용이 중지되었고 기능이 축소되었습니다. APM 메트릭 레이블을 사용할 수 없습니다.</div>

이벤트 스트림에서 New Relic 알림을 보려면 New Relic을 연결하세요.

## 설정

### 이벤트 스트림에서 New Relic

**New Relic**에서 다음 단계를 완료하세요.

1. "Alerts & AI" 탭에서 "Notification Channels"로 이동합니다.
2. "New Notification Channel"을 선택하세요.
3. 채널 유형으로 "Webhook"을 선택하세요.
4. 채널 이름을 "Datadog"으로 지정합니다.
5. 이 기본 URL을 입력합니다.

    ```text
    https://app.datadoghq.com/intake/webhook/newrelic?api_key=<DATADOG_API_KEY>
    ```

6. "Custom Payload"를 클릭해 페이로드가 JSON 형식인지 확인하세요.
**참고:** JSON에서 커스텀 태그를 포함하는 방법에 관한 지침을 보려면 다음 섹션을 참고하세요.
7. "Create Channel"을 클릭합니다.
8. "Alert Policies"를 클릭합니다.
9. Datadog로 알림을 전송하고 싶은 알림 정책을 선택합니다.

### 베타 알림에 커스텀 태그 포함

New Relic의 Beta Alerts 기능에서 "Use Custom Payload" 옵션을 사용해 커스텀 태그를 포함할 수 있습니다. 이를 구성하려면 New Relic 계정으로 이동해 화면 오른쪽 상단 모서리에 있는 'Alerts Beta' 버튼을 클릭하세요. 그리고 '알림 채널' 섹션을 선택해 Datadog에 설정한 Webhook을 찾으세요. 여기에 'Use Custom Payload' 섹션이 있습니다. 이를 선택하면 섹션이 확장되면서 JSON 페이로드가 표시됩니다. "태그" 속성을 추가해 이 페이로드를 수정해야 합니다. 다음은 수정된 페이로드의 예시입니다.

```json
{
    "account_id": "$ACCOUNT_ID",
    "account_name": "$ACCOUNT_NAME",
    "condition_id": "$CONDITION_ID",
    "condition_name": "$CONDITION_NAME",
    "current_state": "$EVENT_STATE",
    "details": "$EVENT_DETAILS",
    "event_type": "$EVENT_TYPE",
    "incident_acknowledge_url": "$INCIDENT_ACKNOWLEDGE_URL",
    "incident_id": "$INCIDENT_ID",
    "incident_url": "$INCIDENT_URL",
    "owner": "$EVENT_OWNER",
    "policy_name": "$POLICY_NAME",
    "policy_url": "$POLICY_URL",
    "runbook_url": "$RUNBOOK_URL",
    "severity": "$SEVERITY",
    "targets": "$TARGETS",
    "timestamp": "$TIMESTAMP",
    "tags": ["application:yourapplication", "host:yourhostname", "sometag"]
}
```

수정을 완료한 후 **Update Channel**을 선택해 변경 사항을 저장합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][1]에 연락하세요.

[1]: https://docs.datadoghq.com/ko/help/