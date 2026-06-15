---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
title: 그룹 RUM 이벤트
---

## 개요

실제 사용자 모니터링 (RUM) 이벤트는 개별적으로나 집합적으로 가치가 있습니다. 검색 쿼리에는 이벤트의 하위 집합을 집계하기 위한 정보가 포함되어 있습니다.

{{< img src="real_user_monitoring/explorer/group_into_fields-2.png" alt="검색 쿼리의 필드 섹션으로 그룹화" style="width:100%;" >}}

이벤트를 그룹화, 집계 및 측정하기 위해 선택한 필드는 시각화 유형 간에 전환할 때 그대로 유지됩니다.

## 필드별 집계

필터 쿼리와 일치하는 모든 RUM 이벤트는 하나 또는 여러 이벤트 패싯의 값을 기준으로 그룹으로 집계됩니다. 집계 이외에 다음 측정값을 추출할 수 있습니다:

- 그룹별 이벤트 수

  {{< img src="real_user_monitoring/explorer/group-count-of-events.png" alt="이벤트 수에 따른 그룹화" style="width:90%;" >}}

- 그룹당 패싯에 대한 코딩된 값의 고유 개수

  {{< img src="real_user_monitoring/explorer/group-unique-count-coded-values-2.png" alt="코딩된 값의 고유 개수를 기준으로 그룹화" style="width:90%;" >}}

- 그룹별 패싯의 숫자 값에 대한 통계 연산(예: 최소, 최대, 평균 및 백분위수)

  {{< img src="real_user_monitoring/explorer/group-statistical-operations-2.png" alt="통계 연산을 사용하여 필드로 그룹화" style="width:90%;" >}}

단일 패싯에 대해 여러 값을 가진 개별 이벤트는 해당 수의 집계에 속합니다. 예를 들어, `country:france` 및 `browser:chrome` 속성이 있는 RUM 이벤트는 `country:france` 집계에서 한 번, `browser:chrome` 집계에서 한 번 카운트됩니다.

**필드로 그룹화** 집계는 [상위 목록][1] 시각화에 대해서는 하나의 차원을, 그리고 [시계열][2], [목록][3] 및 [테이블][4] 시각화에 대해서는 최대 3개의 차원을 지원합니다. 여러 차원이 있는 경우 최상위 값은 첫 번째 차원을 기준으로 결정되고, 두 번째 차원은 첫 번째 차원의 최상위 값 내에서, 세 번째 차원은 두 번째 차원의 최상위 값 내에서 결정되는 방식으로 결정됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/visualize#top-list
[2]: /ko/real_user_monitoring/explorer/visualize#timeseries
[3]: /ko/real_user_monitoring/explorer/visualize#lists
[4]: /ko/real_user_monitoring/explorer/visualize#nested-tables