---
aliases:
- /ko/tracing/trace_queries
description: 트레이스 쿼리
further_reading:
- link: https://www.datadoghq.com/blog/trace-queries/
  tag: 블로그
  text: 트레이스 쿼리를 사용해 근본 원인과 프로덕션 이슈의 비즈니스 영향 분석
- link: tracing/trace_explorer
  tag: 설명서
  text: Trace Explorer
- link: /tracing/trace_explorer/query_syntax/
  tag: 설명서
  text: 스팬(span) 쿼리 구문
title: 트레이스 쿼리
---

## 개요

트레이스 쿼리를 사용하면 여러 스팬(span)의 속성과 트레이스 구조 내에서 해당 스팬(span) 간의 관계를 기반으로 전체 트레이스를 찾을 수 있습니다. 트레이스 쿼리를 만들려면 두 개 이상의 [스팬(span) 쿼리][1]를 정의한 다음 검색된 트레이스 구조 내에서 각 스팬(span) 쿼리에서 반환되는 스팬(span)의 관계를 지정합니다.

트레이스 쿼리 탐색기에서 트레이스를 검색, 필터링, 그룹화 및 시각화할 수 있습니다.

구조 기반 트레이스 쿼리를 사용하면 다음과 같은 문제에 대한 답할 수 있습니다.
- 두 개의 서비스 간 (`service A`에서 `service B`로 다운스트림 호출이 있는 경우)간에 종속성을 포함하는 트레이스는 무엇인가요?
- 어떤 API 엔드포인트가 내 오류 백엔드 서비스 의 영향을 받나요?

트레이스 쿼리를 사용하여 조사를 가속화하고 관련 트레이스를 찾아보세요. 
## 트레이스 쿼리 편집기

{{< img src="tracing/trace_queries/trace_query_editor.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Query editor" >}}

트레이스 쿼리는 두 개 이상의 [스팬(span) 쿼리 ](#span-queries)로 구성되며, [트레이스 쿼리 운영자](#trace-query-operators)가 참여합니다.

### 스팬(span) 쿼리

쿼리 특정 환경, 서비스 또는 [스팬(span) 쿼리 구문][1]을 사용하는 엔드포인트에서 스팬(span)을 사용할 수 있습니다. 자동 완성 제안을 사용하여 패싯과 최근 쿼리를 확인합니다.

**다른 스팬(span) 쿼리 ** 추가를 클릭하여 스팬(span) 쿼리를 추가하고 트레이스 쿼리문에 사용합니다.

### 트레이스 쿼리 연산자

`a`, `b`, `c` 등으로 레이블이 지정된 여러 개의 스팬(span) 쿼리 을 **트레이스 일치** 필드에서 추적하다 쿼리 으로 결합하고, 각 스팬(span) 쿼리 을 나타내는 문자 사이에 연산자를 사용합니다:

{{< img src="/tracing/trace_queries/traces_matching.png" alt="Span queries combined into a trace query" style="width:50%;" >}}

| 연산자 | 설명 | 예시 |
|-----|-----|-----|
| `&&` | **And**: 양 스팬이 트레이스에 있습니다. | 트레이스 스팬이 포함된 서비스 `web-store` 및 스팬이 포함된 서비스 `payments-go`: <br/>`service:web-store && service:payments-go` |
| `\|\|` | **Or**: 단일 또는 또 다른 스팬이 트레이스에 있습니다. | 서비스 `web-store` 또는 서비스 `mobile-store`의 스팬을 포함하는 트레이스: <br/> `service:web-store \|\| service:mobile-store` |
| `->` | **Indirect relationship**: 오른쪽 쿼리와 일치하는 스팬 업스트림인 왼쪽 쿼리과 일치하는 스팬(span)을 포함하는 트레이스 | 서비스 `checkoutservice`가 서비스 `quoteservice`의 업스트림인 트레이스: <br/>`service:checkoutservice -> service:quoteservice` |
| `=>` | **Direct relationship**: 오른쪽 쿼리와 일치하는 스팬의 직계 부모인 왼쪽 쿼리와 일치하는 스팬을 포함하는 트레이스 | 서비스 `checkoutservice`가 서비스 `shippingservice`로 직접 호출하는 트레이스: <br/>`service:checkoutservice => service:shippingservice` |
| `NOT` | **Exclusion**: 쿼리와 일치하는 스팬을 **포함하지 않는** 트레이스 | 서비스 `payments-go`가 아니라 서비스 `web-store`의 스팬을 포함하는 트레이스: <br/>`service:web-store && NOT(service:payments-go)` |

### 트레이스 수준 필터

스팬의 수 또는 **Where** 문 트레이스의 엔드투엔드 기간과 같은 트레이스 수준 속성에 필터를 적용하여 트레이스의 결과 집합을 추가로 필터링합니다.

{{< img src="/tracing/trace_queries/where_statement.png" alt="Trace-level filters example" style="width:100%;" >}}


| 필터링 | 설명 | 예시 |
|-----|-----|-----|
| `span_count(a)` | 스팬의 발생 횟수 | Mongo 데이터베이스에 대한 호출이 10개 이상 포함된 트레이스: <br/>- **queryA**:`service:web-store-mongo @db.statement:"SELECT * FROM stores`<br/> - **일치하는 트레이스**:`a`<br/> - **Where**:`span_count(a):>10`|
| `total_span_count` | 트레이스의 스팬 개수 | 1000개 이상의 스팬을 포함하는 트레이스: <br/>**Where**`total_span_count:>1000` |
| `trace_duration` | 엔드 투 엔드 트레이스 기간 | 엔드투엔드 간 실행 시간이 5초 이상인 경우 : <br/>**Where**:`trace_duration:>2s` |

## 흐름 맵

{{< img src="tracing/trace_queries/trace_flow_map.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Flow Map" >}}

플로우 맵은 결과 트레이스 쿼리와 일치하는 요청 경로 및 서비스 종속성을 이해하는 데 도움이 됩니다. 이 맵을 사용하여 오류 경로, 서비스 종속성 이상 또는 비정상적으로 높은 데이터베이스 요청률을 식별할 수 있습니다.

**참고**: 플로우 맵은 [수집된 트래픽 샘플](#the-data-that-trace-queries-are-based-on)을 기반으로 합니다.

스팬 쿼리와 일치하는 서비스 노드는 강조 표시되어 쿼리 조건이 대상으로 하는 트레이스 부분을 표시합니다.

**단일 서비스**에 대한 자세한 정보를 보려면 서비스 노드에 마우스를 가져가 메트릭에서 요청률과 오류율을 확인하세요. **두 개의 서비스** 간 요청률과 오류율에 대한 메트릭을 확인하려면 두 개의 서비스를 연결하는 엣지에 마우스를 가져가세요.

특정 서비스에 대한 종속성을 포함하지 않는 트레이스를 필터링하려면 맵에서 서비스 노드를 클릭합니다.

## 트레이스 목록

{{< img src="tracing/trace_queries/trace_list.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace List" >}}

트레이스 목록에는 쿼리와 일치하고 선택한 시간 범위 내에 있는 최대 50개의 샘플 트레이스에 표시됩니다.
지연 시간 분석에 마우스를 가져가면 요청 실행 중 서비스 시간이 어디에서 소비되는지 파악할 수 있습니다.

**참고**: 표에 표시된 정보는 트레이스의 루트 스팬 속성이며, 트레이스의 엔드투엔드 기간을 **표시하지** 않습니다.

## 분석

`Timeseries`, `Top List` 또는 `Table` 와 같은 다른 시각화 중 하나를 선택하여 하나 또는 여러 차원별로 그룹화하여 시간에 따른 결과를 집계합니다. 집계 옵션에 대한 자세한 내용은 [스팬 시각화][2]를 참조하세요. 

이러한 집계 옵션 외에도 스팬을 집계할 스팬 쿼리 (`a`, `b`, `c` 등)을 선택해야 합니다. 집계 옵션에서 태그 및 속성을 사용하는 스팬과 일치하는 쿼리를 선택합니다.

예를 들어 서비스 `web-store`(쿼리 `a`) 스팬과 및 서비스 `payments-go`(쿼리 `b`) 스팬 중 일부 오류가 있는 트레이스에 대해 쿼리를 사용하는 경우입니다, `@merchant.tier`로 그룹화된 스팬의 개수를 시각화하는 경우 `merchant.tier`는 서비스 `web-store`의 스팬이며 서비스 `payments-go` 속성이 아니므로 쿼리 `a`의 스팬을 사용해야 합니다.

{{< img src="tracing/trace_queries/timeseries_using_spans_from.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Timeseries view" >}}


## 트레이스 쿼리 데이터 수집 방법

Datadog는 [지능형 보존 필터][3]를 사용하여 트레이스 쿼리에 대한 데이터를 색인화합니다. 이를 위해 다음을 수행합니다.

- [플랫 샘플링](#1-flat-sampling): 수집된 스팬의 동일한 1% 샘플입니다.
- [다양성 샘플링](#diversity-sampling): 각 환경, 서비스, 운영 및 리소스에 대한 가시성을 유지하기 위해 대표적이고 다양한 트레이스를 선택합니다.

이 두 가지 샘플링 메커니즘은 **완전한 트레이스**를 캡처하므로 트레이스의 모든 스팬은 항상 색인화되어 트레이스 쿼리 정확한 결과를 반환할 수 있습니다.

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% Flat Sampling & Diversity Sampling" >}}

**참고**: 플랫 샘플링 및 다양성 샘플링으로 인덱싱된 스팬은 인덱싱된 스팬의 사용량에 포함되지 않으므로 **요금에 영향을 미치지 않습니다**.

### 1% 플랫 샘플링
`retained_by:flat_sampled`

1% 플랫 샘플링은 `trace_id`를 기준으로 적용되며, 이는 동일한 트레이스에 속한 모든 스팬이 동일한 샘플링 결정을 공유한다는 의미입니다. 자세한 내용은 [1% 플랫 샘플링 설명서][4]를 참조하세요.

### 다양성 샘플링
`retained_by:diversity_sampling`

다양성 샘플링은 15분마다 환경, 서비스, 운영 및 리소스의 각 조합에 대해 하나 이상의 스팬 및 관련 트레이스를 유지합니다. 트래픽이 적은 엔드포인트에서도 항상 서비스 및 리소스 페이지에서 예제 트레이스를 찾을 수 있도록 `p75`, `p90`, `p95`의 대기 시간 백분위수에 대해서 발생합니다. 자세한 내용은 [다양성 샘플링 설명서][5]를 참조하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_explorer/query_syntax/
[2]: /ko/tracing/trace_explorer/visualize/#timeseries
[3]: /ko/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[4]: /ko/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[5]: /ko/tracing/trace_pipeline/trace_retention/#diversity-sampling