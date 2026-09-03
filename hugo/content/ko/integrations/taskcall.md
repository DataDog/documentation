---
app_id: taskcall
app_uuid: dd54da03-0a8c-4796-aaa6-61eeb04e611b
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://taskcallapp.com
  name: TaskCall
  sales_email: support@taskcallapp.com
  support_email: support@taskcallapp.com
categories:
- 경고
- 협업
- 인시던트
- 문제 추적
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/taskcall/README.md
display_on_public_website: true
draft: false
git_integration_title: taskcall
integration_id: taskcall
integration_title: TaskCall
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: taskcall
public_title: TaskCall
short_description: TaskCall로 Datadog 인시던트를 모니터링하고 중앙에서 관리하기
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
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Queried Data Type::Incidents
  configuration: README.md#Setup
  description: TaskCall로 Datadog 인시던트를 모니터링하고 중앙에서 관리하세요
  media:
  - caption: 인시던트 알림
    image_url: images/incident_notifications.png
    media_type: image
  - caption: 인시던트 세부 정보
    image_url: images/incident_details.png
    media_type: image
  - caption: 영향 가시화 및 상태 대시보드
    image_url: images/impact_visibility_status_dashboard.png
    media_type: image
  - caption: 온콜 관리
    image_url: images/on_call_management.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: TaskCall
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

TaskCall은 대응 프로세스를 자동화하여 시스템 다운타임을 줄이는 실시간 인시던트 대응 시스템입니다. 모니터링 도구로부터 지속적으로 데이터를 수신하여 시스템에 관한 종합적인 정보를 제공합니다. 또 온콜 관리 및 사고 대응 메커니즘을 활용하여 최적의 팀을 구성하고 최대한 빠른 시간 내에 인시던트를 해결합니다.

TaskCall 통합을 사용하면 인시던트를 빠르게 감지하고 대응 프로세스를 간소화하여 운영 전반을 강화할 수 있습니다. 인시던트는 두 플랫폼 간에 양방향으로 동기화됩니다. Datadog 알림을 TaskCall에서 받으면 사용자는 중단 없이 모든 인시던트를 체계적으로 관리할 수 있습니다. 또한 종속성 그래프와 상태 대시보드를 통해 영향을 가시화하여 확인할 수 있습니다. 전반적인 인프라스트럭처 상태를 더 잘 파악함으로써, 인시던트를 보다 효율적으로 해결할 수 있습니다.


## 주요 기능

- Datadog에서 알림을 받으면 즉시 온콜 담당자에게 알림이 전달됩니다.
- 알림이 반복되면 인시던트를 처리하고 있는 온콜 담당자의 작업을 방해하지 않도록 자동으로 음소거됩니다.
- 통합은 양방향으로 이루어집니다. Datadog와 TaskCall 간에 상태와 우선순위가 동기화됩니다.
- 알림 조건이 해제되면 TaskCall에서 인시던트가 자동으로 해결됩니다.
- 이 통합 기능은 모든 TaskCall 구독 플랜에서 사용할 수 있습니다.


## 설정

통합은 TaskCall과 Datadog 모두에서 설정되어야 합니다.

### Datadog에 TaskCall 앱 설치

1. 아직 TaskCall 계정이 없다면 [TaskCall 계정을 만듭니다][1].
2. **Datadog에서**: [TaskCall 통합 타일][2]로 이동합니다.
3. TaskCall 통합 타일에서 **Configure** 탭으로 이동하여 **Connect Accounts**를 클릭합니다. TaskCall로 리디렉션됩니다.
4. **TaskCall에서**: 통합의 **name**을 지정하고 통합을 적용할 **service**를 선택합니다.

![TaskCall 인증][3]

5. **Integrate**를 클릭합니다. Datadog 인증 페이지로 리디렉션됩니다.
6. 통합을 인증하고 작업할 수 있는 올바른 권한이 있는지 확인하세요.
7. 통합을 인증하면 TaskCall로 리디렉션됩니다.
8. **TaskCall에서**: 통합을 위해 발급된 **Integration Url**을 복사합니다. Datadog에서 웹훅을 설정하는 데 필요합니다.

### Datadog에서 웹훅 생성

1. [**Integrations** > **Integrations**][4]로 이동합니다.
2. **Webhooks**를 찾아 클릭합니다.
3. **New Webhook** 버튼을 클릭합니다.
4. 이름을 지정하고 TaskCall에서 복사한 **Integration Url**을 붙여넣습니다.
5. 다음 [JSON 페이로드][5]를 복사하여 Payload 섹션에 붙여넣습니다.
```json
{
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
         "id": "$ORG_ID",
         "name": "$ORG_NAME"
     },
     "id": "$ID",
     "aggreg_key": "$AGGREG_KEY",
     "alert": {
         "cycle_key": "$ALERT_CYCLE_KEY",
         "id": "$ALERT_ID",
         "metric": "$ALERT_METRIC",
         "scope": "$ALERT_SCOPE",
         "status": "$ALERT_STATUS",
         "title": "$ALERT_TITLE",
         "transition": "$ALERT_TRANSITION",
         "type": "$ALERT_TYPE",
         "query": "$ALERT_QUERY"
     },
     "user": "$USER",
     "username": "$USERNAME",
     "priority": "$PRIORITY",
     "text_msg": "$TEXT_ONLY_MSG",
     "snapshot": "$SNAPSHOT",
     "link": "$LINK",
     "hostname": "$HOSTNAME",
     "incident_uuid": "$INCIDENT_UUID",
     "incident_public_id": "$INCIDENT_PUBLIC_ID",
     "incident_title": "$INCIDENT_TITLE",
     "incident_url": "$INCIDENT_URL",
     "incident_msg": "$INCIDENT_MSG",
     "incident_severity": "$INCIDENT_SEVERITY",
     "security_rule_id": "$SECURITY_RULE_ID",
     "security_rule_name": "$SECURITY_RULE_NAME",
     "security_signal_severity": "$SECURITY_SIGNAL_SEVERITY",
     "security_signal_title": "$SECURITY_SIGNAL_TITLE",
     "security_signal_msg": "$SECURITY_SIGNAL_MSG",
     "security_rule_query": "$SECURITY_RULE_QUERY",
     "security_rule_type": "$SECURITY_RULE_TYPE",
     "tags": "$TAGS"
}
```
6. 세부 정보를 입력한 후 Save를 클릭합니다.

자세한 내용은  [TaskCall Datadog 통합 가이드][6]를 참조하세요.

## 삭제

- TaskCall에서 Services > Integrations로 이동한 후 해당 통합을 삭제합니다.
- Datadog에서 [TaskCall 통합 타일][2]로 이동한 후 제거합니다. TaskCall에 알림을 보내기 위해 생성한 웹훅도 삭제해야 합니다.
- Once this integration has been uninstalled, any previous authorizations are revoked.


## 지원

통합이나 플랫폼에 관해 궁금한 점이 있으면 [TaskCall 지원팀에 문의하세요][7].


[1]: https://app.us.taskcallapp.com/register
[2]: https://app.datadoghq.com/integrations/taskcall
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/taskcall/images/DatadogTaskCallAuthorization.png
[4]: https://app.datadoghq.com/integrations
[5]: https://docs.taskcallapp.com/integrations/v1/datadog-integration-guide#in-datadog
[6]: https://docs.taskcallapp.com/integrations/v1/datadog-integration-guide
[7]: https://www.taskcallapp.com/contact-us