---
aliases:
- /ko/network_monitoring/performance/overview_page
description: Datadog UI 클라우드 네트워크 모니터링 개요 페이지.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: 블로그
  text: 클라우드 네트워크 모니터링
title: 개요 페이지
---

## 개요

[CNM 개요 페이지][3]는 비용이 많이 드는 네트워크 트래픽부터 DNS 서비스 상태, 서비스 상위 토커에 이르기까지 네트워크에 대한 고급 수준 개요를 제공해 드립니다. 개요 페이지에서 태그를 활용해 환경 또는 팀별로 네트워크 트래픽을 필터링하고, 네트워크 데이터의 타임 프레임을 조정하고, 가장 비용이 많이 드는 트래픽을 조사할 수 있습니다.

{{< img src="/network_performance_monitoring/overview_page/cnm_overview_page_2.png" alt="Datadog 네트워크 개요 페이지" style="width:110%;">}}

## 외부 네트워크 트래픽

**외부 네트워크 트래픽** 섹션으로 비용이 많이 드는 네트워크 트래픽에 대한 개요를 확인하세요. 네트워크에서 나가는 송신 트래픽은 일반적인 비용 발생 원인이므로, 어떤 외부 엔드포인트에 가장 많은 트래픽이 도달하는지 파악하면 트래픽 볼륨이 예상 범위 내에서 유지되도록 하는 데 도움이 됩니다. 예를 들어, **상위 AWS 게이트웨이 사용자**는 AWS 인터넷 게이트웨이 또는 AWS NAT 게이트웨이와 통신하는 상위 엔드포인트를 보여줍니다. **AWS PrivateLink 적격 트래픽**은 AWS PrivateLink를 활용하여 전체 트래픽 비용을 절감할 수 있는 트래픽을 표시합니다.  

해당 영역을 더 자세히 살펴보려면 개요 페이지의 각 섹션 오른쪽 하단에 있는 **애널리틱스에서 보기** 버튼을 클릭합니다. 계속 살펴볼 수 있도록 쿼리 주소가 미리 입력된 애널리틱스 페이지가 열립니다.

{{< img src="/network_performance_monitoring/overview_page/external_network_traffic.png" alt="애널리틱스에서 보기 옵션이 강조 표시된 개요 페이지의 외부 네트워크 트래픽 섹션" style="width:90%;">}}

## 애플리케이션 및 종속성 상위 토커

**애플리케이션 및 종속성 상위 토커**를 사용하면 네트워크에서 특정 엔드포인트를 선택하고, 엔드포인트의 상위 트래픽 소스 업스트림 및 다운스트림을 확인할 수 있습니다. 엔드포인트의 업스트림과 다운스트림 모두에서 가장 높은 트래픽 종속성을 확인하려면 **모든 종속성 보기**를 선택합니다. 선택한 타임 프레임 동안 그래프([시계열][1]) 보기와 [상위 목록][2] 보기 간에 전환할 수 있습니다.

{{< img src="/network_performance_monitoring/overview_page/application_dependency_top_talkers.png" alt="개요 페이지의 애플리케이션 및 종속성 상위 토커 섹션" style="width:90%;">}}

## DNS 서비스 상태

**DNS 서비스 상태** 섹션에서는 쿼리된 도메인별, 클라이언트별 또는 두 가지 모두의 상위 DNS 호출자에 대한 고수준 개요를 제공합니다. 가장 많이 쿼리된 도메인, DNS 쿼리를 생성하는 상위 클라이언트 또는 이 둘의 조합을 확인하고, 변경 아이콘으로 선택한 타임 프레임에 예기치 않은 변화가 있었는지 확인할 수 있습니다.

NXDOMAIN, 시간 초과, SERVFAIL과 같은 일반적인 DNS 오류에 대한 상위 호출자를 확인할 수도 있습니다. 특정 오류 유형을 유발하는 상위 클라이언트-투-DNS 쿼리 조합을 찾고, 선택한 타임 프레임 동안 해당 오류율이 어떻게 변했는지 확인할 수 있습니다. 이를 통해 특히 인시던트 트러블슈팅 중 조사가 필요할 수 있는 비정상적인 DNS 오류를 식별하도록 도와드립니다.

{{< img src="/network_performance_monitoring/overview_page/dns_health.png" alt="개요 페이지의 DNS 서비스 상태 섹션" style="width:90%;">}}

## 상위 트래픽 소스 식별

**상위 트래픽 소스 식별** 섹션에는 데이터를 태그하는 방식에 따라 가용 영역, 팀, 클라우드 공급자 또는 지역과 같은 다양한 소스의 트래픽이 표시됩니다. 예를 들어, AZ 간 트래픽은 일반적인 비용이 드므로 상위 가용 영역(AZ) 트래픽을 확인하면 클라우드 비용 절감에 대해 조사해 볼 수 있습니다. **애널리틱스에서 보기** 버튼을 클릭하여 조사를 계속 진행하고 AZ 간 트래픽의 대부분을 차지하는 서비스를 확인합니다. 본 섹션을 활용하여 팀 간, 클라우드 간 공급자 또는 지역 간 상위 트래픽에 대해 비슷한 탐색을 수행할 수 있습니다.

{{< img src="/network_performance_monitoring/overview_page/top_traffic_sources.png" alt="개요 페이지의 상위 트래픽 소스 식별 섹션" style="width:90%;">}}

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/dashboards/widgets/timeseries/
[2]: /ko/dashboards/widgets/top_list/
[3]: https://app.datadoghq.com/network/overview