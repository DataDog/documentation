---
aliases:
- /ko/network_monitoring/devices/network_topology_map
- /ko/network_monitoring/devices/device_topology_map
code_lang: topology
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  text: 디바이스 토폴로지 맵을 사용하여 온프레미스 네트워크 전반의 관계를 시각화합니다.
- link: /network_monitoring/devices/data
  tag: Documentation
  text: Network Device Monitoring과 함께 수집된 데이터
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Datadog와 SNMP 모니터링하기
title: 장치 토폴로지 맵
type: multi-code-lang
---
## 개요

[네트워크 장치 토폴로지 맵][2]은 [Cloudcraft][7] 다이어그램을 사용하여 네트워크의 물리적 연결을 인터랙티브 방식으로 시각화합니다. 이 맵은 장치와 그 인터페이스, 그리고 장치와 인터페이스의 관계를 자동으로 발견하고 표시합니다. 이 시각화는 네트워크 장치의 문제를 식별하고, 업스트림 및 다운스트림 영향을 이해하며, 연결 문제를 해결하고, 인프라를 통해 트래픽 흐름이 이루어지는 방식을 통찰하는 데 도움을 줍니다.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new_4.mp4" alt="사용자는 네트워크 장치 토폴로지 맵에 팀, 서비스 및 공급업체 태그를 추가한 후, 장치를 선택하여 NDM 장치 뷰를 엽니다." video="true" >}}

## 설정

Datadog Agent 버전 7.52 이상은 토폴로지 데이터를 자동으로 수집합니다. 추가 설치가 필요하지 않습니다.

### 전제 조건

1. 장치에 SNMP를 통해 LLDP(링크 레이어 검색 프로토콜) 및/또는 CDP(Cisco 검색 프로토콜)가 활성화되어 있습니다. 연결된 장치에서 동일한 프로토콜을 사용하여 서로를 검색할 수 있습니다. LLDP가 더 일반적인 옵션이므로 대개 선호됩니다.
2. Datadog Agent 버전 7.52 이상이 설치되어 있습니다.

## 탐색 옵션

네트워크 토폴로지 맵에서는 다음과 같은 탐색 옵션을 사용할 수 있습니다.

### 그룹 기준

그룹 기준에서 `location` 및 `vendor`와 같은 **태그**를 사용하여 다음과 같이 장치를 시각화하는 방법을 선택합니다.

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by_2.png" alt="그룹 기준은 위치 및 공급업체에 대한 태그 표시를 제어합니다." style="width:90%;" >}}

### 장치 필터

**+ Filter** 드롭다운을 선택하여 장치 토폴로지 맵에 표시할 장치를 세분화합니다.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_3.png" alt="필터 드롭다운이 열려 있는 장치 토폴로지 맵입니다." style="width:90%;" >}}

**참고:** **장치 필터** 설정은 검색창에서 장치 패싯으로 필터링하는 쿼리를 포함하여 장치 토폴로지 맵에 표시되는 장치를 결정합니다.

### 리소스

**Resource** 드롭다운을 사용하여 방화벽, 액세스 포인트 및 라우터와 같은 특정 장치 유형으로 다이어그램을 필터링합니다.

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="리소스 드롭다운이 열려 있고 모니터링되지 않은 장치가 선택되어 있지 않은 장치 토폴로지 맵입니다." style="width:30%;" >}}

Network Device Monitoring기본적으로 **Unmonitored Device** 옵션은 선택 해제되어 있으며, Network Device Monitoring에 의해 직접 모니터링되지 않지만 인접한 모니터링된 장치에서 LLDP/CDP를 통해 발견된 장치를 숨깁니다. 이 옵션을 선택하여 다이어그램에 모니터링되지 않은 장치를 표시합니다.

## 장치 조사

장치 토폴로지 맵은 네트워크의 물리적 연결 개요를 보여주는 것 외에도 개별 장치를 조사하여 장치의 연결, 흐름 및 전반적인 상태를 이해할 수 있게 합니다. 장치 위로 마우스를 가져가면 장치의 상태와 주요 메트릭을 확인할 수 있으며, 장치를 클릭하면 IP 주소, 태그, 처리량, CPU 및 메모리와 같은 세부 정보가 포함된 NDM 장치 뷰가 열립니다.

장치를 조사하는 동안 장치 뷰의 오른쪽 상단에 있는 **Open Device Page** 드롭다운을 클릭하여 [NetFlow Monitoring][1] 또는 더 상세한 조사를 위한 다른 관련 페이지로 이동합니다.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_7.png" alt="장치가 선택된 네트워크 장치 토폴로지 맵으로, NDM 장치 뷰에 정보가 표시됩니다." style="width:100%;" >}}

### 종속성

NDM 장치 뷰의 **Dependencies** 섹션에서는 물리적으로 연결된 장치와 VPN 터널의 수를 한눈에 확인할 수 있으며, 이웃 장치의 시각적 그래프도 포함됩니다.

{{< img src="/network_device_monitoring/network_topology_map/topology_dependencies.png" alt="연결된 장치의 그래프와 함께 종속성 섹션을 보여주는 NDM 장치 뷰입니다." style="width:100%;" >}}

**종속성 보기**를 클릭하여 전체 장치 페이지를 엽니다. **Dependencies** 탭에서 **Physical** 또는 **VPN** 필터를 사용하여 물리적 연결과 VPN 터널 간에 전환합니다(VPN 종속성은 [VPN 모니터링][12]이 구성되어 있어야 합니다). 물리적 보기는 연결된 장치의 상태, 장치 이름, IP 주소, 모니터, 로컬 인터페이스 및 원격 인터페이스를 보여주는 테이블과 함께 토폴로지 그래프를 표시합니다.

{{< img src="/network_device_monitoring/network_topology_map/ndm_summary_dependencies.png" alt="상태, IP 주소 및 인터페이스 세부 정보가 포함된 연결된 장치의 테이블과 함께 토폴로지 그래프를 보여주는 물리적 필터가 선택된 NDM 장치 페이지의 종속성 탭입니다." style="width:100%;" >}}

### 메트릭

NDM 장치 뷰에서 **Metrics** 탭을 클릭하여 CPU 사용량, 메모리 사용량 및 처리량을 포함한 장치의 주요 메트릭을 확인합니다. 요약 통계는 상단에 표시되며, 각 메트릭은 시간에 따른 그래프로 표시됩니다. **View all metrics**를 클릭하여 수집된 메트릭의 전체 목록을 살펴볼 수 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/metrics_3.png" alt="CPU, 메모리 및 처리량 그래프가 표시된 메트릭 탭이 열려 있는 NDM 장치 뷰입니다." style="width:100%;" >}}

### 트래픽

장치의 전체, 인바운드 및 아웃바운드 처리량을 확인하려면 **Traffic** 탭을 클릭하세요. 트래픽 그래프는 시간에 따른 활동을 보여주며, **Top Conversations** 테이블은 비트 전송률, 패킷 전송률 및 총 바이트와 함께 가장 볼륨이 큰 소스에서 대상까지의 흐름을 나열합니다. 장치 요약 페이지에서 [NetFlow Monitoring][1] 시에 더 자세히 조사하려면 **View traffic**을 클릭하세요.

{{< img src="/network_device_monitoring/network_topology_map/traffic_2.png" alt="처리량 통계, 트래픽 그래프 및 상위 대화 테이블이 표시된 트래픽 탭이 열려 있는 NDM 장치 뷰입니다." style="width:100%;" >}}

### 이벤트

Syslog 메시지와 SNMP 트랩을 단일 통합 뷰로 확인하려면 **이벤트** 탭을 클릭하세요. 필터를 사용하여 이벤트 유형별로 결과를 좁힐 수 있습니다. 이벤트 볼륨이 급증하면 시각적으로 강조 표시되어 오류를 식별하고 조사하는 데 도움이 됩니다.

{{< img src="/network_device_monitoring/network_topology_map/events.png" alt="Syslog 메시지와 SNMP 트랩이 표시된 이벤트 탭이 열려 있는 NDM 장치 뷰입니다." style="width:100%;" >}}

### 흐름 세부 정보 보기

장치의 트래픽 소스, 대상 및 볼륨을 살펴보려면 **Open Device Page** 드롭다운을 클릭하고 **NetFlow Monitoring**을 선택합니다. 데이터는 장치의 `@device.ip`에 따라 자동으로 필터링됩니다. 자세한 내용은 [NetFlow Monitoring][1]을 참조하세요.

{{< img src="/network_device_monitoring/network_topology_map/netflow_tab_4.png" alt="NetFlow Monitoring 옵션이 표시된 장치 페이지 열기 드롭다운이 있는 NDM 장치 뷰입니다." style="width:100%;" >}}

### 장치 설정

NDM 장치 뷰에서 **장치 설정** 아이콘을 클릭하여 장치 설정 패널을 엽니다. **Information** 탭은 일반 세부 정보(이름, 네임스페이스 및 설명), 네트워크 세부 정보(IP 주소, 서브넷 및 지리적 위치), 하드웨어 세부 정보(모델, 공급업체, OS 및 버전)를 표시합니다. **Tags** 탭에서는 장치와 관련된 태그를 보고 관리할 수 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/device_settings.png" alt="NDM 장치의 장치 설정 패널로, 일반, 네트워크 및 하드웨어 세부 정보가 포함된 정보 탭을 보여줍니다." style="width:90%;" >}}

### 링크 세부 정보

장치 간의 링크를 클릭하여 트래픽 볼륨, 대역폭 사용량, 오류 및 폐기와 같은 연결 세부 정보를 살펴보고 [장치 개요][10] 또는 [NetFlow Monitoring][11]에서 데이터를 확인할 수 있는 옵션이 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/link_details.mp4" alt="사용자가 추가 링크 세부 정보를 보기 위해 장치 간의 링크를 클릭합니다." video="true" >}}

### 아이콘 범례

SNMP 장치는 [장치 프로필][4]에 정의된 대로 각 장치 노드에서 장치 유형에 따라 대표 아이콘과 매칭됩니다.

<table>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <tr>
    <th>아이콘</th>
    <th>설명</th>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="액세스 포인트 아이콘" style="width:10%; border:none;" popup="false">}}</td>
    <td>액세스 포인트</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="방화벽 아이콘" style="width:10%; border:none;" popup="false">}}</td>
    <td>방화벽</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="라우터 아이콘" style="width:10%; border:none;" popup="false">}}</td>
    <td>라우터</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="서버 아이콘" style="width:10%; border:none;" popup="false">}}</td>
    <td>서버</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="스위치 아이콘" style="width:10%; border:none;" popup="false">}}</td>
    <td>스위치</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="장치 아이콘" style="width:10%; border:none;" popup="false">}}</td>
    <td>장치</td>
  </tr>
</table>

## 문제 해결

네트워크 토폴리지 맵 사용에 문제가 발생하는 경우 다음 문제 해결 지침을 따르세요. 추가 도움이 필요하면 [Datadog 지원팀][5]에 문의하세요.

### 빈 맵 메시지

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="NDM이 구성되지 않았거나 필터링으로 인해 표시되는 장치를 찾을 수 없음 메시지입니다." style="width:80%;" >}}

NDM이 구성되지 않았기 때문에 장치가 없습니다.

### 연결을 찾을 수 없음/표시할 연결된 장치가 없음

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="NDM이 구성되지 않았거나 필터링으로 인해 표시되는 장치를 찾을 수 없음 메시지입니다." style="width:80%;" >}}

 모니터링되지 않는 장치를 표시하려면 **Unmonitored Device** 선택 항목을 설정합니다.
 범주화 태그를 사용하면 정보 계층으로 구성된 맵 뷰를 파악하는 데 도움이 됩니다.

### 누락된 장치/연결

장치 토폴로지 맵 데이터는 SNMP로 수집한 LLDP(링크 레이어 검색 프로토콜) 및 CDP(Cisco 검색 프로토콜) 정보에 기반합니다. 맵에 장치 및/또는 연결이 누락된 경우 다음 사항을 확인하세요.

 Datadog Agent 버전 7.52 이상이 설치되어 있습니다.
 디바이스에 SNMP를 통해 LLDP 및/또는 CDP가 활성화되어 있습니다.

다음 명령을 사용하여 디바이스가 LLDP 및 CDP 데이터를 노출하는지 확인하세요.

LLDP 데이터의 경우:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
CDP 데이터의 경우
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### 누락된 연결 또는 링크

장치가 LLDP 또는 CDP로 토폴로지 데이터를 노출하고 있지만 일부 연결이 누락된 경우 **Unmonitored Device** 선택 항목이 해제되어 있는지 확인하세요.

### 맵에 표시되는 모니터링되지 않는 장치

장치 토폴로지 맵에는 LLDP 또는 CDP로 검색된 모든 장치가 표시됩니다. 여기에는 아직 SNMP로 모니터링되지 않는 새 장치나, 동등하게 모니터링되는 장치에 대해 아직 [확인](#deviceresolution)되지 기존 장치가 포함될 수 있습니다.
**Unmonitored Device** 선택 항목으로 해당 노드를 숨길 수 있습니다.

### 맵의 중복 디바이스

디바이스 토폴로지 맵에는 LLDP 및/또는 CDP로 검색된 모든 장치가 표시됩니다. 이러한 장치가 이미 SNMP로 모니터링되고 있으나 동등하게 모니터링되는 장치로 [확인](#deviceresolution)할 수 없는 경우도 있습니다. 이 경우 장치는 모니터링되는 장치를 나타내는 노드 1개와 LLDP/CDP로 검색된 장치를 나타내는 노드 1개로 두 번 표시됩니다.
모니터링되지 않은 노드를 숨기려면 **Unmonitored Device** 선택 항목을 사용합니다.

### 맵의 보더리스 또는 블랙 노드

장치 토폴로지 맵의 보더리스 또는 블랙 노드는 NDM으로 모니터링하도록 설정되지 않은 LLDP 또는 CDP로 검색된 장치나 동등하게 [모니터링되는 장치](#deviceresolution)로 확인할 수 없는 LLDP 또는 CDP로 검색된 장치를 나타낼 수 있습니다.

## 장치 확인

장치 토폴로지 맵은 NDM으로 모니터링되는 장치와 해당 장치의 물리적 연결에 대한 개요를 제공합니다. 토폴로지 링크 데이터는 SNMP로 수집된 LLDP(링크 레이어 검색 프로토콜) 또는 CDP(Cisco 검색 프로토콜) 정보에 기반합니다.
LLDP 또는 CDP로 검색된 연결은 이미 SNMP로 모니터링되는 장치에 해당할 수 있습니다. 장치 확인은 검색된 장치와 모니터링되는 장치를 매칭시키는 것으로 구성됩니다.

### 장치 확인 실패

장치가 NDM으로 모니터링되지 않거나 LLDP 또는 CDP 데이터가 검색된 장치와 모니터링되는 장치를 매칭시키기에 충분하지 않은 경우 장치 확인이 실패할 수 있습니다.

## 다음 단계

NDM은 인프라를 모니터링하기 위한 여러 시각화 도구를 제공합니다.

 **[장치 지오맵][9]**: 지역 문제 및 커버리지 격차를 파악하기 위해 위치별 장치의 지리적 분포를 확인합니다.
 **[장치 개요][10]**: 개별 장치에 대한 상세한 메트릭 및 성능 데이터를 확인합니다.
 **[NetFlow Monitoring][1]**: 네트워크 전반의 트래픽 흐름 및 대역폭 활용도를 분석합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices/maps/topology 
[3]: /ko/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /ko/network_monitoring/devices/profiles/
[5]: /ko/help
[6]: /ko/network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping
[7]: /ko/datadog_cloudcraft/
[8]: /ko/network_monitoring/devices/topology
[9]: /ko/network_monitoring/devices/geomap
[10]: https://app.datadoghq.com/devices
[11]: https://app.datadoghq.com/devices/netflow
[12]: /ko/network_monitoring/devices/vpn_monitoring/