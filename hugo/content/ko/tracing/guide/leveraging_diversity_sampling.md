---
further_reading:
- link: /tracing/trace_pipeline/trace_retention/
  tag: 설명서
  text: 보존을 위한 트레이스 인덱싱 제어
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: 아키텍처 센터
  text: '분산 트레이스 마스터하기: 데이터 볼륨 문제와 효율적인 샘플링을 위한 Datadog의 접근 방식'
title: Datadog 보존 정책을 이해하고 트레이스 데이터를 효율적으로 보존
---
## 중요한 트레이스를 수집 및 보존하기 {#ingesting-and-retaining-the-traces-you-care-about}

애플리케이션에서 생성되는 대부분의 트레이스는 반복적이므로, 이를 모두 수집하고 보존하는 것이 반드시 필요한 것은 아닙니다. 성공적인 요청의 경우, 매초 수십 개의 개별 트레이스를 모두 스캔할 수는 없으므로 애플리케이션 트래픽의 **대표 샘플**을 보존하는 것으로 충분합니다.

가장 중요한 것은 인프라의 잠재적 문제 징후를 포함하는 트레이스, 즉 **오류나 비정상적인 지연 시간이 있는 트레이스**입니다. 또한, **비즈니스에 중요한 특정 엔드포인트**의 경우 고객 문제를 매우 자세하게 조사하고 해결할 수 있도록 트래픽의 100%를 보존하는 것이 좋습니다. 

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt="관련 트레이스는 고지연 트레이스, 오류 트레이스, 비즈니스 중요 트레이스의 조합을 저장하여 보존됩니다." style="width:80%;" >}}


## Datadog 보존 정책을 통해 중요한 것을 보존하기 {#how-datadogs-retention-policy-helps-you-retain-what-matters}

Datadog은 15분이 지난 데이터를 보존하는 두 가지 방법을 제공합니다. 
- 항상 활성화되어 있는 [지능형 보존 필터](#diversity-sampling-algorithm-intelligent-retention-filter).
사용자가 직접 구성할 수 있는 - [사용자 지정 태그 기반 보존 필터](#tag-based-retention-filters).

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="Datadog은 지능형 보존 필터를 통해 관련 오류 및 지연 시간 트레이스를 캡처하고, 사용자 지정 보존 필터를 통해 비즈니스에 중요한 트레이스를 캡처합니다." style="width:80%;" >}}


### 다양성 샘플링 알고리즘: 지능형 보존 필터 {#diversity-sampling-algorithm-intelligent-retention-filter}

기본적으로 지능형 보존 필터는 수십 개의 커스텀 보존 필터를 만들 필요 없이 대표적인 트레이스 항목을 유지합니다.

지연 시간 백분위수 `p75`, `p90`, `p95`에 대해 최대 15분마다 `environment`, `service`, `operation`, `resource`의 각 조합에 대해 최소 하나의 스팬(및 관련 분산 트레이스)과 각 고유 응답 상태 코드에 대해 대표적인 오류 항목을 유지합니다.

자세한 내용은 [지능형 보존 필터 문서][1]를 참조하세요.

### 태그 기반 보존 필터 {#tag-based-retention-filters}

[태그 기반 보존 필터][2]는 비즈니스에 가장 중요한 트레이스를 유지할 수 있는 유연성을 제공합니다. 보존 필터로 스팬을 인덱싱하면 관련 트레이스도 함께 저장되므로 전체 요청과 분산 컨텍스트에 대한 가시성을 유지할 수 있습니다.

## 인덱싱된 스팬 데이터를 효과적으로 검색 및 분석하기 {#searching-and-analyzing-indexed-span-data-effectively}

다양성 샘플링으로 캡처된 데이터 세트는 **균등하게 샘플링되지 않습니다**. 즉, 전체 트래픽을 비례적으로 대표하지 않습니다. 이는 오류 및 높은 지연 시간 트레이스에 편향되어 있습니다. 균등하게 샘플링된 데이터 세트만을 기반으로 분석을 구축하려면 Trace Explorer에서 `-retained_by:diversity_sampling` 쿼리 파라미터를 추가하여 다양성을 이유로 샘플링된 이러한 스팬을 제외합니다.

예를 들어, 애플리케이션에서 판매자 계층별로 그룹화된 체크아웃 작업 수를 측정하는 경우 **다양성 샘플링 데이터 세트를 제외**하면 대표 데이터 세트를 기반으로 분석을 수행할 수 있습니다. 따라서 `basic`, `enterprise` 및 `premium` 체크아웃 비율이 현실적으로 이루어집니다.

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="계층별 체크아웃 작업 수, 다양성 샘플링 데이터를 제외한 분석" style="width:80%;" >}}

반면, 판매자 계층별 고유 판매자 수를 측정하려면 **다양성 샘플링 데이터 세트를 포함**하세요. 커스텀 보존 필터에 잡히지 않는 추가 판매자 ID를 확인할 수 있습니다.

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="계층별 고유 판매자 수. 다양성 샘플링 데이터가 포함된 분석" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /ko/tracing/trace_pipeline/trace_retention