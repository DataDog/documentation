---
description: Datadog에서 고객의 비용 가시성을 활성화하려면 고객 요금 페이지에서 고객별 요금을 설정하세요.
further_reading:
- link: /partners/multi_tenant_billing/
  tag: 설명서
  text: 멀티 테넌트 사용량 측정 및 청구
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: 설명서
  text: 파트너를 통해 구매하는 고객을 위한 비용 가시성
- link: /account_management/plan_and_usage/partner_experience/
  tag: 설명서
  text: 파트너를 위한 플랜 및 사용량 환경
- link: /account_management/plan_and_usage/bill_overview/
  tag: 설명서
  text: 청구 개요
title: 고객 요금 책정
---
[고객 요금][2] 페이지에서 파트너는 리셀러 고객의 비용 가시성을 활성화하는 고객별 요금을 설정할 수 있습니다. 요금 설정은 고객당 1회만 설정하면 되며 요금은 언제든지 업데이트할 수 있습니다. 고객 경험에 대해 알아보거나 고객과 공유할 리소스를 찾으려면 [파트너를 통해 구매하는 고객을 위한 비용 가시성][1]을 참조하세요.

## 전제 조건 {#prerequisites}

고객 요금을 설정하려면 다음 항목이 필요합니다.

- Datadog Admin 조직([멀티 테넌트 사용량 측정 및 청구][3] 프로그램을 통해 요청 가능) 
- 청구서 편집(`billing_edit`) 권한. 청구서 읽기(`billing_read`) 권한만 있는 사용자는 저장되거나 게시된 고객 가격을 볼 수는 있지만 편집할 수는 없습니다.

## 고객 요금 설정 {#set-up-customer-pricing}

1. Datadog Admin 조직에 로그인합니다.
1. [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}}][2]으로 이동합니다.
   {{< img src="account_management/plan_and_usage/customer-pricing-nav.png" alt="Plan & Usage 섹션의 Customer Pricing 탭." >}}
1. 드롭다운에서 고객을 선택합니다. 적격한 리셀 계약이 있는 고객만 나열됩니다.
   {{< img src="account_management/plan_and_usage/customer-pricing-select-customer.png" alt="리셀러 고객 목록을 나열하는 고객 선택 드롭다운." >}}
1. 표에서 고객의 계약 제품 및 해당 판매 가격을 검토합니다.
1. {{< ui >}}Edit{{< /ui >}}을 클릭하고 각 계약 제품에 대한 고객 가격을 입력합니다. 가격을 일괄적으로, 개별적으로 또는 둘 다 조합하여 편집할 수 있습니다.
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-bulk.png" alt="고객의 계약 제품에 대한 일괄 가격 편집 제어." >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-individual.png" alt="각 계약 제품에 대한 개별 초안 가격 필드." >}}
1. 고객 계약에 포함되지 않은 제품에 대한 기본 요금 책정 규칙을 설정합니다. 
    - 기본적으로 비계약 제품에 대한 온디맨드 가격은 Datadog 정가로 설정됩니다. 대신 판매 가격에 백분율 인상률을 적용하고 선택적으로 인상된 가격에 Datadog 정가를 상한선으로 설정할 수 있습니다.
   {{< img src="account_management/plan_and_usage/customer-pricing-default-rule.png" alt="비계약 제품에 대한 기본 요금 책정 규칙 구성." >}}
1. {{< ui >}}Save{{< /ui >}}를 클릭하여 초안을 저장합니다. 초안은 Datadog Admin 조직 내에서만 볼 수 있습니다. 
1. 입력 내용을 검토한 다음 {{< ui >}}Publish{{< /ui >}}를 클릭합니다.

게시 후 24시간 이내에 해당 고객에 대해 비용 가시성이 활성화됩니다. 그러면 고객은 사용량과 제시된 가격을 기준으로 Datadog 조직 내에서 예상 비용 및 과거 비용을 확인할 수 있습니다. 게시된 가격은 신규 계약이든 기존 계약의 조건 변경이든 관계없이, 고객 계약에 가장 최근에 변경된 시점부터 적용됩니다.

## 요금 업데이트{#update-pricing}

게시 후 고객의 가격을 변경하려면 {{< ui >}}Customer Pricing{{< /ui >}} 페이지로 돌아가 값을 편집하고 다시 게시합니다. 업데이트가 고객에게 표시되기까지 최대 24시간이 소요될 수 있습니다.

## 제한 사항 {#limitations}

고객 드롭다운에 표시되려면 고객이 적격한 리셀 계약을 보유하고 있어야 합니다. 고객 요금 책정은 다음 계약 유형 및 조직은 지원하지 않습니다.

- **레거시 MSP(관리형 서비스 공급자) 계약**. 여러 고객이 단일 계약으로 보장됩니다.
- **인출 계약이 없는 Cloud Marketplace 계약**. AWS, Google Cloud 또는 Azure Marketplace를 통해 구매하는 고객에게 해당됩니다.
- **고객이 두 채널 파트너를 통해 동시에 조달하는 계약.** 예: Datadog에서 파트너 1, 파트너 2를 거쳐 고객에게 전달되는 경우입니다.
- **GovCloud 조직.**

기능 가용성 및 비용 정확성 주의 사항을 포함한 전체 제한 사항 목록은 [파트너를 통해 구매하는 고객을 위한 비용 가시성][1]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[2]: https://app.datadoghq.com/billing/customer-pricing
[3]: /ko/partners/multi_tenant_billing/#requesting-an-admin-org