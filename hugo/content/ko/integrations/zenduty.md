---
app_id: zenduty
app_uuid: 0f2dea25-5757-477c-ad92-d459133d8b05
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: zenduty.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10305
    source_type_name: Zenduty
author:
  homepage: https://www.zenduty.com
  name: Zenduty
  sales_email: vishwa@zenduty.com
  support_email: shubham@zenduty.com
categories:
- 경고
- 협업
- 인시던트
- 문제 추적
- 알림
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zenduty/README.md
display_on_public_website: true
draft: false
git_integration_title: zenduty
integration_id: zenduty
integration_title: Zenduty
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zenduty
public_title: Zenduty
short_description: Datadog 경고의 인시던트 대응 및 알림 파트너로 Zenduty를 사용하세요
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
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog 경고의 인시던트 대응 및 알림 파트너로 Zenduty를 사용하세요
  media:
  - caption: 상세하면서도 보기 쉬운 인시던트 대시보드
    image_url: images/incident_dashboard.png
    media_type: image
  - caption: Slack 또는 Teams에서 인시던트를 직접 처리하세요
    image_url: images/slack_controls.png
    media_type: image
  - caption: 경고 규칙을 정교하게 다듬어 팀의 인시던트 대응 수준을 끌어올리세요
    image_url: images/alert_rules.png
    media_type: image
  - caption: 인시던트 관리 사이클 전반에 걸쳐 안정적이고 노이즈가 없는 경고 시스템
    image_url: images/incident_timeline.png
    media_type: image
  - caption: 인시던트에 플레이북을 자동으로 적용하고 단계별 가이드를 받으세요
    image_url: images/task_playbooks.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zenduty
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Zenduty 통합을 사용해 Datadog 경고를 적절한 팀에 전송하고, 대기 일정에 따라 알림을 전달하며, 신속하게 사고를 해결하도록 지원하세요. 이메일, Slack, Microsoft Teams, SMS, 전화 통화, Android 및 iOS 푸시 메시지를 통해 알림을 전송할 수 있습니다.

Zenduty를 Datadog에 연결하면 다음과 같은 이점이 있습니다.
- Zenduty 인시던트를 트리거하여 해결하고, 생성된 인시던트에 대한 경고를 받고, Datadog에서 문제를 추적합니다.
- 온콜 일정, 에스컬레이션 정책, 인시던트 플레이북, 사후 분석 및 상세 분석을 배포합니다.
- 경고 규칙을 사용해 특정 사용자 또는 팀과 관련한 Datadog 알림 라우팅을 맞춤 설정하고, 억제 규칙을 작성하며, 메모, 응답자 및 인시던트 작업을 자동으로 추가합니다.

## 설정

### Zenduty
[Zenduty][1]에서 아래 단계를 따르세요.

1. **Teams**로 이동한 후 통합을 추가할 팀을 클릭합니다.

2. **Services**로 이동한 후 새로운 서비스를 만들거나 기존 서비스를 선택합니다.

3. **Integrations**에서 **Add New Integration**으로 이동합니다. 통합에 이름을 지정하고 드롭다운 메뉴에서 **Datadog** 애플리케이션을 선택합니다.

4. 해당 통합에서 **Configure**로 이동한 후 생성된 Datadog 웹훅 URL을 복사합니다.

### Datadog에서 아래 단계를 따르세요.

5. 사이드바에서 **Integrations**로 이동합니다. [이 페이지][2]에서 **Webhooks**를 검색하고 추가 버튼을 클릭합니다.

6. 아래로 스크롤하여 Webhooks 섹션에서 <kbd>**+New**</kbd> 버튼을 클릭합니다. 이름과 Zenduty에서 복사한 웹훅 URL을 입력하고 다음 JSON을 페이로드 상자에 붙여넣습니다.
```json
{
  "alert_id": "$ALERT_ID",
  "hostname": "$HOSTNAME",
  "date_posix": "$DATE_POSIX",
  "aggreg_key": "$AGGREG_KEY",
  "title": "$EVENT_TITLE",
  "alert_status": "$ALERT_STATUS",
  "alert_transition": "$ALERT_TRANSITION",
  "link": "$LINK",
  "event_msg": "$TEXT_ONLY_MSG"
}
```

7. **Save**를 클릭합니다. Datadog Zenduty 통합 설정이 완료되었습니다.

자세한 내용 및 통합 활용법은 [Zenduty 설명서][3]를 참조하세요.

**참고**: Datadog 인시던트가 생성되거나 해결될 때 Zenduty를 통해 알림을 받으려면 Datadog 모니터 설정의 **Notify your team**에서 채널로 `@zenduty`를 멘션합니다.

## 수집한 데이터
### 메트릭

Zenduty 통합은 메트릭을 포함하지 않습니다.

### 이벤트

트리거된 이벤트, 확인된 이벤트, 해결된 이벤트는 Zenduty 대시보드에 표시됩니다.

### 서비스 점검

Zenduty 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][4]에 문의하세요.

[1]: https://www.zenduty.com
[2]: https://app.datadoghq.com/integrations/webhooks?search=webhook
[3]: https://docs.zenduty.com/docs/datadog
[4]: https://docs.datadoghq.com/ko/help/