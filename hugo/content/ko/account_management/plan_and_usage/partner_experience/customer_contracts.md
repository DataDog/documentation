---
description: Datadog 관리 조직에서 반복 수익, 갱신 날짜, 인출 잔액, 청구서 및 비용 가시성 상태를 포함한 최종 고객 계약 포트폴리오를
  확인하세요.
further_reading:
- link: /account_management/plan_and_usage/partner_experience/customer_pricing/
  tag: 설명서
  text: 고객 요금 책정
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: 설명서
  text: 파트너를 통해 구매하는 고객을 위한 비용 가시성
- link: /account_management/plan_and_usage/partner_experience/
  tag: 설명서
  text: 파트너를 위한 플랜 및 사용량 환경
title: 고객 계약
---
[고객 계약][1] 페이지에서 Datadog 파트너는 반복 수익, 갱신 날짜, 청구서 및 비용 가시성 상태를 포함한 최종 고객 계약 포트폴리오를 한눈에 볼 수 있습니다. 페이지 상단의 요약 타일은 갱신 예정인 계약 수, 비용 가시성 기능을 사용하기 전에 요금을 입력해야 하는 고객 수, 연체된 청구서의 수와 총액을 보여줍니다.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Customer Contracts는 일부 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{< img src="account_management/plan_and_usage/customer-contracts-overview.png" alt="고객 테이블 위에 갱신, 비용 가시성 및 연체된 청구서에 대한 요약 타일이 표시된 고객 계약 페이지입니다." >}}

**참고**: 이 페이지의 데이터는 30분마다 새로 고쳐집니다.

## 전제 조건 {#prerequisites}

고객 계약을 사용하려면 다음이 필요합니다.

- Datadog 관리 조직. 없는 경우 Datadog 파트너 팀에 문의하세요.
- 관리 조직의 청구 읽기(`billing_read`) 권한. 이 권한이 있는 사용자는 페이지의 모든 정보를 볼 수 있습니다. 권한 관리에 대한 자세한 내용은 [역할 기반 Access Control][4]을 참조하세요.

## 고객 계약 액세스 {#access-customer-contracts}

1. Datadog Admin 조직에 로그인합니다.
2. [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}][1]로 이동합니다.

## 고객 테이블 {#customer-table}

고객 테이블에는 관리 조직 하의 모든 고객이 나열됩니다. 고객을 선택하여 해당 고객의 계약 세부 정보 패널을 열어보세요.

| 열 | 설명 |
|---|---|
| {{< ui >}}Customer{{< /ui >}} | 최종 고객 이름 |
| {{< ui >}}CMRR{{< /ui >}} | 계약 월간 반복 수익 |
| {{< ui >}}UMRR{{< /ui >}} | 계약 약정이 아닌 고객의 계량 사용량을 기준으로 산출된 월간 반복 수익 |
| {{< ui >}}Overdue Balance{{< /ui >}} | 기한이 지난 고객 청구서의 총액 |
| {{< ui >}}Cost Visibility{{< /ui >}} | 고객이 Datadog 비용을 확인할 수 있는지 여부. [비용 가시성 상태 확인](#check-cost-visibility-status)을 참조하세요. |
| {{< ui >}}Contract Status{{< /ui >}} | 계약이 활성 상태인지, 갱신 날짜가 다가오고 있는지 또는 만료되었는지 여부 |

검색 상자를 사용하여 특정 고객을 찾거나 {{< ui >}}Cost Visibility{{< /ui >}} 또는 {{< ui >}}Contract Status{{< /ui >}} 기준으로 테이블을 필터링하세요.

## 갱신 추적 {#track-renewals}

고객 테이블은 각 고객의 계약 상태를 보여주므로 어떤 계약의 갱신 날짜가 다가오고 있고 어떤 계약이 이미 지났는지 확인할 수 있습니다. 가장 긴급한 계약을 상단으로 가져오려면 {{< ui >}}Contract Status{{< /ui >}} 기준으로 정렬하거나 필터링하세요.

{{< img src="account_management/plan_and_usage/customer-contracts-renewals.png" alt="만료되었거나 곧 만료될 계약을 보여주는 계약 상태 기준으로 정렬된 고객 테이블입니다." >}}

## 계약 세부 정보 검토 {#review-contract-details}

고객을 선택하여 해당 고객의 계약 세부 정보 패널을 열어보세요. {{< ui >}}Current Contract{{< /ui >}} 탭에는 다음이 표시됩니다.

- {{< ui >}}Spend Overview{{< /ui >}}: 지난달 CMRR, 지난달 UMRR 및 계약 활용률.
- {{< ui >}}Contract Info{{< /ui >}}: 영향 상태(영향을 받음 또는 영향을 받지 않음), 계약 시작 날짜 및 계약 종료 날짜.
- {{< ui >}}Drawdown Depletion{{< /ui >}}: 총 약정, 현재까지의 지출, 잔액, 예상 총액, 예상 초과액 및 계약 종료 날짜와 비교한 예상 소진 날짜. 이 섹션은 고객의 사용량이 계약 기간 동안 약정된 자금 풀에서 차감되는 차감형 계약에만 나타납니다.

{{< img src="account_management/plan_and_usage/customer-contracts-detail.png" alt="지출 개요, 차감 소진 진행률 표시줄 및 계약 정보 사이드바를 보여주는 고객용 계약 세부 정보 패널입니다." >}}

[고객 요금 책정][2] 페이지로 이동하는 대신 이 패널의 {{< ui >}}Custom Pricing Configuration{{< /ui >}} 탭에서 고객의 요금을 설정할 수 있습니다.

## 청구서 모니터링 {#monitor-invoices}

계약 세부 정보 패널의 {{< ui >}}Invoices{{< /ui >}} 탭에는 해당 고객의 모든 청구서가 발행 날짜, 기한, 금액 및 결제 상태와 함께 나열됩니다. 이 탭에서 청구서의 PDF를 여세요. 각 고객의 연체 잔액은 기본 고객 테이블에도 표시되며, 페이지 상단의 요약 타일은 포트폴리오 전체에서 연체된 청구서의 수와 총액을 보여줍니다.

**참고**: 결제 상태는 본인이 해당 고객의 사용량에 대해 Datadog 청구서를 지불했는지 여부를 반영합니다. 최종 고객이 본인에게 지불했는지 여부는 추적하지 않습니다.

{{< img src="account_management/plan_and_usage/customer-contracts-invoices.png" alt="발행일, 기한, 금액, 결제 상태 및 PDF 조회 링크가 포함된 청구서가 나열된 계약 세부 정보 패널의 청구서 탭입니다." >}}

## 비용 가시성 상태 검사{#check-cost-visibility-status}

최종 고객은 게시된 요금을 기준으로 계산된 당월 누적 및 과거 Datadog 예상 비용을 자신의 Datadog 조직에서 확인할 수 있습니다. {{< ui >}}Cost Visibility{{< /ui >}} 열은 각 고객의 상태를 보여줍니다.

- {{< ui >}}Enabled{{< /ui >}}: 고객이 자신의 조직에서 Datadog 비용을 확인할 수 있습니다.
- {{< ui >}}Not configured{{< /ui >}}: 아직 이 고객에 대한 요금을 게시하지 않았습니다.
- {{< ui >}}Update needed{{< /ui >}}: 고객의 계약이 변경되어 게시된 요금을 업데이트해야 합니다.

페이지 상단의 {{< ui >}}Cost Visibility Action Needed{{< /ui >}} 타일은 {{< ui >}}Not configured{{< /ui >}} 및 {{< ui >}}Update needed{{< /ui >}} 상태인 고객 수를 집계합니다.

요금을 게시하거나 업데이트하려면 [고객 요금 책정][2]을 참조하세요. 고객에게 이 기능을 설명하려면 [파트너를 통해 구매하는 고객을 위한 비용 가시성][3]을 공유하세요.

{{< img src="account_management/plan_and_usage/customer-contracts-cost-visibility.png" alt="비용 가시성 열이 강조 표시된 고객 테이블로, '활성화됨' 또는 '업데이트 필요'로 표시된 고객을 보여줍니다." >}}

## 계정 담당자 찾기{#find-account-contacts}

계약 세부 정보 패널의 {{< ui >}}Contacts{{< /ui >}} 섹션에는 계정 관련 질문을 위한 Datadog 고객 성공 관리자(CSM), Datadog 계정 담당자(AE) 및 파트너 영업 관리자와 고객의 청구서를 수신하는 청구 담당자가 나열되어 있습니다.

{{< img src="account_management/plan_and_usage/customer-contracts-contacts.png" alt="Datadog CSM, Datadog AE, 청구 담당자 및 파트너 영업 관리자가 나열된 계약 세부 정보 패널의 담당자 섹션입니다." >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/customer-contracts
[2]: /ko/account_management/plan_and_usage/partner_experience/customer_pricing/
[3]: /ko/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[4]: /ko/account_management/rbac/