---
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: /dashboards/functions/
  tag: 설명서
  text: 쿼리에 함수 추가
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: 블로그
  text: 지오맵을 사용하여 위치별로 앱 데이터 시각화
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: 블로그
  text: 퍼널 분석을 사용하여 주요 사용자 흐름을 파악하고 최적화하기
title: Analytics Explorer
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
Product Analytics의 모든 기능은 제한적으로 제공됩니다. 액세스를 요청하려면 양식을 작성하세요.
{{< /callout >}}

## 개요

Analytics Explorer에는 제품 사용 방법을 이해할 수 있는 뷰 데이터 집계가 포함되어 있습니다. 이를 통해 다음을 제어할 수 있습니다.

* 뷰를 표시하는 이벤트 유형(Sessions, Views, Actions).
* 분석할 보기 세트를 필터링하는 쿼리.
* 데이터를 분할할 차원.
* 집합 및 분할에 대한 시각화 방법.

Analytics 시각화를 사용하면 다음을 수행할 수 있습니다.

* 해당 시각화에서 대시보드에 위젯을 만듭니다.
* 시각화가 지원하는 상호 작용에 따라 이벤트 목록의 하위 집합을 자세히 살펴볼 수 있습니다.

## 쿼리 작성

[Analytics][1]에서 검색 쿼리에 패싯과 측정값을 추가하여 디스플레이를 사용자 정의하세요.

1. [뷰 이벤트 유형][2]을 선택합니다.

   {{< img src="product_analytics/analytics/view_type_selection.png" alt="보기 유형 선택." style="width:50%;">}}

2. 고유 개수를 그래프로 표시할 측정값을 선택합니다.

   {{< img src="product_analytics/analytics/measure_selection.png" alt="고유 개수를 그래프로 표시할 측정값을 선택합니다." style="width:50%;">}}

4. 측정 기준을 [그룹화][3]할 필드를 선택합니다.

   {{< img src="product_analytics/analytics/group_breakdown.png" alt="특정 필드별로 측정값을 그룹화합니다." style="width:50%;">}}

5. 그래프의 시간 간격을 선택합니다. 글로벌 타임프레임을 변경하면 사용 가능한 타임스텝 값 목록이 변경됩니다.

   {{< img src="product_analytics/analytics/time_interval.png" alt="그래프의 시간 간격을 선택합니다." style="width:50%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics
[2]: /ko/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /ko/product_analytics/analytics_explorer/group/