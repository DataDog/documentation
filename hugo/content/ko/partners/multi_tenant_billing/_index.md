---
cascade:
  algolia:
    subcategory: Multi-Tenant Usage Metering and Billing
description: 관리자 조직(Admin Org)을 통해 최종 고객의 사용량, 비용 및 청구를 중앙에서 관리하십시오.
title: 멀티 테넌트 사용량 측정 및 청구
---
## 개요 {#overview}

Datadog 솔루션 제공업체로서 **파트너 관리자 조직**(Admin Org)을 사용하여 고객 조직 전반의 비용과 사용량을 조회하고 모니터링하며, 체험 조직을 프로비저닝하고, 고객 기반 전반의 청구 내역을 조회할 수 있습니다. 관리자 조직은 고객 조직과 분리되어 있으며 Datadog이 소유합니다. 파트너는 파트너 역할로 해당 조직에 초대됩니다.

<div class="alert alert-info">기본적으로 관리자 조직은 연결된 고객 조직의 비용 및 사용량 데이터에 대한 읽기 전용 액세스 권한을 부여하며, 관리자 조직에서의 개인 또는 내부 Datadog 사용은 지원되지 않습니다. 아래의 미리보기 기능은 지원되는 가격 책정 워크플로를 추가합니다.</div>

고객 조직의 Datadog 계약에 파트너십이 포함되어 있고 활성 상태인 경우, 고객 조직은 관리자 조직에 자동으로 연결됩니다. 연결 후에는 GovCloud 사이트를 제외한 모든 Datadog 사이트(예: AP1, EU1, US1, US3, US5)에서 고객의 사용량 및 비용 데이터를 관리자 조직에서 조회할 수 있습니다. GovCloud 사이트는 규제 목적으로 별도의 관리자 조직이 필요합니다.

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="여러 고객 조직에 연결된 관리자 조직." style="width:100%;" >}}

등록된 거래에서 연결된 고객 조직으로 전환하는 과정에서 이러한 요소들이 어떻게 적용되는지 알아보려면 [신규 고객 온보딩][15]을 참조하십시오.

## 관리자 조직 요청 {#requesting-an-admin-org}

관리자 조직을 요청하기 전에 파트너는 다음을 수행해야 합니다.

- [Datadog 파트너 포털][1]에 Datadog 파트너로 등록되어 있어야 합니다.
- 솔루션 제공업체로서 Datadog과 거래하기 위한 계약에 서명해야 합니다.
- Datadog 파트너로 승인되어야 합니다.

아직 등록하지 않은 파트너는 Datadog 파트너 포털에서 [지금 등록][17]할 수 있습니다.

{{< img src="partners/multi_tenant_billing/partner_portal_registration.png" alt="Datadog 파트너 포털 등록 페이지." style="width:100%;" >}}

등록된 파트너는 [partner-support@datadoghq.com][16]으로 문의하여 관리자 조직을 요청할 수 있습니다. 요청 시 셀프 서비스 체험 조직 생성을 위해 체험 조직 프로비저너(Trial Org Provisioner) 기능 활성화가 필요한지 여부를 포함하십시오.

## 시작 {#getting-started}

{{< whatsnext desc="관리자 조직을 시작하려면 다음 문서를 참조하십시오.">}}
  {{< nextlink href="/partners/multi_tenant_billing/customer-onboarding">}}<u>신규 고객 온보딩</u>: 잠재 고객을 등록된 거래에서 연결된 고객 조직으로 전환합니다.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>체험 조직 프로비저닝</u>: 잠재 고객을 위한 체험 조직을 관리자 조직에서 직접 프로비저닝합니다.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>문제 해결</u>: 관리자 조직 및 체험 조직 프로비저닝과 관련된 일반적인 문제를 해결합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 사용 사례 {#use-cases}

관리자 조직이 도움이 될 수 있는 몇 가지 방법은 다음과 같습니다.

| 사용 사례 | 기능 |
|---|---|
| 잠재 고객을 위한 셀프 서비스 체험 조직 생성. | [체험 조직 프로비저닝][3]: 관리자 조직에서 직접 체험 조직을 생성합니다. |
| 모든 고객의 비용 및 사용량을 한 곳에서 모니터링합니다. | [비용 및 사용량 가시성][2]: 예상, 과거 및 예상 비용과 청구 가능한 사용량 데이터를 조회합니다. |
| 비즈니스 장부 전반의 사용량 메트릭을 추적합니다. | [중앙 집중식 사용량 메트릭][8]: 고객 사용량 메트릭을 관리자 조직으로 통합합니다. |
| 파트너의 가격 책정을 기반으로 고객이 예상 비용을 확인할 수 있도록 합니다. | [고객 가격 책정][9]: 고객별 가격을 구성합니다. |
| 한 곳에서 비즈니스 장부를 관리합니다. | [고객 계약][10]: 고객, 계약, 청구서 및 갱신을 추적합니다. |

## 문제 해결 {#troubleshooting}

일반적인 관리자 조직 및 체험 조직 문제에 대한 도움이 필요하면 [문제 해결][7]을 참조하십시오.

[1]: https://partners.datadoghq.com
[2]: /ko/partners/multi_tenant_billing/cost-and-usage-visibility/
[3]: /ko/partners/multi_tenant_billing/trial-org-provisioning/
[7]: /ko/partners/multi_tenant_billing/troubleshooting/
[8]: /ko/partners/multi_tenant_billing/centralized-usage-metrics/
[15]: /ko/partners/multi_tenant_billing/customer-onboarding/
[16]: mailto:partner-support@datadoghq.com
[17]: https://partners.datadoghq.com/s/login/
[9]: /ko/account_management/plan_and_usage/partner_experience/customer_pricing/
[10]: /ko/account_management/plan_and_usage/partner_experience/customer_contracts/