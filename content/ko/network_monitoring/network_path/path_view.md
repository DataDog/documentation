---
description: Network Path - Path View 조사
further_reading:
- link: /network_monitoring/network_path/setup
  tag: 설명서
  text: Network Path 설정
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: 블로그
  text: Datadog NPM을 통해 클라우드 아키텍처 및 앱 종속성 모니터링
title: 경로 보기
---
## 개요 {#overview}

Network Path의 Path View 섹션에서는 특정 경로를 자세히 분석하여 소스에서 대상까지 발생할 수 있는 잠재적인 문제를 해결할 수 있도록 지원합니다. 이 기능은 전체 경로에 걸친 종단 간 지연 시간과 패킷 손실에 대한 종합적인 데이터를 제공합니다.

Path View 페이지에 액세스하려면 [List view][2] 또는 [AS view][3]에서 경로를 클릭합니다. 이 페이지에서는 지연 시간 임계값의 색상을 변경하고 각 홉의 상태를 확인할 수 있습니다.

{{< img src="network_performance_monitoring/network_path/network_path_view_5.png" alt="Network Path 보기에서 대상에 정상적으로 도달하며 패킷 손실은 0%, 지연 시간은 103ms이고 지연 시간 및 도달 가능성 기록이 표시되는 화면" >}}

소스와 대상 사이의 홉 경로에서 아무 경로나 클릭하면 `Hop TTL`, `Hop Latency`, `Traversed count` 등의 추가 세부 정보를 확인할 수 있습니다. 그런 다음 **View Device Details**를 클릭하여 선택한 장치의 [NDM][4] 장치 세부 정보로 이동합니다.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="경로 세부 정보를 강조 표시한 Network Path의 Path View." style="width:30%;" >}}

## 범례 {#legend}

범례는 각 홉의 상태에 대한 추가 정보를 제공합니다.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="범례를 표시한 Network Path의 Path View." style="width:30%;" >}}

Traversal count 
: 해당 홉을 통과한 `traceroutes`의 수입니다.

Traversal completion 
: `traceroute`이 대상에 성공적으로 도달했는지 여부를 나타냅니다.

Reachability
: 대상에서 발생하는 패킷 손실 수준입니다.

Latency 
: `traceroute`이 소스에서 대상으로 이동하는 데 걸린 시간입니다.

**참고**: 홉 간 지연 시간은 완료되지 않은 홉의 경우 `N/A`으로 표시될 수 있습니다.

## 상태 표시줄 {#health-bar}

지연 시간/도달 가능성 상태 표시줄을 드래그하여 경로의 특정 시간 구간에 대한 종단 간 지연 시간과 종단 간 패킷 손실의 스냅샷을 확인합니다.

**참고**: 상태 표시줄을 변경해도 페이지 상단의 전체 시간 범위에는 영향을 주지 않습니다.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_3.mp4" alt="지연 시간 상태 표시줄을 선택하여 특정 시간대로 드래그하는 Network Path 동영상" video="true" >}}

## 시각적 비교 {#visual-comparison}

시각적 비교 보기를 사용하면 두 개의 경로 시각화를 나란히 비교하여 인시던트 발생 전후에 무엇이 변경되었는지 확인할 수 있습니다.

비교 보기에서는 다음 기능을 제공합니다.

- 서로 다른 시간 범위에서 동일한 Network Path를 나란히 비교한 스냅샷.
- 서로 다른 두 Network Path(서로 다른 소스 및 대상 쌍)를 나란히 비교한 스냅샷.
- 두 쿼리 간 차이점을 강조하는 세로 레이아웃.
- 공통 홉과 고유 홉의 자동 식별.
- RTT 지연 시간, 패킷 손실, 지터 및 홉 수를 비교하는 중첩 시계열 그래프.

{{< img src="network_performance_monitoring/network_path/visual_comparison_paths_2.png" alt="도달 가능한 대상의 Path A와 도달 불가능한 대상의 Path B를 위아래로 비교하고 상단에 RTT 지연 시간 타임라인을 표시하는 Visual Comparison 보기" style="width:100%;" >}}

### 비교 보기 열기 {#open-the-comparison-view}

비교 보기를 열려면 Network Path 보기의 시간 범위 제어 옆에 있는 **Compare**를 클릭합니다. 기본적으로 이전에 선택한 시간 범위가 표시되며, 직전의 동일한 길이의 시간 구간과 비교합니다. 예를 들어 3시간 범위는 이전 3시간 범위와 비교됩니다. 상단의 컨트롤을 사용하여 비교할 시간 범위를 조정합니다.

### 비교 탐색 {#navigate-the-comparison}

확대/축소 컨트롤, 미니맵 또는 ⌘/Ctrl 키를 누른 상태에서 마우스 휠을 사용하여 분할된 경로를 각각 독립적으로 탐색할 수 있습니다.

공통 홉에서 **Inspect**를 클릭하면 메타데이터를 표시하고 해당 홉이 두 보기 모두에 존재하는지 확인하는 사이드바가 열립니다. 고유 홉은 한쪽 보기에만 존재함을 나타내기 위해 별도의 색상으로 강조 표시됩니다.

**Analysis** 탭에서는 각 시간 범위의 패킷 및 RTT 지연 시간을 홉별로 나란히 비교하여 보여줍니다.

{{< img src="network_performance_monitoring/network_path/network_path_analysis_comparison.png" alt="Path A와 Path B의 Hop RTT Latency 표를 나란히 표시한 Visual Comparison 보기의 Analysis 탭" style="width:100%;" >}}

## 그래프 {#graphs}

Path View 페이지 하단에서는 여러 그래프를 통해 각 경로에 대한 추가 정보를 제공합니다.  

### 종단 간 메트릭 그래프 {#end-to-end-metrics-graph}

종단 간 메트릭 그래프는 각 경로의 종단 간 지연 시간과 종단 간 패킷 손실을 시각적으로 표시하여 효과적으로 비교하고 분석할 수 있도록 합니다.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="종단 간 메트릭 그래프를 표시하는 Path View 페이지." >}}

### 홉 간 지연 시간 그래프 {#hop-to-hop-latency-graph}

홉 간 지연 시간 그래프는 경로를 따라 각 홉의 지연 시간을 자세히 보여주므로 잠재적인 병목 지점이나 문제 구간을 쉽게 식별할 수 있습니다.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_3.png" alt="홉 간 지연 시간 그래프를 표시하는 Path View 페이지." >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /ko/network_monitoring/network_path/list_view
[3]: /ko/network_monitoring/network_path/as_view/
[4]: /ko/network_monitoring/devices