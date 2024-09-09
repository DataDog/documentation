---
aliases:
- /ko/network_performance_monitoring/network_map/
description: 네트워크 데이터를 모든 태그에 걸쳐 매핑합니다.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: 블로그
  text: 네트워크 성능 모니터링
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: 블로그
  text: 향상된 쿼리 및 맵 경험을 통해 네트워크 조사를 간소화합니다.
- link: /network_monitoring/devices
  tag: 설명서
  text: 네트워크 장치 모니터링
- link: /network_monitoring/performance/setup
  tag: 설명서
  text: Datadog 에이전트를 사용하여 네트워크 데이터를 수집합니다.
title: 네트워크 맵
---

## 개요

[네트워크 맵][1]은 네트워크의 토폴로지 보기를 제공하여 네트워크 파티션, 종속성 및 병목 현상을 시각화할 수 있도록 도와줍니다. 이 페이지는 네트워크 데이터를 방향 맵으로 통합하여 노이즈를 차단하고 문제가 있는 영역을 분리하는 데 사용할 수 있습니다.

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="network_map" >}}

## 설정

네트워크 맵은 Datadog 에이전트에서 수집한 데이터를 자동으로 시각화합니다. 설치한 후에는 추가 단계가 필요하지 않습니다.

## 사용법

**맵** 탭을 선택하여 네트워크 맵을 설정합니다:

{{< img src="network_performance_monitoring/network_map/network_map_search.png" alt="네트워크 맵 페이지 검색 창" >}}

1. 페이지 상단의 첫 번째 셀렉터를 사용하여 **Nodes**에 표시할 태그를 선택합니다. 사용 가능한 태그는 네트워크 페이지에서 제공되는 태그와 동일합니다.

    {{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="네트워크 맵 페이지 검색 창" >}}

    - 노드가 너무 많으면 두 번째 태그가 자동으로 그룹에 추가됩니다. **By** 드롭다운 메뉴에서 태그를 변경할 수 있습니다. 자세한 내용은 [클러스터링](#map-clusters)을 참조하세요.
2. **Edges**가 나타낼 메트릭을 선택합니다:

    - 전송 처리량
    - 수신 처리량
    - TCP 재전송
    - TCP 지연 시간
    - TCP Jitter
    - 설정된 연결
    - 폐쇄된 연결

3. 표시할 연결을 필터링합니다. 다음 사용 여부를 선택할 수 있습니다:

    - 특정 환경, 네임스페이스 또는 기타 태그에 대한 트래픽을 필터링합니다.
    - 퍼지 문자열 일치를 기준으로 태그를 필터링합니다.
      {{< img src="network_performance_monitoring/network_map/filtering_npm_map_search.mp4" alt="검색을 통한 네트워크 맵 필터링" video="true" >}}

    - **미해결 트래픽을 표시합니다**.
    - 네트워크 트래픽을 활성 네트워크 메트릭의 지정된 백분위수 범위 밖으로 숨깁니다.
       {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="네트워크 맵 플로우 필터링" video="true" width="50%" >}}

## 조사

노드 위에 마우스를 놓으면 노드가 강조 표시되고 전송 및 수신하는 네트워크 트래픽의 방향성이 애니메이션으로 표시됩니다:

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="네트워크 맵" video="true" width="70%" >}}

노드를 클릭하고 메뉴에서 _Inspect_를 선택하면 더 큰 네트워크 내에서 해당 노드를 컨텍스트화할 수 있습니다:

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="네트워크 엔티티 확대" video="true" width="70%">}}

## 맵 클러스터

복잡한 네트워크의 경우 맵의 쿼리 편집기에는 추가 그룹화 필드가 있습니다. 이렇게 하면 노드가 너무 많아 맵에 한 번에 표시할 수 없는 데이터 집합을 렌더링할 수 있습니다. 추가 그룹화 필드를 사용하면 카디널리티가 높은 쿼리의 성능도 향상됩니다.

{{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="네트워크 맵 페이지 검색 창" >}}

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="network_map" >}}

클러스터링은 맵의 노드를 그룹화하기 위한 차원을 추가합니다. 큰 맵은 자동으로 클러스터링되어 맵의 로드 시간과 가독성을 개선합니다. 클러스터 내의 노드를 보려면 클러스터를 클릭하여 확장합니다. 클러스터를 축소하려면 노드를 둘러싼 회색 영역을 클릭합니다.

클러스터 주위의 빨간색 테두리는 하나 이상의 알림 모니터가 노드가 그룹화된 태그와 일치하는 태그를 가지고 있음을 나타냅니다. 예를 들어, 맵이 서비스별로 그룹화된 경우 맵은 `service:<nodeName>` 태그가 있는 모니터를 찾습니다. 모니터가 경고 상태인 경우 `<nodeName>`이 포함된 클러스터의 윤곽이 빨간 색으로 표시됩니다.

{{< img src="network_performance_monitoring/network_map/expanded_network_cluster.png" alt="확장된 네트워크 클러스터 맵 보기" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map