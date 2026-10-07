---
aliases:
- /ko/network_performance_monitoring/network_table
- /ko/network_performance_monitoring/network_page
- /ko/network_monitoring/performance/network_page
- /ko/network_monitoring/performance/network_analytics
description: 스택 전체의 각 소스와 대상 간에 네트워크 데이터를 탐색합니다.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: 블로그
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: 블로그
  text: 향상된 쿼리 및 맵 환경을 통해 네트워크 조사 간소화
- link: /network_monitoring/devices
  tag: 설명서
  text: Network Device Monitoring
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: 가이드
  text: Network Insights를 사용해 애플리케이션 가용성 감지
title: Network Analytics
---
## 개요 {#overview}

Network Analytics 페이지에서는 전체 네트워크 상태에 대한 인사이트를 제공하며, 페이지 상단에 [권장 쿼리](#recommended-queries)를 표시합니다. 이러한 권장 쿼리를 사용하면 일반적으로 많이 사용하는 쿼리를 실행하고 관련 메트릭의 스냅샷을 확인할 수 있으므로 처리량, 지연 시간, DNS 오류 등의 변화를 확인할 수 있습니다. 권장 쿼리를 클릭하면 검색 창, 그룹화 기준 및 요약 그래프가 자동으로 채워져 네트워크에 대한 관련 인사이트를 제공합니다.

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_3.png" alt="Cloud Network Monitoring의 Network Analytics 시작 페이지" >}}

## 쿼리 {#queries}

특정 엔드포인트 간의 트래픽으로 검색 범위를 좁히려면 **태그를 사용하여** 네트워크 연결을 집계하고 필터링합니다. Datadog 통합 또는 [unified service tagging][12]의 태그를 사용하여 자동으로 집계 및 필터링할 수 있습니다. Network Monitoring에서 태그를 사용하면 특정 서비스 또는 전체 인프라에서 네트워크 트래픽이 Availability Zone 간에 어떻게 흐르는지 파악할 수 있습니다. `client` 및 `server` 태그를 기준으로 그룹화하면 두 태그 집합 _간의_ 네트워크 흐름을 시각화할 수 있습니다.

또한 Datadog는 필요에 가장 적합한 네트워크 트래픽을 효율적으로 쿼리하고 분석할 수 있도록 기본 제공되는 [즉시 사용 가능한](#default-tags) 태그 목록을 제공합니다.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="태그 기준으로 그룹화했을 때 요청이 표시되는 방식을 보여주는 네트워크 다이어그램" style="width:100%;">}}

예를 들어 `orders-app`이라는 주문 서비스와 모든 Availability Zone 간의 네트워크 트래픽을 확인하려면 검색 창에 `client_service:orders-app`를 입력하고, **Group By** 드롭다운에 `client_service` 및 `server_availability-zone` 태그를 추가하여 이 두 태그 집합 간의 트래픽 흐름을 시각화합니다.

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag_2.png" alt="서비스를 기준으로 필터링하고 Availability Zone을 기준으로 그룹화했을 때 요청이 표시되는 방식을 보여주는 Network Analytics 페이지" style="width:90%;">}}

기본 보기에서는 클라이언트와 서버를 `service` 태그를 기준으로 집계합니다. 따라서 표의 각 행은 1시간 동안 집계된 서비스 간 연결을 나타냅니다. **Auto-grouped traffic**을 선택하면 `service`, `kube_service`, `short_image`, `container_name` 등 자주 사용되는 여러 태그를 기준으로 그룹화된 트래픽을 확인할 수 있습니다.

**참고**: `NA/Untagged` 트래픽 경로에 대한 자세한 내용은 [Unresolved traffic](#unresolved-traffic)을 참조하세요.

### 트래픽 방향과 관련된 클라이언트 및 서버 역할 이해 {#understanding-client-and-server-roles-in-relation-to-traffic-direction}

Network Analytics 페이지는 한 영역의 클라이언트에서 다른 영역의 서버로 향하는 방향성 있는 트래픽 흐름을 표시합니다. 이러한 흐름은 대칭적이지 않으며, 방향을 반대로 했을 때 “전송된 바이트”와 “수신된 바이트”가 동일하게 표시되지 않을 수 있습니다.

이 맥락에서:

- 클라이언트는 연결을 시작하는 측을 의미합니다.
- 서버는 해당 연결에 응답하는 측을 의미합니다.

Datadog는 연결을 시작한 주체를 기준으로 트래픽을 모니터링합니다. 반대 방향(서버에서 클라이언트)은 별도의 흐름으로 표시되며, 볼륨 메트릭이 다르거나 해당 방향으로 시작된 연결이 없는 경우 데이터가 전혀 표시되지 않을 수도 있습니다.

예를 들어 `us-east-1d`의 클라이언트가 `us-east-1c`의 서버와 통신하는 경우 상당한 트래픽이 표시될 수 있습니다. 그러나 `us-east-1d`에 서버가 없으면 반대 방향 행(`us-east-1c → us-east-1d`)에는 데이터가 거의 없거나 전혀 표시되지 않을 수 있습니다.

**참고**: 트래픽의 비대칭성은 애플리케이션 동작이나 인프라 요소(예: 프록시 또는 NAT), 또는 한 방향에서 연결이 시작되지 않는 경우에도 발생할 수 있습니다.

### 권장 쿼리 {#recommended-queries}

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_3.png" alt="Datadog의 Network Analytics 페이지에 표시되는 세 가지 권장 쿼리">}}

권장 쿼리를 사용하면 특정 문제를 해결하거나 네트워크를 전반적으로 더 잘 이해하기 위한 조사 작업을 즉시 시작할 수 있습니다. 권장 쿼리는 트래픽을 직접 검색하거나 그룹화하지 않아도 관련 네트워크 정보를 찾을 수 있도록 도와줍니다. 예를 들어 권장 쿼리 `Find dependencies of service: web-store`을 선택하면 검색 창에 `client_service: web-store` 쿼리가 자동으로 입력되고, web-store 서비스가 네트워크 내에서 트래픽을 보내는 상위 서비스를 표시하여 해당 서비스의 다운스트림 종속성을 확인할 수 있습니다.

사용 가능한 권장 쿼리는 Analytics 페이지 상단에 제공되며, [DNS 페이지][10] 상단에는 세 가지 권장 쿼리가 표시됩니다. 이러한 쿼리를 사용하여 자주 사용하는 데이터에 빠르게 접근하고 지난 1시간 동안 해당 데이터의 변화를 확인할 수 있습니다.

권장 쿼리를 실행하려면 타일을 클릭합니다. 타일 위에 마우스를 올리면 해당 쿼리가 반환하는 데이터에 대한 설명과 요약이 표시됩니다.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="Search for, View clients as, View servers as, Visualize as의 네 가지 쿼리 디멘션이 표시된 권장 쿼리의 세부 정보 보기" style="width:70%;">}}

### 패싯 패널 {#facet-panels}

패싯 패널을 사용하면 정확한 태그 이름을 기억하지 않아도 모든 플로의 사용 가능한 태그를 탐색하거나 트래픽을 필터링할 수 있습니다. 패싯 패널은 검색 창 쿼리의 태그를 그대로 반영합니다. **Client** 및 **Server** 탭을 사용하여 패싯 패널을 전환합니다.

#### 사용자 지정 패싯 {#custom-facets}

Network Analytics 페이지에서는 모든 태그를 기준으로 트래픽 데이터를 집계하고 필터링할 수 있습니다. 포함된 태그 목록은 화면 왼쪽의 **Client** 및 **Server** 탭 아래와 **Group By** 드롭다운 메뉴에서 확인할 수 있습니다.

표시되는 태그에는 `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip`, `port` 등이 포함됩니다. 메뉴에 없는 태그를 기준으로 트래픽을 집계하거나 필터링하려면 해당 태그를 사용자 지정 패싯으로 추가합니다.

1. 패싯 패널 오른쪽 상단의 **+ Add** 버튼을 선택합니다.
2. 사용자 지정 패싯으로 생성할 태그를 입력합니다.
3. **Add**를 클릭합니다.

사용자 지정 패싯이 생성되면 이 태그를 사용하여 Network Analytics 페이지와 Network Map에서 트래픽을 필터링하고 집계할 수 있습니다. 모든 사용자 지정 패싯은 패싯 패널 하단의 `Custom` 섹션에서 확인할 수 있습니다.

### Wildcard 검색 {#wildcard-search}
여러 문자를 대상으로 하는 와일드카드 검색을 수행하려면 `*` 기호를 사용합니다.

- `client_service:web*`: web으로 시작하는 모든 클라이언트 서비스를 찾습니다.
- `client_service:*web` : web으로 끝나는 모든 클라이언트 서비스를 찾습니다.
- `client_service:*web*` : 문자열 web을 포함하는 모든 클라이언트 서비스를 찾습니다.

Wildcard 검색은 패싯 내에서 이 구문을 사용하여 동작합니다. 다음 쿼리는 문자열 "mongo"로 끝나는 모든 클라이언트 서비스를 반환합니다.

`client_service:*mongo`

자세한 내용은 [검색 구문][1] 설명서를 참조하세요.

### 중립 태그 {#neutral-tags}

중립 태그는 클라이언트나 서버에 특정되지 않고 전체 흐름에 적용되는 태그입니다. 이러한 중립 태그를 사용하여 트래픽을 검색하고 필터링할 수 있습니다. 예를 들어 이러한 태그를 사용하여 TLS로 암호화된 트래픽만 필터링할 수 있습니다.

중립 태그의 전체 목록과 설명은 Tags Reference의 [Neutral tags][15]를 참조하세요.

### Group by {#group-by}

그룹을 사용하면 지정한 태그 값을 기준으로 데이터를 그룹화할 수 있습니다. 예를 들어 **host**를 그룹화 기준으로 선택하면 결과가 개별 호스트별로 그룹화됩니다. 또한 관심 있는 그룹화 기준 태그가 지정되지 않은 대량의 데이터가 있을 수 있습니다. 이러한 경우에는 **Auto-grouped traffic**을 사용하여 사용 가능한 태그를 기준으로 데이터를 그룹화할 수 있습니다.

모든 호스트의 연결을 하나의 그룹으로 조사하려면 **Group By** 드롭다운에 `client_host` 및 `Auto-Grouped-Servers` 태그를 추가합니다.

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped_client.png" alt="호스트 기준으로 정렬되고 Auto-grouped traffic으로 그룹화된 NPM Analytics 페이지" style="width:90%;">}}

**Auto-grouped traffic** 옵션을 사용하면 태그의 소스를 확인할 수 있습니다. 예를 들어 개별 아이콘 위에 마우스를 올리면 태그의 출처를 나타내는 툴팁이 표시됩니다.

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="태그 소스를 표시하는 아이콘 툴팁" style="width:90%;">}}

## 요약 그래프 {#summary-graphs}

요약 그래프는 네트워크를 축약해서 보여주는 보기이며, 필요에 따라 볼륨, 처리량, 연결 또는 지연 시간을 표시하도록 변경할 수 있습니다. 최대 3개의 요약 그래프를 동시에 표시할 수 있으며, 조직의 요구 사항에 맞게 데이터와 시각화 유형을 변경할 수 있습니다. 그래프의 데이터 소스를 변경하려면 그래프 제목을 클릭한 다음 드롭다운 메뉴에서 원하는 항목을 선택합니다.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="Volume Sent, Throughput Sent, Volume Received, Throughput Received, Established Connections, Closed Connections, Established Connections / Second, Closed Connections / Second 및 TCP Latency를 선택할 수 있는 Network Analytics 페이지의 요약 그래프 섹션" style="width:80%;">}}

시각화 유형을 변경하려면 그래프 오른쪽 상단의 연필 아이콘을 클릭합니다. 아래 스크린샷과 같이 제공되는 옵션 중에서 선택합니다.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Y축 스케일(Linear, Log, Pow, Sqrt)과 그래프 유형(Area, Line, Bars, Toplist, Change, Piechart)을 조정할 수 있는 요약 그래프 시각화 옵션" style="width:60%;">}}

특정 그래프를 숨기려면 연필 아이콘 옆의 **hide graph** 아이콘을 클릭합니다. 최소 1개에서 최대 3개의 그래프를 표시할 수 있습니다. 그래프를 추가하려면 요약 그래프 오른쪽의 더하기 아이콘 `+`을 클릭한 다음 추가할 그래프를 선택합니다. 새 그래프를 추가할 때 그래프를 기본 설정으로 재설정할 수도 있습니다.

## 표 {#table}

네트워크 표는 쿼리에서 정의한 각 **소스**와 **대상** 간의 Volume, Throughput, TCP Retransmits, Round-trip Time(RTT), RTT 분산 메트릭을 분석하여 표시합니다.

{{< img src="network_performance_monitoring/network_analytics/network_table_3.png" alt="자동 그룹화된 트래픽 및 처리량 열을 보여주는 네트워크 데이터 표" >}}

표 오른쪽 상단에 있는 **Customize** 톱니바퀴 아이콘(⚙️)을 사용하여 표의 열을 구성할 수 있습니다.

페이지 오른쪽 상단의 `Filter Traffic` 버튼을 사용하여 표시할 트래픽을 구성합니다.

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggle.png" alt="흐름 세부 정보" style="width:50%;">}}

외부 트래픽(공용 IP 대상)과 Datadog Agent 트래픽은 기본적으로 표시됩니다. 보기를 좁히려면 `Show Datadog Traffic` 및 `Show External Traffic` 토글을 끄면 됩니다.

### 확인되지 않은 트래픽 {#unresolved-traffic}

확인되지 않은 클라이언트 및 서버 태그는 `N/A`로 표시됩니다. 트래픽 클라이언트 또는 서버 엔드포인트는 소스 또는 대상 정보와 같은 식별 가능한 메타데이터가 부족하여 확인되지 않은 상태일 수 있습니다. 이는 Datadog가 트래픽을 로드 밸런서, 클라우드 서비스 또는 모니터링되는 인프라 내의 특정 IP 주소와 같은 알려진 엔터티로 확인할 수 없는 경우 발생할 수 있습니다. 일반적으로 확인되지 않은 트래픽은 다음과 같은 경우에 발생합니다.

* 호스트 또는 컨테이너의 클라이언트/서버 IP에 트래픽 집계에 사용되는 클라이언트 또는 서버 태그가 지정되지 않은 경우
* 엔드포인트가 사설 네트워크 외부에 있어 Datadog Agent에서 태그를 지정하지 않는 경우
* 엔드포인트가 방화벽, 서비스 메시 또는 Datadog Agent를 설치할 수 없는 다른 엔터티인 경우
* 대상에 서비스 태그가 지정되지 않았거나 IP가 어떤 서비스에도 매핑되지 않은 경우

확인되지 않은 트래픽 모니터링은 네트워크 가시성의 사각지대를 식별하고, 성능 및 보안 분석에서 모든 관련 트래픽이 고려되도록 하는 데 꼭 필요합니다.

데이터 표 오른쪽 상단의 **Show N/A (Unresolved Traffic)** 토글을 사용하면 확인되지 않은(`N/A`) 클라이언트 또는 서버가 포함된 집계 연결을 필터링하여 제외할 수 있습니다.

### Network Path로 이동 {#pivot-to-network-path}

분석 표의 점 세 개 메뉴를 클릭하여 [Network Path][11]로 이동하면 CNM에서 지정한 소스와 대상 간의 경로를 확인할 수 있습니다.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_3.png" alt="Analytics 표에서 점 세 개 메뉴를 클릭하여 Network Path 토글을 표시하는 화면" style="width:90%;">}}

## 저장된 뷰 {#saved-views}

트래픽 데이터 보기를 구성하고 공유합니다. Saved Views를 사용하면 디버깅을 더 빠르게 수행하고 협업을 지원할 수 있습니다. 예를 들어 보기를 생성하여 자주 사용하는 쿼리용으로 저장한 후, 해당 링크를 복사하여 팀원들과 네트워크 데이터를 공유할 수 있습니다.

- 보기를 저장하려면 **+ Save** 버튼을 클릭한 다음 보기 이름을 지정하여 현재 쿼리, 표 구성 및 그래프 메트릭 선택 사항을 저장합니다.
- 보기를 불러오려면 왼쪽 상단의 **Views**를 클릭하여 Saved Views를 확인한 다음 목록에서 보기를 선택합니다.
- 보기 이름을 변경하려면 Saved Views 목록에서 해당 보기 위에 마우스를 올린 후 톱니바퀴 아이콘을 클릭하여 **Edit name**을 선택합니다.
- 보기를 공유하려면 Saved Views 목록에서 해당 보기 위에 마우스를 올린 후 링크 아이콘을 클릭하여 **Copy permalink**를 선택합니다.

자세한 내용은 [Saved Views][5] 설명서를 참조하세요.

## 사이드 패널 {#sidepanel}

사이드 패널은 네트워크 종속성을 디버깅하는 데 도움이 되는 컨텍스트 텔레메트리를 제공합니다. Flows, Logs, Traces 및 Processes 탭을 사용하여 두 엔드포인트 간 트래픽에서 높은 재전송 횟수 또는 지연 시간이 발생하는 원인이 다음 중 무엇인지 확인할 수 있습니다.

- 특정 포트 또는 IP에서 발생한 트래픽 볼륨 급증.
- 대상 엔드포인트의 CPU 또는 메모리를 과도하게 사용하는 프로세스.
- 클라이언트 엔드포인트 코드에서 발생한 애플리케이션 오류.

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel_2.png" alt="클라이언트 서비스 트래픽 간의 트래픽을 자세히 보여주는 CNM 사이드 패널" style="width:90%;">}}

### 공통 태그 {#common-tags}

사이드 패널 상단에는 검사 중인 종속성의 가장 최근 연결에서 클라이언트와 서버가 공통으로 공유하는 태그가 표시됩니다. 공통 태그를 사용하면 문제가 있는 엔드포인트에 대한 추가 컨텍스트를 확인할 수 있습니다. 예를 들어 특정 서비스와의 통신 지연을 조사하는 경우 공통 대상 태그를 통해 다음과 같은 정보를 확인할 수 있습니다.
- 트래픽이 전달되는 컨테이너, 태스크 또는 호스트와 같은 세부 컨텍스트.
- 서비스가 실행되는 Availability Zone, 클라우드 공급자 계정 또는 배포와 같은 광범위한 컨텍스트.

### 트레이스 {#traces}

**Traces** 탭에는 선택한 네트워크 흐름과 연결된 APM 트레이스가 표시됩니다. 이 탭을 사용하면 높은 지연 시간이나 증가한 TCP 재전송 횟수와 같은 네트워크 수준의 문제에서 해당 서비스의 애플리케이션 트레이스로 이동하여 조사할 수 있습니다.

자세한 내용은 [APM][17]을 참조하세요.

### 보안 {#security}

**Security** 탭에는 [Workload Protection][6] 및 [Cloud Security Misconfigurations][7]에서 감지한 잠재적인 네트워크 위협과 발견 사항이 표시됩니다. 이러한 신호는 Datadog가 [탐지 또는 규정 준수 규칙][8]과 일치하는 네트워크 활동을 감지하거나 선택한 네트워크 흐름과 관련된 기타 위협 또는 구성 오류를 감지했을 때 생성됩니다.

네트워크 트래픽을 쿼리하고 필터링할 때 사용할 수 있는 기본 태그의 전체 목록은 [Tags Reference][16]를 참조하세요.

## 네트워크 데이터 {#network-data}

네트워크 메트릭은 그래프와 연결된 표를 통해 표시됩니다. 전송 및 수신 메트릭은 모두 소스의 관점에서 표시됩니다.

* **전송된 메트릭**: _소스_에서 _대상_으로 전송되는 값을 소스의 관점에서 측정합니다.
* **수신된 메트릭**: _대상_에서 _소스_로 전송되는 값을 소스의 관점에서 측정합니다.

패킷 손실이 많이 발생하는 경우 `sent_metric(source to destination)`과 `received_metric(destination to source)`에 표시되는 값이 서로 다를 수 있습니다. 예를 들어 `destination`에서 `source`으로 많은 바이트를 전송하는 경우 `destination`에서 시작된 집계 연결에는 해당 바이트가 포함되지만 `source`에서 시작된 집계 연결에서는 이를 수신된 데이터로 인식하지 않습니다.

**참고:** 데이터는 30초마다 수집되고, 5분 단위로 집계되며, 14일 동안 보관됩니다.

### Metrics {#metrics}

#### 네트워크 부하 {#network-load}

다음 네트워크 부하 메트릭을 사용할 수 있습니다:

| 메트릭          |  설명                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      | 일정 기간 동안 전송되거나 수신된 바이트 수입니다. 양방향 기준으로 바이트(또는 그 단위)로 측정됩니다.                           |
| **Throughput**  | 일정 기간 동안 전송되거나 수신된 바이트의 속도입니다. 양방향 기준으로 초당 바이트로 측정됩니다.                                                  |

#### TCP {#tcp}

TCP는 패킷의 순차적 전송을 보장하는 연결 기반 프로토콜입니다. 

이용할 수 있는 TCP 메트릭에는 다음이 있습니다. 

| 메트릭 | 설명 |
|---|---|
| **Closed Connections** | 종료 상태에 있는 TCP 연결 수입니다. 클라이언트 기준으로 초당 연결 수로 측정됩니다. |
| **Established Connections** | 연결이 설정된 상태의 TCP 연결 수입니다. 클라이언트 기준으로 초당 연결 수로 측정됩니다. |
| **Host Unreachable** | 대상 호스트가 오프라인 상태이거나 라우터 또는 방화벽에 의해 트래픽이 차단되었음을 나타냅니다. **Agent 7.68 이상**에서 사용할 수 있습니다. |
| **Network Unreachable** | Agent가 실행되는 호스트 시스템의 로컬 네트워킹 문제를 나타냅니다. **Agent 7.68 이상**에서 사용할 수 있습니다. |
| **Connection Cancels** | `Go` 및 `Node.js`와 같은 언어 런타임에서 발생하는 TCP 연결 취소 및 사용자 공간 연결 시간 초과를 추적합니다. **Agent 7.70 이상**에서 사용할 수 있습니다. |
| **TCP Jitter** | TCP의 평활화된 왕복 시간 분산으로 측정됩니다. |
| **TCP Latency** | TCP의 평활화된 왕복 시간, 즉 TCP 프레임이 전송되고 확인 응답을 받을 때까지 걸리는 시간으로 측정됩니다. |
| **TCP Refusals**  | 서버에서 거부한 TCP 연결 수입니다. 일반적으로 연결을 수신하지 않는 IP/포트에 연결을 시도했거나 방화벽/보안 구성이 잘못되었음을 나타냅니다. |
| **TCP Resets**  | 서버에서 재설정된 TCP 연결 수입니다.  |
| **TCP Retransmits** | TCP Retransmits는 실패가 감지되었을 때 이를 재전송하여 전송을 보장하는 것을 나타냅니다. 클라이언트 기준 재전송 횟수로 측정됩니다. |
| **TCP Timeouts**  | 운영 체제 관점에서 시간 초과된 TCP 연결 수입니다. 이는 일반적인 연결성 및 지연 시간 문제를 나타낼 수 있습니다.  |

모든 메트릭은 가능하면 연결의 `client` 측에서 측정되며, 그렇지 않은 경우에는 서버 측에서 측정됩니다.

## 클라우드 서비스 자동 감지 {#cloud-service-autodetection}

S3 또는 Kinesis와 같은 관리형 클라우드 서비스를 사용하는 경우 내부 애플리케이션에서 해당 서비스로 전달되는 트래픽의 성능을 모니터링할 수 있습니다. 특정 AWS, Google Cloud 또는 Azure 종속성으로 범위를 지정하여 지연 시간을 정확히 파악하고 데이터베이스 성능을 평가하며 네트워크를 더욱 완전하게 시각화할 수 있습니다.

{{< img src="network_performance_monitoring/network_analytics/cloud_service.png" alt="`server_service:aws.s3` 범위로 지정된 네트워크 연결의 사이드 패널" >}}

예를 들어 다음을 할 수 있습니다.

- [Network Map][2]에서 내부 Kubernetes 클러스터에서 `server_service:aws.s3`로의 데이터 흐름을 시각화합니다.
- [Network Page](#table)로 이동하여 해당 서비스에 가장 많은 연결을 설정하는 포드를 식별합니다.
- 또한 *Integration Metrics* 탭에서 특정 종속성의 사이드 패널에 트래픽 성능과 직접 연관된 S3 성능 메트릭을 분석하여 요청이 성공했는지 확인할 수 있습니다.

CNM은 자동으로 다음을 매핑합니다.

- S3(`s3_bucket` 기준으로 세분화 가능), RDS(`rds_instance_type` 기준으로 세분화 가능), Kinesis, ELB, ElastiCache 및 기타 [AWS 서비스][3]에 대한 네트워크 호출.
- AppEngine, Google DNS, Gmail 및 기타 [Google Cloud 서비스][4]에 대한 API 호출.

Agent를 설치할 수 없는 다른 엔드포인트(예: 공용 API)를 모니터링하려면 대상을 [`domain` 태그](#domain-resolution)를 기준으로 그룹화합니다. 또는 아래의 클라우드 서비스 확인 섹션을 참조하세요.

### 클라우드 서비스 향상된 확인 {#cloud-service-enhanced-resolution}

AWS 또는 Azure에 대해 [향상된 확인][9]을 구성하면 CNM은 이러한 클라우드 공급자에서 수집한 리소스를 사용하여 네트워크 트래픽을 필터링하고 그룹화합니다. 사용 가능한 태그는 클라우드 공급자 및 리소스에 따라 다릅니다. Datadog은 아래 나열된 태그를 사용자 정의 태그와 함께 자동으로 적용합니다.

#### Amazon Web Services {#amazon-web-services}

{{< tabs >}}
{{% tab "로드 밸런서" %}}
- name
- loadbalancer
- load_balancer_arn
- dns_name(형식: loadbalancer/dns:)
- region
- account_id
- scheme
- AWS Loadbalancer에 적용된 사용자 지정(사용자 정의) 태그
{{% /tab %}}

{{% tab "NAT 게이트웨이" %}}
- gateway_id
- gateway_type
- aws_nat_gateway_id
- aws_nat_gateway_public_ip
- aws_account
- availability-zone
- region
- AWS NAT 게이트웨이에 적용된 사용자 지정(사용자 정의) 태그
{{% /tab %}}

{{% tab "VPC Internet Gateway" %}}
- gateway_id
- gateway_type
- aws_internet_gateway_id
- aws_account
- region
- VPC 인터넷 게이트웨이에 적용된 사용자 지정(사용자 정의) 태그
{{% /tab %}}

{{% tab "VPC Endpoint" %}}
- gateway_id
- gateway_type
- aws_vpc_endpoint_id
- VPC 인터넷 엔드포인트에 적용된 사용자 지정(사용자 정의) 태그
{{% /tab %}}

{{< /tabs >}}

#### Azure {#azure}

{{< tabs >}}
{{% tab "로드 밸런서 및 애플리케이션 게이트웨이" %}}
- name
- loadbalancer
- cloud_provider
- region
- type
- resource_group
- tenant_name
- subscription_name
- subscription_id
- sku_name
- Azure 로드 밸런서 및 애플리케이션 게이트웨이에 적용된 사용자 지정(사용자 정의) 태그
{{% /tab %}}
{{< /tabs >}}

## 도메인 확인 {#domain-resolution}

Agent 7.17 이상부터 Agent는 외부 및 내부 트래픽의 IP를 사람이 읽을 수 있는 도메인 이름으로 확인합니다. 도메인을 사용하면 S3 버킷, Application Load Balancer, API와 같이 Datadog Agent를 설치할 수 없는 클라우드 공급자 엔드포인트를 모니터링할 수 있습니다. C&C 서버의 DGA 도메인과 같이 식별하기 어려운 도메인 이름은 네트워크 보안 위협을 나타낼 수 있습니다. `domain` **는 Datadog에서 태그로 인코딩되므로** 검색 창 쿼리 및 패싯 패널에서 이를 사용하여 트래픽을 집계하고 필터링할 수 있습니다.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_2.png" alt="도메인 집계" >}}

**참고**: DNS 확인은 시스템 프로브가 루트 네트워크 네임스페이스에서 실행되는 호스트에서 지원됩니다. 이는 일반적으로 호스트 네트워크를 사용하지 않고 컨테이너에서 system-probe를 실행할 때 발생합니다.

## NAT(Network Address Translation) {#network-address-translation-nat}

NAT는 Kubernetes 및 기타 시스템에서 컨테이너 간 트래픽을 라우팅하는 데 사용하는 도구입니다. 특정 종속성(예: 서비스 간 통신)을 조사할 때 pre-NAT IP의 존재 여부를 통해 자체적으로 라우팅을 수행하는 Kubernetes 네이티브 서비스와 외부 클라이언트에 의존하여 라우팅하는 서비스를 구분할 수 있습니다. 이 기능에는 NAT Gateway 확인은 포함되지 않습니다.

pre-NAT IP와 post-NAT IP를 보려면 표 설정에서 **Show pre-NAT IP** 토글을 사용합니다. 이 설정을 끄면 **Client IP** 및 **Server IP** 열에는 기본적으로 post-NAT IP가 표시됩니다. 하나의 post-NAT IP에 여러 개의 pre-NAT IP가 있는 경우 가장 많이 사용되는 상위 5개의 pre-NAT IP가 표시됩니다. `pre_nat.ip`은 제품의 다른 태그와 동일한 태그이므로 이를 사용하여 트래픽을 집계하고 필터링할 수 있습니다.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="pre-NAT IP" >}}

## Network ID {#network-id}

CNM 사용자는 IP 주소 공간이 서로 겹치는 네트워크를 구성할 수 있습니다. 예를 들어 주소 범위가 서로 겹치고 로드 밸런서나 클라우드 게이트웨이를 통해서만 통신하는 여러 VPC(가상 프라이빗 클라우드)에 애플리케이션을 배포할 수 있습니다.

트래픽 대상의 정확한 분류를 위해 CNM은 태그로 표현되는 Network ID 개념을 사용합니다. Network ID는 서로 통신할 수 있는 IP 주소 집합을 나타내는 영숫자 식별자입니다. 서로 다른 Network ID를 가진 여러 호스트에 매핑되는 IP 주소가 감지되면 이 식별자를 사용하여 네트워크 트래픽이 어느 특정 호스트로 향하거나 어느 호스트에서 오는지를 판별합니다.

AWS와 Google Cloud에서는 Network ID가 VPC ID로 자동 설정됩니다. 다른 환경에서는 아래와 같이 `datadog.yaml`에서 수동으로 설정하거나 `DD_NETWORK_ID`를 프로세스 및 코어 Agent 컨테이너에 추가하여 설정할 수 있습니다.

```yaml
network:
   Id: <your-network-id>
```


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/search_syntax/
[2]: /ko/network_monitoring/cloud_network_monitoring/network_map/
[3]: /ko/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /ko/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[5]: /ko/logs/explorer/saved_views/
[6]: /ko/security/workload_protection/
[7]: /ko/security/cloud_security_management/misconfigurations/
[8]: /ko/security/detection_rules/
[9]: /ko/network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution
[10]: /ko/network_monitoring/dns/#recommended-queries
[11]: /ko/network_monitoring/network_path
[12]: /ko/getting_started/tagging/unified_service_tagging/
[15]: /ko/network_monitoring/cloud_network_monitoring/tags_reference/#neutral-tags
[16]: /ko/network_monitoring/cloud_network_monitoring/tags_reference/
[17]: /ko/tracing/