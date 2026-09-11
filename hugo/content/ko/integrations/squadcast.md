---
app_id: squadcast
app_uuid: cfa65726-33af-42bf-8be3-7abb43147a47
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: squadcast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10090
    source_type_name: Squadcast
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Squadcast
  sales_email: it@squadcast.com
  support_email: it@squadcast.com
categories:
- 경고
- 협업
- 인시던트
- 문제 추적
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/squadcast/README.md
display_on_public_website: true
draft: false
git_integration_title: squadcast
integration_id: squadcast
integration_title: Squadcast
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: squadcast
public_title: Squadcast
short_description: Squadcast를 사용하여 Datadog 알림을 받아보고, 필요한 조치를 취하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Collaboration
  - Category::Incidents
  - 카테고리::이슈 추적
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Squadcast를 사용하여 Datadog 알림을 받아보고, 필요한 조치를 취하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Squadcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Datadog-Squadcast 통합을 사용하여 Datadog 알림이나 인시던트를 Squadcast로 전송하고, Squadcast 내에서 원활하게 조치를 취하세요.

Datadog에 Squadcast를 연결하면 다음을 수행할 수 있습니다.
- Datadog에서 알림이나 인시던트를 트리거, 라우팅, 해결할 수 있습니다.
- 알림이나 인시던트가 발생할 때 이를 처리하고, 에스컬레이션 정책을 설정하세요.
- 온콜 일정을 정의하고, 현재 온콜 담당자가 누구인지에 대한 사용자 지정 알림을 설정하세요.

## 설정

**참고**: 올바른 팀 수준 권한을 가진 Squadcast 사용자만 Squadcast에서 서비스를 구성할 수 있습니다. 서비스를 추가하기 전에 최소한 하나의 에스컬레이션 정책이 반드시 구성되어 있어야 합니다.

### Squadcast

Squadcast에서 다음 단계를 따르세요.

1. 상단의 팀 선택기(team-picker)에서 **Team**을 선택하세요.

2. 왼쪽 기본 탐색 표시줄에서 **Services** 페이지를 엽니다.

3. **서비스 추가**를 클릭하여 기존 서비스를 선택하거나 새 서비스를 생성합니다.

4. **알림 소스**를 클릭하여 드롭다운에서 **Datadog**가 선택합니다.

5. 표시된 **Datadog Webhook URL**을 복사하여 **Done**을 클릭합니다.

### Datadog

Datadog에서 다음 단계를 따르세요.

1. 사이드바에서 **Integrations** 페이지를 엽니다.

2. 검색 창을 사용하여 **webhooks**를 검색합니다.

3. **Webhooks** 타일이 표시되면 **Install** 위를 마우스로 가리킨 다음 클릭합니다.

4. **Configuration** 탭으로 이동한 후, 페이지 하단까지 스크롤합니다.

5. (a) **Name** 필드에 Webhook의 이름을 지정합니다.

   (b) Squadcast에서 제공한 **Datadog Webhook URL**을 **URL** 필드에 붙여넣습니다.

   (c) 아래 **Payload** 섹션의 텍스트 박스에 다음 JSON을 복사하여 붙여넣습니다.

![Squadcast Webhook][1]

```json
    {
       "alertId": "$ALERT_ID",
       "eventMessage": "$TEXT_ONLY_MSG",
       "title": "$EVENT_TITLE",
       "url": "$LINK",
       "alertTransition": "$ALERT_TRANSITION",
       "hostname": "$HOSTNAME",
       "orgName":"$ORG_NAME",
       "priority":"$PRIORITY",
       "snapshot": "$SNAPSHOT",
       "alertQuery": "$ALERT_QUERY",
       "alertScope": "$ALERT_SCOPE",
       "alertStatus": "$ALERT_STATUS",
       "eventType": "$EVENT_TYPE",
       "event_id": "$ID",
       "alert_metric": "$ALERT_METRIC",
       "alert_priority": "$ALERT_PRIORITY",
       "alert_title": "$ALERT_TITLE",
       "alert_type" : "$ALERT_TYPE",
       "event_msg" : "$EVENT_MSG",
       "incident_pub_id" : "$INCIDENT_PUBLIC_ID",
       "incident_title" : "$INCIDENT_TITLE",
       "incident_url" : "$INCIDENT_URL",
       "incident_msg" : "$INCIDENT_MSG",
       "security_rule_id" : "$SECURITY_RULE_ID",
       "security_rule_name" : "$SECURITY_RULE_NAME",
       "security_signal_severity" : "$SECURITY_SIGNAL_SEVERITY",
       "security_signal_title" : "$SECURITY_SIGNAL_TITLE",
       "security_signal_msg" : "$SECURITY_SIGNAL_MSG",
       "security_rule_query" : "$SECURITY_RULE_QUERY",
       "security_rule_type" : "$SECURITY_RULE_TYPE",
       "tags" : "$TAGS"
   }
```

6. **Save**를 클릭하여 서비스 통합을 완료합니다.

    자세한 정보는 [Squadcast 설명서][2]를 참조하세요.

**참고**: Squadcast용 Webhook을 구성한 후, Datadog 모니터의 **Notify your team** 설정에서 동일한 Webhook을 채널로 선택하세요.

## 수집한 데이터
### 메트릭

Squadcast 통합은 어떠한 메트릭도 포함하지 않습니다.

### 이벤트

트리거된 이벤트와 해결된 이벤트가 Squadcast 플랫폼의 대시보드에 표시됩니다.

### 서비스 점검

Squadcast 통합은 어떠한 서비스 점검을 포함하지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/squadcast/images/datadog-webhook.png
[2]: https://support.squadcast.com/docs/datadog
[3]: https://docs.datadoghq.com/ko/help/