---
description: 필요한 RUM 데이터를 저장할 수 있도록 보존 필터의 순서를 정하는 모범 사례를 알아보세요.
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: 설명서
  text: 보존 필터
- link: /real_user_monitoring/rum_without_limits/
  tag: 설명서
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: 설명서
  text: 메트릭으로 성능 분석
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: 블로그
  text: 보존 필터로 프론트엔드 및 백엔드 데이터 통합 및 상호 연결
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: 학습 센터
  text: '인터랙티브 실험실: RUM 보존 필터'
title: 보존 필터 모범 사례
---
{{< learning-center-callout header="학습 센터에서 RUM 보존 필터 사용해 보기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  RUM 보존 필터를 사용하여 저장할 세션 데이터를 제어하고 관측 가능성 예산을 최적화하는 방법을 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

RUM without Limits를 사용하면 모든 세션 데이터를 캡처하면서 조직에 가치 있는 세션만 보존할 수 있습니다. 이 도구는 세션 데이터 수집과 인덱싱을 분리하여 데이터 관리를 개선합니다.

## 주요 기능 {#key-features}

- **동적 보존 필터**: 코드를 변경하지 않고 보관할 데이터를 조정합니다.
- **포괄적인 메트릭**: 메트릭은 100%의 세션을 반영하여 전체 가시성을 보장합니다.
- **대상 세션 보존**: 비용 최적화를 위해 중요한 세션 데이터의 우선순위를 지정합니다.

이 가이드는 관측 가능성 예산 내에서 RUM 세션 볼륨을 효과적으로 관리하기 위한 전략을 제공합니다.

## 보존 필터 순서 지정 이해{#understanding-retention-filter-sequencing}

RUM 보존 필터를 사용하면 보존할 사용자 세션을 선택할 수 있습니다. 작동 방식은 다음과 같습니다.

각 세션에는 여러 이벤트(탐색을 나타내는 조회, 사용자 액션, 오류, 네트워크 요청을 나타내는 리소스 등)가 포함되어 있으며, 각 이벤트에는 속성(기간, 컨텍스트 등)이 풍부하게 담겨 있습니다. 시스템은 각 이벤트를 보존 필터와 개별적으로 대조합니다.

1. **세션 보존**: 세션 내의 이벤트 중 하나 이상이 보존 필터와 일치하고 보존을 위해 샘플링되면 전체 세션이 보존됩니다.
2. **세션 삭제**: 세션이 종료될 때까지 보존 필터와 일치하는 이벤트가 없으면 전체 세션이 제거됩니다.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-3.png" alt="보존 필터 작동 방식을 보여주는 순서도: 1. 세션의 이벤트를 필터와 대조하여 확인, 2. 이벤트가 일치하고 선택되면 전체 세션이 보존됨, 3. 일치하는 이벤트가 없으면 세션이 삭제됨" style="width:80%" >}}

### 다양한 이벤트 유형의 작동 방식 {#how-different-event-types-work}

일부 이벤트(오류 및 액션 등)는 발생 후 변경할 수 없습니다. Datadog에서는 이를 **변경 불가능한 이벤트**라고 합니다. 다른 이벤트(세션 및 조회 등)는 사용자가 앱을 계속 사용하는 동안 변경될 수 있습니다. Datadog에서는 이를 **변경 가능한 이벤트**라고 합니다.

- **변경 불가능한 이벤트**(액션, Error, Resource, Long Task 및 Vital [이벤트][1])는 필터에 대해 **한 번만** 확인되며 생성된 후에는 변경할 수 없습니다.

  1. 이벤트는 태그 및 속성과 일치하는 첫 번째 필터에서 중지됩니다.
  2. 난수가 생성되어 필터의 샘플링 비율과 비교하여 이벤트를 보존할지 삭제할지 결정합니다.
  3. 이벤트가 보존되면 전체 세션(이전의 모든 이벤트 포함)이 보존되며, 동일한 세션에서 발생하는 향후 이벤트는 보존 필터를 자동으로 건너뜁니다.
  4. 이벤트가 삭제되면 다른 필터에 의해 평가되지 않지만, 동일한 세션의 다른 이벤트는 계속해서 독립적으로 처리됩니다.

- **변경 가능한 이벤트**(세션, 조회)는 업데이트될 때마다 다시 확인됩니다.
  - 조회 및 세션 이벤트는 시간이 지남에 따라 변경될 수 있으므로 변경 불가능한 이벤트와 다릅니다. 이러한 이벤트는 내부에서 새로운 이벤트가 발생할 때마다 업데이트됩니다.
  - [변경 불가능한 이벤트](#immutable-events)가 한 번만 평가되는 것과 달리, 조회 및 세션 이벤트는 업데이트될 때마다 보존 필터에 대해 재평가됩니다. 이는 필터와 처음 일치할 때까지 계속됩니다.

## 모범 사례 {#best-practices}

### 보존 필터 순서 지정{#ordering-retention-filters}

[보존 필터][2]의 순서는 중요합니다. Datadog에서는 가장 구체적이고 샘플링 비율이 높은 필터를 목록 상단에, 가장 일반적이고 샘플링 비율이 낮은 필터를 하단에 배치하는 것을 권장합니다.

예를 들어, 충돌 이벤트(`@error.is_crash:true` 속성이 있는 오류 이벤트)가 있다고 가정해 보겠습니다. 이 이벤트는 둘 이상의 필터와 일치할 수 있지만, 목록에서 처음으로 일치하는 필터에 대해서만 평가됩니다.

- 아래 예시에서는 'Crashes' 보존 필터가 더 일반적인 'All errors' 필터 위에 배치됩니다. 즉, 모든 충돌 세션은 'Crashes' 필터와 먼저 일치하므로 보존됩니다.

  | ✅ 권장 |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-good-3.png" alt="좋은 필터 순서 예시: 1. 리플레이가 있는 세션(100% 보존), 2. 충돌 세션(100% 보존), 3. 모든 오류 세션(50% 보존). 이렇게 하면 충돌이 항상 캡처됩니다." style="width:100%" >}} |

- 다음 예시에서는 더 일반적인 'All errors' 필터가 'Crashes' 필터보다 앞에 옵니다. 이 때문에 충돌 세션은 'All errors' 필터에 의해 선택된 경우에만 보존됩니다(예: 샘플링 비율이 50%인 경우). 선택되지 않으면 'Crashes' 필터에 의해 평가되지 않으며 해당 세션은 손실됩니다.

  | ❌ 권장하지 않음 |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-bad-3.png" alt="좋지 않은 필터 순서 예시: 1. 리플레이가 있는 세션(100% 보존), 2. 모든 오류 세션(50% 보존), 3. 충돌 세션(100% 보존). 이 경우, 일반 오류 필터와 먼저 일치하지 않으면 충돌 세션이 손실될 위험이 있습니다." style="width:100%" >}} |

### 남은 세션을 캡처하기 위한 폴백 필터 {#fallback-filters-for-capturing-remaining-sessions}

목록 하단의 폴백 필터는 다른 필터와 일치하지 않은 소수의 세션을 캡처합니다. 폴백 필터 쿼리에 항상 `@session.is_active:false`를 포함해야 합니다.

- **`@session.is_active:false`** 사용 시: 폴백 필터는 완료된 세션만 평가하므로 다른 필터가 세션을 먼저 캡처할 수 있습니다.

  | ✅ 권장 |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-good-3.png" alt="좋은 폴백 필터 예시: 1. 리플레이가 있는 세션(100% 보존), 2. 5초 이상 지속된 세션(100% 보존), 3. 활성 상태가 아닌 세션(10% 보존). 이렇게 하면 다른 필터가 세션을 먼저 캡처할 기회를 얻게 됩니다." style="width:100%" >}} |
  
- **`@session.is_active:false`** 미사용 시: 폴백 필터가 모든 세션을 즉시 캡처하여 더 구체적인 필터보다 우선 적용될 수 있습니다.

  | ❌ 권장하지 않음 |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-bad-3.png" alt="좋지 않은 폴백 필터 예시: 1. 리플레이가 있는 세션(100% 보존), 2. 5초 이상 지속된 세션(100% 보존), 3. 모든 세션(10% 보존). 이 경우 모든 세션을 즉시 캡처하여 더 구체적인 필터가 무시될 위험이 있습니다." style="width:100%" >}} |

### 세션 제외 {#excluding-sessions}

단일 필터가 이벤트의 하위 집합과 일치하지 않게 하려면 해당 필터의 쿼리에 제외 조건을 추가하세요. [보존 필터를 사용하여 세션 제외][3]를 참조하세요.

모든 사용자 지정 보존 필터에 걸쳐 이벤트를 한 번에 제외하려면, 모든 쿼리에서 동일한 제외 설정을 반복하지 말고 [제외 필터][4]를 사용하세요.

## 제안된 보존 필터 및 사용 사례 {#suggested-retention-filters-and-use-cases}
아래에서는 기본 필터 세트, 제안된 필터 및 일반적인 사용 사례에 대해 설명합니다.

| 필터 유형 | 쿼리 예시 | 사용 시기 | 보존율 |
|-------------|---------------|-------------|----------------|
| 리플레이가 있는 세션 | `@session.has_replay:true` | 리플레이가 있는 세션을 보존하여 시스템이 세션 리플레이가 있는 세션을 삭제하지 않도록 합니다. | 100% |
| 오류가 있는 세션 | `@type:error` | 최소 1개의 오류가 포함된 모든 세션을 보존하기 위해 적용할 수 있는 기본 필터입니다. | 100% |
| 충돌이 있는 세션 | `@type:error @error.is_crash:true` | 충돌로 종료된 모든 세션을 보존하는 데 적용할 수 있는 필터입니다. | 100% |
| 세션 | `@type:session` | 목록의 마지막에 배치되는 기본 보존 필터로, 모든 세션에 적용되어 일정 비율의 세션을 보존하거나 폐기할 수 있습니다. | 변수 |
| 앱 버전 | `@type:session version:v1.1.0-beta` | 앱 버전(베타, 알파 또는 특정 버전)별로 필터링하면 특정 빌드의 모든 세션이 보존되어 상세 분석 및 문제 해결이 가능합니다. | 100% |
| 환경 | `@type:session environment:stage` | 다양한 빌드 유형이나 환경에서 세션을 수집할 때는 스테이징 환경의 세션을 최소 100% 캡처하고, 개발/테스트 환경에서는 더 낮은 비율로 수집하세요. | 100% |
| Feature Flags | `@type:session feature_flags.checkout_type:treatment_v1` | 이미 Feature Flags를 사용 중이라면 특정 Feature Flags 처리가 포함된 세션을 100% 유지하도록 선택할 수 있습니다. | 100% |
| 사용자 지정 속성 | `@type:session @context.cartValue:>=500` | 세션 사용자 지정 속성을 포함하여 거의 모든 쿼리로 필터를 만들고 보존 기준을 지정하세요. 예를 들어, Datadog 데모 앱인 Shopist에서 장바구니 값은 사용자 지정 세션 속성입니다. 이를 통해 장바구니 값이 높은 세션을 보존하여 수익에 영향을 미치는 문제를 효율적으로 해결할 수 있습니다. | 변수 |
| 사용자 속성이 있는 세션 | `@type:session user.tier:paid` | 세션의 사용자 정보를 사용하여 필터를 만드세요. 예를 들어, 유료 티어 사용자의 모든 세션을 보존할 수 있습니다. | 100% |
| 특정 사용자가 포함된 세션 | `@type:session user.id:XXXXX` | 이 필터는 프로덕션 테스트 계정이나 정기적으로 애플리케이션을 테스트하는 임원과 같이 특정 사용자의 세션을 대상으로 지정할 수 있습니다. | 100% |
| 특정 액션이 포함된 세션 | `@type:action @action.name:XXXXX` | SDK가 기본적으로 자동 추적하는 특정 액션이나 코드에서 계측한 사용자 지정 액션이 포함된 세션을 보존할 수 있습니다. | 100% |
| 특정 지속 시간의 세션 | `@session.view.count :> 3 OR @session.time_spent :> 15000000000` | 사용자가 추가 작업이나 오류 없이 10초 동안 페이지를 보는 경우처럼 짧은 세션이 많이 보이면, 이러한 세션은 일반적으로 유용하지 않습니다. 지속 시간 보존 필터를 사용하여 이러한 세션을 줄일 수 있습니다. **참고**: 지속 시간 값은 나노초 단위로 입력하세요. 단위는 포함하지 마세요(예: 15초의 경우 `15000000000` 사용). | 변수 |
| 네트워크 오류 4XX 및 5XX가 포함된 세션 | `@type:resource @resource.status_code:>=400` | 프런트엔드 애플리케이션은 4XX 또는 5XX 상태 코드를 반환하는 다운스트림 서비스와 관련된 문제가 자주 발생합니다. 이 필터를 사용하면 오류 코드가 발생한 리소스 호출이 있는 모든 세션을 캡처할 수 있습니다. | 100% |


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[2]: /ko/real_user_monitoring/rum_without_limits/retention_filters/#how-it-works
[3]: /ko/real_user_monitoring/rum_without_limits/retention_filters#excluding-events-with-a-filter-query
[4]: /ko/real_user_monitoring/rum_without_limits/retention_filters#exclusion-filters