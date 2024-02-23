---
aliases:
- /ko/tracing/trace_search_and_analytics/request_flow_map
description: 트레이스 검색 및 분석
further_reading:
- link: https://www.datadoghq.com/blog/apm-request-flow-map-datadog
  tag: 블로그
  text: 요청 플로우 맵에 대해 자세히 알아보기
kind: 설명서
title: 요청 플로우 맵
---

{{< img src="tracing/live_search_and_analytics/request_flow_map/Overview.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="요청 플로우 맵" >}}

_요청 플로우 맵_(_Request flow maps_)으로 Datadog 애플리케이션 성능 모니터링(APM)의 두 가지 핵심 기능인 [서비스 맵][1]과 [라이브 탐색][2]을 결합하여 스택을 통해 요청 경로를 이해하고 추적하도록 도와드립니다. 노이즈가 많은 서비스 및 초크 포인트나 특정 엔드포인트에 대한 요청으로 생성되는 데이터베이스 호출 수를 신속하게 식별합니다.

해당 플로우 맵을 사용하기 위해 추가 설정을 하지 않아도 되며, [수집한 스팬][3]으로 동작합니다. 라이브(지난 15분간) 트레이스 범위를 태그 조합으로 지정하여 모든 서비스 요청 플로우를 나타내는 동적 맵을 생성합니다. 본 맵은 검색 기준에 따라 자동으로 생성되며, 변경 사항이 있는 경우 라이브로 다시 생성됩니다.

## 요청 플로우 맵 탐색하기

- 두 개의 서비스를 연결하는 엣지에 마우스를 올리면 쿼리 파라미터와 일치하는 서비스 두 가지 간의 요청에 관한 오류, 요청, 레이턴시용 메트릭을 확인할 수 있습니다.

- 처리량이 가장 많은 연결이 강조 표시되어 가장 일반적인 경로를 나타냅니다.

- **내보내기**를 클릭하여 현재 요청 플로우 맵 PNG 이미지를 저장합니다. 라이브 아키텍처 다이어그램이나 특정 사용자 플로우 한정 다이어그램을 생성하는 좋은 방법입니다.

{{< img src="tracing/live_search_and_analytics/request_flow_map/ServicePanel.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="서비스 정보용 플로우 맵 사이드 패널" >}}

- 맵에서 서비스를 클릭하면 해당 서비스의 전반적인 상태 및 성능 정보(처리량, 레이턴시, 오류율, 모니터링 상태)와 인프라스트럭처 및 런타임 메트릭을 함께 확인할 수 있습니다.

- 맵은 서비스의 숫자에 따라 적절한 레이아웃을 자동으로 선택하며, **클러스터**나 **플로우**를 클릭하여 사용 가능한 두 가지 레아이웃을 전환할 수 있습니다.

- [RUM 및 트레이스가 연결][4]되어 있는 경우 요청 플로우 맵에 RUM 애플리케이션이 표시됩니다.

{{< img src="tracing/live_search_and_analytics/request_flow_map/RUMService.mp4" alt="플로우 맵 RUM 서비스 링크" video=true style="width:100%;">}}

앱에서 [요청 플로우 맵][5]을 사용해 보세요. 시작하려면 단일 서비스 또는 엔드포인트와 같은 간단한 쿼리의 범위를 지정합니다.

### 예시

요청 플로우 맵을 활용하여 애플리케이션의 동작을 추적해 보세요:

- 특정 HTTP 요청에 해당하는 [리소스][6]를 검색합니다.

- [섀도우 배포][7] 또는 [커스텀 스팬(span) 태그][8]로 설정한 기능 플래그를 사용한다면 맵을 활용하여 요청 간 레이턴시를 비교해 보세요. 잠재적 코드 변경이 배포 버전의 레이턴시에 어떤 영향을 미치는지 확인하여 [배포 추적][9]을 사전 프로덕션 단계에서 보완할 수 있는 뛰어난 기능입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/visualization/services_map/
[2]: /ko/tracing/trace_explorer/
[3]: /ko/tracing/trace_ingestion/ingestion_controls
[4]: /ko/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[5]: https://app.datadoghq.com/apm/flow-map
[6]: /ko/tracing/visualization/#resources
[7]: /ko/tracing/deployment_tracking/#shadow-deploys
[8]: /ko/tracing/guide/add_span_md_and_graph_it/
[9]: /ko/tracing/deployment_tracking/