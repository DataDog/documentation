---
algolia:
  rank: 70
  tags:
  - anomaly
  - anomaly monitor
aliases:
- /ko/guides/anomalies
- /ko/monitors/monitor_types/anomaly
- /ko/monitors/create/types/anomaly/
description: 과거 데이터를 기반으로 메트릭의 이상 동작을 감지합니다.
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 구성
- link: /monitors/downtimes/
  tag: 설명서
  text: 모니터 음소거를 위한 가동 중지 예약
- link: /monitors/status/
  tag: 설명서
  text: 모니터 상태 확인
- link: dashboards/functions/algorithms/#anomalies
  tag: 설명서
  text: Anomalies 함수
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: 블로그
  text: 이상 탐지와 예측 상관관계 - AI 지원 메트릭 모니터링 활용
title: 이상 탐지 모니터
---
## 개요 {#overview}

이상 탐지는 메트릭이 과거와 다른 방식으로 동작할 때 이를 식별하는 알고리즘 기능으로, 추세, 요일별 계절성, 시간대별 패턴을 고려합니다. 이 기능은 강한 추세와 반복적인 패턴이 있어서 임계값 기반 경보만으로는 모니터링하기 어려운 메트릭에 유용합니다.

예를 들어 이상 탐지는 평일 오후의 웹 트래픽이 비정상적으로 낮은 경우를 발견하는 데 도움이 됩니다. 같은 수준의 트래픽이 늦은 저녁에는 정상일 수 있지만, 평일 오후에는 비정상일 수 있습니다. 또는 지속적으로 성장하는 사이트의 로그인 수를 측정하는 메트릭을 생각해 볼 수 있습니다. 로그인 수가 매일 증가하므로 고정 임계값은 금방 무의미해집니다. 반면 이상 탐지는 예상치 못한 로그인 수 감소를 감지하여 로그인 시스템의 문제를 알려줄 수 있습니다.

## 모니터 생성 {#monitor-creation}

Datadog에서 [이상 탐지 모니터][1]를 생성하려면 기본 탐색 메뉴에서 *Monitors --> New Monitor --> Anomaly*를 선택합니다.

### 메트릭 정의 {#define-the-metric}

Datadog에 보고되는 모든 메트릭은 모니터에 사용할 수 있습니다. 자세한 내용은 [메트릭 모니터][2] 페이지를 참조하세요.
**참고**: `anomalies` 함수는 과거 데이터를 사용하여 미래의 예상 값을 예측하므로, 새로 생성된 메트릭에 적용하면 결과가 좋지 않을 수 있습니다.

메트릭을 정의하면 이상 탐지 모니터는 편집기에 두 개의 미리 보기 그래프를 제공합니다.
{{< img src="monitors/monitor_types/anomaly/context.png" alt="과거 추이 정보" style="width:80%;">}}

* **Historical View**를 사용하면 다양한 시간 범위에서 모니터링 쿼리를 탐색하여 데이터가 왜 이상으로 또는 정상으로 간주되는지 더 잘 이해할 수 있습니다.
* **Evaluation Preview**는 경보 윈도우보다 더 긴 범위를 표시하며, 이상 탐지 알고리즘이 경계값을 계산할 때 어떤 요소를 고려하는지 보여줍니다.

### 경보 조건 설정 {#set-alert-conditions}

값이 지난 `15 minutes`, `1 hour` 등 또는 `custom`(15분~2주 범위 지정 가능) 동안 경계값과 비교해 `above or below`, `above` 또는 `below`에 있었을 경우 경보를 트리거합니다. 값이 최소 `15 minutes`, `1 hour` 등 또는 `custom`(15분~2주 범위 지정 가능) 동안 경계값 내에 있으면 복구합니다.

이상 탐지
: 기본 옵션(`above or below`)에서는 메트릭이 회색 이상 탐지 밴드 밖에 있을 경우 이상으로 간주됩니다. 필요에 따라, 밴드보다 `above`이거나 `below`인 경우만 이상으로 간주할지 지정할 수 있습니다.

트리거 윈도우
: 메트릭이 이상 상태로 간주되어 경보가 발생하기까지 필요한 시간입니다. **참고**: : 경보 윈도우가 너무 짧으면 일시적인 노이즈로 인해 오탐이 발생할 수 있습니다.

복구 윈도우
: 메트릭이 더 이상 이상 상태로 간주되지 않아 경보가 복구되기까지 필요한 시간입니다. **복구 윈도우**를 **트리거 윈도우**와 동일한 값으로 설정하는 것이 좋습니다. 

**참고**: **복구 윈도우**에 허용되는 값의 범위는 **트리거 윈도우**와 **경보 임계값**에 따라 결정됩니다. 이는 모니터가 동시에 복구 조건과 경보 조건을 만족하지 않도록 하기 위함입니다.
예시:
* `Threshold`: 50%
* `Trigger window`: 4시간
복구 윈도우에 허용되는 값의 범위는 121분(`4h*(1-0.5) +1 min = 121 minutes`)에서 4시간 사이입니다. 복구 윈도우를 121분보다 짧게 설정하면, 4시간 구간 동안 이상 데이터 포인트가 50% 존재하면서도 마지막 120분에는 이상 데이터 포인트가 없는 상황이 발생할 수 있습니다.

또 다른 예시:
* `Threshold`: 80%
* `Trigger window`: 4시간
복구 윈도우에 허용되는 값의 범위는 49분(`4h*(1-0.8) +1 min = 49 minutes`)에서 4시간 사이입니다.

### 고급 옵션 {#advanced-options}

Datadog은 선택한 메트릭을 자동으로 분석하여 여러 파라미터를 설정합니다. 그러나 필요에 따라 **고급 옵션**에서 직접 수정할 수 있습니다.

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="이상 모니터 구성 페이지의 고급 옵션 메뉴. 주간 계절성을 사용하는 agile 알고리즘으로 예측 데이터 대비 2 편차의 이상을 탐지하고, 일광 절약 시간제를 반영하며, 60초의 롤업 간격을 사용하도록 구성되어 있습니다." style="width:80%;">}}


편차
: 회색 밴드의 너비를 의미합니다. 이는 [anomalies 함수][3]에서 사용하는 bounds 파라미터와 동일합니다.

알고리즘
: [이상 탐지 알고리즘](#anomaly-detection-algorithms)(`basic`, `agile` 또는 `robust`)을 선택합니다.

계절성
`agile` 또는 `robust` 알고리즘이 메트릭을 분석할 때 사용할 주기의 : [계절성](#seasonality)(`hourly`, `daily` 또는 `weekly`)을 선택합니다.

일광 절약 시간제
: `agile` 또는 `robust` 이상 탐지와 `weekly` 또는 `daily` 계절성을 사용하는 경우에 사용할 수 있습니다. 자세한 내용은 [이상 탐지 및 시간대][4]를 참조하세요.

롤업
: [롤업 간격][5]입니다.

임계값
: 경보, 경고 및 복구를 위해 이상 상태로 간주되어야 하는 데이터 포인트의 비율입니다.

### 계절성 {#seasonality}

시간별
: 알고리즘은 특정 시각의 분(分)이 과거 동일한 분과 유사하게 동작한다고 가정합니다. 예를 들어 5:15는 4:15, 3:15 등과 유사하게 동작한다고 예상합니다.

일간
: 알고리즘은 오늘의 특정 시각이 과거 일자의 동일한 시각과 유사하게 동작한다고 가정합니다. 예를 들어 오늘 오후 5시는 어제 오후 5시와 유사하게 동작한다고 예상합니다.

주간
: 알고리즘은 특정 요일이 과거 동일한 요일과 유사하게 동작한다고 가정합니다. 예를 들어 이번 화요일은 과거의 화요일들과 유사하게 동작한다고 예상합니다.

**이상 탐지 알고리즘에 필요한 데이터 이력**: 머신러닝 알고리즘은 기준선을 계산하기 위해 선택한 계절성 기간의 최소 3배에 해당하는 과거 데이터가 필요합니다.
예를 들면 다음과 같습니다.

* _주간_ 계절성에는 최소 3주 분량의 데이터가 필요합니다.
* _일간_ 계절성에는 최소 3일 분량의 데이터가 필요합니다.
* _시간별_ 계절성에는 최소 3시간 분량의 데이터가 필요합니다.

모든 계절성 알고리즘은 메트릭의 정상적인 동작 범위를 계산할 때 최대 6주 분량의 과거 데이터를 사용할 수 있습니다. 알고리즘은 충분한 양의 과거 데이터를 사용함으로써 최근에 발생한 이상 동작에 과도한 가중치를 부여하는 것을 방지합니다.

### 이상 탐지 알고리즘 {#anomaly-detection-algorithms}
basic
: 메트릭에 반복되는 계절성 패턴이 없는 경우 사용합니다. Basic은 단순한 지연 롤링 분위수 계산을 사용하여 예상 값 범위를 결정합니다. 필요한 데이터가 적고 변화하는 조건에 빠르게 적응하지만, 계절성 패턴이나 장기 추세는 고려하지 않습니다.

agile
: 메트릭에 계절성이 있으며 값의 변화가 예상되는 경우 사용합니다. 이 알고리즘은 메트릭 수준의 변화를 빠르게 반영합니다. [SARIMA][6] 알고리즘의 강력한 버전으로, 예측에 최근 데이터를 반영하여 수준 변화에 신속하게 대응할 수 있습니다. 대신 최근에 발생한 장기간의 이상 현상에는 덜 강력할 수 있습니다.

Robust
: 계절성 메트릭이 안정적일 것으로 예상되며, 느린 수준 변화 자체를 이상으로 간주하는 경우 사용합니다. [계절성-추세 분해][7] 알고리즘을 기반으로 하며, 장기간 지속되는 이상 현상이 발생하더라도 예측 범위가 안정적으로 유지됩니다. 반면 의도된 수준 변화(예: 코드 변경으로 인한 메트릭 수준 변화)에 반응하는 데는 더 오랜 시간이 걸립니다.

## 예시 {#examples}
아래 그래프는 세 가지 알고리즘이 서로 다르게 동작하는 방식과 시점을 보여줍니다.

#### 시간별 계절성에 대한 이상 탐지 비교 {#anomaly-detection-comparison-for-hourly-seasonality}
이 예에서 `basic`은 정상 범위를 벗어나는 급격한 이상을 성공적으로 식별하지만, 반복되는 계절성 패턴을 예측 범위에 반영하지는 않습니다. 반면 `robust`과 `agile`은 모두 계절성 패턴을 인식하므로, 예를 들어 메트릭이 최솟값 근처에서 평탄하게 유지되는 경우와 같은 더 미묘한 이상 현상도 탐지할 수 있습니다. 이 추세는 또한 시간별 패턴을 보이므로, 이 경우에는 시간별 계절성이 가장 적합합니다.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="일일 계절성을 사용한 이상 탐지 알고리즘 비교" style="width:90%;">}}

#### 주간 계절성에 대한 이상 탐지 비교 {#anomaly-detection-comparison-for-weekly-seasonality}
이 예에서는 메트릭에 갑작스러운 수준 변화가 발생합니다. `Agile`은 `robust`보다 수준 변화에 더 빠르게 적응합니다. 또한 수준 변화 이후의 불확실성이 커진 것을 반영하기 위해 `robust`의 경계 범위는 넓어지는 반면, `agile`의 경계 범위는 변하지 않습니다. `Basic`은 메트릭이 강한 주별 계절성 패턴을 보이는 이 시나리오에 명백히 적합하지 않습니다.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="주간 계절성을 사용한 이상 탐지 알고리즘 비교" style="width:90%;">}}

#### 알고리즘의 변화 반응 비교 {#comparison-of-algorithm-reactions-to-change}
이 예는 알고리즘이 1시간 동안 지속된 이상에 어떻게 반응하는지를 보여줍니다. `Robust`는 급격한 변화에 더 느리게 반응하므로 이 시나리오에서는 이상에 맞춰 경계 범위를 조정하지 않습니다. 반면 다른 알고리즘들은 이상을 새로운 정상 상태처럼 인식하기 시작합니다. `Agile`은 원래 수준으로 복귀한 상태조차 이상으로 식별합니다.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="시간별 계절성을 사용한 이상 탐지 알고리즘 비교" style="width:90%;">}}

#### 알고리즘의 규모 반응 비교 {#comparison-of-algorithm-reactions-to-scale}
알고리즘은 규모를 서로 다르게 처리합니다. `Basic`과 `robust`는 규모에 영향을 받지 않지만, `agile`은 영향을 받습니다. 아래 왼쪽의 그래프에서는 `agile`과 `robust`가 수준 변화를 이상으로 표시합니다. 오른쪽 그래프에서는 동일한 메트릭에 1000을 추가했으며, 이 경우 `agile`은 더 이상 수준 변화를 이상으로 표시하지 않지만 `robust`는 계속 이상으로 표시합니다.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="알고리즘 비교 규모" style="width:90%;">}}

#### 새 메트릭에 대한 이상 탐지 비교 {#anomaly-detection-comparison-for-new-metrics}
이 예는 각 알고리즘이 새 메트릭을 어떻게 처리하는지 보여줍니다. `Robust`와 `agile`은 처음 몇 개의 계절 주기(주간) 동안 경계 범위를 표시하지 않습니다. `Basic`은 메트릭이 처음 표시된 직후에 경계 범위를 표시하기 시작합니다.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="알고리즘 비교 새 메트릭" style="width:90%;">}}

## 고급 경보 조건 {#advanced-alert-conditions}

고급 경보 옵션(자동 해결, 평가 지연 등)에 대한 자세한 지침은 [모니터 구성][8] 페이지를 참조하세요. 메트릭 전용 옵션인 전체 데이터 윈도우에 대해서는 [메트릭 모니터][9] 페이지를 참조하세요.

## 알림 {#notifications}

**알림 및 자동화 구성** 섹션에 대한 자세한 지침은 [Notifications][10] 페이지를 참조하세요.

## API {#api}

엔터프라이즈 플랜 고객은 [모니터 생성 API 엔드포인트][11]를 사용하여 이상 탐지 모니터를 생성할 수 있습니다. Datadog은 API용 쿼리를 작성할 때 [모니터 JSON 내보내기][12]를 사용할 것을 **강력히 권장합니다**.. Datadog의 [모니터 생성 페이지][1]를 사용하면 미리 보기 그래프와 자동 파라미터 조정 기능을 활용할 수 있어 잘못 구성된 모니터를 방지하는 데 도움이 됩니다.

이상 탐지 모니터는 다른 모니터와 동일한 [API][14]를 사용하여 관리됩니다. 다음 필드는 이상 탐지 모니터에만 고유합니다.

### `query` {#query}

요청 본문의 `query` 속성에는 다음 형식의 쿼리 문자열이 포함되어야 합니다.

```text
avg(<query_window>):anomalies(<metric_query>, '<algorithm>', <deviations>, direction='<direction>', alert_window='<alert_window>', interval=<interval>, count_default_zero='<count_default_zero>' [, seasonality='<seasonality>']) >= <threshold>
```

`query_window`
: `last_4h` 또는 `last_7d`와 같은 기간입니다. 이 파라미터는 알림 그래프에 표시되는 데이터의 시간 범위를 제어합니다. `query_window`는 시각화에 표시되는 과거 데이터의 양을 결정하지만 경보 평가에는 영향을 주지 않습니다. Datadog은 추가 컨텍스트를 제공하기 위해 `query_window` 값을 `alert_window`의 약 5배로 설정할 것을 권장합니다. **참고**: : `query_window`는 최소한 `alert_window` 이상이어야 합니다. 

`metric_query`
: 표준 Datadog 메트릭 쿼리(예: `sum:trace.flask.request.hits{service:web-app}.as_count()`)입니다.

`algorithm`
: `basic`, `agile` 또는 `robust`입니다.

`deviations`
: 양수 값으로, 이상 탐지의 민감도를 제어합니다.

`direction`
: 경보를 트리거해야 하는 이상 현상의 방향성(: `above`, `below` 또는 `both`)입니다.

`alert_window`
: 이상 현상을 확인할 기간(예: `last_5m`, `last_1h`)입니다.

`interval`
: 롤업 간격(초)을 나타내는 양의 정수입니다. 이 값은 `alert_window` 기간의 1/5 이하여야 합니다.

`count_default_zero`
: 대부분의 모니터에서는 `true`를 사용합니다. 값이 없는 경우를 0으로 해석해서는 _안 되는_ count 메트릭을 제출하는 경우에만 `false`로 설정하세요.

`seasonality`
: `hourly`, `daily` 또는 `weekly`입니다. `basic` 알고리즘을 사용하는 경우에는 이 파라미터를 제외합니다.

`threshold`
: 1 이하의 양수입니다. 치명적 경보가 트리거되기 위해 `alert_window` 내에서 이상 상태여야 하는 데이터 포인트의 비율을 의미합니다.

다음은 지난 5분 동안 Cassandra 노드의 평균 CPU 사용량이 정상 값보다 3 표준 편차 이상 높을 때 경보를 발생시키는 이상 탐지 모니터의 쿼리 예시입니다.

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

이 쿼리는 `avg`를 다음 두 곳에서 사용합니다.
- `avg(last_1h)` - 알림 그래프를 위해 쿼리 윈도우 동안의 이상 데이터 포인트를 집계합니다.
- `avg:system.cpu.system{name:cassandra}` - 이상 탐지 전에 Cassandra 노드 전체의 CPU 메트릭을 집계합니다.

### `options` {#options}

요청 본문의 `options` 아래에 있는 대부분의 속성은 다른 쿼리 경보와 동일하지만, `thresholds` 및 `threshold_windows`는 예외입니다.

`thresholds`
: 이상 탐지 모니터는 `critical`, `critical_recovery`, `warning` 및 `warning_recovery` 임계값을 지원합니다. 임계값은 0에서 1 사이의 숫자로 표현되며, 해당 윈도우 내에서 이상 상태로 간주되는 데이터 포인트의 비율을 의미합니다. 예를 들어 `critical` 임계값이 `0.9`인 경우, `trigger_window`(아래 설명 참조)에 포함된 데이터 포인트 중 최소 90%가 이상 상태일 때 치명적 경보가 트리거됩니다. 또는 `warning_recovery` 값이 0인 경우, `recovery_window` 내의 이상 데이터 포인트 비율이 0%가 되어야만 모니터가 경고 상태에서 복구됩니다.
: `critical`: `threshold`는 `query`에서 사용된 `threshold`와 일치해야 합니다.

`threshold_windows`
: 이상 탐지 모니터는 `options` 내에 `threshold_windows` 속성을 가집니다. `threshold_windows`에는 `trigger_window` 및 `recovery_window` 두 속성이 모두 포함되어야 합니다. 이러한 윈도우는 `last_10m` 또는 `last_1h`과 같은 타임프레임 문자열로 표현됩니다. `trigger_window`는 `query`의 `alert_window`와 일치해야 합니다. `trigger_window`는 모니터가 경보를 트리거해야 하는지 평가할 때 이상 현상을 분석하는 기간입니다. `recovery_window`는 이미 트리거된 모니터가 복구되어야 하는지 평가할 때 이상 현상을 분석하는 기간입니다.

임계값과 임계값 윈도우의 일반적인 구성은 다음과 같습니다.

```json
"options": {
  ...
  "thresholds": {
    "critical": 1,
    "critical_recovery": 0
  },
  "threshold_windows": {
    "trigger_window": "last_30m",
    "recovery_window": "last_30m"
  }
}
```

## 문제 해결 {#troubleshooting}

* [이상 탐지 모니터 FAQ][15]
* [이상 탐지 모니터 시간대 업데이트][16]
* [Datadog 지원팀에 문의][17]

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/anomaly
[2]: /ko/monitors/types/metric/#define-the-metric
[3]: /ko/dashboards/functions/algorithms/#anomalies
[4]: /ko/monitors/guide/how-to-update-anomaly-monitor-timezone/
[5]: /ko/dashboards/functions/rollup/
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /ko/monitors/configuration/#advanced-alert-conditions
[9]: /ko/monitors/types/metric/#data-window
[10]: /ko/monitors/notify/
[11]: /ko/api/v1/monitors/#create-a-monitor
[12]: /ko/monitors/status/#settings
[13]: mailto:billing@datadoghq.com
[14]: /ko/api/v1/monitors/
[15]: /ko/monitors/guide/anomaly-monitor/
[16]: /ko/monitors/guide/how-to-update-anomaly-monitor-timezone/
[17]: /ko/help/