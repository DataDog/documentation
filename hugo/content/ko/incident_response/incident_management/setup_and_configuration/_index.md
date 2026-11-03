---
aliases:
- /ko/monitors/incident_management/notification_rules
- /ko/monitors/incident_management/incident_settings
- /ko/service_management/incident_management/incident_settings/
- /ko/incident_response/incident_management/incident_settings
description: Incident Management 경험을 구성 및 맞춤 설정합니다
title: 설정 및 구성
---
## 개요 {#overview}

[인시던트 설정][1]을 사용하여 조직 전체의 Incident Management 경험을 사용자 지정하세요. 이 설정을 통해 Incident Management 사용 방식을 기존 프로세스에 맞출 수 있습니다.

## 인시던트 유형 {#incident-types}

인시던트 유형을 사용하면 다양한 인시던트 클래스에 서로 다른 설정을 적용할 수 있습니다. 보안 인시던트에 대한 대응은 서비스 중단에 대한 대응과 매우 다를 수 있습니다. 인시던트 유형을 사용하면 각 대응을 사용자 지정할 수 있습니다.

인시던트 유형 만들기
1. [Incidents Settings][1] 페이지로 이동합니다.
1. **Add Incident Type**을 클릭합니다.
1. 인시던트 유형 이름을 지정합니다.
1. (선택 사항) 설명을 추가합니다.

## 전역 설정 {#global-settings}

| 설정     | 설명    |
| ---  | ----------- |
| Analytics Dashboard | 인시던트 홈페이지의 Analytics 버튼에 대한 Dashboard를 사용자 지정하세요. 기본적으로 이 링크는 [분석][1]을 위한 템플릿 Incident Management Overview Dashboard로 연결됩니다. |
| 모니터링 자동화| [모니터링 알림 메시지][2]에서 사용할 수 있는 인시던트 @멘션을 생성하여 모니터링이 트리거될 때 자동으로 인시던트를 생성하세요. |

## 인시던트 대응 사용자 지정 {#customize-incident-response}

{{< whatsnext desc="다음 항목에 대한 추가 사용자 지정을 설정하세요.">}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/information" >}}정보{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/integrations" >}}Integrations{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/post_incident/follow-ups" >}}후속 조치{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/notification_rules" >}}알림 규칙{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/property_fields" >}}속성 필드{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/transition_forms" >}}전환 양식{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/responder_types" >}}응답자 유형{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/templates" >}}템플릿{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/automations" >}}자동화{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /ko/monitors/notify/