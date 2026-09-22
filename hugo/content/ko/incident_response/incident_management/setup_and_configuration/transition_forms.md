---
description: 상태 변경 시 인시던트 대응자에게 특정 필드를 작성하도록 요청하세요.
title: 전환 양식
---
## 개요 {#overview}

인시던트로 인해 상태 변경이 진행될 때마다 전환 양식을 사용하여 인시던트 필드를 작성할 것을 대응자에게 안내할 수 있습니다. 이 양식은 인시던트 대응 프로세스의 적절한 시점에 인시던트에 대한 정보가 수집되도록 하는 데 도움이 됩니다.

{{< img src="/incident_response/incident_management/setup_and_configuration/status_transition_form.png" alt="인시던트를 Resolved로 이동할 때 사용자에게 필수 Teams 및 Postmortem Owner 필드를 작성할 것을 요청하는 상태 변경 양식" style="width:70%;" >}}

## 전제 조건 {#prerequisites}

전환 양식을 설정하려면 `Incident Settings Write` 권한이 있어야 합니다. 자세한 내용은 [Datadog 역할 권한][1]을 참조하세요.

## 전환 양식 구성 {#configure-a-transition-form}

1. Datadog에서 **Incidents** > [**Settings**][2]로 이동합니다.
1. **Incident Types**에서 편집할 인시던트 유형을 확장합니다.
1. **Transition Forms** 탭을 클릭합니다.
1. 구성하려는 상태를 선택합니다.
1. 양식에 표시할 필드를 선택합니다. [속성 필드][3] 및 [대응자 유형][4]을 추가할 수 있습니다. 모든 필드는 필수 또는 선택 사항으로 표시할 수 있습니다.
1. **Save**를 클릭합니다.

[1]: /ko/account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /ko/incident_response/incident_management/setup_and_configuration/property_fields
[4]: /ko/incident_response/incident_management/setup_and_configuration/responder_types