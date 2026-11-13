---
description: Datadog 파트너가 Datadog admin 조직에서 고객 조직 전반의 비용 및 사용량 데이터를 조회하기 위해 Plan
  and Usage 페이지를 사용하는 방법을 설명합니다.
further_reading:
- link: https://docs.datadoghq.com/account_management/plan_and_usage/
  tag: 설명서
  text: 플랜 및 사용량
- link: https://docs.datadoghq.com/account_management/plan_and_usage/cost_details/
  tag: 설명서
  text: 비용 세부 정보
- link: https://docs.datadoghq.com/account_management/plan_and_usage/usage_details/
  tag: 설명서
  text: 사용량 세부 정보
- link: https://docs.datadoghq.com/api/latest/usage-metering/
  tag: 설명서
  text: Usage Metering API
- link: https://docs.datadoghq.com/account_management/plan_and_usage/partner_experience/customer_pricing/
  tag: 설명서
  text: 고객 요금
title: 파트너를 위한 플랜 및 사용량 환경
---
Datadog 파트너는 여러 고객 조직을 관리하도록 설계된 맞춤형 Plan and Usage 페이지를 조회합니다. 이 페이지에서는 **Datadog Admin 조직**에서 UI를 조회하는 파트너에게 제공되는 플랜 및 사용량 경험에 대해 설명합니다.

## 전제 조건 {#prerequisites}

파트너 플랜 및 사용량 경험에 액세스하려면 귀하의 조직이 Datadog Admin 조직이어야 합니다. 이는 Datadog이 파트너가 고객 계정을 관리할 수 있도록 프로비저닝하는 최상위 조직입니다. 소속 조직이 Datadog Partner Program을 통해 설정되었고 그 아래에서 고객 조직을 관리하고 있다면 Datadog Admin 조직을 사용 중인 것입니다. 검증하려면 Datadog과 여러 계약을 맺었으며 플랜 및 사용량에서 해당 계약 전체의 통합 비용 및 사용량 데이터를 조회할 수 있는지 확인합니다.

**참고**: (파트너 당사자가 아니라) Datadog 파트너의 *고객*인 경우 표준 플랜 및 사용량 경험이 제공됩니다. 파트너와의 요금 책정 계약에 따라 비용 데이터 없이 사용량 데이터만 표시될 수 있습니다. 자세한 내용은 [플랜 및 사용량][1]을 참조하세요.

플랜 및 사용량 데이터를 조회하려면 파트너에게 **Datadog Admin** 역할이나 `billing_read` 및 `usage_read` 권한이 있는 사용자 지정 역할이 있어야 합니다. 이는 직접 고객에게 필요한 권한과 동일합니다.

## 개요 {#overview}

Datadog Admin 조직에서 플랜 및 사용량에 액세스하는 파트너는 모든 고객 조직의 비용 및 사용량 데이터를 조회할 수 있습니다. 파트너 보기에서는 **Usage & Cost** 탭만 사용할 수 있으며, Plan, Billing History, 및 Usage Notifications 탭은 표시되지 않습니다.

### 비용 세부 정보 {#cost-details}

모든 고객 조직에 대한 예상 비용, 과거 비용 및 예측 비용 데이터를 한 곳에서 조회할 수 있습니다. 파트너는 모든 고객의 합계를 조회하거나 고객 조직, 제품 및 계정별로 그룹화하고 필터링할 수 있습니다. 전체 문서는 [비용 세부 정보][2]를 참조하세요.

{{< img src="account_management/plan_and_usage/partner-cost-details.png" alt="Datadog Admin 조직의 Cost Summary 페이지에서는 고객 조직 전반의 예상 비용 및 예측 비용을 누적 비용 분석 차트와 고객별 비용 표로 보여줍니다." >}}

### 사용량 세부 정보 {#usage-details}

모든 고객 조직의 사용량 데이터를 한 곳에서 조회할 수 있습니다. 파트너는 모든 고객의 합계를 조회하거나 고객 조직, 제품 및 계정별로 그룹화하고 필터링할 수 있습니다. 전체 문서는 [사용량 세부 정보][3]를 참조하세요.

{{< img src="account_management/plan_and_usage/partner-usage-details-v2.png" alt="Datadog Admin 조직의 Usage Summary 페이지는 고객 조직 전반의 사용량 데이터를 표시합니다." >}}

## 파트너 전용 기능 {#partner-only-features}

다음 기능은 Datadog Admin 조직에서 플랜 및 사용량을 조회하는 파트너만 사용할 수 있습니다.

### 고객 요금 {#customer-pricing}

고객별 요금을 설정합니다. 따라서 리셀러 고객이 자신의 조직에서 예상 Datadog 비용을 조회할 수 있습니다. 설정 단계는 [고객 요금][12]을 참조하세요.

## 기능 가용성 {#feature-availability}

다음 표는 각 플랜 및 사용량 기능과 해당 기능에 대한 직접 고객 및 Datadog Admin 조직에서 조회하는 파트너의 가용성을 보여줍니다.

| 기능 | 직접 고객 | 파트너 | 참고 |
|---|---|---|---|
| 비용 요약 | {{< X >}} | {{< X >}} |  |
| 예측 비용 | {{< X >}} | {{< X >}} |  |
| 사용량 요약 | {{< X >}} | {{< X >}} |  |
| 비용 및 사용량 API 엔드포인트 | {{< X >}} | {{< X >}} | 전체 목록은 [지원되는 API 엔드포인트](#supported-api-endpoints)를 참조하세요. |
| [고객 요금][12] | | {{< X >}} | 파트너만 해당. | 리셀러 고객에 대한 비용 가시성을 활성화합니다. |
| Cost Attribution | {{< X >}} |  | 개별 고객 조직은 자체 [Plan and Usage][1] 페이지에서 Cost attribution에 액세스할 수 있습니다. |
| Usage Attribution | {{< X >}} |  | 개별 고객 조직은 자체 [Plan and Usage][1] 페이지에서 Usage Attribution에 액세스할 수 있습니다. |
| 제품별 사용량 테이블(예: 사용자 지정 메트릭, 인덱스별 로그 사용량) | {{< X >}} |  | 개별 고객 조직은 자체 [Usage Details][3] 페이지에서 이러한 테이블을 조회할 수 있습니다. |
| Cloud Cost Management에서 Datadog 비용 | {{< X >}} |  | 개별 고객 조직은 자체 Cloud Cost Management 페이지에서 [Datadog 비용](/cloud_cost_management/datadog_costs/)에 액세스할 수 있습니다. |
| Plan and Billing History 탭 | {{< X >}} |  | 개별 고객 조직은 자체 [플랜 및 사용량][1] 페이지에서 Plan and Billing History 탭에 액세스할 수 있습니다. |
| [청구 개요][4] | {{< X >}} |  | Datadog Admin 조직 수준에서 사용할 수 없음 |
| Usage Notifications 탭 | {{< X >}} |  | 개별 고객 조직은 자체 [플랜 및 사용량][1] 페이지에서 사용량 알림을 구성할 수 있습니다. |

## 지원되는 API 엔드포인트 {#supported-api-endpoints}

파트너는 다음 [Usage Metering API][5] 엔드포인트를 통해 프로그래밍 방식으로 비용 및 사용량 데이터에 액세스할 수도 있습니다.

| 엔드포인트                                     | 설명                                              |
|----------------------------------------------|----------------------------------------------------------|
| [계정 전체에 대한 예상 비용 가져오기][6]  | 당월에 대한 예상 비용 조회       |
| [계정 전체에 대한 청구 가능한 사용량 가져오기][7]  | 청구 가능한 사용량 요약 조회                        |
| [제품군별 시간당 사용량 가져오기][8]      | 제품군별로 분석한 시간당 사용량 조회 |
| [계정 전체에 대한 과거 비용 가져오기][9] | 이전 달의 과거 비용 조회        |
| [계정 전체에 대한 예측 비용 가져오기][10] | 월말 예측 비용 데이터 조회                |
| [계정 전체에 대한 사용량 가져오기][11]          | 계정 전체에 대한 사용량 요약 데이터 조회          |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/plan_and_usage/
[2]: /ko/account_management/plan_and_usage/cost_details/
[3]: /ko/account_management/plan_and_usage/usage_details/
[4]: /ko/account_management/plan_and_usage/bill_overview/
[5]: /ko/api/latest/usage-metering/
[6]: /ko/api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /ko/api/latest/usage-metering/#get-billable-usage-across-your-account
[8]: /ko/api/latest/usage-metering/#get-hourly-usage-by-product-family
[9]: /ko/api/latest/usage-metering/#get-historical-cost-across-your-account
[10]: /ko/api/latest/usage-metering/#get-projected-cost-across-your-account
[11]: /ko/api/latest/usage-metering/#get-usage-across-your-account
[12]: /ko/account_management/plan_and_usage/partner_experience/customer_pricing/