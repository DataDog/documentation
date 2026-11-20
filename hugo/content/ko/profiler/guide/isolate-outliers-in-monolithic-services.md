---
further_reading:
- link: /profiler
  tag: 설명서
  text: Datadog 지속적 프로파일러
- link: /profiler/compare_profiles/
  tag: 설명서
  text: 프로필 비교
title: 모놀리식 서비스에서 이상치 격리
---

## 개요

모놀리식 애플리케이션(쓰임새가 여럿인 단일 서비스)의 성능을 조사할 때, 리소스 소비가 가장 많은 코드 베이스 부분을 찾아야 합니다. 합리적인 방법 중 하나는 APM Service 페이지에서 상위 엔드포인트를 살펴보는 것이나, 이곳의 데이터는 요청 수와 기간에 초점이 맞춰져 있고, 요청이 백엔드에서 사용할 수 있는 리소스에 미치는 영향은 살펴볼 수가 없습니다.

대신 연속적 프로파일러를 사용해 엔드포인트 사용량에 따라 플레임 그래프를 필터링할 수 있습니다. 이렇게 하면 리소스 소비량이 가장 높은 엔드포인트를 파악하고, 각 엔드포인트에서 리소스 소비량이 가장 많은 함수를 찾을 수 있습니다.

이 가이드에서는 Datadog 지속적 프로파일러를 사용해 이와 같은 문제를 조사하는 방법을 설명합니다.

## CPU 버스트

성능 조사의 첫 단계는 시간에 따른 리소스 사용량 이상 징후를 파악하는 것입니다. 다음 그래프는 `product-recommendation` 서비스의 최근 한 시간 동안의 CPU 사용량입니다.

{{< img src="profiler/guide-monolithic-outliers/1-outliers-monolith-cpu-usage-2.png" alt="" style="width:100%;" >}}

이 그래프로 정확한 근본 문제를 진단할 수 없으나 CPU 사용량이 비정상적으로 높은 이상 징후를 확인할 수 있습니다.

**Show - Avg of** 드롭다운(이전 이미지에서 강조 표시됨)을 선택하고 현재 그래프 대신 `CPU Cores for Top Endpoints`를 표시하도록 그래프를 변경합니다. 이 그래프를 사용하면 CPU 사용량에서 애플리케이션의 각 부분이 차지하는 비율을 살펴볼 수 있습니다.

{{< img src="profiler/guide-monolithic-outliers/2-outliers-monolith-cpu-top-endpoints-2.png" alt="" style="width:100%;" >}}


노란색으로 표시된 피크 부분을 보면, 이전에 파악한 이상 징후에 해당하는 부분에서 `GET /store_history` 엔드포인트가 간헐적으로 사용량이 있는 것을 볼 수 있습니다. 그러나 이 피크는 해당 엔드포인트로 이동하는 트래픽 차이 때문일 수도 있습니다. 프로필로 더 깊은 인사이트를 얻으려면 메트릭을 `CPU - Average Time Per Call for Top Endpoints`로 변경하세요.

{{< img src="profiler/guide-monolithic-outliers/3-outliers-monolith-cpu-avg-time-per-call-2.png" alt="" style="width:100%;" >}}

업데이트된 그래프를 보면 `GET /store_history` 호출이 있을 때마다 CPU 사용량이 평균 CPU 시간 3초를 소비하며 급증하는 것을 확인할 수 있습니다. 따라서 이와 같은 급증은 트래픽 증가 때문이 아니라 요청별 CPU 사용량 증가 때문이라는 것을 알 수 있습니다.


## 엔드포인트 영향 격리

`GET /store_history`이 호출될 때마다 CPU 사용량이 증가하는 현상의 원인을 파악하려면 급증 현상이 일어나는 시기 하나를 선택해 해당 엔드포인트의 프로파일링 플레임 그래프를 살펴봅니다. `GET /store_history`에서 CPU 사용량이 많은 시간대를 선택하고 프로파일링 페이지에서 해당 범위로 시간대를 조정을 합니다. 그리고 **Flame Graph** 시각화로 변경하여 해당 시간대에 CPU를 사용하는 메서드를 살펴봅니다.

{{< img src="profiler/guide-monolithic-outliers/4-outliers-monolith-flame-graph-2.png" alt="Your image description" style="width:100%;" >}}

`GET /store_history` 엔드포인트가 CPU를 많이 소비하는 이유를 더 깊이 알아보려면 이전 이미지에서 강조 표시된 테이블을 참고하세요. 이 테이블에서 엔드포인트가 상위에서 두 번째로 표시되어 있습니다. 해당 행을 선택해 `GET /store_history` 엔드포인트에서 발생한  CPU 소비를 중점적으로 플레임 그래프를 살펴봅니다.

요청별 리소스 사용량을 조사하고 있기 때문에 테이블 상단 드롭다운에 있는 값을 `CPU Time per Endpoint Call`로 바꾸세요. 이렇게 하면 해당 엔드포인트의 분당 평균 리소스 사용량 대신 호출당 평균 리소스 사용량을 볼 수 있습니다.

## 플레임 그래프 비교

올바른 엔드포인트와 시간대를 선택하여 그래프로 데이터를 표시하면 CPU 사용량 급증 원인을 파악할 수 있는 충분한 데이터를 확보한 것입니다. 아직 문제 원인을 확실히 파악하지 못한 경우, 플레임 그래프의 급증 시간대를 사용량이 안정적인 시간대와 비교해 보세요.

급증 시기와 사용량이 일반적인 시기를 비교해 어떤 메서드가 CPU 시간을 많이 사용하는지를 알아보려면, **Compare**(검색 필드 옆)를 클릭해 `Previous 15 minutes`를 선택하세요. 이렇게 해서 비교 보기가 가능합니다.

비교 보기에는 **A**와 **B**로 레이블된 그래프 두 개가 나타나며, 각 그래프는 `GET /store_history` 호출별 CPU 사용량의 시간 범위를 나타냅니다. 그래프 **A**의 시간을 조정해 호출별 CPU 사용량이 낮은 시간대를 선택합니다.

{{< img src="profiler/guide-monolithic-outliers/5-outliers-monolith-compare-flame-graphs-2.png" alt="Your image description" style="width:100%;" >}}

이렇게 비교하면 일반적인 CPU 사용량 시기에(**A** 시간대)에는 사용하지 않는 메서드가 급증하는 시기(**B** 시간대)에 사용되어서 CPU 사용량 급증을 일으키는 원인을 파악할 수 있습니다. 이전 이미지 예시에서 `Product.loadAssets(int)`이 급증을 일으키는 것을 알 수 있습니다.

이 문제를 해결하려면 메서드를 최적화해야 합니다. 메서드 코드를 보면 서명이 `Product(int id, String name, boolean shouldLoadAssets)`인데, 응답을 위해 자산을 `GET /store_history` 엔드포인트로 로드할 필요가 없습니다. 이를 통해 호출 스택 어딘가에 `Product` 제작자가 자산을 로드하도록 하는 버그가 있다는 것을 알 수 있습니다.

이 버그를 수정한 후 위에서 설명한 시계열 그래프를 사용해 급증 현상이 사라지는지 확인하세요.

## 작업 영향 격리(Java)

프로파일러에서 사용할 수 있는 다른 속성이 있습니다. 예를 들어 플레임 그래프를 함수나 스레드 외에도 작업 이름으로 필터링 및 그룹화할 수 있습니다. 모놀리식 애플리케이션의 경우 이 방법을 사용하면 엔드포인트 간에 공유를 하는 경우에도 CPU 중심 리소스를 명확하게 파악할 수 있습니다.

APM `Trace operation` 속성을 사용하면 선택한 엔드포인트의 플레임 그래프를 트레이스와 동일한 세분성으로 필터링하고 그룹화할 수 있습니다. 이는 스레드나 메서드의 높은 세분성과 전체 엔드포인트의 낮은 세분성 간에 균형을 맞출 수 있는 좋은 방법입니다. 작엽을 격리하려면 **CPU 시간별** 드롭다운에서 `Trace Operation`을 선택합니다.

{{< img src="profiler/guide-monolithic-outliers/7-outliers-monolith-trace-operation-2.png" alt="Your image description" style="width:100%;" >}}

이전 이미지에서 `ModelTraining` 작업이 `GET /train` 엔드포인트의 주 사용보다 더 많은 CPU 시간을 사용하고 있는 것을 볼 수 있습니다. 이를 통해 다른 곳에서도 사용되고 있음을 짐작할 수 있습니다. 작업 이름을 선택해 어디에서 사용되고 있는지 알아보세요. 이 경우, `ModelTraining`이 `POST /update_model`에서도 사용되고 있습니다.


## 자체 비즈니스 로직 격리

프로필에서 엔드포인트와 작업 격리를 기본적으로 사용할 수 있으나 다른 로직을 격리해야 할 때도 있습니다. 예를 들어, 모놀리식 유형에 민감한 특정 고객이 있을 경우, 프로필에 커스텀 필터를 추가할 수 있습니다.

{{< programming-lang-wrapper langs="java,go" >}}
{{< programming-lang lang="java">}}


이와 같은 고객의 경우 컨텍스트 값을 설정합니다.

```java
try (var scope = Profiling.get().newScope()) {
   scope.setContextValue("customer_name", <the customer name value>);
   <logic goes here>
}
```

필터링에 사용할 레이블 키를 지정하려면 `profiling.context.attributes` 구성을 다음 중 하나로 설정합니다.
* 환경 변수:`DD_PROFILING_CONTEXT_ATTRIBUTES=customer_name`
* 시스템 설정: `-Ddd.profiling.context.attributes=customer_name`

여러 컨텍스트 키가 있는 경우, 구성에 쉼표로 구분된 문자열을 사용하세요(예: `-Ddd.profiling.context.attributes=customer_name,customer_group`).

그 후 서비스의 CPU, Exceptions, 또는 Wall Time 프로필을 열고 `CPU time by` 드롭다운에서 원하는 `customer_name` 값을 선택하세요.

{{< /programming-lang >}}
{{< programming-lang lang="go">}}

Go 프로파일러는 v1.60.0부터 비즈니스 로직 커스텀 주석을 지원합니다. 주석을 추가하려면 [프로파일러 레이블][1]을 사용하세요.

```go
pprof.Do(ctx, pprof.Labels("customer_name", <value>), func(context.Context) {
  /* customer-specific logic here */
})
```

필터링에 사용할 레이블 키를 지정하려면 프로파일러를 시작할 때 [WithCustomProfilerLabelKeys][3] (또는[WithCustomProfilerLabelKeys v1][2]) 옵션을 추가하세요.

```go
profiler.Start(
  profiler.WithCustomProfilerLabelKeys("customer_name"),
  /* other options */
)
```

그 후 서비스의 CPU나 goroutine 프로필을 열고 `CPU time by` 드롭다운에서 원하는 `customer_name` 값을 선택하세요.

[1]: https://pkg.go.dev/runtime/pprof#Do
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithCustomProfilerLabelKeys
[3]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#WithCustomProfilerLabelKeys
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}