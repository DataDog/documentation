---
aliases:
- /ko/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: 설명서
  text: Network Device Monitoring을 통해 프로필 사용
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: 블로그
  text: Datadog로 NetFlow 트래픽 데이터 모니터링
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩을 사용하여 네트워크 성능 문제 모니터링 및 진단
title: NetFlow Monitoring
---
## 개요 {#overview}

Network Device Monitoring의 NetFlow 뷰는 흐름 데이터를 내보내는 기기(예: 라우터, 방화벽 또는 스위치)에서 수집된 네트워크 트래픽 흐름에 대한 가시성을 제공합니다. 트래픽 양을 분석하고, 주요 통신자를 식별하며, 데이터가 네트워크를 통해 어떻게 이동하는지 이해할 수 있습니다.

NetFlow 뷰는 기기 및 인터페이스별로 집계된 트래픽 메트릭을 표시합니다. 이를 사용하여 가장 많은 대역폭을 소비하거나, 가장 많은 패킷을 생성하거나, 트래픽 급증에 기여하는 기기 또는 인터페이스를 식별할 수 있습니다.

{{< img src="network_device_monitoring/netflow/netflow.png" alt="트래픽 양, 기기 상태, 흐름 등을 위한 접을 수 있는 범례가 포함된 NetFlow Monitoring 페이지입니다." style="width:100%;" >}}

## Side Navigation {#side-navigation}

왼쪽 탐색을 사용하여 추가 NetFlow 뷰를 탐색하세요.

- **트래픽 양**: 기기 및 인터페이스별 전체 흐름 메트릭입니다.
- **기기 상태**: 모니터링된 기기의 상태 및 활용도입니다.
- **흐름**: 개별 흐름 레코드의 세부 정보입니다.
- **대화**: 집계된 출발지-목적지 쌍입니다.
- **자율 시스템**: 자율 시스템 번호(ASN)별로 그룹화된 흐름 데이터입니다.
- **지리적 IP**: 지리적 출처/목적지별로 그룹화된 흐름 데이터입니다.
- **출발지 포트 / 목적지 포트 / 프로토콜 / 플래그**: 패킷 메타데이터에 따른 트래픽 분류입니다.

## 설치 {#installation}

Network Device Monitoring과 NetFlow Monitoring을 사용하려면 [Agent][1] 버전 7.45 이상을 사용하고 있는지 확인하세요.

**참고:** [Network Device Monitoring을 통한 메트릭 수집][2]을 구성하는 것은 NetFlow 데이터 전송을 위한 필수 요건은 아니지만 강력히 권장됩니다. 이 추가 데이터는 기기 이름, 모델, 벤더, 인바운드 및 아웃바운드 인터페이스 이름 등의 정보를 사용하여 흐름 레코드를 보강하는 데 활용될 수 있습니다.

## 구성 {#configuration}

NetFlow, jFlow, sFlow 또는 IPFIX 트래픽을 Agent NetFlow 서버로 전송하도록 기기를 구성하려면, 해당 기기가 Datadog Agent가 설치된 IP 주소로 트래픽을 전송하도록 설정되어 있어야 하며, 특히 `flow_type`와 `port`를 사용하세요.

1. NetFlow를 활성화하려면 [`datadog.yaml`][3] Agent 설정 파일을 편집합니다.

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices need to be configured to the same port number
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
    ## Set to true to enable reverse DNS enrichment of private source and destination IP addresses in NetFlow records
    reverse_dns_enrichment_enabled: false
```

2. 변경 사항을 저장한 후 [Agent를 재시작][4]합니다.

   **참고**: [방화벽 규칙][9]이 구성된 포트에서 수신 UDP 트래픽을 허용하는지 확인하세요.

## 집계 {#aggregation}

Datadog Agent는 NetFlow로 수신된 데이터를 자동으로 집계하여 대부분의 정보를 유지하면서 플랫폼으로 전송되는 레코드 수를 제한합니다. 기본적으로 `source`, `destination address`, `port`, `protocol`와 같은 동일한 식별자를 가진 흐름 레코딩은 5분 간격으로 집계됩니다. 또한, Datadog Agent는 임시 포트를 감지하고 이를 제거할 수 있습니다. 결과적으로 `port:*`와 함께 흐름이 표시될 수 있습니다.

## 보강 {#enrichment}

귀하의 NetFlow 데이터는 Datadog 백엔드에 의해 처리되며, 귀하의 기기와 인터페이스에서 사용할 수 있는 메타데이터로 보강됩니다. 보강은 NetFlow 내보내기 IP와 인터페이스 인덱스를 기반으로 합니다. 재사용된 개인 IP 간의 충돌 가능성을 해소하기 위해, 각 Agent 구성 파일에 대해 다른 `namespace`을 구성할 수 있습니다(설정 `network_devices.namespace` 포함).

NetFlow 엑스포터 IP가 기기 IP 중 하나이지만 SNMP 통합에 구성된 IP가 아닌 경우 Datadog은 엑스포터 IP가 속한 기기를 찾고 일치 항목이 고유한 한 이를 사용하여 NetFlow 데이터를 강화합니다.

### 클라우드 공급자 IP 보강 {#cloud-provider-ip-enrichment}

Datadog은 IPv4 주소용 퍼블릭 클라우드 공급자 서비스 및 리전으로 IP를 강화하므로 특정 서비스 및 리전의 흐름 레코드를 필터링할 수 있습니다.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="클라우드 공급자 이름, 리전 및 서비스를 표시하는 NetFlow 필터 메뉴" width="100%" >}}

### 포트 보강 {#port-enrichment}

Datadog은 IANA(인터넷 할당 번호 관리국) 데이터를 사용하여 NetFlow의 포트를 보강하여 잘 알려진 포트 매핑(예: Postgres의 5432 및 HTTPS의 443)을 해결합니다. 

### 커스텀 포트 보강 {#custom-port-enrichment}

또한, 특정 애플리케이션에 포트와 프로토콜을 매핑할 수 있도록, 맞춤 보강을 추가할 수 있습니다(예: 특정 포트에서 실행되는 맞춤 서비스의 경우). 이로 인해 네트워크 엔지니어와 그 팀이 인간이 읽을 수 있는 이름으로 NetFlow 데이터를 해석하고 쿼리하는 것이 더 쉬워집니다.

NetFlow의 **Configuration** 탭에서 **+ Add Enrichment**을 클릭하여 사용자 지정 보강이 포함된 CSV 파일을 업로드합니다.

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="NetFlow 구성 탭의 새 보강 매핑 모달" width="100%" >}}

### 커스텀 IP 보강 {#custom-ip-enrichment}

또한, 특정 IP 주소에서 실행 중인 서비스를 분류하기 위해, IP와 CIDR을 맞춤 태그에 매핑하는 맞춤 보강을 추가할 수 있습니다. 이로 인해 네트워크 엔지니어와 그 팀이 인간이 읽을 수 있는 이름으로 NetFlow 데이터를 해석하고 쿼리하는 것이 더 쉬워집니다.

[**보강** 설정 페이지][10]에서 **+ Add Enrichment**을 클릭하여 매핑을 수동으로 추가하거나 CSV 파일을 업로드하여 매핑을 일괄 추가합니다.

### 역방향 DNS 개인 IP 보강 {#reverse-dns-private-ip-enrichment}

소스 또는 목적지 IP 주소와 연결된 호스트 이름에 대한 DNS 조회를 수행하기 위해 Reverse DNS 개인 IP 보강을 활성화합니다. 활성화되면 Agent는 개인 주소 범위 내의 소스 및 목적지 IP에 대해 Reverse DNS 조회를 수행하여 해당 호스트 이름으로 NetFlow 레코드를 보강합니다.

[기본][7]적으로 `datadog.yaml` 파일의 Reverse DNS IP 보강이 비활성화되어 있습니다. 활성화하려면 이 페이지의 [구성](#configuration) 섹션을 참조하세요.

Reverse DNS IP 보강과 관련된 흐름을 찾으려면 **+ 필터** 메뉴에서 **DNS**를 검색하세요.

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="역 DNS 목적지 및 소스 패싯을 표시하도록 향상된 필터 메뉴" width="100%" >}}

**참고**: 역 DNS 항목은 캐시되며 DNS 쿼리를 최소화하고 DNS 서버의 부하를 줄이기 위해 속도 제한의 적용을 받습니다. 기본 캐싱 및 속도 제한 수정 등 더 많은 구성 옵션은 [전체 구성 파일][8]을 참조하세요.

## IP 세부정보 {#ip-details}

**대화** 보기에서 목적지 IP의 공용 IP 주소를 볼 수 있습니다. IP 위에 마우스를 올리면 IP에 대한 풍부한 메타데이터와 **관련 네트워크 연결 보기** 링크가 표시되어 더 자세한 연결성을 검사할 수 있습니다.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="IP 주소 위에 마우스를 올리면 IP 세부정보와 관련 네트워크 연결 보기를 표시합니다." width="100%" >}}

## 흐름 다이어그램 {#flow-diagram}

**Flows** 메뉴를 클릭하고 목록에서 흐름 위에 마우스를 올려 Source IP, Ingress Interface Name, Device name 및 관련 네트워크 연결의 Destination IP에 대한 추가 정보를 확인하여 NetFlow Monitoring에서 흐름을 시작화할 수 있습니다.

{{< img src="network_device_monitoring/netflow/flows.png" alt="NetFlow를 전송하는 기기에서 집계된 흐름 위에 마우스를 올려 관련 네트워크 연결에 접근하세요." width="100%" >}}

## NetFlow 모니터링 {#netflow-monitor}

모든 보기에서 **Create Monitor** 아이콘을 클릭하여 [NetFlow 모니터링][6]을 생성합니다. 모니터링을 생성할 때 기기 관점에서 소스 IP 또는 대상 IP와 관련된 다음 패싯을 고려하세요. 이 필드는 네트워크 트래픽 패턴에 대한 통찰력을 제공하고 성능 및 보안을 최적화하는 데 도움이 됩니다.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="모니터링 생성 링크가 강조 표시된 NetFlow 모니터링의 흐름 뷰." width="100%" >}}

### 인터페이스 정보 {#interface-information}

다음 필드는 수신 및 송신 인터페이스에 대한 세부정보를 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| 송신 인터페이스 별칭 | 송신 인터페이스의 별칭입니다. |
| 송신 인터페이스 인덱스 | 송신 인터페이스의 인덱스입니다. |
| 송신 인터페이스 이름 | 송신 인터페이스의 이름입니다. |
| 수신 인터페이스 별칭 | 수신 인터페이스의 별칭입니다. |
| 수신 인터페이스 인덱스 | 수신 인터페이스의 인덱스입니다. |
| 수신 인터페이스 이름 | 수신 인터페이스의 이름입니다. |

### 기기 정보 {#device-information}

다음 필드는 NetFlow 레코드를 생성하는 기기와 관련된 세부 정보를 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| 기기 IP | 보강을 위해 NDM의 기기에 매핑되는 IP 주소입니다. |
| 내보내기 IP | NetFlow 패킷이 시작되는 IP 주소입니다. |
| 기기 모델 | 기기의 모델입니다. |
| 기기 이름 | 기기의 이름입니다. |
| 기기 네임스페이스 | 기기의 네임스페이스입니다. |
| 기기 공급업체 | 기기의 공급업체입니다. |

### 흐름 세부정보 {#flow-details}

다음 필드는 네트워크 플로우의 특성을 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| 방향 | 흐름이 인바운드인지 아웃바운드인지를 나타냅니다. |
| 시작 시간 | 소스 IP 주소와 대상 IP 주소 사이의 첫 번째 네트워크 패킷의 타임스탬프입니다. |
| 종료 시간 | 소스 IP 주소와 대상 IP 주소 사이의 마지막 네트워크 패킷의 타임스탬프입니다. |
| Ether Type | Ethernet 프레임 캡슐화 유형(IPv4 또는 IPv6)입니다. |
| 흐름 유형 | NetFlow 데이터 형식의 유형(IPFIX, sFlow5, NetFlow5, NetFlow9, Unknown). |
| IP 프로토콜 | 통신에 사용되는 프로토콜(예: ICMP, TCP, UDP). |
| 다음 홉 IP | 네트워크 경로에 있는 다음 홉의 IP 주소. |
| TCP Flag | 흐름 전체 기간 동안 관찰된 모든 TCP 플래그의 집합입니다. |
| 바이트 | 전송된 총 바이트 수. |
| 패킷 | 전송된 총 패킷 수. |

필드 외에도 기본 패싯을 사용하여 NetFlow 대상 및 소스 IP 주소를 기반으로 트래픽 패턴 분석을 시작할 수도 있습니다.

### NetFlow 대상 IP 패싯 {#netflow-destination-ip-facets}

| 패싯 이름 | 패싯 설명 |
|---|---|
| Destination AS Domain | 대상 IP가 속한 Autonomous System(AS)과 연결된 도메인입니다. |
| Destination AS Name | 대상 IP가 속한 Autonomous System(AS)의 이름입니다. |
| Destination AS Number | 대상 IP가 속한 Autonomous System(AS)에 할당된 번호입니다. |
| Destination AS Route | 대상 IP가 속한 Autonomous System(AS)과 관련된 경로 정보입니다. |
| Destination AS Type | 대상 IP가 속한 Autonomous System(AS) 유형(예: transit, customer, peer)입니다. |
| Destination Application Name | 대상 IP와 연결된 애플리케이션의 이름입니다. |
| Destination City Name | 대상 IP와 연결된 도시의 이름입니다. |
| Destination Cloud Provider Name | 대상 IP와 연결된 클라우드 제공업체의 이름입니다. |
| Destination Cloud Provider Region | 대상 IP와 연결된 클라우드 제공업체의 리전입니다. |
| Destination Cloud Provider Service | 대상 IP와 연결된 클라우드 제공업체가 제공하는 서비스입니다. |
| Destination Continent Code | 대상 IP와 연결된 대륙을 나타내는 코드입니다. |
| Destination Continent Name | 대상 IP와 연결된 대륙의 이름입니다. |
| Destination Country ISO Code | 대상 IP와 연결된 국가를 나타내는 ISO 코드입니다. |
| Destination Country Name | 대상 IP와 연결된 국가의 이름입니다. |
| Destination IP | 대상 IP 주소입니다. |
| Destination Latitude | 대상 IP와 연결된 위도 좌표입니다. |
| Destination Longitude | 대상 IP와 연결된 경도 좌표입니다. |
| Destination MAC | 대상 IP와 연결된 Media Access Control(MAC) 주소입니다. |
| Destination Mask | 대상 IP와 연결된 서브넷 마스크입니다. |
| Destination Port | 대상 포트 번호입니다. |
| Destination Reverse DNS Hostname | 대상 IP와 연결된 Reverse DNS 호스트 이름입니다. |
| Destination Subdivision ISO Code | 대상 IP와 연결된 하위 구역(예: 시/도)을 나타내는 ISO 코드입니다. |
| Destination Subdivision Name | 대상 IP와 연결된 하위 구역(예: 시/도)의 이름입니다. |
| Destination Timezone | 대상 IP와 연결된 시간대입니다. |

### NetFlow Source IP 패싯 {#netflow-source-ip-facets}

| 패싯 이름 | 패싯 설명 |
|---|---|
| Source AS Domain | 소스 IP가 속한 Autonomous System(AS)과 연결된 도메인입니다. |
| Source AS Name | 소스 IP가 속한 Autonomous System(AS)의 이름입니다. |
| Source AS Number | 소스 IP가 속한 Autonomous System(AS)에 할당된 번호입니다. |
| Source AS Route | 소스 IP가 속한 Autonomous System(AS)과 관련된 경로 정보입니다. |
| Source AS Type | 소스 IP가 속한 Autonomous System(AS) 유형(예: transit, customer, peer)입니다. |
| Source Application Name | 소스 IP와 연결된 애플리케이션의 이름입니다. |
| Source City Name | 소스 IP와 연결된 도시의 이름입니다. |
| Source Cloud Provider Name | 소스 IP와 연결된 클라우드 제공업체의 이름입니다. |
| Source Cloud Provider Region | 소스 IP와 연결된 클라우드 제공업체의 리전입니다. |
| Source Cloud Provider Service | 소스 IP와 연결된 클라우드 제공업체가 제공하는 서비스입니다. |
| Source Continent Code | 소스 IP와 연결된 대륙을 나타내는 코드입니다. |
| Source Continent Name | 소스 IP와 연결된 대륙의 이름입니다. |
| Source Country ISO Code | 소스 IP와 연결된 국가를 나타내는 ISO 코드입니다. |
| Source Country Name | 소스 IP와 연결된 국가의 이름입니다. |
| Source IP | 소스 IP 주소입니다. |
| Source Latitude | 소스 IP와 연결된 위도 좌표입니다. |
| Source Longitude | 소스 IP와 연결된 경도 좌표입니다. |
| Source MAC | 소스 IP와 연결된 Media Access Control(MAC) 주소입니다. |
| Source Mask | 소스 IP와 연결된 서브넷 마스크입니다. |
| Source Port | 소스 포트 번호입니다. |
| Source Reverse DNS Hostname | 소스 IP와 연결된 리버스 DNS 호스트 이름입니다. |
| Source Subdivision ISO Code | 소스 IP와 연결된 하위 구역(예: 시/도)을 나타내는 ISO 코드입니다. |
| Source Subdivision Name | 소스 IP와 연결된 하위 구역(예: 시/도)의 이름입니다. |
| Source Timezone | 소스 IP와 연결된 시간대입니다. |

## 대화 스티칭 {#conversation-stitching}

기본적으로 NetFlow는 두 엔드포인트(A → B 및 B → A) 간의 각 트래픽 방향에 대해 분리된 단일 방향 흐름을 기록합니다. 대화 스티칭은 이를 단일 양방향 레코드로 결합하여 두 엔드포인트(A ↔ B) 간에 교환된 총 트래픽에 대한 완전한 보기를 제공합니다.

대화 스티칭을 사용하면 다음을 수행할 수 있습니다.

- 두 엔드포인트 간에 교환된 총 트래픽을 별도의 방향 흐름이 아닌 하나의 대화로 보기
- 소스 및 대상 위젯이 정확한 역할을 반영하도록 실제 시작자와 응답자를 식별합니다.
- 서버가 잘못된 상위 소스로 나타나는 노이즈를 제거합니다.

스티칭된(양방향) 보기와 스티칭되지 않은(단일 방향) 보기 사이를 전환하려면 엔드포인트 기반 NetFlow 보기로 이동하여 시간 선택기 아래에 표시된 **양방향** 전환 버튼을 사용하세요.

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="NetFlow 보기에서 대화 스티칭 전환 버튼" width="100%" >}}

## 샘플링 속도 {#sampling-rate}

NetFlow의 샘플링 속도는 기본적으로 바이트 및 패킷 계산에 반영됩니다. 표시된 바이트 및 패킷 값은 샘플링 속도가 적용되어 계산됩니다.
또한, 대시보드 및 노트북에서 **바이트(조정)(@adjusted_bytes)** 및 **패킷(조정)(@adjusted_packets)**을 쿼리하여 시각화할 수 있습니다.

기기에서 보낸 원시 바이트/패킷(샘플링)을 시각화하려면 대시보드 및 노트북에서 **바이트(샘플링)(@bytes)** 및 **패킷(샘플링)(@packets)**을 쿼리하여 시각화할 수 있습니다.

## 보존 {#retention}

NetFlow 데이터는 기본적으로 30일 동안 보존되며 15일, 30일, 60일, 90일 보존 옵션이 있습니다.

<div class="alert alert-warning">NetFlow 데이터를 장기간 보관하려면 계정 담당자에게 문의하세요.</div>

## 플러시 간격당 흐름 볼륨 제한 {#limit-flow-volume-per-flush-interval}

NetFlow 볼륨 및 관련 비용을 제어하려면, Agent를 구성하여 플러시 간격당 제출되는 흐름 레코드 수를 제한하세요. 플러시 간격은 흐름이 Datadog으로 전달되기 전에 집계되는 기간입니다.

이 제한이 활성화되면, Agent는 구성된 최대값까지 **바이트 수 기준으로 상위 흐름**만 유지하고, 해당 플러시 간격 동안 낮은 볼륨의 흐름은 삭제합니다.

### 구성 {#configuration-1}

**참고**: Agent 버전 `7.75.1` 이상이 필요합니다.

다음 내용을 `datadog.yaml`에서 구성하세요.

```yaml
network_devices:
  netflow:
    enabled: true
    aggregator_max_flows_per_flush_interval: 10000
```

이 구성으로 Agent는 플러시 간격(기본값 5분)당 최대 10,000개의 NetFlow 레코드를 제출합니다. Agent는 데이터 양이 가장 많은 흐름을 우선적으로 처리하고, 나머지는 드롭합니다.

### 일일 볼륨 추정 {#estimating-daily-volume}

대략적인 일일 최대 흐름 수는 다음과 같습니다.

`max_flows_per_flush_interval * (minutes_per_day / flush_interval_minutes)`

예를 들어, 플러시당 `10,000` 흐름과 5분 플러시 간격을 사용할 경우:

`10,000 * (1440 / 5) = 2,880,000 flows/day`

### 예상 동작 {#expected-behavior}

- **상위 통신자 우선 처리:** 이는 대량 트래픽에 집중하는 워크플로에 가장 적합합니다(예: 대역폭 드라이버 및 소음 링크).
- **저용량 흐름에 대한 가시성 축소:** 트래픽이 적은 소스/대상 쌍은 한도에 도달하면 나타나지 않을 수 있습니다.
- **Agent별 동작:** 한도는 각 Agent에 독립적으로 적용됩니다. 여러 Agent가 동일한 대화에 대한 트래픽을 감지하는 경우, 잘림 전에 전역적으로 집계되지 않습니다.

### 모니터링 잘림 {#monitoring-truncation}

흐름 제한이 활성화되면 Agent는 유지되는 데이터와 드롭되는 데이터의 양을 이해하는 데 사용할 수 있는 메트릭을 제공합니다.

- `ndm.flow_truncation.flows_total`
- `ndm.flow_truncation.flows_kept`
- `ndm.flow_truncation.flows_dropped`
- `ndm.flow_truncation.keep_ratio`
- `ndm.flow_truncation.threshold_value`
- `ndm.flow_truncation.runtime_ms`

이 메트릭을 사용하여 선택한 한도를 검증하고, 잘림이 자주 발생하는 경우(한도나 플러시 간격을 조정해야 할 수 있음을 나타냄)를 감지하세요.

## 문제 해결 {#troubleshooting}

### NetFlow 패킷 드롭 {#netflow-packet-drops}
NetFlow 패킷 드롭은 초당 NetFlow 패킷 수가 많을 때(일반적으로 50,000개 이상) 발생할 수 있습니다. 다음 단계는 NetFlow 패킷 드롭을 식별하고 완화하는 데 도움이 될 수 있습니다.

#### 패킷 드롭 식별 {#identifying-packet-drops}

드롭된 UDP 패킷이 있는지 확인하려면 `netstat -s` 명령을 사용하세요.

```bash
    netstat -s
  ```

#### Mitigation steps
1. Increase the Number of NetFlow Listeners

  Increase the number of NetFlow listeners by using a configuration similar to the following:
  Datadog recommends setting the number of workers to match the number of CPU cores in your system:

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. UDP 대기열 길이 늘리기(Linux 전용)

  시스템의 UDP 대기열 길이를 조정하면 NetFlow 패킷의 더 높은 볼륨을 수용하는 데 도움이 될 수 있습니다. 다음 명령을 실행하여 UDP 수신 버퍼 크기를 25MB로 늘리세요.

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. 구성 유지(Linux 전용)

  이러한 변경 사항을 영구적으로 적용하려면 `/etc/sysctl.conf` 파일에 다음 줄을 추가하세요.

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/network_monitoring/devices/snmp_metrics/
[3]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /ko/monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4201
[8]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4203-L4275
[9]: /ko/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip