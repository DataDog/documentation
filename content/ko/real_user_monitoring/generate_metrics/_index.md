---
description: RUM 이벤트에서 커스텀 메트릭을 만듭니다.
further_reading:
- link: /real_user_monitoring/
  tag: 설명서
  text: 브라우저 및 모바일 애플리케이션에서 RUM 이벤트를 캡처하는 방법 알아보기
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 탐색기에서 쿼리를 만드는 방법 알아보기
- link: /real_user_monitoring/explorer/search/#event-types/
  tag: 설명서
  text: RUM 이벤트 유형에 대해 알아보기
- link: /logs/log_configuration/logs_to_metrics/
  tag: 설명서
  text: 수집한 로그에서 메트릭 생성
- link: https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/
  tag: 블로그
  text: RUM 기반 메트릭을 생성하여 고객 경험의 과거 동향 추적
kind: 설명서
title: RUM 이벤트에서 커스텀 메트릭 생성
---

## 개요

실제 사용자 모니터링(RUM)을 사용하면 Datadog RUM SDK를 사용하여 브라우저 및 모바일 애플리케이션에서 발생하는 이벤트를 캡처하고 [샘플 속도][1]로 이벤트에서 데이터를 수집할 수 있습니다. Datadog은 이 이벤트 데이터를 [RUM 탐색기][2]에 저장하여 검색 쿼리 및 시각화를 생성할 수 있습니다.

RUM 기반 커스텀 메트릭은 RUM 이벤트 세트의 데이터를 요약하는 비용 효율적인 옵션입니다. 최대 15개월 동안 RUM 데이터 전반의 추세와 이상 징후를 세분화된 수준에서 시각화할 수 있습니다.

**빌링에 관한 참고사항:** RUM 이벤트에서 생성된 메트릭은 [커스텀 메트릭][3]으로 청구됩니다.

## RUM 기반 커스텀 메트릭 생성

RUM 이벤트 데이터에서 커스텀 메트릭을 생성하려면 [**UX Monitoring** > **Setup & Configuration** > **Generate Metrics**][4]로 이동하여 **+ New Metric**을 클릭합니다.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="+ New Metric을 클릭하여 RUM 기반 커스텀 메트릭을 만듭니다." width="80%" >}}

[RUM 탐색기][5]의 검색 쿼리에서 커스텀 메트릭을 만들려면 **Export** 버튼을 클릭하고 드롭다운 메뉴에서 **Generate new metric**을 선택합니다.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="RUM 기반 커스텀 메트릭 생성" width="80%" >}}

1. [커스텀 메트릭][3]에 `datadog.estimated_usage`으로 시작하지 않는 이름(예: `rum.sessions.count_by_geography`)을 지정합니다. 자세한 내용은 [이름 지정 규칙][6]을 참조하세요.
2. 커스텀 메트릭을 생성하려는 이벤트 유형(예: `Sessions`)을 선택하세요. 옵션에는 **Sessions**, **Views**, **Actions**, **Errors**, **Resources**, 그리고 **Long Tasks**가 있습니다. 자세한 정보는 [RUM 이벤트 검색][7]을 참조하세요.
3. `@session.type:user`와 같은 RUM 탐색기의 [검색 구문][8]을 사용하여 RUM 이벤트를 필터링하는 검색 쿼리를 만듭니다.
4. **Count** 옆에 있는 드롭다운 메뉴에서 추적할 필드를 선택합니다.

   - 검색 쿼리와 일치하는 모든 RUM 이벤트의 개수를 생성하려면 `*`를 선택합니다.
   - (선택 사항) 숫자 값을 집계하고 해당하는 `count` 또는 `distribution` 메트릭을 생성하기 위해 이벤트 속성(예: `@action.target`)을 입력합니다.

   RUM 속성 패싯이 측정값인 경우 메트릭 값은 RUM 속성 값입니다.

5. **group by** 옆에 있는 드롭다운 메뉴에서 그룹화할 경로를 선택합니다. 메트릭 태그 이름은 `@`가 없는 원래 속성 또는 태그 이름입니다. 기본적으로 RUM 이벤트에서 생성된 커스텀 메트릭은 명시적으로 추가되지 않는 한 태그를 포함하지 않습니다. `@error.source` 또는 `env`등의 RUM 이벤트에 존재하는 속성 또는 태그 차원을 사용하여 메트릭 태그를 생성할 수 있습니다.

   <div class="alert alert-warning">RUM-based custom metrics are considered as <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes such as timestamps, user IDs, request IDs, and session IDs.
   </div>

6. 세션 및 보기에서 생성된 커스텀 메트릭의 경우 **The active session/view starts matching the query** 또는 **The session/view becomes inactive or is completed**를 선택하여 세션 및 보기의 일치 기준을 설정합니다. 자세한 내용은 [세션 및 보기에 RUM 기반 메트릭 추가](#add-a-rum-based-metric-on-sessions-and-views)를 참조하세요.

7. 분포 메트릭에 대한 백분위수 집계를 추가합니다. 고급 쿼리 기능을 선택하고 전역적으로 정확한 백분위수(예: P50, P75, P90, P95, P99)를 사용할 수 있습니다.

   <div class="alert alert-warning">백분위수로 고급 쿼리 기능을 활성화하면 더 많은 <a href="/metrics/custom_metrics/">커스텀 메트릭</a>이 생성되고 <a href="/account_management/billing/custom_metrics/">비용이 이에 따라 청구됩니다</a>.

8. **Create Metric**을 클릭합니다.

RUM 기반 커스텀 메트릭이 **Custom RUM Metrics** 아래 목록에 나타나며, [대시보드][9] 및 [모니터][10]에서 메트릭을 사용할 수 있게 되는 데 잠시 지연이 있을 수 있습니다.

과거 데이터가 있는 메트릭에 대해 데이터 포인트가 생성되지 않습니다. RUM 기반 커스텀 메트릭에 대한 데이터 포인트는 10초 간격으로 생성됩니다. 메트릭 데이터는 15개월 동안 유지됩니다.

### 세션 및 보기에 RUM 기반 메트릭 추가

세션 및 보기는 RUM 애플리케이션에서 진행 중인 애플리케이션 또는 사용자 활동이 있을 때 활성 상태로 간주됩니다. 예를 들어 사용자가 새 페이지를 열면 이러한 페이지 보기가 사용자 세션에서 수집됩니다. 사용자가 페이지의 버튼과 상호 작용할 때 이러한 작업은 페이지 보기에 수집됩니다.

5개 이상의 오류가 포함된 사용자 세션 수를 계산하는 RUM 기반 커스텀 메트릭이 있고, 오전 11시에 5개의 오류에 도달하고 오후 12시에 종료되는 세션 ID `123`가 있다고 가정해 보겠습니다.

   - 세션 또는 보기가 쿼리와 일치하는 즉시 계산하여 오전 11시 타임스탬프에서 카운트 메트릭의 값을 1씩 증가시킵니다.

   - 비활성화된 세션 또는 보기를 계산하여 오후 12시 타임스탬프에서 카운트 메트릭의 값을 1씩 증가시킵니다.

## RUM 기반 커스텀 메트릭 관리

쿼리와 일치하는 RUM 이벤트의 카운트 메트릭 또는 요청 기간과 같이 RUM 이벤트에 포함된 숫자 값의 [분포 메트릭][11]을 생성할 수 있습니다.

### RUM 기반 커스텀 메트릭 업데이트

메트릭을 업데이트하려면 메트릭 위로 마우스를 이동하고 오른쪽 모서리에 있는 **Edit** 아이콘을 클릭합니다.

- Filter query: 메트릭으로 집계되는 일치하는 RUM 이벤트 세트를 변경합니다.
- Aggregation groups: 생성된 메트릭의 카디널리티를 관리하기 위해 태그를 업데이트합니다.
- Percentile selection: **Calculate percentiles** 토글을 클릭하여 백분위수 메트릭을 제거하거나 생성합니다.

기존 메트릭의 이름을 변경할 수 없으므로 다른 메트릭을 생성하는 것이 좋습니다.

### RUM 기반 커스텀 메트릭 삭제

커스텀 메트릭 및 빌링에서 데이터 포인트 계산을 중지하려면 메트릭 위로 마우스를 이동한 후 오른쪽 모서리에 있는 **Delete** 아이콘을 클릭합니다.

## 사용법

다음 액션에 대해 RUM 기반 커스텀 메트릭을 사용할 수 있습니다:

- [대시보드][12]에서 설정된 기간 동안의 추세를 시각화
- [이상 징후 모니터][13]에서 메트릭이 이전과 다르게 동작할 경우 경고를 트리거
- [예측 모니터][14]에서 메트릭이 향후 임계값을 초과할 것으로 예측될 때 경고를 트리거
- [메트릭 기반 SLO][15]를 생성하여 팀 및 조직의 사용자 중심 성능 목표 추적

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/#browser-and-session-replay-sampling-configuration
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
[15]: /ko/service_management/service_level_objectives/metric/