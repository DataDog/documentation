---
further_reading:
- link: /tracing/trace_explorer/trace_queries/
  tag: 설명서
  text: 트레이스 쿼리
title: Trace Queries 소스 데이터
---

## 개요

Trace Queries를 사용하면 여러 스팬 속성과 트레이스 구조 내의 해당 스팬 간 관계를 기반으로 전체 트레이스를 찾을 수 있습니다. 자세히 알아보려면 [Trace Queries 설명서][1]를 읽어보세요.

{{< img src="tracing/trace_queries/trace_queries.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Queries UI" >}}

## 트레이스 쿼리 데이터 수집 방법

Datadog는 [지능형 보관 필터][6]를 사용하여 트레이스 쿼리에 대한 데이터를 인덱싱합니다. 이를 위해 다음을 실행합니다.

- [플랫 샘플링](#1-flat-sampling): 수집된 스팬의 동일한 1% 샘플입니다.
- [다양성 샘플링](#diversity-sampling): 각 환경, 서비스, 운영 및 리소스에 대한 가시성을 유지하기 위해 대표적이고 다양한 트레이스를 선택합니다.

이 두 개의 샘플링 메커니즘은 **완전형 트레이스**를 캡처합니다. 즉, 트레이스의 모든 스팬이 항상 인덱싱되어 Trace Queries가 제대로 작동할 수 있도록 합니다.

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% Flat Sampling & Diversity Sampling" >}}

**참고**: 플랫 샘플링 및 다양성 샘플링으로 인덱싱된 스팬은 인덱싱된 스팬의 사용량에 포함되지 않으므로 **청구서에 영향을 미치지 않습니다**.

### 1% 플랫 샘플링
`retained_by:flat_sampled`

플랫 1% 샘플링은 `trace_id`를 기반으로 적용됩니다 .즉, 동일한 트레이스에 속하는 모든 스팬이 동일한 샘플링 결정을 공유합니다. 자세히 알아보려면 [플랫 1% 샘플링 설명서][2]를 읽어보세요.

### 다양성 샘플링
`retained_by:diversity_sampling`

15분마다 다양성 샘플링 방식은 각 환경, 서비스, 운영 및 리소스 조합에 대해 최소 하나의 스팬과 연결된 트레이스를 보관합니다. `p75`, `p90` 및 `p95` 지연 백분위수에 발생하여 항상 서비스와 리소스 페이지에서 예시 트레이스를 찾을 수 있도록 해줍니다. 낮은 트래픽 엔드포인트에 대해서도 적용됩니다. 자세히 알아보려면 [다양성 샘플링 설명서][3]를 읽어보세요.

## Trace Queries 활성화의 영향

계정에서 Traces Queries가 활성화된 순간(이벤트 스트림에 게시된 이벤트에서 실제 날짜를 찾을 수 있음), 지능형 보관 필터는 완전형 트레이스를 캡처하는 동시에 더 많은 데이터 인덱싱을 시작합니다.

[트레이스 탐색기][4]에서 지능형 보관 필터로 인덱싱된 스팬을 쿼리할 수 있습니다. 그 결과 트레이스 탐색기 쿼리에 인덱싱된 스팬의 수가 급증하는 것을 발견할 수도 있습니다. 이러한 변화는 **Intelligent Retention Filter 변경** 이벤트를 보여주는 이벤트 오버레이로 표시됩니다.

플랫 1% 샘플링 방법 또는 다양성 샘플링 방법으로 샘플링된 스팬을 찾으려면 트레이스 탐색기에서 `retained_by:(flat_sampled OR diversity_sampling)` 쿼리 파라미터를 추가합니다.

{{< img src="tracing/trace_queries/intelligent_retention_filter_change.png" style="width:90%; background:none; border:none; box-shadow:none;" alt="이벤트 오버레이 지능형 보관 필터" >}}

지능형 보관 필터로 인덱싱된 스팬은 [Trace Analytics 모니터][5] 평가의 APM 쿼리에서 제외됩니다. 그러므로 모니터는 이러한 변경으로 인해 **영향을 받지 않습니다.**

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tracing/trace_explorer/trace_queries/
[2]: /ko/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[3]: /ko/tracing/trace_pipeline/trace_retention/#diversity-sampling
[4]: /ko/tracing/trace_explorer/
[5]: /ko/monitors/types/apm/?tab=traceanalytics
[6]: /ko/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter