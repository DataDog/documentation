---
description: 사용자 기반의 특정 그룹 또는 세그먼트를 분석하고 이해합니다.
further_reading:
- link: /product_analytics/
  tag: 설명서
  text: 제품 분석
title: 분할
---

## 개요

세분화는 사용자 기반의 특정 그룹 또는 세그먼트를 분석하고 이해할 수 있는 Product Analytics 기능입니다. 다양한 특성과 행동을 기반으로 사용자를 분류하여 인사인트를 파악하고 추세를 파악하며 데이터 기반 결정을 내려 제품과 사용자 경험을 최적화할 수 있습니다. 예를 들어 구매 금액, 특정 국가의 활성 사용자, 평가판 사용자 또는 평가판에서 유료 조직으로 전환한 사용자를 기준으로 사용자를 분류할 수 있습니다.

## 세그먼트 만들기

새 세그먼트를 만드려면 탐색에서 **[Digital Experience Monitoring > Product Analytics > User Segments][1]**로 이동합니다. 새 세그먼트를 만들 때 두 가지 소스를 선택할 수 있습니다.

- Product Analytics 데이터
- 외부 데이터(Reference Table 업로드)

{{< img src="product_analytics/segmentation/segmentation-1.png" alt="Product Analytics 또는 외부 데이터를 기반으로 사용자 세그먼트 만들기">}}

### Product Analytics 데이터 사용하기

Product Analytics 데이터를 사용하여 새 세그먼트를 만드는 방법:

1. 데이터를 연결하려는 사용자 속성을 선택합니다. 아래 예에서는 `usr.id`이지만 `usr.email` 또는 `usr.name` 등 사용 가능한 모든 사용자 속성을 사용할 수 있습니다.

2. **Filter your segment** 섹션에서 SDK에서 수집한 모든 속성 또는 세분화된 사용자 세그먼트를 만들기 위해 추가한 맞춤 속성을 필터링할 수 있습니다.

   아래 예에서 세그먼트는 `/cart` 페이지에 있었고 결제 버튼을 클릭한(브라질에서 클릭한) 모든 사용자로 필터링됩니다.

   {{< img src="product_analytics/segmentation/segmentation-2.png" alt="`/cart` 페이지에 있었고 결제 버튼을 클릭한 브라질에 있는 모든 사용자로 필터링합니다.">}}

### 외부 또는 타사 데이터 사용하기

외부 또는 타사 데이터를 사용하여 세그먼트를 만드는 방법:

1. Reference Table을 업로드하고 생성하는 방법은 [Reference Table][2] 문서를 참조하세요.
2. 데이터 유형(예: `usr.id`, `usr.name` 또는 `usr.email`)을 열 이름에 올바르게 연결했는지 확인하세요.
3. 정확성을 위해 Product Analytics에 세그먼트의 사용자에 대한 데이터가 있는지 확인하세요.

## Product Analytics 전반에 걸쳐 세그먼트 활용

###  Sankey에서

Sankey 페이지에서는 선택한 사용자 세그먼트를 반영하도록 시각화의 데이터를 필터링할 수 있습니다. 이를 통해 특정 세그먼트에 있는 특정 사용자 집합의 경험과 트래픽 패턴을 볼 수 있습니다. 아래 예에서는 "Premium users" 세그먼트의 사용자에만 해당하는 Sankey 다이어그램을 보여줍니다.

{{< img src="product_analytics/segmentation/segmentation-3.png" alt="선택한 사용자 세그먼트를 반영하도록 Sankey 시각화를 필터링합니다.">}}

### Analytics Explorer에서

특정 세그먼트에 속한 선택된 사용자 집합을 반영하도록 Analytics Explorer의 데이터를 필터링할 수 있습니다. 아래 예에서는 지난 달에 활성 상태였던 "Premium users" 세그먼트의 사용자 목록을 해당 사용자의 세션 수를 기준으로 구성하여 보여줍니다.

{{< img src="product_analytics/segmentation/segmentation-4.png" alt="지난달에 활성 상태였던 Premium users 세그먼트의 사용자 목록을 세션 수별로 구성하여 표시합니다.">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: /ko/integrations/guide/reference-tables/?tab=manualupload#validation-rules