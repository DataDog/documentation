---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: 이벤트 검색
title: 그룹 RUM 이벤트
---

## 개요

Product Analytics 이벤트는 개별적으로나 집합적으로나 가치가 있습니다. 검색 쿼리에는 이벤트의 하위 집합을 집계하는 정보가 포함되어 있습니다.

{{< img src="product_analytics/analytics/group/group-overview.png" alt="검색어의 필드 섹션으로 그룹화" style="width:100%;" >}}

이벤트를 그룹화, 집계 및 측정하기 위해 선택한 필드는 시각화 유형 간에 전환할 때 그대로 유지됩니다.

## 필드별 집계

필터 쿼리와 일치하는 모든 Product Analytics 이벤트는 하나 이상의 이벤트 패싯 값을 기준으로 그룹으로 집계됩니다. 집계 외에 다음 측정값을 추출할 수 있습니다.

- 그룹별 이벤트 수

  {{< img src="product_analytics/analytics/group/group_count_of_events.png" alt="이벤트 개수별로 그룹화" style="width:90%;" >}}

- 그룹당 패싯에 대한 코딩된 값의 고유 개수

  {{< img src="product_analytics/analytics/group/count-of-coded-values.png" alt="코딩된 값의 고유 개수를 기준으로 그룹화" style="width:90%;" >}}

- 그룹별 패싯의 숫자 값에 대한 통계 연산(예: 최소, 최대, 평균 및 백분위수)

  {{< img src="product_analytics/analytics/group/group-statistical-operations.png" alt="통계 작업을 사용하여 필드로 그룹화" style="width:90%;" >}}

단일 패싯에 대해 여러 값을 갖는 개별 이벤트는 해당 집계 수에 속합니다. 예를 들어 `country:france` 및 `browser:chrome` 속성이 있는 이벤트는 `country:france` 집계에서 한 번, `browser:chrome` 집계에서 한 번 계산됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}