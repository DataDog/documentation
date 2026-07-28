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
description: Datadog 대시보드 및 시각화에서 메트릭 쿼리 결과를 수정하기 위해 수학 및 통계 함수를 적용합니다.
further_reading:
- link: /metrics/#querying-metrics
  tag: 설명서
  text: 메트릭 쿼리
title: 함수
---
## 개요 {#overview}

함수는 시각화에 대해 메트릭 쿼리 결과가 반환되는 방식을 수정할 수 있습니다. 대부분의 함수는 메트릭 쿼리 결과가 반환된 후 적용되지만, 일부 함수는 쿼리 실행 전에 파라미터를 변경할 수도 있습니다. 

예를 들어 Rollup 함수는 결과가 반환되기 전에 쿼리의 시간 집계를 변경합니다. 반면 산술 함수는 반환된 메트릭 쿼리 결과에 변경 사항을 적용합니다. 메트릭 쿼리에 대한 자세한 내용은 [Metrics][3] 페이지를 참조하세요. 각 함수에 대한 자세한 내용은 [함수 유형](#function-types)을 참조하세요.

## 함수 추가 {#add-a-function}

그래프 편집기에서 함수 추가 `Σ` 아이콘을 클릭하여 쿼리에 함수를 적용할 수 있습니다. 대부분의 함수는 [시간][1] 및 [공간 집계][2] 이후에 적용됩니다.

{{< img src="dashboards/functions/sigmaaddingfunctions.png" alt="함수 추가용 대문자 시그마 기호" style="width:100%;" >}}

## 함수 유형 {#function-types}

{{< whatsnext desc="함수 유형을 선택합니다." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 이상 또는 이상치 탐지를 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 산술 연산을 수행합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}개수: 0이 아니거나 null이 아닌 값의 개수를 셉니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 값을 채우거나 기본값을 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 일부 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭에 대해 사용자 지정 미분값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 머신러닝 함수를 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup: 사용되는 원시 데이터 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 부드럽게 만듭니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/telemetry_source" >}}텔레메트리 소스: 메트릭 데이터의 텔레메트리 소스를 선택합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 메트릭 데이터 포인트를 타임라인상에서 이동합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/beta" >}}베타: 메트릭의 이동 평균을 계산합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/metrics/#time-aggregation
[2]: /ko/metrics/#space-aggregation
[3]: /ko/metrics/#anatomy-of-a-metric-query