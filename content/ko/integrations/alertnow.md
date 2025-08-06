---
app_id: alertnow
app_uuid: cdb258cc-5e74-4fa2-be21-1489375bb370
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: alertnow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10279
    source_type_name: AlertNow
author:
  homepage: https://service.opsnow.com
  name: AlertNow
  sales_email: sales@opsnow.com
  support_email: support@opsnow.com
categories:
- 경고
- 자동화
- 협업
- 인시던트
- 모바일
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/alertnow/README.md
display_on_public_website: true
draft: false
git_integration_title: alertnow
integration_id: alertnow
integration_title: AlertNow
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: alertnow
public_title: AlertNow
short_description: Datadog 알림을 AlertNow의 알림과 동기화하기
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Collaboration
  - Category::Incidents
  - Category::Mobile
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog 알림을 AlertNow의 알림과 동기화하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AlertNow
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

AlertNow는 다양하고 복잡한 IT 환경으로부터 알림을 수집하고 적절한 담당자에게 알림을 전달하여 신속하게 인시던트를 처리할 수 있도록 지원하는 통합 인시던트 관리 플랫폼입니다. AlertNow를 Datadog에 연결하면 Datadog 알림이 AlertNow의 알림과 자동으로 동기화됩니다. 단일 플랫폼에서 알림을 관리하고 팀에 알림을 전송하여 중요한 문제에 즉시 대응할 수 있습니다.


AlertNow가 제공하는 서비스:
- Datadog에서 인시던트 트리거 및 해결
- 인시던트 발생 시 이메일, SMS, 음성 통화, 모바일 애플리케이션을 통해 적절한 담당자에게 알립니다.

- 에스컬레이션 정책을 기반으로 사용자에게 알림을 보냅니다.
- MTTA 및 MTTR에 대한 보고서, 분석 보고서


![alertnow overview][1]

## 설정

### AlertNow

Datadog를 AlertNow에 연결하려면 Datadog에서 웹훅과 모니터를 생성합니다. 


1. 기존 계정을 사용하거나 opsnow.com에서 AlertNow 계정을 만드세요.

2. 로그를 클릭하고 설정 > 통합 메뉴로 이동합니다.
3. **Create Integration**을 클릭한 다음 **Datadog** 카드를 선택합니다.

    ![datadog card][2]

4. 통합 생성 페이지에서 필요한 정보를 입력한 다음 확인 버튼을 클릭하여 통합을 생성합니다.

    ![datadog integration][3]

5. AlertNow의 통합 페이지에서 URL을 복사합니다.
    ![datadog detail][4]


### Datadog

Datadog 계정에서 아래 단계를 따르세요.


1. [웹훅 통합 타일][5]을 엽니다.

2. **Configuration** 탭을 선택하고 하단으로 스크롤하여 **New**를 클릭합니다.

3. **New Webhook** 양식에 의미 있는 이름과 AlertNow 통합 페이지에서 생성한 AlertNow 웹훅 URL을 입력합니다. 복사한 AlertNow 웹훅 URL의 형식은 아래와 같습니다. **{ALERTNOW-API-KEY}**를 API 키로 대체합니다.



    <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{ALERTNOW-API-KEY} </code></pre>

    ![datadog webhook][6]

4. 아래의 JSON 페이로드를 복사하여 페이로드 창에 붙여넣습니다.


    ``` json
    {
        "id":"$ID",
        "email":"$EMAIL",
        "eventTitle":"$EVENT_TITLE",
        "eventMsg":"$EVENT_MSG",
        "textOnlyMsg":"$TEXT_ONLY_MSG",
        "eventType":"$EVENT_TYPE",
        "date":"$DATE",
        "datePosix":"$DATE_POSIX",
        "alertId":"$ALERT_ID",
        "alertType":"$ALERT_TYPE",
        "aggregKey":"$AGGREG_KEY",
        "orgId":"$ORG_ID",
        "alertStatus":"$ALERT_STATUS",
        "alertScope":"$ALERT_SCOPE",
        "hostname":"$HOSTNAME",
        "user":"$USER",
        "username":"$USERNAME",
        "스냅샷":"$SNAPSHOT",
        "link":"$LINK",
        "priority":"$PRIORITY",
        "tags":"$TAGS",
        "lastUpdated":"$LAST_UPDATED",
        "lastUpdatedPosix":"$LAST_UPDATED_POSIX",
        "alertMetric":"$ALERT_METRIC",
        "metricNamespace":"$METRIC_NAMESPACE",
        "alertTransition":"$ALERT_TRANSITION",
        "orgName":"$ORG_NAME",
        "alertQuery":"$ALERT_QUERY",
        "alertTitle":"$ALERT_TITLE",
        "alertCycleKey":"$ALERT_CYCLE_KEY"
    }

    ```

5. 모니터를 생성하려면 Datadog [알림 설명서][7]를 참조하세요.



## 지원

도움이 필요하세요? [AlertNow 지원팀][8]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png
[5]: https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png
[7]: https://docs.datadoghq.com/ko/monitors/
[8]: mailto:support@opsnow.com