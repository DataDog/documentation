---
aliases:
- /ko/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: 문서
  text: 네트워크 장치 모니터링 프로필 사용
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: 블로그
  text: Datadog로 NetFlow 트래픽 데이터 모니터링
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩으로 네트워크 성능 문제 모니터링 및 진단
title: NetFlow Monitoring
---

## 개요

Datadog의 NetFlow Monitoring을 사용하여 NetFlow 지원 장치의 플로우 기록을 시각화하고 모니터링하세요.

{{< img src="network_device_monitoring/netflow/home.png" alt="상위 소스, 대상, 프로토콜, 소스 포트, 대상 포트 및 장치 트렌드에 대한 탭이 포함된 NetFlow Monitoring 페이지" style="width:100%;" >}}

## 설치

Network Device Monitoring과 NetFlow Monitoring을 사용하려면 [Agent][1] 버전 7.45 이상을 사용하고 있는지 확인하세요.

**참고**: [네트워크 모니터링을 통한 메트릭 수집][2]을 설정하는 것은 NetFlow 데이터 전송을 위한 필수 요건은 아닙니다. 하지만 이는 강력한 권장 사항입니다. 이 추가 데이터가 장치 이름, 모델, 공급사 및 인바운드/아웃바운드 인터페이스 이름 등의 정보를 통해 기록을 더 풍부하게 만들어줄 수 있기 때문입니다.

## 설정

NetFlow, jFlow, sFlow 또는 IPFIX 트래픽을 Agent NetFlow 서버로 보내도록 장치를 구성하려면 Datadog Agent가 설치된 IP 주소, 특히 `flow_type` 및 `port`로 트래픽을 보내도록 장치를 구성해야 합니다.

NetFlow를 활성화하려면 [`datadog.yaml`][3] 에이전트 설정 파일을 편집합니다.

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # 옵션: netflow5, netflow9, ipfix, sflow5
        port: 2055            # 장치는 동일한 포트 번호로 구성되어야 합니다.
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
```

변경 사항을 저장한 후 [에이전트트 재시작][4]합니다.

## 집계

Datadog Agent는 NetFlow로 수신된 데이터를 자동으로 집계하여 대부분의 정보를 유지하면서 플랫폼으로 전송되는 레코드 수를 제한합니다. 기본적으로 `source`, `destination address`, `port`, `protocol`과 같은 동일한 식별자를 가진 플로우 기록은 5분 간격으로 함께 집계됩니다. 또한 Datadog Agent는 임시 포트를 감지하고 제거할 수 있습니다. 결과적으로 `port:*`와 함께 플로우가 표시될 수 있습니다.

## 보강

NetFlow 데이터는 Datadog 백엔드에 의해 처리되며 장치 및 인터페이스에서 사용 가능한 메타데이터로 강화됩니다. 강화는 NetFlow 엑스포터 IP 및 인터페이스 인덱스를 기반으로 합니다. 재사용된 개인 IP 간의 충돌 가능성을 명확하게 하기 위해 각 Agent 구성 파일에 대해 서로 다른 `namespace`를 구성할 수 있습니다(`network_devices.namespace` 설정 사용).

NetFlow 엑스포터 IP가 장치 IP 중 하나이지만 SNMP 통합에 구성된 IP가 아닌 경우 Datadog은 엑스포터 IP가 속한 장치를 찾고 일치 항목이 고유한 한 이를 사용하여 NetFlow 데이터를 강화합니다.

### 클라우드 공급자 IP 강화

Datadog은 IPv4 주소용 퍼블릭 클라우드 공급자 서비스 및 지역으로 IP를 강화하므로 특정 서비스 및 지역의 플로우 기록을 필터링할 수 있습니다.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_ip_enrichment.png" alt="클라우드 공급자 이름, 지역 및 서비스로 강화된 Netflow IP" width="80%" >}}

### 포트 강화

Datadog은 IANA(Internet Assigned Numbers Authority) 데이터로 NetFlow의 포트를 강화하여 잘 알려진 포트 매핑(예: 5432의 Postgres 및 443의 HTTPS)을 해결합니다. 이는 NetFlow에서 소스 또는 대상 애플리케이션 이름을 검색할 때 볼 수 있습니다.

{{< img src="network_device_monitoring/netflow/netflow_iana_port_mappings.png" alt="@destination.application_name으로 필터링되고 HTTPS와 같은 포트 이름을 표시하는 NetFlow 페이지" width="80%" >}}

#### 커스텀 포트 강화

또한 사용자 맞춤 강화를 추가하여 포트와 프로토콜을 특정 애플리케이션에 매핑할 수도 있습니다(예: 사용자 정의 서비스가 특정 포트에서 실행되는 경우). 이를 통해 네트워크 엔지니어와 팀은 사람이 읽을 수 있는 이름으로 NetFlow 데이터를 더 쉽게 해석하고 쿼리할 수 있습니다.

NetFlow의 **Configuration** 탭에서 **Add Enrichment** 를 클릭하여 사용자 맞춤 강화가 포함된 CSV 파일을 업로드합니다.

{{< img src="network_device_monitoring/netflow/new_enrichment.png" alt="Netflow 구성 탭의 New Enrichment Mapping 모달" width="80%" >}}

## 시각화

[**NetFlow** 페이지][5]에서 NetFlow Monitoring을 통해 수집된 데이터에 액세스할 수 있습니다. 목록에서 플로우 위로 마우스를 가져가 호스트, 파드 및 컨테이너에 대한 추가 정보를 확인하고 관련 네트워크 연결에 액세스하세요..

{{< img src="network_device_monitoring/netflow/information.png" alt="관련 네트워크 연결에 액세스하려면 Netflow를 방출하는 장치에서 집계된 흐름 위로 마우스를 가져가세요." width="100%" >}}

[NetFlow 모니터][6]를 생성할 때 장치 관점에서 소스 IP 또는 대상 IP에 대해 다음 필드를 고려해야 합니다. 이러한 필드는 네트워크 트래픽 패턴에 대한 인사이트를 제공하고 성능 및 보안을 최적화하는 데 도움이 됩니다.

### 인터페이스 정보

다음 필드는 수신 및 송신 인터페이스에 대한 세부정보를 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| Egress Interface Alias | 송신 인터페이스의 별칭. |
| Egress Interface Index | 송신 인터페이스의 인덱스. |
| Egress Interface Name | 송신 인터페이스의 이름. |
| Ingress Interface Alias | 수신 인터페이스의 별칭. |
| Ingress Interface Index | 수신 인터페이스의 인덱스. |
| Ingress Interface Name | 수신 인터페이스의 이름. |

### 장치 정보

다음 필드는 NetFlow 레코드를 생성하는 장치와 관련된 세부 정보를 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| Device IP | 보강을 위해 NDM의 장치에 매핑되는 IP 주소. |
| Exporter IP | NetFlow 패킷이 시작되는 IP 주소. |
| Device Model | 장치 모델. |
| Device Name | 장치 이름. |
| Device Namespace | 장치 네임스페이스. |
| Device Vendor | 장치 공급업체. |

### 플로우 세부정보.

다음 필드는 네트워크 플로우의 특성을 나타냅니다.

| 필드 이름 | 필드 설명 |
|---|---|
| Direction | 플로우가 인바운드인지 아웃바운드인지를 나타냅니다. |
| Start Time | 소스 IP 주소와 대상 IP 주소 사이의 첫 번째 네트워크 패킷의 타임스탬프. |
| End Time | 소스 IP 주소와 대상 IP 주소 사이의 마지막 네트워크 패킷의 타임스탬프. |
| Ether Type | Ethernet 프레임 캡슐화 유형(IPv4 또는 IPv6). |
| Flow Type | NetFlow 데이터 형식의 유형(IPFIX, sFlow5, NetFlow5, NetFlow9, Unknown). |
| IP Protocol | 통신에 사용되는 프로토콜(예: ICMP, TCP, UDP). |
| Next Hop IP | 네트워크 경로에 있는 다음 홉의 IP 주소. |
| TCP Flag | 플로우가 존재하는 동안 관찰된 모든 TCP 플래그의 통합. |
| 바이트 | 전송된 총 바이트 수. |
| Packets | 전송된 총 패킷 수. |

필드 외에도 기본 패싯을 사용하여 NetFlow 대상 및 소스 IP 주소를 기반으로 트래픽 패턴 분석을 시작할 수도 있습니다.

### NetFlow Destination IP facets

| 패싯 이름  | 패싯 설명 |
|---|---|
| Destination AS Domain | 대상 IP가 속한 Autonomous System(AS)과 연결된 도메인. |
| Destination AS Name | 대상 IP가 속한 Autonomous System(AS)의 이름. |
| Destination AS Number | 대상 IP가 속한 Autonomous System(AS)에 할당된 번호. |
| Destination AS Route | 대상 IP가 속한 Autonomous System(AS)과 관련된 경로 정보. |
| Destination AS Type | 대상 IP가 속한 Autonomous System(AS) 유형 (예: transit, customer, peer) |
| Destination Application Name | 대상 IP와 연결된 애플리케이션의 이름. |
| Destination City Name | 대상 IP와 연결된 도시의 이름. |
| Destination Cloud Provider Name | 대상 IP와 연결된 클라우드 공급자의 이름. |
| Destination Cloud Provider Region | 대상 IP와 연결된 클라우드 공급자의 지역. |
| Destination Cloud Provider Service | 대상 IP와 연결된 클라우드 공급자가 제공하는 서비스. |
| Destination Continent Code | 대상 IP와 연결된 대륙을 나타내는 코드. |
| Destination Continent Name | 대상 IP와 연결된 대륙의 이름. |
| Destination Country ISO Code | 대상 IP와 연결된 국가를 나타내는 ISO 코드. |
| Destination Country Name | 대상 IP와 연결된 국가 이름. |
| Destination IP | 대상 IP 주소. |
| Destination Latitude | 대상 IP와 연결된 위도 좌표. |
| Destination Longitude | 대상 IP와 연결된 경도 좌표. |
| Destination MAC | 대상 IP와 연결된 Media Access Control(MAC) 주소. |
| Destination Mask | 대상 IP와 연결된 서브넷 마스크. |
| Destination Port | 대상 포트 번호. |
| Destination Subdivision ISO Code | 대상 IP와 연결된 하위 구역(예: 시/도)을 나타내는 ISO 코드. |
| Destination Subdivision Name | 대상 IP와 연결된 하위 구역(예: 시/도)의 이름. |
| Destination Timezone | 대상 IP와 연결된 시간대. |

### NetFlow Source IP 패싯

| 패싯 이름  | 패싯 설명 |
|---|---|
| Source AS Domain | 소스 IP가 속한 Autonomous System(AS)과 연결된 도메인. |
| Source AS Name | 소스 IP가 속한 Autonomous System(AS)의 이름. |
| Source AS Number | 소스 IP가 속한 Autonomous System(AS)에 할당된 번호. |
| Source AS Route | 소스 IP가 속한 Autonomous System(AS)과 관련된 경로 정보. |
| Source AS Type | 소스 IP가 속한 Autonomous System(AS) 유형 (예: transit, customer, peer). |
| Source Application Name | 소스 IP와 연결된 애플리케이션의 이름. |
| Source City Name | 소스 IP와 연결된 도시 이름. |
| Source Cloud Provider Name | 소스 IP와 연결된 클라우드 공급자의 이름. |
| Source Cloud Provider Region | 소스 IP와 연결된 클라우드 공급자의 지역. |
| Source Cloud Provider Service | 소스 IP와 연결된 클라우드 공급자가 제공하는 서비스. |
| Source Continent Code | 소스 IP와 연결된 대륙을 나타내는 코드. |
| Source Continent Name | 소스 IP와 연결된 대륙의 이름. |
| Source Country ISO Code | 소스 IP와 연결된 국가를 나타내는 ISO 코드. |
| Source Country Name | 소스 IP와 연결된 국가의 이름. |
| Source IP | 소스 IP 주소. |
| Source Latitude | 소스 IP와 연결된 위도 좌표. |
| Source Longitude | 소스 IP와 연결된 경도 좌표. |
| Source MAC | 소스 IP와 연결된 Media Access Control(MAC) 주소. |
| Source Mask | 소스 IP와 연결된 서브넷 마스크. |
| Source Port | 소스 포트 번호. |
| Source Subdivision ISO Code | 소스 IP와 연결된 하위 구역(예: 시/도)을 나타내는 ISO 코드. |
| Source Subdivision Name | 소스 IP와 연결된 하위 구역(예: 시/도)의 이름. |
| Source Timezone | 소스 IP와 연결된 시간대. |

이러한 주요 필드를 모니터링하고 패싯을 사용하여 NetFlow 이벤트를 분석함으로써 조직은 네트워크 인프라스트럭처에 대한 가시성을 확보하고 성능을 최적화하며 보안 상태를 개선할 수 있습니다.

{{< img src="monitors/monitor_types/netflow/monitor.png" alt="NetFlow 데이터로 대시보드 만들기" width="100%" >}}

이 데이터는 대시보드와 노트북에서도 사용할 수 있으므로 다른 데이터 소스와의 정확한 쿼리 및 상관 관계가 가능합니다. NetFlow 데이터로 대시보드를 생성할 때 **Graph your data** 섹션에서 소스로 **NetFlow**를 선택하세요.

{{< img src="network_device_monitoring/netflow/dashboard.png" alt="NetFlow 데이터로 대시보드 만들기" width="100%" >}}

## 샘플링 속도

NetFlow의 샘플링 속도는 기본적으로 바이트 및 패킷 계산 시 고려됩니다. 바이트 및 패킷에 대해 표시되는 값은 적용된 샘플링 속도를 사용하여 계산됩니다. 
또한 대시보드 및 노트북에서 **Bytes (Adjusted) (@adjusted_bytes)** 및 **Packets (Adjusted) (@adjusted_packets)**을 쿼리하여 시각화할 수 있습니다.

장치에서 보낸 원시 바이트/패킷(샘플링)을 시각화하려면 대시보드 및 노트북에서 **Bytes (Sampled) (@bytes)** 및 **Packets (Sampled) (@packets)**을 쿼리하세요.

## 보존 기간

NetFlow 데이터는 기본적으로 30일 동안 보존되며 15일, 30일, 60일, 90일 보존 옵션이 있습니다.

<div class="alert alert-warning">NetFlow 데이터를 장기간 보관하려면 계정 담당자에게 문의하세요.</div>

## 트러블슈팅

### NetFlow 패킷 드롭
NetFlow 패킷 드롭은 초당 NetFlow 패킷 수가 많을 때(일반적으로 50,000개 이상) 발생할 수 있습니다. 다음 단계는 NetFlow 패킷 드롭을 식별하고 완화하는 데 도움이 될 수 있습니다.

#### 패킷 드롭 식별하기

드롭된 UDP 패킷이 있는지 확인하려면 `netstat -s` 명령을 사용하세요.

```bash
    netstat -s
  ```

#### 완화 단계
1. NetFlow Listener 수 늘리기

  다음과 유사한 구성을 사용하여 NetFlow Listener 수를 늘립니다.
  Datadog에서는 시스템의 CPU 코어 수와 일치하도록 작업자 수를 설정할 것을 권장합니다.

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. UDP 대기열 길이 늘리기(Linux에만 해당)

  시스템의 UDP 대기열 길이를 조정하면 더 많은 양의 NetFlow 패킷을 수용하는 데 도움이 될 수 있습니다. 다음 명령을 실행하여 UDP 수신 버퍼 크기를 25MB로 늘립니다.

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. 구성 유지(Linux에만 해당)

  이러한 변경 사항을 영구적으로 적용하려면 `/etc/sysctl.conf` 파일에 다음 줄을 추가하세요.

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/network_monitoring/devices/snmp_metrics/
[3]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /ko/monitors/types/netflow/