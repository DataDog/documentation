---
algolia:
  tags:
  - metrics without limits
aliases:
- /ko/metrics/faq/metrics-without-limits/
- /ko/metrics/guide/metrics-without-limits-getting-started/
- /ko/metrics/faq/why-is-my-save-button-disabled/
description: 쿼리 가능한 태그를 선택하여 사용자 지정 메트릭의 수집과 인덱싱을 분리하여 메트릭 볼륨과 비용을 제어합니다.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: 블로그
  text: Metrics without Limits™을 사용하여 사용자 지정 메트릭 볼륨을 동적으로 제어
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 메트릭을 최대한으로 활용해 보세요.
title: Metrics without Limits™
---
## 개요 {#overview}

Metrics without Limits™는 사용자 지정 메트릭 수집과 인덱싱을 분리하여 사용자 지정 메트릭 볼륨을 유연하게 제어하고 관리할 수 있도록 지원합니다. 조직에 가치가 있는 사용자 지정 메트릭 태그에 대해서만 비용을 지불합니다.

Metrics without Limits™에서는 Datadog 전체에서 계속 쿼리할 수 있도록 허용 목록에 포함할 태그를 선택하여 앱에서 모든 메트릭 유형의 태그를 구성할 수 있습니다. 그러면 애플리케이션 수준 또는 비즈니스 메트릭에 연결된 불필요한 태그(예: `host`)가 자동으로 제거됩니다. 또는 앱에서 제외하고 삭제할 태그의 차단 목록을 구성할 수도 있습니다. 그러면 팀에 비즈니스 가치를 제공하는 나머지 필수 태그가 자동으로 유지됩니다. 이러한 구성 기능은 [Metrics Summary][1] 페이지에서 사용할 수 있습니다.

이 페이지에서는 관측 가능성 예산 내에서 사용자 지정 메트릭 볼륨을 관리하는 데 도움이 되는 Metrics without Limits™의 주요 구성 요소를 설명합니다.

### 단일 메트릭의 태그 구성 {#configuration-of-tags-for-a-single-metric}

#### 태그 허용 목록 {#allowlist-of-tags}

1. 아무 메트릭 이름이나 클릭하면 세부 정보 사이드 패널이 열립니다. 
2. **Manage Tags**를 클릭한 다음 **Include tags**를 클릭하여 대시보드, 노트북, 모니터 및 기타 Datadog 제품에서 계속 쿼리할 수 있도록 유지할 태그를 구성합니다.
3. 태그 허용 목록을 정의합니다. 
기본적으로 태그 구성 모달에는 지난 30일 동안 대시보드, 노트북, 모니터 또는 API를 통해 활발하게 쿼리된 태그에 대해 Datadog에서 권장하는 태그 허용 목록이 미리 채워져 있습니다. 권장 태그는 선 그래프 아이콘으로 구분됩니다. 
   a. 또한 자산(대시보드, 모니터, 노트북 및 SLO)에서 사용되는 태그를 포함합니다. 이러한 태그는 자산에서 사용되지만 활발하게 쿼리되지는 않으며, 대상 아이콘으로 표시됩니다. 이 태그를 추가하면 중요한 자산에 대한 가시성을 잃지 않을 수 있습니다. 
4. 이 잠재적 태그 구성으로 인해 인덱싱되는 사용자 지정 메트릭의 *Estimated New Volume*을 검토합니다.
5. **Save**를 클릭합니다.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="허용 목록을 사용한 태그 구성" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="고객이 MWL 구성에서 자산에 사용되는 태그를 추가할 수 있음을 보여줍니다." style="width:100%" >}}

메트릭 API로 태그 설정을 [생성][2], [편집][3], [삭제][4], [영향력 추정][5]할 수 있습니다.

#### 태그 차단 목록 {#blocklist-of-tags}

1. 아무 메트릭 이름이나 클릭하면 세부 정보 사이드 패널이 열립니다.
2. **Manage Tags**를 클릭한 다음 **Exclude Tags**를 클릭합니다. 
3. 태그 차단 목록을 정의합니다. 차단 목록에 정의된 태그는 대시보드와 모니터에서 쿼리할 수 **없습니다**. 지난 30일 동안 대시보드, 노트북, 모니터 및 API를 통해 활발하게 쿼리된 태그는 선 그래프 아이콘으로 구분됩니다.
4. 이 잠재적 태그 구성으로 인해 인덱싱되는 사용자 지정 메트릭의 *Estimated New Volume*을 검토합니다.
5. **Save**를 클릭합니다.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="태그 제외를 사용한 태그 구성" video=true style="width:100%" >}}

태그 차단 목록을 [생성][2]하고 [편집][3]하려면 Metrics API에서 `exclude_tags_mode: true` 파라미터를 설정합니다.

**참고:** 메트릭에서 태그를 관리하려면 메트릭 유형이 선언되어 있어야 합니다. 일반적으로 메트릭을 제출할 때 선언되지만, Metrics Summary에서 메트릭의 `Edit` 버튼을 사용하여 수동으로 선언할 수도 있습니다.

#### API 사용 {#use-the-api}

메트릭 API로 태그 설정을 [생성][2], [편집][3], [삭제][4], [영향력 추정][5]할 수 있습니다.

### 한 번에 여러 메트릭 설정 {#configure-multiple-metrics-at-a-time}

[대량 메트릭 태그 구성 기능][7]을 사용하여 사용자 지정 메트릭 볼륨을 최적화합니다. 구성할 메트릭을 지정하려면 Metrics Summary 페이지에서 **Configure Metrics**를 클릭한 다음 **Manage Tags***를 클릭합니다. 구성할 메트릭 또는 메트릭 네임스페이스를 선택한 다음, 다음 중 하나를 수행합니다.
   - [Allow all tags](#allow-all-tags)를 선택하여 이전의 모든 태그 구성을 재정의하고 모든 태그를 쿼리할 수 있도록 합니다.
   - [Include or exclude tags](#include-or-exclude-tags)를 선택하여 각각 쿼리 가능한 태그와 쿼리할 수 없는 태그를 정의합니다.

#### Allow all tags {#allow-all-tags}

{{< img src="metrics/bulk_allow_all_tags.png" alt="태그 구성 섹션에서 Allow all tags가 선택된 Manage Tags 옵션." style="width:100%" >}}

이 옵션은 기본적으로 선택되어 있으며, 이전에 설정한 태그 구성을 재정의하여 모든 태그를 쿼리할 수 있도록 합니다.

#### 태그 포함 또는 제외 {#include-or-exclude-tags}

포함하거나 제외할 태그를 선택할 때는 [기존 태그 구성 재정의](#override-existing-tag-configurations) 또는 [기존 태그 구성 유지](#keep-existing-tag-configurations)를 선택합니다.

##### 기존 태그 구성 재정의 {#override-existing-tag-configurations}

{{< img src="metrics/bulk_include_tags.png" alt="태그 구성 섹션에서 Include tags와 Override가 선택된 Manage Tags 옵션. 지난 90일 동안 대시보드 및 모니터에서 활발하게 쿼리된 태그와 Specific tags 옵션이 선택되어 있습니다." style="width:100%" >}}

선택한 메트릭에 대한 기존의 모든 태그 구성이 재정의되며, 새 태그 구성을 정의합니다. 이를 통해 모든 메트릭 이름에서 모든 태그를 쿼리할 수 있도록 설정할 수 있습니다. **Include tags**를 선택하는 경우 다음 중 하나 또는 둘 다를 포함하도록 선택할 수 있습니다.
   - 지난 30일, 60일 또는 90일 동안 Datadog에서 활발하게 쿼리된 태그.
   - 사용자가 정의한 특정 태그 집합.

##### 기존 태그 구성 유지 {#keep-existing-tag-configurations}

{{< img src="metrics/bulk_exclude_tags.png" alt="태그 구성 섹션에서 Exclude tags와 Keep이 선택된 Manage Tags 옵션." style="width:100%" >}}

기존 태그 구성은 유지되며, 구성에 추가할 새 태그를 정의합니다.

#### API 사용 {#use-the-api-1}

API를 통해 여러 메트릭의 태그를 [구성][13]하고 [삭제][14]할 수 있습니다.

**참고**: 지정된 기간 내에 활발하게 쿼리된 태그만 포함하려면 `include_actively_queried_tags_window` 속성을 사용합니다.

## Metrics without Limits™ 청구 {#metrics-without-limits-billing}

태그를 구성하면 어떤 사용자 지정 메트릭을 쿼리할 수 있는지 제어할 수 있으므로 청구 대상 사용자 지정 메트릭 수를 줄일 수 있습니다. Metrics without Limits™는 수집 비용과 인덱싱 비용을 분리합니다. Datadog로 모든 데이터(모든 데이터가 수집됨)를 계속 전송하면서 Datadog 플랫폼에서 계속 쿼리할 수 있도록 유지할 태그의 허용 목록을 지정할 수 있습니다. 구성된 메트릭에 대해 Datadog가 수집하는 데이터 볼륨과 인덱싱되는 더 작은 나머지 볼륨이 서로 다른 경우 Usage 페이지와 Metrics Summary 페이지에서 두 개의 서로 다른 볼륨을 확인할 수 있습니다. 

- **Ingested Custom Metrics**: 수집된 모든 태그를 기준으로 한 원래의 사용자 지정 메트릭 볼륨입니다.
- **Indexed Custom Metrics**: Datadog 플랫폼에서 계속 쿼리할 수 있는 사용자 지정 메트릭 볼륨입니다(Metrics without Limits™ 구성 기준).

**참고: 카디널리티 가격 책정에서는 Metrics without Limits™로 구성된 메트릭만 Ingested Custom Metrics 볼륨에 반영됩니다.** 메트릭이 Metrics without Limits™로 구성되지 않은 경우, 인덱싱된 사용자 지정 메트릭 볼륨에 대해서만 요금이 부과됩니다.

[Custom Metrics 청구][8]에 대해 자세히 알아보세요.

### Metric Name 요금제 사용 시 {#under-metric-name-pricing}

조직에서 카디널리티 요금제 대신 [Metric Name 요금제][15]를 사용하는 경우, 수집과 인덱싱 간의 관계는 다음과 같이 다르게 동작합니다.

| 항목                                       | 카디널리티 요금제                                              | Metric Name 요금제                                                                  |
|----------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| 수집된 볼륨에 기여하는 메트릭 | Metrics without Limits™로 구성된 메트릭만 | 모든 메트릭(제출된 모든 데이터 포인트) |
| Distribution 메트릭 배수               | Metrics without Limits™ 구성에 따라 동작        | 구성과 관계없이 수집 및 인덱싱 모두에 적용                     |

모델에 대한 자세한 내용은 [Metric Name Pricing for Custom Metrics][15]를 참조하세요.

## Metrics without Limits™ 시작하기 {#getting-started-with-metrics-without-limits}

1. Metrics Summary 페이지나 [API][2]를 사용하여 [Plan & Usage 페이지][9]에서 상위 20개 메트릭을 구성하세요.
   대량 메트릭 구성(`*` 구문)을 사용하여 여러 메트릭의 태그를 구성할 수 있습니다. Datadog는 대량 구성 작업이 완료되면 알려줍니다.

**참고:** [Create Tag Configuration API][2]를 사용하는 경우에는 태그 구성을 생성하기 전에 먼저 [태그 구성 카디널리티 추정기 API][5]를 사용하여 태그 구성의 잠재적인 영향을 검증합니다. UI 또는 추정기 API에서 반환된 인덱싱 결과 수가 수집된 수보다 큰 경우에는 태그 구성을 저장하지 마세요.

2. 쿼리되지 않는 메트릭을 빈 태그 구성으로 구성합니다.

   팀이 Datadog 플랫폼에서 절대 쿼리되지 않는 메트릭을 계속 정리해 감에 따라 빈 태그 허용 목록으로 태그를 설정하여 이러한 쿼리되지 않는 메트릭의 비용을 즉시 최소화할 수 있습니다. 

3. 사용량 및 청구를 검토합니다. 메트릭을 구성한 후에는 다음 세 가지 방법으로 변경 사항의 영향을 확인할 수 있습니다. 

   - 구성을 저장하기 전에 태그 구성 카디널리티 추정기는 인덱싱된 사용자 지정 메트릭의 예상 결과 수를 반환하며, 이 값은 수집된 사용자 지정 메트릭 볼륨보다 작아야 합니다.
   - 구성을 저장한 후에는 Metrics Summary 세부 정보 사이드 패널에서 Indexed Custom Metrics가 Ingested Custom Metrics 볼륨보다 적게 표시되어야 합니다.
   - 구성을 저장한 후 24시간이 지나면 Plan & Usage 페이지의 **Top Custom Metrics** 표에서도 변경 사항의 영향을 확인할 수 있습니다. 이 표의 **Month-to-Date** 탭과 **Most Recent Day** 탭을 비교하면 사용자 지정 메트릭 볼륨이 감소한 것을 확인할 수 있습니다.

## 모범 사례 {#best-practices}

- 실시간 [예상 사용자 지정 메트릭 사용량][10] 메트릭에 경보를 설정하면 사용자 지정 메트릭의 급증과 구성을 서로 상호 연결할 수 있습니다.

- Metrics without Limits™에는 [역할 기반 액세스 제어][11]도 제공되므로 청구에 영향을 미치는 이 기능을 사용할 수 있는 사용자 권한을 제어할 수 있습니다.

- 감사 이벤트를 사용하면 사용자 지정 메트릭 급증과 관련될 수 있는 태그 구성이나 백분위수 애그리게이션 변경 사항을 추적할 수 있습니다. [이벤트 스트림][12]에서 "tags:audit" 및 "queryable tag configuration" 또는 "percentile aggregations"을 검색합니다.

\*Metrics without Limits는 Datadog, Inc.의 상표입니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /ko/api/latest/metrics/#create-a-tag-configuration
[3]: /ko/api/latest/metrics/#update-a-tag-configuration
[4]: /ko/api/latest/metrics/#delete-a-tag-configuration
[5]: /ko/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /ko/metrics/#time-and-space-aggregation
[7]: /ko/metrics/summary/#configuration-of-multiple-metrics
[8]: /ko/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /ko/account_management/billing/usage_metrics/
[11]: /ko/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[13]: /ko/api/latest/metrics/#configure-tags-for-multiple-metrics
[14]: /ko/api/latest/metrics/#delete-tags-for-multiple-metrics
[15]: /ko/account_management/billing/metric_name_pricing/