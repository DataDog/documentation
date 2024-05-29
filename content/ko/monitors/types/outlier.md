---
aliases:
- /ko/guides/outliers
- /ko/monitors/monitor_types/outlier
- /ko/monitors/create/types/outlier/
description: 다른 그룹과 다르게 행동하는 그룹 멤버에 대한 알림
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: 설명서
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: 설명서
  text: 모니터 상태 확인
kind: 설명서
title: 이상치 모니터
---

## 개요

이상치 탐지는 특정 그룹이 동료 그룹과 다르게 행동하는 경우를 감지할 수 있는 알고리즘 기능입니다. 예를 들어 풀의 한 웹 서버가 비정상적인 수의 요청을 처리하고 있거나 한 AWS 가용성 영역에서 다른 서버보다 훨씬 더 많은 500개 오류가 발생하고 있음을 탐지할 수 있습니다.

{{< img src="monitors/monitor_types/outliers/outliers-metric-alert.png" alt="이상치 메트릭 알림" style="width:80%;">}}

## 모니터 생성

Datadog에서 [이상치 모니터][1]를 생성하려면 기본 탐색(*Monitors --> New Monitor --> Outlier*)을 사용합니다.

### 메트릭 정의

현재 Datadog에 보고되는 모든 메트릭을 모니터에 사용할 수 있습니다. 자세한 내용은 [메트릭 모니터][2] 페이지를 참조하세요.

이상치 모니터에는 균일한 동작을 보이는 3개 이상의 멤버가 있는 그룹(호스트, 가용성 영역, 파티션 등)을 가진 메트릭이 필요합니다.

### 경고 조건 설정

* 각 이상치 `<GROUP>`에 대해 별도의 알림을 트리거합니다.
* 과거 `5 minutes`, `15 minutes`, `1 hour` 등 또는 `custom`으로 1분에서 24시간 사이의 값을 설정합니다.
* `MAD`, `DBSCAN`, `scaledMAD`, 또는 `scaledDBSCAN` 알고리즘을 사용합니다.
* 허용 오차: `0.33`, `1.0`, `3.0` 등
* %: `10`, `20`, `30` 등 (`MAD` 알고리즘에만 해당)

이상치 모니터를 설정할 때 시간 창이 중요합니다 시간 창이 너무 크면 제때 알림을 받지 못할 수 있습니다. 반대로 시간 창이 너무 짧으면 알림은 일회성 스파이크에도 반응합니다.

알림이 제대로 보정되었는지 확인하려면 미리보기 그래프에서 시간 창을 설정하고 역방향(<<) 버튼을 사용하여 알림을 트리거 했을 이상치의 시간을 거슬러 올라갈 수 있습니다. 또한 이 기능을 사용하여 파라미터를 특정 이상치 알고리즘에 맞게 조정할 수 있습니다.

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-graph-calibrate.png" alt="이상치 새 모니터 그래프 보정" style="width:80%;">}}

#### 알고리즘

Datadog은 `DBSCAN`/`scaledDBSCAN`와 `MAD`/`scaledMAD`라는 두 가지 유형의 이상치 감지 알고리즘을 제공합니다. 기본 알고리즘인 DBSCAN을 사용하는 것이 좋습니다. 이상치 탐지에 문제가 있는 경우 DBSCAN의 파라미터를 조정하거나 MAD 알고리즘을 사용해 보세요. 메트릭의 규모가 크고 밀접하게 클러스터되어 있는 경우 확장된 알고리즘이 유용할 수 있습니다.

{{< tabs >}}
{{% tab "DBSCAN" %}}

[DBSCAN][1](노이즈가 있는 애플리케이션의 밀도 기반 공간 클러스터링)은 널리 사용되는 클러스터링 알고리즘입니다. 전통적으로 DBSCAN은 다음을 수행합니다.

1. `ε` 파라미터는 두 점이 가까운 것으로 간주되는 거리 임계값을 지정합니다.
2. 해당 지점이 응집을 시작하기 전에 점의 `ε-radius` 내에 있어야 하는 최소 지점 수입니다.

Datadog은 단순화된 형식의 DBSCAN을 사용하여 시계열의 이상치를 감지합니다. 각 그룹은 *d* 차원의 한 점으로 간주됩니다. 여기서 *d*는 시계열의 요소 수입니다. 모든 점이 응집될 수 있으며 가장 큰 클러스터에 속하지 않는 점은 이상치로 간주됩니다. 초기 거리 임계값은 모든 시점에서 기존 시계열 값의 중앙값을 취하여 새로운 중앙값 시계열을 생성함으로써 설정됩니다. 각 그룹과 중앙값 계열 간의 Euclidean 거리가 계산됩니다. 임계값은 이러한 거리의 중앙값에 정규화 상수를 곱하여 설정됩니다.

**파라미터**<br>
DBSCAN의 구현은 초기 임계값을 곱하여 DBSCAN의 거리 매개변수 ε를 산출하는 상수인 `tolerance` 파라미터를 사용합니다. 그룹이 얼마나 비슷하게 행동할 것으로 예상하는지에 따라 허용 오차 파라미터를 설정합니다. 값이 클수록 그룹이 다른 그룹과 얼마나 편차를 보일 수 있는지에 대한 허용 오차가 커집니다.

[1]: https://en.wikipedia.org/wiki/DBSCAN
{{% /tab %}}
{{% tab "MAD" %}}

[MAD][1](중앙 절대 편차)는 변동성의 강력한 측정값이며 표준 편차에 대한 강력한 아날로그로 볼 수 있습니다. 견고한 통계는 이상치의 영향을 받지 않는 방식으로 데이터를 설명합니다.

**파라미터**<br>
이상치 모니터에 MAD를 사용하려면 `tolerance`및 `%` 파라미터를 설정합니다.

허용 오차는 점이 이상치으로 간주되기 위해 중앙값에서 떨어져야 하는 편차 수를 지정합니다. 이 파라미터는 예상되는 데이터 변동성에 따라 조정되어야 합니다. 예를 들어, 데이터가 일반적으로 작은 범위의 값 내에 있으면 이 값도 작아야 합니다. 그렇지 않고 점들이 크게 달라질 수 있는 경우 더 높은 척도를 설정하여 변동성이 허위 긍정을 트리거하지 않도록 합니다.

백분율은 계열에서 이상치로 간주되는 점의 백분율을 나타냅니다. 이 백분율을 초과하면 전체 계열이 이상치로 표시됩니다.

[1]: https://en.wikipedia.org/wiki/Median_absolute_deviation
{{% /tab %}}
{{% tab "Scaled" %}}

DBSCAN 및 MAD에는 확장 버전(scaledDBSCAN 및 scaledMAD)이 있습니다. 대부분의 상황에서 확장된 알고리즘은 일반 알고리즘과 동일하게 동작합니다. 그러나 DBSCAN/MAD 알고리즘이 밀접하게 클러스터된 메트릭 그룹 내에서 이상치를 식별하고, 메트릭 전체 크기에 따라 이상치 탐지 알고리즘을 확장하려는 경우 확장된 알고리즘을 사용하세요.

{{% /tab %}}
{{< /tabs >}}

##### DBSCAN vs. MAD

그렇다면 어떤 알고리즘을 사용해야 할까요? 대부분의 이상치에 대해 모든 알고리즘이 기본 설정에서 잘 작동합니다. 그러나 하나의 알고리즘이 더 적합한 경우가 있습니다.

다음 이미지에서는 호스트 그룹이 버퍼를 함께 플러시하는 반면, 한 호스트는 약간 나중에 버퍼를 플러시합니다. DBSCAN은 이를 이상치로 선택하지만 MAD는 그렇지 않습니다. 그룹 동기화는 동시에 다시 시작되는 호스트의 아티팩트일 뿐이므로 MAD가 더 나을 수 있습니다. 반면 플러시된 버퍼 대신 메트릭이 호스트 간에 동기화되어야 하는 예약된 작업을 나타낼 경우 DBSCAN을 사용하는 것이 더 좋습니다.

{{< img src="monitors/monitor_types/outliers/outliers-flushing.png" alt="이상치 플러싱" style="width:80%;">}}

### 고급 알림 조건

고급 알림 옵션(자동 해결, 새 그룹 지연 등)에 대한 자세한 지침은 [모니터 설정][3] 페이지를 참조하세요.

### 알림

**Say what's happening** 및 **Notify your team** 섹션에 대한 자세한 지침은 [알림][4] 페이지를 참조하세요.

## API

프로그래밍 방식으로 이상치 모니터를 생성하려면 [Datadog API 레퍼런스][5]를 참조하세요. Datadog은 API에 대한 쿼리를 작성하기 위해 [모니터의 JSON을 내보낼 것][6]을 권장합니다.

## 트러블슈팅

이상치 알고리즘은 다른 그룹과 다르게 행동하는 그룹을 식별하도록 설정됩니다. 그룹이 아래와 같이 "밴딩" 동작을 보이는 경우(각 밴드가 다른 샤드를 나타낼 수도 있음) Datadog에서는 각 밴드에 식별자를 태그로 지정하고 각 밴드에 대해 이상치 탐지 알림를 별도로 설정할 것을 권장합니다.

{{< img src="monitors/monitor_types/outliers/outliers-banding.png" alt="이상치 밴딩" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/outlier
[2]: /ko/monitors/types/metric/#define-the-metric
[3]: /ko/monitors/configuration/#advanced-alert-conditions
[4]: /ko/monitors/notify/
[5]: /ko/api/v1/monitors/#create-a-monitor
[6]: /ko/monitors/manage/status/#settings