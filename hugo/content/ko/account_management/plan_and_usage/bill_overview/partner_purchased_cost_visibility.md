---
description: 파트너를 통해 Datadog을 구매하는 경우, 청구 개요에서 일별 분석 및 제품 및 하위 조직 수준의 세부 정보와 함께 예상
  월간 누적 비용과 과거 Datadog 비용을 조회하십시오.
further_reading:
- link: /account_management/plan_and_usage/bill_overview/
  tag: 문서
  text: 청구 개요
- link: /account_management/plan_and_usage/
  tag: 문서
  text: 플랜 및 사용량
title: 파트너를 통해 구매하는 고객을 위한 비용 가시성
---
파트너를 통해 Datadog을 구매하는 경우, Datadog 조직의 [청구 개요][1] 페이지를 통해 Datadog 비용을 조회할 수 있습니다. 청구 개요는 예상 월간 누적 비용과 과거 비용에 대한 단일 조회 화면, 일별 비용 분석, 그리고 제품 및 하위 조직별로 비용을 그룹화하는 기능을 제공하므로 청구 기간 중 언제든지 Datadog 지출을 파악할 수 있습니다.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="비용 요약 헤더와 일별 비용 분석 누적 막대 차트를 조회할 수 있는 청구 개요 페이지." >}}

## 주요 기능 {#key-features}

- **예상 월간 누적 비용**: 청구서를 기다릴 필요 없이 월 중 언제든지 Datadog 비용의 누계액을 조회하십시오.
- **과거 비용**: 각 월이 마감된 후 이전 월의 비용을 조회하십시오. 데이터는 15개월 전까지, 또는 더 최근의 계약 변경이 있는 경우 해당 시점부터 제공됩니다.
- **일별 비용 분석**: 비용의 일별 막대 차트를 조회하여 비용 변화를 실시간으로 파악하십시오.
- **제품별 그룹화**: 인프라 호스트, 인덱싱된 로그 또는 사용자 지정 메트릭과 같은 제품 범주 및 청구 차원별로 비용을 분석하십시오.
- **하위 조직별 그룹화**: 여러 Datadog 하위 조직을 사용하는 경우, 각 하위 조직의 비용을 개별적으로 필터링하여 확인하십시오.

## 작동 방식 {#how-it-works}

파트너가 귀하의 요금을 Datadog과 공유합니다. Datadog은 해당 요금과 귀하의 사용 데이터를 사용하여 Datadog 비용을 계산하고 비용 가시성 기능을 채웁니다.

## 제한 사항 {#limitations}

### 기능 가용성 {#feature-availability}

- **고급 비용 가시성 기능은 지원되지 않습니다.** 여기에는 예상 비용, 태그별 비용 및 Cloud Cost Management의 [Datadog 비용][2]이 포함됩니다.
- **차감 계약이 없는 Cloud Marketplace 고객은 지원되지 않습니다.** AWS, Google Cloud 또는 Azure Marketplace를 통해 Datadog을 구매하고 차감 계약이 없는 경우, 비용 가시성을 사용할 수 없습니다. 이는 일부 직접 고객에게도 영향을 미치는 플랫폼 전체의 제한 사항입니다.
- **레거시 관리형 서비스 공급자 (MSP) 계약 (단일 계약 하의 다수 고객)은 지원되지 않습니다.**
- **동시에 두 채널 파트너를 통해 조달하는 고객은 지원되지 않습니다.** Datadog 제품이 두 개의 리셀러를 거치는 경우(예: Datadog에서 파트너 1, 파트너 2를 거쳐 귀하에게 전달되는 경우)에는 비용 가시성을 사용할 수 없습니다.
- **GovCloud 조직은 지원되지 않습니다.**

### 예상 비용 정확도 {#estimated-cost-accuracy}

- **단계별 온디맨드 요금제는 지원되지 않습니다.** 활성 Error Tracking 및 LLM Observability SKU에 대한 비용 데이터는 표시되지 않습니다.
- **비율 기반 제품은 지원되지 않습니다.** Audit Trail 또는 Premier Support SKU에 대한 비용 데이터는 표시되지 않습니다.
- **모든 비용은 추정치입니다.** 비용은 파트너가 제공하는 요금을 기준으로 계산되므로, 월이 마감된 후에도 과거 비용은 추정치입니다. 대부분의 경우 청구 개요의 비용은 파트너 청구서와 일치합니다. 청구 계산의 미묘한 차이로 인해 약간의 차이(몇 센트)가 발생할 수 있습니다. 상당한 차이가 발견되면 파트너에게 문의하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/plan_and_usage/bill_overview/
[2]: /ko/cloud_cost_management/datadog_costs/