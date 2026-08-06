---
categories:
- 이벤트 관리
- 알림
custom_kind: 통합
dependencies: []
description: SolarWinds Orion의 경고를 Datadog 이벤트 스트림에 주입하세요.
doc_link: https://docs.datadoghq.com/integrations/solarwinds/
draft: false
git_integration_title: solarwinds
has_logo: true
integration_id: ''
integration_title: SolarWinds
integration_version: ''
is_public: true
manifest_version: '1.0'
name: solarwinds
public_title: "Datadog-SolarWinds\b 통합"
short_description: SolarWinds Orion의 경고를 Datadog 이벤트 스트림에 주입하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

SolarWinds Orion의 경고를 받아 중앙에서 경고를 집계하고 분류하세요.

이 통합은 Datadog을 모든 SolarWinds 경고 알림에 구독시키는 방식으로 작동합니다.

## 설정

### 트리거 액션 만들기

SolarWinds에서 새 트리거 액션을 생성하려면:

1. Alerts > Manage Alerts로 이동합니다.
2. 경고를 선택해 “Edit Alert”를 클릭하거나 경고가 없는 경우 새 경고를 생성합니다.
3.  Trigger Actions > Add Action으로 이동합니다.
4. “Send a GET or POST Request to a Web Server”를 선택합니다.
5. “Configure Action”을 클릭합니다.
6. 다음 세부 정보로 Action Pane을 채웁니다.

        a. Name of Action: Send Alert to Datadog (or whatever you prefer)
        b. URL: https://app.datadoghq.com/intake/webhook/solarwinds?api_key=<DATADOG_API_KEY>
        c. Select: Use HTTP/S POST
        d. Body to Post: Copy and paste from alert template below
        e. Time of Day: Leave as is
        f. Execution Settings: Leave as is

7. “Add Action”을 클릭합니다.
8. "Reset Actions" 단계를 클릭한 다음 Trigger Action 템플릿 대신 Reset Action 템플릿을 사용하여 4-7 단계를 반복합니다.
9. “Next“를 클릭합니다.
10.  Summary 페이지에서 “Submit“을 클릭합니다.

### 경고에 액션 할당

1. Alert Manager 보기에서 Datadog에 보내려는 모든 경고를 선택한 다음 Assign Action > Assign Trigger Action으로 이동합니다.
2. Send Alert to Datadog - Trigger action을 선택한 후 Assign을 클릭합니다.
3. Send Alert to Datadog - Reset action을 사용하여 Assign Action > Assign Reset Action을 반복합니다.

### 게시할 트리거 액션 본문
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}"
}
``` 

### 게시할 리셋 액션 본문
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}",
    "reset": "true"
}
``` 

## 수집한 데이터

### 메트릭

SolarWinds 통합은 메트릭을 포함하지 않습니다.

### 이벤트

SolarWinds 통합은 이벤트 스트림에서 SolarWinds 경고를 수집합니다.

### 서비스 점검

SolarWinds 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? Datadog 지원팀에 문의하세요.