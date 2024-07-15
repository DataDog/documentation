---
aliases:
- /ko/real_user_monitoring/rum_analytics
- /ko/real_user_monitoring/analytics
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: 블로그
  text: 지오맵을 사용하여 위치별로 앱 데이터 시각화
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: 블로그
  text: 퍼널 분석을 사용하여 주요 사용자 흐름을 이해하고 최적화
title: RUM 분석
---

## 개요

실제 사용자 모니터링(RUM) 분석은 문제 해결 및 모니터링을 위한 보기 데이터 집계 및 분할 기능으로 RUM 탐색기 페이지를 확장합니다. 이를 통해 다음을 제어할 수 있습니다:

* 분석할 보기 세트를 필터링하는 쿼리.
* 데이터를 분할할 차원.
* 집합 및 분할에 대한 시각화 방법.

RUM 분석 시각화를 통해 다음을 수행할 수 있습니다:

* 해당 시각화에서 대시보드에 위젯을 만듭니다.
* 시각화가 지원하는 상호 작용에 따라 이벤트 목록의 하위 집합을 자세히 살펴볼 수 있습니다.

## 쿼리 작성

[RUM 분석][1]에서 검색 쿼리에 패싯 및 측정값을 추가하여 디스플레이를 사용자 지정합니다.

1. 그래프로 만들 측정값 또는 패싯을 선택합니다. 측정값을 사용하면 집계 함수를 선택할 수 있는 반면 패싯은 고유 카운트를 표시합니다.

    {{< img src="real_user_monitoring/explorer/analytics/measure_selection.png" alt="측정값 선택" style="width:50%;">}}
2. 그래프로 나타낼 측정값의 집계 기능을 선택합니다:

    {{< img src="real_user_monitoring/explorer/analytics/aggregation.png" alt="RUM 분석을 위한 집계 기능" style="width:50%;">}}

3. 그래프를 분할하기 위해 패싯을 사용합니다.

    {{< img src="real_user_monitoring/explorer/analytics/break_down.png" alt="패싯별로 분할된 RUM 분석" style="width:50%;">}}

4. 그래프의 시간 간격을 선택합니다. 글로벌 타임프레임을 변경하면 사용 가능한 타임스텝 값 목록이 변경됩니다.

    {{< img src="real_user_monitoring/explorer/analytics/roll_up.png" alt="rollup" style="width:50%;">}}

5. 선택한 측정값에 따라 **상위** 또는 **하위** 값을 표시하려면 이 항목을 선택합니다.

    {{< img src="real_user_monitoring/explorer/analytics/top_bottom.png" alt="상위 하위 버튼" style="width:50%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics