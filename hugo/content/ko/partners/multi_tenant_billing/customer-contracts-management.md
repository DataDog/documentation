---
description: 관리자 조직 (Admin Org)에서 파트너의 영업 실적(고객, 계약, 청구서)을 관리하십시오.
title: 고객 계약
---
<div class="alert alert-info">
고객 계약은 미리 보기 상태입니다.
</div>

## 개요 {#overview}

고객 계약을 통해 파트너는 Datadog과의 영업 실적에 대한 고객, 계약 및 청구서를 한곳에서 관리할 수 있습니다. 파트너는 일상적인 조회를 위해 파트너 계정 팀에 의존하는 대신 이 정보를 직접 조회할 수 있습니다.

관리자 조직에서 {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}(으)로 이동하십시오. 아직 설정되지 않은 경우 [관리자 조직 요청하기][2]를 참조하십시오.

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="관리자 조직의 Plan & Usage 아래에 있는 고객 계약 탭으로, 고객 및 계약 목록이 표시됩니다." style="width:100%;" >}}

**참고**: 고객 계약을 조회하려면 Billing Read 권한이 필요합니다.

## 포함된 내용 {#whats-included}

- 관리자 조직에 연결된 모든 고객과 그들의 현재 및 과거 계약, 그리고 갱신 예정이거나 이미 갱신 날짜가 지난 계약에 대해 갱신 알림이 제공됩니다.
- 계약 MRR (CMRR), 사용량 MRR (UMRR), 영향 상태, 계약 시작 및 종료 날짜와 함께 제품별 요금 및 주문서 PDF가 표시됩니다.
- 차감형 계약의 경우, 계약 종료 날짜와 비교하여 잔액, 예상 초과 사용량 및 예상 소진 날짜가 표시됩니다.
- MSP 계약의 경우, 각 계약에 속한 고객이 표시됩니다.
- 계약별 할인 및 마진 가시성이 표시됩니다.
- 각 고객에 대해 고객 가격 책정이 활성화되었는지, 아직 구성되지 않았는지, 또는 계약 변경 후 업데이트가 필요한지 여부가 표시됩니다.
- 고객별 주요 연락처가 표시됩니다: Datadog CSM, Datadog AE, 파트너 계정 팀 및 청구서를 수신하는 청구 담당자.

{{< img src="partners/multi_tenant_billing/customer_contracts_detail.png" alt="고객의 지출 개요, 차감 소진, 계약 정보 및 연락처를 보여주는 고객 계약 세부 정보 패널이 표시됩니다." style="width:100%;" >}}

청구서는 고객별로 발행일, 마감일, 금액 및 결제 상태와 함께 나열되며, 주요 고객 계약 페이지에서 연체 건수 및 총액으로 합산됩니다:

{{< img src="partners/multi_tenant_billing/customer_contracts_invoices.png" alt="고객의 청구서 번호, 날짜, 금액 및 상태를 나열하는 고객 계약 청구서 탭이 표시됩니다." style="width:100%;" >}}

## 관련 문서 {#related-docs}

- [관리자 조직 요청하기][2]

[2]: /ko/partners/multi_tenant_billing/#requesting-an-admin-org