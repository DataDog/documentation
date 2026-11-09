---
aliases:
- /ko/service_management/incident_management/response_team/
- /ko/incident_response/incident_management/response_team
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/responder_roles
  tag: 문서
  text: 인시던트 설정에서 대응자 역할 사용자 지정하기
title: Incident Response 팀
---
## 개요 {#overview}

다른 사용자를 추가하고 대응자 역할을 할당하여 대응팀을 구성하면, 해당 사용자들이 Incident Response 중 집중해야 할 사항을 명확히 파악할 수 있습니다.

## 대응자 추가 {#adding-responders}

대응자는 특정 인시던트에 대한 대응 프로세스에 참여하는 모든 Datadog 사용자입니다.

인시던트에 대응자를 추가하면 다음과 같이 처리됩니다.
* Datadog은 이메일을 통해 대응자에게 인시던트를 알립니다.
* 프라이빗 인시던트의 경우 대응자는 Datadog에서 해당 인시던트를 확인할 수 있습니다.
* 인시던트에 Slack 채널이 연결되어 있으면 해당 채널에 대응자들이 자동으로 추가됩니다.

또한 다음과 같은 경우 Datadog이 사용자를 대응자로 자동 추가합니다.
* 타임라인에 기록하는 것을 포함하여 인시던트를 업데이트하는 작업을 수행하는 경우
* 알림 규칙 또는 수동 인시던트 알림을 통해 인시던트에 대한 알림을 받는 경우

인시던트 세부 정보 페이지의 **Response Team** 탭에는 개인이 해당 인시던트의 대응팀에 추가된 시각이 기록됩니다. 또한 Datadog에서 인시던트 속성을 업데이트하거나 타임라인에 기록하는 등 대응자가 인시던트에 영향을 주는 작업을 마지막으로 수행한 시간도 기록됩니다.

대응자 역할이 할당되지 않았고 인시던트를 업데이트하는 작업을 아직 수행하지 않은 경우 대응자를 제거할 수 있습니다.

## 대응자 역할 할당 {#assigning-responder-roles}

<div class="alert alert-info">대응자 역할은 <a href="/account_management/rbac/?tab=datadogapplication">역할 기반 액세스 제어(RBAC)</a> 시스템과는 관련이 없습니다. Incident Management의 대응자 역할은 사용자의 권한에 영향을 주지 않습니다.</a></div>

인시던트 세부 정보 페이지의 **Response Team** 탭에서 모든 대응자의 대응자 역할을 수정할 수 있습니다.

[인시던트 설정][1]에서 사용자 지정 이름과 설명이 포함된 추가적인 1인 또는 다인 대응자 역할을 정의할 수 있습니다.

## Slack에서 대응자 관리 {#managing-responders-in-slack}

Slack에서 인시던트 채널 내에 `/dd incident responders` 명령어를 입력하여 대응자와 대응자 역할을 관리할 수 있습니다. 인시던트 작업 트레이에서 'Manage Responders' 버튼을 클릭할 수도 있습니다.

대응자 역할을 할당하면, 할당받은 사람에게 Slack으로 알림이 전송됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/incident_management/setup_and_configuration/responder_roles