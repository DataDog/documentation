---
app_id: alertnow
categories:
- 경고
- 자동화
- 협업
- 인시던트
- 모바일
custom_kind: 통합
description: Datadog 알림을 AlertNow의 알림과 동기화하기
integration_version: 1.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: AlertNow
---
## 개요

AlertNow는 다양하고 복잡한 IT 환경으로부터 알림을 수집하고 적절한 담당자에게 알림을 전달하여 신속하게 인시던트를 처리할 수 있도록 지원하는 통합 인시던트 관리 플랫폼입니다. AlertNow를 Datadog에 연결하면 Datadog 알림이 AlertNow의 알림과 자동으로 동기화됩니다. 단일 플랫폼에서 알림을 관리하고 팀에 알림을 전송하여 중요한 문제에 즉시 대응할 수 있습니다.

AlertNow가 제공하는 서비스:

- Datadog에서 인시던트 트리거 및 해결

- 인시던트 발생 시 이메일, SMS, 음성 통화, 모바일 애플리케이션을 통해 적절한 담당자에게 알립니다.

- 에스컬레이션 정책을 기반으로 사용자에게 알림을 보냅니다.

- MTTA 및 MTTR에 대한 보고서, 분석 보고서

![alertnow overview](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/alertnow_overview.png)

## 설정

### AlertNow

Datadog를 AlertNow에 연결하려면 Datadog에서 웹훅과 모니터를 생성합니다. 

1. 기존 계정을 사용하거나 opsnow.com에서 AlertNow 계정을 만드세요.

1. 로그를 클릭하고 설정 > 통합 메뉴로 이동합니다.

1. **Create Integration**을 클릭한 다음 **Datadog** 카드를 선택합니다.

   ![datadog card](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/integration_card_datadog.png)

1. 통합 생성 페이지에서 필요한 정보를 입력한 다음 확인 버튼을 클릭하여 통합을 생성합니다.

   ![datadog integration](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/create_integration_datadog_en.png)

1. AlertNow의 통합 페이지에서 URL을 복사합니다.
   ![datadog detail](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_integration_detail.png)

### Datadog

Datadog 계정에서 아래 단계를 따르세요.

1. Open the [Webhooks Integration tile](https://app.datadoghq.com/account/login?next=%2Faccount%2Fsettings#integrations/webhooks).

1. **Configuration** 탭을 선택하고 하단으로 스크롤하여 **New**를 클릭합니다.

1. **New Webhook** 양식에 의미 있는 이름과 AlertNow 통합 페이지에서 생성한 AlertNow 웹훅 URL을 입력합니다. 복사한 AlertNow 웹훅 URL의 형식은 아래와 같습니다. **{ALERTNOW-API-KEY}**를 API 키로 대체합니다.

   <pre><code> https://alertnowitgr.opsnow.com/integration/datadog/v1/{ALERTNOW-API-KEY} </code></pre>

   ![datadog webhook](https://raw.githubusercontent.com/DataDog/integrations-extras/master/alertnow/images/datadog_webhook.png)

1. 아래의 JSON 페이로드를 복사하여 페이로드 창에 붙여넣습니다.

   ```json
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
       "snapshot":"$SNAPSHOT",
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

1. Refer to Datadog's [Alerting documentation](https://docs.datadoghq.com/monitors/) to create monitors.

## 지원

Need help? Contact [AlertNow support](mailto:support@opsnow.com).