---
description: CNM을 사용해 애플리케이션 가용성 감지
further_reading:
- link: https://www.datadoghq.com/blog/apm-cnm-application-debugging/
  tag: 블로그
  text: APM 및 클라우드 네트워크 모니터링으로 애플리케이션 문제 디버깅
- link: https://www.datadoghq.com/blog/cnm-best-practices/
  tag: 블로그
  text: Datadog 클라우드 네트워크 모니터링 시작 모범 사례
- link: https://www.datadoghq.com/blog/monitor-containers-with-cnm/
  tag: 블로그
  text: Datadog CNM으로 컨테이너화되고 서비스 메시 네트워크 통신 모니터링하는 방법
title: Network Insights를 사용해 애플리케이션 가용성 감지
---

## 개요

애플리케이션이 서로 의지하거나, 연결이 좋지 않거나, 서비스 호출이 느리면 애플리케이션 계층에 오류와 지연 시간이 발생할 수 있습니다. Datadog의 클라우드 네트워크 모니터링(CNM)은 지연 시간, 패킷 손실, 여러 애플리케이션 및 서비스 전반의 처리량과 같은 네트워크 메트릭을 캡처, 분석, 상관관계를 수립해 실행 가능한 인사이트를 제공하기 때문에 애플리케이션 및 네트워크 문제를 해결할 수 있습니다.

## 서비스 및 연결 검색

CNM은 엔터티 간 트래픽을 추적하고, 통신하는 리소스를 파악하며, 해당 리소스의 상태를 보고하도록 설계되었습니다.

엔터티 간 기본 트래픽 흐름을 조사하려면 다음 단계를 따르세요.

1. [Network Analytics 페이지][1]에서 **View clients as**와 **View server as** 드롭다운 필터를 설정해 `service` 태그로 그룹화하여 서비스 투 서비스 흐름을 조사할 수 있습니다.  여기에서 기본 트래픽 단위(소스 IP가 포트를 통해 포트의 대상 IP와 통신)를 확인할 수 있습니다. 

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_service_service.png" alt="CNM 분석 페이지, 서비스 투 서비스로 그룹화되고 클라이언트와 서버 IP가 강조 표시됨">}}

   각 행은 5분 상당의 연결을 집계합니다. 사용자의 네트워크 숙련도에 따라 특정 주소나 호스트 등 일부 IP를 알아볼 수 있으나, 더 복잡하고 대량의 네트워크에서는 이것이 힘들 수 있습니다. 가장 관련 있는 집계 수준은 이러한 IP와 연결된 각 호스트 또는 컨테이너를 Datadog의 태그(예: `service`, `availability zone`, `pod` 등)와 연결하는 것입니다. 다음 예를 참고하세요.

2. 필터를 사용해 검색 결과의 범위를 좁힐 수 있습니다. 예를 들어, 내 `orders-sqlserver*` 포드 전체의 네트워크 트래픽을 호스트와 가용 영역별로 보려면 `client_pod_name:orders-sqlserver*` 필터를 사용하세요.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_host_az.png" alt="CNM 분석 페이지, 특정 클라이언트 포드 이름으로 호스트 및 가용 영역으로 그룹화됨">}}

이 첫 단계에서는 가장 복잡한 네트워크를 모니터링할 수 있고, VM, 컨테이너, 서비스, 클라우드 리전, 데이터 센터 등의 환경 내 엔드포인트 간 연결에 관한 인사이트를 얻을 수 있습니다.

### 서비스 투 서비스 종속성 추적

CNM은 서비스 간 종속성을 추적하는데, 이는 시스템 성능에 매우 중요합니다. 중요한 연결과 트래픽 양을 확인해 핵심 종속성이 모두 정상적으로 작동하는지 확인합니다.

예를 들어, 서비스 지연 시간을 야기할 수 있는 원인 중 하나가 엔드포인트에 트래픽이 과다하게 전송되어 수신 요청을 효율적으로 처리하는 능력에 문제가 생기는 것입니다.

서비스 지연 시간이 생기는 문제의 원인을 분석하려면 다음 단계를 따르세요.

1. [Network Analytics][1] 페이지에서 `service`로 트래픽을 집계하고 경고나 서비스 지연 시간이 발생할 수 있는 클라우드 리전을 필터링합니다. 그러면 해당 리전 내 서비스 투 서비스 종속성이 모두 표시됩니다.

2. 재전송이나 지연 시간을 기반으로 종속성 테이블을 정렬해 성능 저하가 가장 심각한 연결을 파악합니다. 예를 들어, TCP 수립 연결 수가 비정상적으로 많고 재전송과 지연 시간이 급상승하는 경우, 소스의 요청이 너무 많아 대상의 인프라스트럭처에 과부하가 발생했다는 신호일 수 있습니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_service_region_retransmits.png" alt="CNM 분석 페이지, 특정 클라우드 리전의 서비스와 리전으로 그룹화됨">}}

3. 이 페이지에서 트래픽 경로 하나를 클릭해 측편 패널을 엽니다. 측면 패널에는 상세 텔레메트리가 표시되어 네트워크 종속성 디버깅에 활용할 수 있습니다.

4. 측면 패널 보기에서 **Flows** 탭을 확인해 통신 프로토콜이 TCP인지, UDP인지 확인하고, RTT, Jitter, 송수신 패킷과 같은 메트릭을 검토하세요. 재전송 수가 높은 문제를 조사하고 있을 경우에는 이 정보를 원인 파악에 활용할 수 있습니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_sidepanel_flows.png" alt="트래픽 흐름의 사이드 패널, Flows 탭에서 강조 표시됨">}}

## 네트워크 트래픽에 관한 인사이트

Datadog CNM은 관련 분산된 트레이스, 로그, 인프라스트럭처 데이터를 단일 보기에 통합해 애플리케이션에서 트레이스 문제가 발생한 원본 요청을 추적할 수 있습니다.

아래 예시에서 Network Analytics 탭 아래 **Traces** 탭에서 소스와 대상 엔드포인트간 요청의 분산된 트레이스를 볼 수 있습니다. 이를 통해 애플리케이션 수준의 오류가 발생하는 지점을 파악할 수 있습니다.

문제가 애플리케이션 문제인지, 혹은 네트워크 문제인지를 파악하려면 다음 단계를 따르세요.

1. [**Infrastructure** > **Cloud Network** > **Analytics**][1]로 이동합니다.  
2. **Summary** 그래프에서 볼륨이 크고 RTT 시간이 많은 통신을 선택합니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_isolate_series.png" alt="CNM 분석 페이지, RTT 시간이 높은 경로 클릭">}}

3. **Isolate this series**를 클릭합니다. 그러면 이 통신과 관련된 네트워크 트래픽만 표시하는 페이지가 열립니다.
4. 이 페이지에서 네트워크 통신 경로를 클릭하고 **Flows** 탭을 클릭해 RTT 시간을 관찰합니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_sidepanel_rtt.png" alt="CNM 측면 패널, RTT 시간 열 강조 표시">}}

   이 페이지에서 CNM은 네트워크 메트릭 왕복 시간(RTT)과 애플리케이션 요청 지연 시간의 상관관계를 수립하여 문제가 네트워크와 관련한 것인지, 혹은 애플리케이션과 관련한 것인지 파악하는 데 도움을 줍니다. 이 예시에서는 RTT 시간이 약간 오르나 시간이 지나면서 내려가는 것을 확인할 수 있습니다. 이와 관련해 추가적인 조사가 필요합니다.

5. 같은 페이지에서 **Traces** 탭을 클릭해 **Duration** 열을 조사합니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_traces_duration.png" alt="CNM 측면 패널, Trace 탭과 지속 시간 열이 강조 표시됨">}}

   네트워크 지연 시간(RTT)가 높지만 애플리케이션 요청 지연 시간(Duration)은 정상입니다. 따라서 이 경우에는 네트워크와 관련된 문제일 가능성이 높기 때문에 앱 코드를 조사할 필요가 없습니다.

   반대로, *네트워크 지연 시간은 안정적인데 애플리케이션 지연 시간(Duration)이 높을 경우,* 앱과 관련한 문제일 가능성이 높기 때문에 **Traces** 탭에서 서비스 경로 하나를 클릭해 코드 수준 트레이스를 살펴볼 수 있습니다. 이를 통해 근본 원인을 파악하고 이 서비스와 관련한 APM 플레임 그래프를 확인할 수 있습니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_apm_traces.png" alt="APM 플레임 그래프 스크린샷, CNM 측면 패널 트레이스 탭에서 서비스를 클릭한 후 화면">}}

### 네트워크 맵

Datadog의 [Network Map][2]은 네트워크 토폴로지를 시각적으로 표시하여 파티션, 종속성, 병목 현상을 파악할 수 있도록 도와줍니다. 또 네트워크 데이터를 방향 맵을 통합하여 문제가 되는 영역을 격리할 수 있습니다. 또 환경 내 태깅된 개체 간 네트워크 트래픽을 가시화합니다(`services`에서 `pods`에서 `cloud regions`로).

대량 컨테이너화된 환경의 경우, Datadog의 Network Map은 방향을 나타내는 화살표 또는 엣지를 사용해 컨테이너, 포드. 배포, 심지어 컨테이너 변경 사항 간의 실시간 트래픽 흐름을 시각화하여 트러블슈팅을 더욱 간편하게 할 수 있습니다. 이를 통해 비효율적인 부분과 구성이 잘못된 부분을 파악할 수 있습니다. 예를 들어, 같은 클러스터 내의 Kubernetes 포드가  포드간 직접 통신하는 것이 아니라 수신 컨트롤러를 통해 통신하는 것을 맵을 통해 파악할 수 있고, 이와 같은 방법으로 지연 시간이 발생하는 잘못된 구성을 파악할 수 있습니다.

Kubernetes 포드와 서비스에 근본적인 통신 문제가 있는지 파악하려면 다음 단계를 따르세요.

1. [Network Map][2]에서 **View** 드롭다운을 `pod_name`으로 설정하고, **By** 드롭다운을 "Client Availability Zone"으로 설정하며, **Metric** 드롭다운을 "Volume Sent"로 설정합니다(엣지가 표현해야 하는 [메트릭][6]임).

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_network_map.png" alt="클러스터링 예시를 나타내는 CNM Network Map 페이지">}}

2. 노드 위에 마우스 커서를 올려 엣지(혹은 방향을 나타내는 화살표)를 관찰해 클러스터와 가용 영역 간의 트래픽 흐름을 표현합니다. 이 예시에서는 모든 포드 간의 엣지가 있음을 알 수 있습니다. 엣지가 없으면 구성이 잘못되었을 수 있습니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_network_map_node.png" alt="클러스터링 예시를 나타내는 CNM Network Map 페이지, 특정 노드가 강조 표시됨">}}

   엣지 두께는 드롭다운 메뉴에서 선택한 메트릭과 연관되어 있습니다. 이 예시에서는 엣지가 두꺼우면 `volume sent` 메트릭과 연관이 있습니다. (선택 사항) 점으로 표현된 엣지를 클릭해 [Network Analytics][1] 페이지로 바로 이동하여 네트워크 연결을 더 깊이 조사할 수도 있습니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/cnm_network_map_thicker_edge.png" alt="클러스터링 예시를 나타내는 CNM Network Map 페이지, 두께가 있는 엣지가 강조 표시됨">}}

### 서비스 메시

[Istio][4]와 같은 서비스 메시는 마이크로서비스 통신을 관리하는 것을 도와주나, 추상화 레이어를 도입해 모니터링은 복잡해질 수 있습니다. Datadog CNM은 Istio 관리형 네트워크 전반의 트래픽 흐름을 가시화하여 Istio 환경 전체를 한눈에 볼 수 있도록 함으로써 복잡한 모니터링을 간편하게 만듭니다. Datadog는 메시 전반의 대역폭, 요청 성능, 로그 제어 플레인 상태, 트레이스 애플리케이션 요청과 같은 핵심 메트릭을 모니터링합니다.

또 Datadog는 [Envoy][5] 모니터링을 지원해 Istio 데이터와 Envoy 프록시 메시의 상관관계를 수립합니다. 트래픽이 Envoy 사이드카를 통해 라우팅되기 때문에 Datadog에서 컨테이너로 태그합니다. 따라서 사용자는 포드 간의 지연 시간 문제를 파악 및 진단하고, 문제가 서비스 메시와 관련이 있는지 확인할 수 있습니다.

   {{< img src="network_performance_monitoring/guide/detecting_network_insights/service_mesh_edit_2.png" alt="서비스 메시 예시를 보여주는 CNM Network Map 페이지">}}


## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://docs.datadoghq.com/ko/network_monitoring/performance/network_map/#map-clusters
[4]: https://istio.io/
[5]: https://istio.io/latest/docs/ops/deployment/architecture/#envoy
[6]: /ko/network_monitoring/cloud_network_monitoring/network_map/#usage