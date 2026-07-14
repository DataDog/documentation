---
app_id: stackpulse
app_uuid: c42edc68-cb25-43f9-9bd2-657a2b7dea82
assets:
  dashboards:
    StackPulse: assets/dashboards/stackpulse_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: stackpulse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10173
    source_type_name: StackPulse
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Torq
  sales_email: support@stackpulse.io
  support_email: support@stackpulse.io
categories:
- 자동화
- 협업
- 인시던트
- 알림
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/stackpulse/README.md
display_on_public_website: true
draft: false
git_integration_title: stackpulse
integration_id: stackpulse
integration_title: StackPulse
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: stackpulse
public_title: StackPulse
short_description: 알림 대응을 자동화하고 이벤트 스트림에서 플레이북 실행을 추적하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Collaboration
  - Category::Incidents
  - Category::Notifications
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: 알림 대응을 자동화하고 이벤트 스트림에서 플레이북 실행을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: StackPulse
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[StackPulse][1] 통합을 사용하면 Datadog 경고에 대응하여 자동 플레이북을 실행할 수 있으며, 이를 통해 알림 강화, 인시던트 해결, 협업을 할 수 있습니다. 이후 플레이북 실행에서 발생한 이벤트를 Datadog 이벤트 스트림과 전용 StackPulse 대시보드로 직접 다시 보낼 수 있습니다.

## 설정

이 통합을 설정하려면 활성화된 [StackPulse 계정][2]과 해당 계정에서 계정 소유자 역할을 보유하고 있어야 합니다. 또한 Datadog에서 적절한 관리자 권한을 가지고 있어야 합니다.

### StackPulse

1. **Monitoring** 아래의 **Integrations** 페이지에서 Datadog 카드를 찾아 [**새로 만들기**][2]를 클릭합니다.

2. 통합에 의미 있는 이름을 지정한 후 **Add**를 클릭합니다.

3. 새로 생성한 웹훅 엔드포인트를 **Copy**합니다.

### Datadog

1. **Integrations**으로 이동하여 [**Webhooks**][3] 카드를 고릅니다.

2. **New**를 클릭하여 새 Webhook 통합을 추가합니다.

3. 새로운 Webhook 통합의 이름을 입력하고(나중에 특정 Datadog 모니터에서 StackPulse를 트리거하기 위해 사용해야 함), 이전 단계에서 얻은 Webhook URL을 입력합니다.

4. StackPulse는 아래 설정의 일부를 사용하여 추가 경보 정보를 포함하도록 페이로드를 확장할 것을 권장합니다.

    ```json
    {
        "body": "$EVENT_MSG",
        "title": "$EVENT_TITLE",
        "date": "$DATE",
        "id": "$ID",
        "metadata": {
            "AGGREG_KEY": "$AGGREG_KEY",
            "ALERT_CYCLE_KEY": "$ALERT_CYCLE_KEY",
            "ALERT_ID": "$ALERT_ID",
            "ALERT_METRIC": "$ALERT_METRIC",
            "ALERT_QUERY": "$ALERT_QUERY",
            "ALERT_SCOPE": "$ALERT_SCOPE",
            "ALERT_STATUS": "$ALERT_STATUS",
            "ALERT_TITLE": "$ALERT_TITLE",
            "ALERT_TRANSITION": "$ALERT_TRANSITION",
            "ALERT_TYPE": "$ALERT_TYPE",
            "EMAIL": "$EMAIL",
            "EVENT_MSG": "$EVENT_MSG",
            "EVENT_TITLE": "$EVENT_TITLE",
            "EVENT_TYPE": "$EVENT_TYPE",
            "HOSTNAME": "$HOSTNAME",
            "ID": "$ID",
            "LAST_UPDATED": "$LAST_UPDATED",
            "LINK": "$LINK",
            "METRIC_NAMESPACE": "$METRIC_NAMESPACE",
            "ORG_ID": "$ORG_ID",
            "ORG_NAME": "$ORG_NAME",
            "PRIORITY": "$PRIORITY",
            "SNAPSHOT": "$SNAPSHOT",
            "TAGS": "$TAGS",
            "TEXT_ONLY_MSG": "$TEXT_ONLY_MSG",
            "USER": "$USER",
            "USERNAME": "$USERNAME",
            "LOGS_SAMPLE": "$LOGS_SAMPLE"
        }
    }
    ```

5. StackPulse 플레이북을 트리거할 모니터를 선택하고, **Alert Your Team** 필드에 새로 생성된 Webhook 통합을 참조로 추가합니다. 자세한 내용은 [모니터 관리][4]를 참조하세요.

6. **Integrations -> APIs **로 이동하여 **API Keys** 카드를 선택합니다. **New API Key** 아래에서 새 키에 의미 있는 이름을 입력한 후 **Create API Key**를 클릭하고, 새 키를 **Copy**합니다.

### StackPulse로 돌아가기

1. **Secrets** 아래 **Integrations** 페이지에서 **Datadog API Keys** 카드를 찾은 다음 [**Add**][5]를 클릭합니다.

2. 통합에 의미 있는 이름을 입력하고 **Add**를 클릭합니다.

## 수집한 데이터

### 메트릭

StackPulse 통합은 어떠한 메트릭도 제공하지 않습니다.

### 이벤트

StackPulse 통합을 사용하면 [Datadog Post Event][6] 단계를 통해 Datadog 이벤트 스트림에 이벤트를 전송할 수 있습니다. 이 단계를 플레이북과 함께 사용하여 Datadog에 성공적인 완화 조치, 실행 실패를 알리고, 보강된 알림 데이터를 다시 Datadog로 전송할 수 있습니다.

### 서비스 점검

StackPulse 통합은 어떠한 서비스 점검도 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://stackpulse.com
[2]: https://stackpulse.com/get-started/
[3]: https://app.datadoghq.com/account/settings#integrations/webhooks
[4]: https://docs.datadoghq.com/ko/monitors/manage/
[5]: https://app.stackpulse.io/integrations/datadog%20api%20keys?create=true
[6]: https://github.com/stackpulse/steps/tree/master/steps/datadog/post-event
[7]: https://docs.datadoghq.com/ko/help/