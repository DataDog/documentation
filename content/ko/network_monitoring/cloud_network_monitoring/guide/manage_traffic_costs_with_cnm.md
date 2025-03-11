---
aliases:
- /ko/network_performance_monitoring/guide/manage_traffic_costs_with_npm/
- /ko/network_monitoring/performance/guide/manage_traffic_costs_with_npm/
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: 블로그
  text: Datadog CNM으로 클라우드 아키텍처와 앱 종속성 모니터링
title: CNM으로 클라우드 트래픽 비용 관리
---
특히 클라우드에서 트래픽 비용이 많이 발생합니다. 클라우드 제공업체는 가용 영역(AZ) 내, AZ 간, 특정 지역 간의 플로우 트래픽 또는 개방형 인터넷으로의 플로우 트래픽에 따라 요금을 달리 부과합니다. 지역 간 및 송신 트래픽은 가장 비용이 많이 들고 오류, 레이턴시, 보안 위협에 가장 취약합니다.

클라우드 네트워크 모니터링(CNM)을 사용하면 Datadog에서 서비스, 컨테이너, 가용 영역, 지역, 데이터센터 등을 포함한 태그 간의 종속성을 매핑하여 위에서 설명한 모든 트래픽 패턴을 추적할 수 있습니다. 종속성 및 종속성으로 인해 발생하는 트래픽 볼륨(결국 클라우드 공급자가 청구하는 비용)에 대한 이러한 인사이트는 트래픽 관련 비용을 모니터링 및 최적화하는 데 활용할 수 있습니다.

## Datadog 스토리

Datadog을 쿠버네티스(Kubernetes)로 마이그레이션할 때, 스테이트리스 서비스로 마이그레이션하는 것이 스테이트풀 서비스(예: Kafka)로 마이그레이션하는 것보다 예상대로 훨씬 빠르고 쉬웠으며, 스테이트리스 서비스가 최고였습니다. 그 결과 스테이트풀 서비스(모두 하나의 AZ에 존재)과 스테이트리스 서비스(다른 AZ에 분산됨) 간에 테라바이트 수준의 새로운 교차 AZ 트래픽이 발생하여 클라우드 요금이 예기치 않게 급격히 증가했습니다. Datadog은 자사의 NPM 제품을 사용하여 근본 원인인 비최적화 마이그레이션 전략과 비효율적인 고비용 네트워크 통신을 파악했습니다. 스테이트풀 서비스 샤딩(Sharding)으로 결국 클라우드 공급자 트래픽 비용을 크게 절감할 수 있었습니다.

## 트래픽 비용 관리 단계

1. 환경에서 유사한 문제를 찾으려면 먼저 보기의 범위를 지역 간 트래픽,
    가용 영역,
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/availability_zone.png" alt="가용성별 그룹 플로우">}}
    및 데이터센터로 좁힙니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/datacenter.png" alt="데이터센터별 그룹 플로우">}}
    트래픽 요금 증가는 거의 항상 해당 유형의 트래픽 중 하나의 증가와 관련이 있습니다. 대부분의 경우 비대칭성 검색 용어를 기준으로 트래픽을 그룹화할 수 있습니다. 즉, 트래픽의 출처를 하나의 태그로, 대상은 다른 태그로 설정하여 표시하고 싶을 수 있습니다. 이러한 종류의 비대칭성 쿼리를 사용하여 온프레미스 데이터센터와 클라우드 지역 간의 고비용 종속성을 식별할 수 있습니다, 
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/aws_account.png" alt="데이터센터와 클라우드 지역 간의 종속성 식별">}}
    클라우드 간도 마찬가지입니다. 특히 유용한 보기 중 하나는 트래픽의 출처를 서비스별로, 대상을 가용성 영역별로 그룹화하는 것입니다.

2. 여기에서는 다중 AZ에서 트래픽이 가장 많은 서비스 을 식별합니다. 검색 바 내부 필터를 사용하여 쿼리 의 범위를 좁힐 수 있습니다. 예를 들어, 한 가용 영역 내에서 시작하여 다른 가용 영역으로 트래픽을 전송하는 서비스만 표시할 수 있습니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/service_availability_zone.png" alt="AZ 간 통신하는 모든 서비스를 강조 표시">}}
    위의 쿼리는 `us-east4-a`에서 다른 곳으로 통신하는 모든 서비스를 강조 표시합니다. 테이블은 이미 볼륨별로 정렬되어 있기 때문에 처음 몇 행에는 가장 많은 교차 AZ 트래픽에 기여하는 서비스가 표시됩니다. 이러한 원인 중 하나인 인프라스트럭처 간 효과를 조사하려면 **소스**를 특정 서비스로 필터링하여 다른 모든 가용 영역에 대한 트래픽을 확인합니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/single_service.png" alt="단일 서비스 검색하기.">}}

3. 마찬가지로 팀 태그를 사용하여 지역 간 트래픽이 가장 많이 발생하는 엔지니어링 팀을 식별할 수 있습니다. 
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/team_region.png" alt="팀 태그 사용하기.">}}
또는 팀의 결과값을 구체적으로 모니터링합니다.
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/region_region.png" alt="지역 태그 사용하기.">}}

4. 외부 트래픽으로 인한 비용을 모니터링하려면 **IP 유형** 패싯을 사용하여 대상 엔드포인트 범위를 공용 IP로 좁힙니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/scope_destination_points.png" alt="유형 패싯 사용하기.">}}
    그런 다음 `domain`로 대상을 그룹화하여 외부 트래픽이 어디로 향하는지에 따라 외부 트래픽 볼륨을 세분화합니다. 퍼블릭 서버에 Datadog 에이전트를 설치할 수는 없지만 Datadog은 외부 및 클라우드 엔드포인트를 나타내는 IP를 사람이 읽을 수 있는 도메인 네임으로 확인할 수 있습니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/dns_resolution.png" alt="DNS별 그룹화.">}}
    위의 쿼리 예제는 하위 문자열 와일드카드 엔트리(예: `dns:*s3*`)를 사용하여 Amazon S3, 탄력적 로드 밸런서, API 및 외부 `.com` 도메인으로의 트래픽을 필터링합니다.  
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/wildcard.png" alt="와일드카드로 검색">}}

## 트래픽 비용 시각화

네트워크 맵을 사용하여 AZ 간 또는 AZ 내부 트래픽을 시각화하여 병목 현상을 빠르게 파악할 수 있습니다. Datadog에서 해당 보기는 EU와 미국의 가용 영역이 통신하지 않는지 확인하여 GDPR을 준수하고 고객 데이터를 보호하는 데 사용됩니다. 
AZ 간 트래픽:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/cross-az-traffic.png" alt="AZ 간 트래픽">}}
AZ 내부 서비스 투 서비스 트래픽:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/inter-az-service-to-service-traffic.png" alt="AZ 내부 서비스 투 서비스 트래픽">}}
가용성 영역을 나타내는, 맵의 노드 사이의 두꺼운 엣지는 노드 간에 많은 양의 트래픽이 발생하고 있음을 나타내며, 이는 비용 증가의 원인이 됩니다.

**트래픽 필터링** 버튼을 사용하여 기본 설정을 편집할 수 있습니다. 보다 대규모 환경에서는 Datadog은 슬라이더를 움직여서 가장 중요한 트래픽 소스만 포함하도록 범위를 좁혀 가장 볼륨이 큰 종속성만 포함할 것을 권장합니다.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/filter-traffic.png" alt="트래픽 범위 좁히기">}}

## 트래픽 비용 그래프화

Datadog은 대시보드와 노트북에서 시간에 따른 트래픽 볼륨 메트릭을 추적할 것을 권장합니다. 네트워크 페이지에서 생성한 것과 동일한 쿼리를 사용하여 두 엔드포인트 간의 트래픽을 그래프화할 수 있습니다. 그래프화하려면 **시계열 위젯**을 생성하고 드롭다운 메뉴에서 **네트워크 트래픽** 소스를 선택합니다.  

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/timeseries.png" alt="시계열 생성하기">}}

그런 다음 대시보드 및 노트북을 사용하여 해당 결과와 문제를 팀원들과 공유합니다.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/network-traffic.png" alt="네트워크 트래픽 확인하기">}}

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}