---
further_reading:
- link: https://docs.datadoghq.com/account_management/billing/
  tag: 설명서
  text: 청구
- link: https://docs.datadoghq.com/account_management/billing/usage_details/
  tag: 설명서
  text: 사용량 상세 정보
- link: https://docs.datadoghq.com/account_management/multi_organization/
  tag: 설명서
  text: 다수 조직 계정 관리
title: 비용 상세 정보
---

## 개요

Cost Summary 및 Cost Chargebacks는 예상 월간 누계, 예상 월말 및 과거 Datadog 비용을 이해하는 데 도움이 됩니다.

하위 조직과 제품별로 비용을 상세히 알아볼 수 있습니다.
- 출처에 따른 비용 할당
- 비용 추적 방법에 대한 인사이트 얻기

### 권한 허용

Cost Summary 및 Cost Chargebacks 데이터를 보려면 Datadog 어드민 사용자여야 합니다.

또는 청구 읽기(`billing_read`) 및 사용량 읽기(`usage_read`) [권한][1]이 있는 역할은 Cost Summary 및 Cost Chargebacks 데이터를 볼 수 있습니다.

## 비용 요약

비용 요약을 사용하면 다음을 할 수 있습니다.
- 이번 달부터 현재까지 예상 비용 보기
- 예상 월말 비용 보기
- 이달의 비용 트렌드 보기
- 제품 또는 하위 조직별로 비용 필터링 및 그룹화
- 일일 누적 비용 보기

월말 예상 비용은 당월의 예상 사용량 데이터를 계약 요금에 적용하여 계산됩니다. 예상 비용은 매월 12일경에 제공되며 매일 업데이트됩니다. 예상 비용은 예상치이므로 최종 월별 비용과 금액이 다를 수 있습니다.

### 비용요약 (상위 조직)

비용 요약 기능은 단일 조직 또는 다수 조직으로서의 Datadog 사용량에 따라 변경됩니다. 다수 조직에서는 상위 조직 및 각 하위 조직에 대한 예상 비용을 볼 수 있습니다.

{{< img src="account_management/plan_and_usage/multi-org-estimated-projected-cost-summary.png" alt="전체 월별 비용, 예상 비용, 누적 비용 분석 그래프 및 요약 표를 보여주는 상위 조직의 Cost Summary 스크린샷입니다." >}}

1. 상위 조직에 로그인한 상태에서 [Plan & Usage][2]로 이동합니다.
1. **Usage** 탭을 클릭합니다.
1. 여러 조직의 경우 **Overall** 탭이 선택되었는지 확인합니다.

#### 보기 및 필터

왼쪽의 검색 패싯을 사용하여 **Products** 또는 **Sub-Orgs** 별로 비용을 필터링하세요. **Over Time** 탭을 사용하면 일일 누적 비용이 어떻게 변했는지 확인할 수 있습니다.

#### 다운로드

쉼표로 구분된 값의 파일로 데이터를 다운로드하려면 **Download as CSV**를 클릭합니다. 데이터는 이번 달과 미리 정의된 이전 달에 사용할 수 있습니다. `Cost Type` 필드를 사용하여 기록을 구분합니다:
- **Projected**: 이번 달의 데이터를 사용할 수 있습니다.
- **Estimated MTD**: 데이터는 매월 1일부터 현재 날짜까지 사용할 수 있습니다. 이전 달의 과거 비용 데이터를 아직 사용할 수 없는 경우 이전 달의 예상 비용 데이터도 표시됩니다.
- **Historical**: 데이터는 월 마감 후, 즉 월말로부터 약 16일 후에 사용할 수 있습니다.

API를 통해 예상 비용 데이터를 쿼리하려면 [계정 전체에서 예상 비용 가져오기][3]를 참조하세요. API를 통해 예상 비용 데이터를 쿼리하려면 [계정 전체에서 예상 비용 가져오기][6]를 참조하세요.

### 비용 요약 (하위 조직)

<div class="alert alert-warning">이 기능은 베타 버전입니다. 액세스를 요청하고 조직이 기능 기준을 충족하는지 확인하려면 계정 담당자 또는 <a href="https://docs.datadoghq.com/help/">고객 지원팀</a>에 문의하세요.</div>

하위 조직으로서 귀하는 해당 조직의 비용만 볼 수 있습니다. 이러한 제한으로 인해 더 많은 분산 소유권이 허용되고 상위 조직에 더 광범위한 관리 권한을 부여할 필요가 없습니다.

{{< img src="account_management/plan_and_usage/sub-org-estimated-projected-cost-summary.png" alt="전체 월별 비용, 예상 비용, 누적 비용 분석 그래프 및 요약 표를 보여주는 하위 조직에 대한 Cost Summary 스크린샷입니다." >}}

1. 하위 조직에 로그인한 상태로 [Plan & Usage][2]로 이동합니다.
1. **Usage** 탭을 클릭합니다.
1. **Overall** 탭이 선택되었는지 확인하세요.

#### 보기 및 필터

왼쪽의 검색 패싯을 사용하여 **Products** 별로 비용을 필터링합니다. **Over Time** 탭을 사용하여 일별 누적 비용이 어떻게 변했는지 확인합니다.

#### 다운로드

쉼표로 구분된 값 파일로 데이터를 다운로드하려면 **Download as CSV**를 클릭하세요.

## 비용 지불 거절

비용 지불 거절을 사용해 다음을 수행할 수 있습니다.
- 여러 조직에 대한 월별 예상 비용 및 과거 비용 보기
- 각 하위 조직에 비용 할당

비용 지불 거절은 다음에 의해 발생합니다.
- 하위 조직 사용량 비율 계산하기. 하위 조직별 사용량을 전체 상위 조직 사용량으로 나누어 계산합니다.
- 상위 조직 비용에 대한 하위 조직 사용 비율을 적용하여 하위 조직별 비용 지불 거절을 제공합니다.

### 과거 비용 지불 거절

상위 조직에서 제품 및 하위 조직별로 집계된 최종 기록 비용을 볼 수 있습니다.

{{< img src="account_management/plan_and_usage/historical-cost-chargebacks.png" alt="4개 하위 조직의 총 사용량과 총 비용을 달러로 표시한 'Usage and Cost Summary'라는 제목의 표 스크린샷입니다" >}}

1. 상위 조직에 로그인한 상태에서 [Plan & Usage][2]로 이동합니다.
1. **Usage** 탭을 선택합니다.
1. **Individual Organizations**를 클릭합니다.
1. **Billable** 및 **Cost** 토글이 선택되었는지 확인합니다.
1. 날짜 선택기를 사용하여 청구가 완료된 이전 달을 확인합니다.

**참고**: 데이터는 월 마감 후, 즉 월말로부터 약 16일 후에 사용할 수 있습니다.

### 예상된 비용 지불 거절

상위 조직에서 제품 및 하위 조직별로 집계된 예상 비용을 확인합니다.

이번 달의 예상 비용 데이터를 사용할 수 있습니다. 이전 달의 과거 비용 데이터를 아직 사용할 수 없는 경우 이전 달의 예상 비용 데이터도 표시됩니다.

{{< img src="account_management/plan_and_usage/estimated-cost-chargebacks.png" alt="4개 하위 조직의 총 사용량과 총 비용을 달러로 표시한 'Usage and Cost Summary'라는 제목의 표 스크린샷입니다." >}}

1. 상위 조직에 로그인한 상태에서 [Plan & Usage][2]로 이동합니다.
1. **Usage** 탭을 선택합니다.
1. **Individual Organizations**를 클릭합니다.
1. **Billable** 및 **Cost** 토글이 선택되었는지 확인합니다.
1. 날짜 선택기에 현재 또는 이전 달이 표시되는지 확인합니다.

### 다운로드

- 쉼표로 구분된 값 파일로 과거 또는 예상 비용 지불 거절 데이터를 다운로드하려면 **Download as CSV**를 클릭하세요.
- API를 통해 과거 비용 지불 거절 데이터를 쿼리하려면 [계정 전체에서 과거 비용 조회하기][4]를 참조하세요.
- API를 통해 예상 비용 지불 거절 데이터를 쿼리하려면 [계정 전체에서 얘상 비용 조회하기][3]를 참조하세요.

## 청구 집계가 비용 변경에 미치는 영향

예상 월별 Datadog 청구서는 월별로 달라집니다. 각 제품을 청구하는 데 사용되는 집계 유형에 따라 비용이 어떻게 영향을 받는지가 결정됩니다. 가장 적합한 시각화를 보려면 [비용 요약][5] 기능 차트를 참조하세요. 각 **Products** 필터에는 제품 이름 옆에 관련 청구 집계 방법이 포함되어 있습니다.

### 백분위수 및 평균 사용량 청구

해당 월의 사용량 중 하위 99%의 최대 카운트(높은 워터 마크)를 기준으로 청구되는 제품에는 인프라 호스트 및 APM 호스트가 포함됩니다. 월 평균으로 청구되는 제품에는 커스텀 메트릭 및 Fargate 작업이 포함됩니다. 이 두 가지 유형의 제품의 경우 한 달 내내 비용이 비교적 안정적으로 유지될 것으로 예상할 수 있습니다. 그러나 사용량이 크게 급증하거나 감소하는 경우 비용이 변경될 수 있습니다.

### 사용량 청구 합계

한 달 동안의 사용량 합계로 요금이 청구되는 제품에는 인덱싱된 로그와 수집된 로그가 포함됩니다. 이러한 유형의 제품의 경우 사용량 변화에 따라 비용이 증가하거나 감소할 것으로 예상합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /ko/api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /ko/api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /ko/account_management/plan_and_usage/cost_details/#cost-summary
[6]: /ko/api/latest/usage-metering/#get-projected-cost-across-your-account