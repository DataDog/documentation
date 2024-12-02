---
categories:
- cloud
- 인시던트
- 알림
custom_kind: integration
dependencies: []
description: 이 통합을 통해 Datadog에서 트리거된 경고에서 Salesforce Incidents를 생성할 수 있으며, 발생하는 새로운
  정보로 기존 인시던트를 업데이트할 수 있습니다.
doc_link: https://docs.datadoghq.com/integrations/salesforce_incidents/
draft: false
git_integration_title: salesforce_incidents
has_logo: true
integration_id: ''
integration_title: Salesforce Incidents
integration_version: ''
is_public: true
manifest_version: '1.0'
name: salesforce_incidents
public_title: Datadog-Salesforce Incidents 통합
short_description: Datadog 경고에서 Salesforce Service Cloud Incidents를 생성하고 관리합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Salesforce Incidents 통합을 사용하면 모니터 경고 이벤트에서 Salesforce Service Cloud에 인시던트를 생성할 수 있습니다. Salesforce Datadog Widget을 사용하면 Salesforce에서 직접 인시던트와 관련된 모니터 이벤트의 타임라인을 볼 수 있습니다.

## 설정

### Datadog을 Salesforce Service Cloud에 연결

1. [Datadog Salesforce Incidents 통합 타일][1]로 이동 후 **Add Organization**을 클릭합니다.
2. Organization 유형을 선택합니다.
3. **Connect**를 클릭하고 Salesforce Service Cloud 인증 페이지의 지침을 따릅니다.

### 신뢰할 수 있는 IP 범위

Salesforce 조직이 신뢰할 수 있는 IP 범위를 사용하여 트래픽을 필터링하는 경우 통합이 작동하려면 Datadog에 속한 **Webhooks** IP 접두사로부터의 연결을 허용해야 합니다. 해당 지역의 **Webhooks** IP 접두사 목록은 [Datadog IP 범위][2]를 참조하세요.

### 인시던트 템플릿 구성

템플릿은 Datadog 경고 이벤트를 통해 Salesforce Service Cloud에서 인시던트가 생성되는 방식을 정의합니다.

인시던트 템플릿 생성 방법 

1. **New Incident Template**을 클릭합니다.
2. 인시던트 템플릿의 이름을 입력합니다. `salesforce_incidents-` 접두사가 붙은 이 이름은 모니터 알림(예: `@salesforce_incidents-my-incident-template-name`)에서 사용할 수 있는 핸들이 됩니다.
3. Salesforce 조직을 선택합니다.
4. 인시던트를 생성할 때 사용할 제목, 설명, 소유자 및 우선순위를 제공합니다.
5. **Save**를 클릭합니다.

### Salesforce Service Cloud에 Datadog 위젯 추가

Salesforce Service Cloud에 Datadog 위젯 설치 방법

1. Salesforce 조직의 관리자가 [Salesforce AppExchange][3]에서 Datadog 앱을 설치하도록 합니다.
2. Salesforce Service Cloud에서 Incident Record 페이지로 이동합니다.
3. 톱니바퀴 아이콘을 클릭한 다음 **Edit page**를 클릭합니다.
4. Datadog 위젯을 클릭하여 왼쪽 탐색 메뉴의 커스텀 구성 요소에서 페이지로 드래그합니다.
5. **Save**를 클릭합니다.

## 사용량

#### Datadog 경고를 통해 Salesforce Service Cloud에서 인시던트 생성

Datadog 모니터의 ***Notify your team*** 또는 **Say what's happening** 섹션에 하나 이상의 인시던트 템플릿(예: `@salesforce_incidents-my-incident-template-name`)에 대한 알림 핸들을 포함합니다.

모니터가 트리거되면 인시던트가 생성됩니다. 모니터가 해결될 때까지 새로운 인시던트는 생성되지 않습니다.


## 수집한 데이터

### 메트릭

 Salesforce Incidents 통합은 메트릭을 제공하지 않습니다.

### 이벤트

 Salesforce Incidents 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

 Salesforce Incidents 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/salesforce-incidents
[2]: https://docs.datadoghq.com/ko/api/latest/ip-ranges/
[3]: https://appexchange.salesforce.com/
[4]: https://docs.datadoghq.com/ko/help/