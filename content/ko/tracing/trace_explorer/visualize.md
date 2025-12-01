---
aliases:
- /ko/tracing/trace_search_and_analytics/request_flow_map
- /ko/tracing/trace_explorer/request_flow_map/
description: 스팬을 목록에서 보거나 시계열, 상위 목록 등으로 집계할 수 있습니다.
further_reading:
- link: tracing/trace_explorer/
  tag: 설명서
  text: 트레이스 탐색기
- link: https://www.datadoghq.com/blog/apm-request-flow-map-datadog
  tag: 블로그
  text: 요청 흐름 맵에 대해 알아보기
title: 스팬(span) 시각화
---

## 개요

시각화는 쿼리된 스팬 데이터가 표시되는 방식을 정의합니다. 관련 시각화를 선택하여 개별 이벤트 의 경우 **목록**으로, 집계는 **시계열** 또는 **상위 목록**으로 중요한 정보를 표시할 수 있습니다. 

## 목록 보기

목록 보기는 [검색 막대 쿼리][1] 필터와 [시간 범위][2]로 정의되며, 컨텍스트와 일치하는 스팬 목록을 표시합니다.

표에서 열로 표시할 관심 있는 정보를 선택합니다. 열을 다음 중 하나로 관리합니다:

- 테이블 헤더 행과 상호 작용하여 열을 **정렬**, **재배열** 또는 **제거**할 수 있습니다.
- 왼쪽의 패싯 패널에서 패싯을 선택하거나 특정 스팬을 클릭한 후 트레이스 사이드 패널에서 필드에 열을 **추가**할 수 있습니다. **옵션** 버튼을 사용하여 열을 추가할 수도 있습니다.

{{< img src="tracing/trace_explorer/visualize/list_view_table_controls.mp4" alt="표 설정하기" video=true style="width:80%;">}}

목록 시각화에서 스팬의 기본 정렬은 타임스탬프 기준이며 가장 최근 스팬이 맨 위에 있습니다. 측정값의 값이 가장 낮거나 높은 스팬을 먼저 표시하거나 태그 값에 대해 사전 순으로 스팬을 정렬하려면, 해당 열을 **기준** 열로 지정합니다.


설정 열은 저장된 보기에서 트러블슈팅 컨텍스트의 다른 요소와 함께 저장됩니다.

트레이스의 `Latency Breakdown`은 일부 스팬의 경우 트레이스가 잘못되었거나 불완전한 경우 누락될 수 있습니다. 예를 들어, 오류와 몇몇 샘플러는 완전한 트레이스를 캡처하지 않고 트레이스의 일부를 캡처할 수 있습니다. 이 경우, 일관되지 않거나 오도할 수 있는 지연 정보를 표시하는 것을 방지하기 위해 데이터가 생략될 수 있습니다. 트레이스가 완전할 때만 해당 정보를 이해할 수 있기 때문입니다.

오류 스팬에서 쿼리를 필터링한 경우 **이슈로 그룹화** 옵션을 선택하여 개별 오류 스팬 대신 [오류 추적][5] 이슈의 목록을 시각화합니다. 이슈 목록에서 이슈를 클릭하면 이슈 패널이 열리고 이 오류 그룹에 대한 추가 정보에 액세스할 수 있습니다.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_issue_grouping.png" alt="오류 추적 이슈 그룹화" style="width:100%;">}}

이슈 세부 정보에서 `See all errors`를 클릭하면 이 이슈 아래에 그룹화된 개별 오류 스팬을 볼 수 있습니다.

**참고**: 핑거프린트되지 않은 오류, 즉 관련 문제가 없는 오류를 포함한 개별 오류를 보려면 `Errors` 그룹으로 다시 전환하세요.

## 시계열

시계열을 사용하여 선택한 기간 동안 [측정 값][3](또는 고유한 태그 값의 개수)를 시각화하고, 선택적으로 데이터를 최대 3개의 태그(그룹화)로 분할할 수 있습니다.

**참고**: [라이브 탐색기][4](15분)에서는 하나의 차원으로만 그룹화할 수 있습니다.

집계된 보기는 추가 쿼리 옵션을 사용하여 **측정된 태그 차원**, 쿼리 기준으로 **그룹화**할 차원 및 **집계 기간**을 정의합니다. 예를 들어 다음과 같습니다.

1. `Duration` 측정 값을 보려면 선택합니다.

   {{< img src="tracing/trace_explorer/visualize/group_by_measured_dimension.png" alt="측정된 차원" style="width:100%;">}}

2. `Duration` 측정 값에 대해 함수 집계를 선택합니다. 측정 값을 선택하면 함수 집계를 선택할 수 있고, 정성적 속성을 선택하면 고유 개수를 표시합니다.

   {{< img src="tracing/trace_explorer/visualize/group_by_aggregation_function.png" alt="집계 함수" style="width:100%;">}}

3. 예를 들어 `Resource`와 같이 쿼리를 차원으로 그룹화합니다.

   {{< img src="tracing/trace_explorer/visualize/group_by_dimension.png" alt="차원 분할" style="width:100%;">}}

4. 선택한 태그에 따라 상단 또는 하단 값 중 하나를 표시하도록 선택합니다.

    {{< img src="tracing/trace_explorer/visualize/group_by_top_bottom.png" alt="상하단 X 값" style="width:100%;">}}

5. 롤업 기간(예: `10min`)을 선택합니다.

    {{< img src="tracing/trace_explorer/visualize/group_by_rollup_period.png" alt="롤업 기간" style="width:100%;">}}

다음 트레이스 탐색기 시계열 뷰는 지난 4시간 동안 `Duration`의 95번째 백분위수에 따른 `shopist-web-ui` 서비스의 상위 10개 리소스 이름의 변화를 보여줍니다.

{{< img src="tracing/trace_explorer/visualize/timeseries_view.png" alt="시계열 보기" style="width:100%;">}}

시계열에 대한 추가 표시 옵션을 선택합니다. **롤업 간격**(**막대**(개수와 고유 개수에 권장)로 결과를 **표시)**, **줄**(통계적 집계에 권장) 또는 **면적 및 **색상**을 사용할 수 있습니다.

## 상위 목록

상위 목록을 사용하여 스팬 개수, 고유한 태그 값 개수 또는 단일 태그 차원별 분할된 측정 값을 시각화할 수 있습니다.

예를 들어 다음 상위 목록은 스팬 개수를 기준으로 지난 하루 동안 결제 시 오류가 발생한 상위 10명의 웹사이트 고객을 보여줍니다.

{{< img src="tracing/trace_explorer/visualize/top_list_view.png" alt="상위 목록 보기" style="width:100%;">}}

## 테이블

표를 사용하여 선택한 측정 값 또는 스팬(span) 개수에 따라 최대 3개 차원 조합의 상위 값을 시각화할 수 있습니다.

**참고**: 단일 차원으로 그룹화된 테이블 시각화는 표시만 다를 뿐 상위 목록과 동일합니다.

다음 표는 `Env`, `Service`, `Error type`의 오류 스팬 개수를 보여줍니다.

{{< img src="tracing/trace_explorer/visualize/table_view.png" alt="표 보기" style="width:100%;">}}

## 요청 흐름 맵

[요청 흐름 맵][6]은 APM의 [서비스 맵][7]과 [실시간 탐색][8] 기능을 결합하여 스택 전반의 요청 경로를 보여줍니다. 트레이스 범위를 다양한 태그 조합으로 지정하고 모든 서비스 간의 요청 흐름을 나타내는 동적 맵을 생성합니다.

{{< img src="tracing/live_search_and_analytics/request_flow_map/Overview.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="서비스 간 요청 흐름, 요청 시간 및 오류율을 보여주는 요청 흐름 맵" >}}

예를 들어, 요청 흐름 맵을 사용하여 트래픽이 많은 서비스를 식별하거나 특정 엔드포인트에 대한 요청으로 생성된 데이터베이스 호출 수를 추적할 수 있습니다. [섀도 배포][9]를 사용하거나 사용자 지정 스팬 태그로 설정된 기능 플래그를 사용하면 요청 흐름 맵을 사용하여 요청 간 요청 지연 시간을 비교하고 코드 변경이 성능에 미치는 영향을 예측할 수 있습니다.

### 요청 흐름 맵 탐색

- 두 서비스를 연결하는 에지 위에 마우스를 올려놓으면 해당 서비스 간의 요청, 오류, 지연 시간에 관한 메트릭을 확인할 수 있습니다. **참고**: 강조 표시된 에지는 처리량이 가장 높은 연결 또는 가장 일반적인 경로를 나타냅니다.

- **Export**를 클릭하여 현재 요청 흐름 맵의 PNG 이미지를 저장합니다. 이 기능을 사용하여 실시간 아키텍처 다이어그램이나 특정 사용자 흐름에 맞는 아키텍처 다이어그램을 생성할 수 있습니다.

- 맵에서 서비스를 클릭하면 해당 서비스의 상태, 성능, 인프라 및 런타임 메트릭을 볼 수 있습니다.

{{< img src="tracing/live_search_and_analytics/request_flow_map/ServicePanel.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="선택한 서비스의 메트릭 및 메타데이터가 포함된 요청 흐름 맵 사이드 패널" >}}

- 맵은 현재 서비스 수에 따라 적절한 레이아웃을 자동으로 선택합니다. **Cluster** 또는 **Flow**를 클릭하여 레이아웃을 전환하세요.

- [RUM과 Traces를 연결한 경우][10] RUM 애플리케이션은 요청 흐름 맵에 표시됩니다.

{{< img src="tracing/live_search_and_analytics/request_flow_map/RUMService.mp4" alt="요청 흐름 맵에서 RUM 애플리케이션 서비스 세부 정보를 어떻게 탐색하는지 보여주는 동영상" video=true style="width:100%;">}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_explorer/query_syntax/#search-syntax
[2]: /ko/tracing/trace_explorer/query_syntax/#time-range
[3]: /ko/tracing/trace_explorer/facets/#quantitative-facets-measures
[4]: /ko/tracing/trace_explorer/?tab=timeseriesview#live-search-for-15-minutes
[5]: /ko/tracing/error_tracking/
[6]: https://app.datadoghq.com/apm/flow-map
[7]: /ko/tracing/services/services_map/
[8]: /ko/tracing/trace_explorer/
[9]: /ko/tracing/services/deployment_tracking/#shadow-deploys
[10]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum