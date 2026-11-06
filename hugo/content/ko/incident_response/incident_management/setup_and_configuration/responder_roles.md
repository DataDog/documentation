---
aliases:
- /ko/incident_response/incident_management/setup_and_configuration/responder_types/
- /ko/service_management/incident_management/incident_settings/responder_types/
- /ko/incident_response/incident_management/incident_settings/responder_types
further_reading:
- link: /incident_response/incident_management/investigate/describe/#response-team
  tag: 문서
  text: 인시던트 설명하기
title: 대응자 역할
---
## 개요 {#overview}

Incident Commander 또는 Communications Lead와 같은 특정 역할을 할당하면 더욱 체계적이고 구조화된 대응이 가능합니다. 알림 및 책임 사항을 적절한 담당자에게 즉시 전달할 수 있어 혼란과 지연을 줄이는 데 도움이 됩니다.

대응자 역할 설정을 통해 [인시던트 대응자에게 할당할][1] 사용자 지정 역할을 만들고, 해당 역할을 인시던트당 한 명이 맡을지 여러 명이 맡을지 지정할 수 있습니다. 이러한 역할은 [역할 기반 액세스 제어(RBAC)][2] 시스템과는 관련이 없습니다.

## 역할 {#roles}

대응자 역할은 인시던트 대응 프로세스 정의에 따라 대응자가 인시던트에서 자신의 책임이 무엇인지 이해하도록 돕습니다. 기본적으로 두 가지 역할이 있습니다.

1. `Incident Commander` - 대응팀을 주도할 책임이 있는 개인
2. `Responder` - 인시던트 조사 및 근본적인 문제 해결을 활발하게 담당하는 개인

**참고:** `Incident Commander` 대응자 역할은 Incident Settings에 표시되므로 설명을 사용자 지정할 수 있습니다. `Incident Commander`는 대응자 역할로 삭제할 수 없으며, 이름이나 `One person role`로서의 상태도 변경할 수 없습니다. `Responder` 역할은 대응자에게 다른 역할이 할당되지 않은 경우의 일반적인 폴백 역할이며, Incident Settings에는 표시되지 않습니다.

## 대응자 역할 생성 {#create-a-responder-role}

1. [**Incident Settings > Responder Roles**][3]로 이동합니다.
1. 표 아래의 **+ Add Responder Role**를 클릭합니다.
2. 새 대응자 역할에 이름을 지정합니다.
3. 대응자 역할을 `One person role` 또는 `Multi person role` 중에서 선택합니다. `One person role`은 인시던트당 한 명만 맡을 수 있는 반면, `Multi person role`은 인시던트당 무제한의 인원이 맡을 수 있습니다.
4. 대응자 역할에 설명을 추가합니다. 이 설명은 팀원에게 할당할 역할을 선택하는 UI에 표시됩니다.
5. **Save**를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/incident_management/investigate/response_team
[2]: /ko/account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types