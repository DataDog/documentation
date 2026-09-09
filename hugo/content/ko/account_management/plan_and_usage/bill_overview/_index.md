---
description: Datadog 비용, 사용량 추세 및 월말 예상 비용을 일별 분석, 제품 수준 세부 정보 및 다중 조직 필터링과 함께 단일
  페이지에서 조회하세요.
further_reading:
- link: account_management/plan_and_usage/cost_details/
  tag: 설명서
  text: 비용 세부 정보
- link: account_management/plan_and_usage/usage_details/
  tag: 설명서
  text: 사용량 세부 정보
- link: account_management/billing/usage_attribution/
  tag: 설명서
  text: 사용량 속성
- link: cloud_cost_management/datadog_costs/
  tag: 설명서
  text: Datadog 비용
- link: account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: 설명서
  text: 파트너를 통해 구매하는 고객을 위한 비용의 가시성
title: 청구 개요
---
Datadog 비용, 사용량 추세 및 월말 예상 비용을 일별 분석, 제품 수준 세부 정보 및 다중 조직 필터링과 함께 단일 페이지에서 조회하세요.

[**청구 개요** 페이지][1]는 관리자가 Datadog 비용 및 사용량을 한 눈에 조회할 수 있도록 합니다. 2026년 3월부터 시작되는 단계적 출시 기간 동안 자동으로 활성화됩니다.

## 전역 필터 {#global-filters}

다음 필터가 {{< ui >}}Bill Overview{{< /ui >}} 페이지에 적용됩니다:

- {{< ui >}}Product Category{{< /ui >}}: 인프라, APM, Logs, Security 또는 AI/ML과 같은 더 넓은 제품군별로 모든 보기를 필터링합니다.
- {{< ui >}}Billing Dimension{{< /ui >}}: 특정 청구 또는 계량 디멘션(예: 인프라 호스트, 인덱싱된 로그 또는 합성 브라우저 테스트)으로 필터링합니다.
- {{< ui >}}Sub-Org{{< /ui >}}: 특정 하위 조직으로 필터링합니다.
- {{< ui >}}Group by Sub-Org{{< /ui >}}: 토글하여 하위 조직별로 비용을 그룹화합니다.
- {{< ui >}}Time range{{< /ui >}}: 청구 기간을 선택합니다. 뒤로 및 앞으로 화살표를 사용하여 월별로 이동합니다.

## 비용 요약 {#cost-summary}

페이지 상단에 비용 요약이 표시됩니다:

- {{< ui >}}Estimated cost to date{{< /ui >}}: 현재 청구 기간 중 경과된 일수에 대한 총 예상 비용
- {{< ui >}}Projected total{{< /ui >}}: 현재 사용 패턴이 월말까지 지속될 경우의 예상 총 비용(전월 대비 백분율 변화 포함)

## 일별 비용 분석 {#daily-cost-breakdown}

비용 요약 아래에 있는 {{< ui >}}Daily Cost Breakdown{{< /ui >}} 누적 막대 차트는 선택한 기간의 각 날짜에 대한 청구 디멘션별 비용을 보여줍니다. 차트의 각 색상은 서로 다른 청구 디멘션을 나타냅니다. 확장 아이콘을 클릭하여 차트를 전체 화면으로 조회합니다.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="비용 요약 헤더, 일별 비용 분석 누적 막대 차트 및 추세 탭을 보여주는 청구 개요 페이지" >}}

## 트렌드 탭 {#trends-tab}

{{< ui >}}Trends{{< /ui >}} 탭은 네 가지 정렬 옵션을 기반으로 조사할 가치가 있는 제품을 표시합니다.

- {{< ui >}}Highest % Cost Change{{< /ui >}}
- {{< ui >}}Highest Cost Change ($){{< /ui >}}
- {{< ui >}}Highest Total Cost{{< /ui >}}
- {{< ui >}}Highest % Usage Change{{< /ui >}}

정렬 옵션을 선택하여 표시된 카드를 업데이트하세요. 각 제품 카드는 다음을 보여줍니다.

- {{< ui >}}Total Cost{{< /ui >}}(해당 기간)
- {{< ui >}}Projected EOM{{< /ui >}} 비용
- {{< ui >}}Month-over-month change{{< /ui >}}(백분율 배지로 표시됨)
- {{< ui >}}Daily Cost{{< /ui >}}(이전 달과 현재 달에 걸친 막대 차트)
- {{< ui >}}Usage{{< /ui >}}(총 소비 단위로 표시됨, 자연 단위 사용; 예: 스캔된 데이터의 PB(페타바이트), Custom Metrics; 총 비용 및 사용량 관련 카드에만 표시됨)

어떤 카드에서든 {{< ui >}}View Details{{< /ui >}}를 클릭하여 [제품 세부 정보 페이지][2]를 엽니다.

{{< img src="account_management/plan_and_usage/bill-overview-trends-light.png" alt="가장 높은 총 비용순으로 정렬된 제품 카드를 보여주는 트렌드 탭입니다." >}}

## 제품 목록 탭 {#product-list-tab}

{{< ui >}}Product List{{< /ui >}} 탭은 모든 청구 디멘션을 비용 및 사용량과 함께 표로 보여줍니다.

제품 행의 아무 곳이나 클릭하여 [제품 세부 정보 페이지][2]를 엽니다. 행의 끝부분에 마우스를 올리면 해당 청구 디멘션에 대한 비용 모니터를 빠르게 생성할 수 있습니다.

#### 표 열 {#table-columns}

| 열 | 설명 |
|---|---|
| 청구 디멘션 | 제품 또는 청구 디멘션의 이름 |
| 비용 — 총계 | 해당 기간 동안 청구된 총 비용 |
| 비용 — 예상 EOM | 월말 예상 총 비용 |
| 비용 — 변동 | 이전 기간 대비 금액 및 백분율 변동 |
| 사용량 — 합계 | 기본 단위의 총 사용량 |
| 사용량 — 변동 | 비교 기간 대비 사용량 변동 |

표 위의 컨트롤을 사용하여 {{< ui >}}Monthly{{< /ui >}}와 {{< ui >}}Daily{{< /ui >}} 보기 간에 전환합니다. `.csv` 버튼을 사용하여 전체 표를 {{< ui >}}Download as CSV{{< /ui >}} 파일로 다운로드합니다. 표는 페이지로 나뉘어 있으며 기본적으로 페이지당 10개의 행이 표시됩니다.

{{< img src="account_management/plan_and_usage/bill-overview-product-list-light.png" alt="비용 및 사용량 열이 있는 청구 디멘션 표를 보여주는 제품 목록 탭" >}}

## 제품 세부 정보 페이지 {#product-detail-page}

트렌드 카드에서 {{< ui >}}View Details{{< /ui >}}를 클릭하거나 {{< ui >}}Product List{{< /ui >}} 표의 행을 클릭하여 단일 청구 디멘션에 대한 제품 세부 정보 페이지를 엽니다.

{{< img src="account_management/plan_and_usage/bill-overview-detail-light-2.png" alt="청구 가능한 호스트를 CSV로 다운로드 버튼을 포함하여 비용 개요 및 사용량 개요 섹션을 보여주는 제품 세부 정보 페이지" >}}

### 비용 개요 {#cost-overview}

- {{< ui >}}Total Cost{{< /ui >}}: 선택한 기간 동안 청구된 총 비용
- {{< ui >}}Projected Cost Change{{< /ui >}}: 이전 기간 대비 예상 금액 및 백분율 변동
- {{< ui >}}Projected EOM{{< /ui >}}: 월말 예상 총 비용
- {{< ui >}}Daily Cost{{< /ui >}} 막대 차트: 이전 달과 현재 달의 일별 비용이며, 현재 달이 강조 표시됩니다. 막대 위에 마우스를 올리면 해당 날짜의 비용을 확인할 수 있습니다. {{< ui >}}Show Usage Charges Only{{< /ui >}}를 전환하여 온디맨드 요금을 분리합니다.
- {{< ui >}}Drilldown in Cloud Cost{{< /ui >}}: 클릭하면 선택한 청구 디멘션으로 미리 필터링된 Cloud Cost Management가 열립니다.

### 사용량 개요 {#usage-overview}

- {{< ui >}}Total Usage{{< /ui >}}: 선택한 기간 동안 소비된 총 단위입니다.
- {{< ui >}}Usage Change{{< /ui >}}: 이전 기간 대비 사용량 변화(금액 및 백분율)입니다.
- {{< ui >}}Usage breakdown by sub-dimension{{< /ui >}}: 각 하위 디멘션에 대한 개별 사용량 합계입니다. 예를 들어, Sensitive Data Scanner는 스캔된 이벤트, 스캔된 로그, 스캔된 RUM 세션 및 스캔된 스팬을 별도로 나열합니다.
- {{< ui >}}Usage Types{{< /ui >}} 막대 차트: 하위 디멘션별로 누적된 일별 사용량입니다.
- {{< ui >}}Allotment Usage{{< /ui >}}: 소비된 할당량 대비 계약된 할당량을 보여주는 진행률 표시줄입니다. 사용량이 할당량을 초과하면 ">100%"가 표시됩니다.
- {{< ui >}}Drilldown in Usage Attribution{{< /ui >}}: 클릭하면 선택한 청구 디멘션으로 미리 필터링된 {{< ui >}}Usage Attribution{{< /ui >}}이 열립니다.
- {{< ui >}}Download Billable Hosts as CSV{{< /ui >}}: 인프라 호스트의 경우, 청구 가능한 총계를 구성하는 개별 호스트를 CSV로 다운로드합니다.

### 청구 가능한 호스트를 CSV로 다운로드 {#download-billable-hosts-as-csv}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서는 청구 가능한 호스트를 CSV로 다운로드할 수 없습니다.</div>
{{< /site-region >}}

특정 월에 대해 청구 가능한 인프라 호스트 총계를 구성하는 개별 호스트의 CSV를 다운로드합니다. 이 기능을 사용하여 청구 개요 페이지에 표시된 총계를 조정하고, 청구 수량의 가장 큰 비중을 차지하는 호스트를 찾고, 태그별로 팀에 사용량을 할당하거나, 월별로 비교하여 예상치 못한 변경 사항을 파악할 수 있습니다.

목록을 내보내려면 다음 단계를 따르세요.

1. 측면 패널에서 오른쪽 상단의 월 선택기를 사용하여 월을 선택합니다. 완료된 달력 월에 대한 데이터만 내보낼 수 있습니다.
2.  아래의 {{< ui >}}Usage Overview{{< /ui >}}에서 {{< ui >}}Download Billable Hosts as CSV{{< /ui >}}를 클릭하세요.

.CSV에는 호스트당 한 행씩 다음 열이 포함됩니다:

| 열 | 설명 |
|---|---|
| `Org Name` | 조직 이름입니다. |
| `Public ID` | 조직의 공개 식별자입니다. |
| `Timestamp` | 99번째 백분위수로 청구되는 조직의 경우, 사용량이 99번째 백분위수로 측정된 해당 월의 시간입니다. 합계 기준으로 청구되는 조직의 경우, 해당 월의 첫째 날입니다. |
| `Resource Type` | 리소스 유형(예: `agent`, `aws` 또는 `vsphere`)입니다. |
| `Resource Name` | 호스트 이름 또는 식별자(예: 호스트 이름 또는 인스턴스 ID). |
| `Usage Value` | 99번째 백분위수로 청구되는 조직의 경우, 호스트당 `1`입니다. 합계 기준으로 청구되는 조직의 경우, 해당 월 동안의 호스트 시간입니다(예: 30일 전체 동안 존재하는 호스트의 경우 `720`). |
| `Tags` | 호스트의 키-값 태그로 구성된 JSON 객체입니다. 호스트에 태그가 없는 경우 비어 있음(`{}`)으로 표시됩니다. |

모든 행에 걸친 `Usage Value`의 합계는 빌링 내역 페이지에 표시된 인프라 호스트 총계와 일치합니다. 이는 99번째 백분위수로 청구되는 조직의 경우 호스트 수이며, 합계 기준으로 청구되는 조직의 경우 호스트 시간입니다.

## 이전 레이아웃으로 되돌리기 {#revert-to-the-previous-layout}

조직이 새로운 {{< ui >}}Bill Overview{{< /ui >}}를 사용 중이고 이전 레이아웃을 선호하는 경우, 페이지 헤더에서 {{< ui >}}Disable Preview{{< /ui >}}를 클릭하세요. 이 토글은 모든 조직에서 사용할 수 있으며 세션 동안 유지됩니다.

{{< img src="account_management/plan_and_usage/toggle-back-header.png" alt="Disable Preview 버튼이 표시된 빌링 내역 페이지 헤더" >}}

{{< ui >}}Bill Overview{{< /ui >}}로 돌아가려면 헤더에서 {{< ui >}}Enable Preview{{< /ui >}}를 클릭하세요.

## 권한 {#permissions}

빌링 내역의 각 섹션에 액세스하려면 다음 권한이 필요합니다.

| 섹션 | 필수 권한 |
|---|---|
| 빌링 내역(비용 데이터) | `BILLING_READ` |
| 사용량 탭 | `USAGE_READ` |
| 플랜 세부 정보 | `BILLING_READ` |
| 빌링 내역 | `BILLING_READ` |
| 사용량 어트리뷰션 | `USAGE_READ` + Enterprise 또는 Pro 플랜 |
| 하위 조직 비용 추세 | 상위 조직에서 `suborg_cost_trends`|를 활성화해야 합니다.

권한 관리에 대한 자세한 내용은 [역할 기반 Access Control][3]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/bill-overview
[2]: /ko/account_management/plan_and_usage/bill_overview/#product-detail-page
[3]: /ko/account_management/rbac/