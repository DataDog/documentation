---
aliases:
- /ko/events/guides/recommended_event_tags
description: 권장 이벤트 태그 및 그 추가 방법에 대해 알아보세요.
further_reading:
- link: /getting_started/tagging/assigning_tags
  tag: 설명서
  text: 태그 할당에 대해 알아보기
title: Tagging Events에 대한 모범 사례
---

## 개요

Datadog은 다음과 같은 이점을 위해 모든 이벤트에 [통합 서비스 태깅][1] 및 아래 나열된 태그를 사용할 것을 권장합니다.

- 잠재적인 문제를 더 빠르게 식별
- 관련 이벤트 찾기
- 예를 들어, [Events Explorer][2]에서 특정 환경으로 더 정확하게 필터링

## 태그 추가

다음과 같이 이벤트에 대한 태깅 전략을 개선할 수 있는 여러 가지 옵션이 있습니다.

- API: [API][3]를 사용할 때 `tags` 필드에 태그를 추가할 수 있습니다.

- 모니터: 모니터를 생성하거나 편집할 때 [*Say what's happening** 섹션][4]에 권장 태그를 추가할 수 있습니다.

- 통합: 통합에 태그를 추가하는 방법에 대한 자세한 내용은 [Assigning Tags][5] 또는 특정 [통합][6]을 참조하세요.

다음 핵심 속성을 이벤트에 추가할 수 있습니다.

| **Attribute** | **Description**                                                                                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| env           | 프로덕션, 에지 또는 스테이징과 같이 이벤트가 발생한 환경입니다. 이를 통해 하위 환경의 이벤트를 상위 우선 순위로 오해하지 않게 할 수 있습니다.                       |
| 서비스       | 서비스 이름입니다. 다음을 수행할 수 있습니다. <br>- 이벤트가 오류와 관련된 경우 어떤 서비스가 영향을 받는지 파악합니다.<br>- 영향을 받는 서비스로 피벗합니다.<br>- 해당 서비스의 모든 이벤트를 필터링합니다. |
| 버전       | 빌드 또는 서비스 버전입니다. 이를 통해 중단 또는 이벤트가 특정 버전과 관련되어 있는지 식별할 수 있습니다.                                                                         |
| 호스트          |  호스트 이름입니다. 다음을 수행할 수 있습니다.<br>- 추가 호스트 태그를 사용하여 수집 시 자동으로 이벤트를 보강합니다.<br>- [Events Explorer][7]에서 **Host Infrastructure** 및 **Metrics** 탭으로 피벗합니다.                             |
| 팀          | 이벤트를 소유하고 필요한 경우 알림을 받는 팀입니다.                                                                                                                       |                                                          |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
[2]: /ko/service_management/events/explorer
[3]: /ko/api/latest/events/#post-an-event
[4]: /ko/getting_started/monitors/#notify-your-team
[5]: /ko/getting_started/tagging/assigning_tags
[6]: /ko/integrations/
[7]: https://app.datadoghq.com/event/explorer