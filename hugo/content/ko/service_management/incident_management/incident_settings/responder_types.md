---
further_reading:
- link: /service_management/incident_management/describe/#response-team
  tag: 설명서
  text: 인시던트 설명
title: 응답자 유형
---

## 개요

Incident Commander 또는 Communications Lead와 같은 특정 역할을 할당하면 보다 체계적이고 조직적인 대응이 가능합니다. 적합한 직원에게 즉시 알림을 전송하고 책임을 할당할 수 있어 혼란과 지연이 줄어듭니다.

응답자 유형 설정에서는 커스텀 역할을 생성하여 [인시던트 응답자에게 할당][1]할 수 있습니다. 또한, 인시던트당 1인 또는 다수의 사람에게 이러한 역할이 할당되도록 지정할 수 있습니다. 이러한 역할은 [역할 기반 액세스 제어(RBASC][2] 시스템과 무관합니다.

## 역할

응답자 유형을 사용하면 자체 인시던트 응답 프로세스의 정의에 따라 응답자가 자신의 인시던트 책임이 무엇인지 이해할 수 있습니다. 기본적으로 다음 두 가지 역할이 있습니다.

1. `Incident Commander` - 응답팀을 주도할 책임이 있는 개인 
2. `Responder` - 인시던트 조사 및 그 기본 문제 해결을 적극적으로 담당하는 개인.

**참고:** `Incident Commander` 응답자 유형은 인시던트 설정에 표시되므로 설명을 커스터마이즈할 수 있습니다. `Incident Commander`는 응답자 유형으로, 삭제할 수 없으며 이름을 바꾸거나 상태를  `One person role`로 변경할 수 없습니다. `Responder` 역할은 일반적인 폴백 역할로, 응답자에게 다른 역할이 할당되어 있지 않고 인시던트 설정에 표시되지 않는 경우에 해당합니다.

## 응답자 유형 생성

1. [**Incident Settings > Responder Types**][3]로 이동합니다.
1. 하단의 표에서 **+ Add Responder Type**을 클릭합니다.
2. 새 응답자 유형에 이름을 제공합니다.
3. 응답자 유형이 `One person role` 또는 `Multi person role`인지 선택합니다. `One person role`은(는) 인시던트당 한 명만 보유할 수 있으며 반면  `Multi person role`은(는) 인시던트당 무제한 사람들이 보유할 수 있습니다.
4. 응답자 유형에 설명을 제공합니다. 이 설명은 팀원에게 배정되는 역할을 선택한 경우 UI에 표시됩니다.
5. **Save**을 클릭합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/incident_management/incident_details/#response-team-section
[2]: /ko/account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types