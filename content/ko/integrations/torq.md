---
app_id: torq
app_uuid: 56e675d8-a461-46ec-93e9-9e8618d21354
assets:
  dashboards:
    Torq: assets/dashboards/torq_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: torq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10231
    source_type_name: Torq
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Torq
  sales_email: support@torq.io
  support_email: support@torq.io
categories:
- 자동화
- 알림
- orchestration
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/torq/README.md
display_on_public_website: true
draft: false
git_integration_title: torq
integration_id: torq
integration_title: Torq
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: torq
public_title: Torq
short_description: 보안 및 운영 팀을 위한 코드 없는 자동화
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Notifications
  - Category::Orchestration
  - 카테고리::보안
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: 보안 및 운영 팀을 위한 코드 없는 자동화
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Torq
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Torq][1] 통합을 사용하면 Datadog 알림에 대한 응답으로 워크플로를 트리거하여 알림을 강화할 수 있습니다. 그런 다음 Torq 워크플로에서 Datadog 이벤트 스트림과 전용 토크 대시보드로 직접 이벤트를 다시 보낼 수 있습니다.

## 설정

이 통합을 설정하려면 활성 [Torq 계정][2]과 해당 계정에 대한 계정 소유자 역할이 필요합니다. 또한 Datadog에서 적절한 관리자 권한을 보유해야 합니다.

### Torq에서 Datadog 트리거 통합 만들기

1. **Integrations** > **Triggers**로 이동하여 **Datadog** 카드를 찾은 다음 **Add**를 클릭합니다.

2. 통합에 의미 있는 이름을 입력하고 **Add**를 클릭합니다.

3. 생성된 Webhook URL을 복사합니다. Datadog 테넌트에서 Webhook 통합을 구성하려면 이 URL이 필요합니다.

### Datadog 모니터를 정의하여 Torq에서 이벤트를 트리거합니다.

1. **Integrations** > **Integrations**으로 이동하여 **Webhooks** 카드를 클릭한 다음 **New**를 클릭합니다.
    ![datadog_webhook][3]

2. Webhook 통합을 위한 의미 있는 이름을 입력하고 Torq에서 생성된 Webhook URL을 붙여넣습니다. 식별자(특정 Datadog 모니터가 Torq를 트리거하는 데 사용됨)와 Torq에서 생성된 Webhook URL을 연결하려면 통합 이름이 필요합니다.
    ![datadog_webhook_2][4]

3. Torq는 페이로드에 추가 알림 정보를 추가할 것을 권장합니다. 다음 구성의 일부를 사용할 수 있습니다.

    ```json linenums="1"
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

4. Torq 플레이북을 트리거할 모니터를 선택하고 **팀에 알림** 필드에 새로 만든 Webhook 통합 기능에 대한 참조를 추가합니다. 자세한 내용은 [모니터 관리][5]를 참조하세요.

## Torq 워크플로에서 Datadog 단계 사용

Datadog API 키와 애플리케이션 키를 생성하여 Torq에서 Datadog 단계의 입력 파라미터로 사용해야 합니다.

**참고: Torq의 일부 Datadog 단계에서는 API 키와 애플리케이션 키가 필요하고, 다른 단계에서는 Datadog 통합이 필요합니다.

### 에서 API 키를 만듭니다. Datadog

API 키를 생성한 후에는 나중에 액세스할 수 없으므로 복사하여 저장하세요. 자세한 내용은 [API 및 애플리케이션 키][6]를 참조하세요.

1. 사용자 이름 위로 마우스를 가져가서 **Organization Settings**을 선택합니다.
2. 왼쪽 패널에서 **API Keys**를 클릭합니다.
3. **+ New Key**를 클릭합니다.
    ![datadog_api_key][7]
4. `Torq` 같은 의미 있는 API 키 이름을 입력하고 **Create Key**을 클릭합니다.
5. `Key`를 복사하여 저장합니다. Torq에서 Datadog 통합을 만들려면 이 키가 필요합니다.

### 다음에서 애플리케이션 키를 만듭니다. Datadog

애플리케이션 키를 생성한 후에는 나중에 액세스할 수 없으므로 복사하여 저장하세요. 자세한 내용은 [API 및 애플리케이션 키][8]를 참조하세요.

1. 사용자 이름 위로 마우스를 가져가서 **조직 설정**을 선택합니다.
2. 왼쪽 패널에서 **Application Keys**를 클릭합니다.
3. **+ 새 키 **를 클릭합니다.
    ![datadog_app_key][9]
4. 애플리케이션 키의 의미 있는 이름(예: `Torq`)을 입력하고 ***Create Key**을 클릭합니다.
5. `Key`를 복사하여 저장합니다. Torq에서 Datadog 통합을 만들려면 이 키가 필요합니다.

### Torq에서 Datadog 통합 생성

이 통합은 Torq 워크플로에서 Datadog 단계를 활성화합니다.

1. **Integrations** > **Steps**로 이동하여 **Datadog** 카드를 찾은 다음 **Add**를 클릭합니다.

2. `Datadog-<monitor_type>` 등 의미 있는 통합 이름을 입력하고 **Add**를 클릭합니다.

## 수집한 데이터

### 메트릭

Torq 통합은 어떠한 메트릭도 제공하지 않습니다.

### 이벤트

Torq 통합을 사용하면 Datadog 이벤트 게시 단계를 사용하여 Torq 워크플로에서 Datadog 이벤트 스트림으로 이벤트를 보낼 수 있습니다. 플레이북과 함께 단계를 사용하여 완화 성공 및 실행 실패에 관해 Datadog에 알릴 수 있습니다. 또한 강화된 알림 데이터를 Datadog으로 다시 보낼 수도 있습니다.

### 서비스 점검

Torq 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://torq.io
[2]: https://torq.io/get-started/
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_search.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_webhook_config.png
[5]: https://docs.datadoghq.com/ko/monitors/manage_monitor/
[6]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_api_key_2.png
[8]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-application-keys
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/torq/images/datadog_app_key_2.png
[10]: https://docs.datadoghq.com/ko/help/