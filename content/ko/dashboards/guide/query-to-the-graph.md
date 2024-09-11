---
aliases:
- /ko/dashboards/faq/query-to-the-graph
title: 그래프에 대한 쿼리
---

이 페이지는 사용자가 그래프 설정을 선택하는 방법을 잘 이해할 수 있도록 Datadog의 그래프화 시스템이 쿼리에서 그래프까지 수행하는 단계를 설명하는 데 중점을 둡니다.

[타임보드][1] 또는 [스크린보드][2]에서 그래프를 생성할 때 편집기 또는 JSON 탭을 사용하여 고급 쿼리를 설정할 수 있습니다. 아래 예에서는 특정 서버(`host:bubs`)에서 오는 메트릭(`system.disk.total`)을 사용합니다.

{{< img src="dashboards/faq/graph_metric.png" alt="그래프_메트릭" style="width:80%;">}}

다음으로 Datadog 백엔드에서 실행된 각 단계를 따라 쿼리를 수행하고 대시보드에 그래프 선을 렌더링하세요.

이 문서에서는 각 단계에서 쿼리의 각 매개 변수가 미치는 영향에 관해 설명합니다.
**쿼리 전, 저장: 태그에 따라 데이터가 별도로 저장됩니다.**

`system.disk.total`(기본적으로 [datadog-agent][3]에 의해 수집됨) 메트릭은 다른 소스들에서 볼 수 있습니다.

이는 이 메트릭이 서로 다른 호스트에서 보고되고, 또 각 datadog-agent가 해당 메트릭을 장치별로 수집하기 때문입니다. 이는 같은 이름을 가진 디스크에 관련된 데이터를 보내는 등의 경우에 `system.disk.total`이라는 메트릭에 `device:tmpfs`라는 태그를 추가합니다.

따라서 이 메트릭은 여러 `{host, device}` 태그 조합을 갖습니다.

각 소스(호스트 및 태그들의 세트로 정의됨)에 대해 데이터는 별도로 저장됩니다. 이 예에서는 `host:moby`에 5개의 장치가 있다고 가정합니다. 따라서 Datadog는 다음을 위해 5개의 시계열(소스에 대해 시간이 지남에 따라 제출된 모든 데이터 포인트)을 저장합니다.

* `{host:moby, device:tmpfs}`
* `{host:moby, device:cgroup_root}`
* `{host:moby, device:/dev/vda1}`
* `{host:moby, device:overlay}`
* `{host:moby, device:shm}`

다음으로, 위에 제시된 쿼리에 대한 백엔드가 따르는 다음 단계들을 고려하세요.

## 쿼리에 어떤 시계열들이 필요한지 찾으세요

이 쿼리에서는 `host:moby`에 연결된 데이터만 요청했습니다. 따라서 Datadog 백엔드의 첫 번째 단계는 모든 소스(이 경우 `system.disk.total` 메트릭이 제출된 모든 `{host, device}` 조합)를 스캔하고 쿼리 범위에 해당하는 소스만 유지하는 것입니다.

짐작하셨겠지만 백엔드는 5개의 일치하는 소스를 찾습니다(이전 단락 참조).

{{< img src="dashboards/faq/metrics_graph_2.png" alt="메트릭_그래프_2" style="width:70%;">}}

여기에서는 이러한 소스의 데이터를 함께 집계하여 호스트의 `system.disk.total`을 나타내는 메트릭을 제공하고자 합니다. 이는 [3번째 단계](#proceed-to-space-aggregation)에서 이루어집니다.

**참고**: Datadog에서 채택한 태깅 시스템은 간단하고 강력합니다. 결합할 소스를 알거나 지정할 필요가 없습니다. ID와 같은 태그만 제공하면 Datadog가 모든 데이터를 이 ID와 결합하고, 나머지와는 결합하지 않습니다. 예를 들어 `system.disk.total{*}`을 쿼리할 때 가지고 있는 호스트 또는 장치의 수를 알 필요가 없습니다. Datadog에서 모든 소스에서 데이터를 집계해 줍니다.

[시계열 및 태그 카디널리티에 대한 추가 정보][4]

**관련 매개변수: 범위**
두 태그 모두에 응답하는 데이터를 가져오려면 `{host:moby, device:udev}`와 같이 둘 이상의 태그를 사용할 수 있습니다.

## 시간 집계로 진행

Datadog의 백엔드는 그래프의 기간에 해당하는 모든 데이터를 선택합니다.

그러나 서로 다른 소스의 모든 데이터를 결합(3번째 단계)하기 전에 Datadog은 시간 집계 단계를 진행해야 합니다.

### 그 이유는 무엇일까요? 

Datadog는 1초 단위로 데이터를 저장하므로 모든 실제 데이터를 그래프에 표시할 수는 없기 때문입니다. 자세한 내용은 [데이터가 그래프에 집계되는 방식][5]을 참조하세요.

1주 기간에 대한 그래프의 경우, 브라우저에 수십만 개의 값을 전송해야 합니다. 게다가 이러한 모든 점이 화면의 작은 부분을 차지하는 위젯에 그래프로 표시될 수가 없습니다. 따라서 Datadog는 그래프를 렌더링하기 위해 브라우저에 제한된 수의 포인트를 보내기 위해 데이터 집계를 수행해야 합니다.

### 어떤 분할 단위(granularity)를 사용할까요?

예를 들어 'lines' 디스플레이가 있는 1일 보기에는 5분마다 하나의 데이터 포인트가 있다고 가정해보겠습니다. Datadog 백엔드는 1일 간격을 5분씩 288개의 버킷으로 나눕니다. 각 버킷에 대해 백엔드는 모든 데이터를 단일 값으로 반영(롤업)합니다. 예를 들어 타임스탬프가 07:00인 그래프에 렌더링된 데이터 포인트는 실제로 그날 07:00:00과 07:05:00 사이에 제출된 모든 실제 데이터 포인트의 집계입니다.

### 어떻게 작동할까요?

Datadog 백엔드는 기본으로 모든 실제 값을 평균화하여 반영(롤업) 집계를 계산합니다. 이는 화면을 축소할 때 그래프를 부드럽게 만드는 경향이 있습니다. [시간 범위를 축소해도 그래프가 부드러워지는 이유에 대한 자세한 내용은 여기에서 확인하세요][6].
데이터 집계는 소스가 1개이든 1,000개이든 관계없이, 기간을 길게 설정한 경우 항상 발생합니다. 일반적으로 그래프에 표시되는 것은 제출된 실제 값이 아니라 로컬 집계값입니다.

{{< img src="dashboards/faq/metrics_graph_3.png" alt="메트릭_그래프_3" style="width:75%;">}}

Datadog의 백엔드는 쿼리에 해당하는 각 소스에 대한 일련의 로컬 집계값을 계산합니다.

그러나, 이 집계를 어떻게 수행할지는 조절할 수 있습니다.

**관련 매개변수: 반영(선택 사항)**
['반영'(롤업) 기능][7]을 사용하는 방법은 무엇일까요?

이 예에서 `rollup(avg,60)`은 60초를 집계 시간으로 정의합니다. 따라서 X분 간격은 각각 1분 단위의 Y 간격들로 분할됩니다. 주어진 1분 내의 데이터는 그래프에 표시되는 단일 지점으로 집계됩니다(3번째 단계, 공간 집계 후).

**참고**: Datadog 백엔드는 간격 수를 300 미만으로 유지하고자 합니다. 따라서 2개월 기간 동안 `rollup(60)`을 수행하면 요청된 1분 단위로 분할하지 못합니다(즉, 1분 단위의 입도(granularity)를 사용할 수 없습니다).

## 공간 집계로 넘어가기

다음으로 다른 소스의 데이터를 한 줄로 혼합할 수 있습니다.

각 소스에 대해 300개 미만의 포인트가 있습니다. 각 포인트는 1분을 나타냅니다.
이번 예시에서 Datadog은 분당 모든 소스의 평균을 계산하여 다음 그래프를 생성합니다.

{{< img src="dashboards/faq/metrics_graph_4.png" alt="메트릭_그래프_4" style="width:75%;">}}

얻은 값(25.74GB)은 모든 소스에서 보고된 값의 평균입니다(이전 이미지 참조).

**참고**: 소스가 하나만 있는 경우(예: 쿼리 범위로 `{host:moby, device:/dev/disk}`를 선택한 경우)  `sum`/`avg`/`max`/`min`을 사용해도 공간 집계를 수행할 필요가 없으므로 아무 효과가 없습니다. [sum/min/max/avg 집계 기간 전환][8]에 대한 FAQ를 참조하세요.

**관련 매개변수: 공간 집계기**

Datadog은 4개의 공간 집계기를 제공합니다.

* `max`
* `min`
* `avg`
* `sum`

## 함수 적용(선택사항)

기능/함수 기능/함수 데이터를 그래프화할 때 `Formula` 상자의 산술에 함수를 적용할 수 있습니다. 대부분 함수는 마지막 단계에서 적용됩니다. 시간(2번째 단계) 및 공간(3번째 단계) 집계 후 얻은 300개 미만의 포인트에서, 함수는 그래프에서 볼 수 있는 새 값을 계산합니다.

이번 예시에서 `abs` 함수는 결과가 양수인지 확인합니다.

**관련 매개변수: 함수**

{{< whatsnext desc="함수 종류를 선택하세요" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}알고리즘: 메트릭에서 이상 또는 이상치 감지를 구현합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}산술: 메트릭에서 산술 연산을 수행합니다.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}카운트: 메트릭의 0이 아니거나 null이 아닌 값들을 카운트합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}인터폴레이션: 메트릭의 기본값을 채우거나 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}순위: 메트릭의 하위 집합만 선택합니다. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}비율: 메트릭에 대한 사용자 지정 도함수를 계산합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}회귀: 메트릭에 기계 학습 함수를 적용합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}반영: 메트릭에 사용되는 원시 포인트 수를 제어합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}스무싱: 메트릭 변형을 부드럽게 합니다.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}타임시프트: 타임라인을 따라 메트릭 데이터 포인트를 이동합니다. {{< /nextlink >}}
{{< /whatsnext >}}

### 그룹화된 쿼리, 산술, as_count/rate

#### 그룹화된 쿼리

{{< img src="dashboards/faq/metric_graph_6.png" alt="메트릭_그래프_6" style="width:75%;">}}

논리는 동일합니다.

1. Datadog 백엔드는 선택된 소스와 연결된 모든 다른 장치를 찾습니다.
2. 이번 가이드에 설명된 것처럼 백엔드는 각 장치에 대해  `system.disk.total{host:example, device:<DEVICE>}` 쿼리를 실행합니다.
3. 모든 최종 결과는 같은 그래프에 그래프화됩니다.

{{< img src="dashboards/faq/metric_graph_7.png" alt="메트릭_그래프_2" style="width:75%;">}}

**참고**: `rollup` 또는 `as_count` 수식어는 `device` 뒤에 배치해야 합니다.

**참고2**: 여러 태그를 사용할 수 있습니다. 예: `system.disk.in_use{*} by {host,device}`.

#### 산술

산술은 시간 및 공간 집계 이후에도 적용됩니다([4번째 단계: 함수 적용](#apply-functions-optional)).

{{< img src="dashboards/faq/metric_graph_8.png" alt="메트릭_그래프_8" style="width:75%;">}}

#### 카운트 및 비율

`as_count` 및 `as_rate` 는 StatsD 또는 DogStatsD로 제출된 비율 및 카운터에 특정한 시간 집계기들입니다. 이들은 메트릭을 초당 속도로 조회하거나 원시 개수로 확인할 수 있도록 합니다.
구문: 반영을 추가하는 대신 `.as_count()` 또는 `.as_rate()`를 사용할 수 있습니다.

자세한 내용은 [카운트 그래프로 StatsD 메트릭 시각화][9]를 참조하세요.
[StatsD/DogStatsD][10]에 대한 문서.

[1]: /ko/dashboards/#timeboards
[2]: /ko/dashboards/#screenboards
[3]: /ko/agent/
[4]: /ko/metrics/custom_metrics/
[5]: /ko/dashboards/faq/how-is-data-aggregated-in-graphs/
[6]: /ko/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[7]: /ko/dashboards/functions/rollup/
[8]: /ko/dashboards/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same/
[9]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[10]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/