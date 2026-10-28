---
description: Cloud Cost Management Forecasts를 사용하여 향후 클라우드 비용을 예측하고 정보에 입각한 의사결정을
  내리세요.
further_reading:
- link: /cloud_cost_management/planning/budgets
  tag: 설명서
  text: Cloud Cost Management 예산에 대해 알아보세요.
- link: /cloud_cost_management/reporting/
  tag: 설명서
  text: Cloud Cost Management 보고서에 대해 알아보세요.
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: 블로그
  text: Datadog의 예산 예측 기능을 사용하여 클라우드 지출을 계획하고 관리하기
title: 예측
---
## 개요 {#overview}

Cloud Cost Management(CCM) Forecasts는 과거 지출 패턴을 기반으로 향후 클라우드 비용을 예측하도록 돕습니다. 예측을 사용하여 비용 추세를 예상하고, 예산을 보다 효과적으로 계획하며, 리소스 할당에 대한 데이터 기반 의사결정을 내리세요.

예측은 다음에서 사용할 수 있습니다.
- [**보고서**](#view-forecasts-in-reports): 비용 보고서 및 예산 보고서에서 예측 토글을 활성화하여 예측 비용을 시각화합니다.
- [**예산**](#view-forecasts-in-budgets): 예산 카드에서 직접 예측 비용을 조회하여 예산 초과 여부를 확인합니다.

예측을 통해 다음을 수행할 수 있습니다.

- 과거 데이터를 기반으로 **지출 추세**를 예측하여 향후 비용을 예상합니다.
- **예상 비용**을 실제 지출과 함께 시각화하여 패턴을 파악하고 비용 추세를 이해합니다.
- 예측 데이터를 사용하여 **현실적인 예산 목표**를 설정하고 비용 초과를 방지합니다.
- 예측 비용이 **예산 목표를 초과**할 것으로 예상되는지 확인하여 예산 상태를 추적합니다.

## 예측 작동 방식 {#how-forecasting-works}

Cloud Cost Management는 예측 알고리즘을 사용하여 비용 예측을 생성합니다. 예측 모델은 과거 지출 데이터를 분석하여 다음과 같은 클라우드 비용의 패턴과 추세를 파악합니다.

- 주 단위 또는 월 단위 일정과 같이 **예측 가능한 일정**에 따라 발생하는 반복 비용.
- 시간 경과에 따른 비용의 **증가, 감소 또는 안정적 유지** 여부.
- **특정 기간이나 이벤트**에 해당하는 지출의 변화.

### 유연한 예측 옵션 {#flexible-forecasting-options}

계획 요구 사항에 맞춰 다양한 기간 및 롤업 간격에 대한 예측을 생성할 수 있습니다.

- {{< ui >}}Forecast periods{{< /ui >}}: 과거 지출 데이터를 기반으로 다음 청구 기간, 당월, 당년 또는 사용자 지정 날짜 범위에 대한 비용을 예측합니다.
- {{< ui >}}Rollup intervals{{< /ui >}}: 분석 요구 사항에 따라 일별 또는 월별 간격으로 예측을 조회합니다.

### 데이터 요구 사항 {#data-requirements}

정확한 예측을 생성하기 위해 CCM은 다음을 요구합니다.

- **최소 64일 연속 비용 데이터**: 이는 모델이 의미 있는 패턴을 식별할 수 있는 충분한 정보를 확보하도록 돕습니다. 사용 가능한 일수가 더 적은 경우, 모델은 남은 일수를 0으로 채워 예측을 생성합니다.
- **최근 데이터**: 모델은 예측을 생성하기 위해 최대 지난 64일간의 비용 내역을 사용합니다.

## Bits 및 사용자 지정 예측 {#bits-and-custom-forecasts}

Datadog이 과거 지출 내역을 바탕으로 자동으로 생성하는 예측을 **Bits 예측**이라고 합니다. 추세 기반이므로 과거 패턴을 미래로 투영하지만, 제품 출시, 마이그레이션 또는 계절적 수요와 같은 계획된 비즈니스 이벤트는 고려할 수 없습니다.

[예산][3]에서 Bits 예측을 **커스텀 예측**이라고 하는 귀하만의 월별 값으로 재정의할 수 있습니다. Datadog은 Bits 예측 위에 사용자 지정 예측을 오버레이하므로, 설정한 모든 곳에서 재정의 값이 우선 적용됩니다. 예산 및 예산 모니터는 기본적으로 재정의가 포함된 예측을 사용합니다.

사용자 지정 예측 값을 설정하려면 [예산 예측 사용자 지정][4]을 참조하세요.

## 보고서에서 예측 보기 {#view-forecasts-in-reports}

Datadog에서 [**Cloud Cost > Analyze > Reports**][1]로 이동하여 Cloud Cost 보고서 및 예산 보고서에서 예측을 활성화하세요.

### 비용 보고서 {#cost-reports}

1. {{< ui >}}Cost{{< /ui >}} 보고서를 열거나 생성하세요.
2. 왼쪽 패널에서 {{< ui >}}Show forecast{{< /ui >}}를 토글하여 예측을 활성화하세요.
3. {{< ui >}}Until end of{{< /ui >}}드롭다운에서 예측 기간을 선택하세요(다음 기간, 당월, 당해 연도 또는 사용자 지정 범위).
4. 롤업 간격(일별, 주별 또는 월별)을 선택하세요.

{{< img src="cloud_cost/forecasts/cost-report-with-forecast.png" alt="왼쪽 패널에 Show Forecast 토글이 있고 과거 데이터와 함께 빗금 패턴으로 예측 비용이 표시된 비용 보고서" style="width:100%;" >}}

보고서 표시 항목:
- {{< ui >}}Forecast toggle and controls{{< /ui >}}: 예측을 활성화하고, 기간을 선택하고, 롤업 간격을 선택하세요.
- {{< ui >}}Historical costs{{< /ui >}}: 단색으로 표시된 실제 지출.
- {{< ui >}}Forecasted costs{{< /ui >}}: 빗금 패턴으로 표시된 예측 비용.
- {{< ui >}}Forecast summary card{{< /ui >}}: 선택한 기간에 대한 총 예측 비용을 표시.

### 예산 보고서 {#budget-reports}

1. 보고서를 생성하거나 기존 {{< ui >}}Budget{{< /ui >}} 보고서를 여세요.
2. 왼쪽 패널에서 {{< ui >}}Show forecast{{< /ui >}}를 토글하여 예측을 활성화하세요.
3. {{< ui >}}Until end of{{< /ui >}}드롭다운에서 예측 기간을 선택하세요(다음 기간, 당월, 당해 연도 또는 사용자 지정 범위).

{{< img src="cloud_cost/forecasts/budget_report_forecast-2.png" alt="왼쪽 패널에 예측 토글이 있고 과거 데이터와 함께 예측 비용이 표시된 예산 보고서" style="width:100%;" >}}

보고서 표시 항목:
- {{< ui >}}Forecast toggle and controls{{< /ui >}}: 왼쪽 패널에 위치하며 예측 활성 및 기간 선택 가능.
- {{< ui >}}Historical costs{{< /ui >}}: 단색으로 표시된 실제 지출.
- {{< ui >}}Forecasted costs{{< /ui >}}: 빗금 패턴으로 표시된 예측 비용.
- {{< ui >}}Forecast summary card{{< /ui >}}: 선택한 기간에 대한 총 예측 비용을 표시.

## 예산에서 예측 보기 {#view-forecasts-in-budgets}

예산 요약에서 예측을 보려면 Datadog의 [**Cloud Cost > Plan > Budgets**][2]로 이동하세요.

예산 카드는 사용 가능한 경우 예측 정보를 자동으로 표시하여 각 예산 기간에 대한 예상 비용을 보여줍니다.

예상 비용이 예산을 초과할 것으로 예상되면 예산 상태에 {{< ui >}}Projected Over{{< /ui >}}가 표시되어 예산을 초과하기 전에 조치를 취할 수 있도록 도와줍니다.

{{< img src="cloud_cost/forecasts/budget-list-with-forecast.png" alt="예산 카드에 예측 값이 표시된 예산 목록" style="width:100%;" >}}

상세 예측 정보를 보려면 다음 단계를 따르세요.

1. Budgets 페이지에서 아무 예산의 {{< ui >}}View Performance{{< /ui >}} 항목을 클릭하여 상세 예산 보기를 엽니다.
2. 예산 성과 보기에서 {{< ui >}}Show Forecast{{< /ui >}}를 토글하여 예측을 활성화합니다.
3. 예산 성과 차트에는 다음이 표시됩니다.
   - {{< ui >}}Actual costs{{< /ui >}}: 단색으로 표시된 현재 지출.
   - {{< ui >}}Forecasted costs{{< /ui >}}: 실제 비용을 넘어 확장되는 빗금 패턴으로 표시된 예상 비용.
   - {{< ui >}}Forecasted Past{{< /ui >}}: 예측이 시작되는 지점을 나타내는 수직선.

{{< img src="cloud_cost/forecasts/updated_budget_status_forecast-1.png" alt="예측 토글과 빗금 패턴으로 표시된 예상 비용을 보여주는 예산 실적 보기" style="width:100%;" >}}

기본적으로 Datadog은 자동 Bits 예측과 예산에서 설정한 사용자 지정 예측 값을 결합합니다. Bits 예측을 귀하만의 월별 값으로 재정의하려면 [예산 예측 사용자 지정][4]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/reports
[2]: https://app.datadoghq.com/cost/plan/budgets
[3]: /ko/cloud_cost_management/planning/budgets
[4]: /ko/cloud_cost_management/planning/budgets#customize-your-budget-forecast