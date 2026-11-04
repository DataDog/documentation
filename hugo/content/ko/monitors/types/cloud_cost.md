---
description: 실시간 AI 비용 증가를 비롯한 클라우드 비용의 변동, 임계값, 예측, 이상 징후를 모니터링하세요.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: 블로그
  text: Datadog Cloud Cost Management를 사용하여 OCI 비용 관리 및 최적화하기
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: 설명서
  text: Cloud Cost Management
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/downtimes/
  tag: 설명서
  text: 모니터 음소거를 위한 가동 중지 예약
- link: /monitors/status/
  tag: 설명서
  text: 모니터 상태 확인
- link: https://www.datadoghq.com/blog/ccm-cost-monitors/
  tag: 블로그
  text: Datadog Cloud Cost Management용 비용 모니터를 사용해 비용 초과에 빠르게 대응하기
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: 블로그
  text: Datadog을 통해 엔지니어가 Google Cloud 비용을 직접 관리하도록 지원하기
title: Cloud Cost 모니터
---
## 개요 {#overview}

Cloud Cost 모니터를 사용하면 클라우드 비용 변동을 사전에 파악하고, 예산 초과가 예상되는지 확인하여 원인을 조사할 수 있습니다.

-   모든 비용 모니터를 즉시 확인하고 팀, 서비스, 태그, 공급자, 경보 기준으로 필터링하거나 검색합니다.
-   설정된 모니터 수, 경보를 보내는 모니터, 추적 중인 클라우드 지출 영역에 대한 요약을 확인합니다.
-   템플릿을 사용하여 새 비용 모니터를 생성하고, 주의가 필요한 모니터에 대해 조치를 취합니다.

Cloud Cost 모니터를 구성하려면 [Cloud Cost Management][1]를 설정해야 합니다.

경보 대상 비용 데이터에 맞는 설정을 선택하세요.

-   [모니터 생성](#create-a-monitor): 비용 변동, 임계값, 예측, 예산, 확정된 비용 이상 징후를을 모니터링하도록 설정합니다. 이 모니터는 확정된 청구 데이터를 사용하며 평가 주기는 30분, 평가 지연 기간은 48시간으로 지정되어 있습니다. 청구 데이터는 사용 후 48시간이 지나야 사용할 수 있기 때문입니다. 예를 들어, 1월 15일에 7일 조회 기간을 평가하는 경우 1월 6일부터 1월 13일까지의 비용 데이터를 검토합니다.
-   [실시간 AI 이상 징후 모니터 생성](#create-a-real-time-ai-anomaly-monitor): [Agent Observability][102]의 예상 AI 비용이 예기치 않게 증가하면 15분 이내에 경보를 보내도록 설정합니다.

## 모니터 생성 {#create-a-monitor}

이 절차는 확정된 청구 데이터를 사용하는 Cloud Cost 모니터(변동, 임계값, 예측, 예산, 확정된 이상 징후 모니터)에 적용됩니다. 예상 AI 비용과 관련하여 15분 이내에 경보를 보내려면 [실시간 AI 이상 징후 모니터 생성](#create-a-real-time-ai-anomaly-monitor)을 참조하세요.

Datadog에서 Cloud Cost 모니터를 생성하려면 [{{< ui >}}Cloud Cost > Analyze > Cost Monitors{{< /ui >}}][4]로 이동한 다음 {{< ui >}}\+ New Cost Monitor{{< /ui >}}를 클릭합니다.

또는 [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Cloud Cost{{< /ui >}}][3], 기본 탐색 메뉴, [Cloud Cost Explorer][5] 또는 [Terraform][2]에서 설정할 수 있습니다.

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="비용 모니터 페이지의 모니터 생성 버튼" style="width:100%;" >}}

### 비용 모니터 유형 선택{#select-a-cost-monitor-type}

다음 모니터 유형 중에서 선택할 수 있습니다.

| 모니터 유형 | 비용 메트릭 기반 | 목적                                                                                                                                                                                                                                                   | 예시                                                                                            |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 변동      | 예               | 일일, 주간, 월간 비용 변동을 탐지합니다.                                                                                                                                                                                                            | 오늘의 비용과 일주일 전 비용의 차이가 5%를 초과하면 경보를 보냅니다.                     |
| 이상 징후    | 예               | 비정상적이거나 예상치 못한 비용 패턴을 식별합니다. <br> <br> 확정된 모니터는 불완전한 날짜를 제외하며, 알고리즘 학습을 위해서는 과거 데이터가 필요하므로 최소 1개월간의 클라우드 비용 데이터가 필요합니다. [실시간 AI 이상 징후 모니터](#create-a-real-time-ai-anomaly-monitor)는 예상 AI 비용과 관련하여 15분 이내에 경보를 보냅니다. | 지난 30일 중 3일 동안 과거 데이터와 비교하여 상당한 비용 이상 징후가 나타나면 경보를 보내거나, AI 비용이 예상치 못하게 증가하면 15분 이내에 경보를 보냅니다. |
| 임계값    | 예               | 비용이 설정된 값을 초과하면 경보를 보냅니다.                                                                                                                                                                                                                      | 오늘의 총 비용이 $10,000를 초과하면 경보를 보내도록 설정합니다.                                                |
| 예측     | 예               | 예측 비용이 임계값을 초과하면 경보를 보냅니다.                                                                                                                                                                                                            | 이번 달 예상 비용이 $500를 초과할 것으로 예상되면 매일 경보를 보냅니다.                     |
| 예산       | 아니요                | 실제 비용 또는 [예측][8] 비용이 [예산][7]을 초과하면 경보를 보냅니다.                                                                                                                                                                                         | 예상 월 비용이 할당된 $10,000 예산의 90%를 초과할 것으로 예상되면 경보를 보냅니다.      |

### 추적하려는 비용 지정 {#specify-which-cost-to-track}

{{< tabs >}}
{{% tab "비용 메트릭 기반" %}}

Datadog에 보고되는 모든 비용 유형/메트릭은 모니터에 사용할 수 있습니다. 비용 메트릭과 함께 사용자 지정 메트릭 또는 관측 가능성 메트릭을 사용하여 단위 경제성을 모니터링할 수 있습니다.

| 단계                     | 필수 | 기본값           | 예시                 |
| ------------------------ | -------- | ----------------- | ----------------------- |
| 비용 메트릭 선택   | 예      | 모든 공급자     | `azure.cost.actual`     |
| `filter by`   |  정의 아니요       | 없음           | `aws_product:s3`        |
| 그룹화                 | 아니요       | 없음           | `aws_availability_zone` |
| 관찰 가능성 메트릭 추가 | 아니요       | `system.cpu.user` | `aws.s3.all_requests`   |

편집기를 사용하여 비용 유형 또는 내보내기를 정의합니다.

{{< img src="monitors/monitor_types/cloud_cost/cost-monitors-specify-cost.png" alt="추적하려는 비용을 지정하기 위한 Cloud Cost 및 Metrics 데이터 소스 옵션" style="width:100%;" >}}

{{% /tab %}}
{{% tab "예산 기반" %}}

드롭다운에서 모니터링하려는 기존 예산을 선택합니다.

{{< img src="monitors/monitor_types/cloud_cost/budget-monitor-select-budget.png" alt="비용을 추적할 예산을 지정하는 드롭다운" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [Cloud Cost Management 설명서][1]를 참조하세요.

### 경보 조건 설정 {#set-alert-conditions}

{{< tabs >}}
{{% tab "변경 사항" %}}

{{< ui >}}Cost Changes{{< /ui >}} 모니터 유형을 사용하는 경우 비용이 정의된 임계값보다 `increases`되거나 `decreases`할 때 경보를 트리거할 수 있습니다. 임계값은 {{< ui >}}Percentage Change{{< /ui >}} 또는 {{< ui >}}Dollar Amount{{< /ui >}}로 설정할 수 있습니다.

{{< ui >}}Percentage Change{{< /ui >}}를 사용하는 경우 특정 금액 임계값 미만의 변동을 필터링할 수 있습니다. 예를 들어, 해당 모니터는 $500를 초과하는 금액 변동 중에서 변동률이 5%를 넘으면 경보를 보냅니다.

{{% /tab %}}

{{% tab "이상 징후" %}}

이 조건은 {{< ui >}}Alert on{{< /ui >}}이 {{< ui >}}finalized{{< /ui >}}일 때 적용됩니다. 예상 AI 비용과 관련하여 15분 이내에 경보를 보내려면 [실시간 AI 이상 징후 모니터 생성](#create-a-real-time-ai-anomaly-monitor)을 참조하세요.

{{< ui >}}Cost Anomalies{{< /ui >}} 모니터 유형의 경우, 관찰된 비용이 과거 데이터와 비교하여 임계값 `above`, `below`, `above or below`에 해당할 때 경보를 트리거할 수 있습니다.

`agile` [이상 징후 알고리즘][101] 사용 시 두 개의 경계와 월별 계절성을 적용합니다.

[101]: /ko/dashboards/functions/algorithms/

{{% /tab %}}

{{% tab "임계값" %}}

{{< ui >}}Cost Threshold{{< /ui >}} 모니터 유형을 사용하는 경우 클라우드 비용이 임계값 `above`, `below`, `above or equal`, `below or equal to`일 때 경보를 트리거할 수 있습니다.

{{% /tab %}}
{{% tab "예측" %}}

{{< ui >}}Cost Forecast{{< /ui >}} 모니터 유형을 사용하는 경우 클라우드 비용이 임계값 `above`, `below`, `above or equal`, `below or equal to`, `equal to`, `not equal to`일 때 경보를 트리거할 수 있습니다.

{{% /tab %}}

{{% tab "예산" %}}
{{< ui >}}Budget{{< /ui >}} 모니터 유형을 사용하는 경우 실제 또는 예상 클라우드 비용이 이전 단계에서 선택한 예산의 일정 비율을 초과할 때 경보를 트리거할 수 있습니다.

| 단계             | 목적                                                                           | 값                            |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| 평가 기준 | 모니터가 실제 지출 또는 예상 지출을 예산과 비교하는지 여부입니다. | `actual`, `forecasted`            |
| 세분성      | 비용을 평가하는 세부 수준입니다.                                   | `overall` (총 비용), `per_row` |
| 임계값        | 경보 트리거 기준이 되는 예산 사용률입니다.                       | 0에서 100 사이의 숫자(%)      |
| 기간        | 임계값 초과 여부를 평가하는 데 사용되는 평가 기간입니다.                    | `all_months`, `current_month`     |

{{< ui >}}is forecasted to reach{{< /ui >}}를 선택하면 모니터는 예산 카드 및 예산 상태 페이지와 동일한 [예측 모델][8]을 사용합니다.

[8]: /ko/cloud_cost_management/planning/forecasting/
{{% /tab %}}
{{< /tabs >}}

<br>

### 알림 및 자동화 구성 {#configure-notifications-and-automations}

{{< ui >}}Configure notifications and automations{{< /ui >}} 섹션에 대한 상세 지침은 [알림][6] 페이지를 참조하세요.

### 권한 및 감사 알림 정의 {#define-permissions-and-audit-notifications}

모니터를 **조회**하거나 **편집**할 수 있는 팀, 역할, 사용자, 서비스 계정을 선택합니다. 기본적으로 조직의 모든 구성원이 액세스 권한을 보유합니다.

또한 {{< ui >}}Audit Notifications{{< /ui >}}을 활성화하여 모니터가 변경될 때마다 모니터 생성자와 수신자에게 경보를 보낼 수 있습니다.

## 실시간 AI 이상 징후 모니터 생성 {#create-a-real-time-ai-anomaly-monitor}

실시간 AI 이상 징후 모니터는 예상치 못한 AI 비용 증가를 탐지하고 15분 이내에 경보를 보냅니다. 이 모니터는 확정된 클라우드 청구 데이터가 아닌 [Agent Observability][102]의 예상 비용을 사용합니다. Datadog은 예상 비용에 대한 4시간 롤링 평가 기간을 기준으로 이상 징후를 식별합니다.

### 전제 조건 {#prerequisites}

- [Agent Observability][102]가 LLM 비용 데이터를 전송하고 있습니다. 예상 비용은 토큰 수와 공급자 책정 가격을 기준으로 계산됩니다. [Agent Observability 비용][103]을 참조하세요.
- [`ml_obs.span.llm.total.cost`][104] 메트릭이 보고되었습니다. {{< ui >}}real time{{< /ui >}} 옵션은 이 메트릭이 보고된 후 나타납니다.
- 최소 3일간의 비용 데이터를 사용할 수 있습니다. Datadog은 탐지 품질 보장을 위해 21일을 권장합니다.

### 모니터 구성 {#configure-the-monitor}

1. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Cost Monitors{{< /ui >}}][4]로 이동하고 {{< ui >}}\+ New Cost Monitor{{< /ui >}}를 클릭합니다.
2. {{< ui >}}Anomalies{{< /ui >}}를 선택합니다.
3.  {{< ui >}}Alert on{{< /ui >}}을 {{< ui >}}real time{{< /ui >}}으로 설정하고 비용 유형을 {{< ui >}}AI cost{{< /ui >}}로 설정합니다. 모니터는 지난 15분 이내에 탐지된 이상 징후에 대해 경보를 보냅니다.
4. 필요시 {{< ui >}}Filter cost to{{< /ui >}}를 통해 비용 범위를 지정하고, {{< ui >}}Detect anomalies on{{< /ui >}}을 통해 최대 2개의 태그로 그룹화합니다. `ml_app` 및 `model_provider`는 {{< ui >}}Preferred Tags{{< /ui >}} 아래에 나열됩니다.
5. 향후 24시간 동안의 예상 총 비용에 대한 임계값을 설정합니다. 조직의 통화로 최소 500을 입력합니다. Datadog이 이상 징후를 탐지하고 예상 총 비용이 이 임계값을 초과하면 모니터가 경보를 보냅니다.
6. [알림을 설정][6]합니다.

대신 확정된 클라우드 청구 데이터를 모니터링하려면 {{< ui >}}Alert on{{< /ui >}}을 {{< ui >}}finalized{{< /ui >}}로 설정하고 [모니터 생성](#create-a-monitor)을 따릅니다. 확정된 이상 징후 모니터는 agile 이상 징후 알고리즘을 사용하고, 불완전한 날짜를 제외하며, 최소 1개월간의 클라우드 비용 기록을 필요로 합니다.

## 수행할 수 있는 기타 작업 {#other-actions-you-can-take}

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-other-actions.png" alt="작업 메뉴가 열리면 Cloud Cost Explorer에서 모니터를 조회, 편집, 복제, 삭제할 수 있는 옵션이 표시됩니다." style="width:100%;" >}}

-   {{< ui >}}View in Monitors{{< /ui >}}를 클릭하여 모니터의 경보 기록을 확인하고, 시각화를 조정하고, 경보 트리거 빈도를 검토합니다.
-   {{< ui >}}View in Explorer{{< /ui >}}를 클릭하여 Cloud Cost Explorer에서 모니터를 열고 보다 상세한 분석을 수행합니다.
-   {{< ui >}}Edit{{< /ui >}}를 클릭하여 모니터의 설정이나 구성을 업데이트합니다.
-   {{< ui >}}Clone{{< /ui >}}을 클릭하여 {{< ui >}}Actions{{< /ui >}} > {{< ui >}}Clone{{< /ui >}}을 선택하면 기존 모니터의 복사본을 생성할 수 있습니다.
-   {{< ui >}}Delete{{< /ui >}}를 클릭하여 더 이상 필요하지 않은 모니터를 영구적으로 제거합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: https://app.datadoghq.com/monitors/create/cost
[4]: https://app.datadoghq.com/cost/analyze/monitors
[5]: https://app.datadoghq.com/cost/explorer
[6]: /ko/monitors/notify/
[7]: /ko/cloud_cost_management/planning/budgets/
[8]: /ko/cloud_cost_management/planning/forecasting/
[102]: /ko/llm_observability/
[103]: /ko/llm_observability/investigate/cost/
[104]: /ko/llm_observability/investigate/metrics/