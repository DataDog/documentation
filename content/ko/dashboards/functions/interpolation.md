---
aliases:
- /ko/graphing/functions/interpolation/
title: 보간
---

## 입력

| 함수 | 설명                                       | 예시                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | 해당 메트릭에 대해 누락된 메트릭 값을 보간합니다. | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

`fill()` 함수에는 다음 두 개의 매개변수가 있습니다.

* **`METHOD`**: 보간 방법으로 사용할 함수. 다음에서 선택합니다.
    * **linear**: 격차의 시작과 끝 사이에 선형 보간을 제공합니다.
    * **last**: 격차의 마지막 값으로 격차를 채웁니다.
    * **zero**: 격차를 0 값으로 채웁니다.
    * **null**: 보간을 비활성화합니다.

* `LIMIT`[*선택*, *기본*=**300**, *최대*=**600**]: 보간하려는 격차의 최대 크기를 나타내는 보간 한도(초)입니다.

`.fill()` 함수와 보간에 미치는 영향에 대한 자세한 설명은 [보간 및 Fill 수정자 관련 안내][1]를 참조하세요.

## 기본 0

| 함수         | 설명                             | 예시                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | 희소 메트릭에 기본값을 추가합니다. | `default_zero(system.load.1{*})` |

`default_zero()` 함수는 값 0을 사용하거나, 보간이 활성화된 경우에는 보간을 통해 비어 있는 시간 격차를 채웁니다. **참고**: `GAUGE` 유형 메트릭에는 기본적으로 보간이 활성화되어 있습니다. 대부분의 함수와 마찬가지로 `default_zero()`는 [시공간 집계][2] **후에** 적용됩니다.

### 사용 사례

`default_zero()` 함수는 다음 사용 사례를 해결하기 위해 고안되었습니다(다른 사용 사례에서도 작동할 수 있습니다).

- 희소 메트릭의 산술을 수행할 때 게이지를 0으로 정렬(참고: `as_count()` 또는 `as_rate()`(으)로 쿼리된 `COUNT` 또는 `RATE` 유형 메트릭은 항상 0으로 정렬되므로, `default_zero()`를 사용해도 정렬 방법은 바뀌지 않습니다. 이는 `GAUGE` 유형 메트릭에만 영향을 미칩니다).
- 데이터가 없는 상태에서 모니터를 해결합니다. 이는 단순 경고와 다중 경고 모두에서 작동하지만, 값 0은 모니터를 트리거하지 않아야 합니다. 예를 들어, `avg(last_10m):avg:system.cpu.idle{*} < 10` 쿼리가 있는 모니터에서는 작동하지 않는데, 그 이유는 값 0으로 평가될 때 (해결  조치 대신) 모니터 트리거가 이루어지기 때문입니다. `as_count()` 쿼리가 있는 오류 빈도 모니터에서는 이 함수를 사용하지 말아야 합니다. 자세한 내용은 [모니터링 평가의 as_count() 가이드][3]를 참조하세요.
- 시각 관련 사유로 또는 모니터 평가에서 시계열의 최소/최대/평균에 영향을 미치기 위해 희소(그러나 비어 있지 않은) 시리즈의 빈 간격을 채웁니다. 평가 윈도우가 데이터 포인트를 포함하지 않으면 `default_zero()`는 아무런 효과가 없습니다.
- 데이터가 없을 때 시계열 위젯에 값 0을 표시합니다.

### 예시

`default_zero()` 함수가 작동하는 방식을 보여주려면 다음과 같이 [DogStatsD를 사용하여][4] 커스텀 메트릭에 생성된 단일 포인트를 고려하세요.

```text
$ echo -n "custom_metric:1|g" | nc -4u -w0 127.0.0.1 8125
```

이 메트릭이 지난 30분 동안 쿼리되면 쿼리의 롤업 간격 중 하나에만 포인트가 존재하므로 단일 타임스탬프만 나타납니다.

```text
avg:custom_metric{*}

+---------------------+---------------+
| Timestamp           | custom_metric |
+---------------------+---------------+
| ---------           | ---------     |
| 2019-04-17 17:45:00 | 1             |
+---------------------+---------------+
```

`default_zero()` 함수는 이 포인트를 5분 앞으로 보간(게이지의 기본 보간 한도)한 다음 나머지 빈 간격을 0으로 채웁니다.

```text
default_zero(avg:custom_metric{*})

+---------------------+-----------------------------+
| Timestamp           | default_zero(custom_metric) |
+---------------------+-----------------------------+
| ---------           | ---------                   |
| 2019-04-17 17:30:00 | 0                           |
| 2019-04-17 17:31:00 | 0                           |
...
| 2019-04-17 17:44:00 | 0                           |
| 2019-04-17 17:45:00 | 1                           |
| 2019-04-17 17:46:00 | 1                           |
| 2019-04-17 17:47:00 | 1                           |
| 2019-04-17 17:48:00 | 1                           |
| 2019-04-17 17:49:00 | 1                           |
| 2019-04-17 17:50:00 | 1                           |
| 2019-04-17 17:51:00 | 0                           |
| 2019-04-17 17:52:00 | 0                           |
...
+---------------------+-----------------------------+
```

## 기타 함수

{{< whatsnext desc="사용 가능한 다른 함수를 참조하세요." >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에 이상 또는 아웃라이어 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에 대해 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}계산: 메트릭의 0이 아닌 값 또는 null이 아닌 값을 계산합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}제외: 메트릭의 특정 값을 제외합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭 대비 커스텀 파생값을 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 일부 기계 학습 기능을 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}롤업: 메트릭에 사용되는 원시 포인트 수를 제어합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}평활화: 메트릭 변동을 평활화합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /ko/getting_started/from_the_query_to_the_graph/#proceed-to-space-aggregation
[3]: /ko/monitors/guide/as-count-in-monitor-evaluations/
[4]: /ko/metrics/