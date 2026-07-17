---
aliases:
- /ko/graphing/functions/beta/
title: 베타 함수
---

베타 기능은 쿼리 JSON을 직접 편집하여 사용할 수 있습니다.

## 롤링 평균

| 기능          | 설명                                    | 예시                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | 5의 스팬에 대한 이동평균을 계산합니다.  | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | 13의 스팬에 대한 이동평균을 계산합니다. | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | 21의 스팬에 대한 이동평균을 계산합니다. | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | 29의 스팬에 대한 이동평균을 계산합니다. | `rollingavg_29(system.load.1{*})` |

## 기타 함수

{{< whatsnext desc="용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}보간: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}
