---
description: 관리자 조직에서 모든 연결된 고객 조직의 비용 및 청구 가능한 사용량을 모니터링하세요.
title: 비용 및 사용량 가시성
---
## 개요 {#overview}

고객 조직의 계약에 파트너십이 포함되어 있고 계약이 활성 상태이면 고객 조직이 파트너 관리자 조직(관리자 조직)에 자동으로 연결됩니다. 연결 후에는 고객이 사용하는 모든 Datadog 사이트 전반에서 관리자 조직에서 고객의 사용량 및 비용 데이터를 조회할 수 있습니다. 계약이 만료된 후 30일이 지나면 연결이 자동으로 제거되며, 계약이 갱신되는 동안 파트너가 가시성을 유지할 수 있도록 유예 기간이 제공됩니다.

**참고**: 체험판 조직의 사용량은 고객 조직이 이 방식으로 연결되기 전까지는 여기에 포함되지 않습니다. [체험판 조직 프로비저닝][4]을 참조하세요.

## 비용 및 사용량 데이터 조회 {#view-cost-and-usage-data}

관리자 조직에서 {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}}로 이동하여 고객, 제품 또는 계정별로 그룹화 및 필터링된 연결된 모든 고객 조직의 예상 비용, 과거 비용 및 예측 비용과 청구 가능한 사용량 데이터를 조회할 수 있습니다. 자세한 내용은 [파트너를 위한 플랜 및 사용량 경험][1]을 참조하세요.

비용 및 사용량 데이터는 다음 [Usage Metering API][2] 엔드포인트를 통해 프로그래밍 방식으로도 조회할 수 있습니다.

| API | 용도 | 참고 |
|---|---|---|
| [계정 전체에 대한 예상 비용 가져오기][6] | 현재 및 이전 달의 예상 비용 | 필요 사항: `include_connected_accounts=true` |
| [계정 전체에 대한 과거 비용 가져오기][7] | 이전 달의 과거 비용 | 필요 사항: `include_connected_accounts=true` |
| [계정 전체에 대한 예측 비용 가져오기][8] | 현재 달의 월말 예측 비용 | 필요 사항: `include_connected_accounts=true` |
| [계정 전체에 대한 청구 가능한 사용량 가져오기][9] | 청구 가능한 사용량 요약 | 필요 사항: `include_connected_accounts=true` |
| [계정 전체에 대한 사용량 가져오기][10] | 계정 전체에 대한 사용량 요약 데이터 | 필요 사항: `include_connected_accounts=true` |
| [제품군별 시간당 사용량 가져오기][11] | 제품군별로 분석한 시간당 사용량 | 필요 사항: `filter[include_connected_accounts]=true` |

## 관련 문서 {#related-docs}

- [중앙 집중식 사용량 메트릭][3]: 모든 연결된 고객 조직에서 집계된 사용량 메트릭입니다.
- [체험판 조직 프로비저닝][4]: 잠재 고객을 위한 체험판 조직을 프로비저닝합니다.

[1]: /ko/account_management/plan_and_usage/partner_experience/
[2]: /ko/api/latest/usage-metering/
[3]: /ko/partners/multi_tenant_billing/centralized-usage-metrics/
[4]: /ko/partners/multi_tenant_billing/trial-org-provisioning/
[6]: /ko/api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /ko/api/latest/usage-metering/#get-historical-cost-across-your-account
[8]: /ko/api/latest/usage-metering/#get-projected-cost-across-your-account
[9]: /ko/api/latest/usage-metering/#get-billable-usage-across-your-account
[10]: /ko/api/latest/usage-metering/#get-usage-across-your-account
[11]: /ko/api/latest/usage-metering/#get-hourly-usage-by-product-family