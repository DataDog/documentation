---
aliases:
- /ko/network_monitoring/devices/network_topology_map
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: 블로그
  text: 디바이스 토폴로지 맵을 사용하여 온프레미스 네트워크 전반의 관계를 시각화합니다.
- link: /network_monitoring/devices/data
  tag: 설명서
  text: 네트워크 장치 모니터링과 함께 수집된 데이터
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog으로 SNMP 모니터링하기
title: 장치 토폴로지 맵
---

## 개요

[네트워크 디바이스 토폴로지 맵][2]은 네트워크의 물리적 연결에 대한 개요를 제공하므로, 장치 문제를 보다 쉽게 식별하고 업스트림 및 다운스트림에 미치는 영향을 이해할 수 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_search_3.mp4" alt="검색 창에 vendor:cisco를 추가한 다음 nyc로 필터링된 필터 노드 상자가 있는 네트워크 장치 토폴로지 맵입니다. 노드가 선택되고 선택된 검사 옵션이 연결된 노드를 표시합니다. 그런 다음 연결된 노드 중 하나를 선택하고 검사 옵션을 다시 선택하여 추가 연결된 노드를 표시합니다." video="true" >}}

## 설정

Datadog 에이전트 버전 7.52 이상은 토폴로지 데이터를 자동으로 수집합니다. 추가 설치가 필요하지 않습니다.

### 사전 필수 조건

1. 장치는 SNMP를 통해 LLDP(링크 레이어 검색 프로토콜) 및/또는 CDP(Cisco 검색 프로토콜)를 활성화합니다. 연결된 장치에서 동일한 프로토콜을 사용하여 서로를 검색할 수 있습니다. LLDP가 더 일반적인 옵션이므로 대개 선호됩니다.
2. Datadog 에이전트 버전 7.52 이상이 설치되어 있습니다.

## 탐색 옵션

네트워크 토폴로지 맵에서는 다음과 같은 탐색 옵션을 사용할 수 있습니다.

### 보기

1. **보기별**에서 태그를 사용하여 장치를 시각화할 방법을 선택합니다.

{{< img src="/network_device_monitoring/network_topology_map/device-topology-grouped.png" alt="선택한 장치별 및 태그별 보기가 있는 탐색 옵션. 위치별 보기 강조 표시" style="width:80%;" >}}

### 색상

2. **색상별**에서 다음에 기반하여 디바이스 토폴로지 맵의 노드 색상을 지정하는 방식을 변경합니다.

- **장치 상태**: SNMP 도달 가능성별로 디바이스 토폴로지 맵에 노드를 표시합니다.
- **핑 상태**: [핑 상태][6]별로 디바이스 토폴로지 맵에 노드를 표시합니다.

{{< img src="/network_device_monitoring/network_topology_map/device-topology-overview-intro.png" alt="선택한 색상별 보기가 있는 탐색 옵션. 디바이스 상태별 보기 강조 표시" style="width:80%;" >}}

   다음은 각 색상 상태에 대한 노드의 정의입니다.
   <div style="width:80%; margin: 0 auto;">

   | 색상    | 설명               |
   |----------|---------------------------|
   | 그린   | 디바이스에 연결할 수 있습니다.      |
   | 레드   | SNMP를 통해 연결할 수 없는 등 기기에에 문제가 발생했습니다.  |
   | 그레이    | NDM이 디바이스를 모니터링하고 있지만 데이터가 수신되지 않았습니다. 예를 들어, 핑이 설정되지 않았고 디바이스 토폴로지 맵에서 `color by` **핑 상태**를 선택한 경우 디바이스는 회색으로 표시됩니다. |
   | 색상 없음 | NDM이 직접 모니터링하지는 않지만 NDM이 모니터링하는 연결된 디바이스에서 LLDP/CDP를 통해 검색할 수 있는 섀도우 디바이스입니다. [_N_ 모니터링되지 않는 디바이스 섹션 숨기기](#filter-devices)를 켜거나 꺼서 해당 디바이스를 디바이스 토폴로지 맵에 표시할 수 있습니다.         |

   </div>

### 디바이스 필터링

3. **디바이스 필터링**에서 디바이스 토폴로지 맵에 표시되는 디바이스를 더욱 세밀하게 제어할 수 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_devices_hide.png" alt="선택한 필터 보기가 있는 탐색 옵션. 모니터링되지 않는 디바이스 숨기기를 토글합니다." style="width:80%;" >}}

**참고:** **디바이스 필터링** 설정은 생성한 모든 쿼리에 대해 디바이스 토폴로지 맵에 표시되는 디바이스에 영향을 미칩니다. 예를 들어, 검색 창에서 디바이스 패싯을 기준으로 필터링하는 경우가 해당됩니다.

N 모니터링되지 않는 디바이스 숨기기 - 기본적으로 비활성화되어 있습니다.
:이 옵션을 켜면 네트워크 장치 모니터링이 직접 모니터링하지 않는 디바이스 토폴로지 맵의 디바이스가 숨겨집니다. 그러나 LLDP/CDP에서 검색되고 네트워크 디바이스 모니터링이 모니터링하는 인접 디바이스의 맵에 표시됩니다.

연결되지 않은 N 디바이스 숨기기 - 기본적으로 비활성화되어 있습니다.
:이 옵션을 켜면 링크 연결이 없는 모든 디바이스가 숨겨집니다. 디바이스가 올바르지 않은 설정,  [LLDP/CDP](#troubleshooting)를 지원하지 않는 디바이스 등의 이유로 연결이 해제될 수 있습니다.

### 아이콘 범례

SNMP 디바이스는 [장치 프로필][4]에 정의된 대로 각 디바이스 노드에서 디바이스 유형에 따라 대표 아이콘과 매칭됩니다.

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
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="Access point icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>액세스 포인트</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="Firewall icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>방화벽</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="Router icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>라우터</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="Server icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>서버</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="Switch icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>스위치</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Device icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>장치</td>
  </tr>
</table>


## 장치 조사

아울러, 네트워크의 물리적 연결에 대한 개요를 제공하고 개별 디바이스를 조사하여 연결, 플로우 및 전반적인 상태를 파악할 수 있습니다. 디바이스 위로 마우스를 올리면 전체 상태와 메트릭 키가 표시됩니다. 디바이스를 클릭하면 다음 옵션을 확인할 수 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_3.png" alt="선택된 디바이스가 있는 네트워크 디바이스 토폴로지 맵으로, 디바이스에 대한 정보와 점검, 디바이스 세부 정보 보기, 플로우 세부 정보 보기 옵션을 표시합니다." style="width:80%;" >}}

### 검사

디바이스의 인터페이스 연결을 확인하려면 **점검**를 선택합니다. 연결된 인터페이스 중 하나를 클릭하면 자세히 살펴볼 수 있습니다.
이 보기에는 다른 디바이스에 실제로 연결된 물리적 인터페이스만 표시됩니다. 즉, 네트워크 디바이스의 전체 인터페이스 집합의 하위 집합을 나타냅니다.

{{< img src="/network_device_monitoring/network_topology_map/ndm_topology_interface_updated.png" alt="개별 디바이스 점검 보기로 디바이스의 인터페이스 연결을 표시합니다." style="width:80%;" >}}

### 디바이스 세부 정보 보기

**디바이스 세부 정보 보기**를 선택하면 디바이스의 IP 주소와 태그, 처리량, CPU 및 메모리 관련 데이터 등의 정보를 확인할 수 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_device_details_2.png" alt="개별 디바이스의 디바이스 세부 정보 보기 탭" style="width:80%;" >}}

해당 보기의 **연결된 인터페이스** 탭에서 디바이스의 연결된 인터페이스도 확인할 수 있습니다.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_devices_interface_2.png" alt="선택한 인터페이스 탭이 있는 개별 디바이스의 디바이스 세부 정보 보기 탭" style="width:80%;" >}}

### 플로우 세부 정보 보기

디바이스의 소스, 대상 및 볼륨에 대한 자세한 탐색을 위해 장치의 `@device.ip`로 필터링한 NetFlow 탭을 열려면 **플로우 세부 정보 보기**를 선택하세요. 자세한 내용은 [NetFlow 모니터링][1] 페이지를 참조하세요.

## 트러블슈팅

네트워크 토폴리지 맵 사용에 문제가 발생하는 경우 다음 트러블슈팅 지침을 따르세요. 추가 지원이 필요한 경우 [Datadog 지원 팀][5]에 문의하세요.

### 누락된 토폴로지 데이터 메시지 상자

{{< img src="/network_device_monitoring/network_topology_map/missing_topology_map.png" alt="렌더링된 맵에 링크가 없을 경우 표시되는 누락된 토폴로지 데이터 메시지" style="width:80%;" >}}

렌더링된 맵에 링크가 없는 경우 해당 메시지가 표시됩니다.

**참고**: 'N 연결되지 않은 디바이스 숨기기' 토글이 기본적으로 활성화되어 있으므로 해당 메시지는 빈 맵과 함께 표시됩니다.

### 빈 맵 메시지

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="NDM이 설정되어 있지 않거나 필터링으로 인해 표시되는 '디바이스를 찾을 수 없음' 메시지" style="width:80%;" >}}

NDM이 설정되지 않았기 때문에 디바이스가 없습니다.

### 연결을 찾을 수 없음/표시할 연결된 장치가 없음

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="NDM이 설정되어 있지 않거나 필터링으로 인해 표시되는 '디바이스를 찾을 수 없음' 메시지." style="width:80%;" >}}

- '_N_ 연결되지 않은 디바이스 숨기기' 토글을 끄면 격리된 디바이스가 표시됩니다.
- 범주화 태그를 사용하면 정보 계층으로 구성된 맵 보기를 파악하는 데 도움이 됩니다.

### 빈 맵/모니터링되는 디바이스 없음

- 'N 연결되지 않은 디바이스 숨기기' 토글이 꺼져 있는지 확인합니다.

### 누락된 디바이스/연결

디바이스 토폴로지 맵 데이터는 SNMP로 수집한 LLDP(링크 레이어 검색 프로토콜) 및 CDP(Cisco 검색 프로토콜) 정보에 기반합니다. 맵에 디바이스 및/또는 연결이 누락된 경우 다음 사항을 확인하세요.

- Datadog 에이전트 버전 7.52 이상이 설치되어 있습니다.
- 디바이스에 SNMP를 통해 LLDP 및/또는 CDP가 활성화되어 있습니다.

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

디바이스가 LLDP 또는 CDP로 토폴로지 데이터를 노출하고 있지만 일부 연결이 누락된 경우, 'N 모니터링되지 않는 디바이스 숨기기' 토글이 꺼져 있는지 확인하세요.
맵에서 노드를 필터링하기 위해 태그를 활용하는 경우, 연결된 노드를 보려면 '필터에서 한 홉 떨어져 있는 노드 표시' 토글이 켜져 있는지 확인하세요.

### 맵에 표시되는 모니터링되지 않는 디바이스

디바이스 토폴로지 맵에는 LLDP 또는 CDP로 검색된 모든 디바이스가 표시됩니다. 여기에는 아직 SNMP로 모니터링되지 않은 새 디바이스나 동등하게 모니터링되는 디바이스에 대해 아직 [확인](#device-resolution)되지 않은 기존 디바이스가 포함될 수 있습니다.
'N 모니터링되지 않는 디바이스 숨기기' 토글로 해당 노드를 숨길 수 있습니다.

### 맵의 중복 디바이스

디바이스 토폴로지 맵에는 LLDP 및/또는 CDP로 검색된 모든 디바이스가 표시됩니다. 경우에 따라 이러한 디바이스는 이미 SNMP로 모니터링되고 있으나 동등하게 모니터링되는 디바이스로 [확인](#device-resolution)할 수 없는 경우도 있습니다. 이 경우 디바이스는 모니터링되는 디바이스를 나타내는 노드 1개와 LLDP/CDP로 검색된 디바이스를 나타내는 노드 1개로 두 번 표시됩니다.
모니터링되지 않는 노드를 숨기려면 'N 모니터링되지 않는 디바이스 숨기기' 토글을 사용합니다.

### 맵의 보더리스 또는 블랙 노드

디바이스 토폴로지 맵의 보더리스 또는 블랙 노드는 NDM으로 모니터링하도록 설정되지 않은 LLDP 또는 CDP로 검색된 디바이스나 동등하게 [모니터링되는 디바이스](#device-resolution)로 확인할 수 없는 LLDP 또는 CDP로 검색된 장치를 나타낼 수 있습니다.

## 디바이스 레졸루션

디바이스 토폴로지 맵은 NDM으로 모니터링되는 디바이스와 해당 디바이스의 물리적 연결에 대한 개요를 제공합니다. 토폴로지 링크 데이터는 SNMP로 수집된 LLDP(링크 레이어 검색 프로토콜) 또는 CDP(Cisco 검색 프로토콜) 정보에 기반합니다.
LLDP 또는 CDP로 검색된 연결은 이미 SNMP로 모니터링되는 디바이스에 해당할 수 있습니다. 디바이스 확인은 검색된 디바이스와 모니터링되는 디바이스를 매칭시키는 것으로 구성됩니다.

### 디바이스 레졸루션 실패

디바이스가 NDM으로 모니터링되지 않거나 LLDP 또는 CDP 데이터가 검색된 디바이스와와 모니터링되는 장치를 매칭시키기에 충분하지 않은 경우 장치 확인이 실패할 수 있습니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices?viewTab=topology
[3]: /ko/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /ko/network_monitoring/devices/profiles/
[5]: /ko/help
[6]: /ko/network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping