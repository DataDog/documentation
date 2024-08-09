---
aliases:
- /ko/examples/
- /ko/examples/aws-metrics/
- /ko/examples/month_before/
- /ko/examples/graphing-functions/
- /ko/examples/day_before/
- /ko/examples/json-editing/
- /ko/examples/nginx-metrics/
- /ko/examples/dashboards/
- /ko/examples/hour_before/
- /ko/examples/os-metrics/
- /ko/examples/week_before/
- /ko/examples/cassandra-metrics/
- /ko/graphing/miscellaneous/functions
- /ko/graphing/miscellaneous/
- /ko/getting_started/from_the_query_to_the_graph
- /ko/graphing/miscellaneous/from_the_query_to_the_graph
- /ko/graphing/functions/
further_reading:
- link: /metrics/#querying-metrics
  tag: 설명서
  text: 메트릭 쿼리
title: 함수
---

## 개요

함수는 메트릭 쿼리 결과가 시각화를 위해 어떻게 반환될지를 수정할 수 있습니다. 대부분의 함수는 메트릭 쿼리 결과가 반환된 후에 적용되지만 함수는 쿼리가 수행되기 전에 파라미터를 변경할 수도 있습니다. 

예를 들어 Rollup 함수는 결과가 반환되기 전에 쿼리의 시간 집계를 변경합니다. 또는 산술 함수가 메트릭 쿼리의 반환된 결과에 변경 사항을 적용합니다. 메트릭 쿼리에 대한 자세한 내용은 [메트릭][3] 페이지를 참조하세요. 다양한 함수에 대해 자세히 알아보려면 [함수 유형](#function-types)을 참조하세요.

## 함수 추가

그래프 편집기에서 Add Function `Σ` 아이콘을 클릭하면 쿼리에 함수를 적용할 수 있습니다. 대부분의 기능은 [시간][1]과 [공간 집계][2] 이후에 적용됩니다.

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="Add Function의 대문자 시그마 기호" style="width:100%;" >}}

## 함수 유형

{{< whatsnext desc="Choose a type of function:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 산술 연산을 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 사용되는 원시 포인트 수를 제어합니다.. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}베타: 메트릭의 이동평균값을 계산합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/#time-aggregation
[2]: /ko/metrics/#space-aggregation
[3]: /ko/metrics/#anatomy-of-a-metric-query