---
aliases:
- /ko/network_performance_monitoring/guide/manage_traffic_costs_with_npm/
title: NPM으로 클라우드 트래픽 비용 관리
---
트래픽은 특히 클라우드에서 비용이 많이 듭니다. 클라우드 제공업체는 가용 영역(AZ) 내, AZ 간, 특정 리전 간 또는 개방형 인터넷으로 이동하는 트래픽에 대해 각각 다른 가격을 책정합니다. 리전 간 및 송신 트래픽은 가장 비용이 많이 들 뿐만 아니라 오류, 지연 시간, 보안 위협에 가장 취약합니다.

네트워크 성능 모니터링(NPM)을 이용하면 서비스, 컨테이너, 가용 영역, 리전, 데이터센터 등 Datadog의 모든 태그 간에 종속성을 매핑하여 위에서 설명한 모든 트래픽 패턴을 추적할 수 있습니다. 종속성과 그로 인해 발생하는 트래픽 볼륨에 따라 클라우드 제공 업체가 비용을 청구하기 때문에 이러한 인사이트는 트래픽 관련 비용을 모니터링하고 최적화하는 데 사용할 수 있습니다.

## Datadog의 스토리

Datadog을 Kubernetes로 마이그레이션할 때, 일반적으로 스테이트풀(stateful) 서비스(예: Kafka)보다 스테이트리스 (stateless) 서비스를 마이그레이션하는 것이 (예상대로) 훨씬 빠르고 쉬웠기에 스테이트리스(stateless) 서비스를 먼저 진행했습니다. 그 결과, 스테이트풀(stateful) 서비스 (모두 하나의 AZ에 있음)와 스테이트리스(stateless) 서비스 (다른 AZ에 분산됨)간에 테라바이트의 새로운 교차 AZ 트래픽이 발생하여 클라우드 요금이 예상치 못하게 크게 증가했습니다. Datadog은 자체 NPM 제품을 사용하여 근본 원인인 차선책 마이그레이션 전략과 이로 인해 비효율적이고 비용이 많이 드는 네트워크 통신을 파악했습니다. Datadog은 스테이트풀(stateful) 서비스를 샤딩함으로써 궁극적으로 클라우드 제공업체의 트래픽 비용을 크게 절감할 수 있었습니다.

## 트래픽 비용 관리 단계

1. 사용자 환경에서 유사한 문제를 찾으려면 먼저 보기의 범위를 리전, 
   가용 영역,
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/availability_zone.png" alt="가용성에 따른 그룹 흐름">}}
   그리고 데이터센터 간의 트래픽으로 지정할 수 있습니다:
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/datacenter.png" alt="데이터센터별 그룹 흐름">}}
   트래픽 요금의 증가는 거의 항상 이러한 유형의 트래픽 증가와 관련이 있습니다. 이때 트래픽을 비대칭 검색어별로 그룹화할 수 있습니다. 즉, 한 태그의 관점에서 트래픽의 출처를 확인하고 다른 태그의 관점에서 대상을 확인하는 것입니다. 이와 같은 비대칭 쿼리를 이용해 온프레미스 데이터센터, 클라우드 리전, 

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/aws_account.png" alt="데이터센터와 클라우드 리전 간의 종속성 식별">}}
   클라우드 간 비용이 높은 종속성을 찾아낼 수 있습니다. 특히 트래픽 소스를 서비스별로 그룹화하고 대상을 가용 영역 별로 그룹화하면 도움이 됩니다.

2. 그런 다음 여러 AZ에 걸쳐 트래픽 볼륨이 가장 높은 서비스를 분리합니다. 검색 창에 있는 필터를 사용해 쿼리 범위를 좁힐 수 있습니다. 예를 들어, 한 가용 영역 내에서 시작되어 다른 가용 영역으로 트래픽을 보내는 서비스만 볼 수 있습니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/service_availability_zone.png" alt="AZ 간에 통신한 모든 서비스 강조 표시">}}
   위 쿼리는 `us-east4-a`에서 다른 곳과 통신하는 모든 서비스를 강조 표시합니다. 표가 이미 볼륨별로 정렬되어 있기 때문에 처음 몇 줄에는 가장 많은 교차 AZ 트래픽을 호출하는 가장 붐비는 서비스가 표시됩니다. 이러한 원인 중 하나인 교차 인프라스트럭처 효과를 조사하려면 **Source**에서 특정 서비스에 필터를 적용하고 다른 가용 영역에 대한 트래픽을 확인하는 것이 좋습니다.

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/single_service.png" alt="단일 서비스를 검색합니다.">}}

3. 이와 비슷한 방법으로 팀 태그를 사용할 수 있습니다. 예를 들어, 리전 간 트래픽을 가장 많이 생성한 엔지니어링 팀을 찾거나 
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/team_region.png" alt="팀 태그를 사용합니다.">}}
우리 팀의 결과물을 상세하게 모니터링할 수 있습니다.
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/region_region.png" alt="리전 태그를 사용합니다.">}}

4. 외부 트래픽에 대한 비용을 모니터링하려면 **IP Type** 패싯을 사용해 대상 엔드포인트를 공용 IP로 범위 조정하세요.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/scope_destination_points.png" alt="유형 패싯을 사용합니다.">}}
   그런 다음 대상을 `domain`별로 그룹화하여 대상에 따라 외부 트래픽 양을 나눕니다. 공용 서버에는 Datadog Agent를 설치할 수 없지만 Datadog은 외부 및 클라우드 엔드포인트를 나타내는 IP를 사람이 읽을 수 있는 도메인 이름으로 변환할 수 있습니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/dns_resolution.png" alt="DNS별로 그룹화합니다.">}}
   위의 예제 쿼리에서는 하위 문자열 와일드 카드 항목 (예: `dns:*s3*`)을 사용하여 AWS S3, 탄력적 로드 밸런서, API 및 외부 `.com` 도메인에 대한 트래픽을 필터링합니다.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/wildcard.png" alt="와일카드로 검색">}}

## 트래픽 비용 시각화

AZ를 가로지르는 트래픽 또는 AZ 내부의 트래픽은 Network Map에서 시각화하여 병목 현상을 신속하게 파악할 수 있습니다. Datadog는 이 보기를 사용하여 EU 및 미국 가용 영역이 통신하지 않는지 확인하고 GDPR 준수 및 고객의 데이터를 보호합니다. 
AZ를 가로지르는 트래픽:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/cross-az-traffic.png" alt="AZ를 가로지르는 트래픽">}}
AZ 내의 서비스 대 서비스 트래픽:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/inter-az-service-to-service-traffic.png" alt="AZ 내의 서비스 대 서비스 트래픽">}}
맵의 노드 사이의 굵은 선은 가용 영역을 나타내며 각 노드 간에 많은 양의 트래픽이 흐르고 있음을 나타냅니다. 이것은 비용으로 이어지는 트래픽의 양입니다.


**Filter traffic** 버튼을 사용해 기본 설정을 편집할 수 있습니다. 큰 규모의 환경인 경우 Datadog은 슬라이더를 이동하여 트래픽 양이 가장 많은 종속성만 포함하는 가장 눈에 띄는 트래픽 소스만 그룹화할 것을 권장합니다.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/filter-traffic.png" alt="트래픽 범위 지정">}}

## 트래픽 비용 그래프화

Datadog은 대시보드와 노트북에서 시간에 따른 트래픽 볼륨 메트릭을 추적할 것을 권장합니다. 네트워크 페이지에서 만드는 쿼리와 동일한 쿼리를 사용하여 두 엔드포인트 간의 트래픽을 그래프화할 수 있습니다. 이를 위해 **Timeseries Widget**을 생성하고 드롭다운 메뉴에서 **Network Traffic** 소스를 선택하세요.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/timeseries.png" alt="시계열 생성">}}

그런 다음 대시보드와 노트북을 사용해 모든 결과와 이슈를 팀원과 공유하세요.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/network-traffic.png" alt="네트워크 트래픽 보기">}}