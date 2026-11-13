---
aliases:
- /ko/cloud_cost_management/reports
description: Cloud Cost Management 보고서를 사용하여 조직의 지출을 추적합니다.
further_reading:
- link: /cloud_cost_management/reporting/scheduled_reports
  tag: 설명서
  text: 예약된 비용 보고서
- link: /cloud_cost_management/reporting/explorer
  tag: 설명서
  text: Cost Explorer
- link: /cloud_cost_management/reporting/dashboards
  tag: 설명서
  text: Dashboards
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: 블로그
  text: Datadog Cloud Cost Management를 사용하여 공급자별 AI 비용 귀속하기
private: true
title: 비용 보고서
---
## 개요 {#overview}

Datadog의 Cloud Cost Monitoring(CCM) 보고서는 재무 운영팀과 재무팀이 클라우드 비용을 효율적으로 관리할 수 있도록 지원합니다. 이 기능은 상세한 비용 분석을 위한 중앙 집중식 플랫폼을 제공하여 클라우드 비용 및 예산 데이터를 탐색, 분석, 공유할 수 있도록 지원합니다.

Reports를 사용하면 다음 작업을 수행할 수 있습니다.

- [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][12] 및 [SaaS 공급자][4]의 비용을 중앙 집중화하여 분석합니다.
- 필터, 그룹화 및 다양한 차트 유형을 사용하여 데이터를 시각화하고 사용자 지정합니다.
- 지출을 추적하고 향후 비용을 예측할 수 있는 비용 및 예산 보고서를 생성합니다.
- 보고서를 저장하고 예약하여 팀과 공유합니다.

## 적절한 도구 선택 {#choose-the-right-tool}

유연한 조사를 위해 **[Cost Explorer][13]**를 사용하고, 표준화된 정기 분석을 위해 **Cost Reports**를 사용합니다.

| 기능 | Cost Explorer | Cost Reports |
|---------|---------------|--------------|
| 사용 사례 | 임시 분석 및 조사 | 저장된 보기 및 예약된 전송 |
| 쿼리 | 동적, 기본적으로 저장되지 않음 | 저장 및 재사용 가능 |
| 템플릿 | 템플릿 없음 | 사전 구축된 템플릿 사용 가능 |
| 예약 | 예약 불가 | 이메일/Slack 전송 예약 가능 |
| 워크플로 | 반복적 탐색 | 반복 보고 |

## CCM 보고서 생성 {#create-a-ccm-report}

1. Datadog에서 [**Cloud Cost > Analyze > Reports**][5]로 이동합니다.
1. 처음부터 시작하려면 {{< ui >}}New Report{{< /ui >}}를 클릭하고, 워크플로 속도를 높이려면 갤러리에서 템플릿을 선택합니다.

   {{< img src="cloud_cost/cost_reports/create-new-report-1.png" alt="새 보고서 생성 또는 템플릿을 사용한 보고서 생성" style="width:100%;" >}}

   **사용 가능한 템플릿:**
   - {{< ui >}}AWS Spend by Service Name{{< /ui >}}: EC2, S3 및 Lambda 비용을 파악합니다.
   - {{< ui >}}Azure Spend by Service Name{{< /ui >}}: 가상 머신 및 Azure Monitor와 같은 Azure 서비스별로 비용을 세분화합니다.
   - {{< ui >}}GCP Spend by Service Name{{< /ui >}}: Compute Engine, BigQuery 및 Kubernetes Engine과 같은 GCP 서비스별로 비용을 세분화합니다.
   - {{< ui >}}Datadog Spend by Product{{< /ui >}}: Infrastructure Hosts, Custom Metrics 및 Indexed Logs와 같은 Datadog 제품별로 비용을 세분화합니다.
   - {{< ui >}}Spend by Provider{{< /ui >}}: AWS, Azure, Google Cloud, Oracle Cloud 등의 비용을 비교합니다.

## 보고서 사용자 지정 {#customizing-your-report}

{{< img src="cloud_cost/cost_reports/customization-options-3.png" alt="클라우드 공급자 선택, 필터링, 그룹화, 시각화 변경 및 고급 옵션을 통해 보고서를 사용자 지정합니다." style="width:100%;" >}}

### 보고서 유형 선택 {#select-the-type-of-report}

생성할 보고서 유형을 선택합니다.

- {{< ui >}}Cost{{< /ui >}}: 서비스, 리전, 팀 등에서 비용이 어떻게 지출되는지 파악합니다.
- {{< ui >}}Budget{{< /ui >}}: 사전에 정의한 예산 목표 대비 지출을 추적하고 향후 비용을 예측합니다.

### 필터 적용 {#apply-filters}

필터를 사용하여 공급자, 제품, 태그, 리전 또는 비용 유형을 기준으로 할당하려는 비용만 포함하여 규칙이 클라우드 지출의 정확한 하위 집합에 적용되도록 합니다.

| 필터 기준 | 사용 사례 |
|--------|----------|
| 클라우드 공급자(예: AWS, Azure, GCP, Snowflake)| Azure 또는 GCP 비용은 제외하고 AWS 지원 요금 등 특정 클라우드 공급자의 비용에만 할당 규칙을 적용합니다. |
| 제품 또는 서비스(예: EC2, S3, RDS)| 특정 제품 또는 서비스와 관련된 비용을 할당합니다. 예를 들어, 모든 AWS 비용 대신 EC2 비용만 팀 간에 분할합니다. |
| 태그(`env:prod`, `team:analytics`) | 리소스 태그를 기준으로 비용을 포함하거나 제외합니다. 예를 들어, 프로덕션 리소스(`env:prod`)에 대해서만 비용을 할당하거나 분석 팀에 태그가 지정된 리소스에 대해서만 비용을 할당합니다. |
| 리전 | 특정 리전의 리소스에 대해서만 비용을 할당합니다. 예를 들어, `us-east-1`의 리소스 비용을 `eu-west-1`의 리소스 비용과 별도로 분할합니다. |
| 비용 유형(사용량, 지원, 태그 없음) | 사용 요금, 지원 수수료 또는 태그가 지정되지 않은 비용과 같은 특정 유형의 비용만 할당합니다. 예를 들어, 팀이 리소스에 태그를 지정하도록 장려하기 위해 태그가 지정되지 않은 비용만 할당합니다. |
| 사용자 지정 기준 | 여러 필터를 결합해야 하는 고유한 비즈니스 요건이 있는 경우 사용자 지정 기준을 생성합니다. 예를 들어, 특정 리전 `us-west-2`에서 `env:prod`로 태그가 지정된 EC2 비용만 할당하려는 경우입니다. |

### 데이터 그룹화 {#group-data}
- 공급자 이름, 서비스 이름 또는 사용자 지정 리소스 태그별로 그룹화하여 더 깊이 있는 인사이트를 얻습니다.

### 데이터 표시 방식 변경 {#change-how-you-see-your-data}
- **시각화 옵션**을 선택합니다.
  - {{< ui >}}Bar chart{{< /ui >}}: 여러 범주의 비용을 나란히 비교하여 주요 비용 발생 요인을 파악할 수 있습니다.
  - {{< ui >}}Pie chart{{< /ui >}}: 각 세그먼트의 백분율 비중을 표시하므로 소수의 범주 간 비용이 차지하는 상대적 비중을 파악하는 데 적합합니다.
  - {{< ui >}}Treemap{{< /ui >}}: 계층적 데이터와 여러 범주의 상대적 크기를 한 번에 표시하므로 전체 구조와 가장 큰 비중을 차지하는 항목을 한눈에 볼 수 있습니다.
- **표 보기**를 변경합니다.
  - {{< ui >}}Summary{{< /ui >}}: 비용을 통합하여 보여주는 전체 현황입니다.
  - {{< ui >}}Day over day{{< /ui >}}, {{< ui >}}week over week{{< /ui >}} 또는 {{< ui >}}month over month{{< /ui >}}: 일별, 주별 또는 월별 비용 변화를 분석하고 추세나 비정상적인 변동을 파악합니다.
- **기간** 및 **비교 기간** 업데이트:
  - 분석할 보고 기간을 선택합니다.
  - 비용 변화를 파악하기 위한 비교 기간 추가:
    - {{< ui >}}Default comparison{{< /ui >}}: 바로 이전 기간과 자동으로 비교합니다(예: 이번 주와 지난주 비교).
    - {{< ui >}}Flexible comparison{{< /ui >}}: 1년 전이나 사용자 지정 날짜 범위와 같이 원하는 기간을 선택하여 계절적 패턴을 파악합니다. 두 기간은 동일한 단위여야 하지만(예: 주 단위 또는 월 단위), 일수가 서로 다른 월을 비교하는 경우 실제 일수는 다를 수 있습니다.
- **예측 비용** 표시:
  - {{< ui >}}Show forecast{{< /ui >}}를 켜면 비용 보고서에서 과거 지출과 예측 비용을 함께 확인할 수 있습니다. 지원되는 예측 기간과 집계에 대한 자세한 내용은 [Cloud Cost Management의 예측][15]을 참조하세요.

### 고급 옵션(선택 사항) {#advanced-options-optional}

- {{< ui >}}Show usage charges only{{< /ui >}}: 모든 지출(수수료, 세금, 환불)을 포함할지, 사용 요금만 표시할지 선택합니다.
- {{< ui >}}Cost type{{< /ui >}}: 보고, 분석 또는 재무 관리 요건에 가장 적합한 비용 유형을 선택합니다. [AWS][7], [Azure][8], [Google Cloud][9], [Custom][10] 등 공급자별 비용 유형의 정의를 확인합니다.

  **참고**: 이러한 옵션의 사용 가능 여부는 선택한 공급자에 따라 다릅니다.

## 보고서 저장 및 공유 {#save-and-share-your-report}

보고서를 생성하고 사용자 지정한 후에는 기본 보고서 페이지와 개별 보고서 카드 보기에서 모두 보고서를 저장하고 공유할 수 있습니다.

- **보고서를 저장**하여 개인 또는 팀에서 사용할 수 있도록 합니다.
- **보고서를 공유**하려면 URL을 복사하거나 CSV 또는 PNG로 내보냅니다.
- **보고서 전송을 예약**하여 팀에 자동으로 전송되도록 합니다. [보고서 예약에 대해 자세히 알아보기][11]
- **보고서 보기를 Dashboards로 내보내** 다른 위젯과 함께 비용을 추적합니다. [대시보드에서 비용 모니터링에 대해 자세히 알아보기][14]
필요한 보고서를 찾으려면 - **저장된 보고서를 검색**합니다(기본 보고서 페이지에서만 사용 가능).

## 권한 {#permissions}

보고서를 조회하고 관리하려면 다음 권한이 필요합니다.

| 액션 | 필수 권한 |
|---------|---------------|
| 보고서 조회 | Cloud Cost Management Read |
| 보고서 생성, 편집, 삭제 | Cloud Cost Report Write |

CCM 권한의 전체 목록은 [권한 설명서][16]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/aws/
[2]: /ko/cloud_cost_management/azure/?tab=billingaccounts
[3]: /ko/cloud_cost_management/google_cloud/
[4]: /ko/cloud_cost_management/saas_costs/
[5]: https://app.datadoghq.com/cost/analyze/reports
[6]: /ko/cloud_cost_management/container_cost_allocation/
[7]: /ko/cloud_cost_management/setup/aws/#cost-types
[8]: /ko/cloud_cost_management/setup/azure/#cost-types
[9]: /ko/cloud_cost_management/setup/google_cloud/#cost-types
[10]: /ko/cloud_cost_management/setup/custom/#cost-metric-types
[11]: /ko/cloud_cost_management/reporting/scheduled_reports
[12]: /ko/cloud_cost_management/oracle/
[13]: /ko/cloud_cost_management/reporting/explorer
[14]: /ko/cloud_cost_management/reporting/dashboards
[15]: /ko/cloud_cost_management/planning/forecasting#view-forecasts-in-reports
[16]: /ko/cloud_cost_management/setup/permissions