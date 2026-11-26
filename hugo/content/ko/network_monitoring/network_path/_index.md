---
description: 네트워크 트래픽 경로 조사
further_reading:
- link: network_monitoring/network_path/glossary
  tag: 설명서
  text: Network Path 용어 및 개념
- link: /monitors/types/network_path/
  tag: 설명서
  text: Network Path Monitor
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: 블로그
  text: Datadog Network Path로 엔드투엔드 네트워크 가시성 확보
- link: https://www.datadoghq.com/blog/network-path/
  tag: 블로그
  text: Datadog Network Path로 전체 네트워크의 속도 저하 식별
is_beta: true
title: Network Path
---
## 개요 {#overview}

Network Path는 네트워크 트래픽이 출발지에서 목적지까지 이동하는 경로를 보여줍니다. 이를 통해 네트워크 관리자는 네트워크 문제의 원인이 내부 문제인지, 인터넷 서비스 제공업체(ISP) 문제인지, 또는 잘못된 라우팅과 같은 기타 문제인지 정확하게 파악할 수 있습니다. 각 행은 `source` 및 `destination` 패싯 패널에 표시된 대로 소스에서 목적지까지의 경로를 나타냅니다.

{{< img src="network_performance_monitoring/network_path/network_path_landing_page.png" alt="소스, 목적지, 태그, 프로토콜, 포트, 평균 도달 가능성 및 평균 RTT 열이 포함된 경로 목록을 보여주는 Network Path 탐색기" >}}

## 작동 방식 {#how-it-works}

Datadog은 호스트 수준에서 `traceroute` 수행을 통해 소스에서 목적지까지 각 홉에서의 패킷 이동 경로와 지연 시간을 보여줍니다. 각 호스트는 자체 `traceroute` 실행을 수행하며, 표시된 경로는 이 목록을 시각적으로 나타낸 것입니다. Network Path는 실행 중인 애플리케이션에 TCP 또는 UDP 패킷을 자동으로 보냅니다.

다음 다이어그램은 소스(호스트)에서 목적지까지의 일반적인 네트워크 경로 흐름을 보여줍니다.

{{< img src="network_performance_monitoring/network_path/network_path_diagram.png" alt="Network Path 작동 방식 다이어그램" >}}

## 설정 방법 {#setup-methods}

Network Path 테스트는 두 가지 방법으로 구성할 수 있습니다.

- **UI에서** (Preview): [Network Path][1] UI에서 예약된 테스트와 동적 테스트 필터를 생성하고 업데이트하세요. 대상으로 지정하는 각 Agent에는 먼저 [일회성 설정][12]이 필요합니다. Datadog은 Remote Configuration을 통해 Agent에 테스트를 전달합니다.
- **Agent 구성 파일에서**: 다음 수집 방법 중 하나 이상을 사용하세요.
  - **[Scheduled tests][6]**: Agent 구성 파일에 소스-목적지 쌍을 정의하여 특정 네트워크 경로를 모니터링하세요. 중요 API나 파트너 서비스와 같이 알려진 엔드포인트 세트를 지속적으로 모니터링하려면 예약된 테스트를 사용하세요.
  - **[동적 테스트][7]**: [Cloud Network Monitoring][8]에서 관찰된 실제 네트워크 트래픽을 기반으로 네트워크 경로를 자동으로 검색하고 모니터링합니다. 모든 대상을 수동으로 나열하지 않고도 넓은 가시성을 확보하려면 동적 테스트를 사용하세요.
  - **[NetFlow용 동적 테스트][10]**: Agent 호스트에서 [NetFlow Monitoring][11]에서 관찰된 대상 IP까지 Network Path 테스트를 자동으로 실행합니다. 개별 대상을 수동으로 구성하지 않고 NetFlow 트래픽에 홉별 경로 가시성을 추가하려면 Dynamic Tests for NetFlow를 사용하세요.

동일한 Agent에서 두 가지 방법을 모두 사용할 수 있습니다.

대신 Synthetic Monitoring에서 Network Path 테스트를 생성하려면 [Synthetic Monitoring의 Network Path 테스트][9]을 참조하세요.

## 다음 단계 {#next-steps}

다음 보기 및 도구를 사용하여 Network Path를 설정하고 네트워크 성능 및 연결 문제를 조사하세요.

- [Setup][4]: 환경에서 Network Path를 설정하고 구성하세요.
- [List View][2]: 모니터링되는 모든 네트워크 경로에 대한 포괄적인 개요를 제공하여 연결 문제를 감지하고, 성능 메트릭을 분석하며, 주의가 필요한 경로를 필터링할 수 있습니다.
- [Path View][3]: 소스와 목적지 간의 네트워크 경로를 시각적으로 표시하여 자체 인프라 내에서 문제가 발생하는지 또는 외부 공급자에게서 문제가 발생하는지 식별할 수 있습니다.
- [Traceroute 변형][5]: `traceroute` 및 `tracert` 명령을 사용하여 네트워크 문제를 진단하고 해결하는 방법을 알아보세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /ko/network_monitoring/network_path/list_view
[3]: /ko/network_monitoring/network_path/path_view
[4]: /ko/network_monitoring/network_path/setup
[5]: /ko/network_monitoring/network_path/guide/traceroute_variants
[6]: /ko/network_monitoring/network_path/setup/#scheduled-tests
[7]: /ko/network_monitoring/network_path/setup/#dynamic-tests
[8]: /ko/network_monitoring/cloud_network_monitoring/
[9]: /ko/synthetics/network_path_tests/
[10]: /ko/network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
[11]: /ko/network_monitoring/netflow/
[12]: /ko/network_monitoring/network_path/setup/#create-tests-in-the-ui