---
aliases:
- /ko/product_analytics/experimentation/defining_metrics/
description: 실험에서 측정하려는 메트릭을 생성하세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: 블로그
  text: Product Analytics를 사용하여 데이터 기반 설계 결정 내리기
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: 블로그
  text: Datadog Experiments를 구축한 방법
title: 실험 메트릭 생성
---
## 개요 {#overview}

실험에서 측정하려는 메트릭을 생성하세요. Real User Monitoring (RUM), Product Analytics 또는 자체 웨어하우스의 데이터를 사용하여 Datadog Experiments 메트릭을 생성할 수 있습니다.

<div class="alert alert-info">조직에서 사용자 지정 역할을 사용하는 경우, 실험 메트릭을 생성하려면 적절한 <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics 권한</a>이 있어야 합니다.</div>

## 메트릭 생성 {#create-a-metric}

데이터 소스를 선택합니다.

{{< tabs >}}
{{% tab "Product Analytics 또는 RUM" %}}

### 전제 조건 {#prerequisites}

Product Analytics 또는 RUM 데이터에서 메트릭을 생성하려면 애플리케이션에 Datadog의 [클라이언트 측 SDK][3]가 설치되어 있고 데이터를 활성 상태로 캡처하고 있어야 합니다. SDK를 아직 구성하지 않았다면, 시작할 애플리케이션 유형을 선택합니다.

- [Android 및 Android TV][4]
- [iOS 및 tvOS][5]
- [브라우저(JavaScript)][6]
- [React Native][7]

Product Analytics는 Real User Monitoring(RUM)과 동일한 SDK 및 구성을 사용합니다. RUM 설정 문서를 사용하여 SDK를 구성한 후, Product Analytics UI에서 메트릭을 생성합니다.

### Product Analytics 또는 RUM 데이터를 사용하여 메트릭 생성 {#create-a-metric-using-product-analytics-or-rum-data}

실험을 위한 메트릭을 생성하려면 다음 단계를 따르세요.

1. Datadog Product Analytics의 [메트릭 페이지][1]로 이동합니다.
1. {{< ui >}}Metrics{{< /ui >}} 탭을 선택하고 오른쪽 상단의 {{< ui >}}Create Metric{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Metric name{{< /ui >}}을 추가하고 필요시 {{< ui >}}Description{{< /ui >}}을 추가합니다.
1. {{< ui >}}Metric definition{{< /ui >}} 섹션에서 {{< ui >}}Select an event{{< /ui >}}를 클릭하여 이벤트 선택기를 엽니다. 오른쪽의 차트는 메트릭을 구성함에 따라 실시간으로 업데이트됩니다.
   1. 특정 이벤트를 검색하거나 {{< ui >}}By Type{{< /ui >}} 필터를 사용하여 이벤트 유형별로 찾아봅니다.
1. 드롭다운에서 [집계 방법](#aggregation-methods)을 선택합니다. 기본값은 {{< ui >}}Count of events{{< /ui >}}입니다.
1. {{< ui >}}Add Filter{{< /ui >}}를 클릭하여 추가 속성별로 [메트릭을 필터링합니다](#add-filters).
1. (선택 사항) {{< ui >}}Additional settings{{< /ui >}} 섹션에서 다음을 수행합니다.
   1. {{< ui >}}Mark as certified{{< /ui >}}를 켜서 이 메트릭이 중요한 의사 결정에 사용하도록 승인되었음을 나타냅니다. 이 작업에는 Product Analytics Certified Metrics Write 권한이 필요합니다.
   1. 필요에 따라 [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options)와 {{< ui >}}Units{{< /ui >}}을 조정합니다. 기본값은 대부분의 사용 사례에 적합합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="/product_analytics/experiment/exp_create_new_metric.png" alt="메트릭 이름이 'Example metric'으로 설정되고, 'click on ADD TO CART' 이벤트가 선택되어 있으며, 집계 방법 드롭다운이 Count of events로 설정된 Create Metric 페이지입니다. Additional settings 섹션과 오른쪽의 막대 차트 미리 보기, 강조 표시된 Save 버튼도 표시됩니다." style="width:90%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[3]: /ko/real_user_monitoring/#get-started
[4]: /ko/real_user_monitoring/application_monitoring/android/setup/?tab=kotlin
[5]: /ko/real_user_monitoring/application_monitoring/ios/setup/?tab=swift-package-manager--spm
[6]: /ko/real_user_monitoring/application_monitoring/browser/setup/client/?tab=npm
[7]: /ko/real_user_monitoring/application_monitoring/react_native/setup/?platform=react_native

### 필터 추가 {#add-filters}

서비스, 국가 또는 장치 유형과 같은 {{< ui >}}Event properties{{< /ui >}} 필터를 선택하여 메트릭을 필터링할 수 있습니다. {{< ui >}}By Data Type{{< /ui >}} 필터를 사용하여 사용 가능한 속성 목록을 유형(예: 문자열 또는 불리언)별로 좁힐 수 있습니다.

필요한 속성이 보이지 않으면 {{< ui >}}Custom property{{< /ui >}} 필드에 속성 이름(예: `@context.tracking`)을 입력하고 {{< ui >}}Add{{< /ui >}}를 클릭합니다.

{{< img src="/product_analytics/experiment/exp_filter_by_2.png" alt="메트릭 정의 섹션 내에서 열린 필터링 기준 패널입니다. 모든 속성이 선택되어 있고, 중앙에는 Application Id, Service, Browser Name, Country와 같은 이벤트 속성이 표시되며, 왼쪽에는 Numerical, String, Boolean 옵션이 있는 데이터 유형별 필터가 있고, 하단에는 'e.g. @context.tracking' 자리 표시자가 있는 텍스트 필드와 추가 버튼이 포함된 사용자 지정 속성 섹션이 있습니다." style="width:90%;" >}}

{{% /tab %}}
{{% tab "웨어하우스" %}}

### 전제 조건 {#prerequisites-1}

웨어하우스 데이터에서 메트릭을 생성하려면 [웨어하우스를 Datadog에 연결][8]해야 합니다. Datadog은 BigQuery, Databricks, Redshift 및 Snowflake를 지원합니다.

데이터 웨어하우스를 연결한 후 SQL 모델을 생성하여 데이터를 Datadog에 매핑하고, 해당 모델을 사용하여 메트릭을 생성합니다.

### SQL 모델 생성 {#create-a-sql-model}

SQL 쿼리를 작성하여 데이터를 정의하고 미리 본 다음, 모델을 구성하여 데이터를 Datadog에 매핑합니다.

#### SQL 작성 {#write-your-sql}

먼저 쿼리를 작성하여 데이터를 가져옵니다.

1. Datadog Product Analytics의 [메트릭 페이지][1]로 이동합니다.
1. {{< ui >}}Metric SQL Models{{< /ui >}} 탭을 선택하고 {{< ui >}}Create SQL Model{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Write SQL{{< /ui >}} 섹션에서 관심 있는 데이터를 반환하는 SQL 쿼리를 입력합니다. SQL 편집기는 `SELECT * FROM` 및 더 고급 SQL 문을 지원합니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭하여 데이터를 미리 봅니다.

{{< img src="/product_analytics/experiment/exp_create_metric_sql_models_writesql_1.png" alt="Create Metric SQL Model 페이지의 Write SQL 섹션으로, revenue orders 테이블에서 user_id, revenue_timestamp, amount를 가져오는 SELECT 쿼리가 표시되어 있으며, 아래에는 USER_ID, REVENUE_TIMESTAMP, AMOUNT 열이 표시된 성공적인 쿼리 미리보기가 나타나 있습니다." style="width:80%;" >}}

대규모 테이블의 경우 [SQL 템플릿 변수][13]를 사용하여 Datadog의 날짜 필터를 쿼리에 적용하고 실행할 때마다 웨어하우스가 스캔하는 데이터 양을 줄입니다.

#### 웨어하우스 데이터를 Datadog에 매핑 {#map-your-warehouse-data-to-datadog}

데이터를 미리 본 후 Datadog에 매핑합니다. {{< ui >}}Structure your model{{< /ui >}} 섹션에서:

1. {{< ui >}}Metric SQL Model Name{{< /ui >}}을 추가합니다(예: **Revenue Orders**).
1. (선택 사항) {{< ui >}}Mark as certified{{< /ui >}}를 켜서 이 SQL 모델이 중요한 의사 결정에 사용하도록 승인되었음을 나타냅니다. 이 작업에는 Product Analytics Certified Metrics Write 권한이 필요합니다.
1. 웨어하우스 표의 열을 다음에 매핑합니다.
   - {{< ui >}}Timestamp column{{< /ui >}}
     - 메트릭 이벤트와 관련된 타임스탬프를 나열하는 열입니다.
     - 분석에는 대상이 실험에 등록된 후 생성된 행만 포함됩니다.
   - {{< ui >}}Subject Type{{< /ui >}}
     - Datadog이 실험 그룹을 무작위로 할당하는 데 사용하는 속성입니다.
     - [주체 유형][12] 페이지에서 주체 유형과 해당 기본 웨어하우스 열을 정의할 수 있습니다. 예를 들어, 개별 사용자의 경우 `user_id`를 사용하고 조직 계정의 경우 `org_id`를 사용할 수 있습니다.
   - {{< ui >}}Measures{{< /ui >}}(선택 사항)
     - Datadog이 메트릭으로 집계할 수 있는 웨어하우스 표의 숫자 열입니다(예: `revenue` 또는 `amount` 열).
     - 각 SQL 모델에는 {{< ui >}}each record{{< /ui >}} 측정값이 자동으로 포함됩니다. 이 측정값을 사용하여 특정 실험 주체에 대한 표의 관련 행 수를 계산합니다.
1. SQL 모델을 저장하려면 {{< ui >}}Create Metric SQL Model{{< /ui >}}을 클릭합니다.

{{< img src="/product_analytics/experiment/exp_create_metrics_sql_model_structure4.png" alt="Metric SQL Model Name 필드가 'Revenue Orders'로 설정되고 강조 표시된 'Structure your model' 패널, 'Mark as certified' 토글, REVENUE_TIMESTAMP로 설정된 Timestamp 열, 열 선택기에서 USER_ID가 선택된 상태로 User (@usr.id)로 설정된 Subject Type, 'Revenue Orders (each record)'가 표시된 Measures 드롭다운, 그리고 강조 표시된 'Create Metric SQL Model' 버튼." style="width:80%;" >}}

### SQL 모델을 사용하여 메트릭 생성 {#create-a-metric-using-your-sql-model}

SQL 모델을 생성한 후, 이를 사용하여 다음과 같이 메트릭을 생성합니다.

1. Datadog Product Analytics의 [메트릭 페이지][1]로 이동합니다.
1. {{< ui >}}Metrics{{< /ui >}} 탭을 선택하고 오른쪽 상단의 {{< ui >}}Create Metric{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Metric name{{< /ui >}}을 추가하고 필요시 {{< ui >}}Description{{< /ui >}}을 추가합니다.
1. {{< ui >}}Metric definition{{< /ui >}} 섹션에서 {{< ui >}}Select an event{{< /ui >}}를 클릭하여 이벤트 선택기를 엽니다. 오른쪽의 차트는 메트릭을 구성함에 따라 실시간으로 업데이트됩니다.
   1. 해당 SQL 모델을 선택합니다. SQL 모델은 데이터 소스 아래에 표시됩니다(예: **Snowflake** 아래의 **Revenue Orders**).
1. 드롭다운에서 [집계 방법](#aggregation-methods)을 선택합니다.
1. (선택 사항) {{< ui >}}Additional settings{{< /ui >}} 섹션에서 다음을 수행합니다.
   1. 이 메트릭이 중요한 의사 결정에 사용하도록 승인되었음을 나타내려면 {{< ui >}}Mark as certified{{< /ui >}}를 켭니다. 이 작업에는 Product Analytics Certified Metrics Write 권한이 필요합니다.
   1. 필요에 따라 [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options)와 {{< ui >}}Units{{< /ui >}}을 조정합니다. 기본값은 대부분의 사용 사례에 적합합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="/product_analytics/experiment/exp_create_metric_from_sqlmodel_2.png" alt="Create Metric 이벤트 선택기에는 'All Events'가 선택된 상태로 표시됩니다. 왼쪽에는 Snowflake, Actions, Views, Sessions, Errors, Long Tasks 등의 이벤트 유형이 있으며, 오른쪽에는 Snowflake 아래에 Revenue Orders SQL 모델이 강조 표시되어 있고 Measures: amount와 Filterable dimensions: N/A가 표시됩니다." style="width:80%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[8]: /ko/experiments/guide/connecting_a_data_warehouse/
[12]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[13]: /ko/experiments/concepts/sql_template_variables/

{{% /tab %}}
{{< /tabs >}}

## 집계 방식 {#aggregation-methods}

집계 방식은 Datadog이 각 실험 주체에 대한 데이터를 요약하는 방법을 결정합니다. 실험 주체는 Datadog이 실험을 위해 무작위화하는 단위입니다. 이는 일반적으로 사용자이지만 실험 설정 방식에 따라 조직, 쿠키 또는 장치가 될 수도 있습니다.

Datadog Experiments는 다음 집계 방식을 지원합니다.

- {{< ui >}}Count of events{{< /ui >}} (기본값)
- {{< ui >}}Count of unique users{{< /ui >}} (전환 메트릭에 유용)
- {{< ui >}}Sum of{{< /ui >}} 이벤트 속성(수익 메트릭에 유용)
- {{< ui >}}Distinct values of{{< /ui >}} 이벤트 속성(고유 페이지 조회 메트릭에 유용)
- {{< ui >}}Percentile{{< /ui >}} 이벤트 속성의 값(지연 시간 메트릭에 유용)
- {{< ui >}}Average of{{< /ui >}} 이벤트 속성(만족도 메트릭에 유용)

{{< img src="/product_analytics/experiment/exp_default_metric_agg_1.png" alt="집계 방식 드롭다운은 상단에 '고유 사용자 수(선택됨)' 및 '이벤트 수'를 표시하며, 그 아래에 '측정 기준 선택' 섹션이 있어 '합계', '고유 값', '백분위수', '평균' 옵션과 오른쪽에 '이벤트를 수행한 사용자 수'라는 설명이 표시됩니다." style="width:90%;" >}}

Datadog은 각 실험 주체에 대한 메트릭을 계산합니다. 예를 들어, 사용자를 기준으로 무작위화된 실험의 {{< ui >}}Count of events{{< /ui >}} 메트릭은 변형(실험 그룹) 내 모든 사용자의 총 이벤트 수를 해당 변형의 사용자 수로 나눈 값을 계산합니다.

### 비율 메트릭 {#ratio-metrics}

{{< ui >}}Create Ratio{{< /ui >}}를 클릭하여 기본 실험 주체 수가 아닌 다른 값으로 메트릭을 나눕니다. 분모는 [집계 방식](#aggregation-methods) 중 하나를 사용할 수 있습니다. 예를 들어, 구매 수를 제품 페이지 조회 수로 나누어 전체 등록 사용자가 아닌 퍼널의 특정 단계에서 전환을 측정합니다.

Datadog은 [델타 방법][2]을 사용하여 분자와 분모 간의 상관관계를 고려합니다.

{{< img src="/product_analytics/experiment/exp_create_ratio_new_ui.png" alt="메트릭 정의 섹션은 'ADD TO CART 클릭' 이벤트를 이벤트 수 집계와 필터 추가 옵션과 함께 표시되며, 아래에 비율 생성 버튼이 강조 표시되고, 추가 설정 섹션에는 Mark as certified 토글, Experiment settings 및 Units가 포함됩니다." style="width:90%;" >}}

## 고급 옵션{#advanced-options}

Datadog Experiments는 다음 고급 옵션을 지원합니다. 이러한 옵션은 메트릭을 생성할 때 {{< ui >}}Additional settings{{< /ui >}} > {{< ui >}}Experiment settings{{< /ui >}}에서 수정할 수 있습니다.

기간 필터
: 기본적으로 Datadog은 사용자가 처음 노출된 시점부터 실험이 종료될 때까지의 모든 이벤트를 포함합니다. 이 설정을 사용하여 '7일 이내의 세션'과 같은 기간이 제한된 값을 측정합니다. 기간 필터를 추가하면 메트릭은 실험이 사용자를 처음 등록한 순간부터 시작하여 지정된 기간 내의 이벤트만 포함합니다.

원하는 메트릭 방향
: Datadog은 통계적으로 유의미한 결과를 강조 표시합니다. 이 설정을 사용하여 이 메트릭이 증가하기를 원하는지 또는 감소하기를 원하는지 지정합니다.

이상치 처리
: 실제 데이터에는 실험 결과에 영향을 줄 수 있는 극단적인 이상치가 포함되는 경우가 많습니다. 이 설정을 사용하여 Datadog이 데이터를 절단할 임계값을 설정합니다. 예를 들어, 99% 상한을 설정하여 메트릭의 99번째 백분위수에서 모든 결과를 절단합니다.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: https://en.wikipedia.org/wiki/Delta_method