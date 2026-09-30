---
app_id: signl4
app_uuid: 07952edd-2dc5-4c11-a697-5cba325f64ee
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: signl4.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10158
    source_type_name: SIGNL4
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: SIGNL4
  sales_email: success@signl4.com
  support_email: success@signl4.com
categories:
- 경고
- 협업
- 인시던트
- 문제 추적
- 알림
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/signl4/README.md
display_on_public_website: true
draft: false
git_integration_title: signl4
integration_id: signl4
integration_title: SIGNL4
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: signl4
public_title: SIGNL4
short_description: Datadog 알림을 받고 SIGNL4를 사용하여 신속하게 대응하세요.
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
  description: Datadog 알림을 받고 SIGNL4를 사용하여 신속하게 대응하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SIGNL4
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

[SIGNL4][1] 통합을 사용하여 Datadog 알림을 SIGNL4 팀에 보내고, SIGNL4 앱 내에서 신속하게 대응하세요.

SIGNL4를 Datadog에 연결하면 다음과 같은 작업을 할 수 있습니다.
- Datadog에서 인시던트 트리거 및 해결하기
- 인시던트가 생기는 즉시 조치를 취하고 에스컬레이션 정책 설정
- 온콜 담당 매일 알림 설정

![SIGNL4 App][2]

## 설정

### SIGNL4

SIGNL4에서 다음 단계를 따르세요.

1. 기존 계정을 사용하거나 [signl4.com][1]에서 SIGNL4 계정을 만듭니다.

2. SIGNL4 앱에서 *Teams -> Your Team -> Secret*으로 이동해 팀 비밀번호가 포함된 SIGNL4 웹훅 주소를 찾습니다.

### Datadog 알림

Datadog의 새 알림을 SIGNL4 팀에 알릴 수 있습니다. Datadog에서 해결된 알림은 SIGNL4에서 자동으로 종료됩니다. 이를 위해 다음과 같이 구성하세요.

1. [Webhooks Integration 타일][3]로 이동합니다.

2. **Configuration** 탭에서 Webhooks로 이동한 다음 **New**를 클릭합니다.

3. **New Webhook**에서 의미 있는 `Name`을 입력하고, 위에서 생성한 팀 비밀번호가 포함된 SIGNL 4 Webhook `URL`을 사용합니다. 예를 들어 다음과 같습니다.

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=alertId&ExtStatusParam=alertTransition&ResolvedStatus=Recovered
    ```

    `[team-secret]`을 SIGNL4 팀 비밀번호로 교체합니다.

    ![SIGNL4 Alerts Webhook][4]

4. 다음 JSON을 `Payload` 텍스트 상자에 복사하여 붙여넣습니다.

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "alertTransition": "$ALERT_TRANSITION",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

필요에 맞게 파라미터를 조정합니다(단, `alertId`, `alertTransition`, `X-S4-SourceSystem`은 변경하지 않음).

5. **Save**를 클릭하여 웹훅을 생성합니다.

자세한 내용은 [Datadog에 대한 추적 및 에스컬레이션 기능이 포함된 모바일 알림][5]을 참고하세요.

이제 모니터에서 웹훅을 알림 채널로 사용할 수 있습니다. 웹훅 이름이 SIGNL4라고 가정하고, `@webhook-SIGNL4`를 사용하여 알림을 보냅니다. 모니터 조건이 적용되면 팀에서 새 SIGNL4 알림을 받습니다.

### Datadog 인시던트

Datadog에서 새로운 인시던트가 발생하면 SIGNL4 팀에 알림을 보낼 수 있습니다. Datadog에서 해결된 인시던트는 SIGNL4에서 자동으로 알림을 종료합니다. 알림을 닫으려면 다음대로 구성하세요.

1. [Webhooks Integration 타일][3]로 이동합니다.

2. **Configuration** 탭에서 Webhooks로 이동한 다음 **New**를 클릭합니다.

3. **New Webhook**에서 의미 있는 `Name`을 입력하고, 위에서 생성한 팀 비밀번호가 포함된 SIGNL 4 Webhook `URL`을 사용합니다.

    ```
    https://connect.signl4.com/webhook/[team-secret]?ExtIDParam=s4ExternalId&ExtStatusParam=incidentStatus&ResolvedStatus=resolved
    ```

    URL의 `[team-secret]`을 SIGNL4 팀 비밀번호로 변경합니다.

    ![SIGNL4 Incidents Webhook][6]

4. 다음 JSON을 `Payload` 텍스트 상자에 복사하여 붙여넣습니다.

    ```json
    {
        "title": "$EVENT_TITLE",
        "message": "$TEXT_ONLY_MSG",
        "link": "$LINK",
        "priority": "$ALERT_PRIORITY",
        "host": "$HOSTNAME",
        "alertScope": "$ALERT_SCOPE",
        "alertStatus": "$ALERT_STATUS",
        "alertId": "$ALERT_ID",
        "incidentPublicId": "$INCIDENT_PUBLIC_ID",
        "incidentStatus": "$INCIDENT_STATUS",
        "alertTransition": "$ALERT_TRANSITION",
        "s4ExternalId": "DATADOG-INCIDENT-$INCIDENT_PUBLIC_ID",
        "X-S4-SourceSystem": "Datadog",
        "date": "$DATE",
        "org": {
            "id": "$ORG_ID",
            "name": "$ORG_NAME"
        },
        "id": "$ID"
    }
    ```

필요에 맞게 파라미터를 조정합니다(단, `incidentStatus`, `s4ExternalId`, `X-S4-SourceSystem`는 변경하지 않음).

5. **Save**를 클릭하여 웹훅을 생성합니다.

자세한 내용은 [Datadog에 대한 추적 및 에스컬레이션 기능이 포함된 모바일 알림][5]을 참고하세요.

### 인시던트 규칙

Datadog의 Monitors -> Settings (Incidents) Rules에서 규칙을 만들 수 있습니다. 규칙에서 심각도, 서비스 등의 기준을 지정합니다. "Other attributes"에 대해 새 알림을 트리거하려면 "state:active"를 사용하고, 알림을 종료하려면 "state:resolved"를 사용하는 것이 좋습니다. "Notify"에서 위에서 생성한 SIGNL4 인시던트 웹훅을 선택합니다.

![SIGNL4 Incidents Rule][7]

새 인시던트를 생성하면 SIGNL4 팀에 알림이 전송됩니다. SIGNL4 앱에서 알림을 확인하거나 닫으면 인시던트 상태가 Stable 또는 Resolved로 설정됩니다.

또한 Datadog에서 인시던트 상태를 Resolved로 설정하면 SIGNL4에서 알림이 종료됩니다.

### Datadog 인시던트 상태 업데이트

Datadog 인시던트에 관한 알림을 확인하거나 종료하여 SIGNL4 앱에서 상태를 Stable 또는 Resolved로 업데이트할 수 있습니다.

이 백 채널을 구성하려면 SIGNL4 웹 포털에서 Teams -> Apps로  이동합니다. 그런 다음 Datadog 커넥터 앱을 검색하고 "Create"를 클릭합니다. 앱 설정에서 자세한 정보를 확인할 수 있습니다.

![Datadog Connector App][8]

다음을 구성해야 합니다.

- Datadog URL: Datadog 인스턴스의 URL(예: https://app.datadoghq.com/ 또는 https://app.datadoghq.eu/).
- Datadog API Key: Datadog API 키. Datadog 계정 아래 Organization Settings -> API Keys에서 API 키를 찾거나 생성할 수 있습니다.
- Datadog Application Key: Datadog 애플리케이션 키. Datadog 계정 아래 Organization Settings -> Application Keys에서 애플리케이션 키를 찾거나 생성할 수 있습니다.
- Acknowledgement as Stable: 인시던트 상태가 Stable로 설정되었음을 확인함.

## 수집한 데이터

### 메트릭

SIGNL4 통합은 메트릭을 포함하지 않습니다.

### 이벤트

트리거되고 해결된 SIGNL4 이벤트는 SIGNL4 앱과 웹 포털에 표시됩니다.

### 서비스 점검

SIGNL4 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [SIGNL4 지원팀][9]에 문의하세요.


[1]: https://www.signl4.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-phone.png
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-alerts-webhook.png
[5]: https://www.signl4.com/blog/portfolio_item/datadog_mobile_alerting/
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-webhook.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/datadog-incidents-rule.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/signl4/images/signl4-datadog-connector-app.png
[9]: mailto:success@signl4.com