---
app_id: ilert
app_uuid: 12731389-915a-4fb7-baec-3319f87dfc7f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: ilert.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10154
    source_type_name: iLert
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: ilert
  sales_email: support@ilert.com
  support_email: support@ilert.com
categories:
- 경고
- 협업
- 인시던트
- 문제 추적
- 알림
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ilert/README.md
display_on_public_website: true
draft: false
git_integration_title: ilert
integration_id: ilert
integration_title: ilert
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ilert
public_title: ilert
short_description: Datadog 알림 받고 ilert로 조치하기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Collaboration
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog 알림 받고 ilert로 조치하기
  media:
  - caption: ilert 알림 목록
    image_url: images/ilert-alert-list.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ilert
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

[ilert][1] 통합을 이용하면 Datadog 알림을 ilert으로 전송해 ilert 플랫폼 내에서 원활하게 작업할 수 있습니다.
ilert은 팀에서 인시던트 주기의 모든 단계를 관리할 수 있는 인시던트 관리 플랫폼입니다. ilert에서는 신뢰할 수 있고 작업할 수 있는 알림, 콜 라우팅, 유연성 있는 온콜 일정 설정, 상태 페이지, 다양한 ChatOps 기능, 인시던트 소통 AI 지원, 사후 생성 등의 기능을 제공합니다. DevOps 팀은 ilert을 사용해 가동 시간을 늘리고 인시던트 대응 시간을 빠르게 할 수 있습니다.

ilert 통합으로 다음을 할 수 있습니다.

- Datadog에서 인시던트 트리거 및 해결
- 인시던트가 생기는 즉시 조치를 취하고 에스컬레이션 정책 설정
- 온콜 담당 매일 알림 설정

## 설정

### ilert

#### Datadog 알림 소스 생성

1. **Alert Sources** 탭으로 전환해 "Create new alert source" 버튼을 클릭하세요.

2. "**Datadog**"을 검색하고 **Datadog** 타이틀을 선택한 후 Next를 클릭하세요.

   ![ilert Alert Source New][2]

3. 이름을 지정하세요.

   ![ilert Alert Source New 2][3]

4. 원하는 에스컬레이션 정책을 선택하세요.

   ![ilert Alert Source New 3][4]

5. 다음 페이지에 **Webhook URL**이 생성됩니다. Datadog 내에 통합을 설정하려면 이 URL이 필요합니다.

   ![ilert Alert Source View][5]

### Datadog

#### ilert Webhook을 알림 채널로 추가

1. Datadog 통합 페이지에서 [**Webhooks 통합을 설치**][6]하세요.
2. Webhook 통합 타이틀에 다음 새 웹훅을 추가하세요.

   ![Datadog Webhook New][7]

3. 이름, **template payload**, 이전에 ilert 알림 소스에서 생성한 **Datadog webhook URL**을 입력하세요.

   ```json
   {
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "alert_transition": "$ALERT_TRANSITION",
     "alert_id": "$ALERT_ID",
     "link": "$LINK",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
       "id": "$ORG_ID",
       "name": "$ORG_NAME"
     },
     "id": "$ID"
   }
   ```

   ![Datadog Webhook View][8]

4. Save를 클릭하세요.

## 수집한 데이터

### 메트릭

ilert 통합은 메트릭을 포함하지 않습니다.

### 이벤트

ilert에서 트리거되고 해결된 이벤트가 ilert 플랫폼 대시보드에 나타납니다.

### 서비스 점검

ilert 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://www.ilert.com/?utm_medium=organic&utm_source=integration&utm_campaign=datadog
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-3.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-view.png
[6]: https://app.datadoghq.com/integrations/webhooks
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-new.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-view.png
[9]: https://docs.datadoghq.com/ko/help/