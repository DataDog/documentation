---
aliases:
- /ko/network_monitoring/devices/getting_started/
description: 라우터, 스위치, 서버, 방화벽 등 네트워크에 연결된 장치를 사용하여 시작하세요.
further_reading:
- link: /network_monitoring/devices/supported_devices
  tag: 문서
  text: 지원되는 NDM 장치
- link: network_monitoring/devices/data/
  tag: 문서
  text: 수집된 NDM 데이터
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩을 사용하여 네트워크 성능 문제 모니터링 및 진단하기
title: 설정
---
## 개요 {#overview}

Network Device Monitoring을 사용하면 온프레미스 라우터, 스위치, 방화벽의 상태와 성능을 파악할 수 있습니다. 네트워크에 접근할 수 있는 호스트에 Datadog Agent를 설치하면, Agent는 기본 제공 기능을 통해 네트워크 장치를 자동으로 탐지하고 메트릭을 수집할 수 있습니다.

이 가이드에서는 호스트의 Network Device Monitoring 구성, 장치 태그 보강, 장치 프로필 설정 및 확인, NetFlow Monitoring에서의 데이터 확인, 제공되는 대시보드와 Device Topology Map에서의 데이터 검증 방법을 설명합니다.

{{< img src="network_device_monitoring/getting_started/ndm_landing_page_2.png" alt="그래프와 인터페이스가 표시된 Network Device Monitoring 랜딩 페이지" style="width:100%;" >}}

## 작동 방식 {#how-it-works}

다음 다이어그램은 Syslog, SNMP 트랩 및 NetFlow 정보 간의 데이터 흐름을 보여줍니다. 장치는 다이어그램에 표시된 포트를 통해 관련 정보를 Datadog Agent로 전송합니다(필요에 따라 Agent 구성에서 포트 변경 가능). API 기반 통합의 경우, Datadog Agent는 공급업체별 `https` API 통합 지침에 따라 온프레미스 또는 클라우드에 있는 네트워크 장치 공급업체의 소프트웨어 컨트롤러나 관리 도구에 연결됩니다. NDM으로 구성되어 온프레미스 또는 클라우드에 배포된 Datadog Agent는 네트워크에서 수집한 모든 장치 및 네트워크 데이터를 통합한 후 HTTPS(포트 `443`)를 통해 Datadog에 전송합니다. 이를 통해 메트릭, 로그, 트레이스, 모니터링 및 대시보드 전반에 걸친 통합 풀스택 관측 가능성을 확보할 수 있습니다.

  {{< img src="network_device_monitoring/getting_started/syslog_trap_netflow.png" alt="Syslog, 트랩 및 NetFlow 수집 흐름을 보여주는 NDM 다이어그램" style="width:90%;" >}}

## 다음 단계 {#next-steps}

네트워크 장치를 모니터링하도록 Datadog을 구성하려면 다음 지침을 따르세요.

## 사전 요구 사항 {#prerequisites}

### Agent 설치 {#install-the-agent}

[Agent 설치 페이지][1]로 이동한 후, 호스트(일반적으로 모니터링 대상 장치가 **아닌** 서버)에 [Datadog Agent][2]를 설치합니다.</br>

{{< img src="network_device_monitoring/getting_started/ndm_install_agent.png" alt="Ubuntu 설치 항목이 강조 표시된 Agent 구성 페이지" style="width:100%;" >}}

## 설정 {#setup}

### 고가용성 {#high-availability}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> 선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 Datadog Agent의 고가용성 지원이 제공되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Network Device Monitoring에서 Datadog Agent의 고가용성(HA) 지원을 통해 활성 Agent와 대기 Agent를 지정할 수 있으며, 활성 Agent에 문제가 발생할 경우 자동으로 장애 조치가 이루어집니다. 이 설정을 사용하면 Agent가 단일 장애 지점이 되는 것을 방지하고, 예기치 않은 인시던트가 발생하거나 OS 업데이트 및 Agent 업그레이드와 같은 계획된 유지보수 작업 중에도 모니터링을 지속할 수 있습니다.

NDM에서 활성 Agent와 대기 Agent가 HA 쌍으로 작동하도록 구성할 수 있습니다. 활성 Agent의 작동이 중단되면 대기 Agent가 90초 이내에 해당 역할을 이어받아 새로운 활성 Agent가 됩니다. 또한 우선적으로 사용할 활성 Agent를 지정할 수 있으며, 해당 Agent를 다시 사용할 수 있게 되면 NDM이 자동으로 해당 Agent를 활성 Agent로 복귀시킵니다. 이 기능을 사용하면 예정된 유지보수 작업에 앞서 Agent를 전환할 수 있습니다.

자세한 내용은 [Datadog Agent의 고가용성 지원][20]을 참조하세요.

### 구성 {#configuration}

네트워크 장치 모니터링을 시작하려면 다음 방법 중 하나로 SNMP 모니터링을 활성화하세요.

[개별 장치][3]
: 개별 장치에서 SNMP 모니터링을 구성하세요.

[Autodiscovery][4]
: Autodiscovery를 사용하여 SNMP 모니터링을 구성하세요.

[Ping][5]
: 장치에 ICMP 핑을 전송하도록 SNMP 검사를 구성하세요.

[Syslog][22]
: Syslog 메시지를 전송하도록 장치를 구성하세요.

[VPN 모니터링][21]
: 장치의 VPN 터널 모니터링을 시작하기 위해 VPN 모니터링을 구성하세요.

### 태그를 사용한 네트워크 장치 정보 보강{#enrich-network-devices-with-tags}

장치에 NDM이 구성된 후에는 다음 방법으로 네트워크 장치 태그를 추가하여 장치 정보를 더욱 보강할 수 있습니다.

[Datadog Agent][2]
: Agent는 [개별 장치][3]를 구성하거나 [Autodiscovery][4]를 사용할 때 장치 태그를 수집할 수 있습니다.

[장치 프로필][6]
: 앱에서 장치 프로필을 직접 생성하여 Agent가 특정 메트릭과 태그를 수집하고 사용자 지정하도록 구성하세요.

[ServiceNow 통합][7]
: ServiceNow의 CMDB(구성 관리 데이터베이스)에 정의된 데이터를 활용하여 Datadog Network Device Monitoring에서 모니터링하는 네트워크 장치의 정보를 동적으로 보강하세요.

장치 페이지
: 장치 페이지에서 {{< ui >}}Device Settings{{< /ui >}}를 클릭하고, {{< ui >}}Tags{{< /ui >}} 탭을 연 다음 {{< ui >}}User{{< /ui >}} 섹션에서 {{< ui >}}Edit Tags{{< /ui >}}를 클릭합니다. 장치는 기본적으로 최대 20개의 사용자 태그를 지원합니다. 조직의 태그 수 제한을 늘리려면 [지원팀에 문의][23]하세요.

[Network Device Monitoring API](#use-the-network-api)
: Network Device Monitoring API를 활용하여 네트워크 장치에 프로그래밍 방식으로 태그를 추가하세요.

### 메트릭 및 태그 사용자 지정{#customize-metrics-and-tags}

[지원되는 장치][9] 페이지에서 기본 제공 장치 프로필을 확인한 후, 장치의 메트릭 및 태그를 사용자 지정하세요. 메트릭을 편집하거나 더 추가하려면 다음 옵션을 사용할 수 있습니다.

[장치 프로필][10]
: . Datadog Agent의 `yaml` 파일에서 장치 프로필의 메트릭과 태그를 직접 편집하세요.

[GUI 기반 프로필 작성][6]
: Datadog Network Monitoring의 GUI 기반 장치 온보딩 기능을 활용하여 장치에 사용자 지정 메트릭 및 태그를 추가하세요.

### NetFlow Monitoring {#netflow-monitoring}

[NetFlow Monitoring][11]을 구성하여 NetFlow 지원 장치의 흐름 레코드를 시각화하고 모니터링하세요.

{{< img src="network_device_monitoring/netflow/home.png" alt="상위 소스, 목적지, 프로토콜, 소스 포트, 목적지 포트 및 장치 트렌드 탭이 포함된 NetFlow Monitoring 페이지" style="width:100%;" >}}

## 데이터 검증{#validate-your-data}

- [네트워크 장치][12] 페이지에서 전체 네트워크 인프라 모니터링을 시작하세요.
- Datadog의 기본 제공 대시보드에서 수집된 메트릭을 조회하세요.
  - [모니터링 중인 모든 장치 개요][13]
  - [네트워크 장치의 인터페이스 성능][14]
- Network [Device Topology Map][15]을 사용하여 장치의 문제를 식별하고 해결하세요.

## 네트워크 API를 사용하세요{#use-the-network-api}

- [네트워크 API][8]를 사용하여 네트워크 장치에 대한 다음 정보를 추출하세요.
  * [장치의 인터페이스 목록을 가져옵니다.][16]
  - [장치의 태그 목록을 가져옵니다.][17]
  - [장치의 태그 목록을 업데이트합니다.][18]

## 문제 해결 {#troubleshooting}

- NDM 문제 해결에 대한 자세한 내용은 Network Device [문제 해결][19] 페이지를 참조하세요.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ko/agent
[3]: /ko/network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[4]: /ko/network_monitoring/devices/snmp_metrics/#autodiscovery
[5]: /ko/network_monitoring/devices/ping
[6]: /ko/network_monitoring/devices/guide/device_profiles/
[7]: https://docs.datadoghq.com/ko/integrations/servicenow/#network-device-tagging
[8]: /ko/api/latest/network-device-monitoring/
[9]: /ko/network_monitoring/devices/supported_devices
[10]: /ko/network_monitoring/devices/profiles
[11]: /ko/network_monitoring/netflow/
[12]: https://app.datadoghq.com/devices
[13]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[14]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[15]: /ko/network_monitoring/devices/device_topology_map
[16]: /ko/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[17]: /ko/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[18]: /ko/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[19]: /ko/network_monitoring/devices/troubleshooting
[20]: /ko/integrations/guide/high_availability
[21]: /ko/network_monitoring/devices/vpn_monitoring
[22]: /ko/network_monitoring/devices/syslog
[23]: /ko/help/