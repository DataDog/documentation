---
aliases:
- /ko/real_user_monitoring/generate_metrics
description: RUM 이벤트에서 커스텀 메트릭을 생성하세요.
further_reading:
- link: /real_user_monitoring/
  tag: 문서
  text: 브라우저 및 모바일 애플리케이션에서 RUM 이벤트를 캡처하는 방법 알아보기
- link: /real_user_monitoring/explorer/
  tag: 문서
  text: RUM 탐색기에서 쿼리를 만드는 방법 알아보기
- link: /real_user_monitoring/explorer/search/#event-types
  tag: 문서
  text: RUM 이벤트 유형에 대해 알아보기
- link: /logs/log_configuration/logs_to_metrics/
  tag: 문서
  text: 수집한 로그에서 메트릭 생성하기
- link: https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/
  tag: 블로그
  text: RUM 기반 메트릭을 생성하여 고객 경험의 과거 동향 추적하기
title: RUM 이벤트에서 커스텀 메트릭 생성하기
---
## 개요 {#overview}

Real User Monitoring (RUM)을 사용하면 Datadog RUM SDK를 사용하여 브라우저 및 모바일 애플리케이션에서 발생하는 이벤트를 캡처하고 [샘플링 비율][1]에 따라 이벤트 데이터를 수집할 수 있습니다. Datadog은 이 이벤트 데이터를 [RUM Explorer][2]에 보관하며, 이곳에서 검색 쿼리와 시각화를 만들 수 있습니다.

RUM 기반 사용자 지정 메트릭은 RUM 이벤트 세트의 데이터를 요약하는 비용 효율적인 옵션입니다. RUM 데이터 전반의 추세와 이상을 최대 15개월 동안 세분화된 수준으로 시각화할 수 있습니다. 사용자 지정 메트릭을 만든 후 [RUM 사용자 지정 메트릭으로 차트 생성][17]을 참조하여 대시보드에 추가하세요.

**참고:** 사용자 지정 메트릭은 RUM Explorer에 보관된 데이터뿐만 아니라 수집된 RUM 트래픽의 100%를 기준으로 계산됩니다. 이를 통해 세션의 일부만 보관할 수 있는 [RUM without Limits][16] 보존 필터를 사용하는 경우에도 정확한 메트릭을 보장합니다.

**청구 참고:** RUM 이벤트에서 생성된 메트릭은 [사용자 지정 메트릭][3]으로 청구됩니다.

## RUM 기반 사용자 지정 메트릭 생성 {#create-a-rum-based-custom-metric}

RUM 이벤트 데이터에서 사용자 지정 메트릭을 생성하려면 [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Generate Metrics{{< /ui >}}][4]로 이동하여 {{< ui >}}\+ New Metric{{< /ui >}}을 클릭하세요.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="'+ New Metric'을 클릭하여 RUM 기반 사용자 지정 메트릭을 생성합니다." width="80%" >}}

[RUM Explorer][5]의 검색 쿼리에서 사용자 지정 메트릭을 만들려면 {{< ui >}}Export{{< /ui >}} 버튼을 클릭하고 드롭다운 메뉴에서 {{< ui >}}Generate new metric{{< /ui >}}을 선택하세요.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="RUM 기반 사용자 지정 메트릭 생성" width="80%" >}}

1. [사용자 지정 메트릭][3]에 `datadog.estimated_usage`로 시작하지 않는 이름을 지정합니다(예: `rum.sessions.count_by_geography`). 더 자세한 정보는 [명명 규칙][6]을 참조하세요.
2. 사용자 지정 메트릭을 생성할 이벤트 유형을 선택합니다(예: `Sessions`). 옵션에는 {{< ui >}}Sessions{{< /ui >}}, {{< ui >}}Views{{< /ui >}}, {{< ui >}}Actions{{< /ui >}}, {{< ui >}}Errors{{< /ui >}}, {{< ui >}}Resources{{< /ui >}} 및 {{< ui >}}Long Tasks{{< /ui >}}가 포함됩니다. 더 자세한 정보는 [Search RUM Events][7]을 참조하세요.
3. RUM Explorer의 [검색 구문][8]을 사용하여 RUM 이벤트를 필터링하는 검색 쿼리를 만듭니다(예: `@session.type:user`). 
4. {{< ui >}}Count{{< /ui >}} 옆에 있는 드롭다운 메뉴에서 추적할 필드를 선택합니다. 

   - 검색 쿼리와 일치하는 모든 RUM 이벤트의 개수를 생성하려면 `*`을 선택합니다. 
   - 필요시 `@action.target`과 같은 이벤트 속성을 입력하여 숫자 값을 집계하고 해당 `count` 또는 `distribution` 메트릭을 생성합니다. 

   RUM 속성 패싯이 측정값인 경우 메트릭 값은 RUM 속성 값입니다.

5. {{< ui >}}group by{{< /ui >}} 옆의 드롭다운 메뉴에서 그룹화할 경로를 선택합니다. 메트릭 태그 이름은 `@`을 제외한 원래 속성 또는 태그 이름입니다. 기본적으로 RUM 이벤트에서 생성된 사용자 지정 메트릭은 명시적으로 추가되지 않는 한 태그를 포함하지 않습니다. `@error.source` 또는 `env`와 같이 RUM 이벤트에 존재하는 속성 또는 태그 차원을 사용하여 메트릭 태그를 생성할 수 있습니다. 
   
   <div class="alert alert-danger">RUM 기반 사용자 지정 메트릭은 <a href="/metrics/custom_metrics/">사용자 지정 메트릭</a>으로 간주되어 그에 따라 청구됩니다. 타임스탬프, 사용자 ID, 요청 ID 및 세션 ID와 같이 제한이 없거나 카디널리티가 매우 높은 속성으로 그룹화하지 마세요.
   </div>

6. 세션 및 뷰에서 생성된 사용자 지정 메트릭의 경우 {{< ui >}}The active session/view starts matching the query{{< /ui >}} 또는 {{< ui >}}The session/view becomes inactive or is completed{{< /ui >}}를 선택하여 세션 및 뷰에 대한 일치 기준을 설정합니다. 자세한 내용은 [세션 및 뷰에 RUM 기반 사용자 지정 메트릭 추가](#add-a-rum-based-metric-on-sessions-and-views)를 참조하세요.

7. 필요시 분포 메트릭에 대한 백분위수 집계를 추가합니다. [백분위수 집계](#percentile-aggregation)를 참조하세요.

8. {{< ui >}}Create Metric{{< /ui >}}을 클릭합니다.

RUM 기반 사용자 지정 메트릭이 {{< ui >}}Custom RUM Metrics{{< /ui >}} 아래 목록에 나타나며, [대시보드][9] 및 [모니터][10]에서 메트릭을 사용할 수 있게 되는 데 잠시 지연이 있을 수 있습니다. 

과거 데이터가 있는 메트릭에 대해서는 데이터 포인트가 생성되지 않습니다. RUM 기반 사용자 지정 메트릭에 대한 데이터 포인트는 10초 간격으로 생성됩니다. 메트릭 데이터는 15개월 동안 보관됩니다. 

### 백분위수 집계 {#percentile-aggregation}

고급 쿼리 기능을 선택하고 분포 메트릭에 대해 전역적으로 정확한 백분위수(예: P50, P75, P90, P95, P99)를 사용할 수 있습니다.

<div class="alert alert-danger">백분위수를 포함한 고급 쿼리 기능을 활성화하면 더 많은 <a href="/metrics/custom_metrics/">사용자 지정 메트릭</a>이 생성되며 <a href="/account_management/billing/custom_metrics/">그에 따라 청구됩니다</a>.</div>

### 세션 및 뷰에 RUM 기반 사용자 지정 메트릭 추가 {#add-a-rum-based-metric-on-sessions-and-views}

세션 및 뷰는 RUM 애플리케이션에서 진행 중인 애플리케이션 또는 사용자 활동이 있을 때 활성 상태로 간주됩니다. 예를 들어, 사용자가 새 페이지를 열면 이러한 페이지뷰가 사용자 세션에 수집됩니다. 사용자가 페이지의 버튼과 상호 작용하면 이러한 액션이 페이지뷰에 수집됩니다.

   오류가 5개를 초과하는 사용자 세션 수를 계산하는 RUM 기반 사용자 지정 메트릭이 있고, 오전 11시에 5개의 오류에 도달하고 오후 12시에 종료되는 세션 ID `123`이 있다고 가정해 보겠습니다.

   - 세션 또는 뷰가 쿼리와 일치하는 즉시 집계하면 오전 11시 타임스탬프에서 카운트 메트릭의 값이 1 증가합니다.
   - 비활성 상태가 된 세션 또는 뷰를 집계하면 오후 12시 타임스탬프에서 카운트 메트릭의 값이 1 증가합니다.

## RUM 기반 사용자 지정 메트릭 관리 {#manage-rum-based-custom-metrics}

쿼리와 일치하는 RUM 이벤트의 카운트 메트릭 또는 요청 시간과 같이 RUM 이벤트에 포함된 숫자 값의 [분포 메트릭][11]을 생성할 수 있습니다.

### RUM 기반 사용자 지정 메트릭 업데이트 {#update-a-rum-based-custom-metric}

메트릭을 업데이트하려면 메트릭 위로 마우스를 이동하고 오른쪽 모서리에 있는 {{< ui >}}Edit{{< /ui >}} 아이콘을 클릭하세요.

- 필터 쿼리: 메트릭으로 집계되는 일치하는 RUM 이벤트 세트를 변경합니다.
- 집계 그룹: 태그를 업데이트하여 생성된 메트릭의 카디널리티를 관리합니다.
- 백분위수 선택: {{< ui >}}Calculate percentiles{{< /ui >}} 토글을 클릭하여 백분위수 메트릭을 제거하거나 생성합니다.

기존 메트릭의 이름을 변경할 수 없으므로 다른 메트릭을 생성하는 것이 좋습니다.

### RUM 기반 사용자 지정 메트릭 삭제 {#delete-a-rum-based-custom-metric}

사용자 지정 메트릭의 데이터 포인트 계산 및 청구를 중지하려면 메트릭 위로 마우스를 이동한 후 오른쪽 모서리에 있는 {{< ui >}}Delete{{< /ui >}} 아이콘을 클릭하세요. 

## 사용 방법 {#usage}

다음 액션에 대해 RUM 기반 커스텀 메트릭을 사용할 수 있습니다.

- [대시보드][12]에서 지정된 기간 동안 추세 시각화
- [이상 징후 모니터][13]에서 메트릭이 이전과 다르게 동작할 경우 경보 트리거
- [예측 모니터][14]에서 메트릭이 향후 임계값을 초과할 것으로 예측될 때 경보 트리거
- [메트릭 기반 SLO][15]을 생성하여 팀 및 조직의 사용자 중심 성능 목표 추적 

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/guide/sampling-browser-plans
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ko/metrics/custom_metrics/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /ko/real_user_monitoring/explorer/
[6]: /ko/metrics/custom_metrics/#naming-custom-metrics
[7]: /ko/real_user_monitoring/explorer/search/#event-types
[8]: /ko/real_user_monitoring/explorer/search_syntax/
[9]: /ko/dashboards/
[10]: /ko/monitors/
[11]: /ko/metrics/distributions/
[12]: /ko/dashboards/querying/#configuring-a-graph
[13]: /ko/monitors/types/anomaly/
[14]: /ko/monitors/types/forecasts/
[15]: /ko/service_level_objectives/metric/
[16]: /ko/real_user_monitoring/rum_without_limits/
[17]: /ko/real_user_monitoring/guide/create-charts-with-rum-custom-metrics