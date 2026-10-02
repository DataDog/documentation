---
description: Throttle 프로세서를 사용하여 특정 기간 내에 전송되는 로그 수에 제한을 설정하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Throttle 프로세서
---
{{< jqmath-vanilla >}}

{{< product-availability >}}

## 개요 {#overview}

이 프로세서를 사용하여 특정 기간 내에 전송되는 로그 수에 제한을 설정하세요. 예를 들어, 초당 100개의 로그만 전송되도록 제한을 설정할 수 있습니다. 속도 제한을 설정하면 로그 수집 급증을 포착하고 예상치 못한 청구 비용을 방지하는 데 도움이 될 수 있습니다.

## 설정 {#setup}

프로세서를 설정하려면 다음 단계를 따르세요.

1. 필터 쿼리를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 처리됩니다. 일치하는 모든 로그는 스로틀링됩니다. 스로틀 제한 내에 전송된 로그와 필터와 일치하지 않는 로그는 다음 단계로 전송됩니다. 스로틀 제한에 도달한 후 전송된 로그는 삭제됩니다. 자세한 내용은 [검색 구문][4]을 참조하세요.
1. 스로틀링 속도를 설정합니다. 이는 설정된 기간 동안 특정 버킷에 허용되는 이벤트 수입니다. **참고**: 이 속도 제한은 **워커별 수준**으로 적용됩니다. 워커 수를 늘리거나 줄이는 경우, 그에 따라 프로세서 속도 제한을 조정해야 할 수 있습니다. [Observability Pipelines API][1]를 사용하여 프로그래밍 방식으로 속도 제한을 업데이트할 수 있습니다.
1. 기간을 설정합니다.
1. 필요시 필드별로 그룹화하려면 {{< ui >}}Add Field{{< /ui >}}를 클릭합니다.

## Throttle 프로세서 작동 방식 {#how-the-throttle-processor-works}

Throttle 프로세서는 지정된 기간 내에 전송되는 로그 수에 속도 제한을 설정합니다. [Quota 프로세서][2]와 유사하지만, Throttle 프로세서와 Quota 프로세서의 주요 차이점은 Quota 프로세서의 기간은 24시간으로 고정되어 변경할 수 없는 반면, Throttle 프로세서의 기간은 구성할 수 있다는 점입니다. Throttle 프로세서의 기간은 구성 가능하므로, 프로세서에는 설정한 스로틀링 속도와 기간을 기반으로 하는 용량 보충 속도가 있습니다. 자세한 내용은 [용량 보충 속도](#capacity-replenishment-rate)를 참조하세요.

다음 표에서는 Throttle 프로세서와 Quota 프로세서를 비교합니다.

| 기능 | Quota 프로세서 | Throttle 프로세서 |
|---------|----------------|-------------------|
| 기간 | 24시간으로 고정 | 구성 가능 |
| 초기 이벤트 버스트 처리 | 고정된 일일 제한까지 데이터를 처리합니다. | 구성한 스로틀링 속도까지 이벤트를 처리합니다. |
| 제한 도달 후 | 24시간 기간이 재설정될 때까지 데이터 처리를 중단합니다. | 계산된 일정한 속도로 계속 진행됩니다. |
| 재설정 메커니즘 | 24시간마다 재설정됩니다. | 지속적으로 보충합니다. Worker 또는 파이프라인을 다시 배포하면 기간도 재설정됩니다. |
| 제한이 저장되거나 추적되는 방식 | 할당량 제한은 백엔드에 저장되므로 Worker를 다시 시작해도 유지됩니다. | 스로틀 제한은 Worker의 메모리에서 추적되므로 Worker 또는 파이프라인을 다시 배포하면 기간이 재설정됩니다. |

### 초기 용량 {#initial-capacity}

{{< img src="observability_pipelines/processors/throttling_rate.png" alt="스로틀링 속도가 1000K로 설정된 Throttle 프로세서" style="width:40%;" >}}

Throttle 프로세서가 활성화되면 프로세서가 즉시 통과시키는 로그 수는 구성된 {{< ui >}}Throttling Rate{{< /ui >}}를 기반으로 합니다. 예를 들어, {{< ui >}}Throttling Rate{{< /ui >}}가 60초 동안 `1000`개 이벤트로 설정되어 있고 프로세서가 활성화되는 순간 5,000개의 이벤트가 도착하는 경우:

- 프로세서는 처음에 1,000개의 이벤트를 통과시킵니다.
- 나머지 4,000개의 이벤트는 삭제됩니다.
- 이 초기 동작은 Quota 프로세서의 동작과 동일합니다.

### 용량 보충 속도 {#capacity-replenishment-rate}

Throttle 프로세서는 [일반 셀 속도 알고리즘][3]을 사용하며, 이를 통해 일정한 속도로 이벤트를 통과시킬 수 있습니다. 보충 속도는 Throttle 프로세서의 설정을 기반으로 하며 초당 일정 수의 이벤트가 통과하도록 허용합니다. 이 속도는 다음과 같이 계산할 수 있습니다.

$$\text"Throttle rate" / \text"Time window (in seconds)"$$

#### 예시 {#example}

다음 프로세서 설정을 사용하는 경우:
- 스로틀링 속도 = 1000개 이벤트
- 기간 = 60분(3,600초)

용량 보충 속도는 다음과 같습니다.

$$\text"1000 events" / \text"60 minutes" ≈ \text"17 events"/ \text"minute" ≈ \text"0.28 events"/ \text"second"$$

`T`이 프로세서가 활성화된 시간이고 해당 시점에 프로세서가 5000개의 이벤트를 수신하는 경우, `T`에 따라 프로세서가 통과시키는 이벤트 수는 다음과 같습니다.
- `T + 0`분(프로세서가 활성화된 시점):
    - 1000개의 이벤트가 처리되었습니다.
    - 4000개의 이벤트가 삭제되었습니다.
- `T + 1` 분: 최대 17개의 이벤트 처리 가능
- `T + 2`분: 최대 17개의 이벤트 처리 가능
- ...프로세서는 분당 최대 17개의 이벤트를 꾸준히 처리하고, 다음 분이 될 때까지 나머지를 삭제합니다.

**참고**: 보충 속도는 초기 용량 이후의 최대 처리량을 결정합니다. 필요한 경우 더 높거나 낮은 처리량을 위해 스로틀링 속도를 조정할 수 있습니다.

[1]: /ko/api/latest/observability-pipelines/#update-a-pipeline
[2]: /ko/observability_pipelines/processors/quota/
[3]: https://en.wikipedia.org/wiki/Generic_cell_rate_algorithm
[4]: /ko/observability_pipelines/search_syntax/logs/