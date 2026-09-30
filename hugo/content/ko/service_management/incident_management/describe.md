---
further_reading:
- link: /service_management/incident_management/incident_settings
  tag: 문서
  text: 인시던트 설정에서 인시던트 사용자 지정
- link: /service_management/incident_management/notification
  tag: 문서
  text: 인시던트 알림 구성
title: 인시던트 설명
---

## 개요

어디에서 [인시던트를 선언][1]하든, 조직의 인시던트 관리 프로세스에 참여하는 다른 사람들과 정보를 공유할 수 있도록 가능한 한 자세히 설명하는 것이 중요합니다. 인시던트 세부 사항에는 다음과 같은 정보가 포함되어야 합니다.
- 발생한 일
- 발생한 이유
- 인시던트와 관련 있는 속성

## 인시던트 상세 정보

인시던트의 상태 및 세부 정보는 인시던트의 개요 탭에서 업데이트할 수 있습니다. 인시던트에서 개요 탭에 인시던트 요약, 고객 영향, 영향을 받은 서비스, 인시던트 대응자, 근본 원인, 탐지 방법, 심각도 등 관련 세부 정보를 입력하여 팀에 인시던트를 조사하고 해결하는 데 필요한 모든 정보를 제공하세요. 

영향 섹션을 업데이트하여 시작 및 종료 시간을 포함하여 고객에게 미치는 영향을 기록하세요. 이러한 영향은 인시던트 분석에 도움을 주므로 조직은 비즈니스에서 인시던트의 영향을 분석할 수 있습니다.

[인시던트 설정 속성 필드][2] 페이지에서 사용자 지정 인시던트 필드를 정의할 수 있습니다.

### 상태 수준

기본 상태는 **Active**, **Stable** 및 **Resolved**입니다. 인시던트 설정 페이지에서 **Completed** 상태를 추가하고 각 상태 수준에 관한 설명을 사용자 지정할 수 있습니다.

* 활성: 인시던트가 다른 요소에 영향을 미칩니다.
* 안정: 인시던트가 더 이상 다른 사람들에게 영향을 미치지 않지만, 조사가 완료되지 않았습니다.
* 해결됨: 인시던트가 더 이상 다른 요소에 영향을 미치지 않으며 조사가 완료되었습니다.
* 완료됨: 모든 교정이 완료되었습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/incident_management/declare
[2]: https://app.datadoghq.com/incidents/settings#Property-Fields