---
description: RUM 작업 메트릭에서 가용성 및 지연 시간 SLO를 생성하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/operations_monitoring/?tab=browser
  tag: 설명서
  text: Operations Monitoring에 대해 알아보기
- link: /service_level_objectives/metric/
  tag: 설명서
  text: 메트릭 기반 SLO 생성
- link: /journey_monitoring/
  tag: 설명서
  text: Journey Monitoring에 대해 알아보기
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: 가이드
  text: RUM 작업 설정 모범 사례
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: 블로그
  text: RUM 작업을 사용한 사용자 여정의 중요한 단계에 대한 성능 모니터링
title: RUM 작업을 위한 SLO 생성 모범 사례
---
## 개요 {#overview}

[RUM 작업][1]은 [사용자 여정][2]에서 기술적 단계의 가용성과 지연 시간을 측정합니다. 예를 들어, 작업은 결제 요청이 성공했는지, 요청이 완료되는 데 시간이 얼마나 걸리는지 추적할 수 있습니다.

두 가지 작업 메트릭을 사용하여 [메트릭 기반 SLO][3]를 생성하세요.

- `rum.measure.operation`을 사용하여 작업의 성공률을 기반으로 **가용성 SLO**를 생성합니다.
- `rum.measure.operation.duration`을 사용하여 작업의 완료 시간을 기반으로 **지연 시간 SLO**를 생성합니다.

두 메트릭 모두 `operation.name`, `operation.status`, `operation.failure_reason` 및 `application.id` 태그를 포함하며, 이를 사용하여 SLO 쿼리를 정의합니다.

작업 상태의 서로 다른 측면을 측정하려면 가용성 SLO와 지연 시간 SLO를 별도로 생성하세요.

## 전제 조건 {#prerequisites}

- 조직에 [RUM without Limits][4]가 활성화되어 있습니다.
- [최소 하나 이상의 RUM 작업을 구성][5]했습니다.

## 작업 결과 이해 {#understand-operation-outcomes}

각 작업 결과를 처리하는 방법은 SLO가 측정하는 항목에 따라 다릅니다.

| 결과                | 가용성 SLO | 지연 시간 SLO                                      |
|------------------------|------------------|--------------------------------------------------|
| 성공                | 양호 이벤트       | 임계값 이하이면 양호, 초과하면 불량     |
| 오류 또는 기타 실패 | 불량 이벤트        | 제외됨                                         |
| 이탈            | 제외됨         | 임계값 초과 시 불량, 그 외에는 제외됨      |
| 시간 초과                | 불량 이벤트        | 제외됨                                         |

**가용성 SLO는 이탈을 제외합니다**. 작업이 완료되기 전에 떠난 사용자가 반드시 기술적 실패를 경험한 것은 아니기 때문입니다. **지연 시간 SLO는 지속 시간이 임계값을 초과하는 경우에만 이탈을 포함합니다**. 이러한 처리 방식은 이탈이 두 SLO 모두에 집계되는 것을 방지합니다.

**가용성 SLO는 시간 초과를 실패 이벤트로 포함합니다**. 다른 작업 실패와의 일관성을 유지하고 작업 종료가 기록되지 않는 경로의 잠재적인 문제가 숨겨지는 것을 방지하기 위함입니다. **지연 시간 SLO는 시간 초과를 제외합니다**. RUM이 작업 시작은 기록하지만 종료는 기록하지 않아 지속 시간으로 애플리케이션 성능을 신뢰성 있게 측정할 수 없기 때문입니다.

## SLO 생성으로 이동 {#navigate-to-slo-creation}

RUM 또는 SLO 페이지에서 SLO 생성 워크플로를 열 수 있습니다.

### RUM에서 이동 {#navigate-from-rum}

Datadog이 선택된 작업을 사용하여 SLO 쿼리를 초기화하므로 작업 보고서에서 시작하는 것이 더 편리합니다. SLO 페이지에서 시작하면 작업 쿼리를 처음부터 직접 작성해야 합니다.

1. **RUM > Performance Monitoring > Operations**로 이동합니다.
2. 카탈로그에서 작업을 선택합니다.
3. 작업 보고서 상단의 {{< ui >}}SLOs{{< /ui >}} 섹션에서 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
4. 생성할 SLO 유형을 선택합니다.

### SLO 페이지에서 이동 {#navigate-from-the-slo-page}

1. 왼쪽 탐색 메뉴에서 **Monitoring > SLOs**를 선택합니다.
2. {{< ui >}}\+ New SLO{{< /ui >}}를 클릭한 후 {{< ui >}}By Count{{< /ui >}}를 선택합니다.

SLO 생성 워크플로를 연 후 가용성 또는 지연 시간 SLO에 대한 [SLO 쿼리를 구성](#configure-the-slo-query)하세요.

## SLO 쿼리 구성 {#configure-the-slo-query}

생성하려는 SLO 유형에 해당하는 쿼리를 선택하세요. `<OPERATION_NAME>`을 작업 이름으로, `<APPLICATION_ID>`를 RUM 애플리케이션 ID로 바꿉니다.

### 가용성 SLO {#availability-slo}

가용성 SLO는 작업이 성공적으로 완료되는지 여부를 측정합니다.

- **양호 이벤트**에는 성공한 작업이 포함됩니다.
- **불량 이벤트**에는 이탈을 제외한 실패한 작업이 포함됩니다.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-availability-slo-example.png" alt="양호 및 불량 이벤트 쿼리와 미리 보기 그래프가 포함된 카운트 기반 가용성 SLO를 보여주는 SLO 생성 페이지" style="width:100%;" >}}

양호 이벤트에는 이 원시 쿼리를 사용합니다.

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

불량 이벤트에는 이 원시 쿼리를 사용합니다.

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND NOT operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

SLO는 `successful operations / (successful operations + non-abandoned failures)`에 따라 가용성을 계산합니다.

### 지연 시간 SLO {#latency-slo}

지연 시간 SLO는 작업이 허용 가능한 시간 내에 완료되는지 측정합니다. 예상되는 사용자 경험과 관찰된 작업 소요 시간을 기준으로 임계값을 선택하세요. 예를 들어, 사용자가 결제 제출이 3초 이내에 완료되기를 기대한다면 3초를 임계값으로 사용합니다.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-latency-slo-example.png" alt="양호 및 불량 이벤트 쿼리와 미리 보기 그래프가 포함된 카운트 기반 지연 시간 SLO를 보여주는 SLO 생성 페이지" style="width:100%;" >}}

`rum.measure.operation.duration` 메트릭은 나노초를 사용합니다. 임계값을 나노초로 변환하려면 초 단위 값에 `1,000,000,000`을 곱하세요. 예를 들어, 3초는 `3,000,000,000` 나노초와 같습니다.

`<LATENCY_THRESHOLD_NS>`를 나노초 단위의 임계값으로 바꾼 다음, 다음 이벤트를 구성하세요.

- **양호 이벤트**에는 임계값 이하의 시간 내에 완료된 성공적인 작업이 포함됩니다.
- **불량 이벤트**에는 임계값을 초과한 성공한 작업과 이탈한 작업이 포함됩니다.

양호 이벤트에는 이 원시 쿼리를 사용합니다.

{{< code-block lang="text" >}}
count(v: v<=<LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

불량 이벤트는 다음 두 원시 쿼리의 합계로 정의합니다.

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

SLO는 지연 시간을 `fast successful operations / (all successful operations + slow abandoned operations)`로 계산합니다.

### SLO 완료 {#complete-the-slo}

가용성 또는 지연 시간 쿼리를 구성한 후:

1. 중요한 사용자 여정에 대해 30일 롤링 기간 기준 99% 목표로 시작합니다. 여정의 신뢰성 요구 사항과 과거 성능을 기준으로 목표를 조정하세요.
2. 모든 쿼리에 동일한 범위, 필터 및 그룹을 적용합니다.
3. 설명이 담긴 이름과 선택적 태그를 추가합니다.
4. SLO를 저장합니다.

## SLO 확인 {#validate-the-slos}

SLO를 생성한 후 다음 사항을 확인하세요.

1. 양호 이벤트 쿼리와 불량 이벤트 쿼리가 겹치지 않는지 확인합니다.
2. 모든 쿼리가 동일한 작업 범위, 필터 및 그룹을 사용하는지 확인합니다.
3. SLO 이벤트 수를 {{< ui >}}Operations{{< /ui >}} 페이지의 작업 볼륨과 비교합니다.
4. [시간 초과된 작업][6]을 검토합니다(**병렬화** 아래의 참고 사항 참조). 높은 시간 초과율은 일부 애플리케이션 경로에서 작업을 시작했지만 그 종료를 기록하지 않았음을 나타낼 수 있습니다.
5. 지연 시간 임계값이 나노초 단위를 사용하며 해당 작업에 대해 허용 가능한 완료 시간을 나타내는지 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/operations_monitoring/?tab=browser
[2]: /ko/journey_monitoring/
[3]: /ko/service_level_objectives/metric/
[4]: /ko/real_user_monitoring/rum_without_limits/
[5]: /ko/real_user_monitoring/guide/best-practices-for-operations-setup/
[6]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#parallelization