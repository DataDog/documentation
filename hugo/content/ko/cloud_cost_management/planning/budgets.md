---
aliases:
- /ko/cloud_cost_management/budgets/
description: Cloud Cost Management에서 비용 수집을 시작한 후, 예산을 설정하고 예산 대비 현황을 Cloud Cost Management에서
  조회할 수 있습니다.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: 블로그
  text: Datadog Cloud Cost Management로 OCI 비용 관리 및 최적화하기
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: 블로그
  text: Datadog의 예산 예측 기능을 사용하여 클라우드 지출을 계획하고 관리하기
title: 예산
---
## 개요 {#overview}
예산을 설정하고 엔지니어링 팀이 예산 대비 현황을 조회할 수 있도록 지원하세요.

두 가지 유형의 예산을 생성할 수 있습니다.

- {{< ui >}}Basic{{< /ui >}}: 클라우드 비용을 추적하기 위한 단일 수준의 고정 예산입니다.
- {{< ui >}}Hierarchical{{< /ui >}}: 조직 구조를 반영하는 방식으로 비용을 추적하기 위한 2단계 상위-하위 예산입니다. 예를 들어, 조직에 여러 팀으로 구성된 부서가 있는 경우 부서(상위) 및 팀(하위) 수준에서 예산을 책정하고 두 수준 모두에서 예산 상태를 추적할 수 있습니다. 또한 이 옵션을 사용하면 여러 예산을 생성할 필요 없이 단일 예산을 생성할 수 있습니다.

## 예산 설정 {#set-up-budgets}

{{< tabs >}}
{{% tab "기본" %}}

기본 예산을 생성하려면 다음 단계를 따르세요.

1. [**Cloud Cost > Plan > Budgets**][1]로 이동하거나 [API][2] 또는 [Terraform][3]을 통해 예산을 생성합니다.
1. {{< ui >}}New Budget{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Basic{{< /ui >}}을 클릭하여 기본 예산을 생성합니다.
1. UI에서 제공된 템플릿을 사용하여 {{< ui >}}uploading a CSV{{< /ui >}}를 통해 예산 정보를 추가하거나, 아래 세부 정보로 {{< ui >}}enter your budget directly{{< /ui >}}를 사용할 수 있습니다.

   {{< img src="cloud_cost/budgets/budget-create-basic-1.mp4" alt="CSV를 업로드하여 예산 정보를 추가할지, UI 내에서 직접 입력할지 선택하세요." video="true">}}

   - {{< ui >}}Budget Name{{< /ui >}}: 예산의 이름을 입력합니다.
   - {{< ui >}}Start Date{{< /ui >}}: 예산의 시작 날짜를 입력합니다(과거 월도 가능합니다). 예산은 월 단위로 설정됩니다.
   - {{< ui >}}End Date{{< /ui >}}: 예산의 종료 날짜를 설정합니다(미래 날짜도 가능합니다).
   - {{< ui >}}Provider(s){{< /ui >}}: AWS, Azure, Google Cloud, Oracle Cloud 또는 기타 SaaS(Datadog 또는 사용자 지정 비용 포함)의 조합으로 예산을 책정합니다.
   - {{< ui >}}Dimension to budget by{{< /ui >}}: 추적할 디멘션(팀, 서비스, 환경 등)을 지정합니다. 그런 다음 예산 표에 특정 값을 직접 정의합니다. 예를 들어, 상위 4개 팀에 대한 예산을 생성하려면 디멘션으로 'team'을 선택하고 표의 행으로 팀을 추가합니다. 기존 태그를 선택하거나 새 태그를 추가하여 향후 지출을 추적할 수 있습니다.

1. 표에 모든 예산을 입력합니다. 첫 번째 달의 값을 나머지 달에도 동일하게 적용하려면 행의 첫 번째 열에 값을 입력하고 {{< ui >}}copy{{< /ui >}} 버튼을 클릭합니다.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="예산 생성 보기: 예산 세부 정보를 입력합니다." style="width:100%;" >}}

1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /ko/api/latest/cloud-cost-management/#create-or-update-a-budget
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/cost_budget

{{% /tab %}}

{{% tab "계층형" %}}

계층형 예산을 생성하려면 다음 단계를 따르세요.

1.  [**Cloud Cost > Plan > Budgets**][1]로 이동하거나 [API][2]를 통해 예산을 생성합니다.
1. {{< ui >}}New Budget{{< /ui >}}을 클릭합니다.
1.  {{< ui >}}Hierarchical{{< /ui >}}을 클릭하여 계층형 예산을 생성합니다.
1. 아래 세부 정보를 사용하여 예산 정보를 입력합니다.

   - {{< ui >}}Budget Name{{< /ui >}}: 예산의 이름을 입력합니다.
   - {{< ui >}}Start Date{{< /ui >}}: 예산의 시작 날짜를 입력합니다(과거 월도 가능합니다). 예산은 월 단위로 설정됩니다.
   - {{< ui >}}End Date{{< /ui >}}: 예산의 종료 날짜를 설정합니다(미래 날짜도 가능합니다).
   - {{< ui >}}Scope to Provider(s){{< /ui >}}: AWS, Azure, Google Cloud, Oracle Cloud 또는 기타 SaaS(Datadog 또는 사용자 지정 비용 포함)의 조합으로 예산을 책정합니다.
   - {{< ui >}}Parent Level{{< /ui >}}: 상위 수준 태그를 선택합니다.
   - {{< ui >}}Child Level{{< /ui >}}: 하위 수준 태그를 선택합니다.
   - {{< ui >}}Dimension to budget by{{< /ui >}}: 추적할 디멘션(팀, 서비스, 환경 등)을 지정합니다. 그런 다음 예산 표에 특정 값을 직접 정의합니다. 예를 들어, 상위 4개 팀에 대한 예산을 생성하려면 디멘션으로 'team'을 선택하고 표의 행으로 팀을 추가합니다. 기존 태그를 선택하거나 새 태그를 추가하여 향후 지출을 추적할 수 있습니다.

1. 표에 모든 예산을 입력합니다. 첫 번째 달의 값을 나머지 달에도 동일하게 적용하려면 행의 첫 번째 열에 값을 입력하고 {{< ui >}}copy{{< /ui >}} 버튼을 클릭합니다.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="예산 생성 보기: 예산 세부 정보를 입력합니다." style="width:100%;" >}}

1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /ko/api/latest/cloud-cost-management/#create-or-update-a-budget

{{% /tab %}}
{{< /tabs >}}

## 예산 상태 보기 {#view-budget-status}
[예산 페이지][1]에는 조직의 모든 예산이 나열되며, 예산 작성자, 예산을 초과한 항목,
및 기타 관련 세부 정보가 강조 표시됩니다. {{< ui >}}View Performance{{< /ui >}}를 클릭하여 예산을 조사하고 예산 초과 원인을 파악하세요.

   {{< img src="cloud_cost/budgets/budget-list-1.png" alt="모든 예산 나열">}}

개별 예산의 {{< ui >}}View Performance{{< /ui >}} 페이지에서 왼쪽 상단의 보기 옵션을 전환할 수 있습니다.

<div class="alert alert-info">
비용 메트릭은 15개월 동안 보관되므로 15개월 이전의 예산 대비 실적은 볼 수 없습니다.
</div>

- {{< ui >}}current month{{< /ui >}}의 예산 상태를 볼 수 있습니다.

   {{< img src="cloud_cost/budgets/budget-status-month-2.png" alt="예산 상태 보기: 당월 보기">}}

- 또는 {{< ui >}}entire duration (all){{< /ui >}}의 예산 상태를 볼 수 있습니다.

   {{< img src="cloud_cost/budgets/budget-status-all-2.png" alt="예산 상태 보기: 총 예산 보기">}}

예산을 조사하려면 다음 단계를 따르세요.
1. 개별 예산 페이지에서 상단의 드롭다운을 사용하여 예산을 필터링하거나 표에서 {{< ui >}}Apply filter{{< /ui >}}를 클릭하여 예산을 초과한 디멘션을 조사하세요.
   {{< img src="cloud_cost/budgets/budget-investigate-3.png" alt="드롭다운 필터나 표의 필터 적용 옵션을 사용하여 예산을 초과한 디멘션을 조사하세요.">}}
2. {{< ui >}}Copy Link{{< /ui >}}를 클릭하여 예산 초과 원인을 파악할 수 있도록 다른 사람들과 예산을 공유하세요. 또는 예산 대비 진행 상황을 파악할 수 있도록 재무팀과 예산을 공유하세요.

## 예산 수정 또는 삭제 {#modify-or-delete-a-budget}
예산을 수정하려면 예산 페이지에서 편집 아이콘을 클릭하세요.

{{< img src="cloud_cost/budgets/budget-edit-1.png" alt="편집 아이콘을 클릭하여 예산을 편집하세요."  style="width:70%;">}}

예산을 삭제하려면 예산 페이지에서 휴지통 아이콘을 클릭하세요.

{{< img src="cloud_cost/budgets/budget-delete-2.png" alt="삭제 아이콘을 클릭하여 예산을 삭제하세요."  style="width:70%;">}}

## 대시보드에 예산 추가 {#add-a-budget-to-a-dashboard}

다음 두 가지 방법으로 대시보드에 예산을 추가할 수 있습니다.

- 예산 보고서를 만들고 {{< ui >}}Share{{< /ui >}} > {{< ui >}}Save to dashboard{{< /ui >}}를 클릭하세요.

  {{< img src="cloud_cost/budgets/budget-share-from-dashboard.png" alt="Share 및 Save to dashboard을 클릭하여 대시보드에 예산 보고서를 추가하세요."  style="width:100%;">}}

- 대시보드에서 {{< ui >}}Budget Summary{{< /ui >}} 위젯을 추가하세요.

  {{< img src="cloud_cost/budgets/budgets-widgets.png" alt="대시보드에서 예산 요약 위젯을 검색하여 추가하세요."  style="width:100%;">}}

## 예산에 대한 경고 생성 {#create-an-alert-for-your-budget}

실제 지출 또는 예상 지출이 예산의 일정 비율을 초과할 것으로 예상될 때 경고하도록 [예산 기반 모니터][2]를 만드세요.

## 예산에서 예측 보기 {#view-forecasts-in-budgets}

예산 카드는 사용 가능한 경우 예측 정보를 자동으로 표시하여 각 예산 기간에 대한 예상 비용을 보여줍니다. 예상 비용이 예산을 초과할 것으로 예상되면 예산 상태에 {{< ui >}}Projected Over{{< /ui >}}가 표시되어 예산을 초과하기 전에 조치를 취할 수 있도록 도와줍니다.

예산에서 자세한 예측 정보를 보려면 {{< ui >}}View Performance{{< /ui >}}를 클릭하고 {{< ui >}}Show Forecast{{< /ui >}}를 전환하여 실제 지출과 함께 예측 비용을 시각화하세요.

[예측][3]의 작동 방식 및 데이터 요구 사항에 대해 자세히 알아보세요.

## 예산 예측 사용자 지정 {#customize-your-budget-forecast}

Datadog은 각 예산에 대해 **Bits 예측**을 자동으로 생성하여 과거 지출을 바탕으로 향후 비용을 예측합니다. 계획된 제품 출시, 마이그레이션, 계절적 수요 또는 폐기된 워크로드와 같이 Bits 예측이 파악할 수 없는 정보를 알고 있는 경우, 자체 값으로 재정의할 수 있습니다. 이 재정의를 **사용자 지정 예측**이라고 합니다.

사용자 지정 예측 값은 다음과 같습니다.

- `ccm_forecast_write` 권한이 있는 경우 편집할 수 있습니다( [권한](#permissions) 참조).
- 현재 월 및 향후 월에 대해 편집할 수 있습니다.

[계층적 예산](#set-up-budgets)의 경우 하위 수준에서 사용자 지정 예측 값을 편집합니다. 상위 수준에는 하위 수준의 합계가 반영됩니다.

설정되면 사용자 지정 값이 예산 상태 페이지의 Bits 예측, 예산 페이지의 예측 합계 및 [예산 모니터][2]보다 우선합니다.

### 사용자 지정 예측 값 추가 또는 편집 {#add-or-edit-custom-forecast-values}

{{< tabs >}}
{{% tab "예산 생성 시" %}}

1. [예산 설정](#set-up-budgets) 단계에 따라 예산 생성을 시작합니다.
1. {{< ui >}}Customize Bits Forecast{{< /ui >}}를 토글하여 예산 열 사이에 예측 열을 표시합니다. 각 월에는 {{< ui >}}Budget{{< /ui >}} 열과 {{< ui >}}Forecast{{< /ui >}} 열이 표시됩니다.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create.png" alt="Customize Bits Forecast를 토글하여 예측 열 표시" style="width:100%;">}}

1. 각 예측 셀에는 Bits forecast가 회색 자리 표시자로 표시됩니다. 금액을 입력하여 재정의합니다. 음수 값은 허용되지 않습니다.

   편집하는 동안 미리 보기 차트가 업데이트되므로 저장하기 전에 최종 예측을 검토할 수 있습니다.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create-table.png" alt="Customize Bits Forecast를 토글하여 예측 열 표시" style="width:100%;">}}

1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{% /tab %}}
{{% tab "예산 편집 시" %}}

1. [예산 페이지][1]에서 예산 편집 아이콘을 클릭합니다.

   `ccm_forecast_write`권한이 있는 경우 예측 열이 자동으로 표시됩니다. 각 예측 셀에는 저장된 재정의 값이 표시되거나, 재정의 값이 없는 경우 Bits forecast가 회색 자리 표시자로 표시됩니다.

1. 예측 셀에 달러 금액을 입력하거나 변경합니다. 음수 값은 허용되지 않습니다.
1. 재정의한 값을 원래의 자동 값과 비교하려면 {{< ui >}}Show Bits AI forecast{{< /ui >}}를 토글하여 각 예측 열 옆에 읽기 전용 Bits AI 열을 표시합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: https://app.datadoghq.com/cost/plan/budgets

{{% /tab %}}
{{< /tabs >}}

편집하는 동안 각 예측 셀의 모양은 해당 상태를 나타냅니다.

| 셀 모양 | 의미 |
|---|---|
| 회색 텍스트 | Bits 예측 자리 표시자: 이 셀에는 재정의가 설정되어 있지 않습니다. |
| 검은색 텍스트 | 저장된 사용자 지정 예측 재정의. |
| 파란색 테두리가 있는 검은색 텍스트 | 입력했지만 아직 저장하지 않은 재정의. |

재정의를 제거하려면 셀을 삭제하세요. 셀이 회색 Bits 예측 자리 표시자로 되돌아갑니다.

<div class="alert alert-info">Datadog은 예산을 먼저 저장한 다음 사용자 지정 예측을 저장합니다. 예산은 저장되었으나 사용자 지정 예측이 저장되지 않은 경우, 편집 페이지에서 다시 시도하라는 알림이 표시됩니다.</div>

### 사용자 지정 예측 사용 방법 {#how-custom-forecasts-are-used}

- **예산 상태**: 예산 상태 페이지와 예산 페이지의 예측 합계에는 사용자 지정 예측이 포함됩니다.
- **예산 모니터**: [예산 모니터][2]가 평가할 때 사용자 지정 예측이 있으면 Bits 예측보다 우선합니다.
- **CSV 내보내기**: 예산을 CSV로 다운로드하면 설정된 사용자 지정 예측 값이 포함됩니다.
- **예산 삭제**: 예산을 삭제하면 연결된 사용자 지정 예측 값도 삭제됩니다.

## 권한 {#permissions}

| 액션 | 필수 권한 |
|--------|---------------------|
| 예산 조회 | `cloud_cost_management_read` |
| 예산 생성, 편집 또는 삭제 | `ccm_budget_write` |
| 사용자 지정 예측 값 편집 | `ccm_forecast_write` |

전체 CCM 권한 목록은 [권한 문서][4]를 참조하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /ko/cloud_cost_management/cost_changes/monitors/
[3]: /ko/cloud_cost_management/planning/forecasting
[4]: /ko/cloud_cost_management/setup/permissions