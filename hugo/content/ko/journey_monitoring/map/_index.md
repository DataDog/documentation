---
description: Journey Monitoring 맵에서 여정의 성과를 시각화하고 모니터링하세요.
further_reading:
- link: /journey_monitoring
  tag: 설명서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/map/suggested_journeys/
  tag: 설명서
  text: 추천 여정에 대해 알아보기
- link: /journey_monitoring/details_report/
  tag: 설명서
  text: 여정 세부 보고서에 대해 알아보기
- link: /journey_monitoring/details_report/variants/
  tag: 설명서
  text: 여정 변형에 대해 알아보기
- link: /journey_monitoring/uptime/
  tag: 설명서
  text: 여정 가동 시간에 대해 알아보기
title: 맵
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Journey Monitoring은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

**Journey Monitoring 맵**은 프론트엔드 애플리케이션에서 생성 및 추천된 모든 여정을 표시합니다. 맵의 각 타일에는 여정의 볼륨 및 전환율에 대한 메트릭이 표시됩니다. 여정에 정의된 Synthetic 테스트가 하나 이상 있는 경우, 타일에는 해당 여정의 [Synthetic 테스트 모음][1] 가동 시간 메트릭도 표시됩니다.

<div class="alert alert-danger"><p>RUM without Limits, Synthetic Monitoring & Testing 또는 Product Analytics로 계측된 프론트엔드 애플리케이션만 Journey Monitoring을 사용할 수 있습니다.</p></div>

## 여정 탐색 및 관리 {#explore-and-manage-journeys}

맵을 사용하여 여정을 탐색하고 관리하세요.
- 맵에서 확대/축소 수준 변경
- 여정 위에 마우스를 올려 설명, 시작, 종료 정의 확인
- 카탈로그에서 여정을 클릭하여 해당 여정의 [세부 보고서][2]로 이동
- 필터와 검색창을 사용하여 카탈로그 및 맵에 표시되는 여정의 범위 좁히기
- 여정의 점 세 개 메뉴를 클릭하여 여정 편집 또는 삭제

## 여정 상태 {#journey-states}

맵과 카탈로그의 여정은 구성 및 성능에 따라 색상으로 구분될 수 있습니다.
- 추천 여정은 **보라색**으로 표시되며 '추천' 배지로 태그되어 있습니다.
- 전환율이 하락하는 여정은 **주황색**으로 표시되며 빨간색 V자형 아이콘이 포함되어 있습니다.
- 테스트에 실패한 여정은 **빨간색**으로 표시됩니다.
- Synthetic 테스트 모음에 테스트가 없는 여정은 툴팁에 **경고**가 포함됩니다.

## 맵의 사용자 흐름 {#user-flows-in-the-map}

맵의 가장 왼쪽에 있는 노드는 애플리케이션 내 모든 사용자 세션의 시작점을 나타냅니다. 맵의 다른 모든 노드는 페이지 또는 여정입니다. 페이지 노드는 중첩된 페이지를 표시하기 위해 확장되는 상위 경로를 나타낼 수 있습니다.

{{< img src="journey_monitoring/journey-monitoring-map-zoom-1.png" alt="왼쪽에는 트래픽 및 전환 메트릭이 포함된 여정 카탈로그가 있고, 오른쪽에는 애플리케이션 보기와 액션 간의 사용자 경로를 표시하는 시각적 흐름 맵이 있는 Journey Monitoring 맵입니다." style="width:100%;" >}}

연결선이 두꺼울수록 두 노드 사이의 트래픽이 더 많습니다. 세션 시작 노드에 연결되지 않은 여정은 사용자가 애플리케이션의 진입점으로써가 아니라 세션이 이미 시작된 후에 이동하는 여정입니다.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/test_suites/
[2]: /ko/journey_monitoring/details_report/