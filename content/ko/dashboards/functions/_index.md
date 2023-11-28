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
kind: 설명서
title: 함수
---

## 개요

그래프화 편집기에서 `+` 아이콘을 클릭하여 쿼리에 함수를 적용할 수 있습니다. 대부분의 함수는 마지막 단계에서 적용됩니다([시간][1] 및 [공간 집계][2] 이후).

{{< img src="dashboards/functions/addingfunctions.png" alt="함수 추가" style="width:75%;" >}}

메트릭의 특정값을 제외하기 위해 제외 함수를 적용하는 방법의 예는 다음과 같습니다.

{{< img src="dashboards/functions/exclusion_example.png" alt="상위 목록을 이용한 제외 예시" style="width:75%;" >}}

현재 데이터를 일주일 전의 데이터와 비교하기 위해 오류 로그에 타임시프트 함수를 적용하는 방법의 예시는 다음과 같습니다.

{{< img src="dashboards/functions/timeshift_example.png" alt="로그를 이용한 타임시프트 예시" style="width:75%;" >}}


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


[1]: /ko/metrics/#time-aggregation
[2]: /ko/metrics/#space-aggregation