---
further_reading:
- link: /tracing/trace_pipeline/trace_retention/
  tag: 설명서
  text: 보존을 위한 트레이스 인덱싱 제어
title: Datadog 보존 정책을 이해하고 트레이스 데이터를 효율적으로 보존
---

## 중요한 트레이스를 수집 및 보존하기

애플리케이션에서 생성되는 대부분의 트레이스는 반복적이며, 모든 트레이스를 수집하고 보존하는 것이 필수 사항은 아닙니다. 성공적인 요청의 경우, 매초 수십 개의 개별 추적 요청을 스캔할 수 없기 때문에 애플리케이션 트래픽의 **대표 샘플**을 보존하는 것으로 충분합니다.

가장 중요한 것은 인프라의 잠재적인 문제 증상이 포함된 트레이스, 즉 **오류 또는 비정상적인 대기 시간이 있는 트레이스**입니다. 또한 **비즈니스에 중요한 특정 엔드포인트**의 경우 고객 문제를 자세히 조사하고 해결할 수 있도록 트래픽을 100% 보존하는 것이 좋습니다.

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt="대기 시간이 긴 트레이스, 오류 트레이스 및 비즈니스에 중요한 트레이스 조합을 저장하여 관련 트레이스를 보존합니다." style="width:80%;" >}}


## Datadog 보존 정책을 통해 중요한 것을 보존하기

Datadog은 15분이 지난 데이터를 보존하는 두 가지 방법을 제공합니다.
- 항상 활성화되어 있는 [지능형 보존 필터](#diversity-sampling-algorithm-intelligent-retention-filter).
- 수동으로 설정할 수 있는 [커스텀 태그 기반 보존 필터](#tag-based-retention-filters).

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="Datadog은 지능형 보존 필터를 통해 관련 오류 및 대기 시간 트레이스를 캡처하고 커스텀 보존 필터를 통해 비즈니스에 중요한 트레이스를 캡처합니다." style="width:80%;" >}}


### 다양성 샘플링 알고리즘: 지능형 보존 필터

기본적으로 지능형 보존 필터는 수십 개의 커스텀 보존 필터를 만들 필요 없이 대표적인 트레이스 항목을 유지합니다.

지연 시간 백분위수 `p75`, `p90`, `p95`에 대해 15분 마다 `environment`, `service`, `operation`, `resource`의 각 조합에 대한 최소 하나의 스팬(및 관련 분산 트레이스)과 각 고유 응답 상태 코드에 대해 대표적인 오류 항목을 유지합니다.

자세한 내용은 [지능형 보존 필터 문서][1]를 참조하세요.

### 태그 기반 보존 필터

[태그 기반 보존 필터][2]는 비즈니스에 가장 중요한 트레이스를 유지할 수 있는 유연성을 제공합니다. 보존 필터로 스팬을 인덱싱할 때 관련 트레이스도 저장되므로 전체 요청과 해당 분산 컨텍스트에 대한 가시성을 유지할 수 있습니다.

## 인덱싱된 스팬 데이터를 효과적으로 검색 및 분석하기

다양성 샘플링으로 캡처된 데이터 세트는 **균일하게 샘플링되지 않습니다**(즉, 전체 트래픽을 비례적으로 대표하지 않습니다). 오류와 대기 시간이 긴 트레이스에 편향되어 있습니다. 균일하게 샘플링된 데이터 세트 위에서만 분석을 작성하려면 Trace Explorer에 `-retained_by:diversity_sampling` 쿼리 파라미터를 추가하여 다양성을 위해 샘플링된 스팬을 제외하세요.

예를 들어, 애플리케이션에서 판매자 계층별로 그룹화된 체크아웃 작업 수를 측정하는 경우 **다양성 샘플링 데이터 세트를 제외**하면 대표 데이터 세트를 기반으로 분석을 수행할 수 있습니다. 따라서,  `basic`, `enterprise`, `premium` 체크아웃 비율이 현실적으로 이루어집니다.

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="계층별 체크아웃 작업 수, 다양성 샘플링 데이터를 제외한 분석" style="width:80%;" >}}

반면, 판매자 계층별 고유 판매자 수를 측정하려면 **다양성 샘플링 데이터 세트를 포함**하세요. 커스텀 보존 필터에 잡히지 않는 추가 판매자 ID를 확인할 수 있습니다.

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="계층별 고유 판매자 수. 다양성 샘플링 데이터를 포함하는 분석" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /ko/tracing/trace_pipeline/trace_retention